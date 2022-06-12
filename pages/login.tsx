import type {
   GetServerSidePropsContext,
   GetServerSideProps,
   NextPage,
} from 'next';
import { useRouter } from 'next/router';

import React from 'react';

import { withSessionSsr } from '../utils/withSession';

const Login: NextPage = () => {
   const router = useRouter();
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   return (
      <div>
         <h1>Login</h1>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               fetch('/api/login', {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     email,
                     password,
                  }),
               })
                  .then((res) => res.json())
                  .then((json) => {
                     json.success ? router.push('/') : alert(json.message);
                  });
            }}>
            <label>
               Username:
               <input
                  id='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
               />
            </label>
            <label>
               Password:
               <input
                  id='password'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
               />
            </label>
            <button type='submit'>Login</button>
         </form>
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

export default Login;
