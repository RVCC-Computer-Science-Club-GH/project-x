import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const scriptName = process.argv[2];

if (!scriptName) {
  console.error('Missing script name. Usage: node ./tools/run-workspaces.mjs <script>');
  process.exit(1);
}

const rootDir = process.cwd();
const packageRoots = ['apps', 'libs'];

const workspacePackageDirs = packageRoots.flatMap((root) => {
  const rootPath = join(rootDir, root);

  if (!existsSync(rootPath)) {
    return [];
  }

  return readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(rootPath, entry.name))
    .filter((dirPath) => existsSync(join(dirPath, 'package.json')));
});

if (workspacePackageDirs.length === 0) {
  console.log(`No workspace packages found under apps/* or libs/*; skipping ${scriptName}.`);
  process.exit(0);
}

for (const packageDir of workspacePackageDirs) {
  console.log(`→ ${packageDir}`);

  const npmExecPath = process.env.npm_execpath;
  const command = npmExecPath ? process.execPath : 'npm';
  const args = npmExecPath
    ? [npmExecPath, 'run', '--if-present', scriptName]
    : ['run', '--if-present', scriptName];

  const result = spawnSync(command, args, {
    cwd: packageDir,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
