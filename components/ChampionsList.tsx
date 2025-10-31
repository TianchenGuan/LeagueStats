'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChampionWithStats, searchChampions, filterChampionsByRole, sortChampionsByWinRate, sortChampionsByPickRate, sortChampionsByBanRate, sortChampionsByTier } from '@/lib/real-statistics';
import { getChampionIconPath, championNameToSlug } from '@/lib/utils';
import { shouldShowIcons, shouldShowText, shouldShowIconsOnly, shouldShowTextOnly } from '@/lib/ui-config';

interface ChampionsListProps {
  champions: ChampionWithStats[];
  allChampions: ChampionWithStats[]; // For finding counter champions
}

type SortOption = 'tier' | 'winRate' | 'pickRate' | 'banRate';
type RoleFilter = 'all' | 'top' | 'jungle' | 'middle' | 'bottom' | 'support';

const ROLE_ICONS: Record<string, string> = {
  top: '⚔️',
  jungle: '🌲',
  middle: '✨',
  mid: '✨',
  bottom: '🏹',
  adc: '🏹',
  support: '🛡️',
  mage: '🔮',
  fighter: '⚔️',
  tank: '🛡️',
  assassin: '🗡️',
  marksman: '🏹',
};

export default function ChampionsList({ champions, allChampions }: ChampionsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('tier');

  const filteredAndSortedChampions = useMemo(() => {
    // First, search
    let result = searchChampions(champions, searchQuery);
    
    // Then, filter by role
    result = filterChampionsByRole(result, roleFilter);
    
    // Finally, sort
    switch (sortBy) {
      case 'tier':
        result = sortChampionsByTier(result);
        break;
      case 'winRate':
        result = sortChampionsByWinRate(result);
        break;
      case 'pickRate':
        result = sortChampionsByPickRate(result);
        break;
      case 'banRate':
        result = sortChampionsByBanRate(result);
        break;
    }
    
    return result;
  }, [champions, searchQuery, roleFilter, sortBy]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-red-500';
      case 'A': return 'bg-orange-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-green-500';
      case 'D': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCounterChampion = (counterId: number) => {
    return allChampions.find(c => c.id === counterId);
  };

  return (
    <div className="flex gap-8">
      {/* Left Sidebar - Champion Grid */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 border border-slate-200 dark:border-zinc-700 sticky top-24">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search champions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
            />
          </div>

          {/* Champion Grid */}
          <div className={`grid max-h-[calc(100vh-200px)] overflow-y-auto pr-2 ${
            shouldShowIconsOnly() ? 'grid-cols-5 gap-2' : 
            shouldShowTextOnly() ? 'grid-cols-1 gap-2' : 
            'grid-cols-4 gap-3'
          }`}>
            {allChampions.map((champion) => (
              <Link
                key={champion.id}
                href={`/champions/${championNameToSlug(champion.name)}`}
                className="group relative flex flex-col items-center"
                title={shouldShowIconsOnly() ? champion.name : undefined}
              >
                {shouldShowIcons() && (
                  <>
                    <div className="aspect-square w-full rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all">
                      <Image
                        src={getChampionIconPath(champion.id)}
                        alt={champion.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    {/* Tier Badge */}
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${getTierColor(champion.stats.tier)} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                      {champion.stats.tier}
                    </div>
                  </>
                )}
                
                {shouldShowText() && !shouldShowIconsOnly() && shouldShowIcons() && (
                  <div className="mt-1 w-full text-center">
                    <div className="text-xs font-medium text-slate-900 dark:text-white truncate px-1">
                      {champion.name}
                    </div>
                  </div>
                )}
                
                {shouldShowTextOnly() && (
                  <div className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-zinc-700 hover:border-blue-500 transition-all">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {champion.name}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Champions Table */}
      <div className="flex-1">
        {/* Role Filters */}
        <div className="mb-6 flex gap-2">
          {(['all', 'top', 'jungle', 'middle', 'bottom', 'support'] as RoleFilter[]).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                roleFilter === role
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 hover:border-blue-500'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Table */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[60px_200px_80px_80px_100px_100px_100px_140px] gap-4 p-4 bg-slate-50 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-700 font-semibold text-sm text-slate-600 dark:text-slate-400">
            <div>Rank</div>
            <div>Champion</div>
            <div 
              className="cursor-pointer hover:text-blue-500 flex items-center gap-1"
              onClick={() => setSortBy('tier')}
            >
              Tier {sortBy === 'tier' && '▼'}
            </div>
            <div>Role</div>
            <div 
              className="cursor-pointer hover:text-blue-500 flex items-center gap-1"
              onClick={() => setSortBy('winRate')}
            >
              Win rate {sortBy === 'winRate' && '▼'}
            </div>
            <div 
              className="cursor-pointer hover:text-blue-500 flex items-center gap-1"
              onClick={() => setSortBy('pickRate')}
            >
              Pick rate {sortBy === 'pickRate' && '▼'}
            </div>
            <div 
              className="cursor-pointer hover:text-blue-500 flex items-center gap-1"
              onClick={() => setSortBy('banRate')}
            >
              Ban rate {sortBy === 'banRate' && '▼'}
            </div>
            <div>Weak against</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-200 dark:divide-zinc-700">
            {filteredAndSortedChampions.map((champion, index) => (
              <div
                key={champion.id}
                className="grid grid-cols-[60px_200px_80px_80px_100px_100px_100px_140px] gap-4 p-4 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center text-slate-600 dark:text-slate-400 font-medium">
                  {index + 1}
                </div>

                {/* Champion */}
                <Link 
                  href={`/champions/${championNameToSlug(champion.name)}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getChampionIconPath(champion.id)}
                      alt={champion.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {champion.name}
                  </span>
                </Link>

                {/* Tier */}
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${getTierColor(champion.stats.tier)} flex items-center justify-center text-white font-bold shadow-md`}>
                    {champion.stats.tier}
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-1">
                  {champion.roles.slice(0, 2).map((role, idx) => (
                    <span key={idx} className="text-lg" title={role}>
                      {ROLE_ICONS[role.toLowerCase()] || '⭐'}
                    </span>
                  ))}
                </div>

                {/* Win Rate */}
                <div className="flex items-center">
                  <span className={`font-semibold ${
                    champion.stats.winRate >= 52 ? 'text-red-500' : 
                    champion.stats.winRate >= 50 ? 'text-green-500' : 
                    'text-slate-700 dark:text-slate-300'
                  }`}>
                    {Number(champion.stats.winRate).toFixed(2)}%
                  </span>
                </div>

                {/* Pick Rate */}
                <div className="flex items-center text-slate-700 dark:text-slate-300">
                  {Number(champion.stats.pickRate).toFixed(2)}%
                </div>

                {/* Ban Rate */}
                <div className="flex items-center text-slate-700 dark:text-slate-300">
                  {Number(champion.stats.banRate).toFixed(2)}%
                </div>

                {/* Weak Against */}
                <div className="flex items-center gap-1">
                  {champion.stats.counters.map((counterId) => {
                    const counter = getCounterChampion(counterId);
                    if (!counter) return null;
                    return (
                      <Link
                        key={counterId}
                        href={`/champions/${championNameToSlug(counter.name)}`}
                        className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 hover:border-blue-500 transition-all hover:scale-110"
                        title={counter.name}
                      >
                        <Image
                          src={getChampionIconPath(counterId)}
                          alt={counter.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedChampions.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400">
              No champions found matching your criteria.
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 text-center">
          Showing {filteredAndSortedChampions.length} of {champions.length} champions
        </div>
      </div>
    </div>
  );
}

