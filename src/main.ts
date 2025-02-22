import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(cors({
    origin: '*', // Allows requests from any origin; adjust as needed for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  const port = process.env.PORT ?? 3001;
  
  // Start the server
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
