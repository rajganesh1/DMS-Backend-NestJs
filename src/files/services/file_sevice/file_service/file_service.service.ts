/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File as FileEntity } from '../../../../typeorm/File';
import { CreateFileDto } from '../../../dto/CreateFile.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileServiceService {
    constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) { }

    async createFile(createFileDto: CreateFileDto) {
        const id = uuidv4();
        const created_at = new Date();
        const newFile = await this.fileRepository.create({ id, ...createFileDto, created_at });
        return this.fileRepository.save(newFile);
    }
    

    async deleteFile(owner_id: string, id: string) {
        return this.fileRepository.delete({ id, owner_id });
    }

    async getFiles(owner_id: string, folder_id: string) {
        const files = await this.fileRepository.findBy({ owner_id, folder_id });
        return files;
    }

    findFileById(owner_id: string, id: string) {
        return this.fileRepository.findOneBy({ owner_id, id });
    }
}
