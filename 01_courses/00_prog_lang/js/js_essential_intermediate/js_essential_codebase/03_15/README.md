# 03_15

**Chapter 3 - Movie 15**

이 폴더는 JavaScript Essential Training 강의의 연습 파일을 포함합니다.

---

## 파일 구조

```
Backpack.js
Book.js
index.html
script.js
```

---

## 파일 내용

### Backpack.js

```javascript
class Backpack {
  constructor(
    name,
    volume,
    color,
    pocketNum,
    strapLengthL,
    strapLengthR,
    lidOpen,
    dateAcquired
  ) {
    this.name = name;
    this.volume = volume;
    this.color = color;
    this.pocketNum = pocketNum;
    this.strapLength = {
      left: strapLengthL,
      right: strapLengthR,
    };
    this.lidOpen = lidOpen;
    this.dateAcquired = dateAcquired;
  }
  toggleLid(lidStatus) {
    this.lidOpen = lidStatus;
  }
  newStrapLength(lengthLeft, lengthRight) {
    this.strapLength.left = lengthLeft;
    this.strapLength.right = lengthRight;
  }
  backpackAge() {
    let now = new Date();
    let acquired = new Date(this.dateAcquired);
    let elapsed = now - acquired; // elapsed time in milliseconds
    let daysSinceAcquired = Math.floor(elapsed / (1000 * 3600 * 24));
    return daysSinceAcquired;
  }
}

export default Backpack;

```

---

### Book.js

```javascript
class Book {
  constructor(
    title,
    author,
    ISBN,
    pubYear,
    pageNumber,
    currentPage,
    readStatus
  ) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.pubYear = pubYear;
    this.pageNumber = pageNumber;
    this.currentPage = currentPage;
    this.readStatus = readStatus;
  }
  updateCurrentPage(newCurrentPage) {
    this.currentPage = newCurrentPage;
  }
  updateReadStatus(newReadStatus) {
    this.readStatus = newReadStatus;
  }
}

export default Book;

```

---

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Challenge: Create a new object type</title>
    <script type="module" src="Backpack.js"></script>
    <script type="module" src="Book.js"></script>
    <script type="module" src="script.js"></script>
  </head>
  <body></body>
</html>

```

---

### script.js

```javascript
/**
 * Solution: Create a new object type
 * 
 * - Create a new object type "Book" using a class or an object constructor function.
 * - Add at least 5 book objects.
 */

import Backpack from "./Backpack.js";
import Book from "./Book.js";

const everydayPack = new Backpack(
  "Everyday Backpack",
  30,
  "grey",
  15,
  26,
  26,
  false,
  "December 5, 2018 15:00:00 PST"
);

console.log("The everydayPack object:", everydayPack);
console.log("The pocketNum value:", everydayPack.pocketNum);
console.log("Days since aquired:", everydayPack.backpackAge());

// Book param order: title, author, ISBN, pubYear, pageNumber, currentPage, readStatus
const surveillanceCapitalism = new Book(
  "The Age of Surveillance Capitalism",
  "Shoshana Zuboff",
  9781610395694,
  "2019",
  691,
  691,
  "Finished"
);
console.log(surveillanceCapitalism);

const consciousCreative = new Book(
  "The Conscious Creative",
  "Kelly Small",
  9781487008024,
  "2020",
  216,
  216,
  "Finished"
);
console.log(consciousCreative);

const techVirtues = new Book(
  "Technology and the Virtues",
  "Shannon Vallor",
  9780190905286,
  "2016",
  309,
  138,
  "Reading"
)
console.log(techVirtues);

const poohPhil = new Book(
  "Pooh and the Philosophers",
  "John Tyerman Williams",
  9780749320706,
  "1995",
  192,
  108,
  "Reading"
)
console.log(poohPhil);

const zen = new Book(
  "Zen and the Art of Motorcycle Maintenance",
  "Robert M. Pirsig",
  9780060958329,
  "1974",
  449,
  449,
  "Finished"
)
console.log(zen);
```

