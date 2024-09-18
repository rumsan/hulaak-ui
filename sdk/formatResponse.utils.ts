import { AxiosResponse } from 'axios';

export type Request = {
  ip: string;
  userAgent: string;
  origin: string;
};

export type Response<T> = {
  success: boolean;
  data: T | null;
  code?: string;
  meta?: Record<string, any>;
};

export type FormattedResponse<T> = {
  data: T;
  response: Response<T>;
  httpReponse: AxiosResponse;
};

export const formatResponse = <T>(
  response: AxiosResponse
): FormattedResponse<T> => {
  return {
    data: <T>response.data.data,
    response: <Response<T>>response.data,
    httpReponse: response,
  };
};
