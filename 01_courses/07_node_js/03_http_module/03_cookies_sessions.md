Here’s your **Obsidian-style** note for **Group 3 — Cookies & Sessions** (English first; Korean wrap-up at the end as a single prose section).

---

# 🍪 Group 3 — Cookies & Sessions

## 1) Why cookies/sessions matter

- HTTP is **stateless**: each request stands alone; the server doesn’t inherently know _who_ sent it.
    
- To implement **login** and per-user behavior, we attach identity across requests:
    
    - **Cookies**: small key–value pairs the browser stores and **sends automatically** with future requests to the same origin.
        
    - **Sessions**: keep **sensitive data on the server**; client only holds an opaque **session id** (via a cookie).
        

---

## 2) HTTP request/response recap

- A request & response both have:
    
    - **Headers** (metadata) and **Body** (payload).
        
- Common login flows:
    
    - `GET /login?name=<encoded>` (querystring on GET) or `POST /login` with body.
        
    - Server responds with **status** (e.g., `200/201/302/404`) and may set cookies via `Set-Cookie`.
        

---

## 3) Cookies: mechanics & usage

- Server sets:  
    `Set-Cookie: myCookie=test`
    
- Browser stores and resends:  
    `Cookie: myCookie=test`
    
- Typical flow:
    
    1. First visit → server sends `Set-Cookie`.
        
    2. Subsequent requests automatically include `Cookie` header → server identifies the user.
        

### Cookie attributes you’ll actually use

- **Expires** / **Max-Age**: lifetime.
    
    - Not set → **session cookie** (deleted when the browser closes).
        
    - `Expires=<GMT date>` or `Max-Age=<seconds>`.
        
- **HttpOnly**: JS cannot read cookie (mitigates XSS stealing). **Use for auth**.
    
- **Secure**: only sent over HTTPS. **Turn on in production**.
    
- **Path**: URL path scope (commonly `/`).
    
- **SameSite**: CSRF mitigation. Use `Lax` (default) or `Strict`; `None` requires `Secure`.
    
- **Domain**: host scope (usually omit; default is current host).
    

### Content encoding gotcha

- Non-ASCII (e.g., Korean names) must be **encoded**: `encodeURIComponent(name)` before putting into URL or cookie value.
    

---

## 4) Doing login _with cookies only_ (and why it’s risky)

- Naïve approach: `Set-Cookie: name=Jo; HttpOnly?` (if not HttpOnly/encoded, easy to tamper/steal).
    
- Problems:
    
    - **Visibility**: Tools show plain values (leaks identity).
        
    - **Integrity**: Client can **edit** cookies → impersonation.
        
- Conclusion: **Don’t put sensitive identity directly** in a cookie unless it’s **signed/encrypted**. Prefer **session id** design.
    

---

## 5) Sessions: the safer pattern

- **Server memory/storage** holds `{ sessionId → { name, expires, … } }`.
    
- Client holds only `sessionId` (opaque, unguessable), delivered via cookie:
    
    - `Set-Cookie: sid=<random>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=300`
        
- Request handling:
    
    1. Read `Cookie: sid=...`.
        
    2. Look up session store; verify **exists** and **not expired**.
        
    3. If valid → personalize response (e.g., “Hello, 조현영”); else → show login.
        
- Generation tips:
    
    - Use **cryptographically strong** randomness for `sid`.
        
    - Always **re-check expiry** server-side (don’t trust the browser alone).
        

---

## 6) Minimal flows (step-by-step)

### A) Cookie-only demo (educational)

1. `GET /login?name=<encoded>`  
    → `Set-Cookie: name=<encoded>; Max-Age=300; HttpOnly; Path=/`  
    → `302 Location: /`
    
2. Future `GET /` → read `Cookie:name` → greet user.
    
3. After 5 minutes (expiry), cookie isn’t sent → show login again.
    

### B) Proper session-backed login

1. `POST /login {name}`
    
2. Server: create `sid = random()`, store `{sid: {name, expires: now+5m}}`.
    
