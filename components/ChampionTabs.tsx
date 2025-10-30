'use client';

import { useState } from 'react';
import { Champion, ChampionSummary } from '@/types/champion';
import BuildTab from './champion-tabs/BuildTab';
import CountersTab from './champion-tabs/CountersTab';
import ItemsTab from './champion-tabs/ItemsTab';
import RunesTab from './champion-tabs/RunesTab';

interface ChampionTabsProps {
  champion: Champion;
  allChampions: ChampionSummary[];
  counters: ChampionSummary[];
}

type TabKey = 'build' | 'counters' | 'items' | 'runes';

export default function ChampionTabs({ champion, allChampions, counters }: ChampionTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('build');
  
  const tabs = [
    { key: 'build' as TabKey, label: 'Build', icon: '⚔️' },
    { key: 'counters' as TabKey, label: 'Counters', icon: '⚖️' },
    { key: 'items' as TabKey, label: 'Items', icon: '🛡️' },
    { key: 'runes' as TabKey, label: 'Runes', icon: '✨' },
  ];
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-4 font-semibold text-center transition-colors relative ${
                activeTab === tab.key
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'build' && (
          <BuildTab champion={champion} allChampions={allChampions} counters={counters} />
        )}
        {activeTab === 'counters' && (
          <CountersTab champion={champion} allChampions={allChampions} />
        )}
        {activeTab === 'items' && (
          <ItemsTab champion={champion} />
        )}
        {activeTab === 'runes' && (
          <RunesTab champion={champion} />
        )}
      </div>
    </div>
  );
}

