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

// Get champion icon path (local)
export function getChampionIconPath(championId: number): string {
  return `/cdragon/icons/${championId}.png`;
}

// Get champion splash art path from Community Dragon CDN
export function getChampionSplashPath(splashPath: string): string {
  if (!splashPath) return '';
  
  // Remove the leading slash and convert to lowercase
  const normalizedPath = splashPath.replace(/^\/lol-game-data\/assets\//, '').toLowerCase();
  
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${normalizedPath}`;
}

// Get ability icon path from Community Dragon CDN
export function getAbilityIconPath(iconPath: string): string {
  if (!iconPath) return '';
  
  // Remove the leading slash and convert to lowercase
  const normalizedPath = iconPath.replace(/^\/lol-game-data\/assets\//, '').toLowerCase();
  
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${normalizedPath}`;
}

// Get ability video path from CloudFront CDN
export function getAbilityVideoPath(videoPath: string): string {
  if (!videoPath) return '';
  
  return `https://d28xe8vt774jo5.cloudfront.net/${videoPath}`;
}

