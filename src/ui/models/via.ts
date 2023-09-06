import { RootModel } from '.';
import { createModel } from '@rematch/core';

export interface ViaScoreState {
  scoreTotal: number;
  ads: {
    adsWatchedCount: number;
    adsWatchedSum: number;
    adsWatchedCount24h: number;
    adsWatchedSum24h: number;
  };
}

export interface ViaScoreLevel {
  slug: string;
  name: string;
  description?: string;
  points: number;
  completed_at?: string;
  available_at?: string;
}

export interface ViaScoreTotal {
  score: ViaScoreState;
  levels: {
    available: ViaScoreLevel[];
    completed: ViaScoreLevel[];
    unavailable: ViaScoreLevel[];
  } | null;
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
    levels: null,
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
      try {
        const score = await store.app.wallet.getViaScore();
        console.log('score', score);
        dispatch.viaScore.setViaScore(score);
      } catch (e) {
        console.log('getViaScore error', e);
      }
    },
    async getLevels(_?, store?) {
      try {
        const levels = await store.app.wallet.getViaLevels();
        console.log('levels', levels);
        dispatch.viaScore.setLevels(levels);
      } catch (e) {
        console.log('getLevels error', e);
      }
    },
  }),
});
