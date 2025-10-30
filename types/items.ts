// Item system types

export interface Item {
  id: number;
  name: string;
  icon: string;
  cost: number;
  description?: string;
  stats?: string[];
  mythic?: boolean;
  legendary?: boolean;
  tags?: string[];
}

export interface ItemBuild {
  name: string;
  items: number[]; // Item ids
  pickRate: number;
  winRate: number;
  games: number;
}

export interface ItemWithStats extends Item {
  pickRate: number;
  winRate: number;
  games: number;
}

// Popular items from League of Legends
export const POPULAR_ITEMS: Item[] = [
  // Mythic items
  { id: 3152, name: 'Hextech Rocketbelt', icon: '/cdragon/item-icons/3152_mage_t4_hextechrocketbelt.png', cost: 2600, mythic: true, tags: ['mage', 'ap'] },
  { id: 6653, name: "Liandry's Anguish", icon: '/cdragon/item-icons/6653_mage_t4_liandrysanguish.png', cost: 3200, mythic: true, tags: ['mage', 'ap'] },
  { id: 6656, name: 'Everfrost', icon: '/cdragon/item-icons/6656_mage_t4_everfrost.png', cost: 2800, mythic: true, tags: ['mage', 'ap'] },
  { id: 4633, name: 'Riftmaker', icon: '/cdragon/item-icons/4633_mage_t4_riftmaker.png', cost: 3200, mythic: true, tags: ['mage', 'ap'] },
  { id: 6630, name: 'Goredrinker', icon: '/cdragon/item-icons/6630_fighter_t4_goredrinker.png', cost: 3300, mythic: true, tags: ['fighter', 'ad'] },
  { id: 6631, name: 'Stridebreaker', icon: '/cdragon/item-icons/6631_fighter_t4_stridebreaker.png', cost: 3300, mythic: true, tags: ['fighter', 'ad'] },
  { id: 6632, name: 'Divine Sunderer', icon: '/cdragon/item-icons/6632_fighter_t4_divinedevourer.png', cost: 3300, mythic: true, tags: ['fighter', 'ad'] },
  { id: 3031, name: 'Infinity Edge', icon: '/cdragon/item-icons/3031_marksman_t3_infinityedge.png', cost: 3400, mythic: true, tags: ['marksman', 'ad'] },
  { id: 6671, name: 'Galeforce', icon: '/cdragon/item-icons/6671_marksman_t4_galeforce.png', cost: 3400, mythic: true, tags: ['marksman', 'ad'] },
  { id: 6673, name: 'Immortal Shieldbow', icon: '/cdragon/item-icons/6673_marksman_t4_crimsonshieldbow.png', cost: 3000, mythic: true, tags: ['marksman', 'ad'] },
  { id: 6691, name: 'Duskblade of Draktharr', icon: '/cdragon/item-icons/6691_assassin_t4_duskbladeofdraktharr.png', cost: 3100, mythic: true, tags: ['assassin', 'ad'] },
  { id: 6692, name: 'Eclipse', icon: '/cdragon/item-icons/6692_assassin_t4_eclipse.png', cost: 2800, mythic: true, tags: ['assassin', 'ad'] },
  { id: 6693, name: "Prowler's Claw", icon: '/cdragon/item-icons/6693_assassin_t4_prowlersclaw.png', cost: 3100, mythic: true, tags: ['assassin', 'ad'] },
  
  // Legendary items
  { id: 3157, name: "Zhonya's Hourglass", icon: '/cdragon/item-icons/3157_mage_t3_zhonyashourglass.png', cost: 3250, legendary: true, tags: ['mage', 'ap'] },
  { id: 3165, name: "Morellonomicon", icon: '/cdragon/item-icons/3165_mage_t3_morellonomicon.png', cost: 2500, legendary: true, tags: ['mage', 'ap'] },
  { id: 3003, name: "Archangel's Staff", icon: '/cdragon/item-icons/3003_mage_t3_archangelstaff.png', cost: 3000, legendary: true, tags: ['mage', 'ap'] },
  { id: 4645, name: 'Shadowflame', icon: '/cdragon/item-icons/4645_shadowflame.png', cost: 3000, legendary: true, tags: ['mage', 'ap'] },
  { id: 4628, name: 'Horizon Focus', icon: '/cdragon/item-icons/4628_mage_t3_horizonfocus.png', cost: 3000, legendary: true, tags: ['mage', 'ap'] },
  { id: 3026, name: 'Guardian Angel', icon: '/cdragon/item-icons/3026_fighter_t3_guardianangel.png', cost: 2800, legendary: true, tags: ['fighter', 'ad'] },
  { id: 3153, name: 'Blade of the Ruined King', icon: '/cdragon/item-icons/3153_fighter_t3_bladeoftheruinedking.png', cost: 3200, legendary: true, tags: ['fighter', 'marksman', 'ad'] },
  { id: 3074, name: 'Ravenous Hydra', icon: '/cdragon/item-icons/3074_fighter_t3_ravenoushydra.png', cost: 3300, legendary: true, tags: ['fighter', 'ad'] },
  { id: 3748, name: 'Titanic Hydra', icon: '/cdragon/item-icons/3748_fighter_t3_titanichydra.png', cost: 3300, legendary: true, tags: ['fighter', 'tank'] },
  { id: 6333, name: "Death's Dance", icon: '/cdragon/item-icons/6333_fighter_t3_deathsdance.png', cost: 3200, legendary: true, tags: ['fighter', 'ad'] },
  { id: 3036, name: "Lord Dominik's Regards", icon: '/cdragon/item-icons/3036_marksman_t3_dominikregards.png', cost: 3000, legendary: true, tags: ['marksman', 'ad'] },
  { id: 3033, name: 'Mortal Reminder', icon: '/cdragon/item-icons/3033_marksman_t3_mortalreminder.png', cost: 2500, legendary: true, tags: ['marksman', 'ad'] },
  { id: 3046, name: 'Phantom Dancer', icon: '/cdragon/item-icons/3046_marksman_t3_phantomdancer.png', cost: 2600, legendary: true, tags: ['marksman'] },
  { id: 3508, name: 'Essence Reaver', icon: '/cdragon/item-icons/3508_marksman_t3_essencereaver.png', cost: 2800, legendary: true, tags: ['marksman', 'ad'] },
  { id: 6676, name: 'The Collector', icon: '/cdragon/item-icons/6676_marksman_t3_thecollector.png', cost: 3000, legendary: true, tags: ['marksman', 'ad'] },
  { id: 3094, name: 'Rapid Firecannon', icon: '/cdragon/item-icons/3094_marksman_t3_rapidfirecannon.png', cost: 2600, legendary: true, tags: ['marksman'] },
  { id: 3124, name: 'Guinsoo\'s Rageblade', icon: '/cdragon/item-icons/3124_fighter_t3_guinsoosrageblade.png', cost: 2600, legendary: true, tags: ['marksman', 'fighter'] },
  { id: 3142, name: "Youmuu's Ghostblade", icon: '/cdragon/item-icons/3142_assassin_t3_youmuusghostblade.png', cost: 2800, legendary: true, tags: ['assassin', 'ad'] },
  { id: 3814, name: 'Edge of Night', icon: '/cdragon/item-icons/3814_assassin_t3_edgeofnight.png', cost: 2900, legendary: true, tags: ['assassin', 'ad'] },
  { id: 6695, name: "Serpent's Fang", icon: '/cdragon/item-icons/6695_assassin_t3_serpentsfang.png', cost: 2600, legendary: true, tags: ['assassin', 'ad'] },
  { id: 6694, name: "Serylda's Grudge", icon: '/cdragon/item-icons/6694_assasin_t3_seryldasgrudge.png', cost: 3000, legendary: true, tags: ['assassin', 'ad'] },
  
  // Tank items
  { id: 3065, name: 'Spirit Visage', icon: '/cdragon/item-icons/3065_tank_t3_spiritvisage.png', cost: 2900, legendary: true, tags: ['tank', 'mr'] },
  { id: 3075, name: 'Thornmail', icon: '/cdragon/item-icons/3075_tank_t3_thornmail.png', cost: 2700, legendary: true, tags: ['tank', 'armor'] },
  { id: 3143, name: "Randuin's Omen", icon: '/cdragon/item-icons/3143_tank_t3_randuinsomen.png', cost: 2700, legendary: true, tags: ['tank', 'armor'] },
  { id: 3742, name: "Dead Man's Plate", icon: '/cdragon/item-icons/3742_tank_t3_deadmansplate.png', cost: 2900, legendary: true, tags: ['tank', 'armor'] },
  { id: 3193, name: 'Gargoyle Stoneplate', icon: '/cdragon/item-icons/3193_tank_t3_gargoylestoneplate.png', cost: 3200, legendary: true, tags: ['tank'] },
  { id: 3068, name: 'Sunfire Aegis', icon: '/cdragon/item-icons/3068_tank_t4_sunfireaegis.png', cost: 2800, legendary: true, tags: ['tank'] },
  { id: 4401, name: 'Force of Nature', icon: '/cdragon/item-icons/4401_tank_t3_forceofnature.png', cost: 2800, legendary: true, tags: ['tank', 'mr'] },
  { id: 3110, name: 'Frozen Heart', icon: '/cdragon/item-icons/3110_tank_t3_frozenheart.png', cost: 2500, legendary: true, tags: ['tank', 'armor', 'mana'] },
  { id: 6662, name: 'Iceborn Gauntlet', icon: '/cdragon/item-icons/6662_tank_t3_iceborngauntlet.png', cost: 2600, legendary: true, tags: ['tank', 'armor'] },
  { id: 8020, name: 'Abyssal Mask', icon: '/cdragon/item-icons/8020_tank_t3_abyssalmask.png', cost: 2500, legendary: true, tags: ['tank', 'mr', 'mana'] },
  
  // Support items
  { id: 3190, name: 'Locket of the Iron Solari', icon: '/cdragon/item-icons/3190_enchanter_t4_locketofironsolari.png', cost: 2200, legendary: true, tags: ['support', 'tank'] },
  { id: 3504, name: 'Ardent Censer', icon: '/cdragon/item-icons/3504_enchanter_t3_ardentcenser.png', cost: 2300, legendary: true, tags: ['support', 'enchanter'] },
  { id: 3222, name: "Mikael's Blessing", icon: '/cdragon/item-icons/3222_enchanter_t3_mikaelsblessing.png', cost: 2300, legendary: true, tags: ['support', 'enchanter'] },
  { id: 6617, name: 'Moonstone Renewer', icon: '/cdragon/item-icons/6617_enchanter_t4_moonstonerenewer.png', cost: 2500, legendary: true, tags: ['support', 'enchanter'] },
  { id: 3107, name: 'Redemption', icon: '/cdragon/item-icons/3107_support_t3_redemption.png', cost: 2300, legendary: true, tags: ['support', 'enchanter'] },
  
  // Boots
  { id: 3006, name: "Berserker's Greaves", icon: '/cdragon/item-icons/3006_class_t2_berserkersgreaves.png', cost: 1100, tags: ['boots'] },
  { id: 3047, name: 'Plated Steelcaps', icon: '/cdragon/item-icons/3047_class_t2_ninjatabi.png', cost: 1100, tags: ['boots', 'armor'] },
  { id: 3020, name: "Sorcerer's Shoes", icon: '/cdragon/item-icons/3020_class_t2_sorcerersshoes.png', cost: 1100, tags: ['boots', 'ap'] },
  { id: 3111, name: "Mercury's Treads", icon: '/cdragon/item-icons/3111_class_t2_mercurystreads.png', cost: 1100, tags: ['boots', 'mr'] },
  { id: 3158, name: 'Ionian Boots of Lucidity', icon: '/cdragon/item-icons/3158_class_t2_ionianbootsoflucidity.png', cost: 900, tags: ['boots', 'cdr'] },
  { id: 3009, name: 'Boots of Swiftness', icon: '/cdragon/item-icons/3009_class_t2_bootsofswiftness.png', cost: 900, tags: ['boots'] },
];

