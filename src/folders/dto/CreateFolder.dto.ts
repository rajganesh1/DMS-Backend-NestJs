/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateFolderDto{
    @IsNotEmpty()
    @MinLength(3)
    name: string

    @IsNotEmpty()
    owner_id: string;
}