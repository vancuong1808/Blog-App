import { Db } from 'mongodb';
import { IUserService, User, UserCreation } from '../api/types';

export class UserServiceImpl implements IUserService {
  // Setter
  db: Db;

  setDb(db: Db) {
    this.db = db;
  }

  constructor(db: Db) {
    this.db = db;
  }

  async create(dto: UserCreation): Promise<User> {
    const {
      email,
      name,
    } = dto;

    const insertOneResult = await this.db.collection('users')
      .insertOne({
        email,
        name,
      });

    const insertedID = insertOneResult.insertedId;

    return {
      id: String(insertedID),
      name,
      email,
    };
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getOneById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

}