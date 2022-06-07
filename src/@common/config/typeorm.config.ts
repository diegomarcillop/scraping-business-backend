import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const configDefault = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['dist/entities/**/*.entity.js'],
    ssl:
      process.env.NODE_ENV !== 'local'
        ? { rejectUnauthorized: false }
        : undefined,
  };

  return {
    user: configDefault,
    business: configDefault,
    search: configDefault,
  };
});
