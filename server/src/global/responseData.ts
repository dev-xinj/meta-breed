export class ResponseData<T> {
  status: number;
  message: string;
  data: T | T[] | null;

  constructor(status: number, message: string, data: T | T[] | null) {
    this.status = status;
    this.message = message;
    this.data = data;
    return this;
  }
}

export enum HttpStatus {
  INTERNAL_ERROR = 500,
  OK = 200,
}
export enum HttpMessage {
  INTERNAL_ERROR = 'Server Internal Error',
  OK = 'OK',
}
