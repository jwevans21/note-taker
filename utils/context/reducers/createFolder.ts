import { nanoid } from 'nanoid';
import { FilesContextType } from '../reducer.types';

import type { ACTION_PAYLOAD_TYPES } from '../payloads';

function idExistsInState(state: FilesContextType, id: string) {
   return (
      state.files.some((file) => file.id === id) ||
      state.folders.some((folder) => folder.id === id)
   );
}

export function createFolder(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FOLDER']
): FilesContextType {
   const id = nanoid();
   if (idExistsInState(state, id)) {
      return createFolder(state, payload);
   } else {
      return {
         ...state,
         folders: [
            ...state.folders,
            {
               id: id,
               name: payload.name,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString(),
               files: [],
               folders: [],
            },
         ],
      };
   }
}
