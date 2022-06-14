import React from 'react';

import type { File, Folder } from './files.types';

type FilesContextType = {
   files: File[] | [];
   folders: Folder[] | [];
};

type Action =
   | {
        type: 'ADD_FILE';
        payload: File;
     }
   | {
        type: 'ADD_FOLDER';
        payload: Folder;
     };

function filesReducer(
   state: FilesContextType,
   action: Action
): FilesContextType {
   switch (action.type) {
      case 'ADD_FILE':
         return {
            folders: state.folders,
            files: [...(state.files), action.payload],
         };
      case 'ADD_FOLDER':
         return {
            files: state.files,
            folders: [...(state.folders), action.payload],
         };
      default:
         return state;
   }
}

type ReducedFilesContextType = {
   state: FilesContextType;
   dispatch: React.Dispatch<Action>;
};

const FilesContext = React.createContext<ReducedFilesContextType>({
   state: {
      files:[],
      folders:[],
   },
   dispatch: () => {},
});

const useFilesContext = () => React.useContext<ReducedFilesContextType>(FilesContext);

type FilesProviderProps = {
   children: React.ReactNode;
   initialState: FilesContextType;
};

const FilesProvider = ({ children, initialState }: FilesProviderProps) => {
   const [state, dispatch] = React.useReducer<
      (state: FilesContextType, action: Action) => FilesContextType
   >(filesReducer, initialState);
   const value = { state, dispatch };

   return (
      <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
   );
};

export { FilesContext, useFilesContext, FilesProvider };
