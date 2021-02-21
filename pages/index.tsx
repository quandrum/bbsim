import Head from 'next/head';
import LeaguesOverview from '../components/league_overview';
import { useProtectedAuth } from '../util/useAuth';
import Navigation from '../components/nav';

export default function Home() {
  const auth = useProtectedAuth();

  return (
    <div>
      <Head>
        <title>BB Sim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-column"></div>
      <main className="h-5/6">
        <LeaguesOverview />
      </main>
    </div>
  );
}
