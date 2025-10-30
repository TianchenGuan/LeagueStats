// Mock data generators for champion builds, runes, and items

import { ChampionSummary } from '@/types/champion';
import { RunePage, RunePageWithStats, RUNE_TREES } from '@/types/runes';
import { Item, ItemBuild, ItemWithStats, POPULAR_ITEMS, COMPONENT_ITEMS, STARTER_ITEMS } from '@/types/items';

// Matchup data type
export interface MatchupData {
  opponentId: number;
  opponentName: string;
  winRate: number;
  games: number;
  kda: number;
  laneKillRate: number;
  laneWinRate: number;
  damageTaken: number;
  damageDealt: number;
  goldDiff: number;
}

// Generate mock rune pages for a champion
export function generateRunePages(championId: number): RunePageWithStats[] {
  const pages: RunePageWithStats[] = [];
  const seed = championId * 1000;
  
  // Generate 3-5 popular rune pages
  const pageCount = 3 + (seed % 3);
  
  for (let i = 0; i < pageCount; i++) {
    const primaryTreeIdx = (seed + i * 7) % RUNE_TREES.length;
    const secondaryTreeIdx = (primaryTreeIdx + 1 + ((seed + i) % (RUNE_TREES.length - 1))) % RUNE_TREES.length;
    
    const primaryTree = RUNE_TREES[primaryTreeIdx];
    const secondaryTree = RUNE_TREES[secondaryTreeIdx];
    
    const keystone = primaryTree.slots.keystones[(seed + i * 3) % primaryTree.slots.keystones.length].id;
    const primaryRunes = [
      primaryTree.slots.slot1[(seed + i) % primaryTree.slots.slot1.length].id,
      primaryTree.slots.slot2[(seed + i * 2) % primaryTree.slots.slot2.length].id,
      primaryTree.slots.slot3[(seed + i * 3) % primaryTree.slots.slot3.length].id,
    ];
    const secondaryRunes = [
      secondaryTree.slots.slot1[(seed + i * 2) % secondaryTree.slots.slot1.length].id,
      secondaryTree.slots.slot2[(seed + i) % secondaryTree.slots.slot2.length].id,
    ];
    
    const basePickRate = 50 - (i * 15);
    const baseWinRate = 50 + (seed % 10) - 5 + (i % 2 === 0 ? 2 : -2);
    
    pages.push({
      primaryTree: primaryTree.id,
      secondaryTree: secondaryTree.id,
      keystone,
      primaryRunes,
      secondaryRunes,
      statShards: [5008, 5008, 5001], // Default stat shards
      pickRate: basePickRate + ((seed + i * 5) % 10),
      winRate: Math.max(45, Math.min(60, baseWinRate)),
      games: Math.floor(10000 + ((seed + i * 1000) % 50000)),
    });
  }
  
  // Sort by pick rate
  return pages.sort((a, b) => b.pickRate - a.pickRate);
}

// Get the most popular rune page
export function getMostPopularRunePage(championId: number): RunePageWithStats {
  const pages = generateRunePages(championId);
  return pages[0];
}

// Generate item builds for a champion
export function generateItemBuilds(championId: number): ItemBuild[] {
  const builds: ItemBuild[] = [];
  const seed = championId * 500;
  
  // Get champion role to determine appropriate items
  const roleIdx = championId % 5;
  const roles = ['mage', 'fighter', 'marksman', 'assassin', 'tank'];
  const role = roles[roleIdx];
  
  // Filter items by role
  const roleItems = POPULAR_ITEMS.filter(item => 
    item.tags?.some(tag => tag === role || tag === 'ad' || tag === 'ap')
  );
  
  // Generate 4-6 popular builds
  const buildCount = 4 + (seed % 3);
  
  for (let i = 0; i < buildCount; i++) {
    const itemCount = 3 + (i % 2); // 3 or 4 core items
    const items: number[] = [];
    
    // Select items
    for (let j = 0; j < itemCount; j++) {
      const idx = (seed + i * 7 + j * 13) % roleItems.length;
      const item = roleItems[idx];
      if (!items.includes(item.id)) {
        items.push(item.id);
      }
    }
    
    const basePickRate = 35 - (i * 8);
    const baseWinRate = 51 + (seed % 8) - 4 + (i === 0 ? 3 : 0);
    
    builds.push({
      name: `Build ${i + 1}`,
      items,
      pickRate: Math.max(1, basePickRate + ((seed + i * 3) % 8)),
      winRate: Math.max(47, Math.min(58, baseWinRate)),
      games: Math.floor(5000 + ((seed + i * 500) % 20000)),
    });
  }
  
  return builds.sort((a, b) => b.pickRate - a.pickRate);
}

