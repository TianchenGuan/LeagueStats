# UI Configuration Guide - AI Agent Benchmarking

## Purpose
This website can be configured to display UI elements in three different modes to benchmark AI agent performance with different visual cues.

## Configuration File

Edit `ui-config.json` in the project root:

```json
{
  "displayMode": "icon_text",
  "description": "Options: 'icon_only', 'text_only', 'icon_text' (default)"
}
```

## Display Modes

### 1. `icon_text` (Default - Current Beautiful UI)
Shows both icons and text labels together.

**What it affects:**
- **Champion Grid (Left Sidebar)**: Champion portrait + tier badge (hover shows name)
- **Summoner Spells**: Icon + spell name (e.g., [🔥 Icon] Ignite)
- **Items**: Item icon + item name (e.g., [Icon] Doran's Ring)

**Best for:** Human users, visual browsing, full information

### 2. `icon_only` 
Shows only icons without text labels.

**What it affects:**
- **Champion Grid**: Only champion portraits with tier badges (hover tooltip shows name)
- **Summoner Spells**: Only spell icons (hover for name)
- **Items**: Only item icons (hover for name)

**Best for:** Testing if AI can identify items/champions from images alone

### 3. `text_only`
Shows only text without any icons.

**What it affects:**
- **Champion Grid**: Text list of champion names in single column (1 column instead of 5x5 grid)
- **Summoner Spells**: Text names only (e.g., "Ignite + Flash")
- **Items**: Item names only (e.g., "Doran's Ring")

**Best for:** Testing AI text recognition, accessibility testing

## How to Switch Modes

### Step 1: Edit Configuration
Open `ui-config.json` and change `displayMode`:

```json
{
  "displayMode": "icon_only"
}
```

### Step 2: Rebuild
```bash
npm run build
```

### Step 3: Start Server
```bash
npm run dev
```

OR for production:
```bash
npm start
```

### Step 4: Test
Visit `http://localhost:3000` and observe the changes!

## Quick Comparison

| Element | icon_text (default) | icon_only | text_only |
|---------|-------------------|-----------|-----------|
| **Champion Grid** | 5x5 grid, icons + tier | 5x5 grid, icons only | 1-column list, text only |
| **Summoner Spells** | [Icon] Flash | [Icon] | Flash |
| **Items (Build)** | [Icon] Doran's Ring | [Icon] | Doran's Ring |
| **Items (Items Tab)** | [Icon] Luden's Echo | [Icon] | Luden's Echo |

## Examples

### Testing Scenario 1: Icon Recognition
```json
{ "displayMode": "icon_only" }
```
**Question for AI:** "What summoner spells does this champion use?"
**AI must:** Recognize spell icons visually

### Testing Scenario 2: Text Recognition  
```json
{ "displayMode": "text_only" }
```
**Question for AI:** "What items should I build on this champion?"
**AI must:** Read and understand text labels

### Testing Scenario 3: Combined (Default)
```json
{ "displayMode": "icon_text" }
```
**Question for AI:** "What is the meta build for this champion?"
**AI can:** Use both visual and textual cues

## Affected Components

1. ✅ **Front Page - Left Sidebar Champion Grid**
   - `icon_text`: 5x5 grid with icons
   - `icon_only`: 5x5 grid, icons only (hover for name)
   - `text_only`: 1-column list with champion names

2. ✅ **Champion Detail - Build Tab - Summoner Spells**
   - `icon_text`: Icon + spell name
   - `icon_only`: Icon only
   - `text_only`: Spell name only

3. ✅ **Champion Detail - Build Tab - Core Items**
   - `icon_text`: Item icon + name + stats
   - `icon_only`: Item icon + stats (no name)
   - `text_only`: Item name + stats (no icon)

4. ✅ **Champion Detail - Items Tab**
   - `icon_text`: Item icon + name + purchase count
   - `icon_only`: Item icon + purchase count
   - `text_only`: Item name + purchase count

## Deployment

### For Vercel Production
The default mode is `icon_text` (current beautiful UI).

To deploy with a different mode:
1. Edit `ui-config.json` before deploying
2. Commit changes
3. Push to GitHub
4. Vercel will deploy with the selected mode

### For Testing Different Modes
Create separate branches:
- `main` - icon_text (production)
- `test-icon-only` - icon_only mode
- `test-text-only` - text_only mode

Deploy each branch to different Vercel preview URLs for parallel testing!

## Notes

- Changes require rebuild (`npm run build`)
- Dev server needs restart (`npm run dev`)
- Configuration is site-wide (affects all pages)
- Hover tooltips always show for icon-only mode
- Statistics and data remain the same across all modes

## Benchmarking Tips

1. **Consistent Testing**: Use the same AI model for all three modes
2. **Sample Questions**: Prepare identical questions for each mode
3. **Measure**: Track response accuracy, speed, confidence
4. **Compare**: Which mode gives best AI performance?

---

**Current Mode:** Check `ui-config.json` to see active configuration
**Default:** `icon_text` (beautiful, full-featured UI)

