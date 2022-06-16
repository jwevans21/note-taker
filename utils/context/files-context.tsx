import React from 'react';

import type {
   FilesContextType,
   Action,
   ReducedFilesContextType,
} from './reducer.types';

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

export { FilesContext, useFilesContext };
