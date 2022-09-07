import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: process.env.CORS.split(','),
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      });
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
