import { useRouter } from 'next/router';
import { useAuth } from '../../util/useAuth';
import { Button } from '../base';

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-8 bg-white">
      <div>Basketball Sim</div>
      <div>
        {user && <span>{user.email}</span>}
        {!user && (
          <>
            <Button action={() => router.push('/signin')} text="Sign In" />
            <Button action={() => router.push('/signup')} text="Sign Up" />
          </>
        )}
        {logout && <Button action={() => logout()} text="Sign Out" />}
      </div>
    </nav>
  );
};

export default Navigation;
