import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../utils/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   req.session.user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@test.com',
   };
   await req.session.save();
   
   res.json({ success: true });
}

export default withSessionRoute(handler);
