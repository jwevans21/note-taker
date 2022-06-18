import React from 'react';
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
   action: Action,
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   switch (action.type) {
      case 'ADD_FILE':
         return createFile(state, action.payload, setState);
      case 'ADD_FOLDER':
         return createFolder(state, action.payload, setState);
      case 'UPDATE_FILE':
         return updateFile(state, action.payload, setState);
      case 'SET_CURRENT_FILE':
         return currentFile(state, action.payload, setState);
      case 'DOWNLOAD_FILE':
         return downloadFile(state, action.payload, setState);
      default:
         console.error(new Error(`Unhandled action type: ${action.type}`));
         return setState(state);
   }
}
