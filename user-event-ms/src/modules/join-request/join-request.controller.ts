import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { INPUT_VALIDATION } from '../../common/validation';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';
import { UpdateJoinRequestDto } from './dto/update-join-request.dto copy';

@Controller('join-request')
export class JoinRequestController {
  constructor(private joinRequestService: JoinRequestService) {}

  @Post()
  @ApiCreatedResponse({ type: Promise<{ message: string }> })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createJoinRequest(
    @Body(INPUT_VALIDATION) { event_post_id }: CreateJoinRequestDto,
    @Request() req: { user_id: number },
  ): Promise<{ message: string }> {
    /**
     * Endpoint to request to join an event.
     * This endpoint receives a POST request with the event post ID in the request body and
     * will notify the event creator that the user wants to join the event.
     * the user can only request to join an event once.
     */
    return await this.joinRequestService.createJoinRequest(
      req.user_id,
      event_post_id,
    );
  }

  @Patch()
  @ApiCreatedResponse({ type: Promise<{ message: string }> })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateJoinRequest(
    @Body(INPUT_VALIDATION) updateJoinRequest: UpdateJoinRequestDto,
    @Request() req: { user_id: number },
  ): Promise<{ message: string }> {
    /**
     * Endpoint to accept or reject a join request.
     * This endpoint receives a PATCH request with the request ID and the status in the request body
     * and will update the status of the join request with notification to the requester.
     */
    return await this.joinRequestService.updateJoinRequest(
      req.user_id,
      updateJoinRequest.request_id,
      updateJoinRequest.status,
    );
  }
}
