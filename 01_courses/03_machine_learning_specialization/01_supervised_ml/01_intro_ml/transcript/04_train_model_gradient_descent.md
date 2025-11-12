0:01Welcome back. In the last video, we saw visualizations of the cost function j, and how you can try

0:08different choices of the parameters w and b, and see what cost value that gets you.

0:14It would be nice if we had a more systematic way to find the values of w and b that result

0:20in the smallest possible cost, j of w, b. It turns out there's an algorithm called

0:26gradient descent that you can use to do that. Gradient descent is used all over the place

0:31in machine learning, not just for linear regression, but for training, for example, some of the

0:37most advanced neural network models, also called deep learning models. Deep learning

0:43models are something you learn about in the second course. So learning this tool of gradient

0:50descent will set you up with one of the most important building blocks in machine learning.

0:55Here's an overview of what we'll do with gradient descent. You have the cost function

1:00j of w, b right here that you want to minimize. In the example we've seen so far, this is

1:08a cost function for linear regression, but it turns out that gradient descent is an algorithm

1:14that you can use to try to minimize any function, not just a cost function for linear regression.

1:22Just to make this discussion on gradient descent more general, it turns out that gradient

1:27descent applies to more general functions, including other cost functions that work with

1:33models that have more than two parameters. So, for instance, if you have a cost function

1:40j as a function of w1, w2, up to wn and b, your objective is to minimize j over the parameters

1:52w1 to wn and b. In other words, you want to pick values for w1 through wn and b that

2:02gives you the smallest possible value of j. It turns out that gradient descent is an algorithm

2:09that you can apply to try to minimize this cost function j as well. What you're going

2:15to do is just start off with some initial guesses for w and b. In linear regression,

2:23it won't matter too much what the initial values are, so a common choice is to set them

2:28both to 0. So, for example, you can set w to 0 and b to 0 as the initial guess. With

2:36the gradient descent algorithm, what you're going to do is you'll keep on changing the

2:41parameters w and b a bit every time to try to reduce the cost j of wb until hopefully

2:49j settles at or near a minimum. One thing I should note is that for some functions j

2:56that may not be a bowl shape or a hammock shape, it is possible for there to be more

3:02than one possible minimum. Let's take a look at an example of a more complex surface plot

3:10j to see what gradient descent is doing. This function is not a squared error cost

3:16function. For linear regression with the squared error cost function, you always end up with

3:22a bowl shape or a hammock shape. But this is the type of cost function you might get

3:28if you're training a neural network model. Notice the axes. That is w and b on the bottom

3:37axes. For different values of w and b, you get different points on this surface j of wb where

3:46the height of the surface at some point is the value of the cost function. Now, let's imagine

3:53that this surface plot is actually a view of a slightly hilly outdoor park or a golf course

4:00where the high points are hills and the low points are valleys like so. And I'd like you

4:06to imagine, if you will, that you're physically standing at this point on the hill. And if it

4:12helps you to relax, imagine that there's lots of really nice green grass and butterflies and

4:18flowers. It's a really nice hill. And your goal is to start up here and get to the bottom of one

4:27of these valleys as efficiently as possible. So what the gradient descent algorithm does is

4:34you're going to spin around 360 degrees and look around and ask yourself, if I were to take

4:42a tiny little baby step in one direction and I want to go downhill as quickly as possible

4:48toward one of these valleys, what direction do I choose to take that baby step? Well,

4:54if you want to walk down this hill as efficiently as possible, it turns out that if you're standing

5:00at this point on the hill and you look around, you may notice that the best direction to take

5:05your next step downhill is roughly that direction. Mathematically, this is the direction of steepest

5:12descent. And it means that when you take a tiny baby little step, this takes you downhill faster

5:18than a tiny little baby step you could have taken in any other direction. So after taking this first

5:25step, you're now at this point on the hill over here. Now let's repeat the process. Standing at

5:32this new point, you're going to again spin around 360 degrees and ask yourself, in what direction

