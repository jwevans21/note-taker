import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function openRenameFileDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['OPEN_RENAME_FILE_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      renameFileDialog: {
         open: true,
         id: payload.id,
         path: payload.path,
         name: payload.name,
         close: payload.close,
      },
   }));
}

export function closeRenameFileDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['CLOSE_RENAME_FILE_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      renameFileDialog: {
         open: false,
      },
   }));
}
