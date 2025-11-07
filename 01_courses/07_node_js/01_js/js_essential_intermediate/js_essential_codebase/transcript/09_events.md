### DOM events explained
 
- This headlamp has hidden features. In addition to just turning it on and off with the button, I can also change the brightness of the light by turning it on and then holding down the button. I can also change the type of light emitted if I rapid click the button. And when I click the button, it indicates how much battery is left on it. This is all possible thanks to event handling. Anytime a defined event happens, like the button being pressed and released, the program inside the flashlight detects that event, identifies what type of event it was and fires the corresponding program. So pressing and releasing the button is one event. It turns the light on and off. Another event is pressing and holding the button. It triggers the brightness level to change. Yet another event is pressing and releasing rapidly. It triggers mode changes. When we interact with computer software, we are literally firing events that are then detected and captured and handled by the software. Click on your mouse, and the click event is detected. Press a button on a keyboard and an event identifying what key was pressed and for how long it was pressed is captured. Each of these events and others like it can have their own custom functions attached to them specifying exactly what happens when the event is captured. This process is called event handling, and it is key to JavaScript interactivity. In this chapter, we'll look at event handling in JavaScript with a special focus on DOM events.

### Typical DOM events
 
- [Narrator] Everything that happens in the browser is an event. Opening the browser is an event, visiting a URL is an event, moving your mouse or clicking it or touching your screen is an event, scrolling is an event, clicking the back and forth buttons in the browser or reloading the document or hitting a key on your keyboard, anything and everything that happens in the browser is an event. And with JavaScript, we can listen for those events then capture them when they happen and do stuff when they are triggered. You can get a full breakdown of all available events in the MDN Event reference. Scrolling down this page you'll realize there are a lot of events you can monitor and any of these events can be monitored and when they are triggered you can do whatever you want as a result. Let me give you a basic example of what I'm talking about. In exercise files for this movie I've set up this very well designed web page that has very functional functions like when you move your mouse around you can see the X and Y coordinates of the mouse in relation to the window, when you harbor your mouse inside the rounded corner box here that changes color and if you go to the button and click on it it also changes color. And if you go and look at the console, you can also see when you click the button it tells you how many times the button has been clicked. Very cool. Now, all of these is powered by event listeners. In the code for this example you'll see I'm using several different event listeners to listen for different events. And this here at the top is a good example of what an event listener looks like. First, we find an element that we want to listen to, an event for, in this case the button. And the button is the button you see in the middle, it's the elements that has the class CLA button. So, we grab the button element and then we say, add an event listener to this element then we have to specify what event we are listening for, in this case click and when that event occurs we can call a callback function. That function sits inside the event listener at this time as an arrow function. And this arrow function does two things, first, it grabs the button element, the classList property and toggles the active class on or off then it console logs out the text the button was clicked. That's why when I click this button here we are toggling a class on and off and that class changes the color of the button. An event listener can be appended to any element within the window or the Document Object Model. So, down here I have appended an event listener to the window object itself, that means everything that is happening inside the browser window and then I say, "For this entire window, add an event listener and trigger it anytime the mouse moves." When the mouse moves, trigger the function mouse position, the function mouse position sits up here and it captures the entire event then it grabs just the event pageX property and pageY properties and put their values of those into the inner text of posX and posY. That's what you are seeing down here, that's why we can see this value update when I move my mouse around. Now, if I open my console again and we can go in and just dump out the entire events, so I'll just console logout event, this event argument is automatically passed into the callback function by an event listener. So, when I save this and output it you'll see when I move my mouse around, whoa, a lot of stuff happens here. So, let's open one of this event objects. So, these event object gives me all the information I need about the current event that was triggered. So, here you can see that we have, let's see, clientX and clientY and we also have layerX and layerY. So, there are many different things, pageX and pageY. I think I'm tracking PageX and PageY, yeah. That's because those are the coordinates for where the mouse pointer is inside the event window, but you can also see there is a tone of other information here we could pull out if we wanted to. So, this event object contains absolutely all available information from the browser about the event you are tracking and then you can take anything from that object and use it if you want to. Scrolling further down we have two more event listeners. These are monitoring the container and the event lister is looking for the mouseenter and mouseleave events. This are pinned to the big blue container here. So, when I enter the container with my mouse the first event listener is triggered, the one that tracks mouseenter and when I leave the container, mouseleave is triggered. Now, if you look closely, you'll see this actually depends to the event itself. So, I have rounded corners here, I'm outside the rounded corner, only when I go inside this will get triggered. So, this is a detailed event listener that really does listen to whether I'm inside or outside the current event. What I want you to take away right now is the following: everything that happens in the browser is an event and you can monitor any of those events by adding an event listener and listening for them. Event listeners can be appended to any element inside the window and inside the DOM and you can trigger whatever function you want either using an anonymous function inside the event listener or by using a callback. And if you use a callback or an anonymous function, you can grab the event object and do something with that event object if that is meaningful in the current context.

