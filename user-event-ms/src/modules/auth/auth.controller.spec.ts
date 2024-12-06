import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../auth/auth.guard';

const mockAuthService = {
  signIn: jest.fn().mockImplementation((email, password) => {
    return 'token';
  }),
};

const mockUserService = {
  findById: jest.fn().mockImplementation((user_id) => {
    return {
      id: user_id,
      full_name: 'Osamah Mohammed',
      email: 'osamah@mail.com',
      created_at: new Date(),
    };
  }),
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in a user', async () => {
    const user = {
      email: 'osamah@mail.com',
      password: 'password',
    };

    expect(await controller.signIn(user)).toEqual('token');
    expect(authService.signIn).toHaveBeenCalledWith(user.email, user.password);
  });

  it('should get user profile', async () => {
    const user = {
      id: 1,
      full_name: 'Osamah Mohammed',
      email: 'osamah@mail.com',
      created_at: new Date(),
    };
  });
});
