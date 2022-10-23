/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserControllerController } from './controllers/user_controller/user_controller/user_controller.controller';
import { UserServiceService } from './services/user_service/user_service/user_service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../typeorm/User';
import { JwtStratergy } from '../utils/JwtStratergy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({})],
  controllers: [UserControllerController],
  providers: [{
    provide: 'UserService',
    useClass: UserServiceService,
  }, JwtStratergy],
})
export class UsersModule {}
