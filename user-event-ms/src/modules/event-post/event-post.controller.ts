import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { INPUT_VALIDATION } from 'src/common/validation';
import { EventPostService } from './event-post.service';
import { CreateEventPostRequestDto } from './dto/event-post-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { EventPostCreateRequest } from './interfaces/event-post-create.interface';

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
    return await this.eventPostService.createEventPost(req.user_id, eventPost);
  }
}
