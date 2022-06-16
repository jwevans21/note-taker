import React from 'react';

import type { File, Folder } from './files.types';

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
        type: 'ADD_FILE';
        payload: {
           name: string;
           content: string;
           path: string;
        };
     }
   | {
        type: 'ADD_FOLDER';
        payload: {
           name: string;
           path: string;
        };
     }
   | {
        type: 'UPDATE_FILE';
        payload: {
           content: string;
        };
     }
   | {
        type: 'SET_CURRENT_FILE';
        payload: {
           id: string;
           path: string;
           name: string;
        };
     }
   | {
        type: 'SAVE_FILE';
     }
   | {
        type: 'DOWNLOAD_FILE';
     };

export type ReducedFilesContextType = {
   state: FilesContextType;
   dispatch: React.Dispatch<Action>;
};
