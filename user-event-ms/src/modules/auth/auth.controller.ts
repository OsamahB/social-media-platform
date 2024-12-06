import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { INPUT_VALIDATION } from '../../common/validation';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { UserRegisterResponse } from '../user/interfaces/user-register.interface';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(INPUT_VALIDATION) signInDto: LoginRequestDto) {
    /**
     * Endpoint to sign in a user.
     * This endpoint receives a POST request with the user's email and password in the request body
     * and returns a JWT token if the user is successfully authenticated.
     */
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'User object as response',
    type: UserRegisterResponse,
  })
  getMe(
    @Request() req: { user_id: number },
  ): Promise<UserRegisterResponse | null> {
    /**
     * Endpoint to get the user's profile.
     * This endpoint receives a GET request with the JWT token in the Authorization header
     * and returns the user's profile.
     */
    return this.userService.findById(req.user_id);
  }
}
