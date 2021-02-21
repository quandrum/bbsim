import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ONE_LEAGUE } from '../../queries';

const ViewLeague: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_ONE_LEAGUE, {
    variables: { id },
  });

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error) {
    return <h1>oops</h1>;
  }

  const league = data.leagues[0];

  return (
    <h1>
      Hi league {league.name} Its Year {league.year} and week {league.week}
    </h1>
  );
};

export default ViewLeague;
