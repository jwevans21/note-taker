import React from 'react';

import styles from '../styles/Dialog.module.scss';

type Props = {
   error: string;
   shown: boolean;
   close: () => void;
};

const ErrorDialog = ({ error, shown, close }: Props) => {
   return (
      <div className={styles.dialog__backdrop} data-shown={shown}>
         <div className={styles.dialog}>
            <div className={styles.content}>
               <h2>Error</h2>
               <p>{error}</p>
            </div>
            <div className={styles.actions}>
               <button className={styles.action} onClick={close}>
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default ErrorDialog;
