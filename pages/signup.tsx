import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';
import { Lock, User, EyeOff, Eye } from 'react-feather';
import Head from 'next/head';

const SignUp: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<{
    name?: string;
    pass?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<firebase.auth.Error>();
  const [saving, setSaving] = useState<boolean>(false);

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.name || !form.pass) {
        return;
      }
      setSaving(true);
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(form.name, form.pass);

        const token = await user?.getIdToken();

        const res = await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          /// Force update to get claims
          await user?.getIdToken(true);
          router.push('/');
        } else {
          setSaving(false);
          setError({
            message: 'Something unexpected happened',
            code: 'unknown',
          });
        }
      } catch (e) {
        setSaving(false);
        setError(e);
      }
    },
    [form]
  );

  return (
    <>
      <Head>
        <title>Sign Up | Basketball Sim</title>
      </Head>
      <div className="flex justify-center pt-32">
        <div className="flex flex-col items-center w-full bg-gray-900 rounded-lg xlg:w-1/2 lg:1/3 md:w-3/5">
          <h1 className="my-10 text-2xl font-bold text-white">Sign Up</h1>
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
                placeholder="Email"
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
                autoComplete="new-password"
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
            {error?.message && (
              <div className="text-red-500">{error.message}</div>
            )}

            <button
              type="submit"
              onClick={submit}
              disabled={saving}
              className="py-4 mt-4 mb-20 font-sans text-xl leading-tight text-center text-white bg-yellow-600 rounded px-17 md:px-12 md:py-4 md:text-base"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
