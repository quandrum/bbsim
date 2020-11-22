import { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { User } from 'react-feather';
import { firebase } from '../util/firebaseClient';
import { Button } from '../components/base';

const ForgetYourPassword: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username) {
        return;
      }
      firebase
        .auth()
        .sendPasswordResetEmail(username)
        .then(() => router.push('/reminded'));
    },
    [username]
  );

  return (
    <>
      <Head>
        <title>Forget Your Password | Basketball Sim</title>
      </Head>
      <div className="flex justify-center pt-32">
        <div className="flex flex-col items-center w-full bg-gray-900 rounded-lg xlg:w-1/2 lg:1/3 md:w-3/5">
          <h1 className="my-10 text-2xl font-bold text-white">
            Password Reset
          </h1>
          <form
            onSubmit={submit}
            className="flex flex-col w-8/12 mt-2 lg:w-1/2"
          >
            <div className="relative flex flex-wrap items-center w-full pr-10 mb-6 bg-white rounded h-15">
              <div className="flex justify-center p-4 -mr-px w-15">
                <span className="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none">
                  <User />
                </span>
              </div>
              <input
                type="text"
                autoComplete="username"
                className="relative self-center flex-1 flex-grow flex-shrink w-px h-10 px-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
                placeholder="Username"
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <Button type="submit" onClick={submit}>
              Send Password Reset
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetYourPassword;