3. Respond: `Set-Cookie: sid=<opaque>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=300` + `302 /`.
    
4. Requests include `sid`; server loads session; if expired/missing → force re-login.
    

---

## 7) Status codes mentioned (know these)

- **200** OK, **201** Created, **302** Found (redirect), **301** Moved Permanently,
    
- **404** Not Found, **403** Forbidden, **401** Unauthorized,
    
- **500/503/504** Server errors/timeouts.  
    Use the **most specific** code to help clients and debuggers.
    

---

## 8) Debugging & DevTools

- Use **Network tab** to inspect:
    
    - Response headers → `Set-Cookie`
        
    - Request headers → `Cookie`
        
- **Application/Storage** pane → Cookies (inspect, edit, delete to simulate logout).
    
- Note: Browsers auto-request `/favicon.ico`—ignore during learning.
    

---

## 9) Security checklist (practical)

-  **HttpOnly** on auth cookies.
    
-  **Secure** + HTTPS in production (protects headers, forms, cookies in transit).
    
-  **SameSite=Lax/Strict** to reduce CSRF; `None` only with `Secure`.
    
-  **Short Max-Age** + server-side expiry check.
    
-  **Opaque, high-entropy** session ids; never predictable timestamps alone.
    
-  **Don’t store PII in cookies**; store it server-side.
    
-  **Regenerate** session id after privilege changes (e.g., after login).
    
-  Handle **logout** by deleting cookie (`Set-Cookie: sid=; Max-Age=0; …`) and clearing server session.
    

---

## 10) Common pitfalls

- Forgetting to **restart** the server after code changes (in raw `http` examples).
    
- Assuming cookies auto-encode strings (they don’t; **encodeURIComponent**).
    
- Relying only on client-side expiry; always **validate expiry** server-side.
    
- Using `sessionId = Date.now()` → **guessable**. Use crypto RNG.
    
- Developing over HTTP with `Secure` flag on → cookie won’t be sent; toggle per env.
    

---

## 11) Quick mental model

- **Cookie = envelope** the browser keeps attaching to mail.
    
- **Session store = filing cabinet** in your office that maps envelope’s random code to a full customer dossier.
    
- **HttpOnly/Secure/SameSite** = tamper-evident seals and courier rules for that envelope.
    

---

## 🇰🇷 한국어 요약 (줄글)

HTTP는 상태가 없기 때문에 로그인 상태를 유지하려면 브라우저가 자동으로 첨부하는 **쿠키**와 서버에 민감 정보를 보관하는 **세션**이 필요합니다. 쿠키는 `Set-Cookie`로 내려주면 이후 요청의 `Cookie` 헤더에 자동 포함되며, `Expires/Max-Age`, `HttpOnly`, `Secure`, `Path`, `SameSite` 등 옵션으로 보안을 강화합니다. 단, 쿠키 값에 사용자 이름 같은 직접 정보를 넣으면 노출·조작 위험이 있으므로, 실제 서비스에서는 **불투명한 세션 id만 쿠키에 저장**하고 사용자 이름 등은 **서버 세션 저장소**에서 조회해야 합니다. 로그인 흐름은 `(1) 로그인 요청 → (2) 서버가 세션을 만들고 sid를 쿠키로 설정(가능하면 302 리다이렉트) → (3) 이후 요청마다 sid로 세션을 검증` 순서이며, 만료시간은 쿠키와 서버 저장소 양쪽에서 확인합니다. 반드시 **HttpOnly**, **HTTPS(+Secure)**, **SameSite(Lax/Strict)**를 적용하고, `encodeURIComponent`로 한글·특수문자를 인코딩하며, 세션 id는 **암호학적 난수**로 생성하세요. 상태코드(200/201/302/404/401/403/500 등)는 상황에 맞게 정확히 사용하고, 개발자도구(Network·Application)에서 `Set-Cookie`/`Cookie`를 확인하며 디버깅하면 됩니다.