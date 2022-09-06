import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
          'http://localhost:3000',
          'http://localhost:8080',
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      });
    await app.listen(process.env.PORT);
}
bootstrap();
