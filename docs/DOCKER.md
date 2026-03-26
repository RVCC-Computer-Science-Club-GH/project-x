# Docker Setup for Pathster

This document explains how to build and run Pathster using Docker.

## Architecture

Pathster uses individual Dockerfiles for each service:

- **`apps/server/Dockerfile`** — Backend Express API service
- **`apps/client/Dockerfile`** — Frontend React Native/Expo web application

Each service is independently containerizable and can be deployed separately.

## Development with Docker Compose

The `docker-compose.yml` orchestrates all services plus supporting infrastructure (MongoDB, Redis).

### Quick Start

```bash
# Start all services (backend, frontend, mongodb, redis)
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build
```

### Services

| Service     | URL                   | Description                                      |
| ----------- | --------------------- | ------------------------------------------------ |
| **server**  | http://3000           | Pathster backend API (`@pathster/server`)        |
| **client**  | http://localhost:8082 | React Native web app (Expo) (`@pathster/client`) |
| **mongodb** | localhost:27017       | MongoDB database (`pathster_campus`)             |
| **redis**   | localhost:6379        | Redis cache for sessions and performance         |

## Building Individual Services

### Backend Only

```bash
# Build the server image
docker build -f apps/server/Dockerfile -t pathster-server:latest .

# Run the server
docker run --rm \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  pathster-server:latest
```

### Frontend Only

```bash
# Build the client image
docker build -f apps/client/Dockerfile -t pathster-client:latest .

# Run the client
docker run --rm \
  -p 3000:3000 \
  pathster-client:latest
```

## Production Deployments

### Build for Production

Both Dockerfiles use multi-stage builds to optimize image size:

1. **Dependencies stage** — Install all packages
2. **Build stage** — Compile TypeScript / Expo web
3. **Runtime stage** — Minimal image with only production code

### Environment Variables

#### Server (`apps/server/Dockerfile`)

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://user:pass@host:27017/pathster_campus?authSource=admin
REDIS_URL=redis://host:6379
LOG_LEVEL=info
HEALTHCHECK_URL=/api/health
```

#### Client (`apps/client/Dockerfile`)

```bash
NODE_ENV=production
EXPO_PUBLIC_API_BASE_URL=https://api.pathster.rvcc.edu
EXPO_PUBLIC_API_TIMEOUT=30000
```

### Health Checks

Both services include health checks:

- **Server:** `GET /api/health` returns `{ status: 'ok', requestId, timestamp }`
- **Client:** HTTP GET on port 3000

## Security

- Both services run as non-root user (`nodejs:nodejs`)
- Signal handling via `dumb-init` (server only)
- No sensitive data in images
- Use `.env` files for secrets in development, Secrets Manager in production

## Troubleshooting

### Port Already in Use

```bash
# Free port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
docker-compose up -p 8000:3000 server
```

### Database Connection Issues

```bash
# Check MongoDB health
docker-compose exec mongodb mongosh --username pathster_user --password pathster_password_dev --eval 'db.adminCommand("ping")'

# View MongoDB logs
docker-compose logs mongodb

# Connect to MongoDB shell
docker-compose exec mongodb mongosh --username pathster_user --password pathster_password_dev
```

### Rebuild Without Cache

```bash
docker-compose build --no-cache
```

## Development Workflow

For development, `docker-compose.yml` mounts source directories:

- **Server:** `apps/server/src` → `/app/apps/server/src`
- **Client:** `apps/client/src` → `/app/apps/client/src`

Changes are reflected immediately with hot-reload (tsx watch for server, Expo for client).

## Next Steps

- **CI/CD:** Set up GitHub Actions to build and push images to Docker Hub or ECR
- **Orchestration:** Deploy to Kubernetes or Docker Swarm
- **Registry:** Push to private registry for deployment
