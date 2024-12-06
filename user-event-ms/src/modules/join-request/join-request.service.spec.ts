import { Test, TestingModule } from '@nestjs/testing';
import { JoinRequestService } from './join-request.service';
import { JoinRequest } from './join-request.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { ProducerService } from '../kafka/producer.service';
import { JoinRequestStatus } from './interfaces/join-request-status.interface';
import { EventPost } from '../event-post/event-post.entity';
import { User } from '../user/user.entity';

const mockJoinRequestRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockEventPostRepository = {
  findOne: jest.fn(),
};
const mockUserService = {
  findById: jest.fn(),
};
const mockProducerService = {
  produce: jest.fn().mockImplementation(() => null),
};

describe('JoinRequestService', () => {
  let service: JoinRequestService;
  let joinRequestRepository: Repository<JoinRequest>;
  let eventPostRepository: Repository<EventPost>;
  let userService: UserService;
  let producerService: ProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JoinRequestService,
        {
          provide: ProducerService,
          useValue: mockProducerService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: getRepositoryToken(EventPost),
          useValue: mockEventPostRepository,
        },
        {
          provide: getRepositoryToken(JoinRequest),
          useValue: mockJoinRequestRepository,
        },
      ],
    }).compile();

    service = module.get<JoinRequestService>(JoinRequestService);
    joinRequestRepository = module.get<Repository<JoinRequest>>(
      getRepositoryToken(JoinRequest),
    );
    eventPostRepository = module.get<Repository<EventPost>>(
      getRepositoryToken(EventPost),
    );
    userService = module.get<UserService>(UserService);
    producerService = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJoinRequest', () => {
    it('should create a join request', async () => {
      const postOwner = new User();
      postOwner.id = 1;
      postOwner.full_name = 'User name';
      postOwner.email = 'email@mail.com';
      postOwner.created_at = new Date();

      const eventPost = new EventPost();
      eventPost.id = postOwner.id;
      eventPost.user_id = postOwner.id + 1;
      eventPost.title = 'Event title';
      eventPost.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      eventPost.created_at = new Date();
      eventPost.location = 'Event location';
      eventPost.user = postOwner;

      const joinRequest = new JoinRequest();
      joinRequest.id = 1;
      joinRequest.user_id = postOwner.id;
      joinRequest.event_post_id = eventPost.id;
      joinRequest.created_at = new Date();
      joinRequest.status = JoinRequestStatus.PENDING;

      mockJoinRequestRepository.findOne.mockReturnValue(null);
      mockEventPostRepository.findOne.mockReturnValue(eventPost);
      mockJoinRequestRepository.create.mockReturnValue(
        mockJoinRequestRepository,
      );
      mockJoinRequestRepository.save.mockReturnValue(expect.anything());
      mockUserService.findById.mockReturnValue({
        id: postOwner.id,
        full_name: 'User name',
        email: 'osamah@mail.com',
        created_at: new Date(),
      });
      mockProducerService.produce.mockReturnValue(null);

      const result = await service.createJoinRequest(
        postOwner.id,
        eventPost.id,
      );
      expect(result).toEqual({ message: 'Join request created successfully' });
    });
  });

  describe('updateJoinRequest', () => {
    it('should update a join request', async () => {
      const user = new User();
      user.id = 1;
      user.full_name = 'User name';
      user.email = 'osamah@mail.com';
      user.created_at = new Date();

      const requestedUser = new User();
      requestedUser.id = 2;
      requestedUser.full_name = 'Requested user name';
      requestedUser.email = 'requested@mail.com';
      requestedUser.created_at = new Date();

      const eventPost = new EventPost();
      eventPost.id = 2;
      eventPost.user_id = user.id;
      eventPost.title = 'Event title';
      eventPost.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      eventPost.created_at = new Date();
      eventPost.location = 'Event location';
      eventPost.user = user;

      const joinRequest = new JoinRequest();
      joinRequest.id = 1;
      joinRequest.user_id = requestedUser.id;
      joinRequest.event_post_id = eventPost.id;
      joinRequest.created_at = new Date();
      joinRequest.status = JoinRequestStatus.PENDING;
      joinRequest.user = requestedUser;

      mockJoinRequestRepository.findOne.mockReturnValue(joinRequest);
      mockEventPostRepository.findOne.mockReturnValue(eventPost);
      mockJoinRequestRepository.save.mockReturnValue(expect.anything());
      mockProducerService.produce.mockReturnValue(null);

      const result = await service.updateJoinRequest(
        user.id,
        joinRequest.id,
        JoinRequestStatus.ACCEPTED,
      );
      expect(result).toEqual({ message: 'Join request updated successfully' });
    });
  });
});
