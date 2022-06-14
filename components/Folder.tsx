import React from 'react';

import type { Folder as FolderType } from '../utils/files.types';

import FileType from './File';

import styles from '../styles/Folder.module.scss';

const Folder = ({ name, folders, files }: FolderType) => {
   return (
      <div className={styles.folder}>
         <div className={styles.name}>{name}</div>
         <div className={styles.items}>
            {folders &&
               folders.length > 0 &&
               folders.map((folder) => <Folder key={folder.id} {...folder} />)}
            {files &&
               files.length > 0 &&
               files.map((file) => <FileType key={file.id} {...file} />)}
         </div>
      </div>
   );
};

export default Folder;
