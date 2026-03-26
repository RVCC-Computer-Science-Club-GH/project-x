# Contributing to "X"

Thanks for helping build RVCC's campus community app! This guide covers development workflows, code standards, and feature integration.

## Development workflow

### 1. Set up your environment

```bash
# Clone the repo
git clone https://github.com/rvcc/project-x.git
cd project-x

# Use correct Node version
nvm use

# Install dependencies
npm install
```

### 2. Create a feature branch

```bash
git checkout -b feature/gps-locations
# or: feature/radio-streaming, fix/map-crash, etc.
```

### 3. Make changes

**Backend changes** → update `apps/server/`  
**Frontend changes** → update `apps/client/`  
**Shared code** → create a new lib in `libs/` or use root `package.json`

#### Backend MVC structure

The Express server uses a strict MVC layout:

```
apps/server/src/
  routes/          → Express route definitions
  controllers/     → Request handlers (thin layer)
  services/        → Business logic & domain services
  models/          → TypeScript types & interfaces
  views/           → Response formatters/presenters
  index.ts         → Server entry point
  app.ts           → Express app configuration
```

**Example: Adding a new endpoint**

1. Create model: `models/location.model.ts` (interfaces)
2. Create service: `services/location.service.ts` (logic)
3. Create controller: `controllers/location.controller.ts` (request handler)
4. Create view: `views/location.view.ts` (response shape)
5. Add route: `routes/location.routes.ts` and wire in `routes/index.ts`

#### Frontend structure

```
apps/client/
  App.tsx          → Root component
  index.ts         → Entry point
  app.json         → Expo config
  tests/           → Vitest tests
  assets/          → Icons, images
```

Use React Native best practices:

- Functional components with hooks
- Separate presentational & container components
- Type all props with TypeScript

### 4. Run checks locally

Before committing:

```bash
# Format code
npm run format

# Type check
npm run typecheck

# Lint
npm run lint

# Test
npm run test

# Build (ensures no errors in production build)
npm run build
```

Or run all at once:

```bash
npm run precommit:verify
# This is what Husky enforces on pre-commit
```

### 5. Commit and push

```bash
git add .
git commit -m "feat: add GPS location search to campus map"
git push origin feature/gps-locations
```

Husky will block the commit if quality checks fail. Fix them and try again.

### 6. Create a pull request

On GitHub:

- Squash commits into logical units
- Write a clear PR description explaining **what** and **why**
- Link to any related issues or designs
- Request review from team leads

### 7. Merge

Once approved and CI/CD passes:

```bash
git merge feature/gps-locations
git push origin main
```

## Code standards

### TypeScript

- **Strict mode always** — no `any` or `// @ts-ignore` without justification
- **Explicit types** — annotate function parameters and return types
- **Avoid optional chaining for defensive coding** — handle errors explicitly
- **Use discriminated unions** — for complex types, not huge `optional: true` objects

**Example:**

```typescript
// ❌ Avoid
function getLocation(id?: string) {
  return locations.find((l) => l.id === id)?.name;
}

// ✅ Prefer
function getLocationName(id: string): string | null {
  const location = locations.find((l) => l.id === id);
  return location ? location.name : null;
}
```

### Code style

- **Prettier formats automatically** — no manual style debates
- **ESLint enforces rules** — no warnings allowed (`--max-warnings=0`)
- **Max line length:** 100 chars (enforced by Prettier)
- **Imports:** use `import type` for types, regular `import` for runtime

**Example:**

```typescript
import type { Location } from '../models/location.model.js';
import { locationService } from '../services/location.service.js';

export const getLocations = async (): Promise<Location[]> => {
  return locationService.fetchAll();
};
```

### Testing

- **Vitest** for unit tests
- **Supertest** for HTTP endpoint tests (backend)
- **Minimum coverage:** 80% for services; 60% for UI
- **Test file naming:** `*.test.ts` colocated with source

