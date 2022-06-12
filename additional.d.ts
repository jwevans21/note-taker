declare module 'iron-session' {
   interface IronSession {
      user?: {
         id: string;
         name: string;
         email: string;
      };
   }
}
