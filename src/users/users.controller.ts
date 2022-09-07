import { Controller, Get, Post, Put, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateInfoDto } from '../dto/create-info.dto';
import { EditInfoDto } from '../dto/edit-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * Check if user have jwt token and create user info with given data.
     * @param createInfoDto given data.
     * @param req user creadentials.
     * @returns user with created info or an error.
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    async createInfo(@Body() createInfoDto: CreateInfoDto, @Request() req) {
        return this.usersService.createInfo(req.user, createInfoDto);
    }

    /**
     * Check if user have jwt token and get user info.
     * @param req user creadentials.
     * @returns user with info or an error.
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    async getInfo(@Request() req) {
        return this.usersService.getInfo(req.user);
    }

    /**
     * Check if user have jwt token and edit user info with given data.
     * @param editInfoDto {@link EditInfoDto} given data.
     * @param req user creadentials.
     * @returns user with edited info or an error.
     */
    @UseGuards(JwtAuthGuard)
    @Put()
    async editInfo(@Body() editInfoDto: EditInfoDto, @Request() req) {
        return this.usersService.editInfo(req.user, editInfoDto);
    }

    /**
     * Check if user have jwt token and delete user info.
     * @param req user creadentials.
     * @returns user without info or an error.
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteInfo(@Request() req) {
        return this.usersService.deleteInfo(req.user);
    }
}
