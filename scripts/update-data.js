#!/usr/bin/env node

/**
 * Script to update champion data from Community Dragon
 * Run with: node scripts/update-data.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CDRAGON_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'cdragon');

console.log('🔄 Updating League of Legends champion data...\n');

// Check if cd-dd is installed
try {
  execSync('cd-dd --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ cd-dd is not installed. Installing globally...');
  try {
    execSync('npm install -g cdragon-dd', { stdio: 'inherit' });
    console.log('✅ cd-dd installed successfully\n');
  } catch (installError) {
    console.error('❌ Failed to install cd-dd. Please install it manually:');
    console.error('   npm install -g cdragon-dd');
    process.exit(1);
  }
}

// Download champion JSON files
console.log('📥 Downloading champion data...');
try {
  execSync(
    `cd-dd -o "${OUTPUT_DIR}" -k replace "${CDRAGON_BASE}/v1/champions/"`,
    { stdio: 'inherit' }
  );
  console.log('✅ Champion data downloaded\n');
} catch (error) {
  console.error('❌ Failed to download champion data');
  process.exit(1);
}

// Download champion icons
console.log('📥 Downloading champion icons...');
try {
  const iconsDir = path.join(OUTPUT_DIR, 'icons');
  execSync(
    `cd-dd -o "${iconsDir}" -k replace "${CDRAGON_BASE}/v1/champion-icons/"`,
    { stdio: 'inherit' }
  );
  console.log('✅ Champion icons downloaded\n');
} catch (error) {
  console.error('❌ Failed to download champion icons');
  process.exit(1);
}

// Count champions
const championFiles = fs.readdirSync(OUTPUT_DIR)
  .filter(file => file.endsWith('.json') && !file.startsWith('-'))
  .length;

console.log('✨ Update complete!');
console.log(`📊 Total champions: ${championFiles}`);
console.log('\n🚀 You can now run: npm run dev');

