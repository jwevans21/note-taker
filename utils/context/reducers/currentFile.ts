import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';


export function currentFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['SET_CURRENT_FILE']
): FilesContextType {
   if (state.currentFile ? state.currentFile.id === payload.id : false) {
      return state;
   } else {
      return {
         ...state,
         currentFile: {
            id: payload.id,
            path: payload.path,
            name: payload.name,
         },
      };
   }
}
