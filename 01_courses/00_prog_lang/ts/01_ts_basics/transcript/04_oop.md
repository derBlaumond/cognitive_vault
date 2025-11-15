## Introduction to Classes, Properties, and Methods
Think of a class like a blueprint for building houses. Once you have the design, you can build as many houses as you want. In programming, classes work the same way. They define structure and behavior for objects. A class is a template that groups together data and behavior. The data is stored in properties and the behavior is defined in methods. This makes our code more structured, reusable, and clear. 

Here's how we define a class in TypeScript. The class name represents the entity, like Person. Inside it, we define properties such as name and age. And we can also add methods like greet, which perform actions using those properties. This combination of data and behavior is what makes classes powerful. A class is not just structure. It's also a type. 

TypeScript ensures that when we create objects, they follow the rules of the class. If we try to add extra properties or use incorrect types, TypeScript raises errors. This enforcement keeps our code consistent and reliable. Once a class is defined, we can create objects from it. For example, if we create a new Person object and assign name as Alice and age as 25. Calling the greet method prints, Hello, my name is Alice. Objects are just real instances of the blueprint. 

Properties are the variables inside a class that represent the state of an object. For example, in a car class, properties like model and year describe the details of each car. We can assign them specific types, like string or number, and even give them default values. Whenever we want to access a property, we use the this keyword. For example, this dot model. Think of properties as the attributes that make each object unique. Methods define the actions or behavior of a class. 

They are functions inside the class that can use and manipulate its properties. For instance, in a calculator class, a method like add can take two numbers and return their sum. Methods not only improve reusability, but also bring functionality to our objects. If properties describe what an object is, methods describe what it can do. Thanks for joining in. Hope to see you soon. Until then, keep learning and exploring.

## Access Modifiers, Static, and Readonly Members
Imagine giving everyone in your company the master key to every room. Chaos, right? In coding, access control is just as important. In this session, we'll explore access modifiers, static, and read-only members in TypeScript. Access modifiers define how visible a class property or method is. Static means it's open to everyone, inside the class, outside, and even through objects. Private means it's hidden inside the class. 

Only that class can access it. Protected means it's available in the class and also in its child classes, but nowhere else. This control helps us enforce encapsulation and secure our code. Let's see how this works in practice. In a vehicle class, a public property like Brand can be freely accessed from anywhere. A private property like EngineNumber stays hidden within the class. A protected property like Wheels can be used by subclasses such as Car or Bike, but not by outside objects. 

This way, we decide what to expose and what to protect. Static members belong to the class itself, not to its objects. Think of them as shared utilities. For example, a static constant like pi, or a static method like AreaOfCircle. To use them, we don't create an object. We call them directly through the class name, like MathUtil.AreaOfCircle. Static members are perfect for constants, helper methods, or values that should be the same across all objects. 

Read-only members are properties that can only be assigned once, either at declaration or in the constructor. For example, a car's VIN number is unique and should never change. By marking it as readonly, TypeScript ensures it stays constant. If we try to reassign it later, the compiler throws an error. This makes read-only members ideal for IDS, configuration values, or any property that must remain fixed. Thanks for joining in. Hope to see you soon. 

Until then, keep learning and exploring.

## TypeScript Classes

In TypeScript, classes give developers a structured way to model objects. They combine properties (to hold data) with methods (to perform actions). For instance, a Car class might include properties such as brand and speed, along with methods like accelerate() or brake(). Every object (or instance) created from the class inherits these features, making code more organized and reusable.

### **Access Modifiers, Static, and Readonly**

TypeScript provides **access modifiers** to manage visibility of class members:

- **public** (default): can be accessed anywhere.
    
- **private**: limited to the class itself.
    
- **protected**: available inside the class and any subclasses.
    

These rules enforce encapsulation and help protect sensitive data.

**Static members** belong to the class as a whole rather than to individual objects. For example, a static property might keep count of how many objects have been created.

**Readonly members** are initialized once either at declaration or inside the constructor—and cannot be reassigned. They are useful for values like IDs or constants that should remain fixed.