### Event listeners
 
- [Instructor] An EventListener is exactly what it sounds like: A method added to a target, usually an element, that listens for a specific event and then calls back a function when that event is detected. In this code example, we have an EventListener appended to a button. When the button is clicked, we log an event in the console. So the structure of an EventListener is always the same. We start by grabbing an event target. This can be a window object or the document object or any element within the dom. Next, we add an EventListener with the addEventListener method. This method takes two main arguments. First, the event we want to listen to in quotation marks. This can be any of the events listed in the MDN events reference, and second, a callback function to run when that event is triggered. This can be either an inline anonymous function or a call to an external function. And remember, this is a callback function, so there's no parentheses at the end here. So we are actively calling the function into the EventListener and then running it inside the EventListener. There's also a third optional argument for an options object that gives you more control. Now, this is an advanced feature that's rarely used and falls well outside the scope of this course. Developers will often set this third argument to false to ensure default behavior takes place, but it's not strictly necessary. So in most cases, you can just set up a target and a callback and be done with it. If we look at a practical example, we can call in a button for example, here, and then we make the button the target. We add an EventListener to the button. We specify the event we want to listen to; in this case a click on the mouse, and then we fire some form of callback functions. So here, I'm capturing the event in the E and then console logging out to the event. Now, let's look at this in code to see how it all works. In the exercise files for this movie, you'll find our backpack packer site with the new expanded features we added in the challenge at the end of the previous chapter. There's only one new thing here. I've added a button with the class lid-toggle and the text Open lid. And if we go to the front end, you'll see the button sits under each of the backpacks. I'm going to click on the button, nothing happens. So this is where we want to use an EventListener. What I want to do here is create an EventListener that's appended to the button, and when I click the button I change the lid status from closed to open and back to closed again. Now the key to doing this is to make sure the EventListener is appended to each of the articles independently. And this code is set up so that we loop through each of the backpack objects in an array. And then we output a separate article for each of them. And that's done using this function here. Now the article itself sits inside the backpack article variable. So that's what we'll target throughout. Inside our loop, before we return the backpack article to the code to be output in the browser, I'll first look for the button. So I'll set up a new const called button, set it equal to, and then I'll grab backpackArticle. That's the entire article. And then I'll use querySelector inside that article. And I'm looking for the class lid-toggle. So that's the button up here. Now I can append an EventListener to this button. I want to listen for the click event. And when the click event occurs, I fire an anonymous arrow function. Here, I want to capture the event itself so we can see what it is. Set up an arrow function. And inside the arrow function we'll just console log out the event. Save that, go in the browser and open the console and click on the EventListener button and now, we fire an event and you can see every time I click it, we get a new event. Now, if we open the event object, you see there's a ton of information about the event here. What I'm looking for in particular right now is the path. The path gives me the dom path for the event that was triggered. So here we have the button. Then we have the article, main, body, HTML document. What I'm looking for is this one here: articlepack1. That's the ID for the current article. All I want to do is make sure I have two separate events. So if I scroll down and click the other event and open this again, scroll down, you'll see here we have articlepack2. So that means we have two separate EventListeners firing on two separate buttons. All right, now I want the button to do something. I want to change the text up here from open to closed and back to open. And we can use a turnery operator for that. But first, we need this element. So I'll set up a new const. Status. Set it equal to backpackArticle again, querySelector again. And then this time, we're looking for the L-I that has the class backpack_lid, and we're looking for the span inside that backpack_lid. So span. Then inside the EventListener, we'll say status.innerText === "open." So that's what we're testing for. And now we say, if that's the case, then we set status.innerText = "closed." Otherwise, or else, status.innerText = "open." All right, save that. Back in the browser, click on the button and watch up here on lid status. Click the button, it changes. Click the button, changes again. All right. So now our EventListener works and you can see an EventListener appended to a button can influence anything else in the dom. That's kind of the whole point. We now have complete control over everything that happens in the dom through an event that we are tracking ourselves.

### Practice: Experiment with event listeners
 
