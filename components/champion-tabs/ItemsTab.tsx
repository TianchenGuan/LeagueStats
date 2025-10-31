'use client';

import Image from 'next/image';
import { Champion } from '@/types/champion';
import { getRealTopItems, getChampionStats } from '@/lib/real-statistics';
import { getItemName, getItemIconPath } from '@/lib/item-names';
import { shouldShowIcons, shouldShowText } from '@/lib/ui-config';

interface ItemsTabProps {
  champion: Champion;
}

export default function ItemsTab({ champion }: ItemsTabProps) {
  const stats = getChampionStats(champion);
  const realItems = getRealTopItems(champion.id);
  
  return (
    <div className="space-y-4">
      {/* Most Purchased Items */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Most Purchased Items</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Based on {stats.games.toLocaleString()} real games
          </p>
        </div>
        
        {realItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {realItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-zinc-700">
                {shouldShowIcons() && (
                  <div 
                    className="relative w-16 h-16 rounded border-2 border-amber-500 overflow-hidden bg-zinc-900 flex-shrink-0"
                    title={getItemName(item.itemId)}
                  >
                    <Image
                      src={getItemIconPath(item.itemId)}
                      alt={getItemName(item.itemId)}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  {shouldShowText() && (
                    <>
                      <div className="font-medium text-sm text-slate-900 dark:text-white">
                        {getItemName(item.itemId)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Purchased {item.count.toLocaleString()} times
                      </div>
                    </>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {item.pickRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500">pick rate</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-slate-50 dark:bg-zinc-800 rounded-lg text-center">
            <div className="text-slate-500 dark:text-slate-400">
              No real item data available for this champion
            </div>
            <div className="text-xs text-slate-400 mt-2">
              This champion may not have enough games in the dataset
            </div>
          </div>
        )}
      </div>
      
      {/* Item Statistics Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">📊</div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">About Item Data</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              These items are the most frequently purchased by players in ranked games. 
              Pick rates show how often each item appears in {champion.name}'s builds.
              Item icons may not display for older/removed items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

