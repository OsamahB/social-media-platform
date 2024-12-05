import { Module } from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import { JoinRequestController } from './join-request.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [JoinRequestService],
  controllers: [JoinRequestController],
})
export class JoinRequestModule {}
