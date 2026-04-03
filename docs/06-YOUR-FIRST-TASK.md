# 06 - Make Your First Code Change

## Your Task

You're going to make a small change to show everything is working.

We'll change the health check message on the backend.

This teaches you:

- How to edit code
- How to test your changes
- How to commit changes to Git

## Current State

Right now, visiting http://localhost:3000/health shows:

```json
{\"status\":\"ok\"}
```

We're going to change the message.

## Step 1: Open the Health Check File

Navigate to this file in your editor:

```
apps/server/src/services/health.service.ts
```

You should see:

```typescript
export class HealthService {
  async getHealthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

## Step 2: Make a Change

Change the status message:

```typescript
export class HealthService {
  async getHealthStatus() {
    return {
      status: 'ok',
      message: 'Pathster backend is running!', // ADD THIS LINE
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

Save the file (Ctrl+S or Cmd+S).

## Step 3: Watch the Backend Reload

The backend runs in "watch mode." It automatically restarts when code changes.

In your terminal running the backend, you should see:

```
[12:34:56] File changed: health.service.ts
[12:34:57] Recompiling...
[12:34:58] ✓ Ready to accept requests
```

## Step 4: Test Your Change

Refresh your browser at http://localhost:3000/health

You should now see:

```json
{
  "status": "ok",
  "message": "Pathster backend is running!",
  "timestamp": "2026-04-01T12:34:56.789Z",
  "uptime": 123.456
}
```

Success! Your change works!

## Step 5: Run the Tests

Make sure your change doesn't break anything:

```bash
npm run test -w apps/server
```

You should see:

```
✓ 1 test passed
```

## Step 6: Check Code Quality

Run TypeScript type checking:

```bash
npm run typecheck
```

Should show no errors.

Run the linter:

```bash
npm run lint -w apps/server
```

Should pass.

## Step 7: Commit Your Change

First, see what you changed:

```bash
git status
```

You should see:

```
modified: apps/server/src/services/health.service.ts
```

### Create a Branch

Create a branch for your change:

```bash
git checkout -b feature/health-message
```

### Stage Your Changes

Tell Git you want to save this file:

```bash
git add apps/server/src/services/health.service.ts
```

### Commit

Save it with a message:

```bash
git commit -m "feat: add message to health check response"
```

Husky will run checks:

- ✓ Format check
- ✓ Linter check
- ✓ Tests

If all pass, you see:

```
1 file changed
```

Congratulations! Your change is committed.

## Step 8: Create a Pull Request (Optional)

A pull request (PR) is a "please review my change" message.

Real teams require PRs before merging code.

### Push Your Branch

```bash
git push origin feature/health-message
```

### Go to GitHub

Visit https://github.com/rvcc/pathster

You should see a message:
"Your branch has recent pushes"

Click "Compare & pull request"

### Write a Description

**Title:**

```
Add message to health check response
```

**Description:**

```
The health check endpoint now includes helpful message text.

This helps developers know the server is working.
```

Click "Create pull request"

### Review Process

A team member reviews your code and either:

- ✅ Approves it
- 💬 Requests changes

Once approved, you can merge to main.

## What You Learned

✅ How to find files in the project  
✅ How to make code changes  
✅ How to test your changes  
✅ How to commit to Git  
✅ How to create a pull request  
✅ How Husky prevents bad commits

## Common Git Commands

| Command                  | What It Does           |
| ------------------------ | ---------------------- |
| `git status`             | See what changed       |
| `git add [file]`         | Mark file for commit   |
| `git commit -m "..."`    | Save changes           |
| `git push`               | Send to GitHub         |
| `git pull`               | Get latest from GitHub |
| `git checkout -b [name]` | Create a branch        |

## Key Files in This Project

| File            | What It Does                      |
| --------------- | --------------------------------- |
| `package.json`  | List of commands and dependencies |
| `tsconfig.json` | TypeScript settings               |
| `.eslintrc`     | Code style rules                  |
| `.prettierrc`   | Code formatting                   |
| `.husky/`       | Git hooks (run before commits)    |

## Important Rules

✅ **Always create a branch** before making changes

```bash
git checkout -b feature/your-feature-name
```

✅ **Test before committing**

```bash
npm run typecheck
npm run test
```

✅ **Write clear commit messages**

```
feat: add new feature
fix: resolve bug
docs: update documentation
```

✅ **Push to GitHub** so others can review

```bash
git push origin feature/your-feature-name
```

## Next Steps

Ready to add a real feature? Choose an area:

- **[03-FRONTEND-LAYERS.md](03-FRONTEND-LAYERS.md)** — Add a frontend feature
- **[04-BACKEND-LAYERS.md](04-BACKEND-LAYERS.md)** — Add an API endpoint
