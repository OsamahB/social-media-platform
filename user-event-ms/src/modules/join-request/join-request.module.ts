import { Module } from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import { JoinRequestController } from './join-request.controller';

@Module({
  providers: [JoinRequestService],
  controllers: [JoinRequestController],
})
export class JoinRequestModule {}
