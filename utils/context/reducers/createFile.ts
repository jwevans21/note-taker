import { nanoid } from 'nanoid';
import type { File, Folder } from '../../files.types';

import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

import type { Data } from '../../api/data.types';

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
   payload: ACTION_PAYLOAD_TYPES['ADD_FILE'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   let newState = state;

   fetch('/api/data/files/add', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name: payload.name,
         content: payload.content,
         path: payload.path,
      }),
   })
      .then((res) => {
         return res.json();
      })
      .then(
         (
            json:
               | { success: true; data: Data, added: File }
               | { success: false; error: string }
         ) => {
            if (json.success) {
               console.log('json', json.data);
               setState({
                  ...newState,
                  currentFile: {
                     id: json.added.id,
                     name: json.added.name,
                     path: payload.path,
                  },
                  files: json.data.files,
                  folders: json.data.folders,
                  updatedAt: json.data.updatedAt,
               });
            } else {
               console.error(json.error);
               setState(newState);
            }
         }
      )
      .catch((err) => {
         console.error(err);
         setState(newState);
      });
}
