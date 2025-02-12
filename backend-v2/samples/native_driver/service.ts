import { Db, ObjectId } from 'mongodb';
import { User, IUserService, UserCreation } from '../api/types';

export class UserServiceImpl implements IUserService  {
  // dependencies
  db: Db;

  // constructor
  constructor(db: Db) {
    this.db = db;
  }

  async create(dto: UserCreation): Promise<User> {
    throw new Error('Not yet implemented');
  }

  async getOneById(id: string): Promise<User | null> {
    throw new Error('Not yet implemented');
  }

  async getAll(): Promise<User[]> {
    throw new Error('Not yet implemented');
  }

}