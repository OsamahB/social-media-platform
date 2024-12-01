import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.dto.js';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import MESSAGES from '../../common/messages.js';
import { UserUpdateRequestDto } from './dto/user-update.dto.js';
import { filterBlankValues } from '../../common/utils.js';

@Injectable()
export class UserService {
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    if (userRegister.password !== userRegister.password_confirm) {
      throw new BadRequestException(MESSAGES.PASSWORD_MISMATCH);
    }

    if (await User.findOne({ where: { email: userRegister.email } })) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const user = new User();
    user.full_name = userRegister.full_name;
    user.email = userRegister.email;
    user.password = await hash(
      userRegister.password,
      process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
    );
    return await user.save();
  }

  async findOne(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await User.findOne({ where: { id } });
  }

  async updateProfile(
    id: number,
    userUpdate: UserUpdateRequestDto,
  ): Promise<User> {
    if (
      userUpdate.email &&
      (await User.findOne({ where: { email: userUpdate.email } }))
    ) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const updatedData = filterBlankValues(userUpdate);
    if (Object.keys(updatedData).length === 0) {
      throw new BadRequestException(MESSAGES.NO_DATA_PROVIDED);
    }

    await User.update(id, updatedData);
    const updatedUser = await User.findOne({ where: { id } });
    if (!updatedUser) {
      throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
    }
    return updatedUser;
  }
}
