import React from 'react';

import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import styles from '../styles/EditorHeader.module.scss';

const Delete = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      className='bi bi-trash'
      viewBox='0 0 16 16'>
      <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
      <path
         fillRule='evenodd'
         d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
      />
   </svg>
);

const Save = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      className='bi bi-save'
      viewBox='0 0 16 16'>
      <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z' />
   </svg>
);

const Download = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
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
         <div className={styles.actions}>
            <button
               className={styles.action}
               onClick={() =>
                  dispatch({
                     type: ACTIONS.OPEN_DELETE_FILE_DIALOG,
                     payload: {
                        id: currentFile?.id || '',
                        path: currentFile?.path || '',
                        name: currentFile?.name || '',
                        close: () =>
                           dispatch({
                              type: ACTIONS.CLOSE_DELETE_FILE_DIALOG,
                              payload: null,
                           }),
                     },
                  })
               }>
               <span className={styles.icon}>
                  <Delete />
               </span>
               <span className={styles.text}>Delete</span>
            </button>
            <button
               className={styles.action}
               onClick={() => dispatch({ type: ACTIONS.SAVE_FILE })}>
               <span className={styles.icon}>
                  <Save />
               </span>
               <span className={styles.text}>Save</span>
            </button>
            <button
               className={styles.action}
               onClick={() => dispatch({ type: ACTIONS.DOWNLOAD_FILE })}>
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
