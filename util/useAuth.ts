import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { AuthContext, AuthState, UserState } from './provider';

const useAuth = (): UserState => {
  return useContext(AuthContext);
};

const useProtectedAuth = (): UserState => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (auth.state === AuthState.OUT) {
      router.push('/login');
    }
  }, [auth?.state]);

  return auth;
};

export { useAuth, useProtectedAuth };
