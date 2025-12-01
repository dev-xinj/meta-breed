import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpMessage, HttpStatus, ResponseData } from 'src/global/responseData';
import { ApiFacebook } from './apiFacebook.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly apiFacebook: ApiFacebook,
  ) {}

  @Post()
  async create(
    @Body() createPageDto: CreatePageDto,
  ): Promise<ResponseData<string>> {
    try {
      await this.pageService.create(createPageDto);
      return new ResponseData<string>(
        HttpStatus.OK,
        HttpMessage.OK,
        'Success save',
      );
    } catch (error) {
      return new ResponseData<string>(
        HttpStatus.INTERNAL_ERROR,
        HttpMessage.INTERNAL_ERROR,
        null,
      );
    }
  }

  // @Get()
  // async findAll(): Promise<ResponseData<PageResponse | null>> {
  //   try {
  //     const pageResponses = await this.pageService.findAll();
  //     return new ResponseData(HttpStatus.OK, HttpMessage.OK, pageResponses);
  //   } catch (error) {
  //     return new ResponseData(
  //       HttpStatus.INTERNAL_ERROR,
  //       HttpMessage.INTERNAL_ERROR,
  //       null,
  //     );
  //   }
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('get one');
    return this.apiFacebook.findAllPosts();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
