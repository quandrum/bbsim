import { useMutation } from '@apollo/client';

import { CREATE_LEAGUE } from '../../queries';
import { Button } from '../../components/base';
import { useAuth } from '../../util/useAuth';

const CreateLeague: React.FC = () => {
  const { user } = useAuth();
  const [addLeague, { data, loading }] = useMutation(CREATE_LEAGUE);
  return (
    <Button
      onClick={() =>
        addLeague({ variables: { name: `Test league`, creatorId: user?.uid } })
      }
    >
      Create
    </Button>
  );
};

export default CreateLeague;
