import { PageHeader } from '@/ui/component';
import { ViaScoreLevel } from '@/ui/models/via';
import { useRabbyGetter } from '@/ui/store';
import React from 'react';

function RenderQuests({ quests }: { quests: ViaScoreLevel[] }) {
  return (
    <div>
      {quests.map((level) => {
        <div>
          <div>{level.name}</div>
          <div>{level.points}</div>
        </div>;
      })}
    </div>
  );
}

function ViaQuests() {
  const levels = useRabbyGetter((s) => s.viaScore.getLevels);
  return (
    <div className="page-address-management px-0 overflow-hidden">
      <PageHeader className="pt-[24px] mx-[20px]">
        <div className="text-[20px] font-medium">How to earn more points</div>
      </PageHeader>

      {levels ? (
        <div>
          {levels.available && (
            <div>
              <div>Available</div>
              <RenderQuests quests={levels.available} />
            </div>
          )}

          {levels.completed && (
            <div>
              <div>Received</div>
              <RenderQuests quests={levels.completed} />
            </div>
          )}

          {levels.unavailable && (
            <div>
              <div>Unavailable</div>
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
