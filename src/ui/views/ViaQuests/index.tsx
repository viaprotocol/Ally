import { VIA_SCORE_URL } from '@/constant/via';
import { PageHeader } from '@/ui/component';
import { ViaScoreLevel } from '@/ui/models/via';
import { useRabbyGetter } from '@/ui/store';
import React, { PropsWithChildren } from 'react';
import { useViaRefferalLink } from '@/ui/utils/via';

import './style.less';

function RenderQuests({
  quests,
  children,
}: PropsWithChildren<{ quests: ViaScoreLevel[] }>) {
  return (
    <div className="flex flex-col gap-[12px]">
      {children}
      {quests.map((level) => (
        <div
          key={level.slug}
          className="p-[12px] bg-[#1F1F1F] rounded-[6px] flex flex-col gap-[12px] border border-[#333] "
        >
          <div className="flex flex-col ">
            <div className="text-white font-semibold">{level.name}</div>
            <div className="text-[#7A7A7A]">+{level.points} points</div>
          </div>
          {level.description && (
            <div className="p-[12px] text-white/60 text-[14px] bg-white/5 rounded-[4px] ">
              {level.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ViaQuests() {
  const { refferalLink, onCopyRefferalLink } = useViaRefferalLink();
  const levels = useRabbyGetter((s) => s.viaScore.getLevels);
  const referrals = useRabbyGetter((s) => s.viaScore.getReferralInfo);
  return (
    <div className="page-via-quests px-0 overflow-hidden">
      <PageHeader className="pt-[24px] mx-[20px]">
        <div className="text-[20px] font-medium">How to earn more points</div>
      </PageHeader>

      {levels ? (
        <div className="flex flex-col px-[12px] gap-[12px] overflow-scroll h-full">
          {!!levels.available?.length && (
            <div>
              <div className="font-semibold text-white pb-[12px] pl-[12px]">
                Available
              </div>
              <RenderQuests quests={levels.available}>
                {referrals ? (
                  <div className="p-[12px] bg-[#1F1F1F] rounded-[6px] flex flex-col gap-[12px] border border-[#333] ">
                    <div className="flex flex-col ">
                      <div className="text-white font-semibold">
                        Invite friends
                      </div>
                      <div className="text-[#7A7A7A]">
                        +100 points for each new user
                      </div>
                    </div>
                    <div className="p-[12px] text-white/60 text-[14px] bg-white/5 rounded-[4px]">
                      <div
                        onClick={onCopyRefferalLink}
                        className="mb-[10px] bg-[#1F1F1F] rounded px-[8px] gap-[10px] flex justify-between"
                      >
                        <div className="text-[14px] text-white">
                          {refferalLink}
                        </div>
                        <button className="text-white/40">Copy</button>
                      </div>
                      Get points for each person who installs and activates
                      Companion through your link
                    </div>
                  </div>
                ) : null}
              </RenderQuests>
            </div>
          )}

          {!!levels.completed?.length && (
            <div>
              <div className="font-semibold text-white pb-[12px] pl-[12px]">
                Received
              </div>
              <RenderQuests quests={levels.completed} />
            </div>
          )}

          {!!levels.unavailable?.length && (
            <div>
              <div className="font-semibold text-white pb-[12px] pl-[12px]">
                Unavailable
              </div>
              <RenderQuests quests={levels.unavailable} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          No available quests yet! Please, return later
        </div>
      )}
    </div>
  );
}

export { ViaQuests };
