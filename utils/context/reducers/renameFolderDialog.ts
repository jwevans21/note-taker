import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function openRenameFolderDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['OPEN_RENAME_FOLDER_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      renameFolderDialog: {
         open: true,
         id: payload.id,
         path: payload.path,
         name: payload.name,
         close: payload.close,
      },
   }));
}

export function closeRenameFolderDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['CLOSE_RENAME_FOLDER_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      renameFolderDialog: {
         open: false,
      },
   }));
}
