# Pathster Client Service Dockerfile
# React Native + Expo web application

# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json .npmrc .nvmrc ./

# Copy workspace manifests
COPY apps/client/package.json apps/client/

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy all source files
COPY apps/client apps/client
COPY tsconfig*.json ./

# Build web export (creates dist-web/)
WORKDIR /app/apps/client
RUN npm run export:web

# Stage 2: Runtime (serve static files)
FROM node:24-alpine

WORKDIR /app

# Install serve to run the static web server
RUN npm install -g serve

# Create app user (non-root for security)
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy built web assets from builder
COPY --from=builder --chown=nodejs:nodejs /app/apps/client/dist-web /app/web

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

# Serve the Expo web build
CMD ["serve", "-s", "web", "-l", "3000"]
