import { Test, TestingModule } from '@nestjs/testing';
import { EventPostController } from './event-post.controller';
import { AuthGuard } from '../auth/auth.guard';
import { EventPostService } from './event-post.service';

const mockEventPostService = {
  createEventPost: jest.fn().mockImplementation((user_id, eventPost) => {
    return { message: 'Event post created successfully' };
  }),
  listEventPosts: jest.fn().mockImplementation((filter) => {
    return {
      items: [
        {
          id: 1,
          title: 'Test Event Post',
          description: 'Test Event Post Description',
          category: 'Test Category',
          location: 'Test Location',
          date: new Date(),
          period: 'Test Period',
          user_id: 2,
          user_email: 'osamah@mail.com',
          user_full_name: 'Osamah',
          created_at: new Date(),
        },
        {
          id: 2,
          title: 'Test Event Post 2',
          description: 'Test Event Post Description 2',
          category: 'Test Category 2',
          location: 'Test Location 2',
          date: new Date(),
          period: 'Test Period 2',
          user_id: 2,
          user_email: 'osamah@mail.com',
          user_full_name: 'Osamah',
          created_at: new Date(),
        },
      ],
      meta: {
        itemCount: 2,
        totalItems: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }),
};

describe('EventPostController', () => {
  let controller: EventPostController;
  let service: EventPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventPostController],
      providers: [
        {
          provide: EventPostService,
          useValue: mockEventPostService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<EventPostController>(EventPostController);
    service = module.get<EventPostService>(EventPostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event post', async () => {
    const user_id = 1;
    const eventPost = {
      title: 'Test Event Post',
      description: 'Test Event Post Description',
      category: 'Test Category',
      location: 'Test Location',
      date: new Date(),
      period: 'Test Period',
    };

    expect(await controller.createEventPost(eventPost, { user_id })).toEqual({
      message: 'Event post created successfully',
    });
  });

  it('should list event posts', async () => {
    const filter = {
      user_id: 2,
    };
    const pagination = {
      page: 1,
      limit: 10,
    };

    expect(await controller.listEventPosts(filter, pagination)).toEqual({
      items: [
        {
          id: 1,
          title: 'Test Event Post',
          description: 'Test Event Post Description',
          category: 'Test Category',
          location: 'Test Location',
          date: new Date(),
          period: 'Test Period',
          user_id: 2,
          user_email: 'osamah@mail.com',
          user_full_name: 'Osamah',
          created_at: new Date(),
        },
        {
          id: 2,
          title: 'Test Event Post 2',
          description: 'Test Event Post Description 2',
          category: 'Test Category 2',
          location: 'Test Location 2',
          date: new Date(),
          period: 'Test Period 2',
          user_id: 2,
          user_email: 'osamah@mail.com',
          user_full_name: 'Osamah',
          created_at: new Date(),
        },
      ],
      meta: {
        itemCount: 2,
        totalItems: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });
  });
});
