import React from 'react';

import { useFilesContext } from '../utils/files-context';

import styles from '../styles/EditorHeader.module.scss';

const Save = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-save'
      viewBox='0 0 16 16'>
      <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z' />
   </svg>
);

const Download = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-download'
      viewBox='0 0 16 16'>
      <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
      <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
   </svg>
);

const EditorHeader = () => {
   const {
      state: { currentFile },
      dispatch,
   } = useFilesContext();

   return (
      <header className={styles.header}>
         <h3 className={styles.name}>{currentFile ? currentFile.name : ''}</h3>
         <div className={styles.action}>
            <button onClick={() => dispatch({ type: 'SAVE_FILE' })}>
               <span className={styles.icon}>
                  <Save />
               </span>
               <span className={styles.text}>Save</span>
            </button>
            <button onClick={() => dispatch({ type: 'DOWNLOAD_FILE' })}>
               <span className={styles.icon}>
                  <Download />
               </span>
               <span className={styles.text}>Download</span>
            </button>
         </div>
      </header>
   );
};

export default EditorHeader;
