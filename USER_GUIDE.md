# User Guide - League of Legends Stats Website

## Welcome! 🎮

This guide will help you navigate and use all the features of your new LoL Stats website.

## Main Page Layout

### Left Sidebar - Champion Grid

The left sidebar shows all champions in a scrollable grid:

- **5 columns** of champion portraits
- **Tier badge** on each champion (S, A, B, C, D)
- **Search box** at the top to find champions quickly
- **Click any champion** to view their details
- **Hover** to see champion name

#### Using the Search
1. Click the search box
2. Type champion name (e.g., "Ahri", "Yasuo")
3. Results update instantly
4. Clear to see all champions again

### Main Content - Statistics Table

The main area shows a detailed statistics table:

#### Role Filter Tabs
At the top, you'll see role filters:
- **All**: Show all champions
- **Top**: Top lane champions
- **Jungle**: Jungle champions
- **Middle**: Mid lane champions
- **Bottom**: ADC/Bottom lane champions
- **Support**: Support champions

Click any tab to filter champions by role.

#### Table Columns

1. **Rank**
   - Current position in the list
   - Changes based on sort order

2. **Champion**
   - Champion icon and name
   - Click to view champion details

3. **Tier** 
   - Colored badge (S/A/B/C/D)
   - Click header to sort by tier
   - **S** (Red): Top tier, highest win rate
   - **A** (Orange): Strong picks
   - **B** (Yellow): Balanced
   - **C** (Green): Situational
   - **D** (Gray): Weak/niche

4. **Role**
   - Emoji icons showing champion roles
   - ⚔️ Top/Fighter
   - 🌲 Jungle
   - ✨ Middle/Mage
   - 🏹 Bottom/ADC
   - 🛡️ Support/Tank

5. **Win Rate**
   - Percentage of games won
   - **Red** (≥52%): Very strong
   - **Green** (≥50%): Good
   - **Gray** (<50%): Weak
   - Click header to sort

6. **Pick Rate**
   - How often the champion is picked
   - Higher = more popular
   - Click header to sort

7. **Ban Rate**
   - How often the champion is banned
   - Higher = stronger/more annoying
   - Click header to sort

8. **Weak Against**
   - 3 champion icons that counter this champion
   - Hover to see champion names
   - Click to view counter champion

## How to Use

### Finding a Champion

**Method 1: Browse the Grid**
1. Scroll through the left sidebar
2. Look for the champion icon
3. Click to view details

**Method 2: Use Search**
1. Type champion name in search box
2. Find champion in grid or table
3. Click to view details

**Method 3: Filter by Role**
1. Click role tab (Top, Jungle, etc.)
2. Browse filtered champions
3. Click to view details

### Understanding Statistics

#### What is a good win rate?
- **53%+**: Excellent (S tier)
- **50-53%**: Good (A-B tier)
- **48-50%**: Average (B-C tier)
- **Below 48%**: Weak (D tier)

#### What is a good pick rate?
- **10%+**: Very popular
- **5-10%**: Popular
- **2-5%**: Moderate
- **Below 2%**: Niche

#### What is a high ban rate?
- **20%+**: Extremely threatening
- **10-20%**: Often banned
- **5-10%**: Occasionally banned
- **Below 5%**: Rarely banned

### Sorting the Table

Click any sortable column header to sort:
- **Tier**: Sort by champion strength (S → D)
- **Win Rate**: Sort by win percentage
- **Pick Rate**: Sort by popularity
- **Ban Rate**: Sort by ban frequency

A **▼** indicator shows which column is active.

### Viewing Champion Details

Click any champion name or icon to see:
- Full splash art
- Champion lore/story
- All abilities (Passive + Q/W/E/R)
- Ability videos and descriptions
- Stats (Damage, Durability, etc.)
- All champion skins
- Tactical information

## Tips & Tricks

### Finding OP Champions
1. Sort by **Win Rate** (click column)
2. Look for **S tier** badges
3. Check if **Ban Rate** is high
4. These are the strongest picks!

### Finding Your Main
1. Click your preferred **Role** tab
2. Browse champions in that role
3. Click to learn about each one
4. Try champions with good win rates

### Learning Counters
1. Find your champion in the list
2. Look at **Weak Against** column
3. See which champions counter yours
4. Click counter icons to learn about them

### Finding Unpopular Gems
1. Sort by **Pick Rate**
2. Scroll to bottom
3. Look for high **Win Rate** + low **Pick Rate**
4. These are hidden strong picks!

## Navigation

### Header Menu
- **LoL Stats**: Click logo to return home
- **Champions**: View champion list (home page)

### Breadcrumbs
- On champion detail page: Click **← Back to Champions**

### Quick Access
- Champion grid is **always visible** in sidebar
- Click any champion anytime
- No need to go back to home page

## Mobile Experience

On mobile devices:
- Table scrolls horizontally
- Sidebar becomes collapsible
- Role tabs stack vertically
- All features remain accessible

## Understanding the Data

### About Statistics
The statistics shown are **generated for demonstration purposes**:
- Win rates: 47-55% (realistic range)
- Pick rates: 1-15%
- Ban rates: 0.5-25%
- Tier: Based on win rate

### Why Mock Data?
- No Riot API key required
- No rate limits
- Works offline
- Perfect for learning the interface

### Getting Real Data
To use real statistics:
1. Sign up for [Riot Developer Account](https://developer.riotgames.com/)
2. Get API key
3. Integrate with backend
4. Fetch live match data

See `STATISTICS.md` for implementation details.

## Frequently Asked Questions

### Q: Are these real statistics?
A: No, they are realistic mock data for demonstration. For real stats, visit [op.gg](https://op.gg) or [u.gg](https://u.gg).

### Q: How often are stats updated?
A: The mock data is deterministic and doesn't change. With real API integration, you could update hourly.

### Q: Can I see my ranked stats?
A: Not currently. This would require Riot API integration and a summoner lookup feature.

### Q: Why do some champions have multiple roles?
A: Many champions are viable in multiple roles (e.g., Morgana support/jungle).

### Q: How are tiers calculated?
A: Tiers are based on win rate:
- S: ≥53%
- A: 51.5-53%
- B: 50-51.5%
- C: 48.5-50%
- D: <48.5%

### Q: Can I save favorite champions?
A: Not yet, but this would be a great feature to add!

### Q: Does this work offline?
A: Yes! All champion data is stored locally. Only images require internet.

## Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Enter**: Activate selected link/button
- **Escape**: Clear search (when focused)
- **Arrow Keys**: Navigate table

## Browser Compatibility

Works best on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance

The site is optimized for speed:
- ⚡ Static pages load instantly
- ⚡ Search is instant (no server calls)
- ⚡ Filtering is instant (client-side)
- ⚡ Sorting is instant (cached in memory)

## Privacy

This site:
- 🔒 No login required
- 🔒 No data collection
- 🔒 No cookies (except system preferences)
- 🔒 No tracking
- 🔒 No ads

## Contributing

Want to improve the site? Ideas:
- Add more statistics
- Integrate Riot API
- Add champion builds
- Add summoner lookup
- Add match history
- Add champion comparisons

## Support

Need help? Check:
- `README.md` - Setup and installation
- `STATISTICS.md` - Statistics system
- `FEATURES.md` - Feature overview
- `DEPLOYMENT.md` - Deployment guide

## Enjoy! 🎮

Explore all 170+ champions, learn their abilities, and find your next main!

**Happy gaming!** ⚡🎯🔥

