import { nanoid } from 'nanoid';
import type { File, Folder } from '../../files.types';

import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

import { idExistsInState } from '../helpers';

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

export function createFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FILE']
): FilesContextType {
   const id = nanoid();
   if (idExistsInState(state, id)) {
      return createFile(state, payload);
   } else {
      const path = payload.path.split('/');
      const file = {
         id: id,
         name: payload.name,
         content: payload.content,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      };
      if (path.length === 1) {
         return {
            currentFile: {
               id,
               path: `${payload.path}/${id}`,
               name: payload.name,
            },
            folders: state.folders,
            files: [file, ...state.files],
         };
      } else {
         let index = 1;
         return {
            currentFile: {
               id,
               path: `${payload.path}/${id}`,
               name: payload.name,
            },
            files: state.files,
            folders: state.folders.map((folder) => {
               if (folder.id === path[index]) {
                  return addFileInFolder(folder, file, path, index + 1);
               } else {
                  return folder;
               }
            }),
         };
      }
   }
}
