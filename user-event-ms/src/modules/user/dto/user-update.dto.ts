import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UserUpdateRequestDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Osamah Mohammed',
  })
  @IsOptional()
  full_name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'osamah.mohammed@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
