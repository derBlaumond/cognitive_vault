## Primitive Types
Ever get an error in your code saying, type is not assignable to type? Or maybe you've wondered what's the difference between null and undefined? Well, understanding data types in TypeScript is the key to writing clean, bug-free and predictable code. In this video, we're going to break down everything you need to know about primitive types in TypeScript, from numbers and strings, to the more unique types, like Symbol and BigInt. Let's dive in. In TypeScript, a data type defines the kind of values a variable is allowed to store. This helps promote type safety and makes your code more readable and predictable. 

TypeScript organizes data into two main categories. Primitive types and object types. Primitive types are the fundamental building blocks. They hold simple, unchangeable values that are assigned directly to a variable. Object types are more advanced. They are capable of holding multiple values and functions. Unlike primitives, they are mutable, which means you can change them after they are created. 

As you can see on the left, TypeScript has seven primitive types. We have Number, String, Boolean, Null, Undefined, Symbol, and BigInt. Let's start with the first one, Number. In TypeScript, the number data type is implemented as a 64-bit floating-point value. This means it's incredibly versatile, capable of representing both integers, like 25, and decimal numbers, like 10.0. It also supports various numeric formats, including hexadecimal, binary, and octal, giving you a lot of flexibility when working with numbers in your code. Now take a look at the code example on the screen. 

On line 1, we declare a simple integer, age, and assign it the value 25. On line 2, we see how you can convert a string to a number, using the parseInt function, which is a common operation. Line 3 shows a decimal number, decimal, set to 10. Finally, on line 4, we have a hexadecimal value. So as you can see, the number type is your go-to for any numerical data, whether it's an age, a year, or a more complex hexadecimal value. The string primitive type is used to store text data. Its value is always enclosed in either single or double quotes. 

Strings can also span across multiple lines when enclosed in backtick characters, allowing the use of template literals. The code snippet shows string p, string q, and sentence string, with the last one demonstrating a multiline string. The boolean data type in TypeScript stores a binary value, either true or false. The code example shows let isTrue boolean true, let isFalse false, and let isLogic true and false, or false and true, demonstrating logical operations. The null type is a fascinating one because it indicates a deliberate and intentional absence of data. You can think of it as a way of saying, this field is known to have no value, and we are telling you that on purpose. It's not an accident. 

It's a conscious decision to represent the fact that something is empty or missing. Let's look at the code to see this in action. On line 1, we declare a variable called middleName. Notice the type annotation, string or null. The pipe symbol here means that middleName can be either a string or null. This is a powerful feature of TypeScript that allows us to be very specific about what a variable can hold. Lines 2 and 3 show the first case. 

If a person does have a middle name, we can store it as a string, like James. However, lines 4 and 5 show the opposite case. If we know that someone does not have a middle name, we can intentionally set the variable's value to null. This clearly signals to anyone reading the code that the absence of a value is a known state. So remember, null is your way of representing a known and intentional empty state. The undefined type represents a variable that hasn't been assigned a value yet, indicating an unintentional absence of data or that something hasn't been initialized. Both null and undefined types signify the absence of a value or that no value is currently present. 

The code example shows a variable let phone. Number string pipe undefined semicolon which is then explicitly set to undefined. Symbols are special, unique identifiers that can be used as object property keys to avoid naming collisions and ensure property uniqueness. Even if two symbols have the same description, they are not equal because each one is unique. The code shows a comparison of two objects, one with a standard ID and one using a symbol as a unique key. Bigint is a data type used to represent extremely large numbers that exceed the safe limit for the regular number type. You can create a bigint by either using the bigint function or by appending an n to the end of a numeric literal. 

The code shows both methods with const value 1, bigint and const value 2. Thank you for watching. I will see you in the next video.

## Type System in TypeScript
Have you ever wondered why some of your code just works while other times you get a confusing type error? The secret lies in a concept called a type system. In this video, we're going to dive into the TypeScript type system and see how it helps us write safer, more predictable, and easier to understand code. A type system is a set of rules within a programming language that defines how values can be classified, used and interacted with based on their data types. In simple terms, think of a type system as a safety guide for your code. It tells the computer what kind of data you're working with, which helps catch mistakes before you even run the code, like trying to add a number to a string. Ultimately, this makes your code more predictable and easier to understand. 

Beyond the basics, TypeScript also introduces a range of advanced types that provide flexibility and power. These include the any type, which lets you opt out of type checking, the unknown type, a safer alternative to any, union types, which allow a value to be one of several different types, and custom types, which you can create yourself. The TypeScript type system is built on three core concepts, declaration, annotation, and inference. Declaration is when you explicitly state a variable's type. Annotation is how you write that type, declaration, for example, let name colon string. Inference is when TypeScript automatically figures out the type for you, saving you from having to write it out every time. The TypeScript type system also includes key features that handle how types relate to each other. 

Type Hierarchy defines the relationships between types, like a family tree for your data. Conditional types allow you to create types that depend on a condition. Typecasting lets you tell TypeScript to treat a value as a different type. And finally, duct typing, which is a core concept where TypeScript focuses on what an object can do, rather than what it's named. Thank you for watching. I will see you in the next video.

## any and unknown Type
When you start with TypeScript, you learn about all the benefits of type safety. But then, you encounter the ANY type, which seems to throw all those benefits out the window. So, why does it exist and how is it different from UNKNOWN? In this video, we're going to demystify the ANY and UNKNOWN types, showing you their power, their dangers, and why UNKNOWN is often the safer choice. TypeScript's type system provides numerous benefits, like early error detection, improved code quality, and an enhanced developer experience. However, among its various types, one stands out for both its flexibility and its potential dangers – the ANY type. The ANY type in TypeScript effectively disables type checking for a particular variable, parameter, or return value. 

It allows a value to be literally ANY type and permits all operations on it without verification. When a variable is typed as ANY, TypeScript essentially treats it as a plain JavaScript variable, removing all the type safety benefits. The example code shows how let value ANY equals HELLO can be reassigned to a number and then a boolean without any errors, which highlights the loss of type safety. The note on the slide advises to never let your variable be of type ANY as it introduces potential runtime errors. If you don't explicitly declare a type for a variable and TypeScript can't infer it from the surrounding code, the compiler will default the type to ANY. Relying on this is risky because it skips type checking. To prevent this, you can enable the NO – implicit ANY compiler option in your tsconfig.json file. 

This option will treat all implicitly declared ANY types as errors, forcing you to be explicit about your types and maintaining type safety. This brings us to a safer alternative – the UNKNOWN type. The UNKNOWN type is a safer version of ANY because it requires a type check before a variable can be used. Unlike ANY, it helps reduce runtime errors by ensuring you first determine the variable's actual type before performing operations on it. The code example demonstrates the difference. We have a function, sayhello, that accepts a parameter name of type UNKNOWN. Inside the function, we must first perform a type check using typeofname string before we can use the name variable. 

