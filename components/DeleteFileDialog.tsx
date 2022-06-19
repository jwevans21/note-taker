import React from 'react';

import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import Modal from './Modal';

import styles from '../styles/DeleteDialog.module.scss';

function DeleteFileDialog() {
   const { state, dispatch } = useFilesContext();

   return (
      <Modal
         shown={state.deleteFileDialog.open}
         close={() =>
            state.deleteFileDialog.open
               ? state.deleteFileDialog.close()
               : () => null
         }
         heading={'Delete File'}
         style={'danger'}>
         <div className={styles.content}>
            <p>Are you sure you want to delete this file?</p>
            <div className={styles.buttons}>
               <button
                  className={`${styles.button} ${styles.delete}`.trim()}
                  onClick={() => {
                     state.deleteFileDialog.open
                        ? state.deleteFileDialog?.close()
                        : null;
                     dispatch({
                        type: ACTIONS.DELETE_FILE,
                        payload: {
                           id: state.deleteFileDialog.open
                              ? state.deleteFileDialog.id
                              : '',
                           path: state.deleteFileDialog.open
                              ? state.deleteFileDialog.path
                              : '',
                        },
                     });
                  }}>
                  Delete
               </button>
               <button
                  className={`${styles.button} ${styles.cancel}`.trim()}
                  onClick={() =>
                     state.deleteFileDialog.open
                        ? state.deleteFileDialog.close()
                        : () => null
                  }>
                  Cancel
               </button>
            </div>
         </div>
      </Modal>
   );
}

export default DeleteFileDialog;
