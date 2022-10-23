/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FolderControllerController } from './controllers/folder_controller/folder_controller/folder_controller.controller';
import { FolderServiceService } from './services/folder_service/folder_service/folder_service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../typeorm/Folder';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratergy } from '../utils/JwtStratergy';
import { FileServiceService } from '../files/services/file_sevice/file_service/file_service.service';
import { File } from '../typeorm/File';

@Module({
  imports: [TypeOrmModule.forFeature([Folder,File]), PassportModule, JwtModule.register({})],
  controllers: [FolderControllerController],
  providers: [{
    provide: 'FolderService',
    useClass: FolderServiceService,
  }, JwtStratergy,
    {
      provide: 'FileService',
      useClass: FileServiceService
  }],
})
export class FoldersModule {}
