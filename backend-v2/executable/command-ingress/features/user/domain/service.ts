import { UserEntity, UserService } from '../types';
import UserModel from '../../../../../internal/model/user';

export class UserServiceImpl implements UserService {
  async followUser(id: string, userId: string): Promise<UserEntity> {
    const follower = await UserModel
                            .findOne({ _id : id })
                            .populate('followers');
    if (!follower) {
      throw new Error(`follower not found`);
    }
    const user = await UserModel
                        .findOne({ _id : userId })
                        .populate('followings');
    if (!user) {
      throw new Error('User not found');
    }
    await UserModel
          .findByIdAndUpdate(
            follower._id,
            { $addToSet: { followers: user._id } },
            { new: true });
    await UserModel
          .findByIdAndUpdate(
            user._id,
            { $addToSet: { followings: follower._id } },
            { new: true });
    return {
      id : String(follower._id),
      email : follower.email,
      name :  follower.name,
      avatar : follower.avatar
    }
  }
  async unfollowUser(id: string, userId: string): Promise<UserEntity> {
    const unfollower = await UserModel
                            .findOne({ _id : id })
                            .populate('followers');
    if (!unfollower) {
      throw new Error(`follower not found`);
    }
    const user = await UserModel
                        .findOne({ _id : userId })
                        .populate('followings');
    if (!user) {
      throw new Error('User not found');
    }
    await UserModel
          .findByIdAndUpdate(
            unfollower._id,
            { $pull: { followers: user._id } },
            { new: true });
    await UserModel
          .findByIdAndUpdate(
            user._id,
            { $pull: { followings: unfollower._id } },
            { new: true });
    return {
      id : String(unfollower._id),
      email : unfollower.email,
      name :  unfollower.name,
      avatar : unfollower.avatar
    }
  }
  async getFollower(id: string): Promise<UserEntity[]> {
    const follower = await UserModel
                            .findOne({_id : id})
                            .populate('followers');
    if (!follower) {
      throw new Error('follower not found');
    }
    const followerList = await Promise.all(
      follower.followers.map( async(_follower) => {
        const user = await UserModel.findOne({ _id : _follower._id });
        if (!user) {
          throw new Error('follower not found');
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      })
    );
    return followerList;
  }
  async getFollowing(id: string): Promise<UserEntity[]> {
    const following = await UserModel
                              .findOne({_id: id})
                              .populate('followings');
    if (!following) {
      throw new Error('following not found');
    }
    const followingList = await Promise.all( 
        following.followings.map( async(_following) => {
          const user = await UserModel.findOne({ _id : _following._id });
          if (!user) {
            throw new Error('following not found');
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          }
        })
      );
    return followingList;
  }
  async getOne(id: string): Promise<UserEntity> {
    const user = await UserModel.findById(id);

    return {
      id: String(user._id),
      name: String(user.name),
      avatar: String(user.avatar),
      email: String(user.email),
    };
  }

}