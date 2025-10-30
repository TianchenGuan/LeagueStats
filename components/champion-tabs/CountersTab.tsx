'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Champion, ChampionSummary } from '@/types/champion';
import { generateMatchupData, MatchupData } from '@/lib/builds';
import { getChampionIconPath, championNameToSlug } from '@/lib/utils';
import { getChampionStats } from '@/lib/real-statistics';
import { getAllMatchupsForChampion, hasRealMatchupData } from '@/lib/matchups';

interface CountersTabProps {
  champion: Champion;
  allChampions: ChampionSummary[];
}

type SortKey = 'winRate' | 'games';

export default function CountersTab({ champion, allChampions }: CountersTabProps) {
  const stats = getChampionStats(champion);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('winRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Start with worst matchups (ascending win rate)
  
  // Get real counters
  const realCounters = stats.counters || [];
  const counterChampions = realCounters
    .map(id => allChampions.find(c => c.id === id))
    .filter((c): c is ChampionSummary => c !== undefined);
  
  // Get matchup data - use real data if available, otherwise generate mock
  const matchups = useMemo(() => {
    if (hasRealMatchupData()) {
      const realMatchups = getAllMatchupsForChampion(champion.id);
      return realMatchups.map(m => {
        const opponent = allChampions.find(c => c.id === m.vsChampionId);
        if (!opponent) return null;
        
        // Convert real matchup data to MatchupData format
        const matchupData: MatchupData = {
          opponentId: m.vsChampionId,
          opponentName: opponent.name,
          winRate: m.winRate,
          games: m.games,
          kda: 0, // Not available in current data
          laneKillRate: 0, // Not available
          laneWinRate: m.winRate, // Use overall win rate
          damageTaken: 0, // Not available
          damageDealt: 0, // Not available
          goldDiff: 0 // Not available
        };
        return matchupData;
      }).filter((m): m is MatchupData => m !== null);
    } else {
      return generateMatchupData(champion.id, allChampions);
    }
  }, [champion.id, allChampions]);
  
  // Filter and sort matchups
  const filteredMatchups = matchups
    .filter(m => m.opponentName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (a[sortKey] - b[sortKey]) * multiplier;
    });
  
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };
  
  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className="space-y-4">
      {/* Search and Stats Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-slate-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Matchup Statistics</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Real win rates from {stats.games.toLocaleString()} games • Showing {matchups.length} matchups
            </p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search champion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 pl-10 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Real Counters Section */}
      {counterChampions.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Hardest Counters (From Real Game Data)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Based on {stats.games.toLocaleString()} games - These champions have the highest win rate against {champion.name}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {counterChampions.map((counter, index) => (
              <Link
                key={counter.id}
                href={`/champions/${championNameToSlug(counter.name)}`}
                className="bg-white dark:bg-zinc-900 rounded-lg p-4 border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transition-all hover:shadow-lg group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-400 dark:border-red-600 group-hover:scale-110 transition-transform">
                      <Image
                        src={getChampionIconPath(counter.id)}
                        alt={counter.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{counter.name}</div>
                    <div className="text-xs text-slate-500">{counter.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Matchup Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-800 border-b border-slate-200 dark:border-zinc-700">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Champion
                </th>
                <th 
                  className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700"
                  onClick={() => handleSort('winRate')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Win Rate {getSortIcon('winRate')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-700"
                  onClick={() => handleSort('games')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Games {getSortIcon('games')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
              {filteredMatchups.map((matchup) => {
                const opponent = allChampions.find(c => c.id === matchup.opponentId);
                if (!opponent) return null;
                
                const winRateColor = matchup.winRate >= 52 ? 'text-emerald-600 dark:text-emerald-400' : 
                                    matchup.winRate <= 48 ? 'text-red-600 dark:text-red-400' : 
                                    'text-slate-900 dark:text-white';
                
                return (
                  <tr key={matchup.opponentId} className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/champions/${championNameToSlug(opponent.name)}`} className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 dark:border-zinc-700 group-hover:border-blue-500 transition-colors">
                          <Image
                            src={getChampionIconPath(opponent.id)}
                            alt={opponent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {opponent.name}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{opponent.title}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className={`font-semibold ${winRateColor}`}>
                        {matchup.winRate.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {matchup.games.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredMatchups.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No champions found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

