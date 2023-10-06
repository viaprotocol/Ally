import { Input, message, Popover } from 'antd';
import ClipboardJS from 'clipboard';
import clsx from 'clsx';
import { Trans, useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { matomoRequestEvent } from '@/utils/matomo-request';
import { copyTextToClipboard } from '@/ui/utils/clipboard';
import {
  KEYRING_CLASS,
  KEYRING_ICONS,
  KEYRING_ICONS_WHITE,
  KEYRING_TYPE,
  KEYRING_TYPE_TEXT,
  WALLET_BRAND_CONTENT,
  EVENTS,
} from 'consts';
import QRCode from 'qrcode.react';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInterval } from 'react-use';
import IconAddressCopy from 'ui/assets/address-copy.png';
import IconCorrect from 'ui/assets/dashboard/contacts/correct.png';
import IconUnCorrect from 'ui/assets/dashboard/contacts/uncorrect.png';
import IconEditPen from 'ui/assets/editpen.svg';
import { ReactComponent as RefreshIcon } from 'ui/assets/refresh-ccw.svg';
import { ReactComponent as MainLockIcon } from 'ui/assets/main-lock.svg';
import { ReactComponent as MoneyCashIcon } from 'ui/assets/money-cash.svg';
import { ReactComponent as ArrowRightIcon } from 'ui/assets/chevron-down.svg';
import { ReactComponent as IconSettings } from 'ui/assets/icon-settings-c.svg';
import { ReactComponent as RcIconCopy } from 'ui/assets/icon-copy.svg';

import IconSuccess from 'ui/assets/success.svg';
import { AddressViewer, Modal } from 'ui/component';
import {
  connectStore,
  useRabbyDispatch,
  useRabbyGetter,
  useRabbySelector,
} from 'ui/store';
import { formatAmount, formatPoints, isSameAddress, useWallet } from 'ui/utils';
import {
  BalanceInfo,
  BalanceView,
  ChainAndSiteSelector,
  GnosisWrongChainAlertBar,
  DefaultWalletSetting,
} from './components';
import './style.less';

import PendingApproval from './components/PendingApproval';
import PendingTxs from './components/PendingTxs';
import { getKRCategoryByType } from '@/utils/transaction';
import eventBus from '@/eventBus';

import { ReactComponent as IconAddAddress } from '@/ui/assets/address/add-address.svg';
import { ReactComponent as IconArrowRight } from 'ui/assets/dashboard/arrow-right.svg';
import Queue from './components/Queue';
import { copyAddress } from '@/ui/utils/clipboard';
import { useWalletConnectIcon } from '@/ui/component/WalletConnect/useWalletConnectIcon';
import { useGnosisNetworks } from '@/ui/hooks/useGnosisNetworks';
import { useGnosisPendingTxs } from '@/ui/hooks/useGnosisPendingTxs';
import { CommonSignal } from '@/ui/component/ConnectStatus/CommonSignal';
import PageWrapper from '@/ui/component/PageWrapper';
import { VIA_SCORE_URL } from '@/constant/via';
import { useViaRefferalLink } from '@/ui/utils/via';

