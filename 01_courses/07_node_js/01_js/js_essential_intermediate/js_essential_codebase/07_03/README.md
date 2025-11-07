# 07_03

**Chapter 7 - Movie 3**

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
  <body></body>
</html>

```

---

### script.js

```javascript
/**
 * Working with array methods
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Instance_methods
 */

let backpackContents = ["piggy", "headlamp", "pen"];

console.log(backpackContents);

// backpackContents.forEach(function (item) {
//   item = `<li>${item}</li>`;
//   console.log(item);
// });

// let longItems = backpackContents.find(function (item) {
//   if (item.length >= 5) {
//     return item;
//   }
// });
// console.log("longItems:", longItems);

```

