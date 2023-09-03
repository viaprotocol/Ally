import { ApiService } from './ApiService';

class RouterApi {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  public getViaScore(address: string) {
    return this.api.get(`via-score/${address}`);
  }
}

const routerApiService = new ApiService('https://router-api.via.exchange/api/');
const routerApi = new RouterApi(routerApiService);

export { routerApi, RouterApi };
