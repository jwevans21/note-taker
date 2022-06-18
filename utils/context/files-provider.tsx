import React from 'react';

import type { FilesContextType, Action } from './reducer.types';

import { FilesContext } from './files-context';

import { filesReducer } from './reducer';

type FilesProviderProps = {
   children: React.ReactNode;
   initialState: FilesContextType;
};

function useReducer<S, A>(
   reducer: (state: S, action: A, setState: React.Dispatch<React.SetStateAction<S>>) => void,
   initialState: S
): [S, React.Dispatch<A>] {
   const [state, setState] = React.useState(initialState);
   const dispatch = React.useCallback(
      (action: A) => {
         reducer(state, action, setState);
      },
      [state, setState, reducer]
   );
   return [state, dispatch];
}

const FilesProvider = ({ children, initialState }: FilesProviderProps) => {
   const [state, dispatch] = useReducer<FilesContextType, Action>(
      filesReducer,
      initialState
   );
   const value = { state: state, dispatch: dispatch };

   return (
      <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
   );
};
export default FilesProvider;
