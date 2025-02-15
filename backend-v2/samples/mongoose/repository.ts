import { User, IUserRepository, UserCreationDto } from '../api/types';
import UserModel from './model';

export class UserRepository implements IUserRepository  {
  async create(dto: UserCreationDto): Promise<User> {
    const {
      name,
      email,
      password,
    } = dto;

    const result = await UserModel.create({
      name,
      email,
      password,
    });

    return {
      name,
      email,
      id: String(result._id),
    };
  }

  async getOneById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({
      _id: id,
    });

    if (!user) {
      throw new Error('not found');
    }

    return Promise.resolve({
      id: String(user?._id),
      name: String(user?.name),
      email: String(user?.email),
    });
  }

  async getAll(): Promise<User[]> {
    throw new Error('Not yet implemented');
  }

}