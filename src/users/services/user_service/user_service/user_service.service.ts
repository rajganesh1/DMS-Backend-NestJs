/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../../../typeorm/User';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../../dto/CreateUserDto';
import { hashPassword, comparePassword } from '../../../../utils/bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from '../../../dto/LoginDto';
import { SerializedUser } from '../../../types/index';

@Injectable()
export class UserServiceService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private jwt: JwtService) { }

    async createUser(createUserDto: CreateUserDto) {
        const id = uuidv4();
        const password = hashPassword(createUserDto.password);
        console.log(password);
        const newuser = this.userRepository.create({ id, ...createUserDto, password });
        await this.userRepository.save(newuser);
        return new SerializedUser(newuser);
    }

    async login(loginDetails: LoginDto) {
        const email = loginDetails.email;
        const userDB = await this.findUserByEmail(email);
        if (userDB) {
            const matched = comparePassword(loginDetails.password, userDB.password);
            if (matched) {
                console.log('User validation success');
                const token = await this.signToken(email, loginDetails.password);
                return { ...new SerializedUser(userDB), token };
            }
            else {
                console.log('Passwords Dont match');
                throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            console.log('User not found');
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    }

    deleteUser(id: string) {
        return this.userRepository.delete({ id });
    }

    async signToken(email: string, password: string) {
        const payload = {
            email: email,
            password: password,
        }
        const secretKey = 'jwt secret key';
        return this.jwt.signAsync(payload, {
            expiresIn: '600000m',
            secret: secretKey
        }).then((token) => { return token });
    }

    findUserByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    findUserById(id: string) {
        return this.userRepository.findOneBy({ id });
    }
}
