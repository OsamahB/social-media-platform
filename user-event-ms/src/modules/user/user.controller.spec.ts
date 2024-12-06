import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

const mockUserService = {
  doUserRegistration: jest.fn().mockImplementation((user) => {
    return {
      id: 1,
      full_name: user.full_name,
      email: user.email,
      created_at: new Date(),
    };
  }),
  updateProfile: jest.fn().mockImplementation((user_id, user) => {
    return {
      id: user_id,
      full_name: user.full_name || 'Osamah Mohammed',
      email: user.email || 'osamah@mail.com',
      created_at: new Date(),
    };
  }),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      full_name: 'Osamah Mohammed',
      email: 'osamah@mail.com',
      password: 'password',
      password_confirm: 'password',
    };

    expect(await controller.doUserRegistration(user)).toEqual({
      id: expect.any(Number),
      full_name: user.full_name,
      email: user.email,
      created_at: expect.any(Date),
    });
  });

  it('should update user profile', async () => {
    const user_id = 1;
    const user_to_update = {
      full_name: 'Osamah Mohammed',
    };

    expect(await controller.updateProfile({ user_id }, user_to_update)).toEqual(
      {
        id: user_id,
        full_name: user_to_update.full_name,
        email: expect.any(String),
        created_at: expect.any(Date),
      },
    );
  });
});
