import React from 'react';
import type { FilesContextType, Action } from './reducer.types';
import { ACTIONS } from './payloads';
import {
   createFile,
   renameFile,
   updateFile,
   deleteFile,
   downloadFile,
   createFolder,
   renameFolder,
   deleteFolder,
   currentFile,
   openDeleteFileDialog,
   closeDeleteFileDialog,
   openRenameFileDialog,
   closeRenameFileDialog,
   openDeleteFolderDialog,
   closeDeleteFolderDialog,
   openRenameFolderDialog,
   closeRenameFolderDialog,
} from './reducers';

export function filesReducer(
   state: FilesContextType,
   action: Action,
   setState: React.Dispatch<React.SetStateAction<FilesContextType>>
): void {
   switch (action.type) {
      // File Actions
      case ACTIONS.ADD_FILE:
         return createFile(state, action.payload, setState);
      case ACTIONS.RENAME_FILE:
         return renameFile(state, action.payload, setState);
      case ACTIONS.UPDATE_FILE:
         return updateFile(state, action.payload, setState);
      case ACTIONS.DELETE_FILE:
         return deleteFile(state, action.payload, setState);
      case ACTIONS.DOWNLOAD_FILE:
         return downloadFile(state, action.payload, setState);
      // Folder Actions
      case ACTIONS.ADD_FOLDER:
         return createFolder(state, action.payload, setState);
      case ACTIONS.RENAME_FOLDER:
         return renameFolder(state, action.payload, setState);
      case ACTIONS.DELETE_FOLDER:
         return deleteFolder(state, action.payload, setState);
      // Site Actions
      case ACTIONS.SET_CURRENT_FILE:
         return currentFile(state, action.payload, setState);
      // Site Actions - File Dialogs
      case ACTIONS.OPEN_DELETE_FILE_DIALOG:
         return openDeleteFileDialog(state, action.payload, setState);
      case ACTIONS.CLOSE_DELETE_FILE_DIALOG:
         return closeDeleteFileDialog(state, action.payload, setState);
      case ACTIONS.OPEN_RENAME_FILE_DIALOG:
         return openRenameFileDialog(state, action.payload, setState);
      case ACTIONS.CLOSE_RENAME_FILE_DIALOG:
         return closeRenameFileDialog(state, action.payload, setState);
      // Site Actions - Folder Dialogs
      case ACTIONS.OPEN_DELETE_FOLDER_DIALOG:
         return openDeleteFolderDialog(state, action.payload, setState);
      case ACTIONS.CLOSE_DELETE_FOLDER_DIALOG:
         return closeDeleteFolderDialog(state, action.payload, setState);
      case ACTIONS.OPEN_RENAME_FOLDER_DIALOG:
         return openRenameFolderDialog(state, action.payload, setState);
      case ACTIONS.CLOSE_RENAME_FOLDER_DIALOG:
         return closeRenameFolderDialog(state, action.payload, setState);
      default:
         console.error(new Error(`Unhandled action type: ${action.type}`));
         break;
   }
}
