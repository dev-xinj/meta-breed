import { Page } from 'src/page/entities/page.entity';
import { Timestamp } from 'typeorm';

export class PagePost {
  id: number;
  pagePostId: string;
  postName: string;
  from: Page;
  totalComments: number;
  attachments: Attachment[];
  createdTime: Timestamp;
  updatedTime: Timestamp;
  constructor(init?: Partial<PagePost>) {
    Object.assign(this, init);
  }
}

export class Attachment {
  mediaType: string;
  mediaUrl: string;
  constructor(init?: Partial<Attachment>) {
    Object.assign(this, init);
  }
}

export class PostRequest {
  pagePostId: string;
  pageId: string;
  message: string;
}
