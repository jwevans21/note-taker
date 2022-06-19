import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

export function currentFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['SET_CURRENT_FILE'],
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   if (state.currentFile ? state.currentFile.id === payload.id : false) {
      setState((currentState) => currentState);
   } else {
      setState((currentState) => ({
         ...currentState,
         currentFile: {
            id: payload.id,
            path: payload.path,
            name: payload.name,
         },
      }));
   }
}
