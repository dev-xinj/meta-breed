import { Page } from 'src/page/entities/page.entity';
import { Timestamp } from 'typeorm';

export class Post {
  id: number;
  pagePostId: string;
  postName: string;
  from: Page;
  totalComments: number;
  attachments: Attachment[];
  createdTime: Timestamp;
  updatedTime: Timestamp;
}

export class Attachment {
  mediaType: string;
  mediaUrl: string;
}

export class PostRequest {
  pagePostId: string;
  pageId: string;
  message: string;
}
