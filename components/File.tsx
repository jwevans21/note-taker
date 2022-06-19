import React from 'react';

import type { File as FileType } from '../utils/files.types';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/File.module.scss';
import { ACTIONS } from '../utils/context/payloads';
import FileFolderContextMenu from './FileFolderContextMenu';

function FileIcon() {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         fill='currentColor'
         className='bi bi-filetype-md'
         viewBox='0 0 16 16'>
         <path
            fillRule='evenodd'
            d='M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM.706 13.189v2.66H0V11.85h.806l1.14 2.596h.026l1.14-2.596h.8v3.999h-.716v-2.66h-.038l-.946 2.159h-.516l-.952-2.16H.706Zm3.919 2.66V11.85h1.459c.406 0 .741.078 1.005.234.263.157.46.383.589.68.13.297.196.655.196 1.075 0 .422-.066.784-.196 1.084-.131.301-.33.53-.595.689-.264.158-.597.237-1 .237H4.626Zm1.353-3.354h-.562v2.707h.562c.186 0 .347-.028.484-.082a.8.8 0 0 0 .334-.252 1.14 1.14 0 0 0 .196-.422c.045-.168.067-.365.067-.592a2.1 2.1 0 0 0-.117-.753.89.89 0 0 0-.354-.454c-.159-.102-.362-.152-.61-.152Z'
         />
      </svg>
   );
}

const MoreIcon = () => (
   <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-three-dots'
      viewBox='0 0 16 16'>
      <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
   </svg>
);

type Props = {
   file: FileType;
   path: string;
};

const File = ({ file: { name, id }, path }: Props) => {
   const [context, setContext] = React.useState(false);
   const [x, setX] = React.useState(0);
   const [y, setY] = React.useState(0);

   const contextRef = React.useRef<HTMLDivElement>(null);

   const { dispatch } = useFilesContext();

   function handleContext(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setContext(true);
   }

   function setAsCurrentFile(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      e.preventDefault();
      if (context) return;
      dispatch({
         type: ACTIONS.SET_CURRENT_FILE,
         payload: {
            id,
            path,
            name,
         },
      });
   }

   return (
      <div
         className={styles.file}
         onClick={setAsCurrentFile}
         onContextMenu={handleContext}>
         <span className={styles.icon}>
            <FileIcon />
         </span>
         <span className={styles.name}>{name}</span>

         <FileFolderContextMenu
            passRef={contextRef}
            shown={context}
            setShown={setContext}
            deleteItem={() =>
               dispatch({
                  type: ACTIONS.OPEN_DELETE_FILE_DIALOG,
                  payload: {
                     id,
                     path,
                     name,
                     close: () =>
                        dispatch({
                           type: ACTIONS.CLOSE_DELETE_FILE_DIALOG,
                           payload: null,
                        }),
                  },
               })
            }
            renameItem={() =>
               dispatch({
                  type: ACTIONS.RENAME_FILE,
                  payload: { id, path, name },
               })
            }
            x={x}
            y={y}
         />
         {/* For Actions TODO */}
         {/* <button className={styles.icon}>
            <MoreIcon />
            <div className={styles.actions}>
               <button className={styles.action}>Rename</button>
               <button className={styles.action}>Move</button>
               <button className={styles.action}>Delete</button>
            </div>
         </button> */}
      </div>
   );
};

export default File;
