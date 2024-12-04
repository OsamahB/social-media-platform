import { Module } from '@nestjs/common';
import { EventPostService } from './event-post.service';
import { EventPostController } from './event-post.controller';

@Module({
  providers: [EventPostService],
  controllers: [EventPostController],
})
export class EventPostModule {}
