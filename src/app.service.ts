// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './users/user.entity';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';

// @Injectable()
// export class AppService {
//     constructor(
//         @InjectRepository(User)
//         private usersRepository: Repository<User>,
//     ) {}

//     async register(user: RegisterUserDto) {
//         return await this.usersRepository.save(user);
//     }

//     async login(user: LoginUserDto) {
//         return;
//     }

//     async logout() {
//         return;
//     }
// }
