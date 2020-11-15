import React, { useCallback, useState } from 'react';
import { firebase } from '../util/firebaseClient';
import { useRouter } from 'next/router';

type loginProps = {};

const login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [form, setForm] = useState<{
    name?: string;
    pass?: string;
    remember?: boolean;
  }>({});

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
    <div>
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
    </div>
  );
};
export default login;
