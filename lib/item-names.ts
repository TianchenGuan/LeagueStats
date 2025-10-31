// Comprehensive League of Legends item ID to name mapping
// Based on Season 7-8 era items from match data
export const ITEM_NAMES: Record<number, string> = {
  // Boots
  1001: "Boots",
  3006: "Berserker's Greaves",
  3009: "Boots of Swiftness",
  3020: "Sorcerer's Shoes",
  3047: "Plated Steelcaps",
  3111: "Mercury's Treads",
  3117: "Boots of Mobility",
  3158: "Ionian Boots of Lucidity",
  
  // Starter/Consumable items
  1054: "Doran's Shield",
  1055: "Doran's Blade",
  1056: "Doran's Ring",
  1082: "Dark Seal",
  2003: "Health Potion",
  2031: "Refillable Potion",
  2033: "Corrupting Potion",
  2045: "Ruby Sightstone",
  2049: "Guardian's Amulet",
  2055: "Control Ward",
  
  // Component items
  1011: "Giant's Belt",
  1026: "Blasting Wand",
  1028: "Ruby Crystal",
  1029: "Cloth Armor",
  1031: "Chain Vest",
  1036: "Long Sword",
  1037: "Pickaxe",
  1038: "B.F. Sword",
  1039: "Hunter's Talisman",
  1041: "Obsidian Edge",
  1042: "Dagger",
  1043: "Recurve Bow",
  1052: "Amplifying Tome",
  1053: "Vampiric Scepter",
  1058: "Needlessly Large Rod",
  
  // Jungle items (Season 7)
  1400: "Enchantment: Warrior",
  1401: "Enchantment: Cinderhulk",
  1402: "Enchantment: Runic Echoes",
  1408: "Tracker's Knife (Warrior)",
  1409: "Hunter's Talisman",
  1410: "Hunter's Machete",
  1412: "Tracker's Knife",
  1413: "Stalker's Blade (Warrior)",
  1414: "Skirmisher's Sabre (Warrior)",
  1416: "Enchantment: Bloodrazor",
  1419: "Stalker's Blade",
  
  // Support starter items
  2301: "Eye of the Watchers",
  2302: "Eye of the Equinox",
  2303: "Eye of the Oasis",
  
  // Legendary items
  3001: "Abyssal Mask",
  3004: "Manamune",
  3022: "Frozen Mallet",
  3025: "Iceborn Gauntlet",
  3026: "Guardian Angel",
  3027: "Rod of Ages",
  3030: "Hextech GLP-800",
  3031: "Infinity Edge",
  3036: "Lord Dominik's Regards",
  3040: "Seraph's Embrace",
  3042: "Muramana",
  3046: "Phantom Dancer",
  3053: "Sterak's Gage",
  3065: "Spirit Visage",
  3068: "Sunfire Cape",
  3069: "Remnant of the Watchers",
  3070: "Tear of the Goddess",
  3071: "Black Cleaver",
  3072: "The Bloodthirster",
  3074: "Ravenous Hydra",
  3075: "Thornmail",
  3077: "Tiamat",
  3078: "Trinity Force",
  3083: "Warmog's Armor",
  3085: "Runaan's Hurricane",
  3086: "Zeal",
  3087: "Statikk Shiv",
  3089: "Rabadon's Deathcap",
  3091: "Wit's End",
  3092: "Frost Queen's Claim",
  3094: "Rapid Firecannon",
  3096: "Nomad's Medallion",
  3097: "Targon's Brace",
  3098: "Frostfang",
  3100: "Lich Bane",
  3102: "Banshee's Veil",
  3107: "Redemption",
  3109: "Knight's Vow",
  3110: "Frozen Heart",
  3113: "Aether Wisp",
  3114: "Forbidden Idol",
  3115: "Nashor's Tooth",
  3116: "Rylai's Crystal Scepter",
  3124: "Guinsoo's Rageblade",
  3134: "Serrated Dirk",
  3135: "Void Staff",
  3142: "Youmuu's Ghostblade",
  3143: "Randuin's Omen",
  3144: "Bilgewater Cutlass",
  3146: "Hextech Gunblade",
  3147: "Haunting Guise",
  3151: "Liandry's Torment",
  3152: "Hextech Protobelt",
  3153: "Blade of the Ruined King",
  3155: "Hexdrinker",
  3156: "Maw of Malmortius",
  3157: "Zhonya's Hourglass",
  3165: "Morellonomicon",
  3174: "Athene's Unholy Grail",
  3190: "Locket of the Iron Solari",
  3193: "Gargoyle Stoneplate",
  3198: "Spectre's Cowl",
  3285: "Luden's Echo",
  3401: "Face of the Mountain",
  3504: "Ardent Censer",
  3508: "Essence Reaver",
  3512: "Zz'Rot Portal",
  3711: "Poro-Snax",
  3742: "Dead Man's Plate",
  3748: "Titanic Hydra",
  3800: "Righteous Glory",
  3801: "Crystalline Bracer",
  3812: "Death's Dance",
  
  // Support items
  3850: "Spellthief's Edge",
  3851: "Frostfang",
  3853: "Shard of True Ice",
  3858: "Relic Shield",
  3862: "Spectral Sickle",
  
  // Trinkets
  3340: "Warding Totem",
  3363: "Farsight Alteration",
  3364: "Oracle Lens",
  
  // Elixirs
  2138: "Elixir of Iron",
  2139: "Elixir of Sorcery",
  2140: "Elixir of Wrath",
};

// Import the generated icon mapping
import { ITEM_ICON_MAP } from './item-icon-map';

export function getItemName(itemId: number): string {
  return ITEM_NAMES[itemId] || `Item ${itemId}`;
}

export function getItemIconPath(itemId: number): string {
  const filename = ITEM_ICON_MAP[itemId.toString()];
  if (filename) {
    return `/cdragon/item-icons/${filename}`;
  }
  // Return empty placeholder for items without icons
  return `/cdragon/item-icons/gp_ui_placeholder.png`;
}
