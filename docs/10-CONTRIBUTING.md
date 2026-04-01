# 10 - Contributing to Pathster

## Welcome!

You're now part of the Pathster team.

This document explains how we develop together professionally.

## Development Workflow

### 1. Pick a Task

Tasks come from GitHub Issues.

Visit [GitHub Issues](https://github.com/rvcc/pathster/issues)

Look for issues labeled:
- `good first issue` — Easy for beginners
- `help wanted` — Needs attention
- `frontend` or `backend` — Pick your area

### 2. Claim the Task

Comment on the issue:
```
I'll work on this!
```

This tells others you're taking it.

### 3. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/descriptive-name
```

Branch naming:
- `feature/add-search` — New feature
- `fix/map-crashes` — Bug fix
- `docs/update-readme` — Documentation
- `refactor/simplify-api` — Code improvement

### 4. Make Changes

Follow these guidelines for your area:

#### Backend Changes

**Location:** `apps/server/src/`

**Structure to follow:**

```
features/
  location/
    models/location.model.ts         ← Data structure
    services/location.service.ts     ← Business logic
    controllers/location.controller.ts ← Request handler
    views/location.view.ts           ← Response format
    routes/location.routes.ts        ← URL endpoints
```

**Example: Add a new endpoint**

1. **Define the data** in `models/`
2. **Write business logic** in `services/`
3. **Create request handler** in `controllers/`
4. **Format response** in `views/`
5. **Add routes** in `routes/`
6. **Write tests** for each layer

#### Frontend Changes

**Location:** `apps/client/src/`

**Structure to follow (Clean Architecture):**

```
config/             ← Settings
domain/            ← Business rules
  entities/        ← Data structures
  usecases/        ← Use operations
  repositories/    ← Data contracts
data/              ← Data access
  datasources/     ← API calls
  repositories/    ← Implementation
  models/          ← Data transfer objects
presentation/      ← UI components
  screens/         ← Pages
  components/      ← Reusable parts
  navigation/      ← Screen routing
  styles/          ← Theming
```

**Example: Add a feature**

1. **Define entity** in `domain/entities/`
2. **Create use case** in `domain/usecases/`
3. **Create repository interface** in `domain/repositories/`
4. **Implement data sources** in `data/datasources/`
5. **Implement repository** in `data/repositories/`
6. **Create screen** in `presentation/screens/`
7. **Add navigation** in `presentation/navigation/`

### 5. Write Tests

Every feature needs tests.

**Write tests as you code, not after.**

#### Backend Test Example

```bash
touch apps/server/src/services/location.service.test.ts
```

```typescript
import { describe, it, expect } from 'vitest';
import { LocationService } from './location.service';

describe('LocationService', () => {
  it('finds location by id', async () => {
    const mockDb = {
      findById: async (id) => ({
        id,
        name: 'Room 316'
      })
    };
    
    const service = new LocationService(mockDb);
    const location = await service.getLocation('316');
    
    expect(location.name).toBe('Room 316');
  });
});
```

Run tests:
```bash
npm run test
```

## Code Style Guidelines

### Naming Conventions

**Files:**
```
✓ user.model.ts
✓ auth.service.ts
✓ location.controller.ts
✗ User Model.ts (spaces, capital M)
```

**Variables:**
```
✓ userId
✓ locationName
✓ isVerified
✗ userID (inconsistent capitalization)
```

**Functions:**
```
✓ getUserById()
✓ updateLocation()
✓ isValidEmail()
✗ get_user_by_id() (Python style in TypeScript)
```

**Constants:**
```
✓ DEFAULT_TIMEOUT = 5000
✓ MAX_USERS = 100
✓ api_base_url (from .env)
```

### Code Format

Format code automatically:

```bash
npm run format
```

This follows Prettier + ESLint rules.

Don't argue about style. The tools decide.

### TypeScript Best Practices

**Use types for everything:**

```typescript
// ✓ GOOD: Clear types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}
```

```typescript
// ✗ BAD: Uses "any" (defeats purpose of TypeScript)
function getUser(id: any): any {
  // implementation
}
```

**Import paths:**

```typescript
// ✓ GOOD: Explicit paths
import { User } from '../models/user.model';

// ✗ BAD: Unclear what's imported
import * as stuff from '../utils';
```

### Comments

Write comments for WHY, not WHAT.

```typescript
// ✓ GOOD: Explains the reason
// Cache locations for 5 minutes to reduce database load
const CACHE_DURATION = 5 * 60 * 1000;

// ✗ BAD: Just repeats the code
const cacheDuration = 5 * 60 * 1000; // Five minutes
```

### Functions

Keep functions small and focused.

```typescript
// ✓ GOOD: One responsibility
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✗ BAD: Does multiple things
function saveUser(user: User) {
  validateEmail(user.email);
  checkPasswordStrength(user.password);
  encryptPassword(user.password);
  const db = connectToDatabase();
  db.insert('users', user);
  sendWelcomeEmail(user.email);
  logAnalytics('new_user');
  // ... 20 more lines
}
```

## Commit Guidelines

### Commit Message Format

```
<type>: <short description>

<longer description if needed>
```

**Types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation change
- `style:` — Code formatting
- `refactor:` — Code improvement
- `test:` — Test addition
- `chore:` — Build/dependency update

**Examples:**

```
feat: add location search by building name
```

```
fix: prevent duplicate location submissions
```

```
docs: add testing guide for students
```

```
refactor: extract validation logic to utility
```

### Good Commit Messages

```
✓ feat: add GPS tracking to map screen

Tracks user location in real-time
when user grants permission.
Updates every 5 seconds using
the Geolocation API.
```

```
✗ feat: stuff

Made changes to the code.
```

### Committing Code

Before committing, run checks:

```bash
npm run precommit:verify
```

This runs:
1. Format check (Prettier)
2. Lint check (ESLint)
3. Type check (TypeScript)
4. Tests (Vitest)

If anything fails, fix it:

```bash
npm run format      # Auto-fix format
npm run typecheck   # Show type errors
npm run test        # Run tests again
```

Then commit:

```bash
git add .
git commit -m "feat: add GPS tracking"
```

Husky checks runs automatically.

If it passes:
```
[feature/gps-tracking] feat: add GPS tracking
```

## Pull Request Process

### Create a Pull Request

After pushing your branch:

```bash
git push origin feature/your-feature
```

Visit GitHub. You'll see a "Create pull request" button.

Click it.

### PR Title and Description

**Title:**
```
Add GPS tracking to map screen
```

**Description:**
```
## What This Does
Adds real-time location tracking to the map.

## How to Test
1. Open map screen
2. Tap "Allow location access"
3. Your location updates every 5 seconds

## Issues Fixed
Closes #123

## Breaking Changes
None
```

### PR Checklist

Confirm:
- [ ] Tests pass
- [ ] Linting passes
- [ ] No TypeScript errors
- [ ] Code is reviewed for bugs
- [ ] Documentation updated if needed
- [ ] One feature per PR (not five unrelated changes)

### Reviewers

Request review from a team member:

Click "Reviewers" → Pick a teammate

They check:
- Does the code solve the problem?
- Is it correct?
- Is it tested?
- Is it maintainable?

### Responding to Feedback

Reviewer might request changes:

```
[Reviewer]: This function is too complex. 
Please split it into smaller functions.
```

**Fix the code:**

```typescript
// Before: 50-line function
function processSubmission() {
  // ... 50 lines
}

// After: Smaller functions
function validateSubmission() { }
function saveSubmission() { }
function notifyUser() { }
```

**Commit the fix:**

```bash
git add .
git commit -m "refactor: split submission handling into functions"
git push
```

The PR updates automatically.

### Approval and Merge

Once approved:

Reviewer clicks "Approve"

Click "Merge pull request"

Your code is now in the main branch!

## Common Issues

### "My PR has conflicts"

Conflicts happen when two people edit the same line.

Git needs your help fixing it.

```bash
# Get the latest code
git pull origin main

# Open the conflicted file
# Git marked conflicted sections

# Edit to resolve
# Then commit
git add .
git commit -m "resolve merge conflict"
git push
```

### "Tests are failing"

Check what failed:

```bash
npm run test
```

Look at the error. Fix the code.

```bash
git add .
git commit -m "fix: resolve failing test"
git push
```

### "Linting failed"

Auto-fix most issues:

```bash
npm run format

git add .
git commit -m "style: format code"
git push
```

## Working with Others

### Before Starting

Check if anyone else is working on it:

```bash
git fetch origin
git branch -r
```

See existing branches. Pick a new name.

### Communication

Use these for coordination:

- **GitHub Issues** — Discuss what to build
- **GitHub Discussions** — Ask questions
- **PR Comments** — Code review discussion
- **Team Meetings** — Sync together weekly

### Avoiding Conflicts

Don't both work on the same file at once.

If you will:
- Communicate first
- Split the work clearly
- One person pushes first
- Other person pulls and merges

## Asking for Help

Stuck? Ask in several ways:

1. **GitHub Issue Comments**
   ```
   I'm stuck on [X]. 
   I tried [Y] but it didn't work.
   Can someone help?
   ```

2. **PR Comments**
   ```
   @reviewer I'm not sure about this approach.
   Should I use [A] or [B]?
   ```

3. **Team Meetings**
   ```
   Can we discuss the best way to do [X]?
   ```

4. **Direct Message**
   ```
   Hey, are you free to pair program for 30 mins?
   ```

## Code Review Etiquette

### When Reviewing Others' Code

Be respectful:

```
✓ "This function could be simpler. 
   What if we extracted [X]?"

✗ "Your code is bad and confusing."
```

Ask questions:

```
✓ "I'm not sure why this check is needed. 
   Can you explain?"

✗ "This is wrong."
```

Acknowledge good work:

```
✓ "Nice refactor! This is much clearer."

✗ "Okay..."
```

### When Receiving Feedback

Don't take it personally. Code review improves code quality.

```
✓ "Thanks for pointing that out. 
   I'll fix it."

✗ "That's how I like to code."
```

Ask for clarification:

```
✓ "I don't understand suggestion [X]. 
   Can you show me an example?"
```

## Performance Considerations

### Frontend

- Images under 100kb
- Code split by route
- Cache frequently-used data
- Lazy load screens

### Backend

- Database indexes on common queries
- Cache API responses
- Use efficient algorithms
- Monitor slow endpoints

Profile before optimizing.

## Security Guidelines

- **Never commit passwords** to code
- **Never commit API keys** to code
- **Use environment variables** for secrets
- **Validate all user input** on backend
- **Use HTTPS** in production
- **Keep dependencies updated**

Run security check:

```bash
npm audit
```

## File Size Limits

Keep files manageable:

- **Functions**: 20-50 lines
- **Files**: 200-400 lines
- **Services**: < 300 lines

If too big, split it up.

## After Your PR Merges

### Celebrate!

Your code is live. Users benefit from your work.

### Delete Your Branch

```bash
git branch -D feature/your-feature
git push origin --delete feature/your-feature
```

### Pull Latest Main

```bash
git checkout main
git pull origin main
```

You're ready for the next task!

## Resources

- **GitHub Docs**: https://docs.github.com
- **Git Guide**: https://git-scm.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com

## Questions?

- Check existing issues/discussions on GitHub
- Ask the team during meetings
- Message team leads
- Read the architecture guides

Good luck! We're excited to have you contributing! 🚀
