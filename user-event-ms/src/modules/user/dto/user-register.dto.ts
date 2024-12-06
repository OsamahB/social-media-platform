import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGEX } from '../../../common/validation';
import MESSAGES from '../../../common/messages';

export class UserRegisterRequestDto {
  @ApiProperty({
    description: 'User full name',
    example: 'Osamah Mohammed',
  })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: 'User email',
    example: 'osamah.mohammed@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Example@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Confirm the password',
    example: 'Example@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  password_confirm: string;
}
