'use client';

import Image from 'next/image';
import { Champion } from '@/types/champion';
import { generateRunePages } from '@/lib/builds';
import { RUNE_TREES, STAT_SHARDS } from '@/types/runes';
import RuneDisplay from '../RuneDisplay';

interface RunesTabProps {
  champion: Champion;
}

export default function RunesTab({ champion }: RunesTabProps) {
  const runePages = generateRunePages(champion.id);
  
  return (
    <div className="space-y-6">
      {/* Popular Rune Pages */}
      <div className="space-y-4">
        {runePages.map((runePage, idx) => {
          const primaryTree = RUNE_TREES.find(t => t.id === runePage.primaryTree);
          const secondaryTree = RUNE_TREES.find(t => t.id === runePage.secondaryTree);
          
          if (!primaryTree || !secondaryTree) return null;
          
          // Find all runes
          const keystone = Object.values(primaryTree.slots.keystones).find(r => r.id === runePage.keystone);
          const primaryRunes = runePage.primaryRunes.map(id => 
            Object.values(primaryTree.slots).flat().find(r => r.id === id)
          );
          const secondaryRunes = runePage.secondaryRunes.map(id =>
            Object.values(secondaryTree.slots).flat().find(r => r.id === id)
          );
          
          return (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
              {/* Header with stats */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Rune Page {idx + 1}
                    {idx === 0 && <span className="ml-2 text-sm font-normal text-blue-600 dark:text-blue-400">(Most Popular)</span>}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Pick Rate:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{runePage.pickRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Win Rate:</span>
                      <span className={`font-semibold ${runePage.winRate >= 52 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                        {runePage.winRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Games:</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{runePage.games.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Compact display */}
                <div className="hidden lg:block">
                  <RuneDisplay runePage={runePage} size="small" />
                </div>
              </div>
              
              {/* Detailed rune display */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Primary Tree */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={primaryTree.icon}
                      alt={primaryTree.name}
                      width={32}
                      height={32}
                      className="opacity-80"
                    />
                    <h4 className="font-bold text-slate-900 dark:text-white">{primaryTree.name}</h4>
                  </div>
                  
                  {/* Keystone */}
                  {keystone && (
                    <div className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg border-2 border-amber-500">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-zinc-900 border-2 border-amber-500 flex-shrink-0">
                          <Image
                            src={keystone.icon}
                            alt={keystone.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{keystone.name}</div>
                          <div className="text-xs text-slate-500 mt-1">Keystone</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Primary runes */}
                  <div className="space-y-2">
                    {primaryRunes.map((rune, runeIdx) => rune && (
                      <div key={runeIdx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 flex-shrink-0">
                          <Image
                            src={rune.icon}
                            alt={rune.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{rune.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Secondary Tree */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={secondaryTree.icon}
                      alt={secondaryTree.name}
                      width={28}
                      height={28}
                      className="opacity-70"
                    />
                    <h4 className="font-bold text-slate-900 dark:text-white">{secondaryTree.name}</h4>
                    <span className="text-xs text-slate-500">(Secondary)</span>
                  </div>
                  
                  {/* Secondary runes */}
                  <div className="space-y-2">
                    {secondaryRunes.map((rune, runeIdx) => rune && (
                      <div key={runeIdx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 flex-shrink-0">
                          <Image
                            src={rune.icon}
                            alt={rune.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">{rune.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stat Shards */}
                  <div className="mt-6">
                    <h5 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Stat Shards</h5>
                    <div className="space-y-2">
                      {runePage.statShards.map((shardId, shardIdx) => {
                        const shards = shardIdx === 0 ? STAT_SHARDS.offense : shardIdx === 1 ? STAT_SHARDS.flex : STAT_SHARDS.defense;
                        const shard = shards.find(s => s.id === shardId);
                        return shard && (
                          <div key={shardIdx} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-base flex-shrink-0">
                              {shardIdx === 0 ? '⚔️' : shardIdx === 1 ? '🛡️' : '❤️'}
                            </div>
                            <div className="text-xs text-slate-700 dark:text-slate-300">{shard.value}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rune explanation */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">📖</div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">About Runes</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              These rune pages are generated based on {champion.name}'s most popular builds across all skill levels. 
              The primary tree provides your keystone and three additional runes, while the secondary tree adds two more perks. 
              Stat shards provide small bonuses to offense, defense, and flex stats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

