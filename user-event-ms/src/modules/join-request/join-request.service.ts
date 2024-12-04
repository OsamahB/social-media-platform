import { Injectable } from '@nestjs/common';
import { JoinRequest } from './join-request.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import MESSAGES from '../../common/messages.js';
import { EventPost } from '../event-post/event-post.entity';
import { JoinRequestStatus } from './interfaces/join-request-status.interface';

@Injectable()
export class JoinRequestService {
  async createJoinRequest(
    user_id: number,
    event_post_id: number,
  ): Promise<{ message: string }> {
    const hasJoinRequest = await JoinRequest.findOne({
      where: { user_id, event_post_id },
    });
    if (hasJoinRequest) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_ALREADY_EXISTS);
    }
    const eventPost = await EventPost.findOne({ where: { id: event_post_id } });
    if (!eventPost) {
      throw new BadRequestException(MESSAGES.EVENT_NOT_FOUND);
    }
    if (eventPost.date < new Date()) {
      throw new BadRequestException(MESSAGES.EXPIRED_EVENT);
    }
    if (eventPost.user_id === user_id) {
      throw new BadRequestException(MESSAGES.USER_EVENT);
    }
    await JoinRequest.create({
      user_id,
      event_post_id,
    }).save();
    // TODO: Send notification to the event owner

    return { message: 'Join request created successfully' };
  }

  async updateJoinRequest(
    user_id: number,
    request_id: number,
    status: JoinRequestStatus.ACCEPTED | JoinRequestStatus.REJECTED,
  ): Promise<{ message: string }> {
    const joinRequest = await JoinRequest.findOne({
      where: { id: request_id },
    });
    if (!joinRequest) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_NOT_FOUND);
    }
    const eventPost = await EventPost.findOne({
      where: { id: joinRequest.event_post_id },
    });
    if (eventPost?.user_id !== user_id) {
      throw new ForbiddenException(MESSAGES.ACCESS_DENIED);
    }
    if (joinRequest.status !== JoinRequestStatus.PENDING) {
      throw new BadRequestException(MESSAGES.JOIN_REQUEST_ALREADY_RESOLVED);
    }
    joinRequest.status = status;
    await joinRequest.save();
    // TODO: Send notification to the user who requested to join
    return { message: 'Join request updated successfully' };
  }
}
