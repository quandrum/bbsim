import nookies from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { firebase } from './firebaseClient';

type userState = {
  user?: firebase.User;
  token?: string;
  logout?: () => void;
};

const AuthContext = createContext<userState>({});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<userState>({});

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser({});
        nookies.set(null, 'token', '', {});
        return;
      }

      const token = await user.getIdToken();
      const idTokenResult = await user.getIdTokenResult();

      setUser({ user, token, logout: () => firebase.auth().signOut() });
      nookies.set(null, 'token', token, {});
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
