# 07 - Using Docker (Containers Explained)

## What is Docker?

Docker packages your app with all its dependencies into a "container."

Think of it like shipping:

- **Your code** = Goods to ship
- **Dependencies** = Packaging material
- **Container** = The shipping box
- **Docker image** = Instructions for building the box
- **Docker Compose** = Shipping multiple boxes together

Everyone receives the same box. It works on any computer.

## Why Use Docker?

Without Docker:

- Developer 1 uses Node 25
- Developer 2 uses Node 24
- Developer 3 has different MongoDB version
- Apps break unexpectedly

With Docker:

- Everyone uses exact same versions
- Code runs the same on everyone's computer
- No "works on my machine" problems

## Three Key Concepts

### 1. Image

An image is a template. It says:

- "Start with this operating system"
- "Install Node.js 25"
- "Copy this code"
- "Run this command"

It's like a cookie cutter.

### 2. Container

A container is a running instance of an image.

It's like a cookie made from the cutter.

Each container:

- Runs independently
- Has its own file system
- Doesn't affect other containers

### 3. Docker Compose

Docker Compose starts multiple containers together.

It says:

- "Start the backend container"
- "Start the frontend container"
- "Start the MongoDB container"
- "Connect them together"

It's like a recipe that makes all containers work together.

## Pathster's Dockerfile

Pathster has two Dockerfiles:

```
apps/server/Dockerfile      ← For backend
apps/client/Dockerfile      ← For frontend
```

Each tells Docker how to build that part.

The `docker-compose.yml` file says:

- "Build both"
- "Also start MongoDB and Redis"
- "Connect them on a network"

## Quick Start with Docker Compose

### Install Docker

Visit [docker.com](https://www.docker.com/products/docker-desktop)

Download Docker Desktop for your computer.

Run the installer.

### Check Installation

```bash
docker --version
```

You should see:

```
Docker version 27.0.0+
```

### Start Everything

From the pathster folder:

```bash
docker-compose up
```

Docker will:

1. Build the backend image
2. Build the frontend image
3. Start the backend container
4. Start the frontend container
5. Start MongoDB container
6. Start Redis container

You should see many lines of output.

When done:

```
✓ Backend ready on port 3000
✓ Frontend ready on port 8082
✓ MongoDB ready on port 27017
✓ Redis ready on port 6379
```

### Access the App

Open your browser:

- Backend: http://localhost:3000
- Frontend: http://localhost:8082

### Stop Everything

Press Ctrl+C in the terminal.

Or in another terminal:

```bash
docker-compose down
```

This stops and removes all containers.

## How Docker Compose Works

### The Config File

`docker-compose.yml` defines everything:

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: apps/server/Dockerfile
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: mongodb://mongodb:27017/pathster
      REDIS_URL: redis://redis:6379

  frontend:
    build:
      context: .
      dockerfile: apps/client/Dockerfile
    ports:
      - '8082:3000'

  mongodb:
    image: mongo:7
    ports:
      - '27017:27017'

  redis:
    image: redis:7
    ports:
      - '6379:6379'
```

This says:

- **backend**: Build from `apps/server/Dockerfile`, use port 3000
- **frontend**: Build from `apps/client/Dockerfile`, use port 8082
- **mongodb**: Use official mongo image, port 27017
- **redis**: Use official redis image, port 6379

### Port Mapping

`3000:3000` means:

- First `3000` = Port on your computer
- Second `3000` = Port inside the container

So container port 3000 shows up as localhost:3000.

### Environment Variables

`DATABASE_URL: mongodb://mongodb:27017/pathster`

Tells the backend where the database is.

`mongodb` is the container name. Docker's network connects them.

## Building Manually

### Build Backend Image Only

```bash
docker build -f apps/server/Dockerfile -t pathster-backend:latest .
```

-f = use this Dockerfile  
-t = tag (name) for the image

### Run the Backend Container

```bash
docker run -p 3000:3000 pathster-backend:latest
```

-p = map port 3000

This runs just the backend.

## Useful Docker Commands

| Command                   | What It Does                 |
| ------------------------- | ---------------------------- |
| `docker ps`               | List running containers      |
| `docker ps -a`            | List all containers          |
| `docker images`           | List all images              |
| `docker logs [name]`      | See container output         |
| `docker exec [name] bash` | Get a shell inside container |
| `docker stop [name]`      | Stop a container             |
| `docker rm [name]`        | Delete a container           |

## Debugging a Container

### View Logs

```bash
docker-compose logs backend
```

Shows all output from the backend container.

### Get Inside a Container

```bash
docker-compose exec backend bash
```

Now you're inside the container like a regular shell.

```bash
ls                  # List files
npm run typecheck   # Run commands
exit                # Leave the container
```

### Check Running Services

```bash
docker-compose ps
```

Shows status of all services.

## Common Problems

### "Port 3000 already in use"

Change the mapping in docker-compose.yml:

```yaml
ports:
  - '3001:3000' # Use 3001 instead of 3000
```

### "Container quit unexpectedly"

Check the logs:

```bash
docker-compose logs backend
```

Look for error messages.

### "Database connection refused"

The containers aren't connected yet.

Wait 10 seconds and try again.

Or rebuild:

```bash
docker-compose down
docker-compose up --build
```

## Production vs Development

### Development

Use `npm run dev`:

- Code reloads when you change files
- Shows helpful error messages
- Slower

### Production

Use Docker:

- Optimized for speed
- All code is pre-compiled
- Smaller image size
- No development tools included

## Layer Caching

Docker caches layers. If you only change code:

```dockerfile
FROM node:25
WORKDIR /app
COPY package.json .
RUN npm install          # Cache this layer
COPY . .                 # Only rebuild from here
RUN npm run build
```

If only `./src` changed, Docker skips `npm install`.

Faster builds!

## Next Steps

Understanding how to deploy:

- **[09-DEPLOYMENT.md](09-DEPLOYMENT.md)** — How to release to production
- **[08-TESTING.md](08-TESTING.md)** — How to write and run tests