5:39would I take the next little baby step in order to move downhill? And if you do that and take

5:46another step, you end up moving a bit in that direction and you can keep going. From this new

5:53point, you can again look around and decide what direction would take you downhill most quickly.

5:59Take another step, another step, and so on until you find yourself at the bottom of this valley

6:06at this local minimum right here. What you just did was go through multiple steps of gradient descent.

6:14It turns out gradient descent has an interesting property.

6:18Remember that you can choose a starting point at the surface by choosing starting values for the

6:24parameters w and b. When you performed gradient descent a moment ago, you had started at this

6:31point over here, right? Now imagine if you try gradient descent again, but this time you choose

6:38a different starting point by choosing parameters that place your starting point just a couple

6:44steps to the right over here. If you then repeat the gradient descent process, which means you

6:51look around, take a little step in the direction of the steepest descent, so you end up here. Then

6:57you again look around, take another step, and so on. And if you were to run gradient descent

7:04the second time, starting just a couple steps to the right of where we did it the first time,

7:10then you will end up in a totally different valley. This different minimum over here on the

7:16right. The bottoms of both the first and the second valleys are called local minima because

7:24if you start going down the first valley, gradient descent won't lead you to the second valley.

7:30And the same is true if you started going down the second valley. You will stay in that second

7:36minimum and not find your way into the first local minimum. So this is an interesting property

7:43of the gradient descent algorithm, and you'll see more about this later. So in this video,

7:49you saw how gradient descent helps you go downhill. In the next video, let's look at

7:55the mathematical expressions that you can implement to make gradient descent work.

---
0:04Let's take a look at how you can actually implement the gradient descent algorithm.

0:10Let me write down the gradient descent algorithm.

0:14Here it is.

0:15On each step, w, the parameter, is updated to the old value of w minus alpha times this

0:25term d over dw of the cost function j of wb.

0:30So what this expression is saying is, update your parameter w by taking the current value

0:36of w and adjusting it a small amount, which is this expression on the right, minus alpha

0:44times this term over here, okay?

0:49So if you feel like there's a lot going on in this equation, it's okay.

0:54Don't worry about it.

0:55We'll unpack it together.

0:58First, this equal notation here.

1:01Notice I said we're assigning w a value using this equal sign.

1:06So in this context, this equal sign is the assignment operator.

1:11Specifically, in this context, if you write code that says a equals c, it means take the

1:18value of c and store it in your computer in the variable a.

1:24Or if you write a equals a plus 1, it means set the value of a to be equal to a plus 1,

1:30or increment the value of a by 1.

1:33So the assignment operator in coding is different than truth assertions in mathematics, where

1:41if I write a equals c, I'm asserting, that is, I am claiming that the values of a and

1:47c are equal to each other.

1:50And hopefully, I will never write a truth assertion a equals a plus 1, because that

1:55just can't possibly be true.

1:58So in Python and in other programming languages, truth assertions are sometimes written as

2:04equals equals.

2:06So you may see code that says a equals equals c if you're testing whether a is equal to

2:11c.

2:12But in math notation, as we conventionally use it, like in these videos, the equal sign

2:18can be used for either assignment or for truth assertion.

2:23And so I'll try to make sure it's clear when I write an equal sign, whether we're assigning

2:28a value to a variable, or whether we're asserting the truth of the equality of two values.

2:35Now let's dive more deeply into what the symbols in this equation means.

2:40The symbol here is the Greek alphabet alpha, and in this equation, alpha is also called

2:49the learning rate.

2:51The learning rate is usually a small positive number between 0 and 1, and it might be, say,

2:570.01.

2:58What alpha does is, it basically controls how big of a step you take downhill.

3:06So if alpha is very large, then that corresponds to a very aggressive gradient descent procedure

3:12where you're trying to take huge steps downhill.

3:16And if alpha is very small, then you'll be taking small baby steps downhill.

