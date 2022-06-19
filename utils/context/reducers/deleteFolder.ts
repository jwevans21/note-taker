import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';
import type { DeleteFolderAPIResponse } from '../../api/data.types';

export function deleteFolder(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['DELETE_FOLDER'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   fetch('/api/data/folders/delete', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         id: payload.id,
         path: payload.path,
      }),
   })
      .then(async (res) => {
         return (await res.json()) as DeleteFolderAPIResponse;
      })
      .then((json) => {
         if (json.success) {
            setState((currentState) => ({
               ...currentState,
               currentFile:
                  state.currentFile?.id === payload.id
                     ? null
                     : state.currentFile,
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
