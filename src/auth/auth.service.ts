import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { RegisterUserDto } from 'src/dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(incomingLogin: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(incomingLogin);
        if (user && password === user.password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(incomingUser: RegisterUserDto) {
        const user = new User();
        user.login = incomingUser.login;
        user.password = incomingUser.password;
        const errors = await this.usersService.validateUserFields(user);
        if (errors) {
            return errors;
        }
        const foundUser = await this.usersService.findOne(incomingUser.login);
        if (foundUser) {
            return [{ constraints: { error: 'User already exist' } }]
        }
        if (incomingUser.password !== incomingUser.repeatedPassword) {
            return [{ constraints: { error: 'Passwords must be similar' } }]
        }
        let newUser = await this.usersService.create(user);
        return this.login(newUser);
    }

    async login(user: any) {
        const payload = { login: user.login, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}