3:21We'll come back later to delve more deeply into how to choose a good learning rate alpha.

3:27And finally, this term here, that's the derivative term of the cost function J.

3:33Let's not worry about the details of this derivative right now, but later on you get

3:38to see more about the derivative term.

3:40But for now, you can think of this derivative term that I drew a magenta box around as telling

3:46you in which direction you want to take your baby step, and in combination with the learning

3:51rate alpha, it also determines the size of the steps you want to take downhill.

3:58Now, I do want to mention that derivatives come from calculus, and even if you aren't

4:04familiar with calculus, don't worry about it.

4:07Even without knowing any calculus, you'll be able to figure out all you need to know

4:11about this derivative term in this video and the next.

4:15One more thing, remember your model has two parameters, not just W, but also B, so you

4:22also have an assignment operation to update the parameter B that looks very similar.

4:29B is assigned the O value of B minus the learning rate alpha times this slightly different derivative

4:38term D over dB of J of WB.

4:43So remember in the graph of the surface plot where you're taking baby steps until you get

4:48to the bottom of the valley?

4:50Well, for the gradient descent algorithm, you're going to repeat these two update steps

4:56until the algorithm converges, and by converges, I mean that you reach the point at the local

5:02minimum where the parameters W and B no longer change much with each additional step that

5:08you take.

5:09Now, there's one more subtle detail about how to correctly implement gradient descent.

5:16You're going to update two parameters, W and B, right?

5:21So this update takes place for both parameters, W and B.

5:26One important detail is that for gradient descent, you want to simultaneously update

5:34W and B, meaning you want to update both parameters at the same time.

5:40What I mean by that is that in this expression, you're going to update W from the old W to

5:46a new W, and you're also updating B from its old value to a new value of B.

5:55And the way to implement this is to compute the right side, computing this thing for W

6:01and B, and simultaneously at the same time, update W and B to the new values.

6:10So let's take a look at what this means.

6:14Here's the correct way to implement gradient descent, which does a simultaneous update.

6:20This sets a variable tempW equal to that expression, which is W minus that term here.

6:28Let's also set another variable, tempB to that, which is B minus that term.

6:34So you compute both right-hand sides, both updates, and store them into variables tempW

6:39and tempB.

6:41Then you copy the value of tempW into W, and you also copy the value of tempB into B.

6:52Now one thing you may notice is that this value of W is from before W gets updated.

7:00Here notice that the pre-update W is what goes into the derivative term over here.

7:08In contrast, here's an incorrect implementation of gradient descent that does not do a simultaneous

7:14update.

7:15In this incorrect implementation, we compute tempW, same as before, so far that's okay.

7:24And now here's where things start to differ.

7:27We then update W with the value in tempW before calculating the new value for the other parameter

7:34B.

7:35Next, we calculate tempB as B minus that term here.

7:40And finally, we update B with the value in tempB.

7:45The difference between the right-hand side and the left-hand side implementations is

7:49that if you look over here, this W has already been updated to this new value, and it's this

7:56updated W that actually goes into the cost function J of WB.

8:03It means that this term here on the right is not the same as this term over here that

8:08you see on the left.

8:11And that also means this tempB term on the right is not quite the same as the tempB term

8:19on the left, and thus this updated value for B on the right is not the same as this updated

8:25value for variable B on the left.

8:29The way that gradient descent is implemented in code, it actually turns out to be more

8:33natural to implement it the correct way with simultaneous updates.

8:40When you hear someone talk about gradient descent, they always mean the gradient descent

8:44where you perform a simultaneous update of the parameters.

8:48If however, you were to implement non-simultaneous updates, it turns out it will probably work

8:55more or less anyway, but doing it this way isn't really the correct way to implement

9:00it.

9:01It's actually some other algorithm with different properties.

9:04So I would advise you to just stick to the correct simultaneous update and not use this

9:10incorrect version on the right.

9:13So that's gradient descent.

9:15In the next video, we'll go into details of the derivative term, which you saw in this