### **Constructors and Methods**

A constructor is a special method that executes automatically when an object is instantiated, setting up its initial properties. Methods describe the behavior of the object, such as performing calculations, updating values, or returning results. Together, constructors and methods define how objects are created and how they behave.

### **Getters and Setters**

Direct property access is not always ideal. Instead, TypeScript allows the use of **getters** and **setters**:

- **Getter** methods provide controlled, often formatted access to property values.
    
- **Setter** methods manage updates, adding validation or restrictions before applying changes.
    

This ensures better data protection and a cleaner interface for class usage.

### **Static Properties and Methods**

In addition to instance-level behavior, classes can define static properties and methods. These are tied to the class itself, not to its objects. For example, a Math class could include static methods like add() or multiply(), which can be called directly without creating an object.

Static members are especially handy for utility functions, shared resources, or managing global information across all instances.

- **Summary Table**

|**Concept**|**What it is**|**Example**|
|---|---|---|
|Class|Blueprint for objects|class Car { }|
|Property|Holds Data|Brand: string|
|Method|Defines Behavior|drive( )|
|Constructor|Initializes an object|constructor( name: string )|
|Access Modifiers|Control Visibility (public, private and protected)|private age: number|
|Readonly|Immutable Property|readonly id:number|
|Static|Belongs to Class, not instance|Car.count|
|Getter|Controlled read access|get fullName( )|
|Setter|Controlled write access|set age(val)|

- **Conclusion**

Classes in TypeScript bring structure and clarity. With constructors for creation, methods for behavior, modifiers for safety, and static features for shared logic, they allow developers to build applications that are both robust and maintainable.

## Inheritance Basics and the extends Keyword
Imagine a family. Children naturally inherit traits from their parents. In programming, inheritance works the same way. A child class can inherit properties and methods from a parent class, saving us time and effort. In TypeScript, inheritance means one class acquires the properties and behavior of another. The class that provides these features is the parent class. The class that inherits them is the child class. For example, we can create a user class with common features like name and email. Then, an admin class can inherit these features instead of rewriting them. This avoids duplication and ensures consistency. 

Remember, TypeScript only supports single inheritance. So a child class can extend just one parent at a time. Why is inheritance important? Because it prevents code repetition. Without inheritance, if both user and admin classes had the same fields, we'd need to maintain them in two places. If one changes, we must update both, which is error-prone. With inheritance, we place those shared fields in the user class. The admin class then extends it and automatically inherits everything. This way, updates in one place reflect everywhere. So inheritance keeps our code clean, structured, and less buggy. 

In TypeScript, we use the extends keyword to create inheritance. Let's check the code. Here, admin gets both name and email from user, and also has its own property role. The child class cannot only reuse everything from the parent, but also add new properties or override methods if it needs different behavior. This makes inheritance powerful. It lets us reuse code while still allowing flexibility and customization. Thanks for joining in. I will see you in the next one. Until then, keep learning and exploring.

## Inheritance in TypeScript

### **Basics of Inheritance and extends Keyword**

Inheritance in TypeScript lets one class derive from another, reusing existing code while introducing new functionality. This is achieved with the **extends** keyword. For example, a Student class can extend a Person class, automatically receiving its properties and methods. This avoids duplication and makes the codebase easier to maintain.

### **Using super in Single Inheritance**

When a child class inherits from a parent, it can call the parent’s constructor using the **super** keyword. This ensures the parent’s fields are set up correctly before adding new ones. For instance, if Person has a constructor for name and age, the Student class can call super(name, age) and then assign its own properties such as grade.

**Method Overriding and Multi-level Inheritance**

Child classes can **override** methods from their parent to provide specialized implementations. For example, a Teacher class might redefine the introduce() method from Person to include subject details. TypeScript also supports **multi-level inheritance**, where one class extends another, which itself extends a third (e.g., Person → Student → GraduateStudent ). Each layer can refine or extend the behavior further.

### **Access Modifiers in Inheritance**

Access modifiers control visibility when classes are extended for data protection and reusability:

- **public**: available everywhere, including child classes.
    
