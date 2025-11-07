- JavaScript에서 일반적인 명명 규칙은 첫 글자를 소문자로 시작하고 추가 단어를 대문자로 붙이는 CamelCase 방식입니다 (예: packageDimensions). 

## Primitive Type
- JavaScript의 기본 데이터 타입에는 문자열(Strings), 숫자(Numbers), 불리언(Booleans) 등이 있습니다.

### 문자열 속성 및 메서드 (String properties and methods)
문자열은 데이터 외에도 **속성(properties)**과 **메서드(methods, 함수라고도 함)**라는 도구 상자를 가지고 있습니다. 속성은 문자열의 길이(length)와 같은 단일 데이터 조각이며, 메서드는 문자열을 대문자로 변환하는 등 더 복잡한 작업을 수행하는 코드입니다.

코드 예시:
```js
var myString = "This is my string, leave it alone.";

// 속성 사용 (길이)
myString.length // 문자열의 문자 수를 반환 

// 메서드 사용 (대문자로 변환)
myString.toUpperCase() // 괄호를 추가해야 함
``` 

### 숫자 (Numbers)
- JavaScript의 모든 숫자는 정수, 실수(float) 등에 관계없이 `number` 타입이며, `Infinity`를 나타낼 수 있으며, 수학적 오류 등으로 인해 숫자가 아닌 결과를 얻을 때 **NaN (Not a Number)**을 사용합니다
- Math 객체: 숫자에 관련된 유용한 함수(메서드)를 제공하는 내장 객체입니다 (예: 반올림 Math.round(), 제곱근, 무작위 숫자 생성 Math.random())

### 불리언은 true 또는 false 중 하나의 값을 가질 수 있는 데이터 타입입니다. 이 값들은 정확히 소문자로 철자되어야 합니다

## Objects, Arrays
### Object
- 객체는 복잡한 개념을 "캡슐화"하는 주요 방법입니다. 객체는 **keys**과 **values**의 쌍으로 구성된 파일링 시스템과 유사하게 생각할 수 있습니다.
```js
var notEmptyObject = {
    label: "value",
    "second one": "value two" // 키에 공백이 있다면 따옴표 필수
};
```
- Manipulating objects
1. 속성 접근
```js
notEmptyObject.label
notEmptyObject["label"] // 키에 공백과 같은 특수 문자가 포함된 경우, 대괄호 표기법을 사용해야 합니다
```
2. 속성 추가
```js
notEmptyObject.comment = "this is comment"
notEmptyObject["comment"] = "this is comment"
```
3. 속성 제거
```js
delete notEmptyObject.comment;
```
4. 객체 참조 (References)
- 객체는 컴퓨터 메모리 내 특정 위치에 대한 참조입니다. **기존 객체를 새 변수에 할당**할 때 (예: animal2 = animal), 실제로는 객체의 복사본을 만드는 것이 아니라, **두 변수가 동일한 메모리 위치를 참조하도록** 합니다
- 복사본 생성: `JSON.parse(JSON.stringify(original))`

### Arrays
- 배열은 데이터 목록을 저장하고 순서를 보존하는 방법. (순서가 중요하다). 배열은 객체와 마찬가지로 모든 종류의 데이터(숫자, 문자열, 불리언, 객체, 다른 배열)를 담을 수 있습니다
```js
var counties = ["Belknap", "Strafford", "Carroll", "Rockingham"];
counties.length // 4
counties[4] = "berlin" // counties.length ... 5
```
- Manipulating arrays
1. 끝에 추가: `array.push(element)` 메서드 or `array[array.length]` 할당
2. 끝에서 제거: pop() 메서드를 사용하며, 제거된 마지막 값을 반환
3. 앞에 추가: `array.unshift(element)` 로 맨 앞에 추가
4. 앞에 제거: `array.shift()`
5. 중간 제거: `splice()`는 시작 인덱스와 제거할 항목 수를 매개변수로 받습니다.
```js
// 인덱스 2에서 시작하여 1개의 항목 제거
counties.splice(2, 1);
```

