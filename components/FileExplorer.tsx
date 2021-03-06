import React from 'react';
import type {
   File as FileType,
   Folder as FolderType,
} from '../utils/files.types';

import Folder from './Folder';
import File from './File';

import styles from '../styles/FileExplorer.module.scss';
import { useFilesContext } from '../utils/context/files-context';
import FileCreationDialog from './FileCreationDialog';
import Modal from './Modal';
import FolderCreationDialog from './FolderCreationDialog';

function PlusCircle() {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='32'
         height='32'
         fill='currentColor'
         className='bi bi-plus-circle'
         viewBox='0 0 16 16'>
         <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
         <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
      </svg>
   );
}

const FileExplorer = () => {
   const { state, dispatch } = useFilesContext();

   const { files, folders } = state;

   const [createFileDialogOpen, setCreateFileDialogOpen] = React.useState(false);
   const [createFolderDialogOpen, setCreateFolderDialogOpen] = React.useState(false);

   function addFile() {
      setCreateFileDialogOpen(true);
   }

   function addFolder() {
      setCreateFolderDialogOpen(true);
   }

   return (
      <aside className={styles.fileExplorer}>
         <div className={styles.header}>
            <button className={styles.button} onClick={addFile}>
               <span className={styles.icon}>
                  <PlusCircle />
               </span>
               <span className={styles.text}>New File</span>
            </button>
            <button className={styles.button} onClick={addFolder}>
               <span className={styles.icon}>
                  <PlusCircle />
               </span>
               <span className={styles.text}>New Folder</span>
            </button>
         </div>
         <div className={styles.content}>
            {folders &&
               folders.length > 0 &&
               folders.map((folder) => (
                  <Folder
                     key={folder.id}
                     folder={folder}
                     path={`root/${folder.id}`}
                  />
               ))}
            {files &&
               files.length > 0 &&
               files.map((file) => (
                  <File key={file.id} file={file} path={`root/${file.id}`} />
               ))}
         </div>
         <FileCreationDialog shown={createFileDialogOpen} close={()=>setCreateFileDialogOpen(false)} />
         <FolderCreationDialog shown={createFolderDialogOpen} close={()=>setCreateFolderDialogOpen(false)} />
      </aside>
   );
};

export default FileExplorer;
