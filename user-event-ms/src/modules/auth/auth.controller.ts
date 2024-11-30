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
import { INPUT_VALIDATION } from 'src/common/validation';
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
    return this.userService.findById(req.user_id);
  }
}
