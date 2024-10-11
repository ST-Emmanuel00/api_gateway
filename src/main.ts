import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('main')

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('gateway')

  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(envs.PORT);
  logger.log(`App running in port: ${envs.PORT}`)

}
bootstrap();