9:19video, but that we didn't really talk about in detail.

9:24Calculators are a part of calculus, and again, if you're not familiar with calculus, don't

9:28worry about it.

9:29You won't need to know calculus at all in order to complete this course or this specialization,

9:35and you'll have all the information you need in order to implement gradient descent.

9:40Coming up in the next video, we'll go over derivatives together, and you'll come away

9:45with the intuition and knowledge you need to be able to implement and apply gradient

9:50descent yourself.

9:52I think that would be an exciting thing for you to know how to implement, so let's go

9:56on to the next video to see how to do that.

---
0:02Now let's dive more deeply into gradient descent to gain better intuition about what it's doing and why it might make sense.

0:10Here's the gradient descent algorithm that you saw in the previous video.

0:15And as a reminder, this variable, this Greek symbol alpha, is the learning rate.

0:21And the learning rate controls how big of a step you take when updating the model's parameters w and b.

0:28So this term here, this d over dw, this is the derivative term.

0:34And by convention in math, this d is written with this funny font here.

0:40And in case anyone watching this has a PhD in math or is an expert in multivariate calculus,

0:45they may be wondering, that's not the derivative, that's the partial derivative.

0:49And yes, they'd be right.

0:50But for the purposes of implementing a machine learning algorithm, I'm just going to call it derivative.

0:56And don't worry about these little distinctions.

1:00So what we're going to focus on now is get more intuition about what this learning rate and what this derivative are doing,

1:09and why, when multiplied together like this, it results in updates to parameters w and b that make sense.

1:17In order to do this, let's use a slightly simpler example where we work on minimizing just one parameter.

1:26So let's say that you have a cost function J of just one parameter w, where w is a number.

1:34This means that gradient descent now looks like this.

1:37w is updated to w minus the learning rate alpha times d over dw of J of w.

1:46And you're trying to minimize the cost by adjusting the parameter w.

1:52So this is like our previous example where we had temporarily set b equal to zero.

1:59With one parameter w instead of two, you can look at two-dimensional graphs of the cost function J instead of three-dimensional graphs.

2:08Let's look at what gradient descent does on this function J of w.

2:15Here on the horizontal axis is parameter w, and on the vertical axis is the cost J of w.

2:23Now let's initialize gradient descent with some starting value for w.

2:28Let's initialize it at this location.

2:31So imagine that you start off at this point right here on the function J.

2:36What gradient descent will do is it will update w to be w minus learning rate alpha times d over dw of J of w.

2:48Let's look at what this derivative term here means.

2:52A way to think about the derivative at this point on the line is to draw a tangent line, which is a straight line that touches this curve at that point.

3:04In math, the slope of this line is the derivative of the function J at this point.

3:10And to get the slope, you can draw a little triangle like this.

3:15And if you compute the height divided by the width of this triangle, that is the slope.

3:21For example, the slope might be 2 over 1, for instance.

3:27And when the tangent line is pointing up and to the right, the slope is positive, which means that this derivative is a positive number.

3:36So it's greater than zero.

3:39And so the updated w is going to be w minus the learning rate times some positive number.

3:47The learning rate is always a positive number.

3:50So if you take w minus a positive number, you end up with a new value for w that is smaller.

3:58So on the graph, we are moving to the left.

4:02You're decreasing the value of w.

4:05And you may notice that this is the right thing to do if your goal is to decrease the cost J.

4:11Because when we move toward the left on this curve, the cost J decreases and you're getting closer to the minimum for J, which is over here.

4:20So, so far, gradient descent seems to be doing the right thing.

4:25Now, let's look at another example.

4:28Let's take the same function J of w as above.

4:31And now let's say that you initialize gradient descent at a different location.

4:36Say, by choosing a starting value for w that's over here on the left.

4:42So that's this point on the function J.

4:45Now, the derivative term, remember, is d over dw of J of w.

4:53And when we look at the tangent line at this point over here, the slope of this line is the derivative of J at this point.

