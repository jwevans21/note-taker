import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
   GetServerSidePropsContext,
   GetServerSidePropsResult,
   NextApiHandler,
} from 'next';

import { ironConfig } from './ironConfig';

declare module 'iron-session' {
   interface IronSessionData {
      user?: {
         id: string;
         name: string;
         email: string;
      };
   }
}

export function withSessionRoute(handler: NextApiHandler) {
   return withIronSessionApiRoute(handler, ironConfig);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
   P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
   handler: (
      context: GetServerSidePropsContext
   ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
   return withIronSessionSsr(handler, ironConfig);
}
