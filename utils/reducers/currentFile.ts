import { FilesContextType } from '../reducer.types';

type Payload = {
   id: string;
   path: string;
   name: string;
};

export function currentFile(
   state: FilesContextType,
   payload: Payload
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
