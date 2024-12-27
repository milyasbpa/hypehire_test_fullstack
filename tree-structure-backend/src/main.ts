import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
import * as serverless from 'serverless-http';

// const server = express();
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

// export const handler = server;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors(); // Add this if you need to allow cross-origin requests
  await app.init();

  // Serverless wrapper for NestJS
  return serverless(app.getHttpServer());
}

export const handler = bootstrap();
