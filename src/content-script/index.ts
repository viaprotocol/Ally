import { Message } from '@/utils';
import { browser } from 'webextension-polyfill-ts';
import { EVENTS } from '@/constant';
import { initAds } from './ads';

const { WindowMessage, PortMessage } = Message;
const pm = new PortMessage().connect();

const initListener = () => {
  const bcm = new WindowMessage().listen((data) => pm.request(data));

  // background notification
  pm.on('message', (data) => {
    console.log('data', data);
    bcm.send('message', data);
  });

  pm.request({
    type: EVENTS.UIToBackground,
    method: 'getScreen',
    params: { availHeight: screen.availHeight },
  });

  document.addEventListener('beforeunload', () => {
    bcm.dispose();
    pm.dispose();
  });
};

// the script element with src won't execute immediately
// use inline script element instead!
const container = document.head || document.documentElement;
const ele = document.createElement('script');

ele.setAttribute('src', browser.runtime.getURL('pageProvider.js'));
container.insertBefore(ele, container.children[0]);
container.removeChild(ele);
initListener();

browser.runtime.sendMessage({
  type: 'DETECT_PHISHING',
  data: {
    origin: location.origin,
  },
});

// // Initialize ads
window.addEventListener('load', () => {
  initAds(pm);

  setInterval(() => {
    initAds(pm);
  }, 1_000);
});
