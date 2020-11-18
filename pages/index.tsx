import Head from 'next/head';
import LeaguesOverview from '../components/league_overview';
import { useProtectedAuth } from '../util/useAuth';
import Navigation from '../components/nav';

export default function Home() {
  useProtectedAuth();

  return (
    <div className="bg-gray-200">
      <Head>
        <title>BB Sim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main>
        <LeaguesOverview />
      </main>

      <footer className="flex items-center justify-center p-8">
        Adam made this
      </footer>
    </div>
  );
}
