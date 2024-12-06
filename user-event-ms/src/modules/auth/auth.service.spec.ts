import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const mockUserService = {
  findOne: jest.fn().mockImplementation((email) => {
    return {
      id: 1,
      full_name: 'Osamah Mohammed',
      email: email,
      password: 'password',
      created_at: new Date(),
    };
  }),
};

const mockJwtService = {
  signAsync: jest.fn().mockImplementation(() => {
    return 'token';
  }),
};

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access_token', async () => {
      const email = 'osamah@mail.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        id: 1,
        full_name: 'Osamah Mohammed',
        email: email,
        password: hashedPassword,
        created_at: new Date(),
      };

      mockUserService.findOne.mockReturnValue(user);
      mockJwtService.signAsync.mockReturnValue('token');

      const result = await service.signIn(email, password);
      expect(result).toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