- There are so many different Dom events to listen to, and there is literally no limit other than your imagination to what you can do with an event listener when an event is triggered. In this practice example, I want you to just dive headfirst into event listeners and events to explore what events success, and what you can do with them. In the practice files, I've set up a grid for you to play around with. You can listen for events on the grid as a whole to individual cells in the grid, or just do something entirely different. It is entirely up to you. Nevertheless, here are some suggestions on what you can try out if you want to. Use an event listener to add CSS, either inline or through an added class to draw highlight around the entire grid when you hover over it and then take the highlight away when you move your mouse out. Add an event listener to each grid cell to highlight that cell when you hover your mouse over it. Or add an event listener to each grid cell to change its background color when you click on it. You can add an event listener to a specific key on the keyboard and change the background color of the whole page from dark to light and back again, or do something else. To get started and to get some ideas, I recommend visiting the MDN event reference page and looking for some specific events you want to test out. As an example, the key down and key up events allow you to detect what key is pressed and when that key is released on a keyboard.

### Advanced event listeners and "this"
 
- [Instructor] Now that our event listener is working, we need to expand its functionality a bit. For one thing, the button text needs to be updated to reflect what the button actually does. Right now, it says open lid when the lid is closed. And when I click on it, it also says open lid when the lid is open. So it should really say close lid when the lid is open and vice versa. Secondly, we need to update the property for lid status in the object itself. So if that object was living in a database, and we want to pass that object back into the database to change the status, we can do that. This serves as a good example to highlight an important issue when choosing whether to use an arrow function or a function declaration as the event listener callback. Let me show you what I mean. In our event listener here, we are targeting the button element and then adding an event listener to it. So if I want to change the text inside the button element, I can do so by simply calling the button element inside the event listener saying, innerText and set it equal to something else like changed. And save that. Go back in the browser and click the button once. And now it says changed. All right. So it works, that means we can copy this ternary operator below here and just apply it. So let me say, button instead. Copy that three times. So that we're targeting the button and then we'll say, and then instead of just saying open, we say open lid and close lid and open lid. And the funny part is it doesn't actually matter what order you do this in inside the listener operator. You can say close lid, open lid, close lid and it will work the same way. 'Cause all we're doing is looking at the existing string and then swapping it for something else. And effectively just toggling it back and forth. So if we go here and look at this now, if I click open lid when it's closed, it'll now say close lid when it's open and vice versa. Okay, so the logic here works. Now I mentioned this whole arrow function versus function declaration. Right now, we're using an arrow function. You see it right here. And you remember when we talked about arrow functions previously, I said arrow functions don't have their own this. That comes into play here because ideally, we should be able to say instead of button, just say this. So this innerText, meaning this object that we are currently interacting with, and then just do that across here. This innerText, this innerText and this innerText. And that should work in theory, right? We're inside an object. But if you look closely, you'll see when I do this, we get this grayed out text behind it because the browser is saying, probably actually working but we can try it. So let's open the console and click the button. And when I do so it says, "Cannot read property innerText of undefined." What's happening here is this arrow function doesn't have its own this. So it doesn't know what object we're pointing at when we're using this. So if we want to use this inside an event listener, we need to change it to a function declaration. So we say function and then take away the arrow. Save. And now, everything works again because now we are working inside a proper object that has this. So we are able to point at this. So why am I showing you this? Well, once we get more advanced, we need to have the ability to control whether we want to use this or not. So if you scroll up to the top of this file, I've also added a new function up here called lid toggle. And that's because when we start working with a lot of different things that are happening, it doesn't make any sense to have the entire function sitting inside the article generator. You want to separate the function out. So here we can see we have a function declaration called lid toggle. Inside, we first set up a new lead called backpack objects. Then we grab the backpack object array. That's the array that has all the backpack information. And we use the find method to find a specific element. Here, we want to find the ID inside all of those elements. And we want to see if that ID matches the ID of the parent element of the button we clicked. So the article down here will have the ID for the current element. And then we're using that ID here. So we say the button, the parent elements of the button, which is the article. Find the idea of that article then put that in this ID and use that idea to see if you can find an element in the array that matches. That will give us the object in question. Then we can say backpack object. That's the array object we just found then set lid open to true. And then we're using a ternary operator. Then we do the same thing down here. Here's the, this innerText that applies to the button itself. And then finally here, we have this parent element query selector and then the backpack lid span. So that is the text inside the backpack lid status. And this also is just the ternary operator we've been working with before. So we can use this function instead as a callback function. To do that, we'll go down to our event listener and just wipe out all the content in site. And in place of the anonymous function, I'll just put in the name of the function we want to call, which is lid toggle. Now, like I said in the previous movie, this is a callback function. So we're not putting the parenthesis at the end here. We are calling the function back into the event listener and then running it in the event listener. And that's why this statement up here still works because this function is now effectively part of the event listener down here thanks to the callback. Save this. Run it in the browser, click a button. Everything is working properly. So now we've effectively created an advanced event listener separated the callback function out into a separate function. And we are using a function declaration to be able to access the this keyword and point at the button element.

