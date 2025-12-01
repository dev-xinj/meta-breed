import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptText } from 'src/global/encryptAES';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { PageResponse } from './dto/PageResponse.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { ApiFacebook } from './apiFacebook.service';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    private apiFacebook: ApiFacebook,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const accessTokenEncrypt = await encryptText(createPageDto.accessToken);
    createPageDto.accessToken = accessTokenEncrypt;

    return this.pageRepository.save(createPageDto);
  }

  async findAll(): Promise<PageResponse[]> {
    const pages = await this.pageRepository.find();
    return pages.map(
      (page) =>
        new PageResponse({
          id: page.id,
          pageName: page.pageName,
          pageId: page.pageId,
        }),
    );
  }

  async findOne(id: number) {
    console.log('findOne');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.apiFacebook.findAllPosts();
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  async remove(id: number) {
    await this.pageRepository.delete(id);
    return `This action removes a #${id} page`;
  }
}
