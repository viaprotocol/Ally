import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Account } from '@/background/service/preference';
import { Chain } from '@debank/common';

export interface Props {
  onSubmit(): void;
  onCancel(): void;
  account: Account;
  disabledProcess: boolean;
  enableTooltip?: boolean;
  tooltipContent?: React.ReactNode;
  children?: React.ReactNode;
  chain?: Chain;
}

export const ActionsContainer: React.FC<Pick<Props, 'onCancel'>> = ({
  children,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-[12px] relative justify-end">
      {children}
      <Button
        type="ghost"
        className={clsx(
          'w-[102px] h-[48px] border-[#464646] text-[#ccc]',
          'hover:bg-[#292929] active:bg-[#333333]',
          'rounded-[8px]',
          'before:content-none',
          'z-10'
        )}
        onClick={onCancel}
      >
        {t('global.cancelButton')}
      </Button>
    </div>
  );
};
