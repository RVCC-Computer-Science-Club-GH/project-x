# "X" Architecture Guide

High-level system design, API contracts, and data flows for the "X" campus community app.

## System overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Devices                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ iOS App      │  │ Android App  │  │ Web Browser  │   │
│  │ (Expo)       │  │ (Expo)       │  │ (PWA/SPA)    │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │ HTTP/HTTPS
          ┌────────────────▼────────────────┐
          │     Express.js API Backend      │
          │     (apps/server, MVC)          │
          │                                 │
          │  ┌────────────────────────────┐ │
          │  │ Routes (Express Router)    │ │
          │  └────────────────────────────┘ │
          │           ▼                     │
          │  ┌────────────────────────────┐ │
          │  │ Controllers (Request)      │ │
          │  └────────────────────────────┘ │
          │           ▼                     │
          │  ┌────────────────────────────┐ │
          │  │ Services (Business Logic)  │ │
          │  └────────────────────────────┘ │
          │           ▼                     │
          │  ┌────────────────────────────┐ │
          │  │ Data / Models              │ │
          │  └────────────────────────────┘ │
          └─────────────────────────────────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       [DB]     [Cache]    [Storage]
                          (Photos, etc.)
```

## Layers

### Frontend (apps/client)

**React Native + Expo** — runs on iOS, Android, web.

Key screens (planned):

- **MapScreen** — GPS campus map with location pins, search
- **RadioScreen** — Live broadcast player, schedule, queue
- **SubmitScreen** — Citizen science form (photos, pins, sensor tags)
- **ProfileScreen** — User profile, leaderboard position, incentive balance
- **AuthScreen** — Login/registration

**Navigation:** React Navigation (stack/tab navigation patterns)  
**State:** React hooks + Context API (or Zustand if state grows)  
**API:** Axios or Fetch wrapped in shared `libs/api-client` (TBD)

### Backend (apps/server)

**Express.js with MVC architecture:**

#### Routes

Express Router definitions. Map HTTP verbs + paths to controllers.

```typescript
// routes/location.routes.ts
const router = Router();
router.get('/api/locations', getLocations);
router.get('/api/locations/:id', getLocation);
router.post('/api/locations', createLocation);
```

#### Controllers

Thin layer. Parse request, call service, format response.

```typescript
// controllers/location.controller.ts
export const getLocations = async (req: Request, res: Response) => {
  const locations = await locationService.fetchAll();
  res.json(toLocationsResponse(locations));
};
```

#### Services

Where business logic lives. Fetch data, validate, transform, cache.

```typescript
// services/location.service.ts
export class LocationService {
  async fetchAll(): Promise<Location[]> {
    // Query DB, cache, validate
  }

  async search(query: string): Promise<Location[]> {
    // Fuzzy search by name, building
  }

  async submitPin(pin: SubmitPinRequest): Promise<Location> {
    // Store new submission, queue for moderation
  }
}
```

#### Models

TypeScript interfaces & types. Shared between frontend + backend.

```typescript
// models/location.model.ts
export interface Location {
  id: string;
  name: string;
  building: string;
  gps: { lat: number; lng: number };
  category: 'classroom' | 'building' | 'facility' | 'outdoor';
  verified: boolean;
  submittedBy?: string;
  createdAt: Date;
}
```

#### Views

Response formatters. Shape data for API output.

```typescript
// views/location.view.ts
export const toLocationResponse = (model: Location) => ({
  id: model.id,
  name: model.name,
  position: model.gps, // Renamed for client
  type: model.category,
});
```

### Data & Storage

**Database** (TBD: PostgreSQL, MongoDB, etc.):

- `locations` table — campus POIs, classrooms, buildings
- `submissions` table — user-submitted pins, photos, sensor tags
- `broadcasts` table — Radio Club schedule + stream URLs
- `users` table — profiles, leaderboard scores, incentive balance

**Cache** (optional, TBD):

- Redis or in-memory for frequently accessed data (locations, broadcast schedule)

**File storage** (TBD):

- Cloud storage (AWS S3, Google Cloud Storage) for citizen science photos

## API contracts

### Locations API

```http
GET /api/locations
# Fetch all campus locations with optional filtering
# Response: Location[]

GET /api/locations/:id
# Fetch single location
# Response: Location

POST /api/locations
# Submit new location (citizen science)
# Body: { name, gps, category, photo?, sensorTag? }
# Response: Location (pending verification)

PATCH /api/locations/:id
# Update location (admin only)
# Body: Partial<Location>
# Response: Location
```

### Broadcasts API

```http
GET /api/broadcasts
# Fetch all broadcasts with schedule
# Response: Broadcast[]

