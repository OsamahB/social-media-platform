import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import MESSAGES from '../../common/messages';
import { UserUpdateRequestDto } from './dto/user-update.dto';
import { filterBlankValues } from '../../common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    if (userRegister.password !== userRegister.password_confirm) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }

    if (await this.findOne(userRegister.email)) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const newUser = this.userRepository.create({
      full_name: userRegister.full_name,
      email: userRegister.email,
      password: await hash(
        userRegister.password,
        process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
      ),
    });
    // return await newUser.save();
    return await this.userRepository.save(newUser);
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateProfile(
    id: number,
    userUpdate: UserUpdateRequestDto,
  ): Promise<User> {
    if (userUpdate.email && (await this.findOne(userUpdate.email))) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const updatedData = filterBlankValues(userUpdate);
    if (Object.keys(updatedData).length === 0) {
      throw new BadRequestException(MESSAGES.NO_DATA_PROVIDED);
    }

    await this.userRepository.update(id, updatedData);
    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }
    return updatedUser;
  }
}
