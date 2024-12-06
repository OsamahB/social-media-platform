import { Test, TestingModule } from '@nestjs/testing';
import { EventPostService } from './event-post.service';
import { EventPost } from './event-post.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

const mockEventPostRepository = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('EventPostService', () => {
  let service: EventPostService;
  let eventPostRepository: Repository<EventPost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventPostService,
        {
          provide: getRepositoryToken(EventPost),
          useValue: mockEventPostRepository,
        },
      ],
    }).compile();

    service = module.get<EventPostService>(EventPostService);
    eventPostRepository = module.get<Repository<EventPost>>(
      getRepositoryToken(EventPost),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEventPost', () => {
    it('should create an event post', async () => {
      const createEventPostDto = {
        title: 'Event Title',
        description: 'Event Description',
        category: 'Event Category',
        location: 'Event Location',
        date: new Date(),
        period: 'Event Period',
      };

      const eventPost = new EventPost();
      eventPost.id = 1;
      eventPost.title = createEventPostDto.title;
      eventPost.description = createEventPostDto.description;
      eventPost.category = createEventPostDto.category;
      eventPost.location = createEventPostDto.location;
      eventPost.date = createEventPostDto.date;
      eventPost.period = createEventPostDto.period;

      mockEventPostRepository.create.mockReturnValue({
        ...eventPost,
        ...mockEventPostRepository,
      });
      mockEventPostRepository.save.mockReturnValue(eventPost);

      const result = await service.createEventPost(1, createEventPostDto);
      expect(result).toEqual(eventPost);
    });
  });

  describe('listEventPosts', () => {
    it('should return a list of event posts', async () => {
      const paginationOptions = {
        page: 1,
        limit: 10,
      };
      const filter = {
        user_id: 1,
      };

      const user = new User();
      user.id = 1;
      user.email = 'osamah@mail.com';
      user.full_name = 'Osamah Mohammed';
      user.password = 'password';
      user.created_at = new Date();

      const eventPost1 = new EventPost();
      eventPost1.id = 1;
      eventPost1.title = 'Event Title';
      eventPost1.description = 'Event Description';
      eventPost1.category = 'Event Category';
      eventPost1.location = 'Event Location';
      eventPost1.date = new Date();
      eventPost1.period = 'Event Period';
      eventPost1.user_id = user.id;
      eventPost1.user = user;
      eventPost1.created_at = new Date();

      const eventPost2 = new EventPost();
      eventPost2.id = 2;
      eventPost2.title = 'Event Title 2';
      eventPost2.description = 'Event Description 2';
      eventPost2.category = 'Event Category 2';
      eventPost2.location = 'Event Location 2';
      eventPost2.date = new Date();
      eventPost2.period = 'Event Period 2';
      eventPost2.user_id = user.id;
      eventPost2.user = user;
      eventPost2.created_at = new Date();

      mockEventPostRepository.findAndCount.mockReturnValue([
        [eventPost1, eventPost2],
        2,
      ]);

      const result = await service.listEventPosts(paginationOptions, filter);
      expect(result).toEqual({
        items: [
          {
            id: eventPost1.id,
            title: eventPost1.title,
            description: eventPost1.description,
            category: eventPost1.category,
            location: eventPost1.location,
            date: expect.any(Date),
            period: eventPost1.period,
            user_id: eventPost1.user_id,
            user_email: eventPost1.user.email,
            user_full_name: eventPost1.user.full_name,
            created_at: expect.any(Date),
          },
          {
            id: eventPost2.id,
            title: eventPost2.title,
            description: eventPost2.description,
            category: eventPost2.category,
            location: eventPost2.location,
            date: expect.any(Date),
            period: eventPost2.period,
            user_id: eventPost2.user_id,
            user_email: eventPost2.user.email,
            user_full_name: eventPost2.user.full_name,
            created_at: expect.any(Date),
          },
        ],
        meta: {
          totalItems: 2,
          itemCount: 2,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      });
    });
  });
});
