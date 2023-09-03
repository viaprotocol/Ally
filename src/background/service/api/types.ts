import type { AxiosRequestConfig } from 'axios';

type ApiHeaders = {
  'Content-Type'?: string;
  Authorization?: string;
  'x-api-key'?: string;
  'CF-IPCountry'?: string;
};

type ApiQuery = {
  api_key?: string;
};

type ApiErrorData<T = any> = {
  isNetworkError: boolean;
  errorData: T;
  errorStatus?: number;
};

type ErrorResponse = {
  detail: string;
};

type AxiosRequestConfigExtended = AxiosRequestConfig & {
  _retry?: boolean;
};

export type {
  ApiErrorData,
  ApiHeaders,
  ApiQuery,
  ErrorResponse,
  AxiosRequestConfigExtended,
};
