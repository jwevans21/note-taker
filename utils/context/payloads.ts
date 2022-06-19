export enum ACTIONS {
   // Files
   ADD_FILE = 'ADD_FILE',
   RENAME_FILE = 'RENAME_FILE',
   UPDATE_FILE = 'UPDATE_FILE',
   DELETE_FILE = 'DELETE_FILE',
   SAVE_FILE = 'SAVE_FILE',
   DOWNLOAD_FILE = 'DOWNLOAD_FILE',
   // Folders
   ADD_FOLDER = 'ADD_FOLDER',
   RENAME_FOLDER = 'RENAME_FOLDER',
   DELETE_FOLDER = 'DELETE_FOLDER',
   // Site
   SET_CURRENT_FILE = 'SET_CURRENT_FILE',
   OPEN_DELETE_FILE_DIALOG = 'OPEN_DELETE_FILE_DIALOG',
   CLOSE_DELETE_FILE_DIALOG = 'CLOSE_DELETE_FILE_DIALOG',
   OPEN_RENAME_FILE_DIALOG = 'OPEN_RENAME_FILE_DIALOG',
   CLOSE_RENAME_FILE_DIALOG = 'CLOSE_RENAME_FILE_DIALOG',
   OPEN_DELETE_FOLDER_DIALOG = 'OPEN_DELETE_FOLDER_DIALOG',
   CLOSE_DELETE_FOLDER_DIALOG = 'CLOSE_DELETE_FOLDER_DIALOG',
   OPEN_RENAME_FOLDER_DIALOG = 'OPEN_RENAME_FOLDER_DIALOG',
   CLOSE_RENAME_FOLDER_DIALOG = 'CLOSE_RENAME_FOLDER_DIALOG',
}

export type ACTION_TYPE = {
   // Files
   ADD_FILE: ACTIONS.ADD_FILE;
   RENAME_FILE: ACTIONS.RENAME_FILE;
   UPDATE_FILE: ACTIONS.UPDATE_FILE;
   DELETE_FILE: ACTIONS.DELETE_FILE;
   SAVE_FILE: ACTIONS.SAVE_FILE;
   DOWNLOAD_FILE: ACTIONS.DOWNLOAD_FILE;
   // Folders
   ADD_FOLDER: ACTIONS.ADD_FOLDER;
   RENAME_FOLDER: ACTIONS.RENAME_FOLDER;
   DELETE_FOLDER: ACTIONS.DELETE_FOLDER;
   // Site
   SET_CURRENT_FILE: ACTIONS.SET_CURRENT_FILE;
   OPEN_DELETE_FILE_DIALOG: ACTIONS.OPEN_DELETE_FILE_DIALOG;
   CLOSE_DELETE_FILE_DIALOG: ACTIONS.CLOSE_DELETE_FILE_DIALOG;
   OPEN_RENAME_FILE_DIALOG: ACTIONS.OPEN_RENAME_FILE_DIALOG;
   CLOSE_RENAME_FILE_DIALOG: ACTIONS.CLOSE_RENAME_FILE_DIALOG;
   OPEN_DELETE_FOLDER_DIALOG: ACTIONS.OPEN_DELETE_FOLDER_DIALOG;
   CLOSE_DELETE_FOLDER_DIALOG: ACTIONS.CLOSE_DELETE_FOLDER_DIALOG;
   OPEN_RENAME_FOLDER_DIALOG: ACTIONS.OPEN_RENAME_FOLDER_DIALOG;
   CLOSE_RENAME_FOLDER_DIALOG: ACTIONS.CLOSE_RENAME_FOLDER_DIALOG;
};

export type ACTION_PAYLOAD_TYPES = {
   // Files
   ADD_FILE: {
      name: string;
      path: string;
      content: string;
   };
   RENAME_FILE: {
      id: string;
      path: string;
      name: string;
   };
   UPDATE_FILE: {
      content: string;
   };
   DELETE_FILE: {
      id: string;
      path: string;
   };
   SAVE_FILE: null;
   DOWNLOAD_FILE: {
      path: string;
   };
   // Folders
   ADD_FOLDER: {
      name: string;
      path: string;
   };
   RENAME_FOLDER: {
      id: string;
      path: string;
      name: string;
   };
   DELETE_FOLDER: {
      id: string;
      path: string;
   };
   // Site
   SET_CURRENT_FILE: {
      id: string;
      path: string;
      name: string;
   };
   OPEN_DELETE_FILE_DIALOG: {
      id: string;
      path: string;
      name: string;
      close: () => void;
   };
   CLOSE_DELETE_FILE_DIALOG: null;
   OPEN_RENAME_FILE_DIALOG: {
      id: string;
      path: string;
      name: string;
      close: () => void;
   };
   CLOSE_RENAME_FILE_DIALOG: null;
   OPEN_DELETE_FOLDER_DIALOG: {
      id: string;
      path: string;
      name: string;
      close: () => void;
   };
   CLOSE_DELETE_FOLDER_DIALOG: null;
   OPEN_RENAME_FOLDER_DIALOG: {
      id: string;
      path: string;
      name: string;
      close: () => void;
   };
   CLOSE_RENAME_FOLDER_DIALOG: null;
};
