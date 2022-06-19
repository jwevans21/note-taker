import type { File } from '../utils/files.types';

import React from 'react';

import parseHtml from 'html-react-parser';

import { editor } from '../utils/code-mirror';
import { parseMarkdown } from '../utils/markdown-it';

import { useFilesContext } from '../utils/context/files-context';

import styles from '../styles/Editor.module.scss';
import { getCurrentFile } from '../utils/getCurrentFile';
import { ACTIONS } from '../utils/context/payloads';

const Editor = () => {
   const { state, dispatch } = useFilesContext();

   const inputRef = React.useRef<HTMLDivElement>(null);
   const outputRef = React.useRef<HTMLDivElement>(null);

   const [file, setFile] = React.useState<File | null>(getCurrentFile(state));

   React.useEffect(
      () => {
         const currentFile = getCurrentFile(state);
         if (currentFile) {
            setFile(currentFile);
         } else {
            setFile(null);
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [state.currentFile]
   );

   React.useEffect(() => {
      if (inputRef.current && outputRef.current) {
         const cm = editor(inputRef, file ? file.content : '', (newCode) => {
            dispatch({
               type: ACTIONS.UPDATE_FILE,
               payload: {
                  content: newCode,
               },
            });
            setFile(file ? { ...file, content: newCode } : null);
         });

         return () => {
            console.log('unmounting editor');
            cm.destroy();
         };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return file ? (
      <>
         <section className={styles.editor}>
            <div ref={inputRef}></div>
         </section>
         <section className={styles.preview}>
            <div ref={outputRef}>{parseHtml(parseMarkdown(file.content))}</div>
         </section>
      </>
   ) : null;
};
export default Editor;
