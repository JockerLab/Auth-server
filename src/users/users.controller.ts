import { Controller, Get, Post, Put, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateInfoDto } from '../dto/create-info.dto';
import { EditInfoDto } from '../dto/edit-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createInfo(@Body() createInfoDto: CreateInfoDto, @Request() req) {
        return this.usersService.createInfo(req.user, createInfoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getInfo(@Request() req) {
        return this.usersService.getInfo(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async editInfo(@Body() editInfoDto: EditInfoDto, @Request() req) {
        return this.usersService.editInfo(req.user, editInfoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteInfo(@Request() req) {
        return this.usersService.deleteInfo(req.user);
    }
}
