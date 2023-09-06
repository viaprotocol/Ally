import { EVENTS } from '@/constant';
import eventBus from '@/eventBus';
import { ViaScorePayload, ViaScoreLevelPayload } from '.';
import { preferenceService } from '..';
import { ApiService } from './ApiService';

class RouterApi {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  public getViaScore(address: string) {
    return this.api.get<ViaScorePayload>(`via-score/${address}`);
  }

  public getViaLevels(address: string) {
    return this.api.get<ViaScoreLevelPayload>('via-score/levels/', {
      data: {
        address,
      },
    });
  }

  public trackAdsViewed(address: string) {
    return this.api.post(`/via-score/${address}/ads`);
  }

  public completeQuest(questSlug: string) {
    return this.api.post(`via-score/quest/${questSlug}`);
  }

  public getMintCalldata(address: string) {
    return this.api.get(`via-score/mints/${address}/calldata`);
  }

  public getAds(address: string) {
    return this.api.get(`via-score/${address}/ads/`);
  }
}

const routerApiService = new ApiService(
  'https://router-staging-api.via.exchange/api/'
);
const routerApi = new RouterApi(routerApiService);

eventBus.addEventListener(EVENTS.ADS_VIEWED, async () => {
  const account = await preferenceService.getCurrentAccount();
  console.log('UPDATE ads!');

  if (account) {
    routerApi.trackAdsViewed(account.address);
  }
});

export { routerApi, RouterApi };
