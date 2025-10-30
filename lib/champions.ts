// Server-only functions that use Node.js APIs (fs, path)
import fs from 'fs';
import path from 'path';
import { Champion, ChampionSummary } from '@/types/champion';

const CHAMPIONS_DIR = path.join(process.cwd(), 'public', 'cdragon');

// Get all champion IDs from the directory
export function getAllChampionIds(): number[] {
  const files = fs.readdirSync(CHAMPIONS_DIR);
  const championIds = files
    .filter(file => file.endsWith('.json'))
    .map(file => parseInt(file.replace('.json', '')))
    .filter(id => !isNaN(id) && id > 0); // Filter out -1.json and invalid IDs
  
  return championIds.sort((a, b) => a - b);
}

// Get champion data by ID
export function getChampionById(id: number): Champion | null {
  try {
    const filePath = path.join(CHAMPIONS_DIR, `${id}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Champion;
  } catch (error) {
    console.error(`Error loading champion ${id}:`, error);
    return null;
  }
}

// Get all champions summary (for listing page)
export function getAllChampions(): ChampionSummary[] {
  const championIds = getAllChampionIds();
  const champions: ChampionSummary[] = [];

  for (const id of championIds) {
    const champion = getChampionById(id);
    if (champion && champion.isVisibleInClient) {
      champions.push({
        id: champion.id,
        name: champion.name,
        alias: champion.alias,
        title: champion.title,
        roles: champion.roles,
      });
    }
  }

  return champions.sort((a, b) => a.name.localeCompare(b.name));
}

// Get champion by name (URL-safe)
export function getChampionByName(name: string): Champion | null {
  const championIds = getAllChampionIds();
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const id of championIds) {
    const champion = getChampionById(id);
    if (champion) {
      const championNormalizedName = champion.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (championNormalizedName === normalizedName) {
        return champion;
      }
    }
  }
  
  return null;
}

// Convert champion name to URL-safe slug
export function championNameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

// Re-export client-safe utilities
export { getChampionIconPath, getChampionSplashPath, getAbilityIconPath, getAbilityVideoPath } from './utils';

