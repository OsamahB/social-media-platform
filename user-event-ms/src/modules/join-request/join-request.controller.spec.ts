import { Test, TestingModule } from '@nestjs/testing';
import { JoinRequestController } from './join-request.controller';
import { JoinRequestService } from './join-request.service';
import { AuthGuard } from '../auth/auth.guard';
import { JoinRequestStatus } from './interfaces/join-request-status.interface';

const mockJoinRequestService = {
  createJoinRequest: jest.fn().mockImplementation((user_id, event_post_id) => {
    return { message: 'Join request created successfully' };
  }),
  updateJoinRequest: jest
    .fn()
    .mockImplementation((user_id, request_id, status) => {
      return { message: 'Join request updated successfully' };
    }),
};

describe('JoinRequestController', () => {
  let controller: JoinRequestController;
  let service: JoinRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinRequestController],
      providers: [
        {
          provide: JoinRequestService,
          useValue: mockJoinRequestService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<JoinRequestController>(JoinRequestController);
    service = module.get<JoinRequestService>(JoinRequestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a join request', async () => {
    const user_id = 1;
    const event_post_id = 1;

    expect(
      await controller.createJoinRequest({ event_post_id }, { user_id }),
    ).toEqual({
      message: 'Join request created successfully',
    });
  });

  it('should update a join request', async () => {
    const user_id = 1;
    const status = JoinRequestStatus.ACCEPTED;
    const request_id = 1;

    expect(
      await controller.updateJoinRequest({ status, request_id }, { user_id }),
    ).toEqual({
      message: 'Join request updated successfully',
    });
  });
});
