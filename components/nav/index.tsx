import { useRouter } from 'next/router';
import { useAuth } from '../../util/useAuth';
import { Button } from '../base';

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-8 bg-white">
      <div>Basketball Sim</div>
      <div className="flex mt-5 lg:mt-0 lg:ml-4">
        {user && <span>{user.email}</span>}
        {logout && <Button onClick={() => logout()} text="Sign Out" />}
      </div>
    </nav>
  );
};

export default Navigation;
