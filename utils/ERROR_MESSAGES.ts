const BAD_PASS_EMAIL = 'Email or password is incorrect.';

const ERROR_MESSAGES = {
   400: {
      INVALID_PASSWORD: BAD_PASS_EMAIL,
      INVALID_EMAIL: BAD_PASS_EMAIL,
   },
   500: {
      USER_CREATION_ERROR: 'User already exists.',
      SERVER_ERROR: 'Server error. Please try again later.',
   },
};

export default ERROR_MESSAGES;
