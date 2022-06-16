import { nanoid } from 'nanoid';
import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

import { idExistsInState } from '../helpers';
import { Folder } from '../../files.types';

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

export function createFolder(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FOLDER']
): FilesContextType {
   const id = nanoid();
   if (idExistsInState(state, id)) {
      return createFolder(state, payload);
   } else {
      const path = payload.path.split('/');
      const newFolder: Folder = {
         id: id,
         name: payload.name,
         files: [],
         folders: [],
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      };

      if (path.length === 1) {
         return {
            ...state,
            folders: [newFolder, ...state.folders],
         };
      } else {
         let index = 1;
         return {
            ...state,
            folders: state.folders.map((folder) => {
               if (folder.id === path[index]) {
                  return addFolderInFolder(folder, newFolder, path, index + 1);
               } else {
                  return folder;
               }
            }),
         };
      }
   }
}
