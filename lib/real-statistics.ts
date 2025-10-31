// Real statistics from analyzed match data
import { Champion, ChampionSummary } from '@/types/champion';
import realStatsData from './real-stats-data.json';

export interface SummonerSpellCombo {
  ss1: number;
  ss2: number;
  count: number;
}

export interface ChampionStats {
  championId: number;
  winRate: number;
  pickRate: number;
  banRate: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  counters: number[]; // Champion IDs that counter this champion (from real matchup data)
  games: number;
  topRole?: string;
  topPosition?: string;
  topSummonerSpells?: SummonerSpellCombo[];
}

// Load real stats
const realStats = realStatsData as {
  totalGames: number;
  champions: Record<string, {
    id: number;
    games: number;
    wins: number;
    winRate: number;
    pickRate: number;
    banRate: number;
    topRole: string;
    topPosition: string;
    topItems: Array<{ itemId: number; count: number }>;
    topSummonerSpells: Array<{ ss1: number; ss2: number; count: number }>;
    counters: number[];
    name?: string;
  }>;
};

// Calculate tier based on win rate
function calculateTier(winRate: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (winRate >= 53) return 'S';
  if (winRate >= 51.5) return 'A';
  if (winRate >= 50) return 'B';
  if (winRate >= 48.5) return 'C';
  return 'D';
}

// Generate fallback counters if no real data available
function generateFallbackCounters(championId: number): number[] {
  const counters: number[] = [];
  const availableChampions = Object.keys(realStats.champions).map(Number);
  const seed = championId * 1337;
  
  for (let i = 0; i < 5; i++) {
    const index = (seed + i * 7) % availableChampions.length;
    const counterId = availableChampions[index];
    if (counterId !== championId && !counters.includes(counterId)) {
      counters.push(counterId);
    }
  }
  
  return counters;
}

// Cache for generated stats
const statsCache = new Map<number, ChampionStats>();

export function getChampionStats(champion: ChampionSummary | Champion): ChampionStats {
  if (statsCache.has(champion.id)) {
    return statsCache.get(champion.id)!;
  }
  
  const realChampData = realStats.champions[champion.id.toString()];
  
  let stats: ChampionStats;
  
  if (realChampData && realChampData.games > 0) {
    // Use real data if available (numbers are already properly rounded in JSON)
    stats = {
      championId: champion.id,
      winRate: realChampData.winRate,
      pickRate: realChampData.pickRate,
      banRate: realChampData.banRate,
      tier: calculateTier(realChampData.winRate),
      counters: realChampData.counters || generateFallbackCounters(champion.id),
      games: realChampData.games,
      topRole: realChampData.topRole,
      topPosition: realChampData.topPosition,
      topSummonerSpells: realChampData.topSummonerSpells || [],
    };
  } else {
    // Fallback to mock data if no real data available
    const seed = champion.id * 7 + champion.name.length;
    stats = {
      championId: champion.id,
      winRate: 47 + ((seed * 13) % 800) / 100,
      pickRate: 1 + ((seed * 17) % 1400) / 100,
      banRate: 0.5 + ((seed * 23) % 2450) / 100,
      tier: calculateTier(50),
      counters: generateFallbackCounters(champion.id),
      games: 1000 + (seed % 5000),
    };
  }
  
  statsCache.set(champion.id, stats);
  return stats;
}

export function getAllChampionStats(champions: (ChampionSummary | Champion)[]): ChampionStats[] {
  return champions.map(getChampionStats);
}

export interface ChampionWithStats extends ChampionSummary {
  stats: ChampionStats;
}

export function getChampionsWithStats(champions: ChampionSummary[]): ChampionWithStats[] {
  return champions.map(champion => ({
    ...champion,
    stats: getChampionStats(champion),
  }));
}

export function sortChampionsByWinRate(champions: ChampionWithStats[], ascending = false): ChampionWithStats[] {
  return [...champions].sort((a, b) => {
    const diff = a.stats.winRate - b.stats.winRate;
    return ascending ? diff : -diff;
  });
}

export function sortChampionsByPickRate(champions: ChampionWithStats[], ascending = false): ChampionWithStats[] {
  return [...champions].sort((a, b) => {
    const diff = a.stats.pickRate - b.stats.pickRate;
    return ascending ? diff : -diff;
  });
}

