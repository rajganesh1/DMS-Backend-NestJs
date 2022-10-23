/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FetchHomeControllerController } from './controllers/fetch_home_controller/fetch_home_controller/fetch_home_controller.controller';
import { FetchHomeServiceService } from './services/fetch_home_service/fetch_home_service/fetch_home_service.service';
import { User } from '../typeorm/User';
import { File } from '../typeorm/File';
import { Folder } from '../typeorm/Folder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([File, User, Folder]), PassportModule, JwtModule.register({})],
  controllers: [FetchHomeControllerController],
    providers: [{
        provide: 'FetchHomeService',
        useClass: FetchHomeServiceService,
  },JwtService],
})
export class FetchHomeModule {}