// Generate item statistics for a champion
export function generateItemStatistics(championId: number): ItemWithStats[] {
  const seed = championId * 300;
  const roleIdx = championId % 5;
  const roles = ['mage', 'fighter', 'marksman', 'assassin', 'tank'];
  const role = roles[roleIdx];
  
  // Filter items by role and add stats
  const roleItems = POPULAR_ITEMS.filter(item => 
    item.tags?.some(tag => tag === role || tag === 'ad' || tag === 'ap' || tag === 'support')
  );
  
  return roleItems.map((item, idx) => {
    const itemSeed = seed + idx * 100;
    return {
      ...item,
      pickRate: Math.max(5, Math.min(70, 40 - idx * 3 + (itemSeed % 15))),
      winRate: Math.max(48, Math.min(58, 51 + (itemSeed % 10) - 5)),
      games: Math.floor(15000 + (itemSeed % 40000)),
    };
  }).sort((a, b) => b.pickRate - a.pickRate);
}

// Generate matchup data for a champion against all other champions
export function generateMatchupData(championId: number, allChampions: ChampionSummary[]): MatchupData[] {
  const matchups: MatchupData[] = [];
  
  for (const opponent of allChampions) {
    if (opponent.id === championId) continue; // Skip self
    
    const seed = (championId * 1000 + opponent.id) % 10000;
    
    // Generate matchup stats
    const winRate = Math.max(40, Math.min(60, 50 + (seed % 20) - 10));
    const games = Math.floor(500 + (seed % 1500));
    const kda = Math.max(1, Math.min(5, 2 + ((seed % 30) / 10)));
    const laneKillRate = Math.max(50, Math.min(70, 60 + (seed % 20) - 10));
    const laneWinRate = Math.max(42, Math.min(62, winRate - 3 + (seed % 6)));
    const damageTaken = Math.floor(18000 + (seed % 8000));
    const damageDealt = Math.floor(15000 + (seed % 10000));
    const goldDiff = Math.floor(-500 + (seed % 1500));
    
    matchups.push({
      opponentId: opponent.id,
      opponentName: opponent.name,
      winRate,
      games,
      kda,
      laneKillRate,
      laneWinRate,
      damageTaken,
      damageDealt,
      goldDiff,
    });
  }
  
  return matchups;
}

// Get best and worst matchups
export function getBestMatchups(championId: number, allChampions: ChampionSummary[], count: number = 5): MatchupData[] {
  const matchups = generateMatchupData(championId, allChampions);
  return matchups
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, count);
}

export function getWorstMatchups(championId: number, allChampions: ChampionSummary[], count: number = 5): MatchupData[] {
  const matchups = generateMatchupData(championId, allChampions);
  return matchups
    .sort((a, b) => a.winRate - b.winRate)
    .slice(0, count);
}

// Get boots recommendation for a champion
export function getRecommendedBoots(championId: number): ItemWithStats[] {
  const seed = championId * 123;
  const bootsItems = POPULAR_ITEMS.filter(item => item.tags?.includes('boots'));
  
  return bootsItems.map((item, idx) => ({
    ...item,
    pickRate: Math.max(5, 35 - idx * 6 + (seed % 10)),
    winRate: Math.max(49, Math.min(54, 51 + ((seed + idx) % 6) - 3)),
    games: Math.floor(8000 + ((seed + idx * 500) % 15000)),
  })).sort((a, b) => b.pickRate - a.pickRate);
}

// Get starter items recommendation
export function getRecommendedStarters(championId: number): ItemWithStats[] {
  const seed = championId * 456;
  
  return STARTER_ITEMS.map((item, idx) => ({
    ...item,
    pickRate: Math.max(5, 40 - idx * 8 + (seed % 15)),
    winRate: Math.max(48, Math.min(53, 50 + ((seed + idx) % 5) - 2)),
    games: Math.floor(10000 + ((seed + idx * 700) % 20000)),
  })).sort((a, b) => b.pickRate - a.pickRate);
}

// Get synergy champions (good teammates)
export function getSynergyChampions(championId: number, allChampions: ChampionSummary[], count: number = 5): ChampionSummary[] {
  const seed = championId * 789;
  const shuffled = [...allChampions]
    .filter(c => c.id !== championId)
    .sort((a, b) => ((seed + a.id) % 1000) - ((seed + b.id) % 1000));
  
  return shuffled.slice(0, count);
}

