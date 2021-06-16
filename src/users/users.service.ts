import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    const getByUserName = getRepository(User)
      .createQueryBuilder('user')
      .where('user.username=:username', { username });
    const byUserName = await getByUserName.getOne();
    if (byUserName) {
      const error = { username: 'UserName is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    const getByUserEmail = getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });
    const byUserEmaeil = await getByUserEmail.getOne();
    if (byUserEmaeil) {
      const error = { email: 'email is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;
    const validate_error = await validate(newUser);
    if (validate_error.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed' },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await getRepository(User)
        .save(newUser)
        .then((v) => v.username);
    }
  }

  async findAll() {
    const getAllUser = await getRepository(User)
      .find()
      .then((v) => v);
    return getAllUser;
  }

  async findOne(id: number) {
    return await getRepository(User)
      .findOne({ id })
      .then((v) => v);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.findOne(id);
    Object.keys(updateUserDto).forEach((key) => {
      updatedUser[key] = updateUserDto[key];
    });
    return await getRepository(User)
      .save(updatedUser)
      .then((v) => v);
  }

  async remove(id: number) {
    return await getRepository(User)
      .delete(await this.findOne(id))
      .then((v) => v);
  }
}
