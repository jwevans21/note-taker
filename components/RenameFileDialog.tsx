import React from 'react';

import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import Modal from './Modal';

import styles from '../styles/RenameDialog.module.scss';
import form from '../styles/Form.module.scss';

function RenameFileDialog() {
   const { state, dispatch } = useFilesContext();

   const [name, setName] = React.useState('');

   function handleClose() {
      state.renameFileDialog.open ? state.renameFileDialog.close() : null;
      setName('');
   }

   return (
      <Modal
         shown={state.renameFileDialog.open}
         close={handleClose}
         heading={'Rename File'}
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
               Rename the file{' '}
               {state.renameFileDialog.open
                  ? state.renameFileDialog.name
                  : ''}{' '}
               to {name}
            </p>
            <div className={styles.buttons}>
               <button
                  className={`${styles.button} ${styles.rename}`.trim()}
                  onClick={() => {
                     dispatch({
                        type: ACTIONS.RENAME_FILE,
                        payload: {
                           id: state.renameFileDialog.open
                              ? state.renameFileDialog.id
                              : '',
                           path: state.renameFileDialog.open
                              ? state.renameFileDialog.path
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

export default RenameFileDialog;
