export enum ACTIONS {
   ADD_FILE = 'ADD_FILE',
   DELETE_FILE = 'DELETE_FILE',
   ADD_FOLDER = 'ADD_FOLDER',
   UPDATE_FILE = 'UPDATE_FILE',
   SET_CURRENT_FILE = 'SET_CURRENT_FILE',
   SAVE_FILE = 'SAVE_FILE',
   DOWNLOAD_FILE = 'DOWNLOAD_FILE',
}

export type ACTION_TYPE = {
   ADD_FILE: ACTIONS.ADD_FILE;
   DELETE_FILE: ACTIONS.DELETE_FILE;
   ADD_FOLDER: ACTIONS.ADD_FOLDER;
   UPDATE_FILE: ACTIONS.UPDATE_FILE;
   SET_CURRENT_FILE: ACTIONS.SET_CURRENT_FILE;
   SAVE_FILE: ACTIONS.SAVE_FILE;
   DOWNLOAD_FILE: ACTIONS.DOWNLOAD_FILE;
};

export type ACTION_PAYLOAD_TYPES = {
   ADD_FILE: {
      name: string;
      path: string;
      content: string;
   };
   DELETE_FILE: {
      id: string;
      path: string;
   };
   ADD_FOLDER: {
      name: string;
      path: string;
   };
   UPDATE_FILE: {
      content: string;
   };
   SET_CURRENT_FILE: {
      id: string;
      path: string;
      name: string;
   };
   SAVE_FILE: null;
   DOWNLOAD_FILE: null;
};
