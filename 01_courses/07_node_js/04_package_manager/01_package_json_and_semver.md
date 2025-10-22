Here’s your **Obsidian-style** note (English first, Korean summary last), matching your format and grouping.

---

# 📦 Group 5 — Package Manifest & Versioning

## 1) What `package.json` is (and why it matters)

- The **manifest** for a Node project: name, version, entry points, scripts, dependencies, metadata.
    
- Enables **repeatable installs**, CI, and tooling to understand how to run/build/test your app.
    
- Create it with `npm init -y` (defaults) or `npm init` (interactive).
    

### Minimal example

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "node test.js"
  },
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {}
}
```

### Common fields (quick reference)

- **name**: package id (lowercase, no spaces).
    
- **version**: SemVer (`MAJOR.MINOR.PATCH`).
    
- **type**: `commonjs` (default) or `module` (ESM). Impacts `require`/`import`.
    
- **main**: CJS entry (`require()` resolution).
    
- **exports**: modern entry map (subpath exports, ESM/CJS conditions).
    
- **bin**: CLI command shim(s).
    
- **scripts**: task aliases (run via `npm run <script>`; `npm start/test` can omit `run`).
    
- **dependencies**: runtime deps shipped to prod.
    
- **devDependencies**: build/test/local-only deps (linters, nodemon, ts, etc.).
    
- **engines**: supported Node/npm versions.
    
- **peerDependencies**: “host app must provide this dep” (plugins).
    
- **files** / **.npmignore**: publish whitelist/blacklist.
    
- **private**: `true` to prevent accidental publish.
    

---

## 2) Scripts: make terminal commands memorable

- `npm run <name>` executes `scripts.<name>`.
    
- Special scripts: `npm start`, `npm test`, `npm run build`, `npm run dev`.
    
- Examples:
    

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "lint": "eslint .",
  "clean": "rimraf dist",
  "build": "tsc -p tsconfig.json"
}
```

---

## 3) Installing dependencies (the right buckets)

- **Runtime deps**: `npm i express cors`
    
- **Dev-only deps**: `npm i -D typescript @types/node nodemon eslint`
    
- **Exact version**: `npm i express@4.18.2`
    
- **Latest**: `npm i express@latest`
    
- **Remove**: `npm uninstall express`
    

> Prod servers typically run `npm ci` for **clean, lockfile-pinned** installs (faster, reproducible).

---

## 4) `node_modules` & `package-lock.json`

- `node_modules/`: resolved tree incl. **transitive deps**.
    
- **Do not** hand-edit it. It’s heavy; you usually **don’t commit** it (unless air-gapped deploy).
    
- `package-lock.json`: exact versions + integrity hashes for **reproducible** installs.
    
    - Commit the lockfile.
        
    - CI: prefer `npm ci` (uses lockfile, fails if drift).
        

---

## 5) npx vs global installs

- Old way: `npm i -g <cli>` → hard to track + version drift.
    
- Better:
    
    - Add to project devDeps and run with **`npx <cli>`** (or `npm exec <cli>`).
        
    - Example: `npm i -D rimraf` → `npx rimraf dist`.
        
- Keeps CLI **versioned per project** and visible in `package.json`.
    

---

## 6) Semantic Versioning (SemVer) you’ll actually use

- Format: **MAJOR.MINOR.PATCH**
    
    - **MAJOR**: breaking changes
        
    - **MINOR**: new features, backward-compatible
        
    - **PATCH**: bug fixes
        
- Range operators in `package.json`:
    
    - **Caret `^1.2.3`** → `>=1.2.3 <2.0.0` (default & most common).
        
    - **Tilde `~1.2.3`** → `>=1.2.3 <1.3.0` (locks minor, floats patch).
        
    - **Exact `1.2.3`** → no floating; fully pinned.
        
    - Also: `>=`, `<=`, `>`, `<`, `-` ranges; rarely needed for app manifests.
        
