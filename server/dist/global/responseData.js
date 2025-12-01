"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMessage = exports.HttpStatus = exports.ResponseData = void 0;
class ResponseData {
    status;
    message;
    data;
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
        return this;
    }
}
exports.ResponseData = ResponseData;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
var HttpMessage;
(function (HttpMessage) {
    HttpMessage["INTERNAL_ERROR"] = "Server Internal Error";
    HttpMessage["OK"] = "OK";
})(HttpMessage || (exports.HttpMessage = HttpMessage = {}));
//# sourceMappingURL=responseData.js.map