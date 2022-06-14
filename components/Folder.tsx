import React from 'react';

import type { Folder as FolderType } from '../utils/files.types';

import FileType from './File';

import styles from '../styles/Folder.module.scss';

function FolderClosedIcon() {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         fill='currentColor'
         className='bi bi-folder2'
         viewBox='0 0 16 16'>
         <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z' />
      </svg>
   );
}

function FolderOpenedIcon() {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         fill='currentColor'
         className='bi bi-folder2-open'
         viewBox='0 0 16 16'>
         <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z' />
      </svg>
   );
}

function ChevronIcon({ open }: { open: boolean }) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         fill='currentColor'
         className={`bi bi-chevron-right ${open ? styles.open : ''}`.trim()}
         viewBox='0 0 16 16'>
         <path
            fillRule='evenodd'
            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
         />
      </svg>
   );
   /* return open ? (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='16'
         fill='currentColor'
         className='bi bi-chevron-down'
         viewBox='0 0 16 16'>
         <path
            fillRule='evenodd'
            d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
         />
      </svg>
   ) : (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='16'
         fill='currentColor'
         className='bi bi-chevron-right'
         viewBox='0 0 16 16'>
         <path
            fillRule='evenodd'
            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
         />
      </svg>
   ); */
}

type Props={
   folder: FolderType;
}

const Folder = ({ folder: {name, id, folders, files} }: Props) => {
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <div className={styles.folder}>
         <div className={styles.heading} onClick={() => setIsOpen(!isOpen)}>
            <span className={styles.leftIcon}>
               {isOpen ? <FolderOpenedIcon /> : <FolderClosedIcon />}
            </span>
            <span className={styles.name}>{name}</span>
            <span className={styles.rightIcon}>
               <ChevronIcon open={isOpen} />
            </span>
         </div>
         <div
            className={styles.items}
            style={{
               height: isOpen ? 'auto' : '0',
            }}>
            {folders &&
               folders.length > 0 &&
               folders.map((folder) => <Folder key={folder.id} folder={folder} />)}
            {files &&
               files.length > 0 &&
               files.map((file) => <FileType key={file.id} {...file} />)}
         </div>
      </div>
   );
};

export default Folder;
