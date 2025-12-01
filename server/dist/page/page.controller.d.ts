import { ResponseData } from 'src/global/responseData';
import { ApiFacebook } from './apiFacebook.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';
export declare class PageController {
    private readonly pageService;
    private readonly apiFacebook;
    constructor(pageService: PageService, apiFacebook: ApiFacebook);
    create(createPageDto: CreatePageDto): Promise<ResponseData<string>>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePageDto: UpdatePageDto): string;
    remove(id: string): Promise<string>;
}
