import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' })],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class KafkaModule {}
