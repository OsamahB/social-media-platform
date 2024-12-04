import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateJoinRequestDto {
  @ApiProperty({
    description: 'Event ID',
    example: '1',
  })
  @IsNotEmpty()
  event_post_id: number;
}
