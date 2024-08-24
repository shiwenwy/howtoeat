// requestUtils.js
import axios from 'axios';

//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // 设置基础URL，可从环境变量获取
const API_BASE_URL = 'https://api.coze.cn';

// 创建axios实例，可以在这里配置基础设置，如超时、headers等
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 默认请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 封装GET请求
export const get = async (url, params = {}, headers = {}) => {
  try {
    const response = await axiosInstance.get(url, { params, headers: { ...headers, ...axiosInstance.defaults.headers } });
    return response.data;
  } catch (error) {
    console.error('GET request failed:', url, error);
    return {};
  }
};

// 封装POST请求
export const post = async (url, data, headers = {}) => {
  try {
    const response = await axiosInstance.post(url, data, {
        headers: { ...headers, ...axiosInstance.defaults.headers }
    });
    return response.data;
  } catch (error) {
    console.error('POST request failed:', url, error);
    return {};
  }
};

// 根据需要添加更多请求方法，如PUT, DELETE等

// const getData = async () => {
//   const headers = {
//       'Authorization': 'Bearer pat_9RjduSpYcrMmaV0RXb0bchR0Nnbj6kalK14zFdrJveFrYHVXLavtjgY1r2NcaRZ0'
//     }
//     const query = {
//       'chat_id': '7401419780965629993',
//       'conversation_id': '7401419780965613609'
//   }
// const response = await get('/v3/chat/message/list', query, headers);
// console.log(response);
// return response.data
// }
// getData()