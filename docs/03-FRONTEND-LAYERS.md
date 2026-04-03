# 03 - Frontend Organization (Clean Architecture)

## What is Clean Architecture?

Clean architecture means organizing code into layers with clear responsibilities.

It's like organizing a restaurant:

- **Kitchen** (back) — Where chefs prepare food
- **Dining room** (front) — Where customers eat
- **Manager's office** (middle) — Connects everything

Each has a specific job. They don't cross responsibilities.

In frontend code:

- **Kitchen** = Data storage and API calls
- **Dining room** = Buttons and screens
- **Manager** = Business logic

## The Four Layers

### 1. Presentation Layer (What Students See)

This layer shows the user interface. It's everything on screen.

**What goes here:**

- Buttons and text inputs
- Maps and images
- Screens and navigation
- Colors and fonts

**File location:** `apps/client/src/presentation/`

**Example:** When the student taps the "Find" button, only this layer handles it.

```typescript
// This layer says: "Button was tapped!"
// But it doesn't search for the room.
```

**Important rule:** This layer never calls the API directly.

### 2. Domain Layer (What the App Should Do)

This layer stores the business rules. It's the manager of the system.

**What goes here:**

- What a "User" object contains
- What a "Location" object contains
- What "searching for a room" means
- Rules for earning points

**File location:** `apps/client/src/domain/`

**Example:** The rule "you earn 10 points for submitting a location" lives here.

```typescript
// Domain layer says:
// "A location has these properties"
// "A user has ID, name, email"
// "Submitting a location means sending data"
```

**Important rule:** This layer doesn't know about screens or APIs.

### 3. Data Layer (How We Get Information)

This layer talks to the API and stores data locally.

**What goes here:**

- Calling the API server
- Saving data on the phone
- Caching (storing recent data to avoid repeated API calls)
- Converting data between formats

**File location:** `apps/client/src/data/`

**Example:** When the app needs a list of locations, this layer:

1. Checks if we already asked for this today (cache)
2. If not cached, calls the API
3. Saves the results locally

```typescript
// Data layer says:
// "Go ask the server for locations"
// "Store this on the phone's storage"
// "If offline, use what we saved yesterday"
```

**Important rule:** This layer knows how to talk to servers and local storage.

### 4. Configuration Layer (Settings)

This layer stores all settings and setup code.

**What goes here:**

- API server addresses
- Timeout values
- Environment-specific settings (development vs. production)
- Feature flags (turn features on/off)

**File location:** `apps/client/src/config/`

**Example:** Different URLs for development and production:

```typescript
// For development: http://localhost:3000
// For production: https://api.pathster.rvcc.edu
```

## How Data Flows Through Layers

Let's trace what happens when a student searches for a location:

### Step 1: User Taps Button (Presentation)

```
Screen: Student sees button "Find Room"
Action: Student taps it
Layer: Presentation
```

### Step 2: Layer Calls Business Logic (Domain)

```
Message: "Find this location"
Layer: Domain
Action: Creates a use case (like a job order)
```

### Step 3: Get the Data (Data)

```
Layer: Data
Action: "Check cache for this location"
Action: "If not cached, ask the API"
Action: "Save the result"
```

### Step 4: Return Results (Back Through Layers)

```
Data → Format the answer
Domain → Add any business rules
Presentation → Show it on screen
```

## Dependency Injection

Connecting the layers is important. That's where "Service Locator" comes in.

Think of it like this:

- Presentation layer needs to use Domain layer
- Domain layer needs Data layer
- But how do they find each other?

The Service Locator introduces them:

```typescript
// Service Locator says:
// "Here is a Data layer for you"
// "Here is a Domain layer for you"
// "They're already connected"
```

This makes code testable. We can replace the Data layer with fake data for testing.

## Folder Structure Explained

```
apps/client/src/
├── config/
│   ├── env.ts              ← Load settings from .env file
│   ├── api.ts              ← setup API connection
│   └── constants.ts        ← Values used everywhere
│
├── presentation/
│   ├── screens/            ← Each screen (app page)
│   ├── components/         ← Reusable pieces (buttons, cards)
│   ├── navigation/         ← Moving between screens
│   └── styles/             ← Colors and fonts
│
├── domain/
│   ├── entities/           ← Data definitions (User, Location)
│   ├── repositories/       ← Interfaces (contracts) for data access
│   └── usecases/           ← Individual jobs to do
│
├── data/
│   ├── datasources/        ← Talk to API and local storage
│   ├── repositories/       ← Implementation (does the actual work)
│   └── models/             ← Data format (DTOs)
│
└── service-locator.ts      ← Connects all layers
```

## Example: Adding a New Feature

Let's say we want to add "Find my class schedule."

**Step 1: What data does it involve?**
Create entity in Domain (Presentation → Domain):

```typescript
// src/domain/entities/
interface ClassSchedule {
  className: string;
  room: string;
  time: string;
}
```

**Step 2: Where does it come from?**
Create repository interface in Domain:

```typescript
// src/domain/repositories/
interface IScheduleRepository {
  getSchedule(): Promise<ClassSchedule[]>;
}
```

**Step 3: What's the business rule?**
Create use case in Domain (the job to do):

```typescript
// src/domain/usecases/
class GetScheduleUseCase {
  execute() {
    // "Get my schedule from the database"
  }
}
```

**Step 4: How do we format the API response?**
Create DTO in Data layer:

```typescript
// src/data/models/
interface ScheduleDTO {
  className: string;
  room: string;
  time: string;
}
```

**Step 5: How do we get it from the server?**
Implement in Data layer:

```typescript
// src/data/repositories/
class ScheduleRepository implements IScheduleRepository {
  async getSchedule() {
    const response = await api.get('/api/schedule');
    return response.data;
  }
}
```

**Step 6: Show it to users**
Create screen in Presentation:

```typescript
// src/presentation/screens/
export function ScheduleScreen() {
  // Call the use case
  // Show results in a nice format
}
```

**Step 7: Connect everything**
Update Service Locator:

```typescript
// Service Locator introduces all the pieces
```

## Why This Matters

This structure has real benefits:

1. **Testing is easy** — Replace layers with fake ones for testing
2. **Changes don't break code** — Each layer is separate
3. **New team members understand it** — Structure is consistent
4. **We reuse code** — Domain layer works for iPhone, Android, web
5. **It scales** — Add 10 features without confusion

## Common Mistakes to Avoid

❌ **Don't break the rules:**

- No Presentation directly calling APIs
- No Data layer handling business logic
- No mixing layers together

✅ **Do follow the structure:**

- Follow clear responsibilities
- Use the Service Locator
- Test each layer separately

## Next Steps

Ready to understand the backend? Read:

- **[04-BACKEND-LAYERS.md](04-BACKEND-LAYERS.md)** — How server code is organized
