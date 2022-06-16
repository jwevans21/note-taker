import React from 'react';

import { useFilesContext } from '../utils/files-context';

import styles from '../styles/CreationDialog.module.scss';
import form from '../styles/Form.module.scss';

type Props = {
   shown: boolean;
   close: () => void;
};

const FileCreationDialog = ({ shown, close }: Props) => {
   const { state, dispatch } = useFilesContext();

   const [fileName, setFileName] = React.useState('');
   const [path, setPath] = React.useState('');

   const handleSubmit = () => {
      dispatch({
         type: 'ADD_FILE',
         payload: {
            name: fileName,
            path: path,
            content: '',
         },
      });
   };

   return (
      <div className={styles.dialog__backdrop} data-shown={shown}>
         <form className={[styles.dialog, form.form].join(' ')}>
            <div className={styles.content}>
               <h2>Create New File</h2>
               <div className={form.group}>
                  <input
                     id='fileName'
                     type='text'
                     placeholder='File Name'
                     value={fileName}
                     onChange={(e) => setFileName(e.target.value)}
                     className={form.input}
                  />
                  <label htmlFor='fileName' className={form.label}>
                     File Name
                  </label>
               </div>
            </div>
            <div className={styles.actions}>
               <button className={styles.action} onClick={handleSubmit}>
                  Create
               </button>
            </div>
         </form>
      </div>
   );
};

export default FileCreationDialog;
