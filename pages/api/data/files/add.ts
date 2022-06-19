import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {
   Data,
   AddFileAPIPayload,
   AddFileAPIResponse,
} from '../../../../utils/api/data.types';
import type { Folder, File } from '../../../../utils/files.types';

import { nanoid } from 'nanoid';

import { withSessionRoute } from '../../../../utils/withSession';
import { db } from '../../../../utils/firebase-app';

import { idExistsInState } from '../../../../utils/api/helpers';

function addFileInFolder(
   folder: Folder,
   file: File,
   path: string[],
   index: number
): Folder {
   if (index === path.length) {
      return {
         ...folder,
         files: [file, ...folder.files],
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return addFileInFolder(f, file, path, index + 1);
            } else {
               return f;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   }
}

const handler: NextApiHandler = async (
   req: NextApiRequest,
   res: NextApiResponse<AddFileAPIResponse>
) => {
   const body = req.body as AddFileAPIPayload;
   const { name, content, path } = body;
   const { session } = req;
   if (session === undefined) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
   }
   const { user } = session;
   if (user === undefined) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
   }
   const { id: uid } = user || {};
   if (uid === undefined) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
      return;
   }
   const data = ((await db.collection('users').doc(uid).get()).data()
      ?.data as Data) || {
      files: [],
      folders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   };

   let id = nanoid();
   while (idExistsInState(data, id)) {
      id = nanoid();
   }

   const file: File = {
      id,
      name,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   };

   let updatedData = data;

   const pathArray = path.split('/');

   if (pathArray.length === 2) {
      updatedData = {
         ...updatedData,
         files: [file, ...updatedData.files],
         updatedAt: new Date().toISOString(),
      };
   } else {
      let index = 1;
      updatedData = {
         ...updatedData,
         folders: updatedData.folders.map((f) => {
            if (f.id === pathArray[index]) {
               return addFileInFolder(f, file, pathArray, index + 1);
            } else {
               return f;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   }

   db.collection('users').doc(uid).update({
      data: updatedData,
   });

   res.status(200).json({ success: true, data: updatedData, added: file });
};

export default withSessionRoute(handler);
