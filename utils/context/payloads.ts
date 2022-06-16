export const ACTIONS = {
   ADD_FILE: 'ADD_FILE',
   ADD_FOLDER: 'ADD_FOLDER',
   UPDATE_FILE: 'UPDATE_FILE',
   SET_CURRENT_FILE: 'SET_CURRENT_FILE',
   SAVE_FILE: 'SAVE_FILE',
   DOWNLOAD_FILE: 'DOWNLOAD_FILE',
};

export type ACTION_TYPE = {
   ADD_FILE: 'ADD_FILE';
   ADD_FOLDER: 'ADD_FOLDER';
   UPDATE_FILE: 'UPDATE_FILE';
   SET_CURRENT_FILE: 'SET_CURRENT_FILE';
   SAVE_FILE: 'SAVE_FILE';
   DOWNLOAD_FILE: 'DOWNLOAD_FILE';
};

export type ACTION_PAYLOAD_TYPES = {
   ADD_FILE: {
      name: string;
      path: string;
      content: string;
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
