import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterResponse {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User name', example: 'Osamah Mohammad' })
  full_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'osamah.mohammad@gmail.com',
  })
  email: string;

  @ApiProperty({ description: 'When user was created' })
  created_at: Date;
}
