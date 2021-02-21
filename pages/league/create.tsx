import { useMutation } from '@apollo/client';
import { Field, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { Button } from '../../components/base';
import { CREATE_LEAGUE } from '../../queries';
import { useAuth } from '../../util/useAuth';

const initialValues = {
  name: '',
  year: new Date().getFullYear(),
};

interface League {
  name: string;
  year: number;
}

const CreateLeague: React.FC = () => {
  const { user } = useAuth();
  const [addLeague] = useMutation(CREATE_LEAGUE);
  const router = useRouter();

  const onSubmit = async (values: League, actions: FormikHelpers<League>) => {
    const { data, errors } = await addLeague({
      variables: { creatorId: user?.uid, ...values },
    });
    router.push(`/league/${data.league.id}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <>
          <Field name="name" placeholder="League Name" />;
          <Field type="number" name="year" step="1" placeholder="Start Year" />
          <Button type="submit" onClick={() => handleSubmit()}>
            Create
          </Button>
        </>
      )}
    </Formik>
  );
};

export default CreateLeague;
