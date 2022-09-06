import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInfoDto } from '../dto/create-info.dto';
import { EditInfoDto } from '../dto/edit-info.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { validateOrReject, ValidationError } from '@nestjs/class-validator';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(incomingLogin: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ login: incomingLogin });
    }

    async validateUserFields(user: any, skipProperties: boolean = true): Promise<ValidationError[] | undefined> {
        try {
            await validateOrReject(user, { skipMissingProperties: skipProperties });
        } catch (errors) {
            return errors;
        }
    }

    async create(user: User): Promise<User | undefined> {
        return this.usersRepository.save(user);
    }

    async getInfo(incomingUser: any) {
        const user = await this.findOne(incomingUser.login);
        delete user['password'];
        delete user['id'];
        return user;
    }

    async createInfo(incomingUser: any, info: CreateInfoDto): Promise<User | ValidationError[] | undefined> {
        return this.editInfo(incomingUser, info, false);
    }

    async editInfo(incomingUser: any, info: EditInfoDto, skipProperties: boolean = true): Promise<User | ValidationError[] | undefined> {
        const user = await this.findOne(incomingUser.login);
        for (let property in info) {
            if (!skipProperties || info[property]) user[property] = info[property];
        }
        const errors = await this.validateUserFields(user, skipProperties);
        if (errors) {
            return errors;
        }
        return this.usersRepository.save(user);
    }

    async deleteInfo(incomingUser: any): Promise<User | undefined> {
        const user = await this.findOne(incomingUser.login);
        for (let property of Object.keys(new EditInfoDto())) {
            user[property] = null;
        }
        return this.usersRepository.save(user);
    }
}