## Operators and Control Structures
### Operators
- Operators in JS: `===, !==, ==, !=, <, >, <= , >=, +, -, *, /, %` 
    - `===` 값, 타입 일치 // `==` 값 일치
    - `20 % 2 === 0 //true`
- String Concatenation: `"cat" + "dog" // "catdog"`
- Logical Operators: AND(`&&`), OR(`||`), NOT(`!`)

### Conditionals
1. `if`/`else`
```js
if (answer === true) { // 조건
    console.log("You said true!"); // 조건이 참일 때 실행
} else {
    console.log("You said something else."); // 조건이 거짓일 때 실행
}
```
- Terse Ifs, 삼항연산자: condition `?` action if true `:` action if false

2. `switch`
```js
switch (answer) {
    case "YES":
        console.log("You said YES!");
        break; // break가 없으면 다음 case가 실행됨 "cascading, 연속실행" 방지
    case "MAYBE":
        console.log("You said maybe. I don't know what to make of that.");
        break;
    case "NO":
        console.log("You said NO.");
        break;
    default: // else의 역할 - 어떤 case 도 일치하지 않을 때
        console.log("You rebel, you!");
}
```
### `typeof`
- JS는 느슨하게 타입이 지정된 (**loosely typed**) 언어이므로, 변수에 어떤 데이터 타입이 들어있는지 확인해야 할 때가 있습니다
```js
var thing = 12;
typeof thing; // "number"

thing = "twelve";
typeof thing; // "string"

thing = false;
typeof thing; // "boolean"

thing = {};
typeof thing; // "object"

thing = []; // 배열
typeof thing; // 여전히 "object"를 반환
```
-  배열 ([])은 typeof를 사용하면 "object"가 반환됩니다. 배열 여부를 확인하려면 typeof가 "object"인지 확인하고, length 속성이 있는지 (예: `hasOwnProperty('length')`) 추가로 확인해야 합니다

## Iterating with Loops

### `for`
```js
for (var i = 0; i < 10; i += 1) { // i를 0으로 초기화하고, i가 10 미만일 때까지 1씩 증가
    console.log(i); // 0, 1, 2, ..., 9가 출력됨
}
```
- 실제 사용 예시 (배열 반복): for 루프는 배열의 모든 항목을 순회하는 데 매우 유용합니다.
```js
var pageNames = ["Home", "About Us", "Contact Us"];
for (var i = 0; i < pageNames.length; i += 1) { // i는 0부터 시작하여 배열 길이(3) 미만일 때까지 반복
    var currentPageTitle = pageNames[i]; // 배열 항목에 접근
    // ... 여기서 특정 작업 수행 ...
}
// 루프 중단: if 문과 함께 break 키워드를 사용하여 루프를 조기에 멈출 수 있습니다
```
- 삼항연산자 for
```js
var animal = "cat";

animal === "cat"
  ? console.log("You will be a cat herder.")
  : console.log("You will be a dog catcher.");

var job = animal === "cat" ? "cat herder" : "dog catcher";
```

### Enumerative `for` Loops
- 열거형 루프는 **배열**이나 **객체** 내의 항목을 순회하는 데 사용됩니다
1. `for...in`: 배열이나 객체의 **key** 를 반복합니다
- 키의 순서는 보장하지 않는다. 이 때, *Sequential for loop*가 더 안정적임
```js
// 객체 열거
var pages = { first: "Home", second: "About Us" };

for (var p in pages) { // p는 키 이름("first", "second"...)
    // 객체에서 상속된 속성을 열거하는 것을 방지하기 위해 hasOwnProperty를 사용하는 것이 중요
    if (pages.hasOwnProperty(p)) {
        console.log(p + " is " + pages[p]); // "first is Home", "second is About Us" 출력
    }
}
```

