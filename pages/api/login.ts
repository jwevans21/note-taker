import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../utils/withSession';

import { db } from '../../utils/firebase-app';

import ERROR_MESSAGES from '../../utils/ERROR_MESSAGES';
import { pbkdf2Sync, timingSafeEqual } from 'crypto';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400).json({
         success: false,
         message: 'Email and password are required',
      });
      return;
   }

   await db
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(async (users) => {
         if (users.empty) {
            res.status(400).json({ success: false, message: 'User not found' });
            return;
         }

         if (users.docs.length > 1) {
            res.status(400).json({
               success: false,
               message: ERROR_MESSAGES[500].SERVER_ERROR,
            });
            return;
         } else {
            const user = users.docs[0];
            const userData = user.data();
            const uid = user.id;
            const hash = await pbkdf2Sync(
               Buffer.from(password),
               Buffer.from(userData.salt, 'hex'),
               100000,
               64,
               'sha512'
            );
            if (timingSafeEqual(hash, Buffer.from(userData.password, 'hex'))) {
               res.status(400).json({
                  success: false,
                  message: ERROR_MESSAGES[400].INVALID_PASSWORD,
               });
               return;
            }
            req.session.user = {
               id: uid,
               name: userData.displayName,
               email: userData.email,
            };
            await req.session.save();
            res.json({ success: true });
         }
      })
      .catch((error) => {
         res.status(400).json({
            success: false,
            message: ERROR_MESSAGES[500].SERVER_ERROR,
         });
      });
}

export default withSessionRoute(handler);
