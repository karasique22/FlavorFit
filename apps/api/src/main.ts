import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerGraphQLEnums } from './common/graphql-enums';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

registerGraphQLEnums();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const isDev = process.env.NODE_ENV !== 'production';
  app.enableCors({
    origin: isDev
      ? ['http://localhost:3002', 'http://localhost:3001']
      : process.env.FRONTEND_URL,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 4200);
}
void bootstrap();
