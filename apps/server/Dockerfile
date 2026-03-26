# Pathster Backend Service Dockerfile
# Multi-stage production build for Express API

# Stage 1: Dependencies
FROM node:24-alpine AS dependencies

WORKDIR /app

# Copy root package files
COPY package*.json .npmrc .nvmrc ./

# Copy workspace manifests
COPY apps/server/package.json apps/server/
COPY libs/api-types/package.json libs/api-types/

# Install dependencies
RUN npm ci --only=production && npm ci --only=development

# Stage 2: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy everything from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package*.json .npmrc .nvmrc ./
COPY apps/server apps/server
COPY libs/api-types libs/api-types
COPY tsconfig*.json ./

# Build TypeScript
WORKDIR /app/apps/server
RUN npm run build

# Stage 3: Runtime
FROM node:24-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user (non-root for security)
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy only production dependencies
COPY package*.json .npmrc .nvmrc ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/apps/server/dist apps/server/dist

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/server/dist/index.js"]
