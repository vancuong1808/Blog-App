import { Length } from 'class-validator';
import { RequestDto } from '../../auth/adapter/dto';
import { PostEntity } from '../types';
export class CreatePostBody extends RequestDto {
  title: string;
  markdown: string;
  image: string;
  tags: string[];

  constructor(body: any) {
    super();
    if (body) {
      this.title = body.title;
      this.markdown = body.markdown;
      this.image = body.image;
      this.tags = body.tags;
    }
  }
}

// Data transfer object
export class GetPostDto extends RequestDto {
  @Length(24)
  id: string;

  constructor(requestParams: any) {
    super();
    if (requestParams) {
      this.id = requestParams.id;
    }
  }
}

export class EditPostDto extends RequestDto {
  @Length(24)
  id: string;
  postEntityDto : Partial<PostEntity>

  constructor(requestParams: any, body : any) {
    super();
    if (requestParams) {
      this.id = requestParams.id;
      this.postEntityDto = body;
    }
  }
}

export class DelPostDto extends RequestDto {
  @Length(24)
  id: string;

  constructor(requestParams: any) {
    super();
    if (requestParams) {
      this.id = requestParams.id;
    }
  }
}