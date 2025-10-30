import { getAllChampions } from "@/lib/champions";
import { getChampionsWithStats } from "@/lib/statistics";
import ChampionsList from "@/components/ChampionsList";

export default function Home() {
  const champions = getAllChampions();
  const championsWithStats = getChampionsWithStats(champions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="container mx-auto px-4 py-8 max-w-[1600px]">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                League of Legends Champions
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Browse and explore all {champions.length} champions with statistics
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
              <span className="text-2xl">🔥</span>
              <div className="text-sm">
                <div className="font-bold">Today's Hot</div>
                <div className="text-xs opacity-90">Updated hourly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Champions List with Stats */}
        <ChampionsList 
          champions={championsWithStats} 
          allChampions={championsWithStats}
        />
      </main>
    </div>
  );
}
