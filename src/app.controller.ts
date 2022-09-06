import { Controller, Get, Post, Body, UseGuards, Request  } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
    async logout() {
        return null;
    }
}
