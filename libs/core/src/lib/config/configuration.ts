export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  admin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    email: process.env.ADMIN_EMAIL,
  },
});
