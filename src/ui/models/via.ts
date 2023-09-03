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

const initialStat: ViaScoreState = {
  scoreTotal: 0,
  ads: {
    adsWatchedCount: 0,
    adsWatchedSum: 0,
    adsWatchedCount24h: 0,
    adsWatchedSum24h: 0,
  },
};

export const viaScore = createModel<RootModel>()({
  name: 'viaScore',
  state: initialStat,
  reducers: {
    setViaScore(state, payload: number) {
      return {
        ...state,
        scoreTotal: payload,
      };
    },
  },
});
