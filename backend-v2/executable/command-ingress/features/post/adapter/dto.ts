import { RequestDto } from '../../auth/adapter/dto';

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