- **Pre-releases**: `1.3.0-alpha.1`, `-beta`, `-rc`. Install explicitly:  
    `npm i mypkg@next` (only if the package publishes a “next” tag).
    
- **Reality check**: not all packages respect SemVer perfectly—test upgrades.
    

### Sensible policy

- Apps: use **`^`** (default) + lockfile → reproducible via `npm ci`.
    
- Libraries: pin internal tooling with `~` or exact; keep peer ranges tolerant.
    

---

## 7) Peer deps & engines (gotchas)

- **peerDependencies**: for plugins (e.g., React libs). Your app must install the peer.  
    If versions conflict, you’ll see warnings/errors on install.
    
- **engines**:
    

```json
"engines": { "node": ">=18.17" },
"engineStrict": true
```

Enforce Node version in CI; prevents subtle runtime breaks.

---

## 8) ESM vs CJS heads-up

- `"type": "module"` → `.js` treated as ESM; use `import`/`export`.
    
- CJS interop differs: `import pkg from 'cjs'` vs `const x = require()`.
    
- Prefer one module system per project; mixing adds friction.
    

---

## 9) Useful `.npmrc` flags (project root)

```
save-exact=true         # pin exact versions on install
audit=true              # enable vulnerability audits
fund=false              # silence funding prompts (optional)
```

---

## 10) Command cheat sheet

```bash
npm init -y                 # create package.json
npm i <pkg>                 # add runtime dep (^version)
npm i -D <pkg>              # add dev dep
npm uninstall <pkg>         # remove
npm outdated                # list upgradable deps
npm update                  # upgrade (respecting ranges)
npm ci                      # clean install from lockfile
npx <cli>                   # run project-local CLI
npm publish                 # publish (if not "private": true)
```

---

## 11) Practical patterns

- Commit: `package.json`, `package-lock.json`, source; ignore `node_modules/`.
    
- CI: `npm ci && npm run build && npm test`.
    
- Prod: use envs (`NODE_ENV=production`), and `npm ci --omit=dev` when building outside container.
    
- When upgrading big stacks (e.g., Express major bump): create a branch, upgrade **one major at a time**, run tests, fix breakages, then merge.
    

---

## 🇰🇷 한국어 요약

**`package.json`**은 프로젝트의 매니페스트로, 앱의 이름/버전/실행 스크립트/의존성을 정의합니다. `npm init`으로 만들고, 런타임 의존성은 `dependencies`, 개발용은 `devDependencies`에 넣으세요. 설치는 `npm i`, 제거는 `npm uninstall`, CI/배포에서는 **`npm ci`**로 고정된 락파일(`package-lock.json`) 기반의 재현 가능한 설치를 사용합니다. CLI는 글로벌 설치 대신 프로젝트에 설치 후 **`npx`**로 실행하면 버전 추적이 쉬워집니다.

**SemVer**는 `MAJOR.MINOR.PATCH` 형식입니다.  
일반 앱은 기본적으로 **`^` 범위**를 쓰고, 락파일을 커밋하여 실제 설치 버전은 고정합니다. 큰 업그레이드는 브랜치에서 단계적으로 진행하고 테스트로 검증하세요. 플러그인 성격 패키지는 **peerDependencies**를 통해 호스트 버전을 요구하며, Node 버전 제약은 **`engines`**로 선언하면 CI 단계에서 일찍 오류를 잡을 수 있습니다.

`node_modules`는 트랜지티브 의존성까지 모두 내려받는 폴더로 보통 커밋하지 않습니다. 배포·컨테이너 빌드에서는 `npm ci`와 `--omit=dev`(또는 빌드 단계만 devDeps 포함)를 활용해 가볍고 재현 가능한 빌드를 구성하세요. ESM/CJS는 `"type": "module"` 여부에 따라 달라지므로 한 가지 모듈 시스템으로 통일하는 것이 유지보수에 유리합니다.