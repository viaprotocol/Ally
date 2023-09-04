import sliseSdk from './slise';

const iframe728 = `
<ins
  class="adsbyslise"
  style="display:inline-block;width:728px;height:90px"
  data-ad-slot="injected-leaderboard"
  data-ad-pub="pub-22"
  data-ad-format="728x90"
></ins>
`;

const iframe280 = `
<ins
  class="adsbyslise"
  style="display:inline-block;width:270;height:90px"
  data-ad-slot="injected-leaderboard"
  data-ad-pub="pub-22"
  data-ad-format="270x90"
></ins>
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

async function initAds() {
  const injectableContainer = document.querySelector(
    '[data-ad-slot="injected-leaderboard"]'
  );

  if (injectableContainer) {
    return;
  }

  const ads = getAdsOnPage();

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

  sliseSdk();

  ((window as any).adsbyslise = (window as any).adsbyslise || []).push({
    slot: 'injected-leaderboard',
  });
  if ((window as any).adsbyslisesync) {
    (window as any).adsbyslisesync();
  }
}

export { initAds };
