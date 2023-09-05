import { ApiService } from './ApiService';

interface ViaScorePayload {
  scoreTotal: number;
  ads: {
    adsWatchedCount: number;
    adsWatchedSum: number;
    adsWatchedCount24h: number;
    adsWatchedSum24h: number;
  };
}

class RouterApi {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  public getViaScore(address: string) {
    return this.api.get<ViaScorePayload>(`via-score/${address}`);
  }
}

const routerApiService = new ApiService(
  'https://router-staging-api.via.exchange/api/'
);
const routerApi = new RouterApi(routerApiService);

export { routerApi, RouterApi };
