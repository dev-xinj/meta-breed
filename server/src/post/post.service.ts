/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiFacebookService } from 'src/api/apiFacebook.service';
import { Page } from 'src/page/entities/page.entity';
import { Repository, Timestamp } from 'typeorm';
import { PagePost, PostRequest } from './dto/post.dto';
import { decryptText } from 'src/global/encryptAES';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    private readonly apiFacebook: ApiFacebookService,
  ) {}

  async commentsBatch(pageId: string, postRequest: PostRequest) {
    //get page accesstoken,
    const page = await this.pageRepository.findOne({
      where: { pageId: pageId },
    });
    if (!page) {
      throw new NotFoundException('Not Found page ');
    }
    // const tokenPage = page.accessToken;
    const tokenPage = (await decryptText(page.accessToken)).toString('utf-8');
    //handle urlParams
    if (!postRequest.message.length) {
      throw new PreconditionFailedException('Field message not Empty');
    }
    const postPageId = postRequest.pagePostId;
    const urlParams = new URLSearchParams();
    urlParams.append('message', postRequest.message);
    const result = (await this.apiFacebook.commentsBatch(
      `${postPageId}/comments`,
      tokenPage,
      urlParams,
    )) as string;
    return result;
  }

  async findAll(pageId: string) {
    //get page accesstoken,
    const page = await this.pageRepository.findOne({
      where: { pageId: pageId },
    });
    if (!page) {
      throw new NotFoundException('Not Found page ');
    }
    const fields =
      'id,message,story,created_time,updated_time,from,to,privacy,place,message_tags,story_tags,status_type,icon,shares,attachments{media_type,media,subattachments,type,url},comments.limit(10){id,from,message,created_time,like_count},reactions.summary(true)';
    const tokenPage = (await decryptText(page.accessToken)).toString('utf-8');
    const response = await this.apiFacebook.findAllPosts(
      `${pageId}/posts`,
      tokenPage,
      fields,
    );
    return response;
  }
}
export interface FbPost {
  id: string;
  message?: string;
  created_time?: Timestamp | undefined;
  updated_time?: Timestamp | undefined;
  comments?: {
    data?: { id: string; message: string; created_time: string }[];
  };
}
export function convertFbPost(fb: FbPost): PagePost {
  return new PagePost({
    pagePostId: fb.id,
    postName: fb.message ?? '',
    createdTime: fb.created_time ?? undefined,
    updatedTime: fb.updated_time ?? undefined,
    totalComments: fb.comments?.data?.length ?? 0,
  });
}
