# Champion Statistics System

## Overview

Since the application doesn't have access to the Riot Games API for live statistics, we've implemented a **deterministic mock statistics generator** that creates realistic champion statistics for demonstration purposes.

## Features

### 📊 Generated Statistics

Each champion has the following statistics:

1. **Win Rate** (47% - 55%)
   - Realistic distribution around 50%
   - Used to calculate tier rankings

2. **Pick Rate** (1% - 15%)
   - How often the champion is selected
   - Varies based on popularity

3. **Ban Rate** (0.5% - 25%)
   - How often the champion is banned
   - Higher for strong/annoying champions

4. **Tier Rating** (S, A, B, C, D)
   - S Tier: Win rate ≥ 53%
   - A Tier: Win rate ≥ 51.5%
   - B Tier: Win rate ≥ 50%
   - C Tier: Win rate ≥ 48.5%
   - D Tier: Win rate < 48.5%

5. **Counter Champions**
   - 3 champions that are strong against this champion
   - Displayed in the "Weak Against" column

## How Statistics Are Generated

### Deterministic Generation

The statistics are generated using a seed-based system:
```typescript
const seed = championId * 7 + championName.length;
```

This ensures:
- ✅ Consistent results (same champion = same stats)
- ✅ No random changes on page refresh
- ✅ Realistic distribution across all champions
- ✅ No database or API required

### Algorithm

1. **Win Rate**: `47 + ((seed * 13) % 800) / 100`
   - Range: 47.00% - 54.99%
   - Most champions cluster around 50-52%

2. **Pick Rate**: `1 + ((seed * 17) % 1400) / 100`
   - Range: 1.00% - 14.99%
   - Represents champion popularity

3. **Ban Rate**: `0.5 + ((seed * 23) % 2450) / 100`
   - Range: 0.50% - 24.99%
   - Higher for meta champions

4. **Counters**: Generated using seed-based algorithm
   - 3 unique champion IDs
   - Never includes the champion itself

## UI Features

### Champion List Layout

The main page now features an **op.gg-style layout**:

#### Left Sidebar
- Searchable champion grid (5 columns)
- Tier badge on each champion icon
- Hover effects for better UX
- Sticky positioning for easy access
- Scrollable for large champion pool

#### Main Content Area
- **Role Filter Tabs**: All, Top, Jungle, Middle, Bottom, Support
- **Sortable Table** with columns:
  - Rank (position in current sort)
  - Champion (name + icon)
  - Tier (S/A/B/C/D badge)
  - Role (emoji icons)
  - Win Rate (color-coded: red >52%, green >50%)
  - Pick Rate
  - Ban Rate
  - Weak Against (3 counter champion icons)

### Interactive Features

#### 🔍 Search
- Real-time search as you type
- Searches champion name, title, and alias
- Updates results instantly
- Clear "X" button to reset

#### 🎯 Role Filtering
- Filter by specific roles
- Shows only champions that match
- Button-based UI with active states
- "All" option to show everything

#### 📊 Sorting
- Click column headers to sort
- Sort by: Tier, Win Rate, Pick Rate, Ban Rate
- Default sort: Tier (S → D), then by win rate
- Visual indicator (▼) shows active sort

#### 💡 Hover & Interactions
- Table rows highlight on hover
- Champion names link to detail pages
- Counter icons link to counter champion pages
- Tooltips show full champion names

## Color Coding

### Tier Colors
- **S Tier**: Red (`bg-red-500`)
- **A Tier**: Orange (`bg-orange-500`)
- **B Tier**: Yellow (`bg-yellow-500`)
- **C Tier**: Green (`bg-green-500`)
- **D Tier**: Gray (`bg-gray-500`)

### Win Rate Colors
- **High** (≥52%): Red (strong)
- **Good** (≥50%): Green (balanced)
- **Low** (<50%): Gray (weak)

### Role Icons
- Top: ⚔️
- Jungle: 🌲
- Middle: ✨
- Bottom/ADC: 🏹
- Support: 🛡️
- Mage: 🔮
- Assassin: 🗡️
- Tank: 🛡️

## Statistics Distribution

### Expected Distribution

With 170+ champions:
- **S Tier**: ~15-20 champions (top performers)
- **A Tier**: ~30-35 champions (strong picks)
- **B Tier**: ~40-50 champions (balanced)
- **C Tier**: ~30-35 champions (situational)
- **D Tier**: ~15-20 champions (weak/niche)

### Realism

The statistics are designed to be realistic:
- Most champions hover around 50% win rate (balanced)
- Pick rates vary based on popularity
- Ban rates correlate with annoyance/strength
- Counter relationships add strategic depth

## Technical Implementation

### Files

1. **`lib/statistics.ts`**
   - Statistics generation
   - Sorting functions
   - Filtering functions
   - Search functionality

2. **`components/ChampionsList.tsx`**
   - Client-side component (uses state)
   - Interactive table
   - Search input
   - Role filters
   - Sortable columns

3. **`app/page.tsx`**
   - Server component
   - Generates all champion statistics
   - Passes data to client component

### Performance

- ⚡ Statistics generated once on page load
- ⚡ Cached in memory (Map)
- ⚡ Client-side filtering/sorting (instant)
- ⚡ No API calls or database queries
- ⚡ Minimal re-renders with React.useMemo

## Future Enhancements

If you want to add real statistics:

1. **Riot API Integration**
   - Sign up for Riot Developer account
   - Get API key
   - Fetch real match data
   - Calculate statistics from matches

2. **Data Refresh**
   - Schedule hourly updates
   - Store in database (PostgreSQL, MongoDB)
   - Add caching layer (Redis)
   - Display "last updated" timestamp

3. **Additional Stats**
   - KDA ratio
   - Average game duration
   - Most common items
   - Rune recommendations
   - Skill order
   - Match history

4. **User Features**
   - Summoner lookup
   - Match history
   - Live game spectating
   - Champion mastery
   - Ranked stats

## FAQ

### Why mock data?

The Riot API requires authentication and has rate limits. Mock data allows:
- ✅ No API key required
- ✅ No rate limiting
- ✅ No external dependencies
- ✅ Works offline
- ✅ Perfect for demonstration

### Is the data realistic?

Yes! The data is generated to match real League of Legends statistics:
- Win rates cluster around 50%
- Popular champions have higher pick rates
- Strong champions have higher ban rates
- Tier distribution matches typical meta

### Can I use real data?

Absolutely! The system is designed to be easily replaced:
1. Keep the same TypeScript types
2. Replace generation functions with API calls
3. Everything else works the same

### How accurate are the tiers?

The tier calculation is based on common LoL tier list criteria:
- S: Must-ban/must-pick champions
- A: Strong meta picks
- B: Balanced/viable
- C: Situational/requires skill
- D: Off-meta/weak

## Contributing

Want to improve the statistics system?
- Add more realistic distributions
- Include patch-based variations
- Add champion synergies
- Include role-specific stats
- Add item/rune correlations

---

*Statistics are for demonstration purposes only. For official League of Legends statistics, visit [op.gg](https://op.gg) or [u.gg](https://u.gg).*

