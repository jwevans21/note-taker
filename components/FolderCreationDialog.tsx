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

const FolderCreationDialog = ({ shown, close }: Props) => {
   const { state, dispatch } = useFilesContext();

   const [folderName, setFolderName] = React.useState('');
   const [path, setPath] = React.useState('/');

   function handleClose() {
      setFolderName('');
      setPath('/');
      close();
   }

   const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      dispatch({
         type: ACTIONS.ADD_FOLDER,
         payload: {
            name: folderName,
            path: path,
         },
      });
      setFolderName('');
      setPath('/');
      close();
   };

   return (
      <Modal
         shown={shown}
         close={handleClose}
         heading={'Create New Folder'}
         style={'accent'}>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.group} ${styles.input__name}`.trim()}>
               <input
                  id='folderName'
                  type='text'
                  placeholder='Folder Name'
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='folderName' className={styles.label}>
                  Folder Name
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

export default FolderCreationDialog;
