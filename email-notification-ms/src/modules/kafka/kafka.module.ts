import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' }), EmailModule],
  providers: [ConsumerService, EmailConsumer],
  exports: [ConsumerService],
})
export class KafkaModule {}
