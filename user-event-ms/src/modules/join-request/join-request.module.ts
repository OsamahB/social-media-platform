import { Module } from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import { JoinRequestController } from './join-request.controller';
import { KafkaModule } from '../kafka/kafka.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinRequestRepository } from './join-request.repository';
import { EventPostModule } from '../event-post/event-post.module';
import { EventPostRepository } from '../event-post/event-post.repository';
import { JoinRequest } from './join-request.entity';
import { EventPost } from '../event-post/event-post.entity';

@Module({
  imports: [
    KafkaModule,
    UserModule,
    EventPostModule,
    TypeOrmModule.forFeature([
      JoinRequest,
      EventPost,
      JoinRequestRepository,
      EventPostRepository,
    ]),
  ],
  providers: [JoinRequestService],
  controllers: [JoinRequestController],
})
export class JoinRequestModule {}
