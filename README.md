# LoL Stats - League of Legends Champion Stats

A modern, beautiful League of Legends champion statistics website built with Next.js and powered by Community Dragon data.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## Features

- 📊 **Complete Champion Database** - Browse all League of Legends champions
- 🎨 **Beautiful UI** - Modern, responsive design inspired by op.gg
- 🖼️ **Rich Media** - Champion splash arts, icons, and ability images
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Mode Support** - Automatic dark mode based on system preferences
- ⚡ **Static Generation** - Lightning-fast page loads with Next.js SSG
- 🎯 **Detailed Champion Pages** - View abilities, skins, stats, and lore

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Source**: [Community Dragon](https://communitydragon.org/)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd league-stats
```

2. Install dependencies:
```bash
npm install
```

3. Download champion data (if not already present):
```bash
npm install -g cdragon-dd
cd-dd -o ./public/cdragon https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/
cd-dd -o ./public/cdragon/icons https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
league-stats/
├── app/
│   ├── champions/
│   │   └── [id]/
│   │       └── page.tsx       # Dynamic champion detail pages
│   ├── layout.tsx             # Root layout with header
│   ├── page.tsx               # Champions list page
│   └── globals.css            # Global styles
├── components/
│   └── Header.tsx             # Navigation header component
├── lib/
│   └── champions.ts           # Champion data utilities
├── types/
│   └── champion.ts            # TypeScript type definitions
└── public/
    └── cdragon/               # Champion data and icons
        ├── icons/             # Champion portrait icons
        └── *.json             # Champion data files
```

## Key Features Explained

### Champion List Page
- Grid layout displaying all champions
- Hover effects and smooth transitions
- Champion portraits from Community Dragon
- Role badges for each champion
- Responsive design (2-6 columns based on screen size)

### Champion Detail Pages
- Hero section with splash art
- Complete champion lore
- Passive and active abilities with icons
- Stats visualization with progress bars
- All champion skins with images
- Tactical information (difficulty, damage type, etc.)

### Data Management
- Static site generation for optimal performance
- Champion data loaded from local JSON files
- Images served from Community Dragon CDN
- Type-safe data handling with TypeScript

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/league-stats)

## Data Sources

All champion data, images, and assets are provided by:
- [Community Dragon](https://communitydragon.org/) - Community-driven League of Legends CDN
- [Raw Community Dragon](https://raw.communitydragon.org/) - Direct access to game assets

## Future Enhancements

Some ideas for future improvements:
- Add search and filter functionality for champions
- Include champion statistics and win rates (requires Riot API)
- Add champion comparison feature
- Include item and rune information
- Add match history lookup (requires Riot API)

## License

This project is for educational purposes. All League of Legends data and assets are property of Riot Games.

## Acknowledgments

- [Riot Games](https://www.riotgames.com/) for League of Legends
- [Community Dragon](https://communitydragon.org/) for providing game data
- [Next.js](https://nextjs.org/) team for the amazing framework