This forces you to handle the data safely. Overall, the ANY type offers flexibility when needed, but it sacrifices type safety. It's advisable to use it only when absolutely necessary and with careful consideration. The UNKNOWN type is the preferred, safer alternative. When you don't know the exact type beforehand, thank you for watching. I will see you in the next video.

## Type Alias in Typescript
Are you tired of rewriting complex types in your TypeScript code? Do you want to make your code more readable, reusable and easier to manage? If so, you need to learn about type aliases. They allow you to give a custom name to any type, simplifying your code and improving its clarity. Let us dive in. In TypeScript, type aliases allow you to create a custom name for any existing type. This is incredibly useful for improving code readability, reusability and manageability, especially when you're dealing with complex types. 

Creating a type alias is straightforward. You use the type keyword, followed by the name you want for your custom type, and then an equal sign equals. After that, you define the actual type you're creating an alias for. The basic syntax is type alias name equals type. For example, let's create an alias for the number type. You would write type numeric value equals onNell's number. Here numeric value is now an alias for the number type. 

Then, when you declare a variable, like let x, numeric value, TypeScript knows that x is internally of type number, but your code is more descriptive and readable. Now what's the actual need for aliases? Consider a variable, let's say x, that can be a boolean, a string or a number. Without type aliases, you would have to declare x with a long union type like this. Let x, number, or boolean, or string. But with a type alias, you can define a custom type named values that represents that union. Type values equals number. 

Type boolean, type string. Then you can simply declare your variable like this. Let x colon, values, semicolon. This makes your code much cleaner and easier to understand. Especially if you need to use this same type in multiple places. Thank you for watching. I will see you in the next video. 

## Type Behavior
Ever felt confused by all the different ways to declare a variable in TypeScript? We'll break down the key concepts of Inference, Annotation and Declaration and show you the one principle that ties it all together. Doctyping. By the end of this video you'll know exactly when to use each approach to write cleaner, more efficient and error-free code. Let's explore a concept called ductyping. Ductyping is a fun way to describe how TypeScript determines if something can be used in your code. It's based on the popular saying, if it walks like a duck and quacks like a duck, then it's a duck. 

In TypeScript, this means the system checks if an object has the required properties and methods to do a specific job, regardless of what its name is. It focuses on the object's structure and capabilities, not its formal type name. Here's a practical example of ductyping. Imagine we have a custom type called StringClone that is simply an alias for a string. We can also have a NumberClone that is an alias for a number. When we declare, let first name StringClone John, TypeScript is able to use the concept of ductyping to figure out that the value John has the same characteristics as StringClone. And therefore, it's a valid assignment. 

The same applies to let age, NumberClone 32.5. The system sees that the number 32 is structured like a NumberClone and allows the assignment. It's all about checking if the structure fits, not the name. Let's start by defining some fundamental concepts in TypeScript, declaration, annotation, and inference. Declaration is simply the act of introducing a new variable, function or type in your code. It's how you tell the program that something new exists. It may or may not include a type annotation or an initial value. 

For example, let title is a declaration without a type or value. Let age equals 30 is a declaration with a value and the type is inferred from that value. And finally, let name String is a declaration with a specific type, which we call an annotation. Next, let's talk about annotation. Annotation is when you explicitly define the type of a variable, function parameter, or a function's return, value. It's a way of being very clear about what kind of data you expect. This practice improves readability and is crucial for ensuring type safety, especially when you're working with complex code or dynamic data. 

For example, in let first, name String zoofisha, the colon string part is the annotation. It tells TypeScript that the first name variable must be a string. Now let's look at inference. Inference is TypeScript's ability to automatically deduce the type of a variable or an expression based on the value you assign to it. It's a powerful feature that reduces the amount of code you have to write. In the example, let first name equals zoofisha, TypeScript automatically figures out that first name is a string because of the value zoofisha that was assigned to it. You don't have to explicitly type it out. 

So when should you use each of these concepts? Use inference when the type is obvious from the context, such as a simple variable assignment like let price equals 99. It helps keep your code concise and clean. Use annotation when the type isn't clear, like in a function's signature or a more complex scenario. This makes your code more readable and easier for others to understand. And always remember to declare variables before you use them. This fundamental practice helps avoid runtime errors and keeps your code organized. 

To wrap it all up, here are the best ways to utilize these concepts. Use inference for simple assignments to reduce boilerplate code and keep things clean. Use annotations in function signatures and complex logic to improve clarity and ensure type safety. And finally, always declare variables before you use them to prevent unexpected runtime errors. By following these best practices, you can write more efficient, readable and robust TypeScript code. Thank you for watching. I will see you in the next video.

## Understanding Union Types in Typescript
Frustrated by functions that only accept one type of data? In this video, we'll introduce you to UnionTypes, TypeScript's solution for creating flexible, multipurpose functions and variables. You'll learn how to combine two or more types to build more adaptable and powerful code, all while maintaining the safety and clarity that TypeScript is known for. Welcome to our video on UnionTypes in TypeScript. A union type is a powerful way to make your variables and parameters more flexible without sacrificing type safety. It's essentially a combination of two or more types, allowing a variable to hold a value that can be any of the types you've defined. To create a union type, you use the pipe operator, the vertical bar, to separate the different types. 

For example, string pipe number means a variable can hold either a string or a number value. Let's look at a simple example with primitive types. Here we've created a custom type alias called string or number. We've set it equal to string pipe number. This means that any variable declared with the type string or number can hold either a string or a number. In this example, let value, string or number, is first assigned the string hello and then reassigned the number 1, 2, 3. Both of these assignments are perfectly valid because they conform to our union type. 

Union types are not limited to just two types. You can combine as many types as you need to, including primitive types and even built-in JavaScript types. For example, type string number or undefined equals string pipe number pipe undefined semicolon is a perfectly valid union that can accept a string, a number, or undefined. This shows how flexible and expressive union types can be when defining complex data structures. While you can use union types directly, it's often more readable and reusable to declare them using type aliases. By creating a type alias, you give a descriptive name to your union type, like my type or maybe date. This makes your code much easier to read and understand. 

For example, type my type equals number or string creates a custom type that can be either a number or a string. Similarly, type maybe date equals date pipe undefined is a clean way to define a type that is either a date object or undefined, which is common for optional properties. Union types are incredibly useful when defining function parameters. This example shows a print function that accepts one parameter called input. The input parameter has a union type of string pipe undefined. This means you can call the print function with a string or with no argument, which will result in undefined being passed. Inside the function, we use a simple if check to determine if the input exists. 

If it does, we print it to the console. If not, we print a default message creating a function that is both flexible and handles different scenarios gracefully. Finally, let's look at how we would invoke the function we just created. The union type allows for two valid ways to call the print function. The first invocation is print. Since we didn't pass an argument, the input parameter is undefined and our function will execute the else block, prompting the user to provide an input. The second invocation is print hello world. 

