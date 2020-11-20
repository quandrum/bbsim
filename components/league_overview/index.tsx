import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_MY_LEAGUES } from '../../queries';
import { Button } from '../base';

const LeaguesOverview: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_MY_LEAGUES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.leagues);

  return (
    <div>
      <h1>Leagues</h1>
      {data.leagues.length === 0 && <div>No Leagues found!</div>}
      <Button onClick={() => router.push('/league/create')} text={'Create'} />
    </div>
  );
};

export default LeaguesOverview;
