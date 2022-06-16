import React from 'react';

import type { File, Folder } from '../files.types';

import type { ACTION_TYPE, ACTION_PAYLOAD_TYPES } from './payloads';

export type FilesContextType = {
   currentFile: {
      id: string;
      path: string;
      name: string;
   } | null;
   files: File[] | [];
   folders: Folder[] | [];
};

export type Action =
   | {
        type: ACTION_TYPE['ADD_FILE'];
        payload: ACTION_PAYLOAD_TYPES['ADD_FILE'];
     }
   | {
        type: ACTION_TYPE['ADD_FOLDER'];
        payload: ACTION_PAYLOAD_TYPES['ADD_FOLDER'];
     }
   | {
        type: ACTION_TYPE['UPDATE_FILE'];
        payload: ACTION_PAYLOAD_TYPES['UPDATE_FILE'];
     }
   | {
        type: ACTION_TYPE['SET_CURRENT_FILE'];
        payload: ACTION_PAYLOAD_TYPES['SET_CURRENT_FILE'];
     }
   | {
        type: ACTION_TYPE['SAVE_FILE'];
        payload?: ACTION_PAYLOAD_TYPES['SAVE_FILE'];
     }
   | {
        type: ACTION_TYPE['DOWNLOAD_FILE'];
        payload?: ACTION_PAYLOAD_TYPES['DOWNLOAD_FILE'];
     };

export type ReducedFilesContextType = {
   state: FilesContextType;
   dispatch: React.Dispatch<Action>;
};
