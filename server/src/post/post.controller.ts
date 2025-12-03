/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpMessage, ResponseData } from 'src/global/responseData';
import { PostRequest } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list/:pageUUID')
  async findAll(@Param('pageUUID') pageUUID: string) {
    const response = await this.postService.findAll(pageUUID);
    return new ResponseData(200, HttpMessage.OK, response);
  }
  @Post('comments/:pageUUID')
  commentsBatch(
    @Param('pageUUID') pageUUID: string,
    @Body() payload: PostRequest,
  ) {
    return this.postService.commentsBatch(pageUUID, payload);
  }
}