In this case, we've passed a string. So our if statement evaluates to true and the function will successfully print hello world to the console. Thank you for watching. I will see you in the next video.

## Introduction to Conditional Types
Think of TypeScript's types like a game of what-if? In this video, we'll introduce you to Conditional Types, a powerful feature that lets you create types that change based on a condition. We'll show you how to use the extends keyword and the ternary operator to build flexible, dynamic types that adapt to your data, making your code smarter and more resilient. Welcome to our video on Conditional Types in TypeScript. Conditional Types are an advanced feature that let you create types that behave differently based on a condition. They enable you to define how an input type relates to an output type, making your code more dynamic and flexible. This is particularly useful for creating reusable, type-safe functions and components. 

Before we dive into Conditional Types, let's set up a couple of basic type aliases. We'll use these in our examples. Here we declare two type aliases. Type customDate equals Date and type customString equals String. While these might seem simple, they act as custom wrappers for our base types, making our code more readable. This will also make it easier to see how our Conditional Types are working in the upcoming examples. A Conditional Type uses a syntax that looks like a ternary operator in JavaScript. 

T extends U, X colon Y. Here, we're checking if T can be assigned to U. If the condition is true, the resulting type is X. If it's false, the resulting type is Y. In this example, type trueString and customString extends String. True, false, we check if customString extends String. Since our customString type alias is a String, the condition is true. 

The resulting type is the literal type true. Conditional Types aren't limited to assigning Boolean literals. You can use them to assign entire types. This makes them incredibly useful for building dynamic type logic. In this example, let's say we have type trueString equals customString extends String number colon String. We are checking if customString extends String, which it does. In this case, instead of returning true, we return the number type. 

This means the trueString type becomes number. Now let's look at another practical example of assigning a type. In this code, we have type DateAssignment equals customDate extends Date, Date or Undefined. We are asking TypeScript to check if customDate extends the baseDate type. Since customDate is defined as a Date type, the condition is true. This means that the DateAssignment type becomes Date. Notice that Undefined is treated as a type in this context, not a value. 

This pattern is often used to make a type optional or to handle cases where a function might not return a value. Thank you for watching. I will see you in the next video.

## Type Hierarchy
You've seen any and unknown, but do you really know the difference? And what about never? In this video, we'll uncover TypeScript's type hierarchy, revealing the hidden relationships between all its types. By understanding this single concept, you'll unlock the secret to writing more robust code, catching bugs before they happen, and becoming a true TypeScript expert. Welcome to our video on TypeScript's type hierarchy. TypeScript provides a rich and flexible type system that is designed to help developers catch errors early and write more predictable code. One of the key concepts to master for effective development is the type hierarchy tree. 

This hierarchy organizes all TypeScript types into a logical structure based on their compatibility and relationship with one another. Understanding this tree is crucial for working with advanced TypeScript features. The type hierarchy is a visual representation of how different types relate to each other. The types at the top of the tree, like unknown and any, are the most general, while the types at the bottom, like string and number, are more specific. The lines represent a direct relationship where one type is a subtype of another. For example, string is a subtype of any. This means a string can be used wherever an any type is expected. 

The dashed lines show other relationships and connections between different type categories. Let's focus on the top types of this hierarchy, starting with any. The any type is the most permissive type in TypeScript. It allows a variable to hold any kind of value, and it essentially turns off all type checking for that variable. For example, the string type is a subtype of the any type, meaning any string is also an any. In TypeScript, the extends keyword checks if the first type is a subtype of the second. If it is, the condition is true. 

First, we have any extends unknown. The result of this is true. This tells us that any is a subtype of unknown. In other words, any is more flexible or less specific than unknown. Next, we have string extends any. The result is also true. This is a key point. 

Every single type in TypeScript, from string to number to a custom class, is a subtype of any. This is what makes any so powerful, but also so dangerous. When you use any, you're essentially opting out of TypeScript's type checking, which can lead to runtime errors. So what's the difference? While both any and unknown can hold any value, unknown is the type-safe alternative. You can't perform any operations on an unknown type without first narrowing it down to a more specific type. Thank you for watching.

## Type Casting
Got a type checking error in TypeScript that just doesn't make sense? You're not alone. In this video we'll demystify typecasting, the essential skill that gives you control over TypeScript's strict rules. We'll show you exactly when and how to use the a as an angle bracket, less than greater than syntaxes to bypass the compiler and get your code working without sacrificing type safety. Welcome to our video on typecasting in TypeScript. Typecasting is a powerful feature that lets you override TypeScript's default type inference. It allows you to explicitly tell the compiler what type a variable or expression should be, even if it might not initially seem that way. 

There are two primary ways to perform typecasting in TypeScript, and we'll cover both, casting with as and casting with angle brackets. The first and most common way to cast a type is by using the adas keyword. This method allows you to easily convert a variable from one type to another. It's a clear and readable way to tell TypeScript, trust me, I know what I'm doing. This variable is this specific type. For example, if we have a variable lastName that TypeScript infers as a string, we can reassign it to a new variable and tell TypeScript to treat it as an any type using let casted name equals lastName as any. This is useful when you want to bypass strict type checking for a specific purpose. 

The second way to perform typecasting is by using angle brackets. This method is functionally equivalent to using the as keyword. It achieves the exact same result, but the syntax is slightly different. In this example, we have let castedName equals firstName. The place before the variable, firstName tells the TypeScript compiler to treat firstName as a variable of type any. While this syntax is perfectly valid, the as keyword is generally preferred in modern TypeScript because it's less ambiguous and avoids potential conflicts with JSX syntax in React. So why would you need to use typecasting? 

Typecasting is especially helpful when dealing with data from external sources, like an API. You might fetch data that you know will have a certain structure, but TypeScript doesn't know this until it receives the data. In this example, we define a user type with name and email properties. When we get a response from a fetchUser function, we can use asUser to tell TypeScript that the returned object matches the user type. This ensures that you can safely access properties like response.name and response.email without causing type errors, making your code more robust and predictable. Thank you for watching. I will see you in the next video.

## Type Casting Use Cases in TypeScript

TypeScript brings static typing to JavaScript, helping developers catch errors at compile time rather than at runtime. However, there are situations where the compiler does not have enough information about the type of a value. In such cases, **type casting** (also called type assertions) is used to explicitly tell the compiler how to interpret a value.

It is important to note that type casting does not change the actual value at runtime. It only affects how the compiler treats the value during development. This improves type safety, enables accurate autocompletion, and reduces potential type errors in complex code.

- Common Use Cases for Type Casting

1. Accessing DOM Elements

	When working with the Document Object Model (DOM), TypeScript often treats elements as a generic HTMLElement. Casting allows developers to access properties of more specific element types.
	
	Example: const input = document.querySelector("#username") as HTMLInputElement; console.log(input.value);
	
	Here, casting tells TypeScript that the selected element is an input field, allowing safe access to the value property.

