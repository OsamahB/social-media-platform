import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import MESSAGES from '../../../common/messages.js';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryParamsDto {
  @ApiProperty({
    description: 'Event Id',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'The id must be an integer value.' })
  @Min(1, { message: 'The id must be more than 0.' })
  id?: number;

  @ApiProperty({
    description: 'Event Title',
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Event Category',
    required: false,
  })
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Event Location (City, Place,....)',
    required: false,
  })
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Starting Date and Time',
    required: false,
    type: Date,
  })
  @IsDate({ message: MESSAGES.INVALID_DATE_FORMAT })
  @IsOptional()
  date?: Date;

  @ApiProperty({
    description: 'Event Duration',
    required: false,
  })
  @IsOptional()
  period?: string;

  @ApiProperty({
    description: 'User Id',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'The user_id must be an integer value.' })
  @Min(1, { message: 'The user_id must be more than 0.' })
  user_id?: number;
}
