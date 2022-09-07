import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import "dotenv/config";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: Number.parseInt(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            entities: [User],
            synchronize: true,
            autoLoadEntities: true,
            ssl:
                process.env.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
        }),
    ],
    controllers: [AppController],
})
export class AppModule { }
