export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function createError(statusCode: number, message: string) {
  const error = new ApiError(message, statusCode);
  return error;
}