const Dashboard = () => {
  const history = useHistory();
  const wallet = useWallet();
  const dispatch = useRabbyDispatch();
  const { alianName, currentAccount, accountsList } = useRabbySelector((s) => ({
    alianName: s.account.alianName,
    currentAccount: s.account.currentAccount,
    accountsList: s.accountToDisplay.accountsList,
  }));

  const { pendingTransactionCount: pendingTxCount } = useRabbySelector((s) => ({
    ...s.transactions,
  }));

  const refferalInfo = useRabbyGetter((s) => s.viaScore.getReferralInfo);

  const { firstNotice, updateContent } = useRabbySelector((s) => ({
    ...s.appVersion,
  }));

  const [copySuccess, setCopySuccess] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [showChain, setShowChain] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [topAnimate, setTopAnimate] = useState('');
  const [connectionAnimation, setConnectionAnimation] = useState('');
  const [pendingApprovalCount, setPendingApprovalCount] = useState(0);
  const [accountBalanceUpdateNonce, setAccountBalanceUpdateNonce] = useState(0);

  const isGnosis = useRabbyGetter((s) => s.chains.isCurrentAccountGnosis);
  const viaScore = useRabbyGetter((s) => s.viaScore.getViaScore);

  const gnosisPendingCount = useRabbySelector(
    (s) => s.chains.gnosisPendingCount
  );

  const [dashboardReload, setDashboardReload] = useState(false);
  const getCurrentAccount = async () => {
    const account = await dispatch.account.getCurrentAccountAsync();
    if (!account) {
      history.replace('/no-address');
      return;
    }
  };

  useInterval(() => {
    if (!currentAccount) return;
    if (currentAccount.type === KEYRING_TYPE.GnosisKeyring) return;

    dispatch.transactions.getPendingTxCountAsync(currentAccount.address);
  }, 30000);

  useEffect(() => {
    getCurrentAccount();
  }, []);

  useGnosisNetworks(
    {
      address:
        currentAccount?.address &&
        currentAccount?.type === KEYRING_TYPE.GnosisKeyring
          ? currentAccount.address
          : '',
    },
    {
      onBefore() {
        dispatch.chains.setField({
          gnosisNetworkIds: [],
        });
      },
      onSuccess(res) {
        if (res) {
          dispatch.chains.setField({
            gnosisNetworkIds: res,
          });
        }
      },
    }
  );

  useGnosisPendingTxs(
    {
      address:
        currentAccount?.address &&
        currentAccount?.type === KEYRING_TYPE.GnosisKeyring
          ? currentAccount.address
          : '',
    },
    {
      onBefore() {
        dispatch.chains.setField({
          gnosisPendingCount: 0,
        });
      },
      onSuccess(res) {
        dispatch.chains.setField({
          gnosisPendingCount: res?.total || 0,
        });
      },
    }
  );

  const refferalLink = useMemo(() => {
    if (!refferalInfo) {
      return null;
    }

    return `${VIA_SCORE_URL}/${refferalInfo.inviteCode}`;
  }, [refferalInfo]);

  const onCopyRefferalLink = React.useCallback(() => {
    if (!refferalLink) {
      return;
    }

    console.log('refferalLink', refferalLink);

    copyTextToClipboard(refferalLink).then(() => {
      message.success({
        icon: <img src={IconSuccess} className="icon icon-success" />,
        content: t('global.copied'),
        duration: 0.5,
      });
    });
  }, [refferalLink]);

  useEffect(() => {
    if (currentAccount) {
      if (currentAccount.type !== KEYRING_TYPE.GnosisKeyring) {
        dispatch.transactions.getPendingTxCountAsync(currentAccount.address);
      }

      wallet
        .getAlianName(currentAccount?.address.toLowerCase())
        .then((name) => {
          dispatch.account.setField({ alianName: name });
          setDisplayName(name!);
        });

      eventBus.addEventListener(EVENTS.TX_COMPLETED, async ({ address }) => {
        if (isSameAddress(address, currentAccount.address)) {
          const count = await dispatch.transactions.getPendingTxCountAsync(
            currentAccount.address
          );
          if (count === 0) {
            setTimeout(() => {
              // increase accountBalanceUpdateNonce to trigger useCurrentBalance re-fetch account balance
              // delay 5s for waiting db sync data
              setAccountBalanceUpdateNonce(accountBalanceUpdateNonce + 1);
            }, 5000);
          }
        }
      });
    }
    return () => {
      eventBus.removeAllEventListeners(EVENTS.TX_COMPLETED);
    };
  }, [currentAccount]);

  useEffect(() => {
    if (dashboardReload) {
      if (currentAccount) {
        dispatch.transactions.getPendingTxCountAsync(currentAccount.address);
      }
      setDashboardReload(false);
      getCurrentAccount();
      dispatch.accountToDisplay.getAllAccountsToDisplay();
    }
  }, [dashboardReload]);

  useEffect(() => {
    (async () => {
      await dispatch.addressManagement.getHilightedAddressesAsync();
      dispatch.accountToDisplay.getAllAccountsToDisplay();
      const pendingCount = await wallet.getPendingApprovalCount();
      setPendingApprovalCount(pendingCount);
    })();
  }, []);

  useEffect(() => {
    if (clicked) {
      dispatch.accountToDisplay.getAllAccountsToDisplay();
    }
  }, [clicked]);

  const handleCopyCurrentAddress = () => {
    const { t } = useTranslation();
    const clipboard = new ClipboardJS('.address-popover', {
      text: function () {
        return currentAccount!.address;
      },
    });
    clipboard.on('success', () => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
      message.success({
        duration: 3,
        icon: <i />,
        content: (
          <div>
            <div className="flex gap-4 mb-4">
              <img src={IconSuccess} alt="" />
              {t('global.copied')}
            </div>
            <div className="text-white">{currentAccount!.address}</div>
          </div>
        ),
      });
      matomoRequestEvent({
        category: 'AccountInfo',
        action: 'popupCopyAddress',
        label: [
          getKRCategoryByType(currentAccount?.type),
          currentAccount?.brandName,
        ].join('|'),
      });
      clipboard.destroy();
    });
  };

  const handleAlianNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch.account.setField({ alianName: e.target.value });
  };

  const alianNameConfirm = async (e) => {
    e.stopPropagation();
    if (!alianName) {
      return;
    }
    setStartEdit(false);
    await wallet.updateAlianName(
      currentAccount?.address?.toLowerCase() || '',
      alianName
    );
    setDisplayName(alianName);
    const newAccountList = accountsList.map((item) => {
      if (
        item.address.toLowerCase() === currentAccount?.address.toLowerCase()
      ) {
        return {
          ...item,
          alianName: alianName,
        };
      }
      return item;
    });
    if (newAccountList.length > 0) {
      dispatch.accountToDisplay.setField({ accountsList: newAccountList });
    }
  };

  const gotoAddAddress = () => {
    matomoRequestEvent({
      category: 'Front Page Click',
      action: 'Click',
      label: 'Add Address',
    });
    history.push('/add-address');
  };
  useEffect(() => {
    dispatch.appVersion.checkIfFirstLoginAsync();
  }, []);

  const hideAllList = () => {
    setShowAssets(false);
    setShowChain(false);
    setShowToken(false);
    setShowNFT(false);
    setConnectionAnimation('fadeInBottom');
    setTopAnimate('fadeInTop');
  };

  const showGnosisWrongChainAlert = useRabbyGetter(
    (s) => s.chains.isShowGnosisWrongChainAlert
  );
  const opacity60 =
    currentAccount?.type === KEYRING_CLASS.MNEMONIC ||
    currentAccount?.type === KEYRING_CLASS.PRIVATE_KEY ||
    currentAccount?.type === KEYRING_CLASS.WATCH;
  const showGnosisAlert = isGnosis && showGnosisWrongChainAlert && !showChain;

  const switchAddress = () => {
    matomoRequestEvent({
      category: 'Front Page Click',
      action: 'Click',
      label: 'Change Address',
    });
    history.push('/switch-address');
  };

  const onClickSettings = () => {
    history.push('/settings');
  };

  const onClickQuestsList = () => {
    history.push('/via-quests');
  };

  const onClickSwap = () => {
    history.push('/dex-swap');
  };

  // ctrl+s => open swap
  const onKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      onClickSwap();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const brandIcon = useWalletConnectIcon(currentAccount);
  const { t } = useTranslation();

  return (
    <>
      <div
        className={clsx('dashboard', 'h-full', {
          'metamask-active': showGnosisWrongChainAlert && isGnosis,
        })}
      >
        <div
          className={clsx('main flex flex-col', showChain && 'show-chain-bg')}
        >
          {currentAccount && (
            <>
              <div className="flex p-[12px] gap-[10px] m-auto w-full items-center mb-[12px]">
                <div
                  className="flex items-center justify-center flex-col"
                  onClick={switchAddress}
                >
                  <img
                    className={clsx(
                      'icon w-[32px] h-[32px]',
                      opacity60 && 'opacity-60'
                    )}
                    src={
                      brandIcon ||
                      WALLET_BRAND_CONTENT[currentAccount.brandName]?.image ||
                      KEYRING_ICONS_WHITE[currentAccount.type]
                    }
                  />
                  <CommonSignal
                    type={currentAccount.type}
                    brandName={currentAccount.brandName}
                    address={currentAccount.address}
                  />
                </div>
                <div className="flex-1 flex flex-col" onClick={switchAddress}>
                  <div className="flex gap-[8px]">
                    <div
                      className="text-white font-semibold"
                      title={displayName}
                    >
                      {displayName}
                    </div>
                    <div className="font-semibold text-[#7A7A7A]">
                      <BalanceInfo
                        currentAccount={currentAccount}
                        accountBalanceUpdateNonce={accountBalanceUpdateNonce}
                      />
                    </div>
                  </div>
                  <div>
                    <AddressViewer
                      address={currentAccount.address}
                      showArrow={false}
                      className={'text-12 text-[#7A7A7A]'}
                    />
                  </div>
                </div>
                <div
                  className="flex items-center justify-center text-12 text-[#3D3D3D] hover:text-white cursor-pointer"
                  onClick={onClickSettings}
                >
                  <IconSettings />
                </div>
              </div>
            </>
          )}
          {/* {currentAccount && (
            <div
              className={clsx('flex header items-center relative', topAnimate)}
            >
              <div
                className="h-[36px] flex header-wrapper items-center relative"
                onClick={switchAddress}
              >
                <Popover
                  content={null}
                  trigger="click"
                  visible={false}
                  placement="bottomLeft"
                  overlayClassName="switch-popover"
                >
                  <div className="relative mr-[4px]">
                    <img
                      className={clsx(
                        'icon w-[24px] h-[24px]',
                        opacity60 && 'opacity-60'
                      )}
                      src={
                        brandIcon ||
                        WALLET_BRAND_CONTENT[currentAccount.brandName]?.image ||
                        KEYRING_ICONS_WHITE[currentAccount.type]
                      }
                    />
                    <CommonSignal
                      type={currentAccount.type}
                      brandName={currentAccount.brandName}
                      address={currentAccount.address}
                    />
                  </div>
                  <div
                    className="text-15 text-white ml-6 mr-6 dashboard-name"
                    title={displayName}
                  >
                    {displayName}
                  </div>
                  <div className="current-address">
                    {currentAccount && (
                      <AddressViewer
                        address={currentAccount.address}
                        showArrow={false}
                        className={'text-12 text-white opacity-60'}
                      />
                    )}
                  </div>
                  <IconArrowRight className="ml-8" />
                </Popover>
              </div>

              <RcIconCopy
                className="copyAddr"
                onClick={() => {
                  copyAddress(currentAccount.address);
                  matomoRequestEvent({
                    category: 'AccountInfo',
                    action: 'headCopyAddress',
                    label: [
                      getKRCategoryByType(currentAccount?.type),
                      currentAccount?.brandName,
                    ].join('|'),
                  });
                }}
              />

              <div
                className="ml-auto w-[36px] h-[36px] bg-white bg-opacity-[0.12] hover:bg-opacity-[0.3] backdrop-blur-[20px] rounded-[6px] flex items-center justify-center cursor-pointer"
                role="button"
                onClick={gotoAddAddress}
              >
                <IconAddAddress className="text-white w-[20px] h-[20px]" />
              </div>
            </div>
          )} */}
          {/* <BalanceView
            currentAccount={currentAccount}
            accountBalanceUpdateNonce={accountBalanceUpdateNonce}
          /> */}
          {isGnosis ? (
            <Queue
              count={gnosisPendingCount || 0}
              className={clsx(
                'transition-all',
                showChain ? 'opacity-0 pointer-events-none' : 'opacity-100'
              )}
            />
          ) : (
            pendingTxCount > 0 &&
            !showChain && <PendingTxs pendingTxCount={pendingTxCount} />
          )}
        </div>
        <section className="flex w-full flex-col h-full justify-between pb-[0px] px-[12px]">
          {/* <main className="flex items-center justify-center flex-col gap-[12px]">
            <div className="flex flex-col w-[240px] h-[240px] relative gap-[24px] items-center justify-center">
              <div className="absolute z-[100] top-0 left-0 w-full h-full animate-spin duration-[5000]">
                <SvgViaScore width={240} height={240} />
              </div>
              <div className="flex flex-col text-[#3D3D3D] items-center justify-center">
                <div className="text-[14px] text-[#7A7A7A]">Total</div>
                <div className="text-[32px] font-semibold">
                  <span className="text-white">1,492</span>.219
                </div>
              </div>
              <div className="flex flex-col text-[#7A7A7A] items-center justify-center">
                <div>Ads viewed</div>
                <div className="text-white font-semibold">41,120</div>
              </div>
            </div>
            <div className="flex justify-between mt-[26px] w-full">
              <div className="flex flex-col items-center justify-center w-full gap-[12px]">
                <div>Ads viewed</div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-white font-semibold text-[24px] ">
                    46
                  </div>
                  <div className="text-[#529A66] text-[12px] ">+21</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-[12px]">
                <div>Earned tokens</div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-white font-semibold text-[24px] ">
                    4.621
                  </div>
                  <div className="text-[#529A66] text-[12px] ">+12</div>
                </div>
              </div>
            </div>
          </main>
          <footer className="py-[14px] flex justify-between items-center">
            <div>Claimable tokens</div>
            <div className="flex gap-[12px] items-center">
              <div className="text-white font-semibold">12.921</div>
              <button className="p-[6px] bg-buttonGradient rounded text-12 font-semibold text-white/80 active:scale-125 transition-all hover:opacity/80">
                Claim
              </button>
            </div>
          </footer> */}
          <main>
            <div className="bg-[#0F0F0F] flex gap-[10px] rounded-md p-[12px] justify-between items-center">
              <div className="flex gap-[24px] w-full items-center justify-center">
                <div className="flex flex-col text-center">
                  <div className="text-12">Points balance</div>
                  <div className="text-[24px] text-white">
                    {formatPoints(viaScore.scoreTotal)}
                  </div>
                </div>
              </div>
              {/* <div>
                <button className="w-[32px] h-[32px] bg-refreshGradient flex items-center justify-center rounded-full hover:scale-150 active:scale-150 transition-all">
                  <RefreshIcon />
                </button>
              </div> */}
            </div>

            <div className="mx-[10px] flex flex-col px-[12px]">
              <div className="flex justify-between items-center text-[14px] gap-[12px] py-[10px]">
                <div className="text-gray-subTitle">Watched paid ads</div>
                <div className="text-label-text">
                  {viaScore.ads?.adsWatchedCount}
                </div>
              </div>
              <div className="flex justify-between items-center text-[14px] gap-[12px] py-[10px]">
                <div className="text-gray-subTitle">
                  Watched paid ads in the last 7 days
                </div>
                <div className="text-label-text">
                  +{viaScore.ads.adsWatchedCount7d}
                </div>
              </div>
              <div className="flex justify-between items-center text-[14px] gap-[12px] py-[10px]">
                <div className="text-gray-subTitle">
                  Points earned for ads in the last 7 days
                </div>
                <div className="text-label-text">
                  {viaScore.ads.adsWatchedPoints7d}
                </div>
              </div>
            </div>

            <button
              onClick={onClickQuestsList}
              className="p-[12px] flex gap-[12px] justify-between items-center border border-[#333] rounded-md bg-[#1F1F1F] shadow-default hover:bg-[#292929] transition-all w-full"
            >
              <div className="flex gap-[12px] items-center justify-center">
                <div className="w-[32px] h-[32px] rounded-[20px] bg-[#1F1F1F] flex items-center justify-center">
                  <MoneyCashIcon />
                </div>
                <div className="text-[14px] text-[#CCC]">
                  How to earn more points
                </div>
              </div>
              <div className="flex gap-[12px] items-center justify-center text-[12px] text-[#525252]">
                <div>Read more</div>
                <div>
                  <ArrowRightIcon width={16} height={16} />
                </div>
              </div>
            </button>
          </main>
          <footer className="flex flex-col">
            {refferalLink && (
              <div
                onClick={onCopyRefferalLink}
                className="cursor-pointer pt-[12px] pb-[24px] flex flex-col gap-[10px] w-full"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-[10px] text-[14px]">
                    <div className="text-white font-semibold">
                      Invite friend
                    </div>
                    <div className="text-[#A3A3A3]">
                      $2 + 1000 points per friend
                    </div>
                  </div>
                  <div>{/* People points */}</div>
                </div>
                <div className="px-[8px] gap-[10px] flex bg-[#0F0F0F] rounded border border-[#333] w-full py-[2px] justify-between">
                  <div className="text-[#CCC]">{refferalLink}</div>
                  <div className="text-[#666]">Copy</div>
                </div>
              </div>
            )}
            <button
              className="py-[16px] px-[24px] mx-[-24px] flex justify-between items-center gap-[12px] bg-[#0F0F0F]"
              onClick={onClickSwap}
            >
              {/*
              <div className="w-[32px] h-[32px] rounded-[20px] bg-[#1F1F1F]">
                <MainLockIcon />
              </div>
               */}
              <div>&nbsp;</div>
              <div className="text-gray-subTitle">
                <span className="text-[#CCC] font-semibold">
                  Open Ally Swap
                </span>{' '}
              </div>
              <div className="text-[#3D3D3D]">⌥ S</div>
            </button>
          </footer>
        </section>
        {/* <ChainAndSiteSelector
          onChange={(currentConnection) => {
            dispatch.chains.setField({ currentConnection });
          }}
          connectionAnimation={connectionAnimation}
          showDrawer={showToken || showAssets || showNFT}
          hideAllList={hideAllList}
          gnosisPendingCount={gnosisPendingCount}
          isGnosis={isGnosis}
          higherBottom={isGnosis}
          setDashboardReload={() => setDashboardReload(true)}
        /> */}
        {showGnosisAlert && <GnosisWrongChainAlertBar />}
      </div>
      <Modal
        visible={firstNotice && updateContent}
        title={t('page.dashboard.home.whatsNew')}
        className="first-notice"
        onCancel={() => {
          dispatch.appVersion.afterFirstLogin();
        }}
        maxHeight="420px"
      >
        <ReactMarkdown children={updateContent} remarkPlugins={[remarkGfm]} />
      </Modal>
      <Modal
        visible={hovered}
        closable={false}
        onCancel={() => {
          setHovered(false);
          setStartEdit(false);
        }}
        className="address-popover"
      >
        <div
          className="flex flex-col items-center"
          onClick={() => setStartEdit(false)}
        >
          <div className="address-popover__info">
            <div className="left-container">
              <div className="flex items-center w-[188px]">
                <div className="brand-name">
                  {startEdit ? (
                    <Input
                      value={alianName}
                      defaultValue={alianName}
                      onChange={handleAlianNameChange}
                      onPressEnter={alianNameConfirm}
                      autoFocus={startEdit}
                      onClick={(e) => e.stopPropagation()}
                      maxLength={50}
                      min={0}
                      style={{ zIndex: 10 }}
                    />
                  ) : (
                    <span title={displayName} className="alias">
                      {displayName}
                    </span>
                  )}
                  {!startEdit && (
                    <img
                      className="edit-name"
                      src={IconEditPen}
                      onClick={(e) => {
                        e.stopPropagation();
                        setStartEdit(true);
                      }}
                    />
                  )}
                </div>
                {startEdit && (
                  <img
                    className="edit-name w-[16px] h-[16px]"
                    src={alianName ? IconCorrect : IconUnCorrect}
                    onClick={(e) => {
                      e.stopPropagation();
                      alianNameConfirm(e);
                    }}
                  />
                )}
              </div>
              <div className="address-display">
                {currentAccount?.address.toLowerCase()}{' '}
                <img
                  onClick={handleCopyCurrentAddress}
                  src={IconAddressCopy}
                  id={'copyIcon'}
                  className={clsx(
                    'ml-7 inline-block mb-2  w-[16px] h-[16px] pointer',
                    {
                      success: copySuccess,
                    }
                  )}
                />
              </div>
              <div className="import">
                {currentAccount && (
                  <img
                    className="icon icon-account-type w-[16px] h-[16px] pb-1 inline-block"
                    src={
                      KEYRING_ICONS[currentAccount.type] ||
                      WALLET_BRAND_CONTENT[currentAccount.brandName]?.image
                    }
                  />
                )}{' '}
                {(currentAccount?.type &&
                  KEYRING_TYPE_TEXT[currentAccount?.type]) ||
                  (currentAccount && (
                    <Trans
                      i18nKey="page.dashboard.home.importType"
                      values={{
                        type:
                          WALLET_BRAND_CONTENT[currentAccount?.brandName]?.name,
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className="qrcode-container">
              <QRCode value={currentAccount?.address} size={100} />
            </div>
          </div>
        </div>
      </Modal>
      {/* {!(showToken || showAssets || showNFT) && <DefaultWalletSetting />} */}
      {pendingApprovalCount > 0 && (
        <PendingApproval
          onRejectAll={() => {
            setPendingApprovalCount(0);
          }}
          count={pendingApprovalCount}
        />
      )}
    </>
  );
};

export default connectStore()(Dashboard);
