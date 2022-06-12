import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../utils/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   await req.session.destroy();

   res.redirect('/login');
}

export default withSessionRoute(handler);
