## Introduction to Decorators and Enabling Them
A quick question. How do you add logging or validation to many parts of an app without rewriting every class? That's where decorators help. In this session, introduction to decorators and enabling them will define what decorators are, how to turn them on in TypeScript, and why they make code cleaner and easier to maintain. Decorators are special declarations we apply with an at sign to enhance code. Think of them as a clean way to extend functionality without changing core logic. Instead of editing a method or class directly, the decorator wraps it, so shared concerns like logging or validation run consistently. 

Because they can be applied to classes, methods, properties, or parameters, the same pattern works across your codebase. You'll also hear the phrase, attach metadata or behavior. That's the key idea. The decorator adds information or actions around the original, while the original logic stays focused and readable. Let's focus on what makes decorators effective. They are built on functions that wrap or modify elements, so you can enhance behavior without rewriting core logic. Importantly, they are executed at design time, when a class is declared, and not when it runs. 

That means the structure and behavior are prepared up front, keeping runtime code lean. Together these traits support reusability and cleaner code. You attach a decorator once, and the improvement applies consistently wherever it's used. In practice, this gives you predictable setup, minimal duplication, and a clear separation between your core implementation and the extra behavior surrounding it. Decorators are an experimental feature in TypeScript, so they must be enabled in tsconfig.json. Turn on experimental decorators, set it to true, so the compiler recognizes decorator syntax. If you ever see build errors when using the add sign, this setting is usually the fix. 

Confirm the configuration is consistent in all environments, local, and continuous integration, so everyone compiles with the same behavior. Once enabled, you can add decorators confidently, and let the compiler guide you if anything is misapplied. There are four primary targets. First is class decorators, which can help modify or observe the class behavior, which is great for registration or setup. Second, method decorators, which helps in adding behavior to methods, such as logging inputs and outputs. Third, property decorators influence properties, for example, validating assignments or transforming values. And parameter decorators work with method parameters, letting you attach rules or hints right where the data enters. 

Knowing which type to use, class, method, property, or parameter, helps you place the enhancement exactly where it belongs. Decorators enable modular, reusable enhancements. Instead of scattering the same code everywhere, you apply one decorator and reuse it. They help simplify cross-cutting concerns like logging, validation, and authorization. So those concerns don't clutter business logic. This improves readability and maintainability, because each class and method stays focused on its job. Finally, decorators bridge object-oriented programming and metaprogramming in TypeScript, giving you a structured way to express policies and behaviors around your objects. 

That wraps our overview of decorators, what they are, how to enable them, the types of decorators, and why they matter. Thanks for learning with me today. Feel free to revisit these points as you start applying decorators in your projects.

## TypeScript Decorators

Decorators in TypeScript provide a flexible way to extend and customize the behavior of classes, their members, and properties. They serve as special functions that are applied with the @ symbol, giving developers a mechanism to attach additional logic without rewriting or scattering duplicate code.

By default, decorators are not enabled in TypeScript projects. To use them, developers must explicitly switch them on by setting "experimentalDecorators": true in the tsconfig.json file. Once enabled, decorators become available for use on classes, methods, and properties.

### **Common Use Cases for Decorators**

**1. Applying Class-Level Enhancements**

Class decorators are used when you want to influence the entire class rather than individual members.

For example, a system might require every new class instance to be registered in a central service. Instead of embedding this logic in every class constructor, a single decorator can handle the task automatically.

**2. Extending Method Behavior**

Method decorators intercept function calls inside a class. They are often used when developers need to add pre- or post-processing steps, such as logging inputs, timing execution, or checking permissions before a method runs.

By centralizing these concerns into a decorator, the actual method code remains clear and focused on its primary purpose.

**3. Adding Rules to Properties**

Property decorators allow developers to apply specific rules to class fields. A common example is making a property immutable after initialization. Instead of adding checks in multiple places, the decorator ensures the rule is enforced consistently.

Property decorators can also attach metadata that frameworks later use for reflection or data validation.

**4. Practical Example: Centralized Logging**

One of the most valuable real-world applications of decorators is logging. In medium to large applications, keeping track of how and when methods are executed is crucial for debugging and monitoring.

