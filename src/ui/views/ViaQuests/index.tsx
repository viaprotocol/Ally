import { PageHeader } from '@/ui/component';
import { useRabbyGetter } from '@/ui/store';
import React from 'react';

function ViaQuests() {
  const levels = useRabbyGetter((s) => s.viaScore.getLevels);
  return (
    <div className="page-address-management px-0 overflow-hidden">
      <PageHeader className="pt-[24px] mx-[20px]">
        <div className="text-[20px] font-medium">How to earn more points</div>
      </PageHeader>

      {levels ? (
        <div>
          <div>Available</div>
          <div>
            {levels.available.map((level) => {
              <div>
                <div>{level.name}</div>
                <div>{level.points}</div>
              </div>;
            })}
          </div>
        </div>
      ) : (
        <div>No available quests yet! Please, return later</div>
      )}
    </div>
  );
}

export { ViaQuests };
