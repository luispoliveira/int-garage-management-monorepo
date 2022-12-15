import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  ADMIN_USERNAME: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().valid('1d', '60m').required(),
  JWT_IGNORE_EXPIRATION: Joi.boolean().required().default(false),
});