### **Comparison Table: When to Use Type Decorators**

|**Use Case**|**Without Decorators**|**With Decorators**|
|---|---|---|
|Enhancing entire classes|Manual registration or setup code|Automated handling at class level|
|Adding behavior to methods|Logging and checks repeated everywhere|Single decorator applies rules across methods|
|Enforcing property constraints|Custom validation logic spread in the code|Centralized rule applied consistently via decorator|
|Implementing logging|Mixed with business logic|Cleanly separated into reusable decorator functions|
|Managing dependencies|Manual wiring of services and resources|Automated injection through decorators|

### **Best Practices and Considerations**

Use decorators to extract cross-cutting concerns from the main logic, keeping code modular and readable.

Limit the number of decorators in a single class or method; overuse can make the flow harder to follow.

Keep decorators generic so they can be reused across different classes and modules.

Reserve decorators for tasks that clearly benefit from centralization, such as logging, validation, or dependency injection.

### **Conclusion**

Decorators provide a structured way to extend and manage behavior in TypeScript applications. Whether applied to entire classes, individual methods, or specific properties, they help separate concerns like logging, validation, and dependency management from the core business logic.

When applied carefully and in moderation, decorators become a valuable tool for building scalable and well-structured TypeScript applications.

## Type Inference and Strict Type Checking
A quick check. Have you noticed the editor guessing types even when you do not write them? Today's topic is type inference and strict type checking. We will define type inference, see how it works across your code, then connect it to strict type checking for safer, more predictable programs. What is type inference? It is the compiler identifying the type for you. That means fewer annotations, while the tool still ensures type safety without extra effort, which makes code more clean and easy to write. Think about where this shows up. It works for variables, functions, and return types, letting you write concise code without losing safety. The benefits of inference are clear. Cleaner declarations and fewer mistakes from mismatched types. Because the compiler does the heavy lifting, it improves developer productivity. You focus on logic and the types follow. 

Think of type inference as helpful automation. First, it ensures type safety without extra effort. The compiler learns the types from your code and flags mismatches while you stay focused on logic. Second, it works for variables, functions, and return types, so intent is clear across declarations, parameters, and results without constant annotations. And third, it improves developer productivity. Less boilerplate to write, fewer types to maintain, and faster feedback as editors surface issues immediately. Strict type checking raises the bar on correctness. It includes checks like strict null checks and no implicit any, closing the gaps where bugs often hide. With these options on, the compiler alerts you when a value might be null or when a variable silently becomes any. The payoff is safer and more predictable code. You will detect errors at compile time before they slip into production. As you review settings, consider which parts of your project would benefit immediately from stricter checks, utilities, data models, or critical business logic. 

Strong typing is not just about rules. It is about quality and good maintainability of the good. These features encourage good coding practices by making intent explicit and consistent. They also help catch hidden bugs early, like unchecked nulls or accidental types. Together, inference and strictness keep codebases easier to maintain, less guesswork, clearer contracts, and faster feedback from the compiler. A quick reflection? Which warnings do you often ignore today that strict settings would surface reliably? That wraps our tour of type inference and strict type checking.

## Advanced Features in Typescript
Welcome to the session. A quick thought. How do we model complex data without losing safety? In advanced features in TypeScript, we'll explore union types, intersection types, type narrowing, and a special types overview, so your code stays precise and readable as it grows. Here we focus on union types. In TypeScript, you combine multiple possible types with the vertical bar operator, read as OR. So when you declare a union, you're telling the compiler exactly which options are allowed. 

This adds flexibility with type safety. You can accept varied inputs, yet the compiler still protects you from invalid operations. Think of a single value that can take multiple possible types. For example, a variable can be string or number. As you use a union, add a quick check to confirm which option you have, then write code for that case. The result is concise code that handles alternatives cleanly while staying type safe. Intersection types combine multiple types into one with the ampersand operator. 

