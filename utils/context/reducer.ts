import type { FilesContextType, Action } from './reducer.types';
import {
   createFile,
   createFolder,
   updateFile,
   currentFile,
   downloadFile,
} from './reducers';

export function filesReducer(
   state: FilesContextType,
   action: Action
): FilesContextType {
   switch (action.type) {
      case 'ADD_FILE':
         return createFile(state, action.payload);
      case 'ADD_FOLDER':
         return createFolder(state, action.payload);
      case 'UPDATE_FILE':
         return updateFile(state, action.payload);
      case 'SET_CURRENT_FILE':
         return currentFile(state, action.payload);
      case 'DOWNLOAD_FILE':
         return downloadFile(state);
      default:
         console.error(new Error(`Unhandled action type: ${action.type}`));
         return state;
   }
}
