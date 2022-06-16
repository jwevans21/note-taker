import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/Modal.module.scss';

type Props = {
   shown: boolean;
   close: () => void;
   heading: React.ReactNode;
   style: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
   children: React.ReactNode;
};

const Modal = ({ shown, close, heading, style, children }: Props) => {
   return shown
      ? ReactDOM.createPortal(
           <div className={styles.backdrop} data-shown={shown}>
              <div
                 className={styles.modal}
                 style={{ borderColor: `var(--clr-${style})` }}>
                 <div className={styles.header}>
                    <h2 className={styles.heading}>{heading}</h2>
                    <button
                       className={styles.button}
                       onClick={() => close()}
                       aria-label='Close'>
                       <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='48'
                          height='48'
                          fill='currentColor'
                          className='bi bi-x'
                          viewBox='0 0 16 16'>
                          <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                       </svg>
                    </button>
                 </div>
                 <div className={styles.content}>{children}</div>
              </div>
           </div>,
           document.body
        )
      : null;
};

export default Modal;
