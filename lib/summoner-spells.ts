// Summoner spell ID to name mapping (Season 7-8 era)
export const SUMMONER_SPELLS: Record<number, { name: string; icon: string }> = {
  1: { name: 'Cleanse', icon: '🧼' },
  3: { name: 'Exhaust', icon: '😮‍💨' },
  4: { name: 'Flash', icon: '⚡' },
  6: { name: 'Ghost', icon: '👻' },
  7: { name: 'Heal', icon: '💚' },
  11: { name: 'Smite', icon: '⚔️' },
  12: { name: 'Teleport', icon: '🌀' },
  13: { name: 'Clarity', icon: '💧' },
  14: { name: 'Ignite', icon: '🔥' },
  21: { name: 'Barrier', icon: '🛡️' },
  32: { name: 'Mark/Dash', icon: '🎯' },
};

export function getSummonerSpellName(spellId: number): string {
  return SUMMONER_SPELLS[spellId]?.name || `Spell ${spellId}`;
}

export function getSummonerSpellIcon(spellId: number): string {
  return SUMMONER_SPELLS[spellId]?.icon || '❓';
}

export function formatSummonerSpellCombo(ss1: number, ss2: number): string {
  const spell1 = getSummonerSpellName(ss1);
  const spell2 = getSummonerSpellName(ss2);
  const icon1 = getSummonerSpellIcon(ss1);
  const icon2 = getSummonerSpellIcon(ss2);
  return `${icon1} ${spell1} + ${icon2} ${spell2}`;
}

