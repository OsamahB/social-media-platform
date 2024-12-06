import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserRegisterRequestDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { INPUT_VALIDATION } from '../../common/validation';
import { UserRegisterResponse } from './interfaces/user-register.interface';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateRequestDto } from './dto/user-update.dto';

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
    /**
     * Endpoint to register a user.
     * This endpoint receives a POST request with the user's data in the request body
     * and returns the created user object.
     */
    return await this.userService.doUserRegistration(userRegister);
  }

  @Put('/profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'User object as response',
    type: UserRegisterResponse,
  })
  updateProfile(
    @Request() req: { user_id: number },
    @Body(INPUT_VALIDATION) user: UserUpdateRequestDto,
  ): Promise<UserRegisterResponse> {
    /**
     * Endpoint to update the user's profile.
     * This endpoint receives a PUT request with the user's data in the request body
     * and returns the updated user object.
     */
    return this.userService.updateProfile(req.user_id, user);
  }
}
