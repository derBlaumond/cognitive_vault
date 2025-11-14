- In JavaScript, the common naming convention is CamelCase, where the first letter is lowercase and additional words are capitalized (e.g., packageDimensions).

## Primitive Type
- JavaScript's basic data types include strings, numbers, booleans, etc.

### String Properties and Methods
Strings have a toolbox of **properties** and **methods** (also called functions) in addition to the data they contain. A property is a single piece of data, such as the length of a string, while a method is code that performs more complex operations, such as converting a string to uppercase.

Code example:
```js
var myString = "This is my string, leave it alone.";

// Using properties (length)
myString.length // Returns the number of characters in the string

// Using methods (convert to uppercase)
myString.toUpperCase() // Parentheses must be added
```

### Numbers
- All numbers in JavaScript are of the `number` type, regardless of whether they are integers or floats. They can represent `Infinity`, and **NaN (Not a Number)** is used when a mathematical error or other reason results in a non-numeric value.
- Math object: A built-in object that provides useful functions (methods) for working with numbers (e.g., rounding with Math.round(), square roots, random number generation with Math.random())

### Booleans
Booleans are a data type that can have one of two values: true or false. These values must be spelled exactly in lowercase.

## Objects, Arrays
### Object
- Objects are the primary way to "encapsulate" complex concepts. You can think of an object as similar to a filing system consisting of pairs of **keys** and **values**.
```js
var notEmptyObject = {
    label: "value",
    "second one": "value two" // Quotes required if key has spaces
};
```
- Manipulating objects
1. Accessing properties
```js
notEmptyObject.label
notEmptyObject["label"] // Bracket notation must be used when keys contain special characters like spaces
```
2. Adding properties
```js
notEmptyObject.comment = "this is comment"
notEmptyObject["comment"] = "this is comment"
```
3. Removing properties
```js
delete notEmptyObject.comment;
```
4. Object References
- Objects are references to specific locations in computer memory. When you **assign an existing object to a new variable** (e.g., animal2 = animal), you are not actually creating a copy of the object, but rather **making both variables reference the same memory location**.
- Creating a copy: `JSON.parse(JSON.stringify(original))`

### Arrays
- Arrays are a way to store lists of data while preserving order (order matters). Like objects, arrays can contain any type of data (numbers, strings, booleans, objects, other arrays).
```js
var counties = ["Belknap", "Strafford", "Carroll", "Rockingham"];
counties.length // 4
counties[4] = "berlin" // counties.length ... 5
```
- Manipulating arrays
1. Adding to the end: `array.push(element)` method or `array[array.length]` assignment
2. Removing from the end: Use the `pop()` method, which returns the removed last value
3. Adding to the front: Use `array.unshift(element)` to add to the beginning
4. Removing from the front: `array.shift()`
5. Removing from the middle: `splice()` takes a starting index and the number of items to remove as parameters.
```js
// Remove 1 item starting at index 2
counties.splice(2, 1);
```

## Operators and Control Structures
### Operators
- Operators in JS: `===, !==, ==, !=, <, >, <= , >=, +, -, *, /, %`
    - `===` value and type match // `==` value match
    - `20 % 2 === 0 //true`
- String Concatenation: `"cat" + "dog" // "catdog"`
- Logical Operators: AND(`&&`), OR(`||`), NOT(`!`)

### Conditionals
1. `if`/`else`
```js
if (answer === true) { // condition
    console.log("You said true!"); // executes when condition is true
} else {
    console.log("You said something else."); // executes when condition is false
}
```
- Terse Ifs, Ternary Operator: condition `?` action if true `:` action if false

2. `switch`
```js
switch (answer) {
    case "YES":
        console.log("You said YES!");
        break; // Without break, the next case will execute ("cascading, sequential execution" prevention)
    case "MAYBE":
        console.log("You said maybe. I don't know what to make of that.");
        break;
    case "NO":
        console.log("You said NO.");
        break;
    default: // acts like else - executes when no case matches
        console.log("You rebel, you!");
}
```
### `typeof`
- Since JS is a **loosely typed** language, there are times when you need to check what data type a variable contains.
```js
var thing = 12;
typeof thing; // "number"

thing = "twelve";
typeof thing; // "string"

thing = false;
typeof thing; // "boolean"

thing = {};
typeof thing; // "object"

thing = []; // array
typeof thing; // still returns "object"
```
- Arrays ([]) return "object" when using typeof. To check if something is an array, verify that typeof is "object" and additionally check if it has a length property (e.g., `hasOwnProperty('length')`).

## Iterating with Loops

