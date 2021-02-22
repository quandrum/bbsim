import nookies from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { firebase } from './firebaseClient';
import LogRocket from 'logrocket';

export enum AuthState {
  LOADING,
  IN,
  OUT,
}

type userState = {
  state: AuthState;
  user?: firebase.User;
  token?: string;
  logout?: () => void;
};

const AuthContext = createContext<userState>({ state: AuthState.LOADING });

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<userState>({
    state: AuthState.LOADING,
  });

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser({ state: AuthState.OUT });
        nookies.set(null, 'token', '', {});
        return;
      }

      const token = await user.getIdToken();

      LogRocket.identify(user.uid);

      setUser({
        user,
        token,
        logout: () => firebase.auth().signOut(),
        state: AuthState.IN,
      });
      nookies.set(null, 'token', token, {});
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
