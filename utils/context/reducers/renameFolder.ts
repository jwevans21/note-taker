import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';
import type { RenameFileAPIResponse } from '../../api/data.types';

export function renameFolder(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['RENAME_FOLDER'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   fetch('/api/data/folders/rename', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         id: payload.id,
         name: payload.name,
         path: payload.path,
      }),
   })
      .then(async (res) => {
         return (await res.json()) as RenameFileAPIResponse;
      })
      .then((json) => {
         if (json.success) {
            setState((currentState) => ({
               ...currentState,
               currentFile: null,
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