2. Working with Union Types

	Union types allow variables to hold multiple types. Casting can be used when you are certain of the specific type at a given point.
	
	Example: function getLength(value: string | number) { if (typeof value === "string") { return (value as string).length; } return value; }
	
	In this example, casting confirms that value is a string, enabling access to the .length property.

3. Interoperating with Third-Party Libraries

	Many JavaScript libraries either lack type definitions or have incomplete ones. Casting ensures that you can safely interact with data from such libraries.
	
	Example: declare const data: any; const user = data as { id: number; name: string }; console.log(user.name);
	
	Here, casting converts any into a structured object so that properties can be accessed more safely.

4. Migrating from JavaScript to TypeScript

	In projects transitioning from JavaScript, many variables may initially be typed as any. Casting provides a gradual way to introduce stronger typing.
	
	Example: let response: any = getApiResponse(); let result = response as { success: boolean; message: string };
	
	Casting allows legacy JavaScript code to adopt more structured typing without breaking compatibility.

5. Narrowing Complex Data Structures

	APIs often return loosely typed or generic data. Casting clarifies the expected structure of these responses.
	
	Example: type Product = { id: number; title: string; price: number }; const products = JSON.parse(apiResponse) as Product[]; products.forEach(p => console.log(p.title));
	
	This cast tells TypeScript to treat the parsed JSON as an array of Product objects.

6. Overriding Inferred Types

	Sometimes TypeScript infers a type that is too broad. Casting allows developers to narrow the type.
	
	Example: let unknownValue: unknown = "Hello World"; let strLength = (unknownValue as string).length;
	
	Here, casting narrows from unknown to string, making it possible to access string-specific properties.

- Comparison Table: When to Use Type Casting

|Use Case|Without Casting|With Casting|
|---|---|---|
|Accessing DOM properties|Limited to generic HTMLElement|Access specific element methods and properties|
|Handling union types|Cannot access type-specific properties|Narrow down and access safely|
|Third-party libraries with any types|No autocomplete, risk of runtime errors|Safer access with explicit type definitions|
|Migrating from JS to TS|Reliance on any, less type safety|Gradual adoption of structured typing|
|Parsing API responses|Treated as any or unknown|Enforces object structure at compile time|
|Overriding inferred types|Too broad, limited type features|Explicitly narrowed to intended type|

- Best Practices and Considerations
	- Type casting should be used only when you are certain about the type of a value. Incorrect casting may lead to runtime errors.
	    
	- Prefer **type guards** such as typeof or instanceof where possible. They provide safer narrowing without explicit casting.
	    
	- Avoid excessive use of any combined with casting, as it reduces the benefits of TypeScript’s type system.
	    
	- Casting is most useful in real-world cases involving DOM manipulation, third-party libraries, and complex API responses.
    

- Conclusion
	Type casting in TypeScript is a practical way to bridge gaps between dynamic and static typing. It is particularly valuable when interacting with the DOM, working with union types, integrating third-party libraries, parsing API responses, or migrating from JavaScript to TypeScript. Used responsibly, type casting enables safer code, better tooling support, and clearer communication of developer intent—without altering runtime behavior.

## Objects and Their Working

Think all TypeScript objects are created equal? Think again. In this video we'll dive into the tricky side of the TypeScript object type. You'll learn the crucial difference between a generic object and an object literal and how understanding this distinction can save you from a world of unexpected bugs and runtime errors. Now, let's explore the object type in TypeScript. In TypeScript, an object is a structured entity made up of key-value pairs. Each key is associated with a value that can be a primitive type, a function, an array, or even another object. 

Objects are a fundamental part of JavaScript and TypeScript, and understanding how to define and use them effectively is crucial for building any application. There are a couple of ways to define an object in TypeScript. On the left, we have an object with an implicit type. When you define let person details, name Zufi, age 25, TypeScript automatically infers the types of the properties and knows that name is a string and age is a number. On the right, we have a more explicit definition. We declare let company, object, name Edureka, location Bangalore. By using the capital object type, we are telling TypeScript that company can be any object which can have some tricky side effects we'll explore next. 

This slide highlights one of the tricky behaviors of the capital object type. Since company is declared as a generic object type, TypeScript knows that it is an object but it doesn't know its specific structure. Because of this, it can be assigned to any subtype of object. This means that it can be an object with different properties, an array, or even a function. Since company is declared as a generic object type, TypeScript knows that it is an object but it doesn't know its specific structure. Because of this, it can be assigned to any subtype of object. This means that it can be an object with different properties, an array, or even a function. 

This is where the behavior of object can become problematic. As we learned from the type hierarchy, an array is a subtype of an object. This means if you were to redeclare company as an empty array, TypeScript would not throw an error. This is also true for redeclaring it as an empty function. This behavior can be a source of bugs and can make your code unpredictable, which is why it's not the optimal way to define objects. To avoid this unexpected behavior, it's best to use an object literal or a type definition to provide a clear structure. The best way to do this is to add properties and their types directly to the object literal. 

In this example, we define let newCompany nameString locationString. Now TypeScript knows exactly what properties and types newCompany is supposed to have. If you try to assign an array or a function to newCompany, TypeScript will throw an error preventing potential bugs. Thank you for watching. I will see you in the next video.

## Type Alias for Objects and Nested Objects
Think all TypeScript objects are created equal? Think again. In this video we'll dive into the tricky side of the TypeScript object type. You'll learn the crucial difference between a generic object and an object literal and how understanding this distinction can save you from a world of unexpected bugs and runtime errors. To avoid the unpredictable behavior of the generic object type, we should always use a specific type definition. This slide shows the correct way to define an object using an object literal with explicit key value types. By defining the properties and their types, we create a clear contract for how our object should be structured, preventing errors and improving code clarity. 

It may seem easy to use inline type annotations with smaller objects, but this approach becomes difficult to manage with more complex objects or when you need to reuse the type. This is where type aliases become invaluable. Using type aliases, you can define your object's structure once and reuse it across multiple variables, functions, and files. This improves readability, reduces code duplication, and makes refactoring much easier. To solve the issue of loosely typed objects, we can create a type alias to define a specific structure. By creating a type alias, we can define the exact properties and their types that our object should have. In this example, we've created a car type alias with specific properties like brand, model, year, and color. 

This ensures that any object we declare as car type will have these properties and their corresponding types, keeping our code predictable. Now let's tackle a more advanced topic. Strictly typing nested objects. Nested objects are objects that contain other objects as properties. When you have a complex data structure like this, it's essential to ensure you have strict type checking to prevent errors. In this video, we're going to look at how we can strictly type these nested objects to make our code more reliable. The type alias is very useful for adding a new property to the car type object. 

Here we declare a variable called car and assign it the car type alias. When we create our car object, we must provide the brand, model, year, and color properties. TypeScript will then ensure that each of these properties matches the types we defined in our car type alias. Now what happens if we want to add a nested object to our car type? For example, let's say we want to add a designer property that is itself an object with name and experience. If we try to add this property directly to our car object, without updating the car type alias, TypeScript will throw an error. This is because the designer property doesn't exist on the original car type alias. 

