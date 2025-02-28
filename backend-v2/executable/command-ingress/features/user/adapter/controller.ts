import { FollowUserDto, GetFollowersDto, UnfollowUserDto, GetFollowingsDto } from './dto';
import { BaseController } from '../../../shared/base-controller';
import { HttpRequest } from '../../../types';
import { UserService } from '../types';
import { Response, NextFunction } from 'express';
import responseValidationError from '../../../shared/response';

export class UserController extends BaseController {
  service: UserService;

  constructor(service: UserService) {
    super();
    this.service = service;
  }

  async followUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const followUserDto = new FollowUserDto(req.params, req.getSubject());
      const validateResult = await followUserDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const followUser = await this.service.followUser(followUserDto.id, followUserDto.userId);
      res.status(200).json(followUser);
      return;
    });
  }

  async unfollowUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const unfollowUserDto = new UnfollowUserDto(req.params, req.getSubject());
      const validateResult = await unfollowUserDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const unfollowUser = await this.service.unfollowUser(unfollowUserDto.id, unfollowUserDto.userId);
      res.status(200).json(unfollowUser);
      return;
    });
  }

  async getFollowers(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async(req, res, next) => {
      const getFollowersDto = new GetFollowersDto(req.params);
      const validateResult = await getFollowersDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const getFollowers = await this.service.getFollower(getFollowersDto.id);
      res.status(200).json(getFollowers);
      return;
    })
  }

  async getFollowings(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async(req, res, next) => {
      const getFollowingsDto = new GetFollowingsDto(req.params);
      const validateResult = await getFollowingsDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const getFollowings = await this.service.getFollowing(getFollowingsDto.id);
      res.status(200).json(getFollowings);
      return;
    })
  }

  async getOne(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const { id } = req.params;
      const user = await this.service.getOne(id);
      res.status(200).json(user);
      return;
    });
  }
}