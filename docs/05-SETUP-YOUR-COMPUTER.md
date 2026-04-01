# 05 - Get the Project Running (Setup Guide)

## What You'll Do Today

By the end of this guide, you'll have the entire Pathster project running on your computer.

This takes about 20 minutes.

## Step 1: Install Node.js (5 Minutes)

Node.js is the JavaScript runtime. Both frontend and backend need it.

### Check if You Have It

Open your terminal and type:

```bash
node --version
```

You should see `v25` or higher. If not, install it.

### How to Install

Go to [nodejs.org](https://nodejs.org)

Download the LTS (Long Term Support) version.

Run the installer and follow the prompts.

### Verify Installation

```bash
node --version
npm --version
```

Both should show versions. You're ready!

## Step 2: Download the Project (2 Minutes)

### Option 1: Using Git (Recommended)

If you have git installed:

```bash
git clone https://github.com/rvcc/pathster.git
cd pathster
```

### Option 2: Download ZIP

Visit [github.com/rvcc/pathster](https://github.com/rvcc/pathster)

Click "Code" → "Download ZIP"

Extract the ZIP file.

Open terminal in this folder.

## Step 3: Set Up Node Version

Pathster specifies which Node version to use.

### What is NVM?

NVM is "Node Version Manager." It switches Node versions easily.

### Install NVM

**On Mac/Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**On Windows:**
Use nvm-windows from GitHub.

### Use the Right Version

In the pathster folder:

```bash
nvm use
```

This reads `.nvmrc` and uses Node 24 LTS.

Verify:
```bash
node --version
npm --version
```

## Step 4: Install Dependencies (8 Minutes)

All third-party code is listed in `package.json`.

The `npm install` command downloads everything.

```bash
npm install
```

This takes a few minutes. Your computer might be busy.

**You'll see:**
- Progress bar
- Lots of package names
- "added 816 packages"

**Don't stop it.** Let it finish.

When done, you'll see:
```
added 816 packages in 45s
```

## Step 5: Verify Everything Works

Run this command:

```bash
npm run typecheck
```

This checks the code for errors before running.

You should see:
```
✓ No errors
```

Congratulations! The project is installed.

## Step 6: Start the Backend Server

Open a terminal window:

```bash
npm run dev -w apps/server
```

You should see:
```
server listening on port 3000
```

Your backend is running!

**To verify it works:**
Open your browser and go to `http://localhost:3000/health`

You should see:
```json
{"status":"ok"}
```

## Step 7: Start the Frontend (New Terminal Window)

**Don't close the backend terminal.** Open a new one.

```bash
npm run web -w apps/client
```

This starts the frontend development server.

Expo automatically opens your browser to `http://localhost:8081`

You should see the React Native app.

## What You Now Have Running

| Service | URL | What It Does |
|---------|-----|-------------|
| **Backend API** | http://localhost:3000 | Handles requests, talks to database |
| **Frontend Web** | http://localhost:8081 | Shows the app in your browser |

Both are running on your computer!

## Troubleshooting

### "Port 3000 already in use"

Another app is using port 3000.

```bash
# Find what's using it
lsof -i :3000

# Kill it (be careful!)
kill -9 [PID]
```

### "npm command not found"

Node.js didn't install correctly.

Restart your terminal. Restart your computer if needed.

### TypeScript errors after install

Try clearing the cache:

```bash
npm run clean
npm install
npm run typecheck
```

### "Module not found" error

Make sure you ran:
```bash
npm install
```

in the root pathster directory.

## Common Commands

From the root `pathster` directory:

### Check Everything Compiles
```bash
npm run typecheck
```

### Run All Tests
```bash
npm run test
```

### Format Code
```bash
npm run format
```

### Run Backend Only
```bash
npm run dev -w apps/server
```

### Run Frontend Only
```bash
npm run web -w apps/client
```

## What Each Part Does

### `package.json`
List of dependencies and commands.

### `apps/client/`
The frontend (React Native).

### `apps/server/`
The backend (Express API).

### `libs/api-types/`
Shared TypeScript types.

### `docs/`
This documentation.

## Quick Test

Try this mini test:

1. **Backend is running**: Visit http://localhost:3000/health
2. **Frontend is running**: Visit http://localhost:8081
3. **No errors**: Run `npm run typecheck`

All three work? You're ready to code!

## Next Steps

Learn how to make code changes professionally:

- **[06-YOUR-FIRST-TASK.md](06-YOUR-FIRST-TASK.md)** — Make your first change to the code
