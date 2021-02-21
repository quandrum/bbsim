import { useMutation } from '@apollo/client';
import { Field, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { Button } from '../../components/base';
import { CREATE_LEAGUE } from '../../queries';
import { useAuth } from '../../util/useAuth';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  year: new Date().getFullYear(),
};

interface League {
  name: string;
  year: number;
}

const schema = Yup.object().shape({
  name: Yup.string().min(4).max(50).required(),
  year: Yup.number()
    .min(1946)
    .max(initialValues.year + 1)
    .required(),
});

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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ errors, touched, handleSubmit }) => (
        <>
          <Field name="name" placeholder="League Name" />;
          {errors.name && touched.name && <div>{errors.name}</div>}
          <Field type="number" name="year" step="1" placeholder="Start Year" />
          {errors.year && touched.year && <div>{errors.year}</div>}
          <Button type="submit" onClick={() => handleSubmit()}>
            Create
          </Button>
        </>
      )}
    </Formik>
  );
};

export default CreateLeague;
