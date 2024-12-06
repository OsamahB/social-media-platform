import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { INPUT_VALIDATION } from '../../common/validation';
import { EventPostService } from './event-post.service';
import { CreateEventPostRequestDto } from './dto/event-post-create.dto';
import { QueryParamsDto } from './dto/event-post.filter.dto';
import { AuthGuard } from '../auth/auth.guard';
import { EventPostCreateRequest } from './interfaces/event-post-create.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EventPostList } from './interfaces/event-post-list.interface';
import { PaginationParamsDto } from '../../common/dto';

@Controller('event-post')
export class EventPostController {
  constructor(private eventPostService: EventPostService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Event Post',
    type: EventPostCreateRequest,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createEventPost(
    @Body(INPUT_VALIDATION)
    eventPost: CreateEventPostRequestDto,
    @Request() req: { user_id: number },
  ): Promise<EventPostCreateRequest> {
    /**
     * Endpoint to create an event post.
     * This endpoint receives a POST request with the event post data in the request body
     * and returns the created event post.
     */
    return await this.eventPostService.createEventPost(req.user_id, eventPost);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'List of Event Posts',
    type: Pagination<EventPostList>,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async listEventPosts(
    @Param(new ValidationPipe({ transform: true })) filter: QueryParamsDto,
    @Query(new ValidationPipe({ transform: true }))
    pagination: PaginationParamsDto,
  ): Promise<Pagination<EventPostList>> {
    /**
     * Endpoint to list event posts.
     * This endpoint receives a GET request with optional query parameters for filtering and pagination
     * and returns a paginated list of event posts.
     */
    return await this.eventPostService.listEventPosts(pagination, filter);
  }
}
