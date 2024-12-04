import { ApiProperty } from '@nestjs/swagger';

export class EventPostCreateRequest {
  @ApiProperty({
    description: 'Event Post ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'Event Title',
    example: 'Black Hat',
  })
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
  date: Date;

  @ApiProperty({
    description: 'Event Duration',
    example: '3 Days, 5 Hours',
  })
  period: string;

  @ApiProperty({
    description: 'When event post was created',
    example: '2025-09-27T18:00:00Z',
  })
  created_at: Date;
}
