import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {
   Data,
   RenameFolderAPIPayload,
   RenameFolderAPIResponse,
} from '../../../../utils/api/data.types';
import type { Folder, File } from '../../../../utils/files.types';

import { withSessionRoute } from '../../../../utils/withSession';
import { db } from '../../../../utils/firebase-app';

import { idExistsInState } from '../../../../utils/api/helpers';

const emptyFolder: Folder = {
   id: '',
   name: '',
   files: [],
   folders: [],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
};

function renameFolderInFolder(
   folder: Folder,
   id: string,
   path: string[],
   name: string,
   index: number
): Folder {
   if (index === path.length - 1) {
      return {
         ...folder,
         folders: [
            {
               ...(folder.folders.find((file) => file.id === id) || emptyFolder),
               name: name,
               updatedAt: new Date().toISOString(),
            },
            ...folder.folders.filter((f) => f.id !== id),
         ],
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return renameFolderInFolder(f, id, path, name, index + 1);
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
   res: NextApiResponse<RenameFolderAPIResponse>
) => {
   const body = req.body as RenameFolderAPIPayload;
   const { id, path, name } = body;
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
         folders: [
            {
               ...(updatedData.folders.find((file) => file.id === id) ||
                  emptyFolder),
               name: name,
               updatedAt: new Date().toISOString(),
            },
            ...updatedData.folders.filter((file) => file.id !== id),
         ],
         updatedAt: new Date().toISOString(),
      };
   } else {
      let index = 1;
      updatedData = {
         ...updatedData,
         folders: updatedData.folders.map((folder) => {
            if (folder.id === pathArray[index]) {
               return renameFolderInFolder(
                  folder,
                  id,
                  pathArray,
                  name,
                  index + 1
               );
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
