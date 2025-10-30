/**
 * Process match data from MatchData1 and MatchData2 to generate real champion statistics
 * This script analyzes CSV files to extract:
 * - Win rates (properly rounded)
 * - Ban rates
 * - Pick rates  
 * - Most used summoner spells
 * - Most bought items
 * - Champion roles/positions
 * - REAL counter matchups (champion vs champion win rates)
 */

const fs = require('fs');
const path = require('path');

// Paths to data files
const DATA_DIR1 = path.join(__dirname, '../public/MatchData1');
const DATA_DIR2 = path.join(__dirname, '../public/MatchData2');
const OUTPUT_FILE = path.join(__dirname, '../lib/real-stats-data.json');

// Read champion mapping from MatchData2
function loadChampionMapping() {
  try {
    const championInfo = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR2, 'champion_info.json'), 'utf8')
    );
    return championInfo.data;
  } catch (error) {
    console.log('Could not load champion_info.json, using fallback');
    return {};
  }
}

// Load summoner spell mapping
function loadSummonerSpellMapping() {
  try {
    const spellInfo = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR2, 'summoner_spell_info.json'), 'utf8')
    );
    return spellInfo;
  } catch (error) {
    console.log('Could not load summoner_spell_info.json');
    return {};
  }
}

// Parse CSV line (basic CSV parser)
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

// Properly round numbers to avoid floating point issues
function roundToDecimals(num, decimals = 2) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
}

