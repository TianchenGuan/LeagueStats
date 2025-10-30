// Real matchup data utilities
import realStatsData from './real-stats-data.json';

export interface RealMatchupData {
  championId: number;
  vsChampionId: number;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
}

const realStats = realStatsData as {
  totalGames: number;
  champions: Record<string, any>;
  matchups: Record<string, RealMatchupData>;
};

// Get real matchup data for a specific champion vs another
export function getMatchupData(championId: number, vsChampionId: number): RealMatchupData | null {
  const key = `${championId}_vs_${vsChampionId}`;
  return realStats.matchups[key] || null;
}

// Get all matchups for a champion
export function getAllMatchupsForChampion(championId: number): RealMatchupData[] {
  const matchups: RealMatchupData[] = [];
  
  for (const [key, matchup] of Object.entries(realStats.matchups)) {
    if (matchup.championId === championId) {
      matchups.push(matchup);
    }
  }
  
  return matchups;
}

// Check if we have real matchup data
export function hasRealMatchupData(): boolean {
  return !!realStats.matchups && Object.keys(realStats.matchups).length > 0;
}

