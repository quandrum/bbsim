import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GET_MY_LEAGUES } from '../../queries';
import { Button } from '../base';

type League = {
  name: string;
  id: string;
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
      {!data || (data.leagues.length === 0 && <div>No Leagues found!</div>)}
      {data &&
        data.leagues.map((league) => (
          <div key={league.id}>
            <Link href={`/league/${league.id}`}>
              <a>{league.name}</a>
            </Link>
          </div>
        ))}
      <Button onClick={() => router.push('/league/create')}>Create</Button>
    </div>
  );
};

export default LeaguesOverview;
