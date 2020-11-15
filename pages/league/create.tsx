import { useMutation } from '@apollo/client';

import { CREATE_LEAGUE } from '../../queries';
import { Button } from '../../components/base';
import { useAuth } from '../../util/useAuth';

const CreateLeague: React.FC = () => {
  const { user } = useAuth();
  const [addLeague, { data, loading }] = useMutation(CREATE_LEAGUE);
  return (
    <Button
      action={() =>
        addLeague({ variables: { name: `Test league`, creatorId: user?.uid } })
      }
      text="create"
    />
  );
};

export default CreateLeague;
