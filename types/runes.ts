// Rune system types based on League of Legends rune system

export interface Rune {
  id: number;
  name: string;
  icon: string;
  description?: string;
}

export interface RuneTree {
  id: number;
  name: string;
  icon: string;
  slots: {
    keystones: Rune[];
    slot1: Rune[];
    slot2: Rune[];
    slot3: Rune[];
  };
}

export interface RunePage {
  primaryTree: number; // RuneTree id
  secondaryTree: number; // RuneTree id
  keystone: number; // Rune id
  primaryRunes: number[]; // 3 rune ids from primary tree
  secondaryRunes: number[]; // 2 rune ids from secondary tree
  statShards: number[]; // 3 stat shard ids
}

export interface RunePageWithStats extends RunePage {
  pickRate: number;
  winRate: number;
  games: number;
}

export const RUNE_TREES: RuneTree[] = [
  {
    id: 8000,
    name: 'Precision',
    icon: '/cdragon/perk-images/7201_precision.png',
    slots: {
      keystones: [
        { id: 8005, name: 'Press the Attack', icon: '/cdragon/perk-images/precision/presstheattack/presstheattack.png' },
        { id: 8008, name: 'Lethal Tempo', icon: '/cdragon/perk-images/precision/lethaltempo/lethaltempotemp.png' },
        { id: 8021, name: 'Fleet Footwork', icon: '/cdragon/perk-images/precision/fleetfootwork/fleetfootwork.png' },
        { id: 8010, name: 'Conqueror', icon: '/cdragon/perk-images/precision/conqueror/conqueror.png' },
      ],
      slot1: [
        { id: 9101, name: 'Overheal', icon: '/cdragon/perk-images/precision/absorblife/absorblife.png' },
        { id: 9111, name: 'Triumph', icon: '/cdragon/perk-images/precision/triumph.png' },
        { id: 8009, name: 'Presence of Mind', icon: '/cdragon/perk-images/precision/presenceofmind/presenceofmind.png' },
      ],
      slot2: [
        { id: 9104, name: 'Legend: Alacrity', icon: '/cdragon/perk-images/precision/legendalacrity/legendalacrity.png' },
        { id: 9105, name: 'Legend: Haste', icon: '/cdragon/perk-images/precision/legendhaste/legendhaste.png' },
        { id: 9103, name: 'Legend: Bloodline', icon: '/cdragon/perk-images/precision/legendbloodline/legendbloodline.png' },
      ],
      slot3: [
        { id: 8014, name: 'Coup de Grace', icon: '/cdragon/perk-images/precision/coupdegrace/coupdegrace.png' },
        { id: 8017, name: 'Cut Down', icon: '/cdragon/perk-images/precision/cutdown/cutdown.png' },
        { id: 8299, name: 'Last Stand', icon: '/cdragon/perk-images/sorcery/laststand/laststand.png' },
      ],
    },
  },
  {
    id: 8100,
    name: 'Domination',
    icon: '/cdragon/perk-images/7200_domination.png',
    slots: {
      keystones: [
        { id: 8112, name: 'Electrocute', icon: '/cdragon/perk-images/domination/electrocute/electrocute.png' },
        { id: 8124, name: 'Predator', icon: '/cdragon/perk-images/domination/predator/predator.png' },
        { id: 8128, name: 'Dark Harvest', icon: '/cdragon/perk-images/domination/darkharvest/darkharvest.png' },
        { id: 9923, name: 'Hail of Blades', icon: '/cdragon/perk-images/domination/hailofblades/hailofblades.png' },
      ],
      slot1: [
        { id: 8126, name: 'Cheap Shot', icon: '/cdragon/perk-images/domination/cheapshot/cheapshot.png' },
        { id: 8139, name: 'Taste of Blood', icon: '/cdragon/perk-images/domination/tasteofblood/greenterror_tasteofblood.png' },
        { id: 8143, name: 'Sudden Impact', icon: '/cdragon/perk-images/domination/suddenimpact/suddenimpact.png' },
      ],
      slot2: [
        { id: 8136, name: 'Zombie Ward', icon: '/cdragon/perk-images/domination/zombieward/zombieward.png' },
        { id: 8120, name: 'Ghost Poro', icon: '/cdragon/perk-images/domination/ghostporo/ghostporo.png' },
        { id: 8138, name: 'Eyeball Collection', icon: '/cdragon/perk-images/domination/eyeballcollection/eyeballcollection.png' },
      ],
      slot3: [
        { id: 8135, name: 'Treasure Hunter', icon: '/cdragon/perk-images/domination/treasurehunter/treasurehunter.png' },
        { id: 8134, name: 'Ingenious Hunter', icon: '/cdragon/perk-images/domination/ingenioushunter/ingenioushunter.png' },
        { id: 8105, name: 'Relentless Hunter', icon: '/cdragon/perk-images/domination/relentlesshunter/relentlesshunter.png' },
        { id: 8106, name: 'Ultimate Hunter', icon: '/cdragon/perk-images/domination/ultimatehunter/ultimatehunter.png' },
      ],
    },
  },
  {
    id: 8200,
    name: 'Sorcery',
    icon: '/cdragon/perk-images/7202_sorcery.png',
    slots: {
      keystones: [
        { id: 8214, name: 'Summon Aery', icon: '/cdragon/perk-images/sorcery/summonaery/summonaery.png' },
        { id: 8229, name: 'Arcane Comet', icon: '/cdragon/perk-images/sorcery/arcanecomet/arcanecomet.png' },
        { id: 8230, name: 'Phase Rush', icon: '/cdragon/perk-images/sorcery/phaserush/phaserush.png' },
      ],
      slot1: [
        { id: 8224, name: 'Nullifying Orb', icon: '/cdragon/perk-images/sorcery/nullifyingorb/axiom_arcanist.png' },
        { id: 8226, name: 'Manaflow Band', icon: '/cdragon/perk-images/sorcery/manaflowband/manaflowband.png' },
        { id: 8275, name: 'Nimbus Cloak', icon: '/cdragon/perk-images/sorcery/nimbuscloak/6361.png' },
      ],
      slot2: [
        { id: 8210, name: 'Transcendence', icon: '/cdragon/perk-images/sorcery/transcendence/transcendence.png' },
        { id: 8234, name: 'Celerity', icon: '/cdragon/perk-images/sorcery/celerity/celeritytemp.png' },
        { id: 8233, name: 'Absolute Focus', icon: '/cdragon/perk-images/sorcery/absolutefocus/absolutefocus.png' },
      ],
      slot3: [
        { id: 8237, name: 'Scorch', icon: '/cdragon/perk-images/sorcery/scorch/scorch.png' },
        { id: 8232, name: 'Waterwalking', icon: '/cdragon/perk-images/sorcery/waterwalking/waterwalking.png' },
        { id: 8236, name: 'Gathering Storm', icon: '/cdragon/perk-images/sorcery/gatheringstorm/gatheringstorm.png' },
      ],
    },
  },
  {
    id: 8400,
    name: 'Resolve',
    icon: '/cdragon/perk-images/7204_resolve.png',
    slots: {
      keystones: [
        { id: 8437, name: 'Grasp of the Undying', icon: '/cdragon/perk-images/resolve/graspoftheundying/graspoftheundying.png' },
        { id: 8439, name: 'Aftershock', icon: '/cdragon/perk-images/resolve/veteranaftershock/veteranaftershock.png' },
        { id: 8465, name: 'Guardian', icon: '/cdragon/perk-images/resolve/guardian/guardian.png' },
      ],
      slot1: [
        { id: 8446, name: 'Demolish', icon: '/cdragon/perk-images/resolve/demolish/demolish.png' },
        { id: 8463, name: 'Font of Life', icon: '/cdragon/perk-images/resolve/fontoflife/fontoflife.png' },
        { id: 8401, name: 'Shield Bash', icon: '/cdragon/perk-images/resolve/mirrorshell/mirrorshell.png' },
      ],
      slot2: [
        { id: 8429, name: 'Conditioning', icon: '/cdragon/perk-images/resolve/conditioning/conditioning.png' },
        { id: 8444, name: 'Second Wind', icon: '/cdragon/perk-images/resolve/secondwind/secondwind.png' },
        { id: 8473, name: 'Bone Plating', icon: '/cdragon/perk-images/resolve/boneplating/boneplating.png' },
      ],
      slot3: [
        { id: 8451, name: 'Overgrowth', icon: '/cdragon/perk-images/resolve/overgrowth/overgrowth.png' },
        { id: 8453, name: 'Revitalize', icon: '/cdragon/perk-images/resolve/revitalize/revitalize.png' },
        { id: 8242, name: 'Unflinching', icon: '/cdragon/perk-images/sorcery/unflinching/unflinching.png' },
      ],
    },
  },
  {
    id: 8300,
    name: 'Inspiration',
    icon: '/cdragon/perk-images/7203_whimsy.png',
    slots: {
      keystones: [
        { id: 8351, name: 'Glacial Augment', icon: '/cdragon/perk-images/inspiration/glacialaugment/glacialaugment.png' },
        { id: 8360, name: 'Unsealed Spellbook', icon: '/cdragon/perk-images/inspiration/unsealedspellbook/unsealedspellbook.png' },
        { id: 8369, name: 'First Strike', icon: '/cdragon/perk-images/inspiration/firststrike/firststrike.png' },
      ],
      slot1: [
        { id: 8306, name: 'Hextech Flashtraption', icon: '/cdragon/perk-images/inspiration/hextechflashtraption/hextechflashtraption.png' },
        { id: 8304, name: 'Magical Footwear', icon: '/cdragon/perk-images/inspiration/magicalfootwear/magicalfootwear.png' },
        { id: 8321, name: 'Perfect Timing', icon: '/cdragon/perk-images/inspiration/perfecttiming/alchemistcabinet.png' },
      ],
      slot2: [
        { id: 8313, name: 'Triple Tonic', icon: '/cdragon/perk-images/inspiration/timewarptonic/timewarptonic.png' },
        { id: 8352, name: 'Time Warp Tonic', icon: '/cdragon/perk-images/inspiration/timewarptonic/timewarptonic.png' },
        { id: 8345, name: 'Biscuit Delivery', icon: '/cdragon/perk-images/inspiration/biscuitdelivery/biscuitdelivery.png' },
      ],
      slot3: [
        { id: 8347, name: 'Cosmic Insight', icon: '/cdragon/perk-images/inspiration/cosmicinsight/cosmicinsight.png' },
        { id: 8410, name: 'Approach Velocity', icon: '/cdragon/perk-images/resolve/approachvelocity/approachvelocity.png' },
        { id: 8316, name: 'Jack of All Trades', icon: '/cdragon/perk-images/inspiration/jackofalltrades/jackofalltrades2.png' },
      ],
    },
  },
];

// Stat shards
export const STAT_SHARDS = {
  offense: [
    { id: 5008, name: 'Adaptive Force', value: '+9 Adaptive Force' },
    { id: 5005, name: 'Attack Speed', value: '+10% Attack Speed' },
    { id: 5007, name: 'Ability Haste', value: '+8 Ability Haste' },
  ],
  flex: [
    { id: 5008, name: 'Adaptive Force', value: '+9 Adaptive Force' },
    { id: 5002, name: 'Armor', value: '+6 Armor' },
    { id: 5003, name: 'Magic Resist', value: '+8 Magic Resist' },
  ],
  defense: [
    { id: 5001, name: 'Health', value: '+15-140 Health' },
    { id: 5002, name: 'Armor', value: '+6 Armor' },
    { id: 5003, name: 'Magic Resist', value: '+8 Magic Resist' },
  ],
};

