import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_MY_LEAGUES } from '../../queries';
import { Button } from '../base';

type League = {
  name: string;
  uuid: string;
};
type LeagueData = {
  leagues: League[];
};

const LeaguesOverview: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<LeagueData>(GET_MY_LEAGUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Leagues</h1>
      {!data || (data.leagues.length === 0 && <div>No Leagues found!</div>)}
      {data &&
        data.leagues.map((league) => (
          <Button onClick={() => router.push(`/league/${league.uuid}`)}>
            {league.name}
          </Button>
        ))}
      <Button onClick={() => router.push('/league/create')}>Create</Button>
    </div>
  );
};

export default LeaguesOverview;
