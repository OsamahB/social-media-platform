import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { INPUT_VALIDATION } from 'src/common/validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(INPUT_VALIDATION) signInDto: LoginRequestDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
