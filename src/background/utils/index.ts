import { isManifestV3 } from '@/utils/mv3';
import WalletConnectKeyring from '@rabby-wallet/eth-walletconnect-keyring';
import * as ethUtil from 'ethereumjs-util';
import { browser } from 'webextension-polyfill-ts';
import i18n from '../service/i18n';
import pageStateCache from '../service/pageStateCache';
export { default as createPersistStore } from './persisitStore';

// {a:{b: string}} => {1: 'a.b'}
// later same [source] value will override [result] key generated before
const retrieveValuePath = (obj) => {
  const arr = [...Object.entries(obj)];
  const result = {};
  const parentKey: string[] = [];
  let lastParent;

  while (arr.length) {
    const curNode = arr.shift();
    const [key, value] = curNode!;
    if (lastParent && lastParent[key] !== value) {
      parentKey.pop();
    }

    if (typeof value === 'object') {
      arr.unshift(...Object.entries(value!));
      parentKey.push(key);
      lastParent = value;
    } else if (typeof value === 'string') {
      result[value] = `${[...parentKey, key].join('.')}`;
    }
  }

  return result;
};

export const underline2Camelcase = (str: string) => {
  return str.replace(/_(.)/g, (m, p1) => p1.toUpperCase());
};

export { retrieveValuePath };
export { default as PromiseFlow } from './promiseFlow';

export function normalizeAddress(input: number | string): string {
  if (!input) {
    return '';
  }

  if (typeof input === 'number') {
    const buffer = ethUtil.toBuffer(input);
    input = ethUtil.bufferToHex(buffer);
  }

  if (typeof input !== 'string') {
    let msg = 'eth-sig-util.normalize() requires hex string or integer input.';
    msg += ` received ${typeof input}: ${input}`;
    throw new Error(msg);
  }

  return ethUtil.addHexPrefix(input);
}

export const wait = (fn: () => void, ms = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve(true);
    }, ms);
  });
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

export const setPageStateCacheWhenPopupClose = (data) => {
  const cache = pageStateCache.get();
  if (cache && cache.path === '/import/wallet-connect') {
    pageStateCache.set({
      ...cache,
      states: {
        ...cache.states,
        data,
      },
    });
  }
};

export const hasWalletConnectPageStateCache = () => {
  const cache = pageStateCache.get();
  if (cache && cache.path === '/import/wallet-connect') {
    return true;
  }
  return false;
};

export const isSameAddress = (a: string, b: string) => {
  return a.toLowerCase() === b.toLowerCase();
};

export const setPopupIcon = (type: 'default' | 'rabby' | 'metamask') => {
  const icons = [16, 19, 32, 48, 128].reduce((res, size) => {
    if (type === 'default') {
      res[size] = `/images/icon-${size}.png`;
    } else {
      res[size] = `/images/icon-default-${type}-${size}.png`;
    }
    return res;
  }, {});

  if (isManifestV3()) {
    return browser.action.setIcon({
      path: icons,
    });
  } else {
    return browser.browserAction.setIcon({
      path: icons,
    });
  }
};

global.__rb_is = () => true;

declare global {
  function __rb_is(): boolean;
}
export const walletConnectClientMeta = {
  description: i18n.t('appDescription'),
  url: 'https://rabby.io',
  icons: ['https://myally.xyz/vite.svg'],
  name: 'Rabby',
};
export const setWalletConnectClientMeta = (keyring: WalletConnectKeyring) => {
  keyring.deserialize({
    clientMeta: walletConnectClientMeta,
  } as any);
  return keyring;
};
