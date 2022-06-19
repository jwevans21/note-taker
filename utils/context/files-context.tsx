import React from 'react';

import type { ReducedFilesContextType } from './reducer.types';

const FilesContext = React.createContext<ReducedFilesContextType>({
   state: {
      currentFile: null,
      deleteFileDialog: {
         open: false,
      },
      deleteFolderDialog: {
         open: false,
      },
      files: [],
      folders: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   },
   dispatch: () => {},
});

const useFilesContext = () =>
   React.useContext<ReducedFilesContextType>(FilesContext);

export { FilesContext, useFilesContext };
