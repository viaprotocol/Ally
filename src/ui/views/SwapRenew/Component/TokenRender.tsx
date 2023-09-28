import { TokenWithChain } from '@/ui/component';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconRcArrowDownTriangle } from '@/ui/assets/swap/arrow-caret-down.svg';
import { TokenItem } from '@rabby-wallet/rabby-api/dist/types';
import { getTokenSymbol } from '@/ui/utils/token';
import { useTranslation } from 'react-i18next';
const TokenRenderWrapper = styled.div`
  width: 150px;
  height: 46px;
  background: #1c1c1c;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 12px;
  font-weight: 500;
  font-size: 18px;
  color: #ccc;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    background: #292929;
  }
  .token {
    display: flex;
    flex: 1;
    gap: 8px;
    align-items: center;

    .text {
      max-width: 68px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .select {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }
  .arrow {
    margin-left: auto;
    font-size: 12px;
    opacity: 0.8;
    width: 18px;
    height: 18px;
  }
`;
export const TokenRender = ({
  openTokenModal,
  token,
}: {
  token?: TokenItem | undefined;
  openTokenModal: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <TokenRenderWrapper onClick={openTokenModal}>
      {token ? (
        <div className="token">
          <TokenWithChain
            width="24px"
            height="24px"
            token={token}
            hideConer
            hideChainIcon
          />
          <span className="text" title={getTokenSymbol(token)}>
            {getTokenSymbol(token)}
          </span>
          <IconRcArrowDownTriangle viewBox="0 0 24 24" className="arrow" />
        </div>
      ) : (
        <div className="select">
          <span>{t('page.swap.select-token')}</span>
          <IconRcArrowDownTriangle viewBox="0 0 24 24" className="arrow" />
        </div>
      )}
    </TokenRenderWrapper>
  );
};
