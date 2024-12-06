import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventPostRequestDto } from './dto/event-post-create.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EventPost } from './event-post.entity';
import MESSAGES from '../../common/messages';
import { EventPostList } from './interfaces/event-post-list.interface';
import { QueryParamsDto } from './dto/event-post.filter.dto';
import { PaginationParamsDto } from 'src/common/dto';

@Injectable()
export class EventPostService {
  async createEventPost(
    user_id: number,
    eventPost: CreateEventPostRequestDto,
  ): Promise<EventPost> {
    // Check if the event date is in the past
    if (eventPost.date < new Date()) {
      throw new BadRequestException(MESSAGES.DATE_IN_PAST);
    }

    return await EventPost.create({
      ...eventPost,
      user_id,
    }).save();
  }

  async listEventPosts(
    paginationOptions: PaginationParamsDto,
    filter: QueryParamsDto,
  ): Promise<Pagination<EventPostList>> {
    // Filter the event posts based on the query parameters
    const [data, itemCount] = await EventPost.findAndCount({
      where: filter,
      order: { created_at: 'DESC' },
      relations: ['user'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    // TODO: Improve the response format to return only the needed fields from db
    // Format the response data
    const items = data.map((eventPost) => {
      return {
        id: eventPost.id,
        title: eventPost.title,
        description: eventPost.description,
        category: eventPost.category,
        location: eventPost.location,
        date: eventPost.date,
        period: eventPost.period,
        user_id: eventPost.user_id,
        user_email: eventPost.user.email,
        user_full_name: eventPost.user.full_name,
        created_at: eventPost.created_at,
      };
    });
    return {
      items,
      meta: {
        totalItems: items.length,
        itemCount,
        itemsPerPage: paginationOptions.limit,
        totalPages: Math.ceil(itemCount / paginationOptions.limit),
        currentPage: paginationOptions.page,
      },
    };
  }
}
