'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Champion, ChampionSummary } from '@/types/champion';
import { getMostPopularRunePage, getSynergyChampions } from '@/lib/builds';
import { getChampionIconPath, championNameToSlug } from '@/lib/utils';
import { getChampionStats, getRealTopItems } from '@/lib/real-statistics';
import { getSummonerSpellName, getSummonerSpellIconPath } from '@/lib/summoner-spells';
import { getItemName, getItemIconPath } from '@/lib/item-names';
import RuneDisplay from '../RuneDisplay';

interface BuildTabProps {
  champion: Champion;
  allChampions: ChampionSummary[];
  counters: ChampionSummary[];
}

export default function BuildTab({ champion, allChampions, counters }: BuildTabProps) {
  const runePage = getMostPopularRunePage(champion.id);
  const synergies = getSynergyChampions(champion.id, allChampions, 5);
  const stats = getChampionStats(champion);
  
  // Get real top items for this champion
  const realItems = getRealTopItems(champion.id);
  const topItemIds = realItems.slice(0, 4).map(item => item.itemId); // Top 4 core items
  
  return (
    <div className="space-y-6">
      {/* Core Build Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Core Build</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Runes & Summoner Spells */}
          <div className="space-y-4">
            {/* Runes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Recommended Runes</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                <RuneDisplay runePage={runePage} size="medium" />
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{runePage.winRate.toFixed(1)}% WR</div>
                  <div className="text-xs text-slate-500">{runePage.pickRate.toFixed(1)}% PR</div>
                  <div className="text-xs text-slate-500">{runePage.games.toLocaleString()} games</div>
                </div>
              </div>
            </div>
            
            {/* Summoner Spells */}
            {stats.topSummonerSpells && stats.topSummonerSpells.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Summoner Spells</h3>
                <div className="space-y-2">
                  {stats.topSummonerSpells.slice(0, 3).map((combo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded overflow-hidden border border-slate-300 dark:border-zinc-700">
                            <Image
                              src={getSummonerSpellIconPath(combo.ss1)}
                              alt={getSummonerSpellName(combo.ss1)}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {getSummonerSpellName(combo.ss1)}
                          </span>
                        </div>
                        <span className="text-slate-400">+</span>
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded overflow-hidden border border-slate-300 dark:border-zinc-700">
                            <Image
                              src={getSummonerSpellIconPath(combo.ss2)}
                              alt={getSummonerSpellName(combo.ss2)}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {getSummonerSpellName(combo.ss2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">{combo.count.toLocaleString()} games</div>
                        <div className="text-xs text-slate-400">
                          {((combo.count / stats.games) * 100).toFixed(1)}% pick rate
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Items */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Core Items (From Real Games)</h3>
            {realItems.length > 0 ? (
              <div className="space-y-2">
                {realItems.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                    <div className="relative w-12 h-12 rounded border-2 border-amber-500 overflow-hidden bg-zinc-900 flex-shrink-0">
                      <Image
                        src={getItemIconPath(item.itemId)}
                        alt={getItemName(item.itemId)}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{getItemName(item.itemId)}</div>
                      <div className="text-xs text-slate-500">Purchased {item.count.toLocaleString()} times</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.pickRate.toFixed(1)}%</div>
                      <div className="text-xs text-slate-500">pick rate</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg text-sm text-slate-500 text-center">
                No real item data available for this champion
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Counters & Synergies */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strong Against */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Strong Against</h2>
          <div className="space-y-2">
            {counters.slice(0, 5).map((counter) => (
              <Link
                key={counter.id}
                href={`/champions/${championNameToSlug(counter.name)}`}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500">
                  <Image
                    src={getChampionIconPath(counter.id)}
                    alt={counter.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 dark:text-white truncate">{counter.name}</div>
                  <div className="text-xs text-slate-500">{counter.title}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>+</span>
                  <span>{(55 + (counter.id % 5)).toFixed(1)}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Good With */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Good With</h2>
          <div className="space-y-2">
            {synergies.map((synergy) => (
              <Link
                key={synergy.id}
                href={`/champions/${championNameToSlug(synergy.name)}`}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image
                    src={getChampionIconPath(synergy.id)}
                    alt={synergy.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 dark:text-white truncate">{synergy.name}</div>
                  <div className="text-xs text-slate-500">{synergy.title}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{(52 + (synergy.id % 4)).toFixed(1)}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Tips</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {champion.name} excels at {champion.roles.join(', ')} playstyle. Focus on utilizing their abilities effectively 
              and building around their core strengths. The recommended runes and items provide the best balance of damage and utility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