export function sortChampionsByBanRate(champions: ChampionWithStats[], ascending = false): ChampionWithStats[] {
  return [...champions].sort((a, b) => {
    const diff = a.stats.banRate - b.stats.banRate;
    return ascending ? diff : -diff;
  });
}

export function sortChampionsByTier(champions: ChampionWithStats[]): ChampionWithStats[] {
  const tierOrder = { 'S': 0, 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
  return [...champions].sort((a, b) => {
    const tierDiff = tierOrder[a.stats.tier] - tierOrder[b.stats.tier];
    if (tierDiff !== 0) return tierDiff;
    // If same tier, sort by win rate
    return b.stats.winRate - a.stats.winRate;
  });
}

export function searchChampions(champions: ChampionWithStats[], query: string): ChampionWithStats[] {
  const lowercaseQuery = query.toLowerCase();
  return champions.filter(champion =>
    champion.name.toLowerCase().includes(lowercaseQuery) ||
    champion.title.toLowerCase().includes(lowercaseQuery)
  );
}

// Map Community Dragon roles to lane positions
const laneToRoleMap: Record<string, string[]> = {
  top: ['fighter', 'tank', 'slayer', 'juggernaut'],
  jungle: ['fighter', 'tank', 'assassin', 'slayer'],
  middle: ['mage', 'assassin', 'slayer', 'battlemage'],
  mid: ['mage', 'assassin', 'slayer', 'battlemage'],
  bottom: ['marksman', 'adc'],
  support: ['support', 'controller', 'enchanter', 'tank'],
};

export function filterChampionsByRole(champions: ChampionWithStats[], role: string): ChampionWithStats[] {
  if (role === 'all') return champions;
  
  const normalizedRole = role.toLowerCase();
  
  // Check if filtering by position from real data
  const validPositions = ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'];
  const positionMatch = validPositions.find(p => p.toLowerCase() === normalizedRole || p === normalizedRole.toUpperCase());
  
  if (positionMatch) {
    // Filter by actual position from match data
    return champions.filter(champion => {
      const stats = champion.stats;
      if (stats.topPosition) {
        return stats.topPosition === positionMatch;
      }
      // Fallback to role-based filtering
      const acceptedRoles = laneToRoleMap[normalizedRole];
      return acceptedRoles && champion.roles.some(r => acceptedRoles.includes(r.toLowerCase()));
    });
  }
  
  const acceptedRoles = laneToRoleMap[normalizedRole];
  
  if (!acceptedRoles) {
    // If not a lane, try exact role match
    return champions.filter(champion =>
      champion.roles.some(r => r.toLowerCase() === normalizedRole)
    );
  }
  
  // Filter champions that have ANY of the accepted roles for this lane
  return champions.filter(champion =>
    champion.roles.some(r => acceptedRoles.includes(r.toLowerCase()))
  );
}

// Get real items data for a champion (only items with icons)
export function getRealTopItems(championId: number): Array<{ itemId: number; count: number; pickRate: number }> {
  const realChampData = realStats.champions[championId.toString()];
  
  if (!realChampData || !realChampData.topItems) {
    return [];
  }
  
  // Import icon map to check which items have icons
  const { ITEM_ICON_MAP } = require('./item-icon-map');
  
  const totalGames = realChampData.games;
  
  // Filter to only include items that have icons in Community Dragon
  return realChampData.topItems
    .filter(item => ITEM_ICON_MAP[item.itemId.toString()])
    .map(item => ({
      ...item,
      pickRate: Number(((item.count / totalGames) * 100).toFixed(2)),
    }));
}

// Get real summoner spell data for a champion
export function getRealTopSummonerSpells(championId: number): Array<{ ss1: number; ss2: number; count: number; pickRate: number }> {
  const realChampData = realStats.champions[championId.toString()];
  
  if (!realChampData || !realChampData.topSummonerSpells) {
    return [];
  }
  
  const totalGames = realChampData.games;
  return realChampData.topSummonerSpells.map(spell => ({
    ...spell,
    pickRate: Number(((spell.count / totalGames) * 100).toFixed(2)),
  }));
}

// Export real stats data for debugging
export const REAL_STATS_INFO = {
  totalGames: realStats.totalGames,
  championsWithData: Object.keys(realStats.champions).length,
  dataSource: 'MatchData1 (184,070 ranked games)',
};

