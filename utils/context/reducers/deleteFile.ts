import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';
import type { DeleteFileAPIResponse } from '../../api/data.types';

export function deleteFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['DELETE_FILE'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   fetch('/api/data/files/delete', {
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
         return (await res.json()) as DeleteFileAPIResponse;
      })
      .then((json) => {
         if (json.success) {
            setState({
               ...state,
               currentFile: null,
               files: json.data.files,
               folders: json.data.folders,
               updatedAt: json.data.updatedAt,
            });
         } else {
            console.error(json.error);
         }
      })
      .catch((err) => {
         console.error(err);
      });
}
