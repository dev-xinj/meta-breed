import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptText } from 'src/global/encryptAES';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { PageResponse } from './dto/PageResponse.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { ApiFacebookService } from '../api/apiFacebook.service';
import { PageStatus } from './entities/page.enum';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    private readonly apiFacebook: ApiFacebookService,
  ) {}

  async create(createPageDto: CreatePageDto) {
    if (createPageDto && createPageDto.pageUUID) {
      const page = await this.pageRepository.findOne({
        where: { pageUUID: createPageDto.pageUUID },
      });

      if (page?.hasId) {
        throw new ConflictException(
          `Page Id ${createPageDto.pageUUID} đã tồn tại trong hệ thống`,
        );
      }
    }
    const accessTokenEncrypt = await encryptText(createPageDto.accessToken);
    createPageDto.accessToken = accessTokenEncrypt;
    console.log(createPageDto);
    createPageDto.status = PageStatus.PROCESSING;
    const result = await this.pageRepository.save(createPageDto);
    return new PageResponse({
      id: result.id,
      pageName: result.pageName,
      pageUUID: result.pageUUID,
    });
  }

  async findAll(): Promise<PageResponse[]> {
    const pages = await this.pageRepository.find();
    return pages.map(
      (page) =>
        new PageResponse({
          id: page.id,
          pageName: page.pageName,
          pageUUID: page.pageUUID,
        }),
    );
  }

  async findOne(id: number) {
    return await this.pageRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    // const updatePage = await this.pageRepository.preload({
    //   id,
    //   ...updatePageDto,
    // });
    // console.log(updatePage);
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException(`Không tìm thấy id ${id}`);
    }
    const updated = this.pageRepository.merge(page, updatePageDto);
    return this.pageRepository.save(updated);
  }

  async remove(id: number) {
    const result = await this.pageRepository.delete(id);
    return result;
  }
}