// Component items
export const COMPONENT_ITEMS: Item[] = [
  { id: 1001, name: 'Boots', icon: '/cdragon/item-icons/1001_class_t1_bootsofspeed.png', cost: 300, tags: ['boots'] },
  { id: 1036, name: 'Long Sword', icon: '/cdragon/item-icons/1036_class_t1_longsword.png', cost: 350, tags: ['ad'] },
  { id: 1037, name: 'Pickaxe', icon: '/cdragon/item-icons/1037_class_t1_pickaxe.png', cost: 875, tags: ['ad'] },
  { id: 1038, name: 'B.F. Sword', icon: '/cdragon/item-icons/1038_marksman_t1_bfsword.png', cost: 1300, tags: ['ad'] },
  { id: 1052, name: 'Amplifying Tome', icon: '/cdragon/item-icons/1052_mage_t2_amptome.png', cost: 435, tags: ['ap'] },
  { id: 1026, name: 'Blasting Wand', icon: '/cdragon/item-icons/1026_mage_t1_blastingwand.png', cost: 850, tags: ['ap'] },
  { id: 1058, name: 'Needlessly Large Rod', icon: '/cdragon/item-icons/1058_mage_t1_largerod.png', cost: 1250, tags: ['ap'] },
  { id: 1042, name: 'Dagger', icon: '/cdragon/item-icons/1042_base_t1_dagger.png', cost: 300, tags: ['as'] },
  { id: 1043, name: 'Recurve Bow', icon: '/cdragon/item-icons/1043_base_t2_recurvebow.png', cost: 1000, tags: ['as'] },
  { id: 1028, name: 'Ruby Crystal', icon: '/cdragon/item-icons/1028_base_t1_rubycrystal.png', cost: 400, tags: ['health'] },
  { id: 1011, name: "Giant's Belt", icon: '/cdragon/item-icons/1011_class_t2_giantsbelt.png', cost: 900, tags: ['health'] },
  { id: 1029, name: 'Cloth Armor', icon: '/cdragon/item-icons/1029_base_t1_clotharmor.png', cost: 300, tags: ['armor'] },
  { id: 1031, name: 'Chain Vest', icon: '/cdragon/item-icons/1031_base_t2_chainvest.png', cost: 800, tags: ['armor'] },
  { id: 1033, name: 'Null-Magic Mantle', icon: '/cdragon/item-icons/1033_base_t1_magicmantle.png', cost: 450, tags: ['mr'] },
  { id: 1057, name: 'Negatron Cloak', icon: '/cdragon/item-icons/1057_tank_t2_negatroncloak.png', cost: 900, tags: ['mr'] },
];

// Starter items
export const STARTER_ITEMS: Item[] = [
  { id: 1054, name: "Doran's Shield", icon: '/cdragon/item-icons/1054_tank_t1_doransshield.png', cost: 450, tags: ['starter', 'tank'] },
  { id: 1055, name: "Doran's Blade", icon: '/cdragon/item-icons/1055_marksman_t1_doransblade.png', cost: 450, tags: ['starter', 'ad'] },
  { id: 1056, name: "Doran's Ring", icon: '/cdragon/item-icons/1056_mage_t1_doransring.png', cost: 400, tags: ['starter', 'ap'] },
  { id: 1082, name: 'Dark Seal', icon: '/cdragon/item-icons/1082_mage_t1_darkseal.png', cost: 350, tags: ['starter', 'ap'] },
  { id: 1083, name: 'Cull', icon: '/cdragon/item-icons/1083_marksman_t1_cull.png', cost: 450, tags: ['starter', 'ad'] },
];

