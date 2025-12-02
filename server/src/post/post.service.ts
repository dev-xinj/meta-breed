import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiFacebookService } from 'src/api/apiFacebook.service';
import { Page } from 'src/page/entities/page.entity';
import { Repository } from 'typeorm';
import { PostRequest } from './dto/post.dto';
const tokenTemp =
  'EAAMZAgRascpkBQMzQ802BoIJ5ZAMIGeIkDyYtIi9nevs0iOZAZCBCR3X6ZB0UagSZBQEI3wSZBhPekKkA6ucGzJMdI0C0rbZANPWxxPbIKrW15r8ydnLJwe1xSAPr9PrVZBsQ8s5SOL0zttQuXDHWUQChECbhMaXOB1uPOZA4D266NCYvOZBm0DOfoNnknOxjzayErPLgRXbU9a8bruMZCH1faDeR8O0lnUVK26rERETnnPFQdULI7yRZBolooJap';

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
    const tokenPage = page.accessToken;
    //handle urlParams
    if (!postRequest.message.length) {
      throw new PreconditionFailedException('Field message not Empty');
    }
    const postPageId = postRequest.pagePostId;
    const urlParams = new URLSearchParams();
    urlParams.append('message', postRequest.message);
    const result = await this.apiFacebook.commentsBatch(
      `${postPageId}/comments`,
      tokenPage,
      urlParams,
    );
    return;
  }

  findAll(pageId: string) {
    return this.apiFacebook.findAllPosts(`${pageId}/posts`, tokenTemp);
  }
}
