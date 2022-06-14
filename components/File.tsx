import React from 'react';

import type { File as FileType } from '../utils/files.types';

import styles from '../styles/File.module.scss';

const File = ({ name, id }: FileType) => {
   return (
      <div className={styles.file}>
         <div className={styles.fileName}>{name}</div>
      </div>
   );
};

export default File;
