import { useContext } from 'react';
import { AuthContext } from './provider';

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
