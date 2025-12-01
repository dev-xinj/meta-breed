import { BaseEntity } from 'typeorm';
export declare class Page extends BaseEntity {
    id: string;
    pageName: string;
    pageId: string;
    accessToken: string;
    status: 'idle' | 'processing';
}
