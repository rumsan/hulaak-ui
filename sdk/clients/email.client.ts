import { Mail } from '@rumsan/hulaak/types';
import { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { formatResponse, FormattedResponse } from '../formatResponse.utils';
import { ApiClient } from './api.client';

export class EmailClient {
  public apiClient: ApiClient;
  private axios: AxiosInstance;
  private _prefix = 'email';
  constructor(private _apiClient: ApiClient) {
    this.apiClient = _apiClient;
    this.axios = this.apiClient.client;
  }
  async getById(
    cuid: string,
    config?: AxiosRequestConfig
  ): Promise<FormattedResponse<Mail>> {
    const response = await this.axios.get(`${this._prefix}/${cuid}`, config);
    return formatResponse<Mail>(response);
  }

  async setMailToRead(
    cuid: string,
    config?: AxiosRequestConfig
  ): Promise<FormattedResponse<Mail>> {
    const response = await this.axios.put(
      `${this._prefix}/${cuid}/mark-as-read`,
      config
    );
    return formatResponse<Mail>(response);
  }
}

export const getEmailClient = (config: CreateAxiosDefaults): EmailClient => {
  return new EmailClient(new ApiClient(config));
};
