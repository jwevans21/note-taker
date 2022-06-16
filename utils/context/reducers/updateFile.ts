import { Folder } from '../../files.types';
import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';


function modifyFolder(
   folder: Folder,
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['UPDATE_FILE'],
   path: string[],
   index: number
): Folder {
   if (index === path.length - 1) {
      return {
         ...folder,
         files: folder.files.map((file) => {
            if (file.id === state.currentFile?.id) {
               return {
                  ...file,
                  content: payload.content,
                  updatedAt: new Date().toISOString(),
               };
            } else {
               return file;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   } else {
      return {
         ...folder,
         folders: folder.folders.map((f) => {
            if (f.id === path[index]) {
               return modifyFolder(f, state, payload, path, index + 1);
            } else {
               return f;
            }
         }),
         updatedAt: new Date().toISOString(),
      };
   }
}

export function updateFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['UPDATE_FILE']
): FilesContextType {
   if (state.currentFile === null) {
      return state;
   } else {
      const path = state.currentFile.path.split('/');
      if (path.length === 2) {
         return {
            ...state,
            files: state.files.map((file) => {
               if (file.id === state.currentFile?.id) {
                  return {
                     ...file,
                     content: payload.content,
                     updatedAt: new Date().toISOString(),
                  };
               } else {
                  return file;
               }
            }),
         };
      } else {
         let index = 1;
         return {
            ...state,
            folders: state.folders.map((folder) => {
               if (folder.id === path[index]) {
                  return modifyFolder(folder, state, payload, path, index + 1);
               } else {
                  return folder;
               }
            }),
         };
      }
   }
}
