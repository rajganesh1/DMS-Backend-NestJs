/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string;

}