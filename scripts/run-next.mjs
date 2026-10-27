import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const command = process.argv[2] ?? 'dev';
const extraArgs = process.argv.slice(3);
const mockResponses = path.resolve(process.cwd(), 'next-font-mock.cjs');
const env = {
  ...process.env,
  NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockResponses,
  NEXT_TELEMETRY_DISABLED: '1',
};

if (command === 'build') {
  const result = spawnSync(process.execPath, [nextBin, command, ...extraArgs], {
    stdio: 'inherit',
    env,
  });
  process.exit(result.status ?? 1);
}

const child = spawn(process.execPath, [nextBin, command, ...extraArgs], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
