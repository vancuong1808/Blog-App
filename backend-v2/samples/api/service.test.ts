import { describe, jest, beforeEach, it, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';

import { UserService } from './service';
import { IUserRepository, User, UserCreationDto } from './types';
import { ObjectId } from 'mongodb';
import { DomainError } from './error/domain_error';

describe('User Service Test', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(function() {
    mockUserRepository = {
      create: jest.fn(async (dto: UserCreationDto): Promise<User> => {
        return {
          id: String(new ObjectId()),
          name: dto.name,
          email: dto.email,
        };
      }),

      getAll: jest.fn(async (): Promise<User[]> => {
        // Add mock logic
        return [];
      }),

      getOneById: jest.fn(async (_id: string): Promise<User | null> => {
        // Add mock logic
        return null;
      }),
    }

    userService = new UserService(mockUserRepository);
  });

  describe('createUser', () => {
    it('Should create user when input is valid', async () => {
      const userCreationDto: UserCreationDto = {
        name: 'More than five: ' +  faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const user = await userService.createUser(userCreationDto);

      // Expect repository is called in right way
      expect(mockUserRepository.create).toHaveBeenCalledWith(userCreationDto);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

      // Expect result
      expect(user).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.email).toEqual(userCreationDto.email);
      expect(user.name).toEqual(userCreationDto.name);
    });

    it('Should return error if the input is violate the business rules', async () => {
      const userCreationDto: UserCreationDto = {
        name: 'KDot',
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      // Expect error
      await expect(async() => userService.createUser(userCreationDto))
        .rejects
        .toThrowError(new DomainError('Name must be longer than 5 characters'));

      // Expect repository is called in right way
      expect(mockUserRepository.create).toHaveBeenCalledTimes(0);
    });

    it('Should return error if the repository does this', async () => {
      const userCreationDto: UserCreationDto = {
        name: 'Kendrick Lamar',
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      // Remock the function create in repository
      mockUserRepository.create = jest.fn(async (_: UserCreationDto): Promise<User> => {
        throw new Error('Error when insert record to database');
      });

      await expect(async() => await userService.createUser(userCreationDto))
      .rejects
      .toThrowError(new DomainError('Error when insert user'));

      // Expect repository is called in right way
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOne', () => {
    // TODO: finish this
  });

  describe('getAll', () => {
    // TODO: finish this
  });

  describe('delete', () => {
    // TODO: finish this
  });

});