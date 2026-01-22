# ArtSync - Art Commissioning Marketplace

A high-fidelity prototype for an Art Commissioning Marketplace built with Next.js, React, and Tailwind CSS.

## Features

- **Marketplace Grid**: Browse artworks with filtering by style, price range, and availability
- **Artist Profiles**: Detailed view with portfolio, reviews, and ratings
- **Commission Wizard**: Multi-step flow with AI concept generation simulation
- **Artist Dashboard**: View and manage incoming commission requests

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ArtSync/
├── app/
│   ├── dashboard/       # Artist dashboard page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── ArtistDetailModal.tsx    # Artist profile modal
│   ├── CommissionWizard.tsx     # Multi-step commission flow
│   ├── MarketplaceGrid.tsx      # Main marketplace grid with filters
│   └── Navbar.tsx               # Navigation bar
├── data/
│   └── mockData.ts      # Mock artist and artwork data
└── types/
    └── index.ts         # TypeScript type definitions
```

## Key Components

### Marketplace Grid
- Displays artists in a responsive grid
- Sidebar filters for style, price range, and availability
- Click any card to view artist details

### Commission Wizard
- **Step 1**: Enter commission details (size, budget, deadline)
- **Step 2**: AI concept generation (simulated with 2-second loading)
- **Step 3**: Review and submit request

### Artist Dashboard
- View incoming commission requests
- Accept or reject requests
- Track request status

## Mock Data

The app uses hardcoded mock data for 5 artists with diverse styles:
- Elena Martinez (Digital/Fantasy)
- James Chen (Oil/Portrait)
- Maya Patel (Watercolor/Botanical)
- Alex Rivera (Mixed Media/Contemporary)
- Sophie Laurent (Oil/Still Life)

## Technologies Used

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Next/Image** for optimized images

## Notes

- This is a prototype with no backend integration
- All data is hardcoded in `data/mockData.ts`
- AI concept generation is simulated with a loading state
- Commission requests are stored in component state only
