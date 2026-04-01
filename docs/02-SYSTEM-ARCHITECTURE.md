# 02 - How Pathster Works (System Architecture)

## The Big Picture

Pathster has three main pieces that work together:

1. **User Devices** (iPhone, Android, Web)
2. **API Server** (Backend in the cloud)
3. **Databases** (Store all the data)

Let's see how they talk to each other.

## What Each Piece Does

### User Devices (Frontend)

The app runs on your phone or web browser.

When you click "Find a Location", your device sends a message to the server.

The message says: "I want to find room 316."

Your device waits for the answer. The server sends back the location with GPS coordinates.

Your device shows it on a map.

### API Server (Backend)

The API server lives in the cloud. It's always running.

Think of it like a waiter in a restaurant. Requests (orders) come in. The server handles each one.

The server:
1. Receives requests from phones and web browsers
2. Reads data from the database
3. Processes the information
4. Sends the answer back

### Databases and Storage

The database stores all permanent data.

Think of it like library shelves. Data goes in. We look it up later. It stays organized.

Pathster stores:
- **Locations** — Every classroom, building, landmark on campus
- **User Data** — Profiles, points earned, submissions made
- **Broadcasts** — Radio schedule and stream URLs
- **Submissions** — Photos and descriptions students added

## How Communication Works

Here's what happens when a student searches for a location:

```
Student's Phone
    ↓
    → (sends message: "Find Room 316")
    ↓
API Server (receives request)
    ↓
    → (asks database: "Do we have Room 316?")
    ↓
Database (responds: "Yes, here are coordinates")
    ↓
API Server (formats the answer)
    ↓
    → (sends message back to phone)
    ↓
Student's Phone (shows location on map)
```

This entire process takes less than one second.

## Network Communication

Devices and servers communicate over the internet using HTTP requests.

Think of HTTP like mail:
- Your phone writes a letter (request)
- Puts it in an envelope (HTTP format)
- Sends it to the server (the address is the URL)
- The server reads the letter
- Writes a response
- Sends it back to your phone

The format is always the same. This lets different technologies work together.

## Information Flow

### Reading Data (GET Request)

When your phone asks for data, an HTTP request goes to the server:

```
GET /api/locations/316
(tell me about location 316)
```

The server answers:

```json
{
  "id": "316",
  "name": "Room 316",
  "building": "Science",
  "latitude": 40.2156,
  "longitude": -74.4512,
  "category": "classroom",
  "verified": true
}
```

### Sending Data (POST Request)

When a student submits a new location, a POST request goes to the server:

```
POST /api/locations/submit
```

With data in the message:

```json
{
  "name": "New Science Lab",
  "latitude": 40.2158,
  "longitude": -74.4510,
  "photograph": "[image data]",
  "description": "Science laboratory on second floor"
}
```

The server saves it to the database and responds:

```json
{
  "status": "success",
  "message": "Thank you! Your submission earned 10 points."
}
```

## Technology Layers

Pathster uses "layers" to organize code. Each layer has a specific job.

### Layer 1: Presentation (What Users See)
- Buttons, maps, text boxes
- Everything on the screen
- Technology: React Native

### Layer 2: Business Logic (How It Works)
- Rules for what is valid data
- Calculations (like earning points)
- Making decisions
- Technology: JavaScript/TypeScript

### Layer 3: Data Access (Storage)
- Reading from the database
- Writing to the database
- Formatting data
- Technology: MongoDB queries

### Layer 4: Infrastructure (Storage & Network)
- The actual database server
- Internet connections
- Cloud storage for photos
- Technology: MongoDB, AWS, Internet

## Why This Structure?

Separating layers creates benefits:

1. **Easy to Update** — Change the database without breaking the app
2. **Easy to Test** — Test each layer separately
3. **Easy to Understand** — Each layer has one job
4. **Easy to Replace** — Use a different database later if needed
5. **Easy to Reuse** — Share code between web and phone apps

## Next Steps

Want to know more? Read the next guide:

- **[03-FRONTEND-LAYERS.md](03-FRONTEND-LAYERS.md)** — How the frontend is organized
