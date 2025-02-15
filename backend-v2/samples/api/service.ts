import { IUserRepository, User, UserCreationDto } from './types';
import { DomainError } from './error/domain_error';

export class UserService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async createUser(user: UserCreationDto): Promise<User> {
    if (!user) {
      throw new Error('User could not be null');
    }

    const {
      name,
    } = user;

    // The validation logic is more specific
    // For example:
    // - The bussiness rule requires name must be at least 5 characters.
    // - The presentation layer (.e.g router code) just validate if name is not empty.
    if (name.length < 5) {
      throw new DomainError('Name must be longer than 5 characters');
    };

    try {
      return await this.userRepository.create(user);
    } catch (_error) {
      console.log('Error: ', _error);
      throw new DomainError('Error when insert user');
    }
  }

  getOne(userID: string): Promise<User | null> {
    return this.userRepository.getOneById(userID);
  }
}