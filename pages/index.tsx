import Head from 'next/head';
import LeaguesOverview from '../components/league_overview';
export default function Home() {
  return (
    <div>
      <Head>
        <title>BB Sim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto bg-grey-100">
        <LeaguesOverview />
      </main>

      <footer className="flex items-center justify-center p-8">
        Adam made this
      </footer>
    </div>
  );
}
