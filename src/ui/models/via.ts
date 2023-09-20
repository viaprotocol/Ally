import { RootModel } from '.';
import { createModel } from '@rematch/core';

export interface ViaScoreState {
  scoreTotal: number;
  ads: {
    adsWatchedCount?: number;
    adsWatchedSum?: number;
    adsWatchedCount7d?: number;
    adsWatchedPoints7d?: number;
  };
}

export interface ViaScoreReferralInfo {
  userAddress: string;
  inviteCode: string;
}

export interface ViaScoreLevel {
  slug: string;
  name: string;
  task_url?: string;
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
  referralInfo: ViaScoreReferralInfo | null;
}

export const viaScore = createModel<RootModel>()({
  name: 'viaScore',
  state: {
    score: {
      scoreTotal: 0,
      ads: {
        adsWatchedCount: 0,
        adsWatchedSum: 0,
        adsWatchedCount7d: 0,
        adsWatchedPoints7d: 0,
      },
    },
    levels: null,
    referralInfo: null,
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
    setReferralInfo(state, payload) {
      return {
        ...state,
        referralInfo: payload,
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

    getReferralInfo() {
      return slice((state) => state.referralInfo);
    },
  }),
  effects: (dispatch) => ({
    async init() {
      await this.setViaInstaledExtension();
      this.getViaScore();
      this.getLevels();
      this.getInviteCode();
    },
    async setViaInstaledExtension(_?, store?) {
      try {
        await store.app.wallet.setInstalledExtensionInstalled();
      } catch (e) {
        console.log('setInstalledExtensionInstalled error', e);
      }
    },
    async getViaScore(_?, store?) {
      try {
        const score = await store.app.wallet.getViaScore();
        dispatch.viaScore.setViaScore(score);
      } catch (e) {
        console.log('getViaScore error', e);
      }
    },
    async getLevels(_?, store?) {
      try {
        const levels = await store.app.wallet.getViaLevels();
        dispatch.viaScore.setLevels(levels);
      } catch (e) {
        console.log('getLevels error', e);
      }
    },

    async getInviteCode(_, store) {
      try {
        const code = await store.app.wallet.getInviteCode();
        dispatch.viaScore.setReferralInfo(code);
        return code;
      } catch (e) {
        console.log('getInvideCode error', e);
      }
    },
  }),
});
