import { PageStatus } from '../entities/page.enum';

export class CreatePageDto {
  pageName: string;
  pageUUID: string;
  accessToken: string;
  status: PageStatus;
}
