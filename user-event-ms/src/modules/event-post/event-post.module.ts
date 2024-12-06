import { Module } from '@nestjs/common';
import { EventPostService } from './event-post.service';
import { EventPostController } from './event-post.controller';
import { EventPostRepository } from './event-post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventPostRepository])],
  providers: [EventPostService],
  controllers: [EventPostController],
})
export class EventPostModule {}
