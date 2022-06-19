import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';
import type { AddFolderAPIResponse } from '../../api/data.types';

export function createFolder(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FOLDER'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   fetch('/api/data/folders/add', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         name: payload.name,
         path: payload.path,
      }),
   })
      .then(async (res) => {
         return (await res.json()) as AddFolderAPIResponse;
      })
      .then((json) => {
         if (json.success) {
            setState((currentState) => ({
               ...currentState,
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
