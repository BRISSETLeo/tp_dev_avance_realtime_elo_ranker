import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3002', // Autoriser uniquement ce domaine
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
    credentials: true, // Si vous utilisez des cookies
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
