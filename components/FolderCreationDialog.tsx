import React, { useEffect } from 'react';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/CreationDialog.module.scss';

import FolderTree from './FolderTree';
import Modal from './Modal';

type Props = {
   shown: boolean;
   close: () => void;
};

const FolderCreationDialog = ({ shown, close }: Props) => {
   const { state, dispatch } = useFilesContext();

   const [folderName, setFolderName] = React.useState('');
   const [path, setPath] = React.useState('');

   const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      dispatch({
         type: 'ADD_FOLDER',
         payload: {
            name: folderName,
            path: path,
         },
      });
      setFolderName('');
      setPath('');
      close();
   };

   return (
      <Modal
         shown={shown}
         close={close}
         heading={'Create New Folder'}
         style={'accent'}>
         <form
            className={styles.form}
            onSubmit={handleSubmit}>
            <div className={styles.group}>
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
            <div>
               <FolderTree setPath={setPath} />
            </div>
            <div className={styles.actions}>
               <button className={styles.action} type='submit'>
                  Create
               </button>
            </div>
         </form>
      </Modal>
   );
};

export default FolderCreationDialog;
