import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../utils/withSession';

import { pbkdf2Sync, randomBytes } from 'crypto';

import { db } from '../../utils/firebase-app';

import ERROR_MESSAGES from '../../utils/ERROR_MESSAGES';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { email, password, displayName } = req.body;

   if (!email || !password || !displayName) {
      return res
         .status(400)
         .json({ success: false, message: 'All fields are required' });
   }

   await db
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(async (users) => {
         if (!users.empty) {
            res.status(400).json({
               success: false,
               message: ERROR_MESSAGES[500].SERVER_ERROR,
            });
            return;
         }

         const salt = randomBytes(32);
         const hash = await pbkdf2Sync(
            Buffer.from(password),
            salt,
            100000,
            64,
            'sha512'
         );

         db.collection('users')
            .add({
               displayName,
               email,
               password: hash.toString('hex'),
               salt: salt.toString('hex'),
            })
            .then(async (user) => {
               const uid = user.id;
               req.session.user = {
                  id: uid,
                  name: displayName,
                  email,
               };
               await req.session.save();
               res.json({ success: true });
            })
            .catch((error) => {
               res.status(400).json({
                  success: false,
                  message: ERROR_MESSAGES[500].SERVER_ERROR,
               });
            });
      })
      .catch((error) => {
         res.status(400).json({
            success: false,
            message: ERROR_MESSAGES[500].SERVER_ERROR,
         });
      });
}

export default withSessionRoute(handler);
