import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpMessage, ResponseData } from 'src/global/responseData';
import { CreatePageDto } from './dto/create-page.dto';
import { PageResponse } from './dto/PageResponse.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(
    @Body() createPageDto: CreatePageDto,
  ): Promise<ResponseData<PageResponse>> {
    const response = await this.pageService.create(createPageDto);
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: number) {
    return this.pageService.findOne(id);
  }
  @Get('list')
  async findAll() {
    const response = await this.pageService.findAll();
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updatePageDto: UpdatePageDto) {
    const response = await this.pageService.update(id, updatePageDto);
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    const response = this.pageService.remove(+id);
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }
}