### This: A Deeper Dive
The this keyword in JavaScript has far broader uses than what its name and general examples suggest.

We encountered this when we discussed object constructors and classes. Here's our Backpack class for reference:
```js
class Backpack {
 constructor(
   // Defines parameters:
   name,
   volume,
   color,
   pocketNum,
   strapLengthL,
   strapLengthR,
   lidOpen
 ) {
   // Define properties:
   this.name = name;
   this.volume = volume;
   this.color = color;
   this.pocketNum = pocketNum;
   this.strapLength = {
     left: strapLengthL,
     right: strapLengthR,
   };
   this.lidOpen = lidOpen;
 }
 // Add methods like normal functions:
 toggleLid(lidStatus) {
   this.lidOpen = lidStatus;
 }
 newStrapLength(lengthLeft, lengthRight) {
   this.strapLength.left = lengthLeft;
   this.strapLength.right = lengthRight;
 }
}
```
Here, this is used to refer to the object the method is called on, so when the class is used to create a new object the code literally says "this object's name property is equal to the value of the name argument". This is a common use of this in JavaScript, but it's not the only one.

To simplify code, JavaScript allows you to chain multiple methods together when working with data. In the below example, the concat(), toUpperCase(), and trim() methods are chained together to modify a string:
```js
let greeting = "Hello";

greeting = greeting.concat(" World").toUpperCase().trim();

console.log(greeting); // Outputs: "HELLO WORLD"
```
Using the this keyword, you can enable method chaining in your own classes.

Here’s the Backpack class with two small modifications:
```js
class Backpack {
 constructor(
   // Defines parameters:
   name,
   volume,
   color,
   pocketNum,
   strapLengthL,
   strapLengthR,
   lidOpen
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
 }

 toggleLid(lidStatus) {
   this.lidOpen = lidStatus;
   return this; // Return the current object to enable chaining
 }

 newStrapLength(lengthLeft, lengthRight) {
   this.strapLength.left = lengthLeft;
   this.strapLength.right = lengthRight;
   return this; // Return the current object to enable chaining
 }
}

// Usage
const myBackpack = new Backpack("Hiker", 30, "blue", 5, 35, 35, false);
myBackpack.toggleLid(true).newStrapLength(25, 25);
```
Now both toggleLid and newStrapLength use this to return the instance after performing their actions, allowing for the methods to be called in a continuous chain.

The example above barely scratches the surface of what this can do, and also illustrates how quickly JavaScript can become complex. A good rule of thumb is to remember this always refers to the object the method is called on. And when you're ready to dive deeper (or this doesn't work as expected), refer back to the official documentation for help.

### Pass arguments through event listeners
 
- [Instructor] Working with the event listeners you'll often want to either access the event object inside the callback function or pass some argument through to the callback function. It's not immediately obvious how to do either when we are working with callback functions. So let's take a closer look. In the earliest example of an event listener, you may remember, I called in the event object as a parameter in the arrow function, and this is the answer to the first part of the question. You see, whenever you set up a new event listener and you have a callback function, the event object is automatically passed to the callback function as an argument, and we can choose to capture that object and use it in the callback function by setting up a parameter name for it. So in this case, I've set up the name event and then we use it down here. The passing of the events object happens automatically. And this is actually the answer to how to do it externally as well, because this entire thing here is just an anonymous callback function. What we have here instead is we're calling in, the callback function, but what we're really doing is saying take the entire lid toggle function and just put it where the lid toggle keyword is. So if we want to gain access to the events object we just need to call it event and then console, log event, save that, go check in the browser and everything is working as it did before. And that's really all there is to it. If you just want to get ahold of the event object, simply name it as a parameter and use it, and you have it available to you. But what if we want to pass a proper argument into the callback function? Let's say I set up a new argument here and set it equal to some texts. Looking at the code we have, you can clearly see I can't add a parentheses here and then pass the argument directly because then I break the code. So I have to do something else and what I'll do is quite literally cheat. So right now we're using lid toggle of the callback function. I will change that, so instead we set up an anonymous function at the callback function and that anonymous function will wrap around lid toggle. Now we can call lid toggle as a proper function and pass whatever we want to lid toggles. So now I can pass newArg directly to lid toggle and then up here in the function, I need to change this to newArg and console log out newArg. Did I spell that correctly? Yes, yes, yes. Okay, save that, go back in the browser and click the button and we get the argument but we also get an error cannot read property parent element of undefined. So what is happening here? Well, first off we were able to pass the arguments through to the callback function, no problem but we also broke our callback function in the process. Why, was because in the callback function you'll remember we are using the, this keyword that this now refers to the internals of our arrow function. So that's not going to work. That means we need to pass the button element on as an additional argument and then use that instead. So we have the button element here, we can pass it on. So now we have button and you are guests arguments that means we need to have two parameters up here, button and newArg. Then I'll just change all of these references to this two button instead. Save that back in the browser, test it and now you can see everything is working again. Cool, so now thanks to the cheat we're able to pass any arguments we want into the callback function, but what about our event object? Well, the answer is straightforward. We capture the event object here, just like we did before. This just makes it available to us and then we pass the event object as well. So event, button, newArg, scroll back up to the function, say events, button, newArg. And then we can console log out the event. Click the button and now we have both the event and the arguments passed through. This year is a very common pattern for using event listeners. We are working around the problem of not being able to pass arguments into a callback function by using the callback function as a function wrapper to call other functions. That way we have full control, we can do whatever we normally would do in a function call and we still have access to the event, and we're still using the event listener as intended.

