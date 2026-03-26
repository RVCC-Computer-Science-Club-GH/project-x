# project-x monorepo

TypeScript monorepo root scaffold.

## Runtime baseline

- Node.js LTS is required (`^22` or `^24`).
- If you use `nvm`, run `nvm use` at the repo root (uses `.nvmrc` with `lts/*`).
- npm enforces engines via `.npmrc` (`engine-strict=true`).

## Workspace structure

- `apps/` → deployable services (microservices)
- `libs/` → shared internal libraries

Current apps:

- `apps/server` → Express backend service (TypeScript)
- `apps/client` → React Native client (Android, iOS, web)

Each app or lib should be created as its own workspace package and include a local `tests/` directory.

## Root scripts

- `npm run dev` → runs `dev` in each workspace package that defines it
- `npm run build` → runs `build` in each workspace package that defines it
- `npm run test` → runs `test` in each workspace package that defines it
- `npm run lint` → runs `lint` in each workspace package that defines it
- `npm run typecheck` → runs `typecheck` in each workspace package that defines it

If no packages exist yet under `apps/*` or `libs/*`, these commands skip gracefully.

## Git hooks

- Husky runs on `pre-commit`.
- Each commit must pass `npm run precommit:verify`.
- `precommit:verify` enforces formatting (`format:check`), linting, and tests.

## Conventions for future packages

Inside each `apps/<service-name>` and `libs/<lib-name>` package:

- `src/` for source files
- `tests/` for package-level tests
- `tsconfig.json` extending the root `tsconfig.base.json`
- package scripts for `build`, `test`, `lint`, and `typecheck`

## Client app quickstart

From repo root:

- `npm run android -w apps/client` → launch Android target
- `npm run ios -w apps/client` → launch iOS target
- `npm run web -w apps/client` → run web target locally
- `npm run export:web -w apps/client` → static SPA export to `apps/client/dist-web`
