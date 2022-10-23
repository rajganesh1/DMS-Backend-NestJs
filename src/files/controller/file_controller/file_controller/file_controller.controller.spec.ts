/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FileControllerController } from './file_controller.controller';
import { FileServiceService } from '../../../services/file_sevice/file_service/file_service.service';

describe('FileControllerController', () => {
  let controller: FileControllerController;
  let service: FileServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileControllerController],
      providers:[{
        provide: 'FileService',
        useValue: {},
      }]
    }).compile();

    controller = module.get<FileControllerController>(FileControllerController);
    service = module.get<FileServiceService>('FileService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
});