- **protected**: accessible in the class itself and its subclasses, but not externally.
    
- **private**: confined only to the class where it is declared; not inherited.
    

- **Summary Table**

|**Use Case**|**Without Casting**|**With Casting**|
|---|---|---|
|extends|Creates a child class from a parent class|class Student extends Person|
|super|Calls parent constructor or methods|super(name, age)|
|Method Overriding|Redefines parent methods in a child class|introduce() in Teacher|
|Multi-Level Inheritance|Inheritance across several levels|Person → Student → GraduateStudent|
|Access Modifiers|Control member visibility|public, private, protected|

### **Conclusion**

Inheritance in TypeScript makes code more organized by reusing parent class features. With extends and super, developers can implement single or multi-level inheritance. Method overriding provides flexibility, while access modifiers control data visibility. Together, these features enable structured, reusable, and maintainable programs.

## Abstract Classes and Abstract Methods
Some classes are never meant to be used directly but serve as blueprints for others. That's where abstract classes and abstract methods come in. An abstract class is a special kind of class that cannot be instantiated on its own. Instead it acts as a base class or blueprint for other classes. It can contain normal methods with implementation but also abstract methods that have no body and must be defined by subclasses. This ensures that child classes follow a consistent design. An abstract method is declared using the abstract keyword inside an abstract class. 

Unlike regular methods, it has no implementation in the base class. It's just a declaration. Child classes that extend the abstract class are required to provide the actual implementation. This enforces a rule, if a method is essential for every subclass, then all subclasses must define it. Let's highlight the key points about abstract classes and methods. Abstract classes cannot be used to create objects directly. Abstract methods must always be implemented by subclasses. 

They provide a kind of contract, a guarantee that child classes will follow a certain design. This encourages consistency and enforces good design practices across related classes. Thanks for joining in. I will see you in the next one. Until then, keep learning and exploring.

## Abstract Classes and Interfaces

### **Abstract Classes and Abstract Methods**

Abstract classes in TypeScript act like **blueprints** for other classes. They cannot be used to create objects directly. An abstract class can include normal methods with code as well as **abstract methods** that only declare a signature but leave the implementation to subclasses. For example, an abstract Shape class could declare an area() method, while subclasses like Circle or Rectangle would supply their own formulas.

### **Implementing Abstract Classes in Practice**

When a subclass inherits from an abstract class, it automatically reuses the common functionality defined in the parent while also being required to provide its own code for any unimplemented methods.

Take an Employee abstract class: it might include a fully defined method like getDetails() for common employee information, while declaring calculatePay() as abstract. Subclasses such as FullTimeEmployee and PartTimeEmployee can then add their own calculation rules while reusing the shared logic.

### **Using Interfaces for Multiple Implementations**

Interfaces specify the structure a class must adhere to, ensuring it provides the required properties and methods.

Unlike abstract classes, a class can implement **more than one interface**, allowing multiple behaviors to be combined. For example, a Printer class could implement both Printable and Scannable, ensuring it supports both printing and scanning functionality.

### **Difference Between Abstract Classes and Interfaces**

**Abstract classes** are suited for situations where related classes should share common logic while still requiring certain methods to be customized.

**Interfaces** are useful when different, possibly unrelated, classes need to follow the same contract or when a class must take on multiple roles.

### **Comparison Table**

|**Feature**|**Abstract Class**|**Interface**|
|---|---|---|
|Instantiation|Cannot be Instantiated|Cannot be Instantiated|
|Methods|Can have both implemented and abstract methods|Only method/property declarations (no implementation)|
|Inheritance|A class can extend one abstract class|A class can implement multiple interfaces|
|Purpose|For shared behavior with enforced customization|For flexible contracts across different classes|
|Example Use|Employee with calPay()|Scannable for devices|

### **Conclusion**

Abstract classes provide reusable structure with partial implementation, while interfaces enforce consistent rules across classes. Used together, they help build TypeScript applications that are both organized and flexible

