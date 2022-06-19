import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';
import type { AddFileAPIResponse } from '../../api/data.types';

export function createFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FILE'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
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
      .then(async (res) => {
         return (await res.json()) as AddFileAPIResponse;
      })
      .then((json) => {
         if (json.success) {
            setState((currentState) => ({
               ...state,
               currentFile: {
                  id: json.added.id,
                  name: json.added.name,
                  path: payload.path,
               },
               files: json.data.files,
               folders: json.data.folders,
               updatedAt: json.data.updatedAt,
            }));
         } else {
            console.error(json.error);
         }
      })
      .catch((err) => {
         console.error(err);
      });
}