5:00But this tangent line is sloping down into the right.

5:04And so this line sloping down into the right has a negative slope.

5:09In other words, the derivative J at this point is a negative number.

5:14For instance, if you draw a triangle, then the height like this is negative 2 and the width is 1.

5:21So the slope is negative 2 divided by 1, which is negative 2, which is a negative number.

5:28So when you update w, you get w minus the learning rate times a negative number.

5:35And so this means you subtract from w a negative number.

5:40But subtracting a negative number means adding a positive number.

5:46And so you end up increasing w.

5:50Because subtracting a negative number is the same as adding a positive number to w.

5:57So this step of gradient descent causes w to increase, which means you're moving to the right of the graph and your cos J has decreased down to here.

6:09And again, it looks like gradient descent is doing something reasonable. It's getting you closer to the minimum.

6:17So hopefully these last two examples show some of the intuition behind what the derivative term is doing and why this helps gradient descent change w to get you closer to the minimum.

6:31I hope this video gave you some sense for why the derivative term in gradient descent makes sense.

6:38One other key quantity in the gradient descent algorithm is the learning rate alpha.

6:43How do you choose alpha? What happens if it's too small or what happens if it's too big?

6:47In the next video, let's take a deeper look at the parameter alpha to help build intuitions about what it does, as well as how to make a good choice for a good value of alpha for your implementation of gradient descent.

---
0:01The choice of the learning rate alpha will have a huge impact on the efficiency of your implementation of gradient descent.

0:09And if alpha, the learning rate, is chosen poorly, gradient descent may not even work at all.

0:15In this video, let's take a deeper look at the learning rate.

0:19This will also help you choose better learning rates for your implementations of gradient descent.

0:26So here again is the gradient descent rule.

0:29W is updated to be W minus the learning rate alpha times the derivative term.

0:35To learn more about what the learning rate alpha is doing, let's see what could happen if the learning rate alpha is either too small or if it is too large.

0:46For the case where the learning rate is too small, here's a graph where the horizontal axis is W and the vertical axis is the cost J.

0:56And here's a graph of the function J of W.

1:01Let's start gradient descent at this point here.

1:05If the learning rate is too small, then what happens is that you multiply your derivative term by some really, really, really small number.

1:15So you're going to be multiplying by a number, alpha, that's really small, like 0.0000001.

1:23And so you end up taking a very small baby step like that.

1:28Then from this point, you're going to take another, you know, tiny, tiny little baby step.

1:34But because the learning rate is so small, the second step is also just minuscule.

1:40The outcome of this process is that you do end up decreasing the cost J, but incredibly slowly.

1:47So here's another step, and another step, another tiny step, until you finally approach the minimum.

1:54But as you may notice, you're going to need a lot of steps to get to the minimum.

1:59So to summarize, if the learning rate is too small, then gradient descent will work, but it will be slow.

2:07It will take a very long time because it's going to take these tiny, tiny baby steps,

2:12and it's going to need a lot of steps before it gets anywhere close to the minimum.

2:17Now, let's look at a different case.

2:20What happens if the learning rate is too large?

2:24Here's another graph of the cost function, and let's say we start gradient descent with W at this value here.

2:32So it's actually already pretty close to the minimum.

2:37So the derivative points to the right, but if the learning rate is too large,

2:44then you update W via a giant step to be all the way over here, and that's this point here on the function J.

2:56So you move from this point on the left all the way to this point on the right, and now the cost has actually gotten worse.

3:04It has increased because it has started out at this value here, and after one step, it actually increased to this value here.

3:13Now, the derivative at this new point says to decrease W, but when the learning rate is too big,

3:22then you may take a huge step going from here all the way out here.

3:27So now you've gotten to this point here, and again, if the learning rate is too big,

3:33then you take another huge step for the next iteration and way overshoot the minimum again.

3:39So now you're at this point on the right, and one more time, you do another update and end up all the way here,

3:46and so you're now at this point here.

