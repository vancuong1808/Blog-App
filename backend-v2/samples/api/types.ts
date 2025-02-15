type User = {
  id: string;
  email: string;
  name: string;
}

type UserCreationDto = {
  email: string;
  name: string;
  password: string;
};

interface IUserRepository {
  create(dto: UserCreationDto): Promise<User>;
  getAll(): Promise<User[]>;
  getOneById(id: string): Promise<User | null>;
}

export {
  IUserRepository,
  UserCreationDto,
  User,
}