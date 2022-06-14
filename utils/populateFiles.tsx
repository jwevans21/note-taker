import type { File } from './files.types';

import styles from '../styles/File.module.scss';

function populateFiles(files: File[]) {
   if (files.length === 0) return null;
   return files.map((file) => {
      return (
         <div key={file.id} className={styles.file}>
            <div className={styles.fileName}>{file.name}</div>
         </div>
      );
   });
}
