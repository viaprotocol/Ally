import { EVENTS } from '@/constant';
import eventBus from '@/eventBus';
import { ethErrors } from 'eth-rpc-errors';
import {
  ViaScorePayload,
  ViaScoreLevelPayload,
  ViaScoreInviteCodesPayload,
} from '.';
import { preferenceService } from '..';
import { ApiService } from './ApiService';

class RouterApi {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  public getViaScore(address: string) {
    return this.api.get<ViaScorePayload>(`via-score/${address}`, {
      params: {
        withAds: true,
      },
    });
  }

  public getViaLevels(address: string) {
    return this.api.get<ViaScoreLevelPayload>('via-score/quests/', {
      params: {
        address,
        withAds: true,
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

  public getInviteCode(address: string) {
    return this.api.get<ViaScoreInviteCodesPayload>(
      `via-score/${address}/invites/`
    );
  }
}

const routerApiService = new ApiService('https://router-api.via.exchange/');
const routerApi = new RouterApi(routerApiService);

eventBus.addEventListener(EVENTS.ADS_VIEWED, async () => {
  const account = await preferenceService.getCurrentAccount();

  if (account) {
    routerApi.trackAdsViewed(account.address);
  }
});

export { routerApi, RouterApi };
