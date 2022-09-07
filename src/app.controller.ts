import { Controller, Get, Post, Body, UseGuards, Request  } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Method that register a user with given credentials.
     * @param registerUserDto {@link RegisterUserDto} user credentials to register.
     * @returns jwt token if user registered successfully, else an error.
     */
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    /**
     * Method that log-in a user with given credentials.
     * @param req user credentials to log-in.
     * @returns jwt token if user logged-in successfully, else an error.
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /**
     * Method that log-out a user.
     * @returns {null}.
     */
    @Post('logout')
    async logout() {
        return null;
    }
}
