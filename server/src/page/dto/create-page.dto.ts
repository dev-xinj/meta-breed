export class CreatePageDto {
  pageName: string;
  pageId: string;
  accessToken: string;
  status: 'idle' | 'processing';
}
