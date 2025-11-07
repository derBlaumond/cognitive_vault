# 06_04

**Chapter 6 - Movie 4**

이 폴더는 JavaScript Essential Training 강의의 연습 파일을 포함합니다.

---

## 파일 구조

```
index.html
script.js
```

---

## 파일 내용

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Console demo</title>
    <style>
      body {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
      }

      h1 {
        font-size: 4.6rem;
      }

      code {
        font-size: 120%;
      }

      .boxes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        max-width: 60rem;
      }

      .title {
        grid-column: span 2;
        text-align: center;
      }
      .boxes div {
        box-sizing: border-box;
        width: 100%;
        padding: 4rem;
        font-size: 3rem;
        color: white;
        background-color: green;
      }
    </style>
    <script src="script.js" defer></script>
  </head>
  <body>
    <main class="boxes">
      <h1 class="title">When <code>var</code> and scope collide!</h1>
      <div class="left">color: <code class="color-value">green</code></div>
      <div class="right">color: <code class="color-value">green</code></div>
    </main>
  </body>
</html>

```

---

### script.js

```javascript
/**
 * The let statement
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */

var color = "purple";

document.querySelector(".left").style.backgroundColor = color;
document.querySelector(".left .color-value").innerHTML = color;

color = "skyblue";

function headingColor() {
  color = "blue";
  document.querySelector(".title").style.color = color;
}

headingColor();

document.querySelector(".right").style.backgroundColor = color;
document.querySelector(".right .color-value").innerHTML = color;

```

