import React from 'react';

import Modal from './Modal';

import styles from '../styles/ErrorDialog.module.scss';

type Props = {
   error: string;
   shown: boolean;
   close: () => void;
};

const ErrorDialog = ({ error, shown, close }: Props) => {
   return (
      <Modal
         shown={shown}
         close={close}
         heading={'Error'}
         style={'danger'}>
         <p>{error}</p>
         <div className={styles.actions}>
            <button className={styles.action} type='button' onClick={close}>
               Close
            </button>
         </div>
      </Modal>
   );
};

export default ErrorDialog;
