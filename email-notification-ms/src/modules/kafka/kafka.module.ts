import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' })],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class KafkaModule {}
