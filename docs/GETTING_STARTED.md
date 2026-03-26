# Getting Started with Pathster

Get the Pathster development environment up and running in 10 minutes.

## Step 1: Clone & install (3 min)

```bash
git clone https://github.com/rvcc/pathster.git
cd pathster
nvm use              # Use Node 24 LTS
npm install          # Install all dependencies
```

## Step 2: Verify setup (2 min)

```bash
# Typecheck everything
npm run typecheck

# Run all tests
npm run test

# Should see: ✓ 1 passed
```

## Step 3: Start backend (2 min)

```bash
npm run dev -w apps/server
```

You should see:

```
server listening on port 3000
```

Visit http://localhost:3000/health in your browser. You should see:

```json
{ "status": "ok" }
```

## Step 4: Start frontend (3 min)

In a new terminal:

```bash
npm run web -w apps/client
```

Expo will open a web browser at http://localhost:8081. You should see the React Native app.

## Step 5: Make a change & verify Husky gates

Edit a file in `apps/server/src`:

```typescript
// Example: change the health status message
```

Try to commit:

```bash
git add .
git commit -m "test: verify husky gates"
```

Husky will:

1. Check code formatting (Prettier)
2. Run linting (ESLint)
3. Run tests (Vitest)

If all pass, you're ready! ✅

## Debugging

### Backend issues

```bash
# Check logs
npm run dev -w apps/server
# Look for errors in terminal

# Run specific tests
npm run test -w apps/server

# TypeScript errors
npm run typecheck -w apps/server
```

### Frontend issues

```bash
# Metro bundler logs
npm run web -w apps/client
# Errors show in terminal and browser console

# Clear cache & rebuild
rm -rf apps/client/node_modules apps/client/.expo
npm install -w apps/client
npm run web -w apps/client
```

### Environment variables

Backend expects a `.env` file. Copy from example:

```bash
cp apps/server/.env.example apps/server/.env
# Edit as needed for local development
```

Client uses Expo environment variables automatically (prefixed with `EXPO_PUBLIC_`).

## Next steps

- Read [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development workflow
- Check [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for system design
- Start on Phase 1: GPS mapping features
- Assign yourself an issue on GitHub

## Still stuck?

- Check the [README](../README.md)
- Open an issue with `[help wanted]` tag
- Reach out to @project-lead
