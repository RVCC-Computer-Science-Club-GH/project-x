# Pathster — RVCC Campus Community App

**One app. Find your class. Hear campus live. X guides RVCC.**

Pathster is RVCC's all-in-one campus app: dead-accurate GPS map to every classroom plus live Radio Club streaming—right on your phone or browser. Students build the map themselves with AR scans and pins, earning gift cards, free meals, or competing for prizes. Built with React Native + Expo for seamless cross-platform deployment.

## Mission

Improve daily campus navigation and foster community connection through:

- **GPS-powered interactive map** → Find classrooms, buildings, and key locations
- **Live Radio Club streaming** → Campus broadcasts on Android, iOS, and web
- **Citizen science engagement** → Community-driven map data collection with meaningful incentives

## Core features

### Phase 1: GPS Mapping (Current Focus)

- Interactive campus map with all buildings and classrooms
- GPS navigation and real-time location tracking
- AR-enabled location scanning for data verification
- Citizen science submission pipeline (photos, sensor tags, pins)
- Leaderboards and competition mechanics
- Incentive system (gift cards, meal vouchers, academic credits)

### Phase 2: Radio Integration

- Live streaming UI for Radio Club broadcasts
- Broadcast schedule management
- Offline listening queue (caching)

## Tech stack

- **Backend:** Express.js (TypeScript) — MVC architecture, REST API
- **Frontend:** React Native + Expo — iOS, Android, PWA
- **Shared libraries:** API client, types, utilities (TypeScript)
- **Runtime:** Node.js 24 LTS, npm 11 LTS
- **Quality gates:** ESLint, Prettier, TypeScript strict, Vitest, Husky pre-commit hooks

## Project structure

```
apps/
  server/          → Backend API (Express, MVC)
  client/          → Frontend (React Native, Expo)
libs/
  api-client/      → Shared API client types & utilities (TBD)
tools/
  run-workspaces   → Monorepo orchestration
```

## Development setup

### Prerequisites

- Node.js 24 LTS or later (use `nvm use` in the repo root)
- npm 11 or later

### Install

```bash
npm install
```

### Development

**Backend (Express API):**

```bash
npm run dev -w apps/server
# Runs on http://localhost:3000
# Auto-reloads with `tsx watch`
```

**Client (React Native):**

```bash
# Local development server
npm run web -w apps/client

# Android emulator
npm run android -w apps/client

# iOS simulator (macOS only)
npm run ios -w apps/client

# Static web export (SPA)
npm run export:web -w apps/client
# Output: apps/client/dist-web/
```

### Quality gates

All commits are gated by Husky pre-commit hooks:

```bash
npm run precommit:verify
# Runs: format:check → lint → test
```

**Individual checks:**

- `npm run lint` — ESLint across all workspaces
- `npm run test` — Vitest across all workspaces
- `npm run typecheck` — TypeScript strict mode
- `npm run build` — Production builds
- `npm run format` — Auto-fix formatting (Prettier)

## Current status

✅ Monorepo scaffold with LTS enforcement  
✅ Express backend with MVC architecture  
✅ React Native client (Expo) with Android/iOS/web targets  
✅ Pre-commit quality gates (format, lint, tests)

🔲 GPS mapping backend & API  
🔲 Radio streaming integration  
🔲 Citizen science submission pipeline  
🔲 User authentication & profiles  
🔲 Leaderboard & incentive system  
🔲 Shared API client library

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for development guidelines, feature workflow, and code standards.