### `for`
```js
for (var i = 0; i < 10; i += 1) { // initialize i to 0, increment by 1 until i is less than 10
    console.log(i); // outputs 0, 1, 2, ..., 9
}
```
- Real-world example (array iteration): for loops are very useful for iterating over all items in an array.
```js
var pageNames = ["Home", "About Us", "Contact Us"];
for (var i = 0; i < pageNames.length; i += 1) { // i starts at 0 and iterates until less than array length (3)
    var currentPageTitle = pageNames[i]; // access array item
    // ... perform specific operations here ...
}
// Loop interruption: You can use the break keyword with an if statement to stop the loop early
```
- Ternary operator example
```js
var animal = "cat";

animal === "cat"
  ? console.log("You will be a cat herder.")
  : console.log("You will be a dog catcher.");

var job = animal === "cat" ? "cat herder" : "dog catcher";
```

### Enumerative `for` Loops
- Enumerative loops are used to iterate over items in **arrays** or **objects**.
1. `for...in`: Iterates over the **keys** of an array or object
- Key order is not guaranteed. In this case, *Sequential for loop* is more reliable.
```js
// Object enumeration
var pages = { first: "Home", second: "About Us" };

for (var p in pages) { // p is the key name ("first", "second"...)
    // It's important to use hasOwnProperty to prevent enumerating inherited properties from the object
    if (pages.hasOwnProperty(p)) {
        console.log(p + " is " + pages[p]); // outputs "first is Home", "second is About Us"
    }
}
```

2. `for...of`: Iterates over the **values** of an array or object
- Directly accesses values of iterable data types like arrays, Set, and Map. When used with arrays, it gives you values in order, not keys.
```js
// Array value enumeration
var pageNames = ["Home", "About Us", "Contact Us"];
for (var v of pageNames) { // v is the value ("Home", "About Us"...)
    console.log(v);
}
```

### `while`
- Unlike `for` loops, counter initialization is done outside the loop, and counter incrementation is handled inside the loop body. Useful when the amount of data is not known in advance or when a clear stopping condition is needed.
- `do while`: This loop guarantees that the code block executes at least once before checking the condition.
```js
var counter = 0; // initialization (outside loop)
while (counter < 10) { // condition
    console.log(counter);
    counter += 1; // increment (inside loop)
}

// do while
do {
    // This code is guaranteed to execute at least once regardless of condition
} while (condition);
```

### `set`, `map`
- Set and Map store data similarly to arrays and objects, but have specific behaviors that affect how loops work with them.
1. Set
- Stores a list of values, storing each value exactly once (does not allow duplicates)
- Created using the `new Set()` constructor function.
- Cannot access items by index like arrays. Use the `.add()` method to add items and the `.has()` method to check if an item exists.
- Removing duplicates: You can easily remove duplicates by passing an array to the Set constructor.
```js
var myList = [1, 1, 2, 3, 5, 8, 13, "fibonacci"];

var mySet = new Set();
mySet.add(1);
mySet.add(1); // this won't change mySet, since 1 is already in there
mySet.add(2);
mySet.add(3);

// An array can be turned into a set
// If you want to quickly remove all duplicates from an array, this is a good tool!
var mySet2 = new Set(myList);

mySet2.has(3); // true
mySet2.has(12); // false

// For...of loop iteration works
for (item of mySet2) {
  console.log('mySet contains', item);
}
```

2. Map
- Similar to Object, but stores key-value pairs and remembers the order in which items were inserted.
- Created using the `new Map()` constructor function.
- Use `.set()` and `.get()` methods to set/get items.
- When using for...of loops, unlike Set, it returns an array of arrays (entry list) containing keys and values.
```js
birdMap.set("genus", "corvus");
birdMap.set("species", "corvax");
birdMap.set("commonName", "raven");

birdMap.get("genus"); // 'corvus'

birdMap.has("genus"); // true
birdMap.has("corvus"); // false (keys only)

// for...of loops work on Maps, with key and value returned
for (let value of birdMap) {
  console.log(value);
}
```

## Function
1. Using a function is called invoking or **executing** the function.
```js
function speak() { // function declaration
    console.log("arf");
    console.log("woof");
}

const speakSomething = function() { // anonymous function assigned to variable
    console.log("Hello!");
}; // This can also be called with speakSomething().
```
2. parameter (or argument): Data designed to make a function work, defined inside the function's parentheses. Parameters can be used like variables inside the function body.
- Default values: Starting from ES2015, you can set default values for parameters using `=`.
```js
function speakSomething(what = "Default speech", howMany = 10) {
  for (var i = 0; i < howMany; i += 1) {
    console.log(what + " (" + i + ")");
  }
}

speakSomething("Good morning", 5);
speakSomething("Good morning"); 
speakSomething();
```

