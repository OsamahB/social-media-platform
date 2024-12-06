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
    // Check if the password and password_confirm match
    if (userRegister.password !== userRegister.password_confirm) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }

    // Check if the user already exists
    if (await this.findOne(userRegister.email)) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Create the user
    const newUser = this.userRepository.create({
      full_name: userRegister.full_name,
      email: userRegister.email,
      // Hash the password before saving it to the database
      password: await hash(
        userRegister.password,
        process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
      ),
    });
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
    // if the user is trying to update the email, check if it already exists
    if (userUpdate.email && (await this.findOne(userUpdate.email))) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Filter out the blank values from the userUpdate object
    const updatedData = filterBlankValues(userUpdate);
    if (Object.keys(updatedData).length === 0) {
      throw new BadRequestException(MESSAGES.NO_DATA_PROVIDED);
    }

    await this.userRepository.update(id, updatedData);
    const updatedUser = await this.findById(id);
    // Check if the user was updated, if not throw an error
    if (!updatedUser) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }
    return updatedUser;
  }
}
