import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function openDeleteFolderDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['OPEN_DELETE_FOLDER_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      deleteFolderDialog: {
         open: true,
         id: payload.id,
         path: payload.path,
         name: payload.name,
         close: payload.close,
      },
   }));
}

export function closeDeleteFolderDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['CLOSE_DELETE_FOLDER_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      deleteFolderDialog: {
         open: false,
      },
   }));
}
