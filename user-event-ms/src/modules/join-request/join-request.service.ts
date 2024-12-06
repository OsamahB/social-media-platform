import { Injectable } from '@nestjs/common';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import MESSAGES from '../../common/messages';
import { EventPost } from '../event-post/event-post.entity';
import { JoinRequestStatus } from './interfaces/join-request-status.interface';
import { ProducerService } from '../kafka/producer.service';
import { UserService } from '../user/user.service';
import { formatDateString } from '../../common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinRequestRepository } from './join-request.repository';
import { EventPostRepository } from '../event-post/event-post.repository';
import { JoinRequest } from './join-request.entity';

@Injectable()
export class JoinRequestService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly userService: UserService,
    @InjectRepository(JoinRequest)
    private readonly joinRequestRepository: JoinRequestRepository,
    @InjectRepository(EventPost)
    private readonly eventPostRepository: EventPostRepository,
  ) {}

  async createJoinRequest(
    user_id: number,
    event_post_id: number,
  ): Promise<{ message: string }> {
    const hasJoinRequest = await this.joinRequestRepository.findOne({
      where: { user_id, event_post_id },
    });
    if (hasJoinRequest) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_ALREADY_EXISTS);
    }
    const eventPost = await this.eventPostRepository.findOne({
      relations: ['user'],
      where: { id: event_post_id },
    });
    if (!eventPost) {
      throw new BadRequestException(MESSAGES.EVENT_NOT_FOUND);
    }
    if (eventPost.date < new Date()) {
      throw new BadRequestException(MESSAGES.EXPIRED_EVENT);
    }
    if (eventPost.user_id === user_id) {
      throw new BadRequestException(MESSAGES.USER_EVENT);
    }
    await this.joinRequestRepository
      .create({
        user_id,
        event_post_id,
      })
      .save();
    const requested_user = await this.userService.findById(user_id);
    await this.producerService.produce('email-notification', {
      value: JSON.stringify({
        to: eventPost.user.email,
        template: 'request',
        emailData: {
          receiverName: eventPost.user.full_name,
          eventTitle: eventPost.title,
          eventDate: formatDateString(eventPost.date),
          senderName: requested_user?.full_name,
          senderEmail: requested_user?.email,
        },
      }),
    });

    return { message: 'Join request created successfully' };
  }

  async updateJoinRequest(
    user_id: number,
    request_id: number,
    status: JoinRequestStatus.ACCEPTED | JoinRequestStatus.REJECTED,
  ): Promise<{ message: string }> {
    const joinRequest = await this.joinRequestRepository.findOne({
      relations: ['user'],
      where: { id: request_id },
    });
    if (!joinRequest) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_NOT_FOUND);
    }
    const eventPost = await this.eventPostRepository.findOne({
      where: { id: joinRequest.event_post_id },
    });
    if (eventPost?.user_id !== user_id) {
      throw new ForbiddenException(MESSAGES.ACCESS_DENIED);
    }
    if (joinRequest.status !== JoinRequestStatus.PENDING) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_ALREADY_RESOLVED);
    }
    joinRequest.status = status;
    // await joinRequest.save();
    await this.producerService.produce('email-notification', {
      value: JSON.stringify({
        to: joinRequest.user.email,
        template: status === JoinRequestStatus.ACCEPTED ? 'accept' : 'reject',
        emailData: {
          receiverName: joinRequest.user.full_name,
          eventTitle: eventPost.title,
          eventDate: formatDateString(eventPost.date),
        },
      }),
    });
    return { message: 'Join request updated successfully' };
  }
}
