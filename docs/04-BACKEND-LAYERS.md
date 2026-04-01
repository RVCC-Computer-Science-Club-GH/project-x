# 04 - Backend Organization (MVC Architecture)

## What is MVC?

MVC stands for "Model, View, Controller."

It's a way to organize server code into three parts:

| Part | Job | Like a Restaurant |
|------|-----|------------------|
| **Model** | Represents data | Recipe book (what ingredients go in each dish) |
| **View** | Formats output | Plating (how the dish looks to the customer) |
| **Controller** | Handles requests | Host (takes orders and coordinates with kitchen) |

## The Three Parts

### 1. Router (The Greeter)

The router is the first thing to receive requests.

Think of it like an entry hall at a building.

When a request comes in, the router says:
- "Is this for user data? Send to user controller."
- "Is this for locations? Send to location controller."
- "Is this a new submission? Send to submission controller."

**Example:**
```
Request: GET /api/locations/find
Router: "Send to LocationController"

Request: POST /api/submissions/new
Router: "Send to SubmissionController"
```

**File location:** `apps/server/src/routes/`

### 2. Controller (The Manager)

The controller takes the request and coordinates the response.

It's like a shift manager at a restaurant:
1. Takes the order (request)
2. Tells the kitchen what to make (calls service)
3. Gets the result back
4. Presents it nicely (calls view)

**Controllers are thin.** They don't do the heavy thinking.

**File location:** `apps/server/src/controllers/`

**Example:**
```typescript
// Controller says:
// "Someone asked for all locations"
// "Call the LocationService to get them"
// "Format them with LocationView"
// "Send back to the user"
```

The controller code stays simple. It has about 5-10 lines of code.

### 3. Service (The Kitchen)

The service does all the real work.

Think of it like the actual kitchen:
- Validating data (is this request valid?)
- Looking up information (is this user real?)
- Calculating results (how many points did they earn?)
- Enforcing rules (can this user do this action?)

**Services do the heavy thinking.**

**File location:** `apps/server/src/services/`

**Example:**
```typescript
// Service says:
// "Check if this location is valid"
// "Check if the user already submitted it"
// "Save it to the database"
// "Return the new location object"
```

### 4. Model (The Recipe)

The model describes what data looks like.

It's a template. Like a recipe defines ingredients, a model defines fields.

**File location:** `apps/server/src/models/`

**Example:**
```typescript
// Model says:
// "A Location has id, name, room, building, latitude, longitude"
// "A Location must have all these fields"
// "Latitude and longitude are numbers"
```

TypeScript checks that data matches the model. This prevents bugs.

### 5. View (The Foreman)

The view formats data for the response.

The client doesn't need all the data. The view picks what to send.

Think of it like:
- Database stores: `id, name, building, latitude, longitude, internal_id, created_timestamp`
- View sends: `id, name, building, latitude, longitude`

**File location:** `apps/server/src/views/`

**Example:**
```typescript
// View says:
// "Client doesn't need the internal ID"
// "Format GPS coordinates as 'position'"
// "Rename 'category' to 'type'"
```

This protects internal details from being exposed.

## Request Flow Through MVC

A student searches for "Room 316." Here's the journey:

### Step 1: Request Arrives
```
Client: GET /api/locations/316
↓
```

### Step 2: Router Decides
```
Router: "This is a location request"
→ Send to LocationController
↓
```

### Step 3: Controller Takes Action
```
Controller:
  1. Receive the request with id: 316
  2. Call LocationService.getLocation(316)
  3. Wait for the result
  4. Pass result to LocationView
↓
```

### Step 4: Service Does Work
```
Service:
  1. Query the database
  2. Find location 316
  3. Check if it's verified
  4. Return the location object
↓
```

### Step 5: View Formats It
```
View:
  1. Take location object
  2. Remove internal fields
  3. Rename GPS to "position"
  4. Format the response
↓
```

