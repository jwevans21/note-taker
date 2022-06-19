import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {
   Data,
   AddFolderAPIPayload,
   AddFolderAPIResponse,
} from '../../../../utils/api/data.types';
import type { Folder } from '../../../../utils/files.types';

import { nanoid } from 'nanoid';

import { withSessionRoute } from '../../../../utils/withSession';
import { db } from '../../../../utils/firebase-app';

import { idExistsInState } from '../../../../utils/api/helpers';

function addFolderInFolder(
   folder: Folder,
   newFolder: Folder,
   path: string[],
   index: number
): Folder {
   if (index === path.length) {
      return {
         ...folder,
         folders: [newFolder, ...folder.folders],
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return addFolderInFolder(f, newFolder, path, index + 1);
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
   res: NextApiResponse<AddFolderAPIResponse>
) => {
   const body = req.body as AddFolderAPIPayload;
   const { name, path } = body;
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

   const newFolder: Folder = {
      id,
      name,
      folders: [],
      files: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   };

   let updatedData = data;

   const pathArray = path.split('/');

   if (pathArray.length === 2) {
      updatedData = {
         ...updatedData,
         folders: [newFolder, ...data.folders],
         updatedAt: new Date().toISOString(),
      };
   } else {
      let index = 1;
      updatedData = {
         ...updatedData,
         folders: data.folders.map((f) => {
            if (f.id === pathArray[index]) {
               return addFolderInFolder(f, newFolder, pathArray, index + 1);
            } else {
               return f;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   }

   await db.collection('users').doc(uid).update({
      data: updatedData,
   });

   res.status(200).json({
      success: true,
      data: updatedData,
      added: newFolder,
   });
};

export default withSessionRoute(handler);
