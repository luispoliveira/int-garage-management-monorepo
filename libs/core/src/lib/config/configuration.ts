export const configuration = () => ({
  environment: process.env['NODE_ENV'],
  port: +(process.env['PORT'] || 3000),
  admin: {
    username: process.env['ADMIN_USERNAME'],
    password: process.env['ADMIN_PASSWORD'],
    email: process.env['ADMIN_EMAIL'],
  },
  jwtSecret: process.env['JWT_SECRET'],
  jwtExpirationTime: process.env['JWT_EXPIRATION_TIME'],
  jwtIgnoreExpiration: process.env['JWT_IGNORE_EXPIRATION'],
});
