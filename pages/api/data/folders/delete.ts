import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {
   Data,
   DeleteFileAPIPayload,
   DeleteFileAPIResponse,
} from '../../../../utils/api/data.types';
import type { Folder } from '../../../../utils/files.types';

import { withSessionRoute } from '../../../../utils/withSession';
import { db } from '../../../../utils/firebase-app';

import { idExistsInState } from '../../../../utils/api/helpers';

function deleteFolderInFolder(
   folder: Folder,
   id: string,
   path: string[],
   index: number
): Folder {
   if (index === path.length - 1) {
      return {
         ...folder,
         folders: folder.folders.filter((f) => f.id !== id),
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return deleteFolderInFolder(f, id, path, index + 1);
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
   res: NextApiResponse<DeleteFileAPIResponse>
) => {
   const body = req.body as DeleteFileAPIPayload;
   const { id, path } = body;
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

   if (!idExistsInState(data, id)) {
      res.status(400).json({ success: false, error: 'Path does not exist' });
      return;
   }

   let updatedData = data;

   const pathArray = path.split('/');

   if (pathArray.length === 2) {
      updatedData = {
         ...updatedData,
         folders: updatedData.folders.filter((file) => file.id !== id),
         updatedAt: new Date().toISOString(),
      };
   } else {
      let index = 1;
      updatedData = {
         ...updatedData,
         folders: updatedData.folders.map((folder) => {
            if (folder.id === pathArray[index]) {
               return deleteFolderInFolder(folder, id, pathArray, index + 1);
            } else {
               return folder;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   }

   await db.collection('users').doc(uid).update({
      data: updatedData,
   });

   res.status(200).json({ success: true, data: updatedData });
};

export default withSessionRoute(handler);