### Automatically Triggering Event Listeners
There are times when you'll need to trigger an event listener programmatically. This could be for testing purposes, or to simulate user interactions, or if you need to hook into existing functionality without changing it.

To explore this scenario, let's first set up a basic event listener that logs a message when a button is clicked:
```js
const button = document.querySelector("#aButton");

button.addEventListener("click", () => {
 console.log("Button clicked!");
});
```
Creating and dispatching events
To fire this event listener automatically, we create a new Event object to specify what type of event we want to trigger, and then use the dispatchEvent method on the target element to dispatch the newly created event. Here's what that looks like:
```js
// Create a new click event
const clickEvent = new Event("click");

// Dispatch the event on the button
button.dispatchEvent(clickEvent);
```
Creating custom events
In some cases you may need to pass additional data with the event. For this, you can use CustomEvent, a constructor that extends the capabilities of Event.

Here's an expanded version of the previous example, using CustomEvent to pass a custom message along with the event:
```js
// Create a custom click event
const customClickEvent = new CustomEvent("click", {
 detail: { message: "This is a custom click!" },
});

// Dispatch the custom event on the button
button.dispatchEvent(customClickEvent);
```
Simulating user input
One scenario where programmatically triggering events is useful is when you need to simulate user input, like someone typing on their keyboard. As an example, this approach can be used to create a typing effect in a form field for demo purposes.

To simulate user input, you can use Event constructors like InputEvent, KeyboardEvent, and MouseEvent, or you can use the above Event approach to hook directly into specific events like keydown, keyup, mousedown, mouseup, mousemove, etc.
```js
const input = document.querySelector("#inputField");
const text = "Hello!";
let index = 0;

function typeCharacter() {
 if (index < text.length) {
   const keyEvent = new KeyboardEvent("keydown", {
     key: text[index],
     code: `Key${text[index].toUpperCase()}`,
     charCode: text[index].charCodeAt(0),
   });
   input.value += text[index];
   input.dispatchEvent(keyEvent);
   index++;
   setTimeout(typeCharacter, 100);
 }
}

typeCharacter();
```
Here, we simulate a user typing the word "Hello!" into an input field. The script uses KeyboardEvent to trigger keydown events for each character in the string, and updates the input field value accordingly.

Note the properties of the KeyboardEvent constructor:

- key receives a string representing the physical key, for example H for the letter "H"

- code receives a string representing the physical key, for example KeyH for the letter "H"

- charCode receives the Unicode value of the character being typed

When you automate events like this, make sure the affected event listeners are set up to handle both manual and automated triggers.

Here's an expanded version of the initial event listener that checks for the detail property in the event object:
```js
button.addEventListener("click", (event) => {
 if (event.detail) {
   console.log(event.detail.message);
 } else {
   console.log("Button clicked!");
 }
});
```
To trigger or not to trigger
Programmatically triggering events like this is a bit of an edge case, but also frequent enough in use that knowing how it works is useful, especially for testing and demonstration purposes. Keep in mind that automatically triggering events produces unexpected behavior for the end-user (events, after all, are mostly meant to be triggered by the user), so use these techniques with care.