3:51So as you may notice, you're actually getting further and further away from the minimum.

3:57So if the learning rate is too large, then gradient descent may overshoot and may never reach the minimum.

4:05And another way to say that is that gradient descent may fail to converge and may even diverge.

4:14So here's another question you may be wondering.

4:18What if your parameter W is already at this point here, so that your cost J is already at a local minimum?

4:29What do you think one step of gradient descent will do if you've already reached a minimum?

4:35So this is a tricky one.

4:38When I was first learning this stuff, it actually took me a long time to figure it out, but let's work through this together.

4:45Let's suppose you have some cost function J, and the one you see here isn't a squared error cost function,

4:54and this cost function has two local minima corresponding to two values that you see here.

5:02Now, let's suppose that after some number of steps of gradient descent, your parameter W is over here, say equal to 5,

5:12and so this is the current value of W.

5:16This means that you're at this point on the cost function J, and that happens to be a local minimum.

5:23Turns out, if you draw a tangent to the function at this point, the slope of this line is 0,

5:30and thus, the derivative term here is equal to 0 for the current value of W,

5:37and so your gradient descent update becomes W is updated to W minus the learning rate times 0,

5:45where here, that's because the derivative term is equal to 0.

5:50And this is the same as saying, let's set W to be equal to W.

5:56So, this means that if you're already at the local minimum, gradient descent leaves W unchanged,

6:04because it just updates the new value of W to be the exact same old value of W.

6:10So concretely, let's say if the current value of W is 5, and alpha is 0.1,

6:18after one iteration, you update W as W minus alpha times 0, and it is still equal to 5.

6:28So, if your parameters have already brought you to a local minimum, then further gradient descent steps do absolutely nothing.

6:37It doesn't change the parameters, which is what you want, because it keeps the solution at that local minimum.

6:44This also explains why gradient descent can reach a local minimum even with a fixed learning rate alpha.

6:51Here's what I mean.

6:53To illustrate this, let's look at another example.

6:57Here's the cost function J of W that we want to minimize.

7:02Let's initialize gradient descent up here at this point.

7:07If we take one update step, maybe it'll take us to that point.

7:14And because this derivative is pretty large, gradient descent takes a relatively big step, right?

7:21Now, we're at this second point, where we take another step.

7:26And you may notice that the slope is not as steep as it was at the first point.

7:31So, the derivative isn't as large, and so the next update step will not be as large as that first step.

7:39Now, we're at this third point here, and the derivative is smaller than it was at the previous step, and we'll take an even smaller step.

7:50As we approach the minimum, the derivative gets closer and closer to 0.

7:56So, as we run gradient descent, eventually we're taking very small steps until you finally reach a local minimum.

8:05So, just to recap, as we get nearer a local minimum, gradient descent will automatically take smaller steps.

8:13And that's because as we approach the local minimum, the derivative automatically gets smaller.

8:19And that means the update steps also automatically get smaller, even if the learning rate alpha is kept at some fixed value.

8:28So, that's the gradient descent algorithm.

8:31You can use it to try to minimize any cost function J, not just the mean squared error cost function that we're using for linear regression.

8:41In the next video, we're going to take the function J and set that back to be exactly the linear regression model's cost function, the mean squared error cost function that we had come up with earlier.

8:54And putting together gradient descent with this cost function, that will give you your first learning algorithm, the linear regression algorithm.

---
0:01So previously, you took a look at the linear regression model, and then the cost function, and then the gradient descent algorithm.

0:10In this video, we're going to put it all together and use the squared error cost function for the linear regression model with gradient descent.

0:19This will allow us to train the linear regression model to fit a straight line to our training data.

0:25Let's get to it.

0:27Here's the linear regression model, and to the right is the squared error cost function, and below is the gradient descent algorithm.

0:38It turns out if you calculate these derivatives, these are the terms you would get.

0:45The derivative with respect to w is this, 1 over m, summed from i equals 1 through m.