So how do we solve this problem and strictly type our nested objects? We can simply update our car type alias to include the designer property as an object. In this updated example, we add designer, that is name, string, experience, number to our car type alias. Now any object we create using this alias must include a designer property with a name that is a string and an experience that is a number. Thank you for watching. I will see you in the next video.

## Index Signatures with Objects
Imagine you're building an application and you get a data payload with a list of awards. The problem is, each award has a unique ID as its key, so you can't just define a static object type. How do you tell TypeScript to expect a certain type for the values no matter what the keys are? The answer lies in index signatures. Stay tuned to see how this simple but powerful feature can transform the way you handle dynamic data in TypeScript. In TypeScript, you often need to define the shape of your objects. But what if the property names of an object are dynamic and not known ahead of time? 

Look at this example. We have an awards object with two properties, awards1 and awards2. Each of these properties is another object containing a name, which is a string, and a date, which is a date object. While the structure of each award is consistent, the property names themselves awards1, awards2, and so on, are not fixed. This is where we run into an issue with strict typing. Trying to manually type this would be inefficient, especially if the list of awards grows. This is a common problem in JavaScript. 

And TypeScript has a specific solution for it, index signatures. So what exactly is an index signature? An index signature is a way to define the type of object keys that are not known when you're writing the code. Think of it as a pattern that tells TypeScript, hey, I don't know the exact names of all the properties in this object, but I do know what type they will be and what type their corresponding values will be. The syntax is straightforward. If we use square brackets with a key and its type, followed by a colon and the type of the value. For example, key, string, award details. 

Here we're saying that the object will have keys that are strings and the value for each of those keys will be of the type award details. A couple of important things to remember. The key can only be a string or a number, and you can only have one index signature per object. Let's recap the benefits of using index signatures. Strict typing for unknown properties. Index signatures allow you to enforce strict typing on properties that are created dynamically, giving you the full power of TypeScript, even with flexible data structures. Defines structure and avoids any type. 

Instead of resorting to the less safe any type to handle dynamic properties, index signatures let you define a clear structure, ensuring your code remains predictable and safe. Works great for nested objects. As we saw in our example, index signatures are perfect for handling nested objects with dynamic keys, making it easy to model complex data. Improves code readability and maintainability. By creating clear type definitions, you make your code easier to read and maintain for yourself and others. Now let's see how we can use index signatures to solve our original problem in a clean way. We can use type aliases to make our code more readable and reusable. 

Step 1. First, we'll create a type alias for the value of our award properties. Let's call it award details. This type defines the consistent structure of each award object with a name string and a date date. Step 2. Next, we'll create the main awards type. This is where we'll use the index signature. 

We'll define it as an object where the keys are strings and the values are of the award details type. We just created. By using these type aliases, we've created a clean, maintainable, and strictly typed definition for our awards object, without needing to know the names of the award properties ahead of time. Thank you for watching. I will see you in the next video.

## Optional and Readonly Properties in Typescript
What if I told you, there's a simple way to make your TypeScript types more flexible without sacrificing type safety? We're talking about properties that don't always have to be there and properties that should never be changed. In this video, we'll explore two essential modifiers that give you total control over your types, optional properties and read-only properties. In TypeScript, when you define a type, all of its properties are mandatory by default. Let's look at this car type. It has three properties, brand, model and year. If you try to create an object of this type and leave out the model property, for example, TypeScript will throw an error. 

The same is true if you try to add a property that isn't defined in the typer, like color. TypeScript's strict typing is a good thing. It helps you catch bugs early. But sometimes you need more flexibility. So how can we make a property optional? To make a property optional, you just need to add a question mark after its name. As you can see here, we've added color, string, to our car type. 

With this change, you can now create a car type object that either includes the color property or doesn't. This is useful for properties that might not always be available in your data, giving you more flexibility while still maintaining type safety. What if you have a property that should never be changed after it's been created? This is where the read-only keyword comes in. By using read-only before the property name, you tell TypeScript that this property can only be assigned a value once, at initialization. In this example, we've defined a type of car property with a read-only modifier. The type for this property is a union of three string literals, sedan, SUV, or truck. 

Once you set its value, say to sedan, any future attempt to change it will result in a TypeScript error. This is great for ensuring data integrity. So let's put it all together and see what our car type looks like now. We still have our mandatory properties, brand, model, and year. We've added a color property that is now optional by using the question mark. And finally, we have a read-only property for type of car that can only be set once and must be one of the specified values. By using these modifiers, optional and read-only, you can create more flexible yet highly structured types, giving you the perfect balance between type safety and adaptability in your TypeScript projects.

## Union Types with Objects
What if you could combine two different types of data, like a dog and a cat, into one flexible type? That's what we're going to talk about today. Union types in TypeScript. Stay tuned to learn how you can use this powerful feature to write cleaner, more adaptable code. This slide visually represents the core concept of union types when used with objects in TypeScript. Imagine the dog type as one set of properties and the cat type as another. When you create a union of dog and cat, you're creating a new type that encompasses both. 

An object of this new union type can be either a complete dog or a complete cat. Think of it as combining two distinct groups. The resulting union includes everything from the dog group and everything from the cat group. It's not a new, mixed-up type, but rather a choice between the two existing ones. This is a fundamental concept for creating flexible and type-safe code. Today, we're going to talk about a powerful concept in programming – union types. At their core, union types allow a variable to hold a value that can be one of several different types. 

This is incredibly useful for creating flexible and expressive code. You can use union types with both objects and primitive types, like strings or numbers. For example, a variable could be a string or a number. The syntax for creating a union type is simple, as you can see on the screen. You define a new type, A or B, which can be either type A or type B, separated by a vertical bar or pipe. To really understand how union types work with objects, let's start by defining two distinct types, a dog and a cat. On the left, we have our dog type. 

A dog object has a name, a string and two boolean properties, barks and wags. On the right, we have our cat type. A cat object also has a name, a string, but its unique property is spurs, which is a boolean. As you can see, both types have a name, but their other properties are different and define them as distinct entities. Now that we have our dog and cat types, we can create a union type called dog-cat union. As the syntax shows, we define dog-cat union as being either a dog or a cat. This new union type can hold an object that has all the properties of a dog or it can hold an object that has all the properties of a cat. 

The key rule here is that an object assigned to dog-cat union must fully satisfy one of the two types. It can also optionally include properties from the other type, but it must, at a minimum, be a complete dog or a complete cat. Let's look at some examples to clarify this. Here we see a valid example on the left. The dog object is of type dog-cat union. It has a name and the barks and wags properties, which fully satisfy the dog type. It also has the optional spurs property from the cat type, which is fine. 