// Process MatchData1
async function processMatchData1() {
  console.log('Processing MatchData1...');
  
  const stats = {
    champions: {},
    totalGames: 0,
    matchups: {} // Track champion vs champion
  };
  
  try {
    // Read matches data to get team info
    const matchesData = fs.readFileSync(path.join(DATA_DIR1, 'matches.csv'), 'utf8');
    const matchesLines = matchesData.split('\n');
    
    // Read participants data
    const participantsData = fs.readFileSync(path.join(DATA_DIR1, 'participants.csv'), 'utf8');
    const participantsLines = participantsData.split('\n');
    const participantsHeader = parseCSVLine(participantsLines[0]);
    
    console.log('Participants columns:', participantsHeader);
    
    // Find column indices
    const champIdIdx = participantsHeader.findIndex(h => h.includes('championid'));
    const roleIdx = participantsHeader.findIndex(h => h.includes('role'));
    const positionIdx = participantsHeader.findIndex(h => h.includes('position'));
    const matchIdIdx = participantsHeader.findIndex(h => h.includes('matchid'));
    const playerIdx = participantsHeader.findIndex(h => h === 'player');
    const ss1Idx = participantsHeader.findIndex(h => h === 'ss1');
    const ss2Idx = participantsHeader.findIndex(h => h === 'ss2');
    
    // Read stats data for win/loss
    const stats1Data = fs.readFileSync(path.join(DATA_DIR1, 'stats1.csv'), 'utf8');
    const stats1Lines = stats1Data.split('\n');
    const stats1Header = parseCSVLine(stats1Lines[0]);
    
    const stats1WinIdx = stats1Header.findIndex(h => h.includes('win'));
    const stats1ItemIndices = [];
    for (let i = 1; i <= 6; i++) {
      stats1ItemIndices.push(stats1Header.findIndex(h => h === `item${i}`));
    }
    
    console.log(`Processing ${participantsLines.length - 1} participant records...`);
    
    // First pass: collect all participant data by match
    const matchData = {};
    
    for (let i = 1; i < participantsLines.length && i < stats1Lines.length; i++) {
      if (i % 10000 === 0) console.log(`Processed ${i} records...`);
      
      const participantData = parseCSVLine(participantsLines[i]);
      const stats1DataLine = parseCSVLine(stats1Lines[i]);
      
      if (participantData.length < 3 || stats1DataLine.length < 3) continue;
      
      const matchId = participantData[matchIdIdx];
      const championId = parseInt(participantData[champIdIdx]);
      const player = parseInt(participantData[playerIdx]);
      const role = participantData[roleIdx];
      const position = participantData[positionIdx];
      const won = parseInt(stats1DataLine[stats1WinIdx]) === 1;
      const ss1 = parseInt(participantData[ss1Idx]);
      const ss2 = parseInt(participantData[ss2Idx]);
      
      if (!championId || isNaN(championId)) continue;
      
      // Initialize match data
      if (!matchData[matchId]) {
        matchData[matchId] = [];
      }
      
      // Store participant info
      matchData[matchId].push({
        championId,
        player,
        won,
        role,
        position,
        ss1,
        ss2,
        items: stats1ItemIndices.map(idx => parseInt(stats1DataLine[idx])).filter(id => id > 0)
      });
      
      // Initialize champion stats
      if (!stats.champions[championId]) {
        stats.champions[championId] = {
          games: 0,
          wins: 0,
          roles: {},
          positions: {},
          items: {},
          summonerSpells: {}
        };
      }
      
      const champ = stats.champions[championId];
      champ.games++;
      if (won) champ.wins++;
      
      // Track roles and positions
      if (role) {
        champ.roles[role] = (champ.roles[role] || 0) + 1;
      }
      if (position) {
        champ.positions[position] = (champ.positions[position] || 0) + 1;
      }
      
      // Track summoner spells
      if (ss1 && ss2) {
        const spellPair = [ss1, ss2].sort().join(','); // Normalize order
        champ.summonerSpells[spellPair] = (champ.summonerSpells[spellPair] || 0) + 1;
      }
      
      // Track items
      for (const itemId of stats1DataLine.map((_, idx) => parseInt(stats1DataLine[stats1ItemIndices[idx]]))) {
        if (itemId && itemId > 0) {
          champ.items[itemId] = (champ.items[itemId] || 0) + 1;
        }
      }
    }
    
    // Second pass: calculate matchups
    console.log('Calculating champion matchups...');
    let matchupCount = 0;
    
    for (const [matchId, participants] of Object.entries(matchData)) {
      if (participants.length !== 10) continue; // Skip incomplete matches
      
      // Determine teams (players 1-5 vs 6-10 typically, but check by win status)
      const team1 = participants.filter(p => p.won);
      const team2 = participants.filter(p => !p.won);
      
      if (team1.length !== 5 || team2.length !== 5) continue;
      
      matchupCount++;
      
      // Record matchups: team1 won against team2
      for (const winner of team1) {
        for (const loser of team2) {
          const matchupKey = `${loser.championId}_vs_${winner.championId}`;
          
          if (!stats.matchups[matchupKey]) {
            stats.matchups[matchupKey] = {
              championId: loser.championId,
              vsChampionId: winner.championId,
              games: 0,
              losses: 0
            };
          }
          
          stats.matchups[matchupKey].games++;
          stats.matchups[matchupKey].losses++;
        }
      }
      
      // Also record the reverse (team2 lost against team1)
      for (const loser of team2) {
        for (const winner of team1) {
          const matchupKey = `${winner.championId}_vs_${loser.championId}`;
          
          if (!stats.matchups[matchupKey]) {
            stats.matchups[matchupKey] = {
              championId: winner.championId,
              vsChampionId: loser.championId,
              games: 0,
              losses: 0
            };
          }
          
          stats.matchups[matchupKey].games++;
          // Don't increment losses for winners
        }
      }
    }
    
    console.log(`Matchups calculated from ${matchupCount} valid games`);
    
    // Read ban data
    console.log('Processing bans...');
    const bansData = fs.readFileSync(path.join(DATA_DIR1, 'teambans.csv'), 'utf8');
    const bansLines = bansData.split('\n');
    const bansHeader = parseCSVLine(bansLines[0]);
    const banChampIdx = bansHeader.findIndex(h => h.includes('championid'));
    
    for (let i = 1; i < bansLines.length; i++) {
      const banData = parseCSVLine(bansLines[i]);
      if (banData.length < 2) continue;
      
      const championId = parseInt(banData[banChampIdx]);
      if (!championId || isNaN(championId)) continue;
      
      if (!stats.champions[championId]) {
        stats.champions[championId] = {
          games: 0,
          wins: 0,
          bans: 0,
          roles: {},
          positions: {},
          items: {},
          summonerSpells: {}
        };
      }
      
      stats.champions[championId].bans = (stats.champions[championId].bans || 0) + 1;
    }
    
    // Count total games (each game has 10 participants)
    stats.totalGames = Math.floor(Object.values(stats.champions).reduce((sum, c) => sum + c.games, 0) / 10);
    
    console.log(`MatchData1 processed: ${stats.totalGames} games, ${Object.keys(stats.champions).length} champions`);
    console.log(`Matchup data: ${Object.keys(stats.matchups).length} unique matchups`);
    return stats;
    
  } catch (error) {
    console.error('Error processing MatchData1:', error.message);
    return null;
  }
}

