import React, { useEffect } from 'react';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/CreationDialog.module.scss';

import FolderTree from './FolderTree';
import Modal from './Modal';
import { ACTIONS } from '../utils/context/payloads';

type Props = {
   shown: boolean;
   close: () => void;
};

const FileCreationDialog = ({ shown, close }: Props) => {
   const { state, dispatch } = useFilesContext();

   const [fileName, setFileName] = React.useState('');
   const [path, setPath] = React.useState('/');

   function handleClose() {
      setFileName('');
      setPath('/');
      close();
   }

   const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      dispatch({
         type: ACTIONS.ADD_FILE,
         payload: {
            name: fileName,
            path: path,
            content: '',
         },
      });
      setFileName('');
      setPath('/');
      close();
   };

   return (
      <Modal
         shown={shown}
         close={handleClose}
         heading={'Create New File'}
         style={'accent'}>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.group} ${styles.input__name}`.trim()}>
               <input
                  id='fileName'
                  type='text'
                  placeholder='File Name'
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='fileName' className={styles.label}>
                  File Name
               </label>
            </div>
            <div className={`${styles.group} ${styles.input__type}`.trim()}>
               <input
                  id='fileName'
                  type='text'
                  placeholder='File Name'
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='fileName' className={styles.label}>
                  File Type
               </label>
            </div>
            <div className={`${styles.group} ${styles.input__folder}`.trim()}>
               <FolderTree defaultPath={path} setPath={setPath} />
            </div>
            <div className={`${styles.actions} ${styles.input__submit}`.trim()}>
               <button className={styles.action} type='submit'>
                  Create
               </button>
            </div>
         </form>
      </Modal>
   );
};

export default FileCreationDialog;
