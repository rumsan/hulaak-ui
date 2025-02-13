import { Mail } from '@rumsan/hulaak/types';
import { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { formatResponse, FormattedResponse } from '../formatResponse.utils';
import { ApiClient } from './api.client';

export class InboxClient {
  public apiClient: ApiClient;
  private axios: AxiosInstance;
  private _prefix = 'inbox';
  constructor(private _apiClient: ApiClient) {
    this.apiClient = _apiClient;
    this.axios = this.apiClient.client;
  }

  // Overload signatures
  async listByAddress(
    address: string,
    config?: AxiosRequestConfig
  ): Promise<FormattedResponse<Mail[]>>;

  async listByAddress(
    mailbox: string,
    domain: string,
    config?: AxiosRequestConfig
  ): Promise<FormattedResponse<Mail[]>>;

  // Single implementation
  async listByAddress(
    arg1: string,
    arg2?: string | AxiosRequestConfig,
    arg3?: AxiosRequestConfig
  ): Promise<FormattedResponse<Mail[]>> {
    let url: string;
    let config: AxiosRequestConfig | undefined;

    let address = arg1;

    if (typeof arg2 === 'string') {
      address = `${arg1}@${arg2}`;
      config = arg3;
    } else {
      config = arg2;
    }

    const response = await this.axios.get(`${this._prefix}/${address}`, config);
    return formatResponse<Mail[]>(response);
  }
}

export const getInboxClient = (config: CreateAxiosDefaults): InboxClient => {
  return new InboxClient(new ApiClient(config));
};
