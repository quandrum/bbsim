import Head from 'next/head';
import { useRouter } from 'next/router';
import { FullContainer } from '../components/base';

const Reminded: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Password Resent Sent | Basketball Sim</title>
      </Head>
      <FullContainer title=" Password Reset Sent!" />
    </>
  );
};

export default Reminded;
