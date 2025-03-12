import { BaseController } from '../../../shared/base-controller';
import { HttpRequest } from '../../../types';
import responseValidationError from '../../../shared/response';
import { NextFunction, Response } from 'express';
import { PostSearchBody, PeopleSearchBody, TopicSearchBody } from './dto';
import { SearchService } from '../types';

export class SearchController extends BaseController {
    service : SearchService

    constructor(service: SearchService) {
        super();
        this.service = service;
    }

    async postSearch(req : HttpRequest, res : Response, next : NextFunction ) : Promise<void> {
        await this.execWithTryCatchBlock(req, res, next, async(req, res, next) => {
            const postSearchDto = new PostSearchBody(req.params);
             const validateResult = await postSearchDto.validate()
             if (!validateResult.ok) {
                responseValidationError(res, validateResult.errors[0]);
                return;
            }
            const post = await this.service.postSearch(postSearchDto.id);
            res.status(200).json({ post });
            return;
        })
    }

    async topicSearch(req : HttpRequest, res : Response, next : NextFunction ) : Promise<void> {
        await this.execWithTryCatchBlock(req, res, next, async(req, res, next) => {
            const topicSearchDto = new TopicSearchBody(req.params);
            const validateResult = await topicSearchDto.validate()
            if (!validateResult.ok) {
               responseValidationError(res, validateResult.errors[0]);
               return;
            }
            const topic = await this.service.topicSearch(topicSearchDto.id);
            res.status(200).json({ topic });
            return;
        })
    }

    async peopleSearch(req : HttpRequest, res : Response, next : NextFunction ) : Promise<void> {
        await this.execWithTryCatchBlock(req, res, next, async(req, res, next) => {
            const peopleSearchDto = new PeopleSearchBody(req.params);
            const validateResult = await peopleSearchDto.validate()
            if (!validateResult.ok) {
               responseValidationError(res, validateResult.errors[0]);
               return;
            }
            const people = await this.service.topicSearch(peopleSearchDto.id);
            res.status(200).json({ people });
            return;
        })
    }
}
