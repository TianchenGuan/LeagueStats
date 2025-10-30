// Client-safe utility functions (no Node.js APIs)

// Convert champion name to URL-safe slug
export function championNameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
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

