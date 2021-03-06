import Head from 'next/head';
import { ReactElement } from 'react';
import LeaguesOverview from '../../components/league_overview';
import { useProtectedAuth } from '../../util/useAuth';

export default function Home(): ReactElement {
  useProtectedAuth();

  return (
    <div>
      <Head>
        <title>BB Sim | League Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-5/6">
        <LeaguesOverview />
      </main>
    </div>
  );
}
