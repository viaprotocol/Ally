import { ViaScoreLevel } from './../../../ui/models/via';
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

interface ViaScorePayload {
  scoreTotal: number;
  ads: {
    adsWatchedCount: number;
    adsWatchedSum: number;
    adsWatchedCount24h: number;
    adsWatchedSum24h: number;
  };
}

interface ViaScoreLevelPayload {
  available: ViaScoreLevel[];
  completed: ViaScoreLevel[];
  unavailable: ViaScoreLevel[];
}

export type {
  ViaScoreLevelPayload,
  ViaScorePayload,
  ApiErrorData,
  ApiHeaders,
  ApiQuery,
  ErrorResponse,
  AxiosRequestConfigExtended,
};
