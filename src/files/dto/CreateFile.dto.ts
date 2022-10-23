/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateFileDto{
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    folder_id: string;

    @IsNotEmpty()
    owner_id: string;

    @IsNotEmpty()
    extension: string;

    @IsNotEmpty()
    content: string;
}