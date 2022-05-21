import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
//import * as helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { appPort, appHostServer, appPrefix } = configService.get('app');

  //app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix(appPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appPort || '4200');

  console.log(`Server running on 1 ${appHostServer}/${appPrefix}`);
}
bootstrap();
