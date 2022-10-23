/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post, UseGuards, UsePipes, ValidationPipe, HttpException, HttpStatus, Delete, Param, Get } from '@nestjs/common';
import { FileServiceService } from '../../../services/file_sevice/file_service/file_service.service';
import { JwtGuard } from '../../../../guard/JwtGuard';
import { CreateFileDto } from '../../../dto/CreateFile.dto';

@Controller('files')
export class FileControllerController {
    constructor(@Inject('FileService') private readonly fileService: FileServiceService) { }

    @Post('create_file')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtGuard)
    createFile(@Body() createFileDto: CreateFileDto) {
        if (createFileDto.owner_id == undefined) {
            throw new HttpException('Owner_id missing', HttpStatus.BAD_REQUEST);
        }
        else if (createFileDto.folder_id == undefined) {
            throw new HttpException('Owner_id missing', HttpStatus.BAD_REQUEST);
        }
        else {
            const file = this.fileService.createFile(createFileDto);
            return file;
        }
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:owner_id/:file_id')
    async deleteFile(@Param('owner_id') owner_id: string, @Param('file_id') file_id: string) {
        const file = await this.fileService.findFileById(owner_id, file_id);
        if (file) {
            await this.fileService.deleteFile(owner_id, file_id);
            return 'File deleted';
        }
        else throw new HttpException('File Not Found', HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtGuard)
    @Get('/:owner_id/:folder_id')
    async getFiles(@Param('owner_id') owner_id: string, @Param('folder_id') folder_id: string) {
        const files = await this.fileService.getFiles(owner_id, folder_id);
        return files;
    }
}
