import { json, send } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { Payload } from '../../../util/types';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let payload: Payload<string>;
  try {
    payload = await json(req);
  } catch (error) {
    send(res, 400, { error });
    return;
  }

  const {
    event: { data },
  } = payload;

  send(res, 500, { error: 'oops' });
};
