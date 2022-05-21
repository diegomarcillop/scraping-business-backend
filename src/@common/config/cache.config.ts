import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  ttl: process.env.CACHE_TTL,
  max: process.env.CACHE_MAX,
}));
