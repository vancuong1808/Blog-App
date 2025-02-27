import { NextFunction, Response } from 'express';
import { BaseController } from '../../../shared/base-controller';
import { PostService } from '../types';
import { CreatePostBody, GetPostDto, EditPostDto, DelPostDto } from './dto';
import responseValidationError from '../../../shared/response';
import { HttpRequest } from '../../../types';

export class PostController extends BaseController {
  service: PostService;

  constructor(service: PostService) {
    super();
    this.service = service;
  }

  async getPost(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const getPostDto = new GetPostDto(req.params);
      const validateResult = await getPostDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }

      const post = await this.service.getPost(getPostDto.id);
      res.status(200).json({ post });
      return;
    });
  }

  async editPost(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async(req, res, _next) => {
      const editPostDto = new EditPostDto(req.params, req.body);
      const validateResult = await editPostDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const editPost = await this.service.editPost(editPostDto.id, editPostDto.postEntityDto);
      res.status(200).json({ editPost });
      return;
    });
  }

  async delPost(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async(req, res, _next) => {
      const delPostDto = new DelPostDto(req.params);
      const validateResult = await delPostDto.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }
      const delPost = await this.service.delPost(delPostDto.id);
      res.status(200).json({ delPost });
    })
  }

  async createPost(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const body = new CreatePostBody(req.body);
      const sub = req.getSubject();
      const validateResult = await body.validate();
      if (!validateResult.ok) {
        responseValidationError(res, validateResult.errors[0]);
        return;
      }

      const post = await this.service.createPost({
        authorID: sub,
        title: body.title,
        markdown: body.markdown,
        image: body.image,
        tags: body.tags,
      });

      res.status(201).json(post);

      return;
    });
  }

  async fetchPostByUser(req: HttpRequest, res: Response, next: NextFunction): Promise<void> {
    await this.execWithTryCatchBlock(req, res, next, async (req, res, _next) => {
      const id = req.params.id;
      const posts = await this.service.fetchPostsByUser(id);

      res.status(200).json(posts);
    });
  }
}