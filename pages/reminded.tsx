import { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { User } from 'react-feather';
import { firebase } from '../util/firebaseClient';

const Reminded: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Password Resent Sent | Basketball Sim</title>
      </Head>
      <div className="flex justify-center pt-32">
        <div className="flex flex-col items-center w-full bg-gray-900 rounded-lg xlg:w-1/2 lg:1/3 md:w-3/5">
          <h1 className="my-10 text-2xl font-bold text-white">
            Password Reset Sent!
          </h1>
        </div>
      </div>
    </>
  );
};

export default Reminded;
