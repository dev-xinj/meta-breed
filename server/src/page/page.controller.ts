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
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(
    @Body() createPageDto: CreatePageDto,
  ): Promise<ResponseData<CreatePageDto>> {
    const response = await this.pageService.create(createPageDto);
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
  }
  @Get('list')
  async findAll() {
    const response = await this.pageService.findAll();
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, response);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(id, updatePageDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
