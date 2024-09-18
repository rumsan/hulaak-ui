import axios, {
  AxiosHeaderValue,
  AxiosInstance,
  CreateAxiosDefaults,
  HeadersDefaults,
} from 'axios';

export class ApiClient {
  public client: AxiosInstance;
  constructor(config: CreateAxiosDefaults) {
    this.client = axios.create(config);
  }

  public set accessToken(token: string) {
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  public set appId(appId: string) {
    this.client.defaults.headers['app-id'] = appId;
  }

  public set headers(headers: { [key: string]: AxiosHeaderValue }) {
    this.client.defaults.headers = headers as HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  }
}
