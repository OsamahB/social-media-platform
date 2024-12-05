import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './modules/kafka/kafka.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [KafkaModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
