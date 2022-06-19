import React from 'react';

import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import Modal from './Modal';

import styles from '../styles/DeleteDialog.module.scss';

function DeleteFolderDialog() {
   const { state, dispatch } = useFilesContext();

   return (
      <Modal
         shown={state.deleteFolderDialog.open}
         close={() =>
            state.deleteFolderDialog.open
               ? state.deleteFolderDialog.close()
               : () => null
         }
         heading={'Delete Folder'}
         style={'danger'}>
         <div className={styles.content}>
            <p>Are you sure you want to delete this folder?</p>
            <p>This will delete all of the files within.</p>
            <div className={styles.buttons}>
               <button
                  className={`${styles.button} ${styles.delete}`.trim()}
                  onClick={() => {
                     state.deleteFolderDialog.open
                        ? state.deleteFolderDialog?.close()
                        : null;
                     dispatch({
                        type: ACTIONS.DELETE_FOLDER,
                        payload: {
                           id: state.deleteFolderDialog.open
                              ? state.deleteFolderDialog.id
                              : '',
                           path: state.deleteFolderDialog.open
                              ? state.deleteFolderDialog.path
                              : '',
                        },
                     });
                  }}>
                  Delete
               </button>
               <button
                  className={`${styles.button} ${styles.cancel}`.trim()}
                  onClick={() =>
                     state.deleteFolderDialog.open
                        ? state.deleteFolderDialog.close()
                        : () => null
                  }>
                  Cancel
               </button>
            </div>
         </div>
      </Modal>
   );
}

export default DeleteFolderDialog;