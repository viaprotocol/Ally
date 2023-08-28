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
    console.log('injectableContainer is already presented');
    return;
  }

  const ads = getAdsOnPage();

  console.log('ads', ads);

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

  (window.adsbyslise = window.adsbyslise || []).push({
    slot: 'injected-leaderboard',
  });
  if (window.adsbyslisesync) {
    window.adsbyslisesync();
  }

  // if (container) {
  //   // Remove previous content
  //   container.innerHTML = iframe728;

  //   sliseSdk();
  //   //     // Удалить предыдущий контент
  //   // conizillaWrapper.innerHTML = '';

  //   // setTimeout(() => {
  //   (window.adsbyslise = window.adsbyslise || []).push({
  //     slot: 'injected-leaderboard',
  //   });
  //   if (window.adsbyslisesync) {
  //     window.adsbyslisesync();
  //   }
  //   // }, 1000);
  // }

  //     // Создать элемент <ins>
  //     const ins = document.createElement('ins');
  //     ins.className = 'adsbyslise';
  //     ins.style.display = 'inline-block';
  //     ins.style.width = '728px';
  //     ins.style.height = '90px';
  //     ins.setAttribute('data-ad-slot', 'injected-leaderboard');
  //     ins.setAttribute('data-ad-pub', 'pub-22');
  //     ins.setAttribute('data-ad-format', '728x90');
  //     conizillaWrapper.append(ins);

  //     // Создать и загрузить скрипт
  //     await loadAndRunScript('https://v1.slise.xyz/scripts/embed.js');

  //     // Выполнить дополнительную логику скрипта
  // (adsbyslise = window.adsbyslise || []).push({
  //   slot: 'injected-leaderboard',
  // });
  // if (window.adsbyslisesync) {
  //   window.adsbyslisesync();
  // }
  //   }

  // console.log('coninzillaComponent', coninzillaComponent);
}

export { initAds };
