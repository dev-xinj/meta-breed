export class ResponseData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | T[] | null;

  constructor(statusCode: number, message: string, data: T | null = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export enum HttpStatus {
  INTERNAL_ERROR = 500,
  OK = 200,
}
export const HttpMessage = {
  OK: 'OK',
  CREATED: 'Created successfully',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  INTERNAL_ERROR: 'Internal server error',
} as const;
