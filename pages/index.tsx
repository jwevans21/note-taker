import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import parseHtml from 'html-react-parser';
import styles from '../styles/Home.module.scss';
import { editor } from '../utils/code-mirror';
import { parseMarkdown } from '../utils/markdown-it';

const Home: NextPage = () => {
   const inputRef = React.useRef<HTMLDivElement>(null);
   const outputRef = React.useRef<HTMLDivElement>(null);

   const [code, setCode] = React.useState('');

   React.useEffect(() => {
      if (inputRef.current && outputRef.current) {
         const cm = editor(inputRef, code, setCode);

         return () => {
            cm.destroy();
         };
      }
   }, []);

   return (
      <div className={styles.container}>
         <Head>
            <title>Note Taker</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <header className={styles.header}>
            <h1 className={styles.brand}>Note Taker</h1>
         </header>
         <aside className={styles.sidebar}>
            <h2>{"Jacob's Notes"}</h2>
         </aside>
         <main className={styles.main}>
            <section className={styles.editor}>
               <div ref={inputRef}></div>
            </section>
            <section className={styles.preview}>
               <div ref={outputRef}>{parseHtml(parseMarkdown(code))}</div>
            </section>
         </main>
      </div>
   );
};

export default Home;
