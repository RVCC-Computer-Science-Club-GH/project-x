# Pathster — RVCC Campus Community App

Pathster is RVCC's campus app combining GPS mapping with live radio.

Find any classroom on an interactive map. Listen to campus radio broadcasts. Earn rewards for helping complete the map.

## Quick Start

**New to the project?** Start here: [**Read the documentation**](docs/README.md)

The docs teach you:

- What Pathster does and why it exists
- How the system works (frontend, backend, databases)
- How to install and run the project
- How to write code professionally
- How to test, deploy, and contribute

Estimated time: **2 hours end-to-end** (including hands-on practice)

## Features

### Phase 1: GPS Map (Current)

- Interactive campus map showing all classrooms
- Real-time GPS navigation
- Student-submitted locations with photos
- Point system and leaderboards
- Rewards: gift cards, meals, academic credits

### Phase 2: Radio Streaming (Future)

- Live campus radio broadcasts
- Schedule management
- Offline listening

## Technology

| Part         | Technology              | Why                           |
| ------------ | ----------------------- | ----------------------------- |
| **Backend**  | Express.js + TypeScript | Simple, reliable, type-safe   |
| **Frontend** | React Native + Expo     | Works on iPhone, Android, web |
| **Database** | MongoDB                 | Flexible data storage         |
| **Cache**    | Redis                   | Fast performance              |

## For Developers

### Install

```bash
npm install
npm run dev -w apps/server    # Backend on http://localhost:3000
npm run web -w apps/client    # Frontend on http://localhost:8081
```

### Quality Checks

```bash
npm run typecheck             # Check for errors
npm run test                  # Run tests
npm run lint                  # Check style
npm run precommit:verify      # All checks together
```

## Documentation Structure

All guides in `docs/`:

1. **[01-OVERVIEW](docs/01-OVERVIEW.md)** — What is Pathster?
2. **[02-SYSTEM-ARCHITECTURE](docs/02-SYSTEM-ARCHITECTURE.md)** — How parts connect
3. **[03-FRONTEND-LAYERS](docs/03-FRONTEND-LAYERS.md)** — Frontend organization
4. **[04-BACKEND-LAYERS](docs/04-BACKEND-LAYERS.md)** — Backend organization
5. **[05-SETUP-YOUR-COMPUTER](docs/05-SETUP-YOUR-COMPUTER.md)** — Installation
6. **[06-YOUR-FIRST-TASK](docs/06-YOUR-FIRST-TASK.md)** — Make your first change
7. **[07-DOCKER-CONTAINERS](docs/07-DOCKER-CONTAINERS.md)** — Docker explained
8. **[08-TESTING](docs/08-TESTING.md)** — Testing strategies
9. **[09-DEPLOYMENT](docs/09-DEPLOYMENT.md)** — Production release
10. **[10-CONTRIBUTING](docs/10-CONTRIBUTING.md)** — Team guidelines

## Links

- **Issues**: [GitHub Issues](https://github.com/rvcc/pathster/issues)
- **Questions**: [GitHub Discussions](https://github.com/rvcc/pathster/discussions)
- **Code**: [GitHub Repository](https://github.com/rvcc/pathster)

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
