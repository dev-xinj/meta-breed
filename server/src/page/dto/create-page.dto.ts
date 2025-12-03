export class CreatePageDto {
  pageName: string;
  pageUUID: string;
  accessToken: string;
  status: 'IDLE' | 'PROCESSING';
}
