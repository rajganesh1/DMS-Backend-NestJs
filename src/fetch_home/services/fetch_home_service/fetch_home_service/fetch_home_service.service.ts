/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File as FileEntity} from '../../../../typeorm/File';
import { Repository } from 'typeorm';
import { Folder as FolderEntity} from '../../../../typeorm/Folder';

@Injectable()
export class FetchHomeServiceService {
    constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(FolderEntity) private readonly folderRepository: Repository<FolderEntity>) { }
    
    async getFiles(owner_id: string, folder_id: string) {
        const files = await this.fileRepository.findBy({ owner_id, folder_id });
        return files;
    }
    
    async getFolders(owner_id: string) {
        const folders = await this.folderRepository.findBy({ owner_id });
        return folders;
    }

}
