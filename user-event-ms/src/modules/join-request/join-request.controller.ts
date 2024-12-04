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
import { INPUT_VALIDATION } from 'src/common/validation';
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
    return await this.joinRequestService.updateJoinRequest(
      req.user_id,
      updateJoinRequest.request_id,
      updateJoinRequest.status,
    );
  }
}
