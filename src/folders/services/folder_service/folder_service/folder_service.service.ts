/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder as FolderEntity } from '../../../../typeorm/Folder';
import { CreateFolderDto } from '../../../dto/CreateFolder.dto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { File as FileEntity, File } from '../../../../typeorm/File';
import { UpdateFileDto } from '../../../dto/updateFolderId.dto';

@Injectable()
export class FolderServiceService {
    constructor(@InjectRepository(FolderEntity) private readonly folderRepository: Repository<FolderEntity>,
        @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) { }
    
    async createFolder(createFolderDto: CreateFolderDto) {
        const id = uuidv4();
        const created_at = new Date();
        const newFolder = await this.folderRepository.create({id, ...createFolderDto, created_at });
        return this.folderRepository.save(newFolder);
    }

    async deleteFolder(id: string) {
        return this.folderRepository.delete({ id });
    }

    async getFolders(owner_id: string) {
        const folders = await this.folderRepository.findBy({ owner_id });
        return folders;
    }

    findFolderById(id: string) {
        return this.folderRepository.findOneBy({ id });
    }

    async updateFolderIdForFile(id: string, updateFile: UpdateFileDto) {
        await this.fileRepository.update({ id }, { ...updateFile });
        return File;
    }
}
