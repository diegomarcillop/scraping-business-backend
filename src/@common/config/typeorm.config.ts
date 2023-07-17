import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const configDefault = {
    type: process.env.DB_TYPE,
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['dist/entities/**/*.entity.js'],
  };

  return configDefault;
});
