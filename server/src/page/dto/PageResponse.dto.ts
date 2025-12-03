export class PageResponse {
  id: string;
  pageName: string;
  pageUUID: string;
  constructor(partial: Partial<PageResponse>) {
    Object.assign(this, partial);
  }
}