GET /api/broadcasts/:id/stream
# Get stream URL for active broadcast
# Response: { streamUrl, title, startTime }
```

### Submissions API (Citizen Science)

```http
POST /api/submissions
# Submit photo, sensor tag, or pin
# Body: { type, locationId, photo?, sensorData?, notes? }
# Response: Submission (pending verification)

GET /api/submissions/leaderboard
# Fetch top contributors
# Response: LeaderboardEntry[]

GET /api/users/me/submissions
# Fetch user's own submissions
# Response: Submission[]
```

## Data flows

### GPS Map Load

```
1. User opens App
2. Client: RequestGeolocation & fetch locations
3. Backend: GET /api/locations → query DB
4. Backend: Return Location[] with GPS coords
5. Client: Render locations as pins on map
6. User: Tap pin → show details
```

### Submit Location (Citizen Science)

```
1. User taps "Submit" button
2. Client: Show form with photo upload
3. User: Enter name, location, optional photo/tag
4. Client: POST /api/submissions → send to backend
5. Backend: Validate, store submission
6. Backend: Queue for admin moderation
7. Client: Show confirmation "Thanks! Your submission is pending review"
8. Admin: Review submission → approve/reject
9. Backend: Create Location or dismiss
```

### Listen to Live Radio

```
1. User navigates to RadioScreen
2. Client: GET /api/broadcasts (active)
3. Backend: Return current/upcoming broadcasts
4. Client: Show list, user selects broadcast
5. Client: GET /api/broadcasts/:id/stream → get stream URL
6. Client: Initialize audio player with stream URL
7. User: Play/pause/volume controls
```

### User Leaderboard

```
1. User navigates to ProfileScreen
2. Client: GET /api/users/me + GET /api/submissions/leaderboard
3. Backend: Count user submissions, rank vs. others
4. Backend: Return LeaderboardEntry[]
5. Client: Display user rank, top contributors, incentive balance
```

## Phased rollout

### Phase 1: GPS Mapping (Current)

**Backend:**

- Location model + database schema
- CRUD endpoints for locations
- Search & filtering
- Submission pipeline (photo upload, validation)

**Frontend:**

- Map screen with pins
- Location detail view
- Submit form
- Basic user auth (register/login)

**Deliverable:** Functional campus map with manual + citizen science data

### Phase 2: Radio Integration

**Backend:**

- Broadcast model + schedule
- Stream URL management
- Integration with Radio Club (possibly external webhook)

**Frontend:**

- Radio screen with broadcast list
- Audio player
- Live indicator + schedule
- Offline queue (advanced)

**Deliverable:** Live streaming integrated into app

### Phase 3: Gamification & Incentives

**Backend:**

- Leaderboard ranking by submissions
- Incentive tracking (gift cards, meal credits)
- User profile + stats

**Frontend:**

- Leaderboard view
- Profile view with incentive balance
- Notifications for rewards

**Deliverable:** Full citizen science incentive loop

## Scalability considerations

**Data volume:**

- Campus likely has 100-500 locations (scalable to thousands)
- Submissions could reach 10k-100k in first year (scale with dedicated moderation queue)
- Broadcasts: ~10 per week (low volume)
- Users: Start with RVCC population (~5k), scale to 50k+

**Performance:**

- Cache location list in-memory or Redis
- Paginate submission leaderboard
- Lazy-load map tiles (if using map library)
- CDN for static assets (Expo web export, photos)

**Infrastructure:**

- Heroku / DigitalOcean / AWS for backend + database
- CloudFlare for CDN
- S3 or equivalent for photo storage
- Queue system (Bull, RabbitMQ) if moderation backlog grows

## Security notes

- **Auth:** OAuth2 or JWT (prefer OIDC with Student Life integration)
- **Photo uploads:** Validate MIME type, scan for moderation flags, store separately
- **Admin endpoints:** Require role-based access control (RBAC)
- **Rate limiting:** Prevent spam submissions (1 per minute per user)
- **HTTPS only:** All API communication encrypted

## Testing strategy

**Backend:**

- Unit tests for services (80%+ coverage)
- Integration tests for endpoints (Supertest)
- E2E tests for critical flows (Jest + k6 for load)

**Frontend:**

- Component tests (React Testing Library)
- Navigation tests (React Navigation)
- Optional: E2E mobile tests (Detox)

## Monitoring & logging

**Backend:**

- Application logs: Winston or Pino to stdout/file
- Error tracking: Sentry
- Metrics: Prometheus (optional)

**Frontend:**

- Crash reporting: Sentry via React Native plugin
- Usage analytics: Mixpanel or Firebase Analytics (TBD with Student Life)

## Future enhancements

- Offline-first sync (React Query, Redux, WorkBox)
- AR scanning for location verification (Expo AR)
- Notifications for new broadcasts, leaderboard changes
- Integration with Student Life's RV Connect platform
- SMS alerts for schedule changes
- Multi-language support