0:54Then the error term, that is the difference between the predicted and the actual values, times the input feature x i.

1:03And the derivative with respect to b is this formula over here, which looks the same as the equation above, except that it doesn't have that x i term at the end.

1:16And if you use these formulas to compute these two derivatives and implement gradient descent this way, it will work.

1:24Now, you may be wondering, where did I get these formulas from?

1:29They're derived using calculus.

1:31If you want to see the full derivation, I'll quickly run through the derivation on the next slide.

1:37But if you don't remember or aren't interested in the calculus, don't worry about it.

1:41You can skip the materials on the next slide entirely and still be able to implement gradient descent and finish this class, and everything will work just fine.

1:50So in this slide, which is one of the most mathematical slides of the entire specialization, and again is completely optional,

1:58we'll show you how to calculate the derivative terms.

2:02Let's start with the first term, the derivative of the cost function j with respect to w.

2:09We'll start by plugging in the definition of the cost function j.

2:14So j of wb is this.

2:19So 1 over 2m times this sum of the squared error terms.

2:25And now, remember also that f of wb of xi is equal to this term over here, which is wxi plus b.

2:42And so what we would like to do is compute the derivative, also called the partial derivative, with respect to w of this equation right here on the right.

2:55If you've taken a calculus class before, and again it's totally fine if you haven't,

3:00you may know that by the rules of calculus, the derivative is equal to this term over here,

3:07which is why the 2 here and the 2 here cancel out, leaving us with this equation that you saw on the previous slide.

3:18So this, by the way, is why we had to find the cost function with the 1 half earlier this week.

3:26It's because it makes the partial derivative neater.

3:29It cancels out the 2 that appears from computing the derivative.

3:34For the other derivative with respect to b, this is quite similar.

3:39I can write it out like this, and once again plug in the definition of f of xi, giving this equation.

3:49And by the rules of calculus, this is equal to this, where there's no xi anymore at the end.

3:58And so the 2's cancel once more, and you end up with this expression for the derivative with respect to b.

4:07And so now you have these two expressions for the derivatives, and you can plug them into the gradient descent algorithm.

4:16So here's the gradient descent algorithm for linear regression.

4:20You repeatedly carry out these updates to w and b until convergence.

4:26Remember that this f of x is a linear regression model, so it's equal to w times x plus b.

4:35This expression here is the derivative of the cost function with respect to w, and this expression is the derivative of the cost function with respect to b.

4:47And just as a reminder, you want to update w and b simultaneously on each step.

4:54Now let's get familiar with how gradient descent works.

4:58One issue we saw with gradient descent is that it can lead to a local minimum instead of a global minimum,

5:05where the global minimum means the point that has the lowest possible value for the cost function j out of all possible points.

5:13You may recall this surface plot that looks like an outdoor park with a few hills, with the grass and the birds.

5:20This is a relaxing outdoor hill. This function has more than one local minimum.

5:25Remember, depending on where you initialize the parameters w and b, you can end up at different local minima.

5:32You can end up here, or you can end up here.

5:36But it turns out when you're using a squared error cost function with linear regression,

5:42the cost function does not and will never have multiple local minima.

5:47It has a single global minimum because of this bow shape.

5:52The technical term for this is that this cost function is a convex function.

5:58Informally, a convex function is a bow-shaped function,

6:03and it cannot have any local minima other than the single global minimum.

6:09So when you implement gradient descent on a convex function,

6:14one nice property is that so long as your learning rate is chosen appropriately,

6:19it will always converge to the global minimum.

6:22Congratulations! You now know how to implement gradient descent for linear regression.

6:28We have just one last video for this week.

6:31In that video, we'll see this algorithm in action. Let's go to that last video.

---
0:02Let's see what happens when you run gradient descent for linear regression.

0:06Let's go see the algorithm in action.

0:08Here's a plot of the model and data on the upper left,

0:13and a contour plot of the cost function on the upper right,

