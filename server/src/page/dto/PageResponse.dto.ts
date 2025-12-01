export class PageResponse {
  id: string;
  pageName: string;
  pageId: string;
  constructor(partial: Partial<PageResponse>) {
    Object.assign(this, partial);
  }
}
