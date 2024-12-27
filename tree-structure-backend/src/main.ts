import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

// Serverless bootstrap function for platforms like Vercel
async function bootstrap(): Promise<Server> {
  const app = await NestFactory.create(AppModule);
  await app.init(); // Initialize without starting a listener
  return app.getHttpAdapter().getInstance(); // Return the HTTP server instance
}

// Local development entry point
async function localBootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  console.log(`Server running locally on http://localhost:${port}`);
  await app.listen(port);
}

// Export serverless function for Vercel
export default bootstrap;

// Run the local server if executed directly
if (require.main === module) {
  localBootstrap();
}
