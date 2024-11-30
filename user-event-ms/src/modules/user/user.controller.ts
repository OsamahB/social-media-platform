import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { UserRegisterRequestDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { INPUT_VALIDATION } from 'src/common/validation';
import { UserRegisterResponse } from './interfaces/user-register.interface';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: UserRegisterResponse,
  })
  @ApiBadRequestResponse({ description: 'User cannot register.' })
  async doUserRegistration(
    @Body(INPUT_VALIDATION)
    userRegister: UserRegisterRequestDto,
  ): Promise<UserRegisterResponse> {
    return await this.userService.doUserRegistration(userRegister);
  }
}
