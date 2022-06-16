import { nanoid } from 'nanoid';
import { FilesContextType } from '../reducer.types';

import type {ACTION_PAYLOAD_TYPES} from '../payloads';

function idExistsInState(state: FilesContextType, id: string) {
   return (
      state.files.some((file) => file.id === id) ||
      state.folders.some((folder) => folder.id === id)
   );
}

export function createFile(
   state: FilesContextType,
   payload: ACTION_PAYLOAD_TYPES['ADD_FILE']
): FilesContextType {
   const id = nanoid();
   if (idExistsInState(state, id)) {
      return createFile(state, payload);
   } else {
      return {
         currentFile: {
            id,
            path: `root/${id}`,
            name: payload.name,
         },
         folders: state.folders,
         files: [
            ...state.files,
            {
               id: id,
               name: payload.name,
               content: payload.content,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString(),
            },
         ],
      };
   }
}