// Calculate final statistics
function calculateStatistics(matchData1Stats) {
  console.log('Calculating final statistics...');
  
  const result = {
    totalGames: matchData1Stats.totalGames,
    champions: {},
    matchups: {} // Store ALL matchup data
  };
  
  // Process matchup data - calculate win rates for every champion vs champion
  console.log('Processing full matchup matrix...');
  for (const [matchupKey, matchup] of Object.entries(matchData1Stats.matchups)) {
    if (matchup.games >= 5) { // Minimum 5 games for any matchup
      const winRate = ((matchup.games - matchup.losses) / matchup.games) * 100;
      result.matchups[matchupKey] = {
        championId: matchup.championId,
        vsChampionId: matchup.vsChampionId,
        games: matchup.games,
        wins: matchup.games - matchup.losses,
        losses: matchup.losses,
        winRate: roundToDecimals(winRate, 2)
      };
    }
  }
  
  console.log(`Calculated ${Object.keys(result.matchups).length} matchup combinations`);
  
  for (const [championId, champStats] of Object.entries(matchData1Stats.champions)) {
    const winRate = champStats.games > 0 ? (champStats.wins / champStats.games) * 100 : 0;
    const pickRate = matchData1Stats.totalGames > 0 ? (champStats.games / (matchData1Stats.totalGames * 10)) * 100 : 0;
    const banRate = matchData1Stats.totalGames > 0 ? ((champStats.bans || 0) / (matchData1Stats.totalGames * 10)) * 100 : 0;
    
    // Get most common role and position
    const topRole = Object.entries(champStats.roles).sort((a, b) => b[1] - a[1])[0];
    const topPosition = Object.entries(champStats.positions).sort((a, b) => b[1] - a[1])[0];
    
    // Get top 10 items
    const topItems = Object.entries(champStats.items)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([itemId, count]) => ({ itemId: parseInt(itemId), count }));
    
    // Get top 5 summoner spell combinations
    const topSummonerSpells = Object.entries(champStats.summonerSpells)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([spells, count]) => {
        const [ss1, ss2] = spells.split(',').map(Number);
        return { ss1, ss2, count };
      });
    
    // Calculate counters (champions this champion loses against most)
    const counters = [];
    for (const [matchupKey, matchup] of Object.entries(matchData1Stats.matchups)) {
      if (matchup.championId === parseInt(championId) && matchup.games >= 20) {
        const lossRate = matchup.losses / matchup.games;
        if (lossRate > 0.5) { // Only include if loses more than 50%
          counters.push({
            championId: matchup.vsChampionId,
            games: matchup.games,
            losses: matchup.losses,
            lossRate: roundToDecimals(lossRate * 100, 1)
          });
        }
      }
    }
    
    // Sort by loss rate and take top 5
    counters.sort((a, b) => b.lossRate - a.lossRate);
    const topCounters = counters.slice(0, 5).map(c => c.championId);
    
    result.champions[championId] = {
      id: parseInt(championId),
      games: champStats.games,
      wins: champStats.wins,
      winRate: roundToDecimals(winRate, 2),
      pickRate: roundToDecimals(pickRate, 2),
      banRate: roundToDecimals(banRate, 2),
      topRole: topRole ? topRole[0] : null,
      topPosition: topPosition ? topPosition[0] : null,
      topItems: topItems,
      topSummonerSpells: topSummonerSpells,
      counters: topCounters
    };
  }
  
  console.log(`Statistics calculated for ${Object.keys(result.champions).length} champions`);
  return result;
}

// Main processing function
async function main() {
  console.log('Starting match data processing...\n');
  
  const championMapping = loadChampionMapping();
  console.log(`Loaded ${Object.keys(championMapping).length} champion mappings\n`);
  
  const summonerSpellMapping = loadSummonerSpellMapping();
  console.log(`Loaded summoner spell mappings\n`);
  
  const matchData1Stats = await processMatchData1();
  
  if (!matchData1Stats) {
    console.error('Failed to process match data');
    return;
  }
  
  const finalStats = calculateStatistics(matchData1Stats);
  
  // Add champion names if available
  for (const [champId, stats] of Object.entries(finalStats.champions)) {
    const champInfo = championMapping[champId];
    if (champInfo) {
      stats.name = champInfo.name;
    }
  }
  
  // Write to output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalStats, null, 2));
  console.log(`\nStatistics written to ${OUTPUT_FILE}`);
  console.log(`\nSummary:`);
  console.log(`  Total games analyzed: ${finalStats.totalGames}`);
  console.log(`  Champions with data: ${Object.keys(finalStats.champions).length}`);
  
  // Show a few examples
  console.log(`\nSample champion stats:`);
  const samples = Object.values(finalStats.champions)
    .filter(c => c.games > 100)
    .sort((a, b) => b.games - a.games)
    .slice(0, 5);
  
  for (const champ of samples) {
    const countersText = champ.counters.length > 0 ? `${champ.counters.length} counters` : 'no counters';
    const spellsText = champ.topSummonerSpells.length > 0 ? `${champ.topSummonerSpells.length} spell combos` : '';
    console.log(`  ${champ.name || `Champion ${champ.id}`}: ${champ.games} games, ${champ.winRate}% WR, ${countersText}, ${spellsText}`);
  }
}

main().catch(console.error);
