export const APP_CONSTANTS = {
  regex: {
    passwordRegex: /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/,
  },
  auth: {
    // headers
    accessToken: 'x-access-token',
    refreshToken: 'x-refresh-token',
    name: 'name',
  },
  PRELOAD_ASSETS: [],
};
