import { EVENTS } from '@/constant';
import PortMessage from '@/utils/message/portMessage';
import sliseSdk from './slise';

const iframe728 = `
<style>
  .ally-group:hover .ally-info {
    display: flex !important;
  }
</style>
<div class="ally-group" style="display:inline-block;width:728px;height:90px;position:relative;">
  <ins
    class="adsbyslise"
    style="display:inline-block;width:728px;height:90px"
    data-ad-slot="injected-leaderboard"
    data-ad-pub="pub-22"
    data-ad-format="728x90"
  ></ins>
  <div class="ally-info" style="display:none; position:absolute;left:652px;top:5px;justify-content:center;align-items:center;gap:10px;">
    <div style="width:32px;height:11px;border:1px solid #1C191729;display:flex;justify-content:center;align-items:center;background:#FFFFFF33;border-radius:6px;">
      <div style="width:26px;height:10px;background:url('data:image/svg+xml,%3Csvg%20width%3D%2226%22%20height%3D%2211%22%20viewBox%3D%220%200%2026%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%225.72051%22%20cy%3D%223.68413%22%20r%3D%221.55132%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.87828%201.26074C1.73636%201.26075%200%202.99712%200%205.13903C0%207.28095%201.73636%209.01732%203.87828%209.01733V1.26074Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M15.133%202.55779L15.1239%207.73721H13.7767V7.04008C13.4183%207.52925%2012.8821%207.84969%2012.1575%207.84969C10.8011%207.851%209.79272%206.73926%209.79272%205.1475C9.79272%203.55575%2010.8195%202.44531%2012.147%202.44531C12.8821%202.44531%2013.4275%202.78407%2013.7858%203.2837V2.5591H15.133V2.55779ZM13.7858%205.1475C13.7858%204.29996%2013.2117%203.72578%2012.4583%203.72578C11.7049%203.72578%2011.1491%204.29996%2011.1491%205.1475C11.1491%205.99504%2011.7141%206.56923%2012.4583%206.56923C13.2025%206.56923%2013.7858%206.0042%2013.7858%205.1475Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M16.1919%200H17.5493V7.75659H16.1919V0Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M18.6157%200H19.9731V7.75659H18.6157V0Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M25.9999%202.55664L22.5521%2010.2776H21.12L22.5521%207.04939L20.5549%202.55664H21.9871L23.2676%205.58974L24.5572%202.55664H25.9986H25.9999Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E') no-repeat center center;">
      </div>
    </div>
    <div style="display:flex;justify-content:center;align-items:center;width:12px;height:12px;border:1px solid #1C191729;background:#FFFFFF33;border-radius:6px;">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.78226 1.07516C1.587 0.879895 1.27042 0.879895 1.07516 1.07516C0.879895 1.27042 0.879895 1.587 1.07516 1.78226L3.29303 4.00014L1.07516 6.21801C0.879896 6.41328 0.879896 6.72986 1.07516 6.92512C1.27042 7.12038 1.587 7.12038 1.78226 6.92512L4.00014 4.70725L6.21801 6.92512C6.41328 7.12038 6.72986 7.12038 6.92512 6.92512C7.12038 6.72986 7.12038 6.41328 6.92512 6.21801L4.70725 4.00014L6.92512 1.78226C7.12038 1.587 7.12038 1.27042 6.92512 1.07516C6.72986 0.879895 6.41328 0.879895 6.21801 1.07516L4.00014 3.29303L1.78226 1.07516Z" fill="#1C1917" fill-opacity="0.6"/>
      </svg>
    </div>
  </div>
</div>
`;

