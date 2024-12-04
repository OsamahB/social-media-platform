import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventPostRequestDto } from './dto/event-post-create.dto';
import { EventPost } from './event-post.entity';
import MESSAGES from '../../common/messages.js';

@Injectable()
export class EventPostService {
  async createEventPost(
    user_id: number,
    eventPost: CreateEventPostRequestDto,
  ): Promise<EventPost> {
    if (eventPost.date < new Date()) {
      throw new BadRequestException(MESSAGES.DATE_IN_PAST);
    }

    return await EventPost.create({
      ...eventPost,
      user_id,
    }).save();
  }
}
