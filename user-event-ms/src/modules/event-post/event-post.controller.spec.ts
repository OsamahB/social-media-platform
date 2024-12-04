import { Test, TestingModule } from '@nestjs/testing';
import { EventPostController } from './event-post.controller';

describe('EventPostController', () => {
  let controller: EventPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventPostController],
    }).compile();

    controller = module.get<EventPostController>(EventPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
