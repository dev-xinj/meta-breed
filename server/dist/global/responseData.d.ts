export declare class ResponseData<T> {
    status: number;
    message: string;
    data: T | T[] | null;
    constructor(status: number, message: string, data: T | T[] | null);
}
export declare enum HttpStatus {
    INTERNAL_ERROR = 500,
    OK = 200
}
export declare enum HttpMessage {
    INTERNAL_ERROR = "Server Internal Error",
    OK = "OK"
}
