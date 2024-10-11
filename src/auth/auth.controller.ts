import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  create(@Body() logInDto: LogInDto) {
    return this.authService.login(logInDto);
  }


}
