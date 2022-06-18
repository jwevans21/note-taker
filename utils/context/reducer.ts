import React from 'react';
import type { FilesContextType, Action } from './reducer.types';
import { ACTIONS } from './payloads';
import {
   createFile,
   deleteFile,
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
      case ACTIONS.ADD_FILE:
         return createFile(state, action.payload, setState);
      case ACTIONS.DELETE_FILE:
         return deleteFile(state, action.payload, setState);
      case ACTIONS.ADD_FOLDER:
         return createFolder(state, action.payload, setState);
      case ACTIONS.UPDATE_FILE:
         return updateFile(state, action.payload, setState);
      case ACTIONS.SET_CURRENT_FILE:
         return currentFile(state, action.payload, setState);
      case ACTIONS.DOWNLOAD_FILE:
         return downloadFile(state, action.payload, setState);
      default:
         console.error(new Error(`Unhandled action type: ${action.type}`));
         break;
   }
}
