import { HttpService } from '@nestjs/axios';
export declare class ApiFacebook {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly accessToken;
    findAllPosts(): Promise<any>;
}
