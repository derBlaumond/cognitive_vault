# 08_15e

**Chapter 8 - Movie 15** *(End State)*

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
 * The map() array method.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

const stuff = ["piggy", "headlamp", "pen", "pencil", "eraser", "water bottle"];

const article = document.querySelector("article");
let stuffList = document.createElement("ul");

// map() through the stuff array to make a new stuffItems array.
const stuffItems = stuff.map((item) => {
  let listItem = document.createElement("li");
  listItem.innerHTML = item;
  return listItem;
});

// Append each element from the stuffItems array to the stuffList <ul>
stuffItems.forEach((item) => {
  stuffList.append(item);
});

// Append stuffList to the <article>
article.append(stuffList);

```

