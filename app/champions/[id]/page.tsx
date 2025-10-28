import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChampionById, getChampionIconPath, getChampionSplashPath, getAbilityIconPath, getAllChampionIds } from '@/lib/champions';

interface ChampionPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all champions
export async function generateStaticParams() {
  const championIds = getAllChampionIds();
  return championIds.map((id) => ({
    id: id.toString(),
  }));
}

export default async function ChampionPage({ params }: ChampionPageProps) {
  const { id } = await params;
  const championId = parseInt(id);
  
  if (isNaN(championId)) {
    notFound();
  }

  const champion = getChampionById(championId);

  if (!champion) {
    notFound();
  }

  const baseSkin = champion.skins.find(skin => skin.isBase);
  const splashUrl = baseSkin ? getChampionSplashPath(baseSkin.uncenteredSplashPath) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section with Splash Art */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          {splashUrl && (
            <Image
              src={splashUrl}
              alt={champion.name}
              fill
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end gap-6">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl">
              <Image
                src={getChampionIconPath(champion.id)}
                alt={champion.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-5xl font-bold text-white mb-2">{champion.name}</h1>
              <p className="text-2xl text-slate-200">{champion.title}</p>
              <div className="flex gap-2 mt-3">
                {champion.roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-sm text-white text-sm font-medium"
                  >
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:shadow-md transition-all mb-8"
        >
          <span>←</span>
          <span>Back to Champions</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lore */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-200 dark:border-zinc-700">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Lore</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{champion.shortBio}</p>
            </div>

            {/* Abilities */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-200 dark:border-zinc-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Abilities</h2>
              
              <div className="space-y-6">
                {/* Passive */}
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-yellow-500 flex-shrink-0">
                    <Image
                      src={getAbilityIconPath(champion.passive.abilityIconPath)}
                      alt={champion.passive.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-500 text-white">PASSIVE</span>
                      <h3 className="font-bold text-slate-900 dark:text-white">{champion.passive.name}</h3>
                    </div>
                    <p 
                      className="text-sm text-slate-600 dark:text-slate-400"
                      dangerouslySetInnerHTML={{ __html: champion.passive.description }}
                    />
                  </div>
                </div>

                {/* Spells */}
                {champion.spells.map((spell) => (
                  <div key={spell.spellKey} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-blue-500 flex-shrink-0">
                      <Image
                        src={getAbilityIconPath(spell.abilityIconPath)}
                        alt={spell.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500 text-white">
                          {spell.spellKey.toUpperCase()}
                        </span>
                        <h3 className="font-bold text-slate-900 dark:text-white">{spell.name}</h3>
                      </div>
                      {spell.cost && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          Cost: {spell.cost} | Cooldown: {spell.cooldown}
                        </p>
                      )}
                      <p 
                        className="text-sm text-slate-600 dark:text-slate-400"
                        dangerouslySetInnerHTML={{ __html: spell.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skins */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-200 dark:border-zinc-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Skins ({champion.skins.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {champion.skins.map((skin) => (
                  <div
                    key={skin.id}
                    className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-700 group"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={getChampionSplashPath(skin.tilePath)}
                        alt={skin.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900">
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                        {skin.name}
                      </h3>
                      {skin.rarity !== 'kNoRarity' && (
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          {skin.rarity.replace('k', '')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-200 dark:border-zinc-700">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Stats</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Damage</span>
                    <span className="font-bold text-slate-900 dark:text-white">{champion.playstyleInfo.damage}/3</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      style={{ width: `${(champion.playstyleInfo.damage / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Durability</span>
                    <span className="font-bold text-slate-900 dark:text-white">{champion.playstyleInfo.durability}/3</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${(champion.playstyleInfo.durability / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Crowd Control</span>
                    <span className="font-bold text-slate-900 dark:text-white">{champion.playstyleInfo.crowdControl}/3</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(champion.playstyleInfo.crowdControl / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Mobility</span>
                    <span className="font-bold text-slate-900 dark:text-white">{champion.playstyleInfo.mobility}/3</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                      style={{ width: `${(champion.playstyleInfo.mobility / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">Utility</span>
                    <span className="font-bold text-slate-900 dark:text-white">{champion.playstyleInfo.utility}/3</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                      style={{ width: `${(champion.playstyleInfo.utility / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Info */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-slate-200 dark:border-zinc-700">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Info</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Difficulty</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {champion.tacticalInfo.difficulty}/3
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Attack Type</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">
                    {champion.tacticalInfo.attackType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Damage Type</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {champion.tacticalInfo.damageType.replace('k', '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

