import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';
import { Lock, User, EyeOff, Eye } from 'react-feather';
import Head from 'next/head';

type loginProps = {};

const login: React.FC<loginProps> = () => {
  const router = useRouter();

  const [form, setForm] = useState<{
    name?: string;
    pass?: string;
    remember?: boolean;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const submit = useCallback(
    (e) => {
      if (form.remember) {
        firebase
          .auth()
          .setPersistence(
            form.remember
              ? firebase.auth.Auth.Persistence.LOCAL
              : firebase.auth.Auth.Persistence.SESSION
          );
      }
      if (!form.name || !form.pass) {
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(form.name, form.pass)
        .then(() => router.push('/'));
    },
    [form]
  );

  return (
    <>
      <Head>
        <title>Login | Basketball Sim</title>
      </Head>
      <div className="flex justify-center pt-32">
        <div className="flex flex-col items-center bg-gray-900 rounded-lg lg:w-1/2 md:w-3/5">
          <h1 className="my-10 text-2xl font-bold text-white"> Login </h1>
          <form className="flex flex-col w-8/12 mt-2 lg:w-1/2">
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
                onChange={(e) =>
                  setForm({ ...form, name: e.currentTarget.value })
                }
              />
            </div>
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center px-4 text-gray-600 whitespace-no-wrap bg-white border-0 rounded rounded-l-none leadng-normal focus:outline-none"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
            <a
              href="#"
              className="mb-6 text-base leading-normal text-left text-white font-roboto hover:underline"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </a>
            <a
              href="#"
              className="mb-6 text-base leading-normal text-right text-white font-roboto hover:underline"
              onClick={() => router.push('/forgot')}
            >
              Forget Password ?
            </a>
            <button
              type="submit"
              onClick={submit}
              className="py-4 mt-4 mb-20 font-sans text-xl leading-tight text-center text-white bg-orange-400 rounded px-17 md:px-12 md:py-4 md:text-base"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
  {
    /* <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        required
        onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        onChange={(e) => setForm({ ...form, pass: e.currentTarget.value })}
      />
      <label htmlFor="remember_me">Remember me?</label>
      <input
        type="checkbox"
        name="remember_me"
        onClick={(e) => setForm({ ...form, remember: e.currentTarget.checked })}
      />
      <button type="submit" onClick={submit}>
        Login
      </button>
    </div> */
  }
};
export default login;