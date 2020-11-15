// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firebaseAdmin } from '../util/firebaseAdmin';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.json({ error: 'Bad method' });
    return;
  }

  const token = req.headers?.authorization?.split(' ')[1];
  const user = await firebaseAdmin.auth().verifyIdToken(token);
  const claims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  };

  await firebaseAdmin.auth().setCustomUserClaims(user.uid, claims);

  res.statusCode = 204;
  res.end();
};
