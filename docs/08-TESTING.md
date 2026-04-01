# 08 - Testing Your Code

## What is Testing?

Testing means writing code to verify other code works.

Like a quality check before shipping a product.

### Without Tests

You change code. Does it break something else? You don't know until users complain.

### With Tests

You change code. You run tests. They either pass or fail. You know immediately.

## Three Types of Tests

### 1. Unit Tests

Test one small piece in isolation.

Like testing: "Does this function work correctly?"

**Example:**
```typescript
// Test: Does doubling 5 give 10?
test('double(5) returns 10', () => {
  expect(double(5)).toBe(10);
});
```

**Benefits:**
- Fast to run
- Easy to write
- Find bugs quickly

### 2. Integration Tests

Test multiple pieces working together.

Like testing: "Does the API call the database correctly?"

**Example:**
```typescript
// Test: Can we get a location from the API?
test('GET /api/locations/316 returns location', async () => {
  const response = await api.get('/api/locations/316');
  expect(response.data.name).toBe('Room 316');
});
```

**Benefits:**
- Test real behavior
- Catch communication bugs

### 3. End-to-End Tests

Test the whole system.

Like a user actually using the app.

**Example:**
```typescript
// Test: Can a user search for a room on the map?
test('User can search and find a room', async () => {
  browser.visit('http://localhost:8081');
  browser.fill('search', 'Room 316');
  browser.press('enter');
  expect(browser.text).toContain('Room 316');
});
```

**Benefits:**
- Test real user workflows
- Most confidence

**Tradeoffs:**
- Slowest to run
- Hardest to write
- Most fragile

## Pathster's Testing Setup

Pathster uses **Vitest** for testing.

Vitest is similar to Jest but faster.

### Test File Structure

Test files live next to source files:

```
apps/server/src/
  ├── services/
  │   ├── health.service.ts
  │   └── health.service.test.ts    ← Test for it
  ├── controllers/
  │   ├── location.controller.ts
  │   └── location.controller.test.ts
```

Convention: `[filename].test.ts`

## Writing a Simple Test

### Example: Testing a Function

```typescript
// health.service.ts
export class HealthService {
  async getStatus() {
    return { status: 'ok' };
  }
}

// health.service.test.ts
import { describe, it, expect } from 'vitest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  it('returns status ok', async () => {
    const service = new HealthService();
    const result = await service.getStatus();
    expect(result.status).toBe('ok');
  });
});
```

### Breaking It Down

```typescript
describe('HealthService', () => {
  // Groups related tests
  
  it('returns status ok', async () => {
    // "it" describes one test
    // "returns status ok" explains what it tests
    
    const service = new HealthService();
    // Setup: Create an instance
    
    const result = await service.getStatus();
    // Execute: Call the function
    
    expect(result.status).toBe('ok');
    // Assert: Check the result
  });
});
```

## Example: Testing an API Endpoint

```typescript
import { describe, it, expect } from 'vitest';
import { LocationController } from './location.controller';
import { LocationService } from '../services/location.service';

describe('LocationController', () => {
  it('returns a location by id', async () => {
    // Setup
    const mockService = {
      getLocation: async (id) => ({
        id,
        name: 'Room 316',
        building: 'Science'
      })
    };
    
    const controller = new LocationController(mockService);
    const mockRequest = { params: { id: '316' } };
    const mockResponse = { json: (data) => data };
    
    // Execute
    const result = await controller.getLocation(mockRequest, mockResponse);
    
    // Assert
    expect(result.name).toBe('Room 316');
  });
});
```

## Running Tests

### Run All Tests

```bash
npm run test
```

Output:
```
✓ health.service.test.ts (1 test)
✓ location.controller.test.ts (2 tests)

3 tests passed in 0.5s
```

### Run Backend Tests Only

```bash
npm run test -w apps/server
```

### Run Frontend Tests Only

```bash
npm run test -w apps/client
```

### Run Tests in Watch Mode

```bash
npm run test -- --watch
```

Tests rerun when you change code.

### Run One Specific Test

```bash
npm run test -- health.service.test.ts
```

## Using Mocks for Unit Tests

A mock is a fake version of something.

Why use mocks?

- **Isolation**: Test just one function
- **Speed**: Don't hit real database
- **Predictability**: Know exactly what happens

### Example: Mock a Database

```typescript
describe('UserService', () => {
  it('gets a user by id', async () => {
    // Create fake database
    const mockDatabase = {
      findUser: async (id) => ({
        id,
        name: 'Alice',
        email: 'alice@rvcc.edu'
      })
    };
    
    const service = new UserService(mockDatabase);
    const user = await service.getUser(123);
    
    expect(user.name).toBe('Alice');
  });
});
```

The test never touches a real database!

## Test Conventions

### Good Test Names

```typescript
✓ it('returns status ok')
✓ it('throws error when id is invalid')
✓ it('saves location to database')
✓ it('formats response correctly')
```

### Avoid Vague Names

```typescript
✗ it('works')
✗ it('test 1')
✗ it('checks something')
```

### One Assert Per Test (Usually)

```typescript
✓ GOOD: Test does one thing
it('returns location object', () => {
  const location = getLocation(316);
  expect(location).toBeDefined();
});

✗ BAD: Tests multiple things
it('returns location object', () => {
  const location = getLocation(316);
  expect(location).toBeDefined();
  expect(location.name).toBe('Room 316');
  expect(location.building).toBe('Science');
});
```

If something fails, you know exactly why.

## Common Assertions

| Assertion | Checks |
|-----------|--------|
| `expect(x).toBe(5)` | x equals 5 |
| `expect(x).toEqual({id: 1})` | x equals object |
| `expect(x).toBeDefined()` | x is not undefined |
| `expect(x).toBeNull()` | x is null |
| `expect(x).toThrow()` | Function throws error |
| `expect(x).toContain('text')` | Array/string has text |
| `expect(fn).toHaveBeenCalled()` | Function was called |

## Writing Tests for the Clean Architecture

Because we built with clean architecture, testing is easy!

### Test a Use Case

```typescript
describe('GetLocationUseCase', () => {
  it('gets location from repository', async () => {
    // Mock the repository
    const mockRepository = {
      getLocation: async (id) => ({
        id,
        name: 'Room 316'
      })
    };
    
    const useCase = new GetLocationUseCase(mockRepository);
    const location = await useCase.execute('316');
    
    expect(location.name).toBe('Room 316');
  });
});
```

### Test a Service

```typescript
describe('LocationService', () => {
  it('formats response correctly', () => {
    const service = new LocationService();
    const result = service.formatLocation({
      id: '316',
      name: 'Room 316'
    });
    
    expect(result.roomNumber).toBe('316');
  });
});
```

## Test Coverage

Test coverage shows what percentage of code has tests.

Run coverage:

```bash
npm run test -- --coverage
```

Output:
```
Statements: 85%
Branches: 78%
Functions: 90%
Lines: 88%
```

Target for professional code: 80%+

## Before You Commit

Husky runs tests automatically:

```bash
git commit -m "feat: add locations"
npm run precommit:verify
  → Format check
  → Lint check
  → Test check
```

If tests fail, commit fails.

Fix the code, then try again.

## Key Testing Rules

✅ **Write tests as you code**

Don't add them later.

✅ **Test one thing per test**

Clear what's being tested.

✅ **Use descriptive names**

Anyone should understand what's tested.

✅ **Use mocks for isolation**

Don't depend on database/network.

✅ **Test the API not implementation**

Test what it does, not how.

## Next Steps

Ready to deploy? Read:

- **[09-DEPLOYMENT.md](09-DEPLOYMENT.md)** — How to release to production
