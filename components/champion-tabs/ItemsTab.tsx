'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Champion } from '@/types/champion';
import { generateItemBuilds, generateItemStatistics, getRecommendedBoots, getRecommendedStarters } from '@/lib/builds';
import { POPULAR_ITEMS } from '@/types/items';

interface ItemsTabProps {
  champion: Champion;
}

type ItemView = 'builds' | 'items' | 'boots' | 'starters';

export default function ItemsTab({ champion }: ItemsTabProps) {
  const [view, setView] = useState<ItemView>('builds');
  const builds = generateItemBuilds(champion.id);
  const items = generateItemStatistics(champion.id);
  const boots = getRecommendedBoots(champion.id);
  const starters = getRecommendedStarters(champion.id);
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-2 border border-slate-200 dark:border-zinc-800">
        <div className="flex gap-2">
          {[
            { key: 'builds' as ItemView, label: 'Core Builds' },
            { key: 'items' as ItemView, label: 'All Items' },
            { key: 'boots' as ItemView, label: 'Boots' },
            { key: 'starters' as ItemView, label: 'Starters' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Core Builds View */}
      {view === 'builds' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Popular Item Builds</h2>
            <div className="space-y-4">
              {builds.map((build, idx) => {
                const buildItems = build.items.map(id => POPULAR_ITEMS.find(item => item.id === id)).filter(Boolean);
                
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-750 transition-colors">
                    {/* Items */}
                    <div className="flex items-center gap-2 flex-1">
                      {buildItems.map((item, itemIdx) => item && (
                        <div key={itemIdx} className="relative group">
                          <div className="w-14 h-14 rounded border-2 border-amber-500 overflow-hidden bg-zinc-900">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                            <div className="font-bold">{item.name}</div>
                            <div className="text-amber-400">{item.cost}g</div>
                          </div>
                        </div>
                      ))}
                      {buildItems.length < 6 && (
                        <div className="text-slate-400 dark:text-slate-600 text-sm ml-2">+ more...</div>
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Pick Rate</div>
                        <div className="font-semibold text-blue-600 dark:text-blue-400">{build.pickRate.toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Win Rate</div>
                        <div className={`font-semibold ${build.winRate >= 52 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                          {build.winRate.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Games</div>
                        <div className="font-medium text-slate-700 dark:text-slate-300">{build.games.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* All Items View */}
      {view === 'items' && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Pick Rate
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Games
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
                {items.slice(0, 30).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded border-2 border-slate-200 dark:border-zinc-700 overflow-hidden bg-zinc-900">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-slate-900 dark:text-white">
                            {item.name}
                          </div>
                          {item.mythic && (
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded mt-1">
                              Mythic
                            </span>
                          )}
                          {item.legendary && (
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded mt-1">
                              Legendary
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {item.pickRate.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className={`text-sm font-semibold ${item.winRate >= 52 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                        {item.winRate.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {item.games.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        {item.cost}g
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Boots View */}
      {view === 'boots' && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Boot Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boots.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                <div className="relative w-16 h-16 rounded border-2 border-amber-500 overflow-hidden bg-zinc-900 flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 dark:text-white truncate">{item.name}</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">{item.cost}g</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.pickRate.toFixed(1)}%</div>
                  <div className="text-xs text-slate-500">{item.winRate.toFixed(1)}% WR</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Starters View */}
      {view === 'starters' && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Starting Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {starters.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                <div className="relative w-16 h-16 rounded border-2 border-emerald-500 overflow-hidden bg-zinc-900 flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 dark:text-white truncate">{item.name}</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">{item.cost}g</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.pickRate.toFixed(1)}%</div>
                  <div className="text-xs text-slate-500">{item.winRate.toFixed(1)}% WR</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