0:18and at the bottom is the surface plot of the same cost function.

0:23Often, w and v will both be initialized to 0,

0:27but for this demonstration, let's initialize w to be equal to negative 0.1 and b to be 900.

0:36So this corresponds to f of x equals negative 0.1x plus 900.

0:44Now, if we take one step using gradient descent,

0:48we end up going from this point of the cost function out here

0:52to this point, just down and to the right.

0:57And notice that the straight line fit is also changed a bit.

1:03Let's take another step.

1:06The cost function has now moved to this third point,

1:10and again, the function f of x has also changed a bit.

1:15As you take more of these steps, the cost is decreasing at each update.

1:21So the parameters w and b are following this trajectory.

1:28And if you look on the left, you get this corresponding straight line fit

1:33that, you know, fits the data better and better until we've reached the global minimum.

1:40The global minimum corresponds to this straight line fit,

1:44which is a relatively good fit to the data.

1:47I mean, isn't that cool?

1:50And so that's gradient descent.

1:52And we're going to use this to fit a model to the housing data.

1:58And you can now use this f of x model to predict the price of your client's house

2:04or anyone else's house.

2:06For instance, if your friend's house size is 1,250 square feet,

2:12you can now read off the value and predict that maybe they could get,

2:16I don't know, $250,000 for the house.

2:21To be more precise, this gradient descent process is called batch gradient descent.

2:27The term batch gradient descent refers to the fact that on every step of gradient descent,

2:33we're looking at all of the training examples instead of just a subset of the training data.

2:41So in computing gradient descent, when computing derivatives,

2:46we're computing the sum from i equals 1 to m.

2:50And batch gradient descent is looking at the entire batch of training examples at each update.

2:59I know that batch gradient descent may not be the most intuitive name,

3:03but this is what people in the machine learning community call it.

3:07If you've heard of the newsletter, The Batch, that's published by deeplearning.ai,

3:12the newsletter, The Batch, was also named for this concept in machine learning.

3:18And then it turns out that there are other versions of gradient descent

3:22that do not look at the entire training set,

3:25but instead looks at smaller subsets of the training data at each update step.

3:30But we'll use batch gradient descent for linear regression.

3:34So that's it for linear regression.

3:36Congratulations on getting through your first machine learning model.

3:40I hope you go and celebrate, or I don't know, maybe take a nap in your hammock.

3:45In the optional lab that follows this video,

3:48you'll see a review of the gradient descent algorithm as well as how to implement it in code.

3:54You'll also see a plot that shows how the cost decreases as you continue training more iterations.

4:01And you'll also see a contour plot, seeing how the cost gets closer to the global minimum

4:07as gradient descent finds better and better values for the parameters W and B.

4:13So remember that to do the optional lab, you just need to read and run this code.

4:19You won't need to write any code yourself.

4:22And I hope you take a few moments to do that and also become familiar with the gradient descent code,

4:28because this will help you to implement this and similar algorithms in the future yourself.

4:36Thanks for sticking with me through the end of this last video for the first week,

4:40and congratulations for making it all the way here.

4:43You're on your way to becoming a machine learning person.

4:47In addition to the optional labs, if you haven't done so yet,

4:51I hope you also check out the practice quizzes,

4:54which are a nice way that you can double check your own understanding of the concepts.

4:58It's also totally fine if you don't get them all right the first time,

5:02and you can also take the quizzes multiple times until you get the score that you want.

5:07You now know how to implement linear regression with one variable,

5:12and that brings us to the close of this week.

5:15Next week, we'll learn to make linear regression much more powerful.

5:19Instead of one feature like size of a house, you learn how to get it to work with lots of features.

5:25You also learn how to get it to fit nonlinear curves.

5:29These improvements will make the algorithm much more useful and valuable.

5:34Lastly, we'll also go over some practical tips that will really help

5:38for getting linear regression to work on practical applications.

5:42I'm really happy to have you here with me in this class,

5:45and I look forward to seeing you next week.