import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('doUserRegistration', () => {
    it('should create a user', async () => {
      const createUserDto = {
        email: 'osamah@mail.com',
        full_name: 'Osamah Mohammed',
        password: 'password',
        password_confirm: 'password',
      };

      const user = new User();
      user.id = 1;
      user.email = createUserDto.email;
      user.full_name = createUserDto.full_name;
      user.password = createUserDto.password;
      user.created_at = new Date();

      mockUserRepository.save.mockReturnValue(user);

      const result = await service.doUserRegistration(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      user.id = 1;
      user.email = 'osamah@mail.com';
      user.full_name = 'Osamah Mohammed';
      user.password = 'password';
      user.created_at = new Date();

      mockUserRepository.findOne.mockReturnValue(user);

      const result = await service.findOne('osamah@mail.com');
      expect(result).toEqual(user);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      const user = new User();
      user.id = 1;
      user.email = 'osamah@mail.com';
      user.full_name = 'Osamah Mohammed';
      user.password = 'password';
      user.created_at = new Date();

      mockUserRepository.findOne.mockReturnValue(user);

      const result = await service.findById(1);
      expect(result).toEqual(user);
    });
  });

  describe('updateProfile', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        email: 'osamah@mail.com',
      };

      const user = new User();
      user.id = 1;
      user.email = 'toupdate@mail.com';
      user.full_name = 'Osamah Mohammed';
      user.password = 'password';
      user.created_at = new Date();

      service.findOne = jest.fn().mockReturnValue(null);
      service.findById = jest
        .fn()
        .mockReturnValue({ ...user, email: updateUserDto.email });
      mockUserRepository.update.mockReturnValue(expect.anything());

      const result = await service.updateProfile(1, updateUserDto);
      expect(result).toEqual({ ...user, email: updateUserDto.email });
    });
  });
});
