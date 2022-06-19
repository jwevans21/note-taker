import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type {
   Data,
   RenameFileAPIPayload,
   RenameFileAPIResponse,
} from '../../../../utils/api/data.types';
import type { Folder, File } from '../../../../utils/files.types';

import { withSessionRoute } from '../../../../utils/withSession';
import { db } from '../../../../utils/firebase-app';

import { idExistsInState } from '../../../../utils/api/helpers';

const emptyFile: File = {
   id: '',
   name: '',
   content: '',
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
};

function renameFileInFolder(
   folder: Folder,
   id: string,
   path: string[],
   name: string,
   index: number
): Folder {
   if (index === path.length - 1) {
      return {
         ...folder,
         files: [
            {
               ...(folder.files.find((file) => file.id === id) || emptyFile),
               name: name,
               updatedAt: new Date().toISOString(),
            },
            ...folder.files.filter((f) => f.id !== id),
         ],
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return renameFileInFolder(f, id, path, name, index + 1);
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
   res: NextApiResponse<RenameFileAPIResponse>
) => {
   const body = req.body as RenameFileAPIPayload;
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
         files: [
            {
               ...(updatedData.files.find((file) => file.id === id) ||
                  emptyFile),
               name: name,
               updatedAt: new Date().toISOString(),
            },
            ...updatedData.files.filter((file) => file.id !== id),
         ],
         updatedAt: new Date().toISOString(),
      };
   } else {
      let index = 1;
      updatedData = {
         ...updatedData,
         folders: updatedData.folders.map((folder) => {
            if (folder.id === pathArray[index]) {
               return renameFileInFolder(
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
