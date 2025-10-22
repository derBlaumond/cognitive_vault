Here’s your **Obsidian-style** note for **Group 6 — NPM Usage & Deployment** (English first, Korean wrap-up at the end).

---

# 🚀 Group 6 — NPM Usage & Deployment

## 1) Everyday npm CLI you’ll actually use

### Inspect & maintain

- **List what can be upgraded**
    
    - `npm outdated` — shows current/wanted/latest & type (dep/dev/peer).
        
- **Show package metadata**
    
    - `npm info <pkg>` or `npm view <pkg> [field]` (e.g., `npm view express versions --json`).
        
- **Search**
    
    - `npm search <term>` (OK), but browsing on npmjs.com is usually faster.
        

### Install / remove

- **Runtime deps:** `npm i <pkg>`, exact: `npm i <pkg>@1.2.3`
    
- **Dev deps:** `npm i -D <pkg>`
    
- **Remove:** `npm uninstall <pkg>` (updates `package.json`)
    

### Run scripts

- `npm run <script>` (special: `npm start`, `npm test` can omit `run`)
    
- `npm exec <cli>` / `npx <cli>` to run project-local CLIs (prefer this over global installs)
    

### Versioning helpers

- **Bump SemVer and auto git tag:**
    
    - `npm version patch|minor|major`
        
    - `npm version 1.4.2` (explicit)
        
    - Creates a commit + tag; you can `git push --follow-tags`
        

### Auth & account

- `npm adduser` / `npm login` — log in to npm registry
    
- `npm whoami` — verify current user
    
- `npm logout` — sign out
    

### Publish lifecycle

- **Publish:** `npm publish`
    
    - Scoped package public: `npm publish --access public` (for `@scope/pkg`)
        
- **Unpublish:** `npm unpublish <name>@<version>`
    
    - Hard limits (time windows); prefer **deprecate** instead.
        
- **Deprecate:** `npm deprecate <name>@<range> "<message>"`
    
    - Gracefully warn users rather than yanking a version.
        

### Dist-tags (channeling releases)

- Tag a version: `npm dist-tag add <name>@<version> <tag>`
    
    - e.g., `latest` (default), `next`, `beta`, `rc`
        
- Install a tag: `npm i <name>@next`
    

### Security & cleanup

- **Audit:** `npm audit` / `npm audit fix` (review changes!)
    
- **Cache:** `npm cache verify` / `npm cache clean --force` (rarely needed)
    

---

## 2) Sensible upgrade workflow (apps)

1. `git switch -c chore/dep-refresh`
    
2. `npm outdated` → decide scope.
    
3. Incrementally: `npm i <pkg>@latest` (or specific majors one by one).
    
4. Run tests, app smoke test, build.
    
5. Commit; optionally `npm version minor` for your app.
    
6. Merge; CI uses **`npm ci`** for reproducible installs.
    

> Libraries: be stricter—consider `~` or pinned versions for build tools, keep **peerDependencies** wide and well-documented.

---

## 3) Publishing a package (quick recipe)

### Prepare

- `package.json`
    
    - `"name": "your-name-or-@scope/pkg"`, `"version": "0.1.0"`, `"main"`/`"exports"`, `"license"`, `"files"` (whitelist), `"types"` (if TS).
        
    - Consider `"private": true` for apps (prevents accidental publish).
        
- Add a minimal README and LICENSE.
    
- Optional: enable 2FA on npm (recommended).
    

### Dry run locally

- `npm pack` — creates a tarball as npm would publish; inspect contents.
    

### Publish

```bash
npm login
npm publish                    # unscoped
npm publish --access public    # for @scope packages
```

### After release

- Add an issue template for bugs.
    
- Use **dist-tags** for pre-releases:
    
    - `npm publish --tag next`
        
    - Later promote: `npm dist-tag add <pkg>@1.0.0-next.3 latest`
        

### Rollback strategy

- Critical mistake? Prefer:
    
    - `npm deprecate <pkg>@<badVer> "Critical bug: use >=1.0.1"`
        
- `npm unpublish` only within the allowed window and **never** for popular packages.
    

---

## 4) Deployment best practices (apps & servers)

### Deterministic installs

- Commit `package-lock.json`.
    
- CI & prod: `npm ci` (faster, fails on drift).
    
- For lean prod deploys: `npm ci --omit=dev` (Node 16+; previously `--only=production`).
    

### Build & run

- Typical pipeline:
    
    ```bash
    npm ci
    npm run build
    npm test
    npm prune --omit=dev   # if you built elsewhere and only need runtime deps
    ```
    
- Container tip: leverage multi-stage builds and layer caching (copy `package.json`/`package-lock.json` first, run `npm ci`, then copy source).
    

### Config & env

- Don’t commit secrets. Use env vars and `.npmrc` only for benign project defaults.
    
- Consider `.npmrc`:
    
    ```
    save-exact=true       # optional: pin installs
    audit=true
    fund=false
    ```
    

### Provenance & integrity

- Lockfile includes integrity hashes.
    
- For open source, consider provenance (sigstore) if your org requires it.
    

---

## 5) Common pitfalls & fixes

- **Global CLIs drift** → prefer devDep + `npx`.
    
- **ESM/CJS confusion** → set `"type": "module"` or stay CJS; don’t mix casually.
    
- **Accidental publish** → set `"private": true"` for non-libraries.
    
- **Peer dependency warnings** → install the peer in the host app or align versions.
    
- **Breaking majors** → upgrade one major at a time; read changelogs; run tests.
    

---

## 🇰🇷 한국어 요약

이 장의 핵심은 **npm CLI 활용과 배포 흐름**입니다.  
일상적인 관리에는 `npm outdated`(업데이트 확인), `npm info`(메타정보), `npm i/-D`(설치), `npm uninstall`(삭제), `npm run`(스크립트), `npm version`(버전+git태그)을 씁니다. CLI는 글로벌 설치 대신 **프로젝트 devDependencies + `npx`**로 실행하는 것이 버전 추적과 재현성에 유리합니다.

**배포**는 `package.json`(name/version/exports/files/license) 정비 → `npm pack`으로 사전 점검 → `npm publish`(스코프 패키지는 `--access public`) 순서로 진행합니다. 실수 시 **`npm deprecate`**로 경고를 띄우고, 부득이할 때만 제한 시간 내 **`npm unpublish`**를 사용하세요. 프리릴리스/채널 배포는 **dist-tags**(`latest`, `next`, `beta`, `rc`)를 활용합니다.

**배포/운영 베스트프랙티스**는 `package-lock.json` 커밋 + CI/프로덕션에서 **`npm ci`** 사용, 필요 시 `--omit=dev`로 런타임만 설치, 멀티-스테이지 컨테이너 빌드와 캐시 최적화를 적용하는 것입니다. 업그레이드는 브랜치에서 패키지별로 단계적으로 진행하고, 메이저 버전은 **체인지로그 확인 + 테스트**로 안전하게 올리세요.