/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { UsersModule } from './users/users.module';
import { FetchHomeModule } from './fetch_home/fetch_home.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './typeorm/User';
import { Folder } from './typeorm/Folder';
import { File } from './typeorm/File';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Dhanyababyduck1#',
    database: 'nestjs_dms',
    entities: [User,File,Folder],
    synchronize: true,
  }), FilesModule, FoldersModule, UsersModule, FetchHomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
