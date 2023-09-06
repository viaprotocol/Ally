import type { ApiErrorData } from './types';

class ApiError<T = any> extends Error {
  public isNetworkError: boolean;
  public status: number;
  public errorData: T;

  constructor(message: string, error: ApiErrorData<T>) {
    super(message);

    const { isNetworkError, errorData, errorStatus } = error;

    this.errorData = errorData;
    this.isNetworkError = isNetworkError;
    this.status = errorStatus || 0;
  }
}

export { ApiError };
