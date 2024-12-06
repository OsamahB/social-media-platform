import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from 'class-validator';
import MESSAGES from '../../../common/messages';

export class CreateEventPostRequestDto {
  @ApiProperty({
    description: 'Event Title',
    example: 'Black Hat',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Event Description',
    example: 'Black Hat Briefings is a computer security conference...',
  })
  description?: string;

  @ApiProperty({
    description: 'Event Category',
    example: 'Cyber Security',
  })
  category?: string;

  @ApiProperty({
    description: 'Event Location (City, Place,....)',
    example: 'Riyadh, Black Hat MEA',
  })
  location: string;

  @ApiProperty({
    description: 'Starting Date and Time',
    example: '2025-09-27T18:00:00Z',
    type: Date,
  })
  @IsDate({ message: MESSAGES.INVALID_DATE_FORMAT })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Event Duration',
    example: '3 Days, 5 Hours',
  })
  period: string;
}