**Example test:**

```typescript
import { describe, expect, it } from 'vitest';
import { locationService } from '../services/location.service.js';

describe('LocationService', () => {
  it('returns all campus locations', async () => {
    const locations = await locationService.fetchAll();

    expect(locations).toHaveLength(42);
    expect(locations[0]).toHaveProperty('name');
    expect(locations[0]).toHaveProperty('gps');
  });
});
```

## Feature integration

### Adding GPS mapping

1. **Backend setup** (Phase 1 priority)
   - Create `Location` model with GPS coords, building info
   - Add `LocationService` to fetch/search/cache locations
   - Build `GET /api/locations` and `GET /api/locations/:id` endpoints
   - Add tests for all endpoints

2. **Frontend integration**
   - Install map library (TBD: Leaflet, Google Maps, Mapbox, etc.)
   - Create `MapScreen.tsx` component
   - Wire `useEffect` to fetch locations from backend API
   - Render pins on map; handle tap-to-navigate

3. **Citizen science**
   - Add "Submit location" feature to map
   - Create form for photos, sensor tags, pins
   - POST to backend endpoint for storage & moderation

### Adding radio streaming

1. **Backend**
   - Create `Broadcast` model with schedule, stream URL, title
   - Add `BroadcastService` to fetch active/upcoming broadcasts
   - Build `GET /api/broadcasts` and `GET /api/broadcasts/:id/stream` endpoints

2. **Frontend**
   - Create `RadioScreen.tsx` with broadcast list
   - Integrate audio player (Expo AV)
   - Show current/next broadcasts, allow queueing

### Adding user system

1. **Authentication**
   - Design JWT-based auth flow (or OAuth)
   - Create user registration/login endpoints
   - Add middleware to protect endpoints

2. **Profiles**
   - Store user submissions & leaderboard position
   - Track incentive balance (gift cards, credits, etc.)

3. **Incentives**
   - Create leaderboard ranking by submissions
   - Wire gift card rewards, meal vouchers, academic credits
   - Track user redemption history

## Common tasks

### Adding a new dependency

```bash
# Root-level dev tool
npm install --save-dev some-package

# Backend only
npm install --save-dev some-package -w apps/server

# Client only
npm install --save-dev some-package -w apps/client
```

Always use semver ranges (`^` for minor updates, `~` for patches):

```json
{
  "dependencies": {
    "express": "^5.0.0",
    "react": "19.2.0"
  }
}
```

### Running a specific workspace command

```bash
# Just backend tests
npm run test -w apps/server

# Just client typecheck
npm run typecheck -w apps/client

# Just build the server
npm run build -w apps/server
```

### Debugging

**Backend:**

```bash
# Run with Node inspector
node --inspect-brk ./dist/index.js

# Or use tsx for TypeScript
tsx --inspect-brk src/index.ts
```

**Frontend (Expo):**

```bash
# Web dev tools
npm run web -w apps/client
# Open http://localhost:8081, press 'd' for DevTools

# Mobile: use Expo's built-in debugger or React DevTools
```

### Resetting the monorepo

```bash
# Hard clean
npm run clean
rm -rf node_modules package-lock.json
npm install
```

## Code review checklist

Before submitting a PR, ensure:

- [ ] All tests pass locally (`npm run precommit:verify`)
- [ ] Code is formatted (`npm run format`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] New features have tests (80%+ coverage for services)
- [ ] Commit messages are clear and descriptive
- [ ] Related issues are linked in PR description
- [ ] Backend changes are backward compatible (or migration documented)
- [ ] Mobile app still renders on all platforms (web, Android, iOS)

## Questions?

- **Technical issues** → File a GitHub issue
- **Architecture questions** → Discuss in PR or team meetings
- **Design concerns** → Coordinate with Student Life stakeholder
- **Deployment** → Contact Kiswah Khan or lead engineer

Happy building! 🚀
