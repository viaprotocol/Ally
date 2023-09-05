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

interface ViaScoreLevel {
  data: string;
}

interface ViaScoreTotal {
  score: ViaScoreState;
  levels: ViaScoreLevel[];
}

export const viaScore = createModel<RootModel>()({
  name: 'viaScore',
  state: {
    score: {
      scoreTotal: 0,
      ads: {
        adsWatchedCount: 0,
        adsWatchedSum: 0,
        adsWatchedCount24h: 0,
        adsWatchedSum24h: 0,
      },
    },
    levels: [],
  } as ViaScoreTotal,
  reducers: {
    setViaScore(state, payload: ViaScoreState) {
      return {
        ...state,
        score: {
          ...state.score,
          ...payload,
        },
      };
    },
    setLevels(state, payload) {
      return {
        ...state,
        levels: payload,
      };
    },
  },
  selectors: (slice) => ({
    getViaScore() {
      return slice((state) => state.score);
    },
    getLevels() {
      return slice((state) => state.levels);
    },
  }),
  effects: (dispatch) => ({
    async init() {
      this.getViaScore();
      this.getLevels();
    },
    async getViaScore(_?, store?) {
      const score = await store.app.wallet.getViaScore();
      dispatch.viaScore.setViaScore(score);
    },
    async getLevels(_?, store?) {
      const levels = await store.app.wallet.getLevels();
      dispatch.viaScore.setLevels(levels);
    },
  }),
});
