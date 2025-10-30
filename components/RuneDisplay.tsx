'use client';

import Image from 'next/image';
import { RunePage, RUNE_TREES, STAT_SHARDS } from '@/types/runes';

interface RuneDisplayProps {
  runePage: RunePage;
  showStats?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function RuneDisplay({ runePage, showStats = false, size = 'medium' }: RuneDisplayProps) {
  const primaryTree = RUNE_TREES.find(t => t.id === runePage.primaryTree);
  const secondaryTree = RUNE_TREES.find(t => t.id === runePage.secondaryTree);
  
  if (!primaryTree || !secondaryTree) return null;
  
  // Find all runes
  const keystone = Object.values(primaryTree.slots.keystones).find(r => r.id === runePage.keystone);
  const primaryRunes = runePage.primaryRunes.map(id => 
    Object.values(primaryTree.slots).flat().find(r => r.id === id)
  );
  const secondaryRunes = runePage.secondaryRunes.map(id =>
    Object.values(secondaryTree.slots).flat().find(r => r.id === id)
  );
  
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  const keystoneSizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };
  
  return (
    <div className="flex items-center gap-2">
      {/* Primary Tree */}
      <div className="flex items-center gap-1.5">
        {/* Primary tree icon */}
        <div className="relative">
          <Image
            src={primaryTree.icon}
            alt={primaryTree.name}
            width={size === 'large' ? 48 : size === 'medium' ? 32 : 24}
            height={size === 'large' ? 48 : size === 'medium' ? 32 : 24}
            className="opacity-80"
          />
        </div>
        
        {/* Keystone */}
        {keystone && (
          <div className={`relative ${keystoneSizeClasses[size]} rounded-full overflow-hidden border-2 border-amber-500 bg-zinc-900`}>
            <Image
              src={keystone.icon}
              alt={keystone.name}
              fill
              className="object-cover"
              title={keystone.name}
            />
          </div>
        )}
        
        {/* Primary runes */}
        <div className="flex flex-col gap-0.5">
          {primaryRunes.map((rune, idx) => rune && (
            <div key={idx} className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border border-zinc-700 bg-zinc-900`}>
              <Image
                src={rune.icon}
                alt={rune.name}
                fill
                className="object-cover"
                title={rune.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Separator */}
      <div className="w-px h-12 bg-zinc-700" />
      
      {/* Secondary Tree */}
      <div className="flex items-center gap-1.5">
        {/* Secondary tree icon */}
        <div className="relative opacity-70">
          <Image
            src={secondaryTree.icon}
            alt={secondaryTree.name}
            width={size === 'large' ? 32 : size === 'medium' ? 24 : 20}
            height={size === 'large' ? 32 : size === 'medium' ? 24 : 20}
          />
        </div>
        
        {/* Secondary runes */}
        <div className="flex flex-col gap-0.5">
          {secondaryRunes.map((rune, idx) => rune && (
            <div key={idx} className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border border-zinc-700 bg-zinc-900`}>
              <Image
                src={rune.icon}
                alt={rune.name}
                fill
                className="object-cover"
                title={rune.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Stat Shards */}
      {showStats && (
        <>
          <div className="w-px h-12 bg-zinc-700" />
          <div className="flex flex-col gap-0.5">
            {runePage.statShards.map((shardId, idx) => {
              const shards = idx === 0 ? STAT_SHARDS.offense : idx === 1 ? STAT_SHARDS.flex : STAT_SHARDS.defense;
              const shard = shards.find(s => s.id === shardId);
              return shard && (
                <div key={idx} className={`${sizeClasses[size]} rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium`} title={shard.value}>
                  {idx === 0 ? '⚔️' : idx === 1 ? '🛡️' : '❤️'}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

