import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { JoinRequestStatus } from '../interfaces/join-request-status.interface';

export class UpdateJoinRequestDto {
  @ApiProperty({
    description: 'Request ID',
    example: '1',
  })
  @IsNotEmpty()
  request_id: number;

  @ApiProperty({
    description: 'Event Status (ACCEPTED, REJECTED)',
    example: 'accepted',
    enum: JoinRequestStatus,
  })
  @IsEnum([JoinRequestStatus.ACCEPTED, JoinRequestStatus.REJECTED], {
    message: 'status must be one of the following values: accepted, rejected',
  })
  @IsNotEmpty()
  status: JoinRequestStatus.ACCEPTED | JoinRequestStatus.REJECTED;
}
