import { Button, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionsContainer, Props } from './ActionsContainer';
import clsx from 'clsx';
import { ReactComponent as IconClose } from 'ui/assets/close-white.svg';

export const SubmitActions: React.FC<Props> = ({
  disabledProcess,
  onSubmit,
  onCancel,
  tooltipContent,
  enableTooltip,
}) => {
  const { t } = useTranslation();
  const [isSign, setIsSign] = React.useState(false);

  const handleClickSign = React.useCallback(() => {
    setIsSign(true);
  }, []);

  const handleClickConfirm = React.useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const handleClickCancel = React.useCallback(() => {
    setIsSign(false);
  }, []);

  return (
    <ActionsContainer onCancel={onCancel}>
      {isSign ? (
        <div
          className={clsx(
            'rounded-[8px] h-[48px]',
            'flex items-center',
            'relative',
            'before:absolute before:right-[60px]',
            'before:bg-[#333333]',
            'before:h-[32px] before:w-1',
            'hover:before:hidden',
            'overflow-hidden'
          )}
        >
          <button
            className="w-[184px] h-full main-button"
            onClick={handleClickConfirm}
          >
            {t('global.confirmButton')}
          </button>
          <button
            className={clsx(
              'w-[60px] h-full main-button',
              'flex justify-center items-center'
            )}
            onClick={handleClickCancel}
          >
            <IconClose />
          </button>
        </div>
      ) : (
        <Tooltip
          overlayClassName="rectangle sign-tx-forbidden-tooltip"
          title={enableTooltip ? tooltipContent : null}
        >
          <div>
            <Button
              disabled={disabledProcess}
              type="primary"
              className={clsx(
                'w-[246px] h-[48px] rounded-[8px] main-button',
                'before:content-none'
              )}
              onClick={handleClickSign}
            >
              {t('page.signFooterBar.signAndSubmitButton')}
            </Button>
          </div>
        </Tooltip>
      )}
    </ActionsContainer>
  );
};
