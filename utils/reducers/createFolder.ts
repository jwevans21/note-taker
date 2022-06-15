import { nanoid } from 'nanoid';
import { FilesContextType } from '../reducer.types';

type Payload = {
   name: string;
};

function idExistsInState(state: FilesContextType, id: string) {
   return (
      state.files.some((file) => file.id === id) ||
      state.folders.some((folder) => folder.id === id)
   );
}

export function createFolder(
   state: FilesContextType,
   payload: Payload
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