2. `for...of`: 배열이나 객체의 **value** 를 반복합니다
- 배열, Set, Map과 같은 반복 가능한 (iterable) 데이터 타입의 값에 직접 접근합니다. 배열에 사용 시 키가 아닌 값을 순서대로 얻습니다.
```js
// 배열 값 열거
var pageNames = ["Home", "About Us", "Contact Us"];
for (var v of pageNames) { // v는 값 ("Home", "About Us"...)
    console.log(v);
}
```

### `while`
- `for` 루프와 달리, 카운터 초기화는 루프 외부에서, 카운터 증가는 루프 본문 내에서 처리됩니다. 데이터의 양이 미리 알려지지 않았거나, 명확한 중단 조건이 필요할 때 유용하다.
- `do while`: 루프는 코드 블록을 최소 한 번 실행한 후 조건을 확인합니다.
```js
var counter = 0; // 초기화 (루프 외부)
while (counter < 10) { // 조건
    console.log(counter);
    counter += 1; // 증가 (루프 내부)
}

// do while
do {
    // 이 코드는 조건에 관계없이 최소 한 번 실행이 보장됨
} while (조건);
```

### `set`, `map`
- Set과 Map은 배열 및 객체와 유사하게 데이터를 저장하지만, 루프 방식에 영향을 미치는 특정 동작 방식을 가집니다.
1. Set
- 값의 목록을 저장하며, 각 값을 정확히 한 번만 저장합니다 (중복을 허용하지 않음)
- `new Set()` 생성자 함수를 사용해서 생성한다.
- 배열처럼 인덱스에 접근할 수 있고, `.add()` 메서드로 항목을 추가, `.has()` 메서드로 항목 존재 여부를 확인한다.
- 중복 제거: 배열을 Set 생성자에 전달하여 중복을 쉽게 제거할 수 있습니다
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
- Object와 유사하지만, 키와 값 쌍을 저장하며, 항목이 삽입된 순서를 기억합니다
- `new Map()` 생성자 함수를 사용해서 생성한다.
- 항목을 설정/가져오려면 `.set()` 및 `.get()` 메서드를 사용합니다
- for...of 루프를 사용하면 Set과 달리 키와 값으로 구성된 배열의 배열 (entry list) 형태로 반환됩니다
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
1. 함수를 사용하는 것을 함수 호출(invoking) 또는 **함수 실행(executing)**이라고 합니다
```js
function speak() { // 함수 선언
    console.log("arf");
    console.log("woof");
}

const speakSomething = function() { // 익명 함수를 변수에 할당
    console.log("Hello!");
}; // 이 방식도 speakSomething()로 호출됩니다.
```
2. parameter(or argument): 함수가 작동하도록 설계된 데이터를 의미하며 함수의 괄호 안에 정의됩니다. 함수 본문 내에서 매개변수는 변수처럼 사용할 수 있습니다.
- 기본값 설정: ES2015부터는 매개변수에 `=` 를 사용하여 기본값을 설정할 수 있습니다.
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

3. `arguments`: 함수가 호출될 때 전달된 모든 인수를 배열로 저장하는 내장 객체입니다
- 이 객체는 함수 내에서 사용할 수 있으며, 함수의 인수를 반복하고 처리할 때 유용합니다. 예를 들어, 함수가 여러 개의 숫자를 더하는 경우, arguments 객체를 사용하여 모든 숫자를 더할 수 있습니다. 이 객체는 함수가 호출될 때 전달된 모든 인수를 배열로 저장하는 내장 객체입니다
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

4. `rest parameter`: 함수 선언 시 `...` (세 개의 점)을 사용하여 나머지 인수들을 배열로 수집하는 매개변수입니다.
```js
function bake(temp = 350, time = 35, ...flavors) {
  
  console.log(`Let's bake this cake at ${temp} degrees,`);
  console.log(`for ${time} minutes\n`);
  
  if (flavors.length > 0) {
    console.log("And let's not forget these flavors", flavors);
  }
  
  console.log("Arguments contains everything", arguments);
}