const iframe280 = `
<style>
  .ally-group:hover .ally-info {
    display: flex !important;
  }
</style>
<div class="ally-group" style="display:inline-block;width:270px;height:90px;position:relative;">
  <ins
    class="adsbyslise"
    style="display:inline-block;width:270;height:90px"
    data-ad-slot="injected-leaderboard"
    data-ad-pub="pub-22"
    data-ad-format="270x90"
  ></ins>
  <div class="ally-info" style="display:none; position:absolute;left:180px;top:5px;justify-content:center;align-items:center;gap:10px;">
    <div style="width:32px;height:11px;border:1px solid #1C191729;display:flex;justify-content:center;align-items:center;background:#FFFFFF33;border-radius:6px;">
      <div style="width:26px;height:10px;background:url('data:image/svg+xml,%3Csvg%20width%3D%2226%22%20height%3D%2211%22%20viewBox%3D%220%200%2026%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%225.72051%22%20cy%3D%223.68413%22%20r%3D%221.55132%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.87828%201.26074C1.73636%201.26075%200%202.99712%200%205.13903C0%207.28095%201.73636%209.01732%203.87828%209.01733V1.26074Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M15.133%202.55779L15.1239%207.73721H13.7767V7.04008C13.4183%207.52925%2012.8821%207.84969%2012.1575%207.84969C10.8011%207.851%209.79272%206.73926%209.79272%205.1475C9.79272%203.55575%2010.8195%202.44531%2012.147%202.44531C12.8821%202.44531%2013.4275%202.78407%2013.7858%203.2837V2.5591H15.133V2.55779ZM13.7858%205.1475C13.7858%204.29996%2013.2117%203.72578%2012.4583%203.72578C11.7049%203.72578%2011.1491%204.29996%2011.1491%205.1475C11.1491%205.99504%2011.7141%206.56923%2012.4583%206.56923C13.2025%206.56923%2013.7858%206.0042%2013.7858%205.1475Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M16.1919%200H17.5493V7.75659H16.1919V0Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M18.6157%200H19.9731V7.75659H18.6157V0Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3Cpath%20d%3D%22M25.9999%202.55664L22.5521%2010.2776H21.12L22.5521%207.04939L20.5549%202.55664H21.9871L23.2676%205.58974L24.5572%202.55664H25.9986H25.9999Z%22%20fill%3D%22%231C1917%22%20fill-opacity%3D%220.6%22%2F%3E%3C%2Fsvg%3E') no-repeat center center;">
      </div>
    </div>
    <div style="display:flex;justify-content:center;align-items:center;width:12px;height:12px;border:1px solid #1C191729;background:#FFFFFF33;border-radius:6px;">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.78226 1.07516C1.587 0.879895 1.27042 0.879895 1.07516 1.07516C0.879895 1.27042 0.879895 1.587 1.07516 1.78226L3.29303 4.00014L1.07516 6.21801C0.879896 6.41328 0.879896 6.72986 1.07516 6.92512C1.27042 7.12038 1.587 7.12038 1.78226 6.92512L4.00014 4.70725L6.21801 6.92512C6.41328 7.12038 6.72986 7.12038 6.92512 6.92512C7.12038 6.72986 7.12038 6.41328 6.92512 6.21801L4.70725 4.00014L6.92512 1.78226C7.12038 1.587 7.12038 1.27042 6.92512 1.07516C6.72986 0.879895 6.41328 0.879895 6.21801 1.07516L4.00014 3.29303L1.78226 1.07516Z" fill="#1C1917" fill-opacity="0.6"/>
      </svg>
    </div>
  </div>
</div>
`;

const getAdsOnPage = () => {
  return [
    document.querySelector('#CloseCoinzillaHeader')?.parentElement,
    document.querySelector('.coinzilla')?.parentElement, // coinzilla
    document.querySelector('[data-target="ads.banner"]'), // google ads
    ...Array.from(document.querySelectorAll('a'))
      .filter(
        (a) => a?.href && /https:\/\/a1\.adform\.net\/C\/\?bn=\d+/.test(a?.href)
      )
      .map((a) => a.parentElement),
    ...Array.from(document.querySelectorAll('a'))
      .filter(
        (a) =>
          a?.href && /https:\/\/goto\.etherscan\.com\/rd\/[\w\d]+/.test(a?.href)
      )
      .map((a, i) => ((i + 1) % 3 ? a.parentElement : null)),
    document.querySelector('inst[id]'),
  ].filter(Boolean);
};

async function initAds(pm: PortMessage) {
  const injectableContainer = document.querySelector(
    '[data-ad-slot="injected-leaderboard"]'
  );

  const ads = getAdsOnPage();

  if (injectableContainer || !ads || !ads.length) {
    return;
  }

  for (const ad of ads) {
    if (ad) {
      console.log('ad.clientWidth', ad.clientWidth);
      if (ad.clientWidth <= 360) {
        ad.innerHTML = iframe280;
      } else {
        ad.innerHTML = iframe728;
      }
    }
  }

  pm.request({
    type: EVENTS.UIToBackground,
    method: 'adsViewed',
    params: {},
  });

  sliseSdk();

  ((window as any).adsbyslise = (window as any).adsbyslise || []).push({
    slot: 'injected-leaderboard',
  });
  if ((window as any).adsbyslisesync) {
    (window as any).adsbyslisesync();
  }
}

export { initAds };
