import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostRequest } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list/:pageId')
  findAll(@Param('pageId') pageId: string) {
    console.log('pageId =', pageId);
    return this.postService.findAll(pageId);
  }
  @Post('comments/:pageId')
  commentsBatch(
    @Param('pageId') pagePostId: string,
    @Body() payload: PostRequest,
  ) {
    return this.postService.commentsBatch(pagePostId, payload);
  }
}
