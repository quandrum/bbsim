import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { AuthContext, AuthState } from './provider';

const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedAuth = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.state === AuthState.OUT) {
      router.push('/login');
    }
  }, [auth?.user]);

  return auth;
};

export { useAuth, useProtectedAuth };
