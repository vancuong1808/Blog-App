import { Length } from 'class-validator';
import { RequestDto } from '../../auth/adapter/dto';
import { UserEntity } from '../types';

export class FollowUserDto extends RequestDto {
    @Length(24)
    id : string
    userId: string
    constructor(requestParams: any, userId: any) {
        super();
        if (requestParams) {
            this.id = requestParams.id;
        }
        this.userId = userId;
    }
}

export class UnfollowUserDto extends RequestDto {
    @Length(24)
    id : string
    userId: string
    constructor(requestParams: any, userId: any) {
        super();
        if (requestParams) {
            this.id = requestParams.id;
        }
        this.userId = userId;
    }
}

export class GetFollowersDto extends RequestDto {
    @Length(24)
    id : string
    constructor(requestParams: any) {
        super();
        if (requestParams) {
            this.id = requestParams.id;
        }
    }
}

export class GetFollowingsDto extends RequestDto {
    @Length(24)
    id : string
    constructor(requestParams: any) {
        super();
        if (requestParams) {
            this.id = requestParams.id;
        }
    }
}