## Declaring Interfaces and Structural Typing
Have you ever wondered how TypeScript ensures your code is reliable and organized, even before you run it? Today, we'll explore a concept central to this strength, declaring interfaces and structural typing. Let's discover how these features help us build safer and more maintainable code. Interfaces in TypeScript give us a powerful way to define what objects should look like. They act as blueprints, making sure our code remains consistent and free from unexpected surprises, which ensures type safety. With interfaces, we can describe which properties and methods an object should have, without worrying about how those features are implemented. Think of it as setting expectations up front, for both the code and the developer. 

Interfaces come with a rich set of features. They allow us to specify which properties are required, optional, or even read-only, offering flexibility while maintaining structure. Beyond just properties, we can use interfaces to set expectations for methods or function types. Another strength is that interfaces support extension or inheritance, making it easy to build more complex contracts by reusing or refining existing ones. Ultimately, interfaces serve as solid contracts within object-oriented design, promoting reliability and clarity. One distinguishing aspect of TypeScript is its use of structural typing, sometimes called duct typing. The compatibility of this typing is based on properties and not names. 

But what does that really mean? Instead of focusing on names, TypeScript cares about the shape of an object. If two objects have the same structure, they're treated as compatible, no matter what they're called. This flexibility allows developers to work more efficiently, especially in collaborative or rapidly changing environments. How do interfaces compare to other constructs? When we look at classes and interfaces, the difference is clear. Interfaces provide structure, while classes add implementation on top of it. 

As for type aliases, interfaces are more extensible, making them well-suited for object-oriented programming. Type aliases, meanwhile, offer flexibility, especially when handling union or tuple types. Knowing which construct to use can make a big difference in code organization. Why is all this important? Using interfaces and structural typing encourages clear and predictable code design. TypeScript boosts both maintainability and readability, allowing teams to collaborate more effectively. Most importantly, TypeScript's approach catches issues early at compile time, preventing bugs before they appear in production. 

For scalable and robust applications, these tools are essential object-oriented programming in TypeScript. Thank you for joining in on this journey into interfaces and structural typing. These concepts are powerful allies in any TypeScript project, paving the way for better code and smoother teamwork.

## Inheritance in TypeScript

### **Basics of Inheritance and extends Keyword**

Inheritance in TypeScript lets one class derive from another, reusing existing code while introducing new functionality. This is achieved with the **extends** keyword. For example, a Student class can extend a Person class, automatically receiving its properties and methods. This avoids duplication and makes the codebase easier to maintain.

### **Using super in Single Inheritance**

When a child class inherits from a parent, it can call the parent’s constructor using the **super** keyword. This ensures the parent’s fields are set up correctly before adding new ones. For instance, if Person has a constructor for name and age, the Student class can call super(name, age) and then assign its own properties such as grade.

### **Method Overriding and Multi-level Inheritance**

Child classes can **override** methods from their parent to provide specialized implementations. For example, a Teacher class might redefine the introduce() method from Person to include subject details. TypeScript also supports **multi-level inheritance**, where one class extends another, which itself extends a third (e.g., Person → Student → GraduateStudent ). Each layer can refine or extend the behavior further.

### **Access Modifiers in Inheritance**

Access modifiers control visibility when classes are extended for data protection and reusability:

- **public**: available everywhere, including child classes.
    
- **protected**: accessible in the class itself and its subclasses, but not externally.
    
- **private**: confined only to the class where it is declared; not inherited.
    

### **Summary Table**

|**Use Case**|**Without Casting**|**With Casting**|
|---|---|---|
|extends|Creates a child class from a parent class|class Student extends Person|
|super|Calls parent constructor or methods|super(name, age)|
|Method Overriding|Redefines parent methods in a child class|introduce() in Teacher|
|Multi-Level Inheritance|Inheritance across several levels|Person → Student → GraduateStudent|
|Access Modifiers|Control member visibility|public, private, protected|

### **Conclusion**

Inheritance in TypeScript makes code more organized by reusing parent class features. With extends and super, developers can implement single or multi-level inheritance. Method overriding provides flexibility, while access modifiers control data visibility. Together, these features enable structured, reusable, and maintainable programs.

