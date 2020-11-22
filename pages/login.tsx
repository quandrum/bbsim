import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';
import { Lock, User, EyeOff, Eye } from 'react-feather';
import Head from 'next/head';
import { Button, Input, Link } from '../components/base';

// Todo actually handle errors
const login: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState<{
    name?: string;
    pass?: string;
    remember?: boolean;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<firebase.auth.Error>();

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.name || !form.pass) {
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(form.name, form.pass)
        .then(() => router.push('/'))
        .catch(setError);
    },
    [form]
  );

  return (
    <>
      <Head>
        <title>Login | Basketball Sim</title>
      </Head>
      <div className="flex justify-center pt-32">
        <div className="flex flex-col items-center w-full bg-gray-900 rounded-lg xlg:w-1/2 lg:1/3 md:w-3/5">
          <h1 className="my-10 text-2xl font-bold text-white"> Login </h1>
          <form
            onSubmit={submit}
            className="flex flex-col w-8/12 mt-2 lg:w-1/2"
          >
            <Input
              preIcon={<User />}
              type="text"
              autoComplete="username"
              className="relative self-center flex-1 flex-grow flex-shrink w-px h-10 px-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, name: e.currentTarget.value })
              }
            />
            <div className="relative flex flex-wrap items-center w-full mb-4 bg-white rounded h-15">
              <div className="flex justify-center p-4 -mr-px w-15">
                <span className="flex items-center px-3 text-xl leading-normal text-gray-600 whitespace-no-wrap bg-white rounded rounded-r-none">
                  <Lock />
                </span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="relative self-center flex-1 flex-grow flex-shrink w-px h-10 px-3 text-xl leading-normal border-0 outline-none font-roboto"
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, pass: e.currentTarget.value })
                }
              />
              <div className="flex">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="flex items-center px-4 text-gray-600 whitespace-no-wrap bg-white border-0 rounded rounded-l-none leadng-normal focus:outline-none"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
            <div className="flex content-space-between">
              <Link onClick={() => router.push('/signup')}>Sign Up</Link>
              <Link onClick={() => router.push('/forgot')}>
                Forget Password ?
              </Link>
            </div>
            {error?.message && (
              <div className="text-red-500">{error.message}</div>
            )}
            <Button type="submit" onClick={submit}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default login;
