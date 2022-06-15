import React from 'react';

import type {
   FilesContextType,
   Action,
   ReducedFilesContextType,
} from './reducer.types';
import {
   createFile,
   createFolder,
   updateFile,
   currentFile,
   downloadFile,
} from './reducers';

function filesReducer(
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

const FilesContext = React.createContext<ReducedFilesContextType>({
   state: {
      currentFile: null,
      files: [],
      folders: [],
   },
   dispatch: () => {},
});

const useFilesContext = () =>
   React.useContext<ReducedFilesContextType>(FilesContext);

type FilesProviderProps = {
   children: React.ReactNode;
   initialState: FilesContextType;
};

const FilesProvider = ({ children, initialState }: FilesProviderProps) => {
   const [state, dispatch] = React.useReducer<
      (state: FilesContextType, action: Action) => FilesContextType
   >(filesReducer, initialState);
   const value = { state: state, dispatch: dispatch };

   return (
      <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
   );
};

export { FilesContext, useFilesContext, FilesProvider };
