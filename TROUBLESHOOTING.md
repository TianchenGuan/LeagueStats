# Troubleshooting Guide

## Common Issues and Solutions

### Module not found: Can't resolve 'fs'

#### Problem
```
⨯ ./lib/champions.ts:1:1
Module not found: Can't resolve 'fs'
> 1 | import fs from 'fs';
```

#### Cause
This error occurs when client-side code tries to import Node.js modules like `fs` (file system). In Next.js:
- **Server Components** can use Node.js APIs (`fs`, `path`, etc.)
- **Client Components** (`'use client'`) cannot use Node.js APIs

The error happens when a client component imports from a file that uses Node.js APIs.

#### Solution
We split the utility functions into two files:

1. **`lib/champions.ts`** - Server-only functions (uses `fs`, `path`)
   - `getAllChampionIds()`
   - `getChampionById()`
   - `getAllChampions()`
   - Re-exports client-safe utilities

2. **`lib/utils.ts`** - Client-safe utilities (no Node.js APIs)
   - `getChampionIconPath()`
   - `getChampionSplashPath()`
   - `getAbilityIconPath()`
   - `getAbilityVideoPath()`

#### Usage

**In Server Components** (default in App Router):
```typescript
// ✅ Can import from either
import { getAllChampions } from '@/lib/champions';
import { getChampionIconPath } from '@/lib/champions'; // Re-exported
```

**In Client Components** (`'use client'`):
```typescript
// ✅ Import utilities from lib/utils
import { getChampionIconPath } from '@/lib/utils';

// ❌ Don't import from lib/champions (causes fs error)
// import { getChampionIconPath } from '@/lib/champions';
```

#### Files Updated
- Created `lib/utils.ts` with client-safe functions
- Updated `lib/champions.ts` to re-export utilities
- Updated `components/ChampionsList.tsx` to import from `lib/utils`

---

## Build Errors

### Type errors during build

#### Solution
Run type checking locally:
```bash
npx tsc --noEmit
```

Fix any type errors shown.

### ESLint errors

#### Solution
```bash
npm run lint
```

Fix reported issues or add `// eslint-disable-next-line` for intentional deviations.

---

## Image Loading Issues

### Images not loading from CDN

#### Check
1. Internet connection
2. Community Dragon CDN is accessible
3. Image URLs are correct in `lib/utils.ts`

#### Solution
Images are loaded from:
- Local: `/cdragon/icons/{id}.png`
- CDN: `https://raw.communitydragon.org/latest/...`

Make sure `next.config.ts` has the correct remote patterns.

---

## Performance Issues

### Slow filtering/search

#### Check
This shouldn't happen as everything is client-side. If it does:
1. Check browser console for errors
2. Verify React DevTools for unnecessary re-renders
3. Ensure `useMemo` is used in `ChampionsList.tsx`

#### Solution
All filtering is memoized and should be instant.

---

## Data Issues

### Champions not showing

#### Check
1. Data downloaded correctly: `public/cdragon/*.json` exists
2. Icons downloaded: `public/cdragon/icons/*.png` exists
3. Console for errors

#### Solution
Re-download data:
```bash
npm run update-data
```

Or manually:
```bash
cd-dd -o ./public/cdragon https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/
cd-dd -o ./public/cdragon/icons https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/
```

### Champion detail page 404

#### Check
1. Champion ID is valid
2. JSON file exists for that ID
3. Build was successful

#### Solution
Rebuild the site:
```bash
npm run build
```

---

## Development Server Issues

### Port already in use

#### Solution
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Hot reload not working

#### Solution
1. Restart dev server
2. Clear `.next` folder:
```bash
rm -rf .next
npm run dev
```

---

## Deployment Issues

### Vercel build fails

#### Check
1. `package.json` has all dependencies
2. No type errors
3. Environment variables set (if any)
4. Build succeeds locally

#### Solution
```bash
# Test production build locally
npm run build
npm start
```

Check Vercel logs for specific errors.

### Images not loading on Vercel

#### Check
`next.config.ts` has correct `remotePatterns` for:
- `raw.communitydragon.org`
- `d28xe8vt774jo5.cloudfront.net`

#### Current config:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'raw.communitydragon.org',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'd28xe8vt774jo5.cloudfront.net',
      pathname: '/**',
    },
  ],
}
```

---

## Statistics Issues

### Stats seem wrong

#### Note
Statistics are **mock data** for demonstration. They are:
- Deterministic (same champion = same stats)
- Realistic (based on typical LoL distributions)
- Not real Riot API data

For real statistics, integrate with Riot API.

---

## Getting Help

### Resources
1. Check `README.md` for setup instructions
2. Check `STATISTICS.md` for stats system
3. Check `USER_GUIDE.md` for usage
4. Check `DEPLOYMENT.md` for deployment

### Common Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Update champion data
npm run update-data

# Check for linter errors
npm run lint
```

### Still stuck?
1. Check browser console for errors
2. Check terminal for build errors
3. Clear cache and rebuild:
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

---

## Best Practices

### Development
- ✅ Use Server Components by default
- ✅ Only add `'use client'` when needed
- ✅ Keep Node.js APIs in server code
- ✅ Use client-safe utilities in client components

### Performance
- ✅ Use `useMemo` for expensive computations
- ✅ Use `useCallback` for event handlers
- ✅ Minimize client-side JavaScript
- ✅ Leverage static generation

### Code Quality
- ✅ Run linter before committing
- ✅ Test build before deploying
- ✅ Check for type errors
- ✅ Keep components focused and small

---

**Need more help?** Open an issue on GitHub or check the Next.js documentation.

