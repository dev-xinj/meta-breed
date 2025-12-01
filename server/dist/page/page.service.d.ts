import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { PageResponse } from './dto/PageResponse.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { ApiFacebook } from './apiFacebook.service';
export declare class PageService {
    private pageRepository;
    private apiFacebook;
    constructor(pageRepository: Repository<Page>, apiFacebook: ApiFacebook);
    create(createPageDto: CreatePageDto): Promise<CreatePageDto & Page>;
    findAll(): Promise<PageResponse[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updatePageDto: UpdatePageDto): string;
    remove(id: number): Promise<string>;
}
