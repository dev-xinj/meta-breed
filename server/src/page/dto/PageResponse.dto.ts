export class PageResponse {
  id: number;
  pageName: string;
  pageUUID: string;
  constructor(partial: Partial<PageResponse>) {
    Object.assign(this, partial);
  }
}
