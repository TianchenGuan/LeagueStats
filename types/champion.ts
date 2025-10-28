export interface ChampionSkin {
  id: number;
  contentId: string;
  isBase: boolean;
  name: string;
  skinClassification: string;
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  skinType: string;
  rarity: string;
  isLegacy: boolean;
  description?: string;
}

export interface ChampionAbility {
  name: string;
  abilityIconPath: string;
  abilityVideoPath?: string;
  abilityVideoImagePath?: string;
  description: string;
  dynamicDescription?: string;
  cost?: string;
  cooldown?: string;
  range?: number[];
}

export interface ChampionSpell extends ChampionAbility {
  spellKey: string;
}

export interface TacticalInfo {
  style: number;
  difficulty: number;
  damageType: string;
  attackType: string;
}

export interface PlaystyleInfo {
  damage: number;
  durability: number;
  crowdControl: number;
  mobility: number;
  utility: number;
}

export interface Champion {
  id: number;
  name: string;
  alias: string;
  title: string;
  shortBio: string;
  isVisibleInClient: boolean;
  tacticalInfo: TacticalInfo;
  playstyleInfo: PlaystyleInfo;
  squarePortraitPath: string;
  roles: string[];
  skins: ChampionSkin[];
  passive: ChampionAbility;
  spells: ChampionSpell[];
}

export interface ChampionSummary {
  id: number;
  name: string;
  alias: string;
  title: string;
  roles: string[];
}

