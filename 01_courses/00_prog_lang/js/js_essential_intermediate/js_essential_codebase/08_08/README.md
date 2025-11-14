# 08_08

**Chapter 8 - Movie 8**

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
    <script src="script.js" defer></script>
  </head>
  <body>
    <main>
      <article></article>
    </main>
  </body>
</html>

```

---

### script.js

```javascript
/**
 * Passing data to functions through parameters.
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Function
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 *
 *
 * List of ISO language codes:
 * @link http://www.lingoes.net/en/translator/langcode.htm
 */

const tipCalculator = (sum, percentage) => {
  let tip = sum * (percentage / 100);
  let total = sum + tip;
  console.log(`
      Sum before tip: ${sum}
      Tip percentage: ${percentage}%
      Tip:            ${tip.toFixed(2)}
      Total:          ${total.toFixed(2)}
    `);
};

tipCalculator(29.95, 18);

```

