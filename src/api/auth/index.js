
import { get, post } from 'src/utils/requestUtils';
import { hashStringWithMD5 } from 'src/utils/md5';
import { users } from './data';
import { t } from 'i18next';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;
    
    const requestBody = {
      email,
      loginPassword: hashStringWithMD5(password)
    };
    console.log(requestBody);

    const response = await post('/userInfo/loginByEmail', JSON.stringify(requestBody))

    console.log(response);

    return new Promise((resolve, reject) => {
      try {

        // 检查响应状态
        if (response.code !== 200) {
          reject(new Error('Please check your email and password'));
          return;
        }

        const accessToken = response.data;
        resolve({ accessToken });
        return;
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signUp(request) {
    const { email, name, password, verificationCode } = request;
    console.log('register param is ', request)
    
    const response = await post('/userInfo/emailRegister', JSON.stringify({
      nickName: name,
      email,
      loginPassword: hashStringWithMD5(password),
      verifyCode: verificationCode
    }));
    console.log('signUp res: ', response);
    return new Promise((resolve, reject) => {
      try {

        if (response.code !== 200) {
          reject(new Error('register has error'));
          return;
        }
        const accessToken = response.data;
        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async me(request) {
    const { accessToken } = request;

    console.log('accessToken: ', accessToken);
    const response = await get('/userInfo/getUserInfo', null, {token: accessToken})
  
    console.log('getUserInfo res: ', response);
    return new Promise((resolve, reject) => {
      try {

        if (response.code !== 200) {
          reject(new Error('Invalid authorization token'));
          return;
        }
        const user = response.data;

        resolve({
          id: user.userId,
          avatar: user.avatarUrl,
          email: user.email,
          name: user.nickName,
          ethAddress: user.ethAddress,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
