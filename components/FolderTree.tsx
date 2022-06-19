import React from 'react';

import type { Folder as FolderType } from '../utils/files.types';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/FolderTree.module.scss';

const FolderTreeContext = React.createContext<{
   path: string;
   setPath: (path: string) => void;
}>({ path: '', setPath: (v) => null });

type ProviderProps = {
   children: React.ReactNode;
   defaultPath: string;
   readonly updatePath: (path: string) => void;
};

const Provider = ({ children, defaultPath, updatePath }: ProviderProps) => {
   const [path, setPath] = React.useState<string>(defaultPath);

   React.useEffect(
      function () {
         updatePath(path);
      },
      [path, updatePath]
   );

   return (
      <FolderTreeContext.Provider value={{ path, setPath }}>
         {children}
      </FolderTreeContext.Provider>
   );
};

type FolderProps = {
   path: string;
   name: string;
   folders: FolderType[];
};

const Folder = ({ path, name, folders }: FolderProps) => {
   const { setPath, path: selectedPath } = React.useContext(FolderTreeContext);
   return (
      <div className={styles.folder}>
         <div
            className={`${styles.label} ${
               path === selectedPath ? styles.selected : ''
            }`.trim()}
            onClick={() => setPath(path)}>
            <span className={styles.icon}>
               {path === selectedPath ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='24'
                     height='24'
                     fill='currentColor'
                     className='bi bi-folder-fill'
                     viewBox='0 0 16 16'>
                     <path d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z' />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='24'
                     height='24'
                     fill='currentColor'
                     className='bi bi-folder'
                     viewBox='0 0 16 16'>
                     <path d='M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z' />
                  </svg>
               )}
            </span>
            <span className={styles.name}>{name}</span>
         </div>
         {folders && (
            <div className={styles.tree}>
               {folders.map((folder) => (
                  <Folder
                     key={folder.id}
                     path={`${path}/${folder.id}`}
                     name={folder.name}
                     folders={folder.folders}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

type FolderTreeProps = {
   defaultPath: string;
   setPath: (path: string) => void;
};

const FolderTree = ({ defaultPath, setPath }: FolderTreeProps) => {
   const { state } = useFilesContext();
   return (
      <Provider defaultPath={defaultPath} updatePath={setPath}>
         <div className={styles.tree}>
            <Folder path={'/'} name={'My Files'} folders={state.folders} />
         </div>
      </Provider>
   );
};

export default FolderTree;
