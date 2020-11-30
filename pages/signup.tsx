import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';
import { Lock, User, EyeOff, Eye } from 'react-feather';
import Head from 'next/head';
import { Button, FullContainer, Input } from '../components/base';

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
      <FullContainer title="Sign up">
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
            autoComplete="new-password"
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
          {error?.message && (
            <div className="text-red-500">{error.message}</div>
          )}

          <Button type="submit" onClick={submit} disabled={saving}>
            Sign Up
          </Button>
        </form>
      </FullContainer>
    </>
  );
};
export default SignUp;
