import type { File, Folder } from '../files.types';

import type { ACTION_TYPE, ACTION_PAYLOAD_TYPES } from './payloads';

export type FilesContextType = {
   // Local
   currentFile: {
      id: string;
      path: string;
      name: string;
   } | null;
   deleteFileDialog:
      | {
           open: true;
           id: string;
           path: string;
           name: string;
           close: () => void;
        }
      | {
           open: false;
        };
   renameFileDialog:
      | {
           open: boolean;
           id: string;
           name: string;
           path: string;
           close: () => void;
        }
      | {
           open: false;
        };
   deleteFolderDialog:
      | {
           open: true;
           id: string;
           path: string;
           name: string;
           close: () => void;
        }
      | {
           open: false;
        };
   renameFolderDialog:
      | {
           open: true;
           id: string;
           path: string;
           name: string;
           close: () => void;
        }
      | {
           open: false;
        };
   // Shared
   files: File[] | [];
   folders: Folder[] | [];
   createdAt: string;
   updatedAt: string;
};

export type Action =
   // Files
   | {
        type: ACTION_TYPE['ADD_FILE'];
        payload: ACTION_PAYLOAD_TYPES['ADD_FILE'];
     }
   | {
        type: ACTION_TYPE['RENAME_FILE'];
        payload: ACTION_PAYLOAD_TYPES['RENAME_FILE'];
     }
   | {
        type: ACTION_TYPE['UPDATE_FILE'];
        payload: ACTION_PAYLOAD_TYPES['UPDATE_FILE'];
     }
   | {
        type: ACTION_TYPE['SAVE_FILE'];
        payload?: ACTION_PAYLOAD_TYPES['SAVE_FILE'];
     }
   | {
        type: ACTION_TYPE['DOWNLOAD_FILE'];
        payload: ACTION_PAYLOAD_TYPES['DOWNLOAD_FILE'];
     }
   | {
        type: ACTION_TYPE['DELETE_FILE'];
        payload: ACTION_PAYLOAD_TYPES['DELETE_FILE'];
     }
   // Folders
   | {
        type: ACTION_TYPE['ADD_FOLDER'];
        payload: ACTION_PAYLOAD_TYPES['ADD_FOLDER'];
     }
   | {
        type: ACTION_TYPE['RENAME_FOLDER'];
        payload: ACTION_PAYLOAD_TYPES['RENAME_FOLDER'];
     }
   | {
        type: ACTION_TYPE['DELETE_FOLDER'];
        payload: ACTION_PAYLOAD_TYPES['DELETE_FOLDER'];
     }
   // Site
   | {
        type: ACTION_TYPE['SET_CURRENT_FILE'];
        payload: ACTION_PAYLOAD_TYPES['SET_CURRENT_FILE'];
     }
   //File Dialogs
   | {
        type: ACTION_TYPE['OPEN_DELETE_FILE_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['OPEN_DELETE_FILE_DIALOG'];
     }
   | {
        type: ACTION_TYPE['CLOSE_DELETE_FILE_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['CLOSE_DELETE_FILE_DIALOG'];
     }
   | {
        type: ACTION_TYPE['OPEN_RENAME_FILE_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['OPEN_RENAME_FILE_DIALOG'];
     }
   | {
        type: ACTION_TYPE['CLOSE_RENAME_FILE_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['CLOSE_RENAME_FILE_DIALOG'];
     }
   //Folder Dialogs
   | {
        type: ACTION_TYPE['OPEN_DELETE_FOLDER_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['OPEN_DELETE_FOLDER_DIALOG'];
     }
   | {
        type: ACTION_TYPE['CLOSE_DELETE_FOLDER_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['CLOSE_DELETE_FOLDER_DIALOG'];
     }
   | {
        type: ACTION_TYPE['OPEN_RENAME_FOLDER_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['OPEN_RENAME_FOLDER_DIALOG'];
     }
   | {
        type: ACTION_TYPE['CLOSE_RENAME_FOLDER_DIALOG'];
        payload: ACTION_PAYLOAD_TYPES['CLOSE_RENAME_FOLDER_DIALOG'];
     };

export type ReducedFilesContextType = {
   state: FilesContextType;
   dispatch: (action: Action) => void;
};
