/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileControllerController } from './controller/file_controller/file_controller/file_controller.controller';
import { FileServiceService } from './services/file_sevice/file_service/file_service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../typeorm/File';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from '../utils/JwtStratergy';

@Module({
  imports: [TypeOrmModule.forFeature([File]), PassportModule, JwtModule.register({})],
  controllers: [FileControllerController],
  providers: [{
    provide: 'FileService',
    useClass: FileServiceService,
  }, JwtStratergy],
})
export class FilesModule {}
