import React, { useEffect } from 'react';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/CreationDialog.module.scss';

import FolderTree from './FolderTree';
import Modal from './Modal';

type Props = {
   shown: boolean;
   close: () => void;
};

const FileCreationDialog = ({ shown, close }: Props) => {
   const { state, dispatch } = useFilesContext();

   const [fileName, setFileName] = React.useState('');
   const [path, setPath] = React.useState('');

   const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      dispatch({
         type: 'ADD_FILE',
         payload: {
            name: fileName,
            path: path,
            content: '',
         },
      });
      setFileName('');
      setPath('');
      close();
   };

   return (
      <Modal
         shown={shown}
         close={close}
         heading={'Create New File'}
         style={'accent'}>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
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

export default FileCreationDialog;
