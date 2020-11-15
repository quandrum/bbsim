import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { Router, useRouter } from 'next/router';
import { useAuth } from '../util/useAuth';

const SignUp: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<{
    name?: string;
    pass?: string;
  }>({});

  const submit = useCallback(
    async (e) => {
      if (!form.name || !form.pass) {
        return;
      }
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
      }
    },
    [form]
  );

  return (
    <div className="container flex flex-col mx-auto">
      <label htmlFor="username">Username</label>
      <input
        className="border border-grey-500"
        type="text"
        name="username"
        required
        onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="border border-grey-500"
        type="password"
        name="password"
        required
        onChange={(e) => setForm({ ...form, pass: e.currentTarget.value })}
      />
      <button type="submit" onClick={submit}>
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
