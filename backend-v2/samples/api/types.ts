type User = {
  id: string;
  email: string;
  name: string;
}

type UserCreation = {
  email: string;
  name: string;
};

interface IUserService {
  create(dto: UserCreation): Promise<User>;
  getAll(): Promise<User[]>;
  getOneById(id: string): Promise<User | null>;
}

export {
  IUserService,
  UserCreation,
  User,
}