import { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { User } from 'react-feather';
import { firebase } from '../util/firebaseClient';
import { Button, FullContainer, Input } from '../components/base';

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
      <FullContainer title="Password Reset">
        <form onSubmit={submit} className="flex flex-col w-8/12 mt-2 lg:w-1/2">
          <Input
            preIcon={<User />}
            type="text"
            autoComplete="username"
            className="relative self-center flex-1 flex-grow flex-shrink w-px h-10 px-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <Button type="submit" onClick={submit}>
            Send Password Reset
          </Button>
        </form>
      </FullContainer>
    </>
  );
};

export default ForgetYourPassword;