3. `arguments`: A built-in object that stores all arguments passed when a function is called as an array-like object.
- This object is available inside functions and is useful for iterating over and processing function arguments. For example, if a function needs to add multiple numbers, you can use the arguments object to add all numbers together. This object is a built-in object that stores all arguments passed when a function is called as an array-like object.
```js
function addingMachine() {
  var total = 0;

  for (var i = 0; i < arguments.length; i += 1) {
    // grab the next number
    var number = arguments[i];

    // check if the argument is a number.
    // if so, add it to the running total
    if (typeof number === "number") {
      total += number;
    }
  }

  // done - return the total
  return total;
}

addingMachine(1, 2, 3); // return is 6
addingMachine(1, 2, 3, 4, 5, 6, 7, 8, 9, 1204910249014); // return is 1204910249027
```

4. `rest parameter`: A parameter that collects remaining arguments into an array using `...` (three dots) in function declarations.
```js
function bake(temp = 350, time = 35, ...flavors) {
  
  console.log(`Let's bake this cake at ${temp} degrees,`);
  console.log(`for ${time} minutes\n`);
  
  if (flavors.length > 0) {
    console.log("And let's not forget these flavors", flavors);
  }
  
  console.log("Arguments contains everything", arguments);
}

bake(425, 30, 'chocolate', 'lemon', 'black forest'); // flavors array becomes ['chocolate', 'lemon', 'black forest']
bake(300, 30, 'vanilla'); // flavors array becomes ['vanilla']
bake(); // When bake() is called, flavors array becomes []
```

### Block-level scope
- `let` and `const`: Starting from ES2015, the let and const keywords create **block scope**, limiting variable scope not only to functions but also to small code blocks enclosed in {} braces (e.g., inside if statements).
- How it works: Variables declared with let or const inside a block are only valid within that block and its nested blocks.
```js
let snack = 'chocolate pie'; // global document

function introduce() {
    let snack = 'shrimp chips'; // local document in Meeting Room A (safe)
    if (true) {
        let snack = 'potato chips'; // 💡Advantage: completely independent document in new partition
        console.log(snack); // outputs: 'potato chips' (only within this partition)
    }
    console.log(snack); // outputs: 'shrimp chips' (Meeting Room A document remains unchanged)
}

introduce();
console.log(snack); // outputs: 'chocolate pie' (global document is safe)

```
> [!WARNING] Note
> When writing code using modern JavaScript (ES6+), you should use **let and const**. var is no longer recommended.
- Reason: The `var` keyword follows **function-level scope**.
- Difference between var and let
```js
var snack = 'chocolate pie'; // global document (accessible to all)

function introduce() {
    var snack = 'shrimp chips'; // local document in Meeting Room A
    if (true) {
        var snack = 'potato chips'; // 💡Problem: partition is ignored and Meeting Room A document changes to 'potato chips'
    }
    console.log(snack); // outputs: 'potato chips' (already changed)
}

introduce();
console.log(snack); // outputs: 'chocolate pie' (global document is safe)
```

### Callback Functions
- A callback function is a function that is passed as an argument to another function and executed within that function.
- Example: The `setTimeout` function takes a function as its first argument and milliseconds as its second argument, executing the function after the timer expires.
```js
setTimeout(function() { 
    console.log("Executed after 5 seconds"); 
}, 5000);
```

### Arrow Functions

- Syntax and Features: Arrow functions replace regular function expressions and reduce code in three main ways.
1. Basic syntax (removing `function` keyword): Arrow functions omit the `function` keyword and use the **arrow-shaped `=>`** syntax (equal sign followed by a greater than sign) between parentheses and the function body.

```js
// Before:
function isEven(num) {
  return num % 2 === 0;
}

// After:
let isEven = (num) => {
  return num % 2 === 0;
};
```

2. Terse Return Syntax: One of the biggest advantages of arrow functions is the ability to **omit the explicit `return` keyword and curly braces (`{}`)**.

When a function simply **returns a result without requiring other operations**, you can omit both the curly braces and `return` keyword, leaving only the expression that returns the result, creating a **one-liner function**.

```javascript
// Regular function (only returns result)
const isEven = function(number) {
    return number % 2 === 0;
};

// Arrow function (terse return, return and {} omitted)
const isEvenArrow = (number) => number % 2 === 0; // The result of this expression is automatically returned
```

