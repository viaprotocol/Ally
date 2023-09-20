import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axios from 'axios';

import { ApiError } from './ApiError';
import type { ApiHeaders, ApiQuery, ErrorResponse } from './types';

const API_KEY = '08affe26-ec6d-4618-ae07-885f1b4ba13b';

class ApiService {
  /**
   * Api Instance
   */
  private api: AxiosInstance;

  /**
   * Emdpoint API
   */
  private endpoint: string | undefined;

  /**
   * Response headers
   */
  private headersDict: Partial<ApiHeaders> = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  private queryDict: Partial<ApiQuery> = {};

  constructor(endpoint?: string, config?: AxiosRequestConfig) {
    this.endpoint = endpoint || '/';

    this.api = axios.create({
      baseURL: this.endpoint,
      ...config,
      adapter: fetchAdapter,
    });
  }

  private responseHandler = <T>(response: AxiosResponse<T>): T => {
    const { data } = response;

    return data;
  };

  private errorHandler = (e: AxiosError<ErrorResponse>): ApiError => {
    const message = e?.message || 'Unknown Error';
    const isNetworkError = message === 'Network Error';
    const errorStatus = e.response?.status;

    throw new ApiError(message, {
      isNetworkError,
      errorData: e.response?.data,
      errorStatus,
    });
  };

  public getApi = () => {
    return this.api;
  };

  public addHeaders = (newHeaders: Partial<ApiHeaders>): void => {
    this.headersDict = {
      ...this.headersDict,
      ...newHeaders,
    };
  };

  public removeHeaders = (headerName: keyof Partial<ApiHeaders>) => {
    delete this.headersDict[headerName];
  };

  public addQuery = (newQuery: Partial<ApiQuery>) => {
    this.queryDict = {
      ...this.queryDict,
      ...newQuery,
    };
  };

  public delete = <T>(
    method: string,
    config: AxiosRequestConfig = { headers: {} }
  ): Promise<T> =>
    this.api
      .delete<T>(method, {
        ...config,
        headers: {
          ...this.headersDict,
          ...(config.headers as Partial<ApiHeaders>),
        },
      })
      .then(this.responseHandler)
      .catch(this.errorHandler) as Promise<T>;

  public put = <T>(
    method: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = { headers: {} }
  ): Promise<T> =>
    this.api
      .put<T>(method, params, {
        ...config,
        headers: {
          ...this.headersDict,
          ...(config.headers as Partial<ApiHeaders>),
        },
      })
      .then(this.responseHandler)
      .catch(this.errorHandler) as Promise<T>;

  public post = <T>(
    method: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = { headers: {} }
  ): Promise<T> =>
    this.api
      .post<T>(method, params, {
        ...config,
        headers: {
          ...this.headersDict,
          ...(config.headers as Partial<ApiHeaders>),
        },
      })
      .then(this.responseHandler)
      .catch(this.errorHandler) as Promise<T>;

  public get = <T>(
    method: string,
    config: AxiosRequestConfig = { headers: {} }
  ): Promise<T> =>
    this.api
      .get<T>(method, {
        ...config,
        headers: {
          ...this.headersDict,
          ...(config.headers as Partial<ApiHeaders>),
        },
        params: {
          ...this.queryDict,
          ...config.params,
        },
      })
      .then(this.responseHandler)
      .catch(this.errorHandler) as Promise<T>;

  public addRequestInterceptor = (
    interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  ) => {
    this.api.interceptors.request.use(interceptor);
  };

  public addResponseInterceptor = (
    successHandler: (response: AxiosResponse) => AxiosResponse,
    errorHandler: (response: AxiosError) => Promise<AxiosError>
  ) => {
    this.api.interceptors.response.use(successHandler, errorHandler);
  };
}

export { ApiService };
