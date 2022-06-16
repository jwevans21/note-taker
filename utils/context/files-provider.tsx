import React from 'react';

import type { FilesContextType, Action } from './reducer.types';

import { FilesContext } from './files-context';

import { filesReducer } from './reducer';

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
export default FilesProvider;
