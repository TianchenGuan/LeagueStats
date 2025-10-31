// Summoner spell ID to name and icon mapping (Season 7-8 era)
export const SUMMONER_SPELLS: Record<number, { name: string; iconPath: string }> = {
  1: { name: 'Cleanse', iconPath: '/cdragon/summoner-spells/summoner_boost.png' },
  3: { name: 'Exhaust', iconPath: '/cdragon/summoner-spells/summoner_exhaust.png' },
  4: { name: 'Flash', iconPath: '/cdragon/summoner-spells/summoner_flash.png' },
  6: { name: 'Ghost', iconPath: '/cdragon/summoner-spells/summoner_haste.png' },
  7: { name: 'Heal', iconPath: '/cdragon/summoner-spells/summoner_heal.png' },
  11: { name: 'Smite', iconPath: '/cdragon/summoner-spells/summoner_smite.png' },
  12: { name: 'Teleport', iconPath: '/cdragon/summoner-spells/summoner_teleport_new.png' },
  13: { name: 'Clarity', iconPath: '/cdragon/summoner-spells/summonermana.png' },
  14: { name: 'Ignite', iconPath: '/cdragon/summoner-spells/summonerignite.png' },
  21: { name: 'Barrier', iconPath: '/cdragon/summoner-spells/summonerbarrier.png' },
  32: { name: 'Mark/Dash', iconPath: '/cdragon/summoner-spells/summoner_mark.png' },
};

export function getSummonerSpellName(spellId: number): string {
  return SUMMONER_SPELLS[spellId]?.name || `Spell ${spellId}`;
}

export function getSummonerSpellIconPath(spellId: number): string {
  return SUMMONER_SPELLS[spellId]?.iconPath || '/cdragon/summoner-spells/summoner_empty.png';
}

