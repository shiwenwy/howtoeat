import { useAuth } from 'src/hooks/use-auth';

export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  
  const { user } = useAuth();

  if (!user) {
    return {};
  }

  return {
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    ethAddress: user.ethAddress,
  };
};
