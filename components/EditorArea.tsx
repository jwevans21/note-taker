import type { File } from '../utils/files.types';

import React from 'react';
import { useFilesContext } from '../utils/context/files-context';
import { ACTIONS } from '../utils/context/payloads';

import EditorHeader from './EditorHeader';

import parseHtml from 'html-react-parser';

import { editor } from '../utils/code-mirror';
import { parseMarkdown } from '../utils/markdown-it';

import styles from '../styles/Editor.module.scss';
import { getFile } from '../utils/context/helpers';

const EditorArea = () => {
   const { state, dispatch } = useFilesContext();

   const inputRef = React.useRef<HTMLDivElement>(null);
   const outputRef = React.useRef<HTMLDivElement>(null);

   const [file, setFile] = React.useState<File | null>(
      getFile(state.currentFile?.path || '', state)
   );

   const [htmlString, setHtmlString] = React.useState('');

   /*  React.useEffect(
      () => {
         const currentFile = getFile(
            state.currentFile ? state.currentFile.path : '',
            state
         );
         if (currentFile) {
            setFile(currentFile);
         } else {
            setFile(null);
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [state.currentFile]
   ); */

   React.useEffect(() => {
      if (inputRef.current && outputRef.current) {
         const cm = editor(
            inputRef,
            getFile(state.currentFile?.path || '', state)?.content || '',
            (newCode) => {
               dispatch({
                  type: ACTIONS.UPDATE_FILE,
                  payload: {
                     content: newCode,
                  },
               });
               setFile(file ? { ...file, content: newCode } : null);
               setHtmlString(parseMarkdown(newCode));
            }
         );

         return () => {
            console.log('unmounting editor');
            cm.destroy();
         };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.currentFile]);

   return state.currentFile !== null ? (
      <>
         <EditorHeader />
         <section className={styles.editor}>
            <div ref={inputRef}></div>
         </section>
         <section className={styles.preview}>
            <div ref={outputRef}>{parseHtml(htmlString)}</div>
         </section>
      </>
   ) : (
      <div className={styles.noFile}>
         <h2>No file selected</h2>
      </div>
   );
};

export default EditorArea;