### Step 6: Response Sent Back
```
Server sends:
{
  "id": "316",
  "name": "Room 316",
  "position": {
    "lat": 40.2156,
    "lng": -74.4512
  },
  "verified": true
}
↓
Client receives and shows on map
```

## Folder Structure

```
apps/server/src/
├── routes/
│   ├── location.routes.ts     ← Define: GET /api/locations/
│   ├── user.routes.ts
│   └── index.ts               ← Combine all routes
│
├── controllers/
│   ├── location.controller.ts ← Handle location requests
│   ├── user.controller.ts
│   └── index.ts
│
├── services/
│   ├── location.service.ts    ← Business logic for locations
│   ├── user.service.ts
│   └── index.ts
│
├── models/
│   ├── location.model.ts      ← Define Location data
│   ├── user.model.ts
│   └── index.ts
│
├── views/
│   ├── location.view.ts       ← Format location response
│   ├── user.view.ts
│   └── index.ts
│
├── middleware/
│   ├── auth.middleware.ts     ← Check if user is logged in
│   ├── error.middleware.ts    ← Handle errors
│   └── logging.middleware.ts  ← Record what happened
│
├── app.ts                     ← Set up Express app
└── index.ts                   ← Start the server
```

## Example: Adding a New Feature

Let's add "Get all classrooms in a building."

### Step 1: Create Model
```typescript
// models/classroom.model.ts
interface Classroom {
  id: string;
  roomNumber: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture' | 'lab' | 'office';
}
```

### Step 2: Create Service
```typescript
// services/classroom.service.ts
class ClassroomService {
  async getClassroomsByBuilding(building: string) {
    // Query database
    // Filter by building
    // Return results
  }
}
```

### Step 3: Create Controller
```typescript
// controllers/classroom.controller.ts
export const getClassroomsByBuilding = async (req, res) => {
  const { building } = req.params;
  const classrooms = await classroomService.getClassroomsByBuilding(building);
  res.json(formatResponse(classrooms));
}
```

### Step 4: Create View
```typescript
// views/classroom.view.ts
export const formatClassroomListResponse = (classrooms) => {
  return classrooms.map(c => ({
    id: c.id,
    room: c.roomNumber,
    building: c.building,
    floor: c.floor,
    capacity: c.capacity
  }));
}
```

### Step 5: Create Routes
```typescript
// routes/classroom.routes.ts
router.get('/classrooms/:building', getClassroomsByBuilding);
```

### Step 6: Wire It Up
```typescript
// routes/index.ts
app.use('/api', classroomRoutes);
```

## Why This Structure?

Benefits of MVC:

1. **Easy to test** — Test each component separately
2. **Easy to maintain** — Find code quickly
3. **Easy to change** — Change the database without touching routes
4. **Consistent** — Every feature follows the same pattern
5. **Professional** — This is how real companies organize code

## Common Mistakes to Avoid

❌ **Don't do this:**
- Put all logic in the controller
- Don't use models (just raw objects)
- Call database from the route
- Mix business logic with formatting

✅ **Do this:**
- Controllers are thin (5-10 lines)
- Services have the logic
- Views format the output
- Models define data structure

## Controller Example (Right Way)

```typescript
// GOOD: Thin controller (5 lines)
export const getLocation = async (req, res) => {
  const { id } = req.params;
  const location = await locationService.getLocation(id);
  res.json(toLocationResponse(location));
}
```

```typescript
// BAD: Fat controller (30+ lines)
export const getLocation = async (req, res) => {
  const { id } = req.params;
  // Check if user is admin
  // Query database manually
  // Do calculations
  // Format response
  // Handle errors
  // Log everything
  // ... 25 more lines
}
```

## Next Steps

Ready to get started coding? Read:

- **[05-SETUP-YOUR-COMPUTER.md](05-SETUP-YOUR-COMPUTER.md)** — Install everything and run the project