On the right, we have a valid example for a cat object. It has a name and the spurs property, satisfying the cat type. It also includes the optional barks and wags properties. Finally, at the bottom, we see a hybrid object. This is also a valid example because it contains a name and all the required properties from both the dog and cat types. Now let's look at an invalid example. This object, called partial dog, attempts to be a dog-cat union, but it's missing a required property. 

It has a name and barks, but it's missing the wags property that is required to be a dog. Because it's also missing the spurs property required to be a cat, it doesn't satisfy either of the base types. This is a crucial point. You can't have a partial mix of two types. To summarize the most important points about union types. First, a union type is one of several complete types, not a partial mix of them. Second, an object must have all the required properties of at least one of the types in the union. 

You can't have half a dog and half a cat. Finally, union types are great for modeling similar but distinct entities. Like our dog and cat example, which both share a name but have different behaviors. They help you write safer, more explicit code that is easier to read and maintain. Thank you for watching. I will see you in the next video.

## Discriminating between Unions Types
Tired of wrestling with complex data states in your applications? What if there was a way to make your code smarter, so it could automatically know whether a network request is loading, failed or successful, and access the exact data it needs, all while staying type-safe? Let us see how TypeScript's discriminated unions can make your code cleaner, more robust and less prone to errors. Welcome to the lesson on discriminating between union types in TypeScript. Imagine you have a network application that can be in one of three states. It could be loading, it could have failed, or it could be a success. First, we have the network loading state. 

This state is simple. It just has a state property with the value loading. Next, the network failed state. This type also has a state property, but its value is failed. In addition, since it's a failed state, it needs a code property to give us more information about what went wrong. Finally, the network success state. This one has a state property with the value success. 

When a network call is successful, it usually returns some data. So this type includes a response property to hold that data. So how do we work with this network state union type? We use a discriminator. Notice that all three of our types, loading, failed, and success, share a common property, state. The value of this state property is different for each type. It can be loading, failed, or success. 

This shared property is our discriminator. It allows TypeScript to automatically figure out which type a variable is just by looking at the value of its state property. This is a powerful feature that helps us write safer and more robust code. Once we have our three distinct types, we can combine them into a single unified type. We'll call this network state. This single type, network state, can now be any of the three types we just defined. Network loading state, network failed state, or network success state. 

This is what we call a union type. Let's see this in action. Here we have a simple logger function that takes a network state as its argument. Inside the function, we use a switch statement on the state.state property. Because of the discriminator, TypeScript is smart enough to know which properties are available in each case. When state state is loading, TypeScript knows it's a network loading state, and the only property available is state. When the state is failed, TypeScript narrows the type to network failed state, and we can safely access state.code. 

And when the state is success, TypeScript knows it's a network success state, and allows us to access state response title without any errors. This is the power of discriminated unions. They allow you to write clean, type-safe code that handles multiple states gracefully. Thank you for watching. I will see you in the next video.

## Intersection Types
Do you want to combine multiple data types into one? While union types let you pick one or the other, TypeScript's intersection types let you use both. This video will show you how to merge properties from different types to create a more powerful and precise new type. Let us talk about intersection types in TypeScript. Think of them as a way to merge properties from multiple types into a single new type. While they might seem similar to union types, which let you choose one type or another, intersection types are about combining them. We use them less often than unions, but they can be incredibly powerful in the right context, allowing us to create complex types by combining smaller, more manageable ones. 

Creating an intersection type is straightforward. As you can see on this slide, we use the ampersand operator to combine our types. In this example, we're creating a hybrid animal type by intersecting a dog and a cat type. This new type will contain all the properties from both the dog type and the cat type, including any properties they have in common, and any that are unique to each. This is the key difference from union types. An intersection type gives you the properties of both types, not just one or the other. On the left, we're defining a constant named hybrid animal with the type HybridAnimal, which we just created. 

On the right, we see the properties that this hybrid animal type expects. Name, a string color, a string box, a boolean from the dog type, purse, a boolean from the cat type. As you can see, the hybrid animal object must have all four of these properties. This is a perfect demonstration of how intersection types ensure that an object has properties from every type you combine, creating a more specific and powerful type definition. Thank you for watching. I will see you in the next video.

---
## Working with Objects in TypeScript

Objects are central to programming in JavaScript and TypeScript. They allow developers to group related data and behavior into structured entities. In TypeScript, objects become even more powerful because of static typing, which ensures that properties and methods are used consistently and safely throughout a codebase.

By combining object syntax with TypeScript’s type system, developers can create expressive models that improve readability, maintainability, and reliability of applications.

## Defining Objects

In JavaScript, an object can be created dynamically with any set of properties. TypeScript adds type annotations to specify exactly what properties an object should have and what their types are.

For example, an object describing a user can include properties such as id, name, and isAdmin. By defining a type or interface, TypeScript enforces that the object follows the expected structure.

Example: type User = { id: number; name: string; isAdmin: boolean }; const user: User = { id: 1, name: "Alice", isAdmin: true };

This ensures that if a property is missing or has the wrong type, the compiler will raise an error.

## Optional and Readonly Properties

Not all properties of an object need to be required. TypeScript allows marking properties as optional with a ?, and as immutable with the readonly modifier.

Example: type Product = { id: number; title: string; description?: string; readonly price: number };

- The property description may or may not be present.
    
- The property price cannot be reassigned once initialized.
    

This provides flexibility while still maintaining strong typing.

## Nested Objects

Objects often contain other objects. TypeScript allows nesting types to reflect hierarchical data.

Example: type Address = { city: string; zip: number }; type Customer = { id: number; name: string; address: Address };

This makes it possible to model real-world structures, such as a customer with an embedded address. TypeScript ensures that deeply nested properties also follow the defined rules.

## Index Signatures

Sometimes the exact property names of an object are not known ahead of time. Index signatures allow objects with dynamic keys.

Example: type StringDictionary = { [key: string]: string }; const settings: StringDictionary = { theme: "dark", language: "en" };

Here, any property key of type string is valid, but its value must be a string.

## Methods in Objects

Objects can also include functions as properties, referred to as methods. By typing methods, TypeScript ensures that the function signatures remain consistent.

Example: type Calculator = { add(a: number, b: number): number; subtract(a: number, b: number): number };

const calc: Calculator = { add(a, b) { return a + b; }, subtract(a, b) { return a - b; } };

This approach combines data and behavior in one object.

## Union and Intersection with Objects

TypeScript supports advanced features like unions and intersections for object types.

- **Union types** allow an object to be one of several possible shapes. Example: type Shape = Circle | Rectangle
    
- **Intersection types** combine multiple object types into one. Example: type Employee = Person & Worker
    

These tools make object modeling more expressive and reusable.

## Comparison Table: Object Features in TypeScript

