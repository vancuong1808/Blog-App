import { User, IUserService, UserCreation } from '../api/types';
import UserModel from './model';

export class UserServiceImpl implements IUserService  {
  async create(dto: UserCreation): Promise<User> {
    const {
      name,
      email,
    } = dto;

    const result = await UserModel.create({
      name,
      email,
    });

    return {
      name,
      email,
      id: String(result._id),
    }
  }

  async getOneById(id: string): Promise<User | null> {
    throw new Error('Not yet implemented');
  }

  async getAll(): Promise<User[]> {
    throw new Error('Not yet implemented');
  }

}