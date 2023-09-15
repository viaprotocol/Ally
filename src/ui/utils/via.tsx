import { VIA_SCORE_URL } from '@/constant/via';
import React, { useMemo } from 'react';
import { useRabbyGetter } from '../store';
import { copyTextToClipboard } from './clipboard';

import IconSuccess from 'ui/assets/success.svg';
import { message } from 'antd';
import { t } from '@/utils';

function useViaRefferalLink() {
  const refferalInfo = useRabbyGetter((s) => s.viaScore.getReferralInfo);

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

    copyTextToClipboard(refferalLink).then(() => {
      message.success({
        icon: <img src={IconSuccess} className="icon icon-success" />,
        content: t('global.copied'),
        duration: 0.5,
      });
    });
  }, [refferalLink]);

  return { refferalLink, onCopyRefferalLink };
}

export { useViaRefferalLink };
