/**
 * @description                 ApiResponse class
 * @param           {number}    httpStatus
 * @param           {string}    message
 * @param           {T}         data
 * @returns         {ApiResponse}
 */
export class ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  success: boolean;
  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 300;
  }
}

/**
 * @description                 ApiError class
 * @param           {number}    status
 * @param           {string}    message
 */
export class ApiError extends Error {
  status: number;
  message: string;
  success: boolean;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.success = status >= 200 && status < 300;
  }
}
