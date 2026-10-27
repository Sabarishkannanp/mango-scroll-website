# Primo Strawberry — Cinematic Scrollytelling Store

A production-ready static-export Next.js App Router website using TypeScript, Tailwind CSS, Framer Motion, and a 120-frame HTML5 Canvas image sequence.

## Recommended environment

- Node.js 20 LTS or newer
- npm 10 or newer

## Install and run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static website is written to `out/`.

## Windows npm recovery

If npm reports `Exit handler never called!`, close VS Code terminals and run this in PowerShell from the project folder:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm config set registry https://registry.npmjs.org/
npm cache verify
npm install
```

If the same npm-internal error remains, update npm and retry:

```powershell
npm install -g npm@latest
npm cache clean --force
npm install
```

## Frame assets

The scroll sequence is included in:

`public/images/prime/1.webp` through `public/images/prime/120.webp`
