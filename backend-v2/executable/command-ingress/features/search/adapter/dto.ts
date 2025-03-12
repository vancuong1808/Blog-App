import { Length } from 'class-validator';
import { RequestDto } from '../../auth/adapter/dto';
import { PostSearch, TopicSearch, PeopleSearch } from '../types';

export class PostSearchBody extends RequestDto {
    @Length(24)
    id : string
    constructor(requestParams: any) {
        super();
        if (requestParams) {
          this.id = requestParams.query;
        }
    }
}

export class PeopleSearchBody extends RequestDto {
    @Length(24)
    id : string
    constructor(requestParams: any) {
        super();
        if (requestParams) {
          this.id = requestParams.query;
        }
    }
}

export class TopicSearchBody extends RequestDto {
    @Length(24)
    id : string
    constructor(requestParams: any) {
        super();
        if (requestParams) {
          this.id = requestParams.query;
        }
    }
}


