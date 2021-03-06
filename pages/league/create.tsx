import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Button, InputField } from '../../components/base';
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

  const onSubmit = async (values: League) => {
    const { data } = await addLeague({
      variables: { creatorId: user?.uid, ...values },
    });
    router.push(`/league/${data.league.id}`);
  };

  return (
    <div className="container mx-auto px-24">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ errors, touched, handleSubmit }) => (
          <>
            <InputField
              id="league-name"
              type="text"
              name="name"
              placeholder="Your Awesome League"
              label="League Name"
            />
            {errors.name && touched.name && <div>{errors.name}</div>}
            <InputField
              id="league-year"
              type="number"
              name="year"
              step="1"
              label="Inaugural Year"
            />
            {errors.year && touched.year && <div>{errors.year}</div>}
            <div>
              <Button type="submit" onClick={() => handleSubmit()}>
                Create
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateLeague;
