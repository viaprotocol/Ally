import { RootModel } from '.';
import { createModel } from '@rematch/core';

interface ViaScoreState {
  scoreTotal: number;
  ads: {
    adsWatchedCount: number;
    adsWatchedSum: number;
    adsWatchedCount24h: number;
    adsWatchedSum24h: number;
  };
}

export const viaScore = createModel<RootModel>()({
  name: 'viaScore',
  state: {
    scoreTotal: 0,
    ads: {
      adsWatchedCount: 0,
      adsWatchedSum: 0,
      adsWatchedCount24h: 0,
      adsWatchedSum24h: 0,
    },
  } as ViaScoreState,
  reducers: {
    setViaScore(state, payload: ViaScoreState) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  selectors: (slice) => ({
    getViaScore() {
      return slice((state) => state);
    },
  }),
  effects: (dispatch) => ({
    async init() {
      this.getViaScore();
    },
    async getViaScore(_?, store?) {
      const score = await store.app.wallet.getViaScore();
      dispatch.viaScore.setViaScore(score);
    },
  }),
});
