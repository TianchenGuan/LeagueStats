import { Champion, ChampionSummary } from '@/types/champion';

export interface ChampionStats {
  championId: number;
  winRate: number;
  pickRate: number;
  banRate: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  counters: number[]; // Champion IDs that counter this champion
}

// Generate deterministic but varied stats based on champion ID
function generateStats(championId: number, championName: string): ChampionStats {
  // Use champion ID as seed for consistent results
  const seed = championId * 7 + championName.length;
  
  // Generate win rate between 47% and 55%
  const winRate = 47 + ((seed * 13) % 800) / 100;
  
  // Generate pick rate between 1% and 15%
  const pickRate = 1 + ((seed * 17) % 1400) / 100;
  
  // Generate ban rate between 0.5% and 25%
  const banRate = 0.5 + ((seed * 23) % 2450) / 100;
  
  // Calculate tier based on win rate
  let tier: 'S' | 'A' | 'B' | 'C' | 'D';
  if (winRate >= 53) tier = 'S';
  else if (winRate >= 51.5) tier = 'A';
  else if (winRate >= 50) tier = 'B';
  else if (winRate >= 48.5) tier = 'C';
  else tier = 'D';
  
  // Generate 3 counter champion IDs (different from current champion)
  const counters: number[] = [];
  for (let i = 0; i < 3; i++) {
    let counterId = ((seed * (i + 1) * 31) % 168) + 1;
    // Make sure it's not the same champion
    if (counterId === championId) counterId = (counterId % 168) + 1;
    counters.push(counterId);
  }
  
  return {
    championId,
    winRate: Number(winRate.toFixed(2)),
    pickRate: Number(pickRate.toFixed(2)),
    banRate: Number(banRate.toFixed(2)),
    tier,
    counters,
  };
}

// Cache for generated stats
const statsCache = new Map<number, ChampionStats>();

export function getChampionStats(champion: ChampionSummary | Champion): ChampionStats {
  if (!statsCache.has(champion.id)) {
    statsCache.set(champion.id, generateStats(champion.id, champion.name));
  }
  return statsCache.get(champion.id)!;
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
  const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  return [...champions].sort((a, b) => {
    const tierDiff = tierOrder[a.stats.tier] - tierOrder[b.stats.tier];
    if (tierDiff !== 0) return tierDiff;
    // If same tier, sort by win rate
    return b.stats.winRate - a.stats.winRate;
  });
}

export function filterChampionsByRole(champions: ChampionWithStats[], role: string): ChampionWithStats[] {
  if (role === 'all') return champions;
  
  // Map lane positions to champion class roles
  // Champions can play multiple lanes, so we use common role associations
  const laneToRoleMap: Record<string, string[]> = {
    top: ['fighter', 'tank', 'slayer', 'juggernaut'],
    jungle: ['fighter', 'tank', 'assassin', 'slayer'],
    middle: ['mage', 'assassin', 'slayer', 'battlemage'],
    mid: ['mage', 'assassin', 'slayer', 'battlemage'],
    bottom: ['marksman', 'adc'],
    support: ['support', 'controller', 'enchanter', 'tank'],
  };
  
  const normalizedRole = role.toLowerCase();
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

export function searchChampions(champions: ChampionWithStats[], query: string): ChampionWithStats[] {
  if (!query.trim()) return champions;
  
  const lowerQuery = query.toLowerCase();
  return champions.filter(champion =>
    champion.name.toLowerCase().includes(lowerQuery) ||
    champion.title.toLowerCase().includes(lowerQuery) ||
    champion.alias.toLowerCase().includes(lowerQuery)
  );
}

