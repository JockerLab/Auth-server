import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
    Length,
    IsEmail,
    IsPhoneNumber,
    MinLength
} from '@nestjs/class-validator';
  

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail({
        message: 'Login must be an email'
    })
    @Column()
    login: string;

    @Column()
    password: string;

    @Length(1, 100, {
        message: 'Name\'s length must be between $constraint1 and $constraint2'
    })
    @Column({
        nullable: true,
    })
    name: string;

    @IsPhoneNumber()
    @Column({
        nullable: true,
    })
    phone: string;

    @Length(1, 200, {
        message: 'Address length must be between $constraint1 and $constraint2'
    })
    @Column({
        nullable: true,
    })
    address: string;

    @MinLength(1, {
        message: 'Minimal length of information must be at least $constraint1'
    })
    @Column("text", {
        nullable: true,
    })
    about: string;

    constructor() {}
}