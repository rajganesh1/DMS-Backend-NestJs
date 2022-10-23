/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe, HttpException, HttpStatus, UseGuards, Delete, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserServiceService } from '../../../services/user_service/user_service/user_service.service';
import { CreateUserDto } from '../../../dto/CreateUserDto';
import { LoginDto } from '../../../dto/LoginDto';
import { JwtGuard } from '../../../../guard/JwtGuard';
import { SerializedUser } from '../../../types/index';

@Controller('users')
export class UserControllerController {
    constructor(@Inject('UserService') private readonly userService: UserServiceService,) { }

    @Post('create_user')
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        return new SerializedUser(user);
    }

    @Get('login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() loginDto: LoginDto) {
        const details = await this.userService.login(loginDto);
        if (details) {
            return new SerializedUser(details);
        }
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async deleteUser(@Param('id')id: string) {
        const user = await this.userService.findUserById(id);
        if (user) {
            await this.userService.deleteUser(id);
            return 'User deleted';
        }
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

}

