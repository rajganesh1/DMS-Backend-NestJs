/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post, UseGuards, UsePipes, ValidationPipe, HttpException, HttpStatus, Delete, Param, Get, Put } from '@nestjs/common';
import { FolderServiceService } from '../../../services/folder_service/folder_service/folder_service.service';
import { CreateFolderDto } from '../../../dto/CreateFolder.dto';
import { JwtGuard } from '../../../../guard/JwtGuard';
import { FileServiceService } from '../../../../files/services/file_sevice/file_service/file_service.service';
import { UpdateFileDto } from 'src/folders/dto/updateFolderId.dto';

@Controller('folders')
export class FolderControllerController {
    constructor(@Inject('FolderService') private readonly folderService: FolderServiceService,
    @Inject('FileService') private readonly fileService: FileServiceService) { }

    @Post('create_folder')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtGuard)
    createFolder(@Body() createFolderDto: CreateFolderDto) {
        if (createFolderDto.owner_id == undefined) {
            throw new HttpException('owner id missing', HttpStatus.BAD_REQUEST);
        }
        else {
            const folder = this.folderService.createFolder(createFolderDto);
            return folder;
        }
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async deleteFolder(@Param('id') id: string) {
        const folder = await this.folderService.findFolderById(id);
        if (folder) {
            await this.folderService.deleteFolder(id);
            return 'Folder deleted';
        }
        else throw new HttpException('Folder not found', HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtGuard)
    @Get('/:id')
    async getFolders(@Param('id') id: string) {
        const folders = await this.folderService.getFolders(id);
        return folders;
    }

    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    @Put('updateFolderId/:id')
    async updateFolderIdForFile(@Param('id') id: string, @Body()updateFileDto: UpdateFileDto) {
        const updatedFile = await this.folderService.updateFolderIdForFile(id, updateFileDto);
        return updatedFile;
    }
}
