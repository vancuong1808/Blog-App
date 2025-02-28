import { getAllFollowings } from './service';
type UserEntity = {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

interface UserService {
  getOne(id: string): Promise<UserEntity>;
  followUser(id: string, userId: string): Promise<UserEntity>;
  unfollowUser(id: string, userId: string): Promise<UserEntity>;
  getFollower(id: string): Promise<UserEntity[]>;
  getFollowing(id: string): Promise<UserEntity[]>;
}

export {
  UserEntity,
  UserService,
};
