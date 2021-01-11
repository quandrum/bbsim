export default async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: 'Bad method' });
    return;
  }
};