|Feature|Description|Example Use Case|
|---|---|---|
|Type Annotations|Define the shape and type of object properties|User object with id, name, and isAdmin|
|Optional Properties|Mark properties as not always required|Product description that may be missing|
|Readonly Properties|Prevent modifications after initialization|Immutable configuration settings|
|Nested Objects|Model hierarchical data structures|Customer with address details|
|Index Signatures|Allow dynamic property keys with defined value types|Language dictionaries, configuration maps|
|Methods in Objects|Functions defined inside objects with strict signatures|Calculator object with add and subtract methods|
|Union Types with Objects|Object can follow one of several defined shapes|Shape as Circle or Rectangle|
|Intersection Types with Objects|Merge multiple types into a single composite object|Employee combining Person and Worker attributes|

## Best Practices

1. Use **interfaces or type aliases** to clearly describe object shapes.
    
2. Prefer **readonly** where immutability is important.
    
3. Use **optional properties** only when necessary to avoid incomplete data issues.
    
4. Consider **index signatures** carefully, as they can weaken type safety if overused.
    
5. Apply **unions and intersections** to model flexible yet structured object relationships.
    

## Conclusion

Objects are a fundamental part of TypeScript, and the language extends their capabilities with static typing, optional and readonly modifiers, nested structures, and advanced type compositions. By working with objects effectively, developers can model real-world entities more accurately, reduce runtime errors, and improve code maintainability.

TypeScript’s support for objects strikes a balance between flexibility and safety, allowing developers to write expressive and reliable code while leveraging the dynamic power of JavaScript.

---
## Arrays
Tired of messy data? Want to organize your code and work with collections of information like a pro? This video is for you. We'll show you how to master TypeScript Arrays, the essential tool for grouping and managing your data. Get ready to level up your coding skills. Welcome! In this video, we're going to dive into the world of TypeScript Arrays. 

So what exactly is an Array? At its core, an Array is a special data structure that holds a collection of values. Think of it like a list of items. The key benefit of using Arrays is that they let you group related values together and then easily perform operations on them using built-in methods, which we'll explore shortly. Now that we know what Arrays are, let's look at how to create them in TypeScript. There are two main ways to declare an Array. The first is by using type annotation with square brackets. 

Here you simply add square brackets after the data type to indicate that it's an Array. For example, let numbers, number 1, 2, 3, 4, 5. Number 5 declares an Array named numbers that can only hold numbers. Similarly, let fruits, string, apple, banana, mango creates an Array for strings. The second method is using the generic Array type, which uses the syntax Array. This is an alternative way to achieve the same result. Instead of using square brackets, you write Array followed by the type inside angle brackets. 

For example, let numbers, array number 1, 2, 3, 4, 5 is equivalent to the first example. Both of these methods work perfectly, so you can choose whichever syntax you prefer. Once you have an Array, you'll need a way to access the individual elements within it. You do this by referencing their index. Important! In TypeScript and most other programming languages, the indexing of an Array begins at 0. This means the very first element is at index 0, the second is at index 1 and so on. 

For example, to get the value 42 from our sample Array, you would access Array name2, since 42 is the third element in the Array and its index is 2. Finally, let's look at some of the most common and powerful built-in Array methods. Push adds one or more elements to the end of an Array. Pop removes the last element from an Array. Sort sorts the elements of an Array in place and returns the sorted Array. Concat merges two or more Arrays and returns a new Array. IndexOF finds the first index at which a given element can be found in the Array or returns negative one if it's not present. 

Slice returns a shallow copy of a portion of an Array into a new Array. Join joins all elements of an Array into a single string. Shift removes the first element from an Array. Splice changes the contents of an Array by removing or replacing existing elements and or adding new elements in place. Unshift adds one or more elements to the beginning of an Array. These methods give you the flexibility to easily manipulate your Array data. Thank you for watching. 

I will see you in the next video.

## Read-only Arrays and Tuples
Want to write safer, more predictable code? In this video, we'll show you how read-only arrays and tuples in TypeScript can prevent accidental changes, making your data immutable and your programs more reliable. Stay tuned to see how a simple keyword can save you from a lot of bugs. Today, we're diving into a powerful feature in TypeScript – read-only arrays and tuples. The core concept here is immutability. This means once you define a read-only array or tuple, its elements cannot be added, removed or changed. Think of it like a photograph. 

You can view it as many times as you like, but you can't alter the image itself. This is similar to how you might have read-only properties in an object. The main benefit? It's a simple, effective way to prevent accidental data changes in your code, which can help you avoid bugs and make your programs more predictable. So how do you actually declare a read-only array? The syntax is straightforward. You just add the read-only prefix right before the array's type declaration. 

As you can see in the example, we have let numbers read-only number 1, 2, 3. This tells TypeScript that numbers is an array of number types. And it can only be read, not modified. If you try to add a new number or change an existing one, TypeScript will throw a compile-time error, stopping you before you can even run your code. The concept applies to tuples as well. A tuple is a fixed-size array where each element can have a different type. To make a tuple read-only, you simply use the read-only prefix before the tuple type itself. 

Here, we define a type read-only tuple as a read-only tuple with a string, another string and a number. Then we create a variable person with this type. Just like with arrays, any attempt to change an element in this person and tuple will result in a TypeScript error. TypeScript also provides a few alternative ways to achieve the same thing, which you might see in different codebases. You can use the read-only type utility type or the read-only array type generic type. For example, type A read-only string and type B equals read-only. Array string are both valid and do the exact same thing. 

They create a read-only array of strings. They both prevent any modifications. These are just different stylistic choices and it's good to be familiar with all of them. And just as with arrays, there is an alternative syntax for read-only tuples. You can use the read-only utility type with a tuple type inside of the angle brackets. In this example, type C equals read-only number string. Number achieves the same result as using the read-only prefix. 

It's just an alternative declaration style and it carries the same restriction. The tuples elements cannot be changed after creation. Thank you for watching. I will see you in the next video.

## Need for Enums
Tired of using a bunch of disconnected constants to manage your data? What if I told you there's a better, safer and cleaner way to handle fixed sets of values in TypeScript? In this video we're diving into enums, the simple solution that will make your code more readable and bug free. Let's get started. Before we get to enums, let's look at how we often handle this in plain JavaScript. We usually use constants to store values. For example, if we need to track the status of a network request, we might declare constants like this. 

Const status loading equals loading const status stopped stopped. While constants are great because they protect our values from being changed, they still require us to declare each value separately. This can get repetitive and a bit messy. This is where TypeScript's enums come in. An enum is a special data type for a fixed set of named identifiers. Think of it as a way to group related constants under a single name. Let's look at a simple example with directions. 

Notice we didn't assign any values. By default, enums are auto-assigned numerical values, starting at 0. So direction up is 0, down is 1, and so on. Enums also have three major benefits. They reduce repetitive code by grouping related values. They create read-only properties, ensuring that these values can't be accidentally changed. Auto-assigned identifiers. 

This feature simplifies the creation of enums, making the code cleaner and less repetitive. Auto-increment in enums. Like we just discussed, the default behavior of enums is to auto-increment. The first value starts at 0 and the rest increment by 1. If you don't want to start at 0, you can start from a custom number. Enums aren't just for numbers. They can also store strings, which can be very useful for improving readability and working with external systems like databases. 

