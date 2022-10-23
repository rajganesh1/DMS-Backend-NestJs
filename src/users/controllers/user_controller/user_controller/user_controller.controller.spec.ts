/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerController } from './user_controller.controller';
import { UserServiceService } from '../../../services/user_service/user_service/user_service.service';

describe('UserControllerController', () => {
  let controller: UserControllerController;
  let service: UserServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerController],
      providers: [{
        provide: 'UserService',
        useValue: {},
      }]
    }).compile();

    controller = module.get<UserControllerController>(UserControllerController);
    service = module.get<UserServiceService>('UserService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
});