bake(425, 30, 'chocolate', 'lemon', 'black forest'); // flavors 배열은 ['chocolate', 'lemon', 'black forest'] 가 됩니다
bake(300, 30, 'vanilla'); // flavors 배열은 ['vanilla'] 가 됩니다
bake(); // bake() 함수를 호출하면, flavors 배열은 [] 가 됩니다
```

### Block-level scope
- `let`과 `const`: ES2015부터 도입된 let과 const 키워드는 **블록 스코프(block scope)**를 생성하며, 함수뿐만 아니라 {} 중괄호로 둘러싸인 작은 코드 블록(예: if 문 내부)에서도 변수의 스코프가 제한됩니다.
- 동작 방식: 블록 내에서 let 또는 const로 선언된 변수는 오직 해당 블록과 그 하위 블록 내에서만 유효합니다.
```js
let snack = '초코파이'; // 전역 서류

function introduce() {
    let snack = '새우깡'; // 회의실 A의 지역 서류 (안전함)
    if (true) {
        let snack = '감자칩'; // 💡장점: 완전히 독립된 새 칸막이 속 서류
        console.log(snack); // 출력: '감자칩' (이 칸막이 안에서만)
    }
    console.log(snack); // 출력: '새우깡' (회실 A 서류는 그대로 유지됨)
}

introduce();
console.log(snack); // 출력: '초코파이' (전역 서류는 안전함)

```
> [!WARNING] 주의
> 최신 자바스크립트(ES6+)를 사용하여 코드를 작성할 때는 **let과 const**를 사용해야 합니다. var는 더 이상 권장되지 않습니다.
- 이유: var 키워드는 **함수 레벨 스코프(Function-level scope)**를 따릅니다.
- var, let 의 차이점
```js
var snack = '초코파이'; // 전역 서류 (모두 접근 가능)

function introduce() {
    var snack = '새우깡'; // 회의실 A의 지역 서류
    if (true) {
        var snack = '감자칩'; // 💡문제: 칸막이가 무시되고 회의실 A 서류가 '감자칩'으로 바뀜
    }
    console.log(snack); // 출력: '감자칩' (이미 바뀌어 있음)
}

introduce();
console.log(snack); // 출력: '초코파이' (전역 서류는 안전함)
```

### Callback Functions
- 콜백 함수는 다른 함수의 인수로 전달되어 그 함수 내에서 실행되는 함수를 의미한다.
- 예시: `setTimeout` 함수는 첫 번째 인수로 함수를 받고, 두 번째 인수로 밀리초를 받아 타이머가 만료된 후 해당 함수를 실행합니다
```js
setTimeout(function() { 
    console.log("5초 후 실행됨"); 
}, 5000);
```

### Arrow Functions

-  Syntax and Features: 화살표 함수는 일반적인 함수 표현식(Function Expression)을 대체하며, 다음 세 가지 주요 방식으로 코드를 줄입니다.
1. 기본 구문 (`function` 키워드 제거): 화살표 함수는 `function` 키워드를 생략하고, 괄호와 함수 본문 사이에 **화살표 모양의 `=>`** 구문(equal sign followed by a greater than sign)을 사용하여 정의됩니다.

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

2. Terse Return Syntax: 화살표 함수의 가장 큰 장점 중 하나는 **명시적인 `return` 키워드와 중괄호(`{}`)를 생략**할 수 있다는 점입니다.

함수가 단순히 **결과를 반환하는 것 외에 다른 작업을 요구하지 않을 때**, 중괄호와 `return` 키워드를 모두 생략하고 결과를 반환하는 표현식만 남겨 **한 줄 함수(one-liner)**를 만들 수 있습니다.

```javascript
// 일반 함수 (결과만 반환)
const isEven = function(number) {
    return number % 2 === 0;
};

// 화살표 함수 (간결한 반환, return 및 {} 생략)
const isEvenArrow = (number) => number % 2 === 0; // 이 표현식의 결과가 자동으로 반환됨
```