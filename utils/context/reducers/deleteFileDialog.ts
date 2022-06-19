import type { FilesContextType } from '../reducer.types';
import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function openDeleteFileDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['OPEN_DELETE_FILE_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      deleteFileDialog: {
         open: true,
         id: payload.id,
         path: payload.path,
         name: payload.name,
         close: payload.close,
      },
   }));
}

export function closeDeleteFileDialog(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['CLOSE_DELETE_FILE_DIALOG'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   setState((currentState) => ({
      ...currentState,
      deleteFileDialog: {
         open: false,
      },
   }));
}
