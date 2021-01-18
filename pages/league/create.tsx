import { useMutation } from '@apollo/client';

import { CREATE_LEAGUE } from '../../queries';
import { Button, Input } from '../../components/base';
import { useAuth } from '../../util/useAuth';
import { useCallback, useState } from 'react';
import { Circle } from 'react-feather';

const CreateLeague: React.FC = () => {
  const { user } = useAuth();
  const [league, setLeague] = useState({});
  const [addLeague] = useMutation(CREATE_LEAGUE);
  const submit = useCallback(
    (e) => {
      e.preventDefault();
      addLeague({ variables: { creatorId: user?.uid, ...league } });
    },
    [league]
  );
  return (
    <form onSubmit={submit}>
      <Input
        placeholder="League Name"
        onChange={(e) => setLeague({ name: e.currentTarget.value, ...league })}
        preIcon={<Circle />}
      />
      <Button onClick={submit}>Create</Button>
    </form>
  );
};

export default CreateLeague;
