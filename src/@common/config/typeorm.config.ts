import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const configDefault = {
    type: process.env.DB_TYPE,
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ['dist/entities/**/*.entity.js'],
  };

  return {
    business: configDefault,
    search: configDefault,
    user: configDefault,
  };
});
