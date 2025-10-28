import Link from "next/link";
import Image from "next/image";
import { getAllChampions, getChampionIconPath } from "@/lib/champions";

export default function Home() {
  const champions = getAllChampions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            League of Legends Champions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Browse and explore all {champions.length} champions
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search champions..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {champions.length} Champions
          </div>
        </div>

        {/* Champions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {champions.map((champion) => (
            <Link
              key={champion.id}
              href={`/champions/${champion.id}`}
              className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={getChampionIconPath(champion.id)}
                  alt={champion.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-center text-slate-900 dark:text-white truncate">
                  {champion.name}
                </h3>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 truncate">
                  {champion.title}
                </p>
                {champion.roles.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 justify-center">
                    {champion.roles.slice(0, 2).map((role) => (
                      <span
                        key={role}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