The object must satisfy all included types, which makes them useful for mixing behaviors. For example, merging an employee with a manager role into a single lead profile. Think of intersections as building a richer contract from smaller, well-named parts. If any field is missing, the compiler flags it up front. This approach encourages composition. Combine focused types, then compose them where you need combined responsibilities, keeping both your models and your code reviews straightforward. Type narrowing makes code safer and more precise. 

As logic executes, TypeScript reduces possible types at runtime based on your checks. Use typeof, instanceof, or the in operator to refine the active shape before you access members. That way, when you read a property or call a method, the compiler has already verified it's valid for the current branch. A quick habit. Add a small guard, then let the narrowed type drive your next line. This keeps errors out of production and makes your intent obvious to future readers. A quick tour of four special types. 

Any disables type checking. Use it sparingly because mistakes slip through. Unknown is a safer alternative to any. You must narrow it before use, which protects your code. Never represents values that never occur, like a function that always throws, and it's handy for enforcing exhaustive checks. Void indicates no return value, clarifying that a function is called for its effect. Keep these definitions in mind as you design APIs. 

Prefer unknown over any, use never to model impossible paths, and reserve void for side effect functions. That concludes our look at union types, intersection types, type narrowing, and the special types that shape safe designs. Thanks for learning with me. Apply these patterns to keep your TypeScript code robust and maintainable.

## Type System Features

### **Type System Features in TypeScript**

TypeScript’s type system is one of its greatest strengths. It helps developers write safer, clearer code and catch mistakes long before runtime.

Unlike plain JavaScript, TypeScript allows us to describe the shape of data precisely, enforce consistency, and model complex scenarios. But the type system is more than just simple annotations - it offers advanced features like type inference, unions, intersections, narrowing, and special utility types.

### **Core Concepts**

### **Type Inference and Strict Checking**

TypeScript can often infer the type of a value without you explicitly declaring it. For example, assigning a number to a variable automatically makes it a number. This saves time and reduces redundancy. To take full advantage, strict mode can be enabled, which forces the compiler to be cautious and prevents hidden bugs. Together, inference and strict checking make TypeScript both convenient and safe.

### **Unions and Intersections**

In many cases, data can take on more than one form. Union types let a variable be one of several possible types, such as a string or a number. Intersection types combine multiple types into one, requiring a value to satisfy all of them at once. These tools are essential for modeling real-world inputs and outputs.

### **Type Narrowing**

Sometimes variables start as one of several possible types, but within the flow of code we can narrow them down. By checking conditions-like verifying if a property exists or using typeof - TypeScript updates its understanding of the variable’s type. This process, called control flow analysis, allows safe access to the correct properties at the right time.

### **Special Types: any, unknown, never, void**

TypeScript also provides special-purpose types:

- **any:** Turns off type checking for flexibility but reduces safety.
    
- **unknown:** A safer alternative to any; requires checks before use.
    
- **never:** Represents values that never occur, such as functions that always throw.
    
- **void:** Used for functions that don’t return a value.
    

These types handle edge cases but using them wisely is crucial for keeping code robust.

### **Practical Applications**

- **Unions and Intersections**: A function might accept either text or numbers (union), while an object may need to satisfy both “User” and “Admin” roles (intersection).
    
- **Narrowing in Action**: When dealing with objects of different shapes, narrowing ensures only valid properties are accessed.
    
- **Choosing Between Special Types**: any is useful for quick prototyping, but unknown is safer; never expresses impossible states; and void clarifies intent in functions that only perform actions.
    

### **Best Practices and Considerations**

·Keep strict mode on - it’s your safety net.

- Use unions and intersections to model real-world data rather than defaulting to any.
    
- Prefer unknown over any for uncertain values.
    
- Let inference work for you - avoid over-annotating.
    
- Use type guards (typeof, in, instanceof) to guide narrowing.
    

### **Conclusion**

The TypeScript type system offers far more than simple annotations. Features like inference, unions, intersections, and narrowing make it possible to capture complex scenarios in a safe way. Special types - any, unknown, never, and void - add flexibility when handling unusual cases.

When used effectively, these features make code easier to maintain, reduce bugs, and provide a smoother developer experience. In short, the type system is the foundation of TypeScript’s power, giving developers confidence that their code will behave as expected.