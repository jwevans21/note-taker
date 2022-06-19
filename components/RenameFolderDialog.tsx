import React from 'react';

import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import Modal from './Modal';

import styles from '../styles/RenameDialog.module.scss';
import form from '../styles/Form.module.scss';

function RenameFolderDialog() {
   const { state, dispatch } = useFilesContext();

   const [name, setName] = React.useState('');

   function handleClose() {
      state.renameFolderDialog.open ? state.renameFolderDialog.close() : null;
      setName('');
   }

   return (
      <Modal
         shown={state.renameFolderDialog.open}
         close={handleClose}
         heading={'Rename Folder'}
         style={'accent'}>
         <form className={styles.content}>
            <div className={form.group}>
               <input
                  className={form.input}
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <label className={form.label} htmlFor='name'>
                  Name
               </label>
            </div>
            <p className={styles.action}>
               Rename the folder{' '}
               {state.renameFolderDialog.open
                  ? state.renameFolderDialog.name
                  : ''}{' '}
               to {name}
            </p>
            <div className={styles.buttons}>
               <button
                  className={`${styles.button} ${styles.rename}`.trim()}
                  onClick={() => {
                     dispatch({
                        type: ACTIONS.RENAME_FOLDER,
                        payload: {
                           id: state.renameFolderDialog.open
                              ? state.renameFolderDialog.id
                              : '',
                           path: state.renameFolderDialog.open
                              ? state.renameFolderDialog.path
                              : '',
                           name: name,
                        },
                     });
                     handleClose();
                  }}
                  type='submit'>
                  Rename
               </button>
               <button
                  className={`${styles.button} ${styles.cancel}`.trim()}
                  onClick={handleClose}
                  type='reset'>
                  Cancel
               </button>
            </div>
         </form>
      </Modal>
   );
}

export default RenameFolderDialog;
