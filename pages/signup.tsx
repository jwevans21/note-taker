import type {
   GetServerSidePropsContext,
   GetServerSideProps,
   NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';

import { withSessionSsr } from '../utils/withSession';

import styles from '../styles/Form.module.scss';
import StrengthMeter from '../components/StrengthMeter';
import ErrorDialog from '../components/ErrorDialog';

import zxcvbn from 'zxcvbn';

const SignUp: NextPage = () => {
   const router = useRouter();
   const [displayName, setDisplayName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   const [validDisplayName, setValidDisplayName] = React.useState(false);
   const [validEmail, setValidEmail] = React.useState(false);
   const [validPassword, setValidPassword] = React.useState(false);
   const [passwordStrength, setPasswordStrength] = React.useState(0);

   React.useEffect(
      function () {
         // TODO: Validate display name
      },
      [displayName]
   );

   React.useEffect(
      function () {
         //TODO: Validate email
      },
      [email]
   );

   React.useEffect(
      function () {
         // TODO: Validate password
         setPasswordStrength(zxcvbn(password).score);
      },
      [password]
   );

   const [error, setError] = React.useState('');
   const [showError, setShowError] = React.useState(false);

   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch('/api/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            displayName,
            email,
            password,
         }),
      })
         .then((res) => res.json())
         .then((json) => {
            if (json.success) {
               router.push('/');
            } else {
               setError(json.message);
               setShowError(true);
            }
         });
   }

   return (
      <div className={styles.container}>
         <Head>
            <title>Sign Up</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <form className={styles.form} onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <div className={styles.group}>
               <input
                  id='displayName'
                  type='text'
                  placeholder='User Name'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='displayName' className={styles.label}>
                  Display Name
               </label>
            </div>
            <div className={styles.group}>
               <input
                  id='email'
                  type='email'
                  placeholder='user@domain.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='email' className={styles.label}>
                  Email Address
               </label>
            </div>
            <div className={styles.group}>
               <input
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
               />
               <label htmlFor='password' className={styles.label}>
                  Password
               </label>
               <StrengthMeter strength={passwordStrength} />
            </div>
            <button type='submit' className={styles.button}>
               Sign Up
            </button>
            <div className={styles.altlinks}>
               <Link href='/login'>
                  <a>Already have an account? Login.</a>
               </Link>
            </div>
         </form>
         <ErrorDialog
            error={error}
            shown={showError}
            close={() => setShowError(false)}
         />
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(
   async (context: GetServerSidePropsContext) => {
      if (context.req.session.user) {
         return {
            redirect: {
               destination: '/',
               permanent: false,
            },
         };
      }
      return {
         props: {},
      };
   }
);

export default SignUp;