Let's say we have different user roles. Instead of using numbers, we can define a string enum. This makes the code much more readable, as roles.admin is more descriptive than roles.1. It's also great for syncing with database values. Now let's see how enums work with other typescript types. A common use case is to restrict the values of a property in an object. Let's start with a person type. 

By defining the role as roles, we are telling typescript that this property can only accept one of the values from our role's enum. roles.admin, roles.author or roles.editor. Now when we create an object of type person, we must use a valid enum value for the role property. If we try to assign a value that isn't in our role's enum, typescript will throw an error, preventing bugs and making our code more robust. Typescript also allows for heterogeneous enums, where you can mix numbers and strings. While this is possible and gives you a lot of flexibility, it's a less common practice. Most of the time, you'll want to stick to either a number-only or string-only enum for clarity. Thank you for watching, I will see you in the next video.

## Enums vs. Objects
Ready to write cleaner, faster code? In this video, we'll break down the differences between normal enums, const enums and objects as enums. You'll learn which one is the best for your project and why your choice can have a huge impact on your code's performance and readability. Stick around and let's level up your coding skills. Let's start with the basics. Enums or enumerations allow us to define a set of named constants. They make our code more readable and prevent errors. 

A normal enum, when compiled, creates a full JavaScript object. This means it exists at runtime and can be iterated over, which might be useful in some scenarios but it also adds to the bundle size. On the other hand, a const enum is optimized during compilation. It's compiled only if used and it includes only the referenced values, not the full object. This is a key difference that leads to some significant performance and size benefits. Look at the example code. We define a direction enum and an edirection const enum. 

Both achieve similar results in terms of defining constants. But their compiled output is quite different. So why should you lean towards const enums? Avoids creating unnecessary objects in JS. As we just discussed, normal enums compile into full JavaScript objects. Const enums, by inlining their values directly where they are used, avoid this runtime overhead. This means less code to parse and execute. 

Useful for large enums to save memory. For applications with many enums or very large enums, using const enums can significantly reduce the memory footprint. Because they are inlined, they don't occupy memory as distinct objects at runtime. Same runtime behavior for used values. Despite their compilation differences, const enums behave exactly the same as normal enums when you're actually using their values. So you get the performance benefits without sacrificing functionality or type safety. Objects can mimic enums when declared as const. 

By defining a const object with key value pairs, you create a structure that functions very similarly to an enum for defining a set of related constants. This makes all properties read-only. When you declare an object with const, you can't reassign the object itself. And critically, by using the i as const assertion at the end of the object definition, as shown in the example code, TypeScript infers the literal types for the properties, making them truly read-only. Prevents accidental modification of values. This read-only nature is a huge benefit. It ensures that once you've defined your constant values, they cannot be accidentally changed later in your code, leading to more robust and predictable applications. 

Take a look at the example, const o direction, George, up, 0, down 1, left 2, right 3, as const. The as const assertion is what makes the magic happen here, telling TypeScript that the values are literal and immutable. This is a common and effective pattern in modern TypeScript. To summarize everything, let's look at this comparison table. It clearly lays out the differences between normal enums, const enums, and const objects used as enums. Runtime object. Normal enums and const objects both exist as full objects at runtime. 

Const enums, however, do not. Their values are inline during compilation. Meaning no, for a full runtime object, only the used values exist. Type safety. All three options offer excellent type safety, a core benefit of TypeScript, ensuring you're using valid values. Read-only props, normal enums, and const enums inherently have read-only properties. For const objects, you achieve read-only properties by using the as const assertion. 

Memory footprint. Here's where const enums truly shine. They have a significantly lower memory footprint compared to normal enums and const objects because their values are inlined, avoiding the creation of runtime objects. Thank you for watching. I will see you in the next video. 

## Computed Enums
Do you ever find yourself struggling to manage different permissions or states in your code? In this video, we're going to dive into enums and see how you can use them to define, combine and manage constants in a way that makes your code cleaner and more powerful than ever before. Enums or enumerations are a great way to define a set of named constants and they can hold different types of values. By default, enums have auto-incremented values starting with 0, 1, 2 and so on. You can also assign literal string values which makes the code more descriptive. For example, using up or down is often more readable than using a number. Finally, you can use computed values. 

These are values that are calculated by combining other enum values. Using computed values makes your code more explicit and much more reusable as you can define complex relationships between your constants in a clear way. Let's look at an example with an access permission enum. We've defined read with the value of 1 and write with the value of 2. We then create a read-write member and its value is computed by adding the read and write values together. The result is 3. This expressive syntax immediately tells anyone reading the code that read-write permission is a combination of both read and write permissions which makes the code much more readable. 

While using addition works, a more powerful and common way to combine numeric enum values is with a union represented by the vertical bar or pipe symbol. This is especially useful for bitmasking. In this example, we define an all permission. Its value is a union of read-write and delete. The bitwise OR operation combines their values resulting in 7. This single number efficiently represents a unique combination of all these permissions. When we run this code, console.log accessPermission.readWrite will output the value 3 as we expect. 

When we log accessPermission.all, we get 7. The important thing to understand is that both read-write and all are bitwise combinations of individual permission flags. This is a very efficient and common pattern in programming to manage multiple permissions or states within a single number. Thank you for watching. I will see you in the next video.

## Enums as Unions and Types
Feeling lost in a maze of numbers and strings? In this video, we'll show you how to use enums as types to make your code safer and more readable, preventing invalid inputs and common bugs before they even happen. Enums can be used as a type to define strict values for properties. In this example, we have a shape-kind enum with members circle and square that hold string values. We then create a circle type. Notice that its kind property is explicitly set to the shape-kind circle enum member. This use of enums provides powerful type safety, ensuring that only valid enum values can be assigned, which helps prevent bugs. 

Here's another example showing type safety in action. We've defined my circle to be of type circle. Because of our type definition on the first slide, its kind property must be shape-kind dot circle. If we try to assign shape-kind dot square to it, TypeScript immediately throws an error. This is a powerful feature that prevents you from creating invalid object definitions and catches common mistakes during development, long before your code ever runs. When you use an enum as a type, it becomes a union of its members. This is a key concept. 

For example, our shape-kind enum, when used as a type, is essentially the same as saying circle or square. This union behavior is incredibly useful for function parameters, as it allows you to choose only one valid value from the enum at a time. The function shown here, printShape, expects a parameter of type shape-kind, ensuring that the passed-in value is one of the valid enum members. Now let's see this in action. The printShape function's parameter is restricted to shape-kind values. Passing a valid member like shape-kind dot a circle or shape-kind dot a square works perfectly fine. However, trying to pass the entire enum itself, shape-kind, is invalid. 

The parameter expects a specific value, not the whole set of values. The code will throw an error, which is exactly the behavior we want. This strict type checking prevents incorrect usage of the function. Thank you for watching. I will see you in the next video.