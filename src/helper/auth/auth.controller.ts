import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServvice: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SingUpDto) {
    return this.authServvice.singUp(signupDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authServvice.login(loginDto);
  }
}
