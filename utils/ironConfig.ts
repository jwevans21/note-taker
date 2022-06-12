export const ironConfig = {
   cookieName: 'iron-session',
   password: process.env.IRON_PASSWORD,
   cookieOptions: {
      // 1 day in milliseconds
      maxAge: 24 * 60 * 60 * 1000,
      // secure in production
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
   },
};
