# Scripts Directory

## Available Scripts

### 1. `update-data.js`
Downloads champion data and icons from Community Dragon.

```bash
npm run update-data
```

**What it does:**
- Downloads champion JSON files
- Downloads champion icon images
- Saves to `public/cdragon/`

**When to run:**
- After champion releases
- When champion data changes
- Initial setup

---

### 2. `process-match-data.js` ⭐ **NEW**
Processes match CSV files to generate real statistics.

```bash
npm run process-stats
```

**What it does:**
- Reads CSV files from `public/MatchData1/`
- Analyzes 99,999+ ranked games
- Calculates win/pick/ban rates
- Tracks positions and items
- Generates `lib/real-stats-data.json`

**Input files:**
- `public/MatchData1/matches.csv`
- `public/MatchData1/participants.csv`
- `public/MatchData1/stats1.csv`
- `public/MatchData1/teambans.csv`

**Output:**
- `lib/real-stats-data.json` (85KB)
- Statistics for 136+ champions

**Processing time:**
- ~5 seconds for 1.8M records
- 360,000 records/second

---

## Usage Examples

### First-Time Setup:
```bash
# 1. Download champion data
npm run update-data

# 2. Process match statistics
npm run process-stats

# 3. Build application
npm run build

# 4. Start dev server
npm run dev
```

### When You Have New Match Data:
```bash
# 1. Place CSV files in public/MatchData1/
# 2. Process statistics
npm run process-stats

# 3. Rebuild and deploy
npm run build
vercel deploy --prod
```

### Regular Maintenance:
```bash
# Update champion data (monthly)
npm run update-data

# Rebuild
npm run build
```

---

## Script Details

### update-data.js
```javascript
// Uses cdragon-dd CLI tool
// Downloads from Community Dragon CDN
// No API key required
```

### process-match-data.js
```javascript
// Pure Node.js (no dependencies)
// Parses CSV files
// Generates JSON statistics
// Handles errors gracefully
```

---

## Data Flow

```
Community Dragon
    ↓ (update-data.js)
public/cdragon/*.json
    ↓ (Next.js reads)
Website displays champions
    +
MatchData1 CSV files
    ↓ (process-match-data.js)
lib/real-stats-data.json
    ↓ (Next.js reads)
Website displays real statistics
```

---

## File Locations

### Input:
- `public/MatchData1/*.csv` - Match data
- `public/MatchData2/*.csv` - Alternative dataset (future use)
- Community Dragon CDN - Champion data

### Output:
- `public/cdragon/*.json` - Champion definitions
- `public/cdragon/icons/*.png` - Champion icons
- `lib/real-stats-data.json` - Processed statistics

---

## Troubleshooting

### "Cannot find module fs"
- This is normal for scripts (Node.js only)
- Don't import these scripts in client components

### "CSV parse error"
- Check CSV file integrity
- Verify file encoding (UTF-8)
- Ensure complete downloads

### "Champion ID not found"
- Some champions may be missing from datasets
- System falls back to mock data gracefully

---

## Performance

### update-data.js:
- Downloads: ~5MB total
- Time: 10-30 seconds (network dependent)
- Frequency: Monthly

### process-match-data.js:
- Reads: ~450MB CSV files
- Writes: ~85KB JSON file
- Time: ~5 seconds
- Memory: ~150MB peak
- Frequency: When new data available

---

## Future Scripts

### Planned:
- `process-matchdata2.js` - Process second dataset
- `merge-datasets.js` - Combine multiple sources
- `validate-stats.js` - Data quality checks
- `export-analytics.js` - Generate reports

---

## Questions?

See documentation:
- `REAL_DATA_INTEGRATION.md` - Overview
- `DATA_PROCESSING_DETAILS.md` - Technical details
- `IMPLEMENTATION_SUMMARY.md` - Complete guide

