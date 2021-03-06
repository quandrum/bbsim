import nookies from 'nookies';
import { createContext, ReactChild, useEffect, useState } from 'react';
import { firebase } from './firebaseClient';
import LogRocket from 'logrocket';

export enum AuthState {
  LOADING,
  IN,
  OUT,
}

export type UserState = {
  state: AuthState;
  user?: firebase.User;
  token?: string;
  logout?: () => void;
};

const AuthContext = createContext<UserState>({ state: AuthState.LOADING });

type Props = {
  children: ReactChild;
};

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<UserState>({
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
