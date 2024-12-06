import { Module } from '@nestjs/common';
import { EventPostService } from './event-post.service';
import { EventPostController } from './event-post.controller';
import { EventPostRepository } from './event-post.repository';
import { EventPost } from './event-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventPost, EventPostRepository])],
  providers: [EventPostService],
  controllers: [EventPostController],
})
export class EventPostModule {}
