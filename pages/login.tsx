import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';
import { Lock, User, EyeOff, Eye } from 'react-feather';
import Head from 'next/head';
import { Button, FullContainer, Input, Link } from '../components/base';

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
      <FullContainer title="Login">
        <form onSubmit={submit} className="flex flex-col w-8/12 mt-2 lg:w-1/2">
          <Input
            preIcon={<User />}
            type="text"
            autoComplete="username"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
          />
          <Input
            preIcon={<Lock />}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, pass: e.currentTarget.value })}
            postIcon={
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
            }
          />
          <div className="flex content-space-between">
            <Link className="mr-auto" onClick={() => router.push('/signup')}>
              Sign Up
            </Link>
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
      </FullContainer>
    </>
  );
};
export default login;
