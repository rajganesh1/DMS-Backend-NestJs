/* eslint-disable prettier/prettier */
import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../../guard/JwtGuard';
import { FetchHomeServiceService } from '../../../services/fetch_home_service/fetch_home_service/fetch_home_service.service';

@Controller('home')
export class FetchHomeControllerController {
        constructor(@Inject('FetchHomeService') private readonly homeService: FetchHomeServiceService) { }
    
    @UseGuards(JwtGuard)
    @Get('/:owner_id')
    async getFilesAndFolders(@Param('owner_id') owner_id: string) {
        const files = await this.homeService.getFiles(owner_id, "1000");
        const folders = await this.homeService.getFolders(owner_id);
        return([...files, ...folders]);
    }

    @UseGuards(JwtGuard)
    @Get('/:owner_id/:folder_id')
    async getFiles(@Param('owner_id') owner_id: string, @Param('folder_id') folder_id: string) {
        const files = await this.homeService.getFiles(owner_id, folder_id);
        return files;
    }
}
