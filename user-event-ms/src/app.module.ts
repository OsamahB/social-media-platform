import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { EventPostModule } from './modules/event-post/event-post.module';
import { JoinRequestModule } from './modules/join-request/join-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_SERVER ?? 'localhost',
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT)
        : 5432,
      username: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD, // mandatory value
      database: process.env.POSTGRES_DB ?? 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: process.env.BD_SYNC === 'true',
      retryAttempts: process.env.BD_RETRY_ATTEMPTS
        ? parseInt(process.env.BD_RETRY_ATTEMPTS)
        : 10,
      retryDelay: process.env.BD_RETRY_DELAY
        ? parseInt(process.env.BD_RETRY_DELAY)
        : 3000,
    }),
    UserModule,
    AuthModule,
    KafkaModule,
    EventPostModule,
    JoinRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
