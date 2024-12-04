import { Test, TestingModule } from '@nestjs/testing';
import { JoinRequestController } from './join-request.controller';

describe('JoinRequestController', () => {
  let controller: JoinRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinRequestController],
    }).compile();

    controller = module.get<JoinRequestController>(JoinRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
