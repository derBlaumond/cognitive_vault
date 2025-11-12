
0:02Welcome back. In this week, we'll learn to make linear regression much faster and much

0:07more powerful. And by the end of this week, you'll be two-thirds of the way to finishing

0:12this first course. Let's start by looking at a version of linear regression that can

0:17look at not just one feature, but a lot of different features. Let's take a look.

0:23In the original version of linear regression, you had a single feature x, the size of the

0:30house, and you're able to predict y, the price of the house. So the model was fwb of x equals

0:41wx plus b. But now, what if you did not only have the size of the house as a feature with

0:47which to try to predict the price, but if you also knew the number of bedrooms, the

0:53number of floors, and the age of the home in years, it seems like this would give you

0:58a lot more information with which to predict the price. To introduce a little bit of new

1:03notation, we're going to use the variables x1, x2, x3, and x4 to denote the four features.

1:14And for simplicity, let's introduce a little bit more notation. We'll write x subscript

1:19j, or sometimes I'll just say for short x sub j, to represent the list of features.

1:27So here, j will go from 1 through 4, because we have 4 features. I'm going to use lowercase

1:34n to denote the total number of features. So in this example, n is equal to 4. As before,

1:41we'll use x superscript i to denote the i-th training example. So here, x superscript i

1:50is actually going to be a list of four numbers, or sometimes we'll call this a vector that

1:59includes all the features of the i-th training example. So as a concrete example, x superscript

2:08in parentheses 2 will be a vector of the features for the second training example.

2:15So it will equal to this 1, 4, 1, 6, 3, 2, and 40. And technically, I'm writing these

2:22numbers in a row, so sometimes this is called a row vector rather than a column vector.

2:28But if you don't know what the difference is, don't worry about it. It's not that important

2:33for this purpose. And to refer to a specific feature in the i-th training example, I will

2:41write x superscript i subscript j. So for example, x superscript 2 subscript 3 will

2:50be the value of the third feature, that is the number of floors in the second training

2:56example, and so that's going to be equal to 2. Sometimes, in order to emphasize that

3:03this x2 is not a number, but is actually a list of numbers, that is a vector, we'll draw

3:09an arrow on top of that, just to visually show that it's a vector, and over here as

3:17well. But you don't have to draw this arrow in your notation. You can think of the arrow

3:23as an optional signifier that's sometimes used just to emphasize that this is a vector

3:29and not a number. Now that we have multiple features, let's take a look at what our model

3:34would look like. Previously, this is how we defined the model, where x was a single feature,

3:41so a single number, but now with multiple features, we're going to define it differently.

3:48Instead, the model will be fwb of x equals w1 x1 plus w2 x2 plus w3 x3 plus w4 x4 plus b.

4:02Concretely, for housing price prediction, one possible model may be that we estimate

4:09the price of the house as 0.1 times x1, the size of the house, plus 4 times x2, the number

4:18of bedrooms, plus 10 times x3, the number of floors, minus 2 times x4, the age of the

4:25house in years, plus 80. Let's think a bit about how you might interpret these parameters.

4:32If the model is trying to predict the price of the house in thousands of dollars, you

4:36can think of this b equals 80 as saying that the base price of a house starts off at maybe

4:44$80,000, assuming it has no size, no bedrooms, no floor, and no age. And you can think of

4:51this 0.1 as saying that maybe for every additional square foot, the price will increase by $0.1,

5:00or by $100, because we're saying that for each square foot, the price increases by 0.1,

5:08you know, times $1,000, which is $100. And maybe for each additional bathroom, the price

5:15increases by $4,000, and for each additional floor, the price may increase by $10,000.

5:23And for each additional year of the house's age, the price may decrease by $2,000, because

5:29the parameter is negative 2. And in general, if you have n features, then the model will

5:37look like this. Here again is the definition of the model with n features.

5:45What we're going to do next is introduce a little bit of notation to rewrite this expression

5:50in a simpler but equivalent way. Let's define w as a list of numbers that list the parameters

5:57w1, w2, w3, all the way through wn. In mathematics, this is called a vector, and sometimes to

6:06designate that this is a vector, which just means a list of numbers, I'm going to draw

6:10a little arrow on top. You don't always have to draw this arrow, and you can do so or not

6:17in your own notation, so you can think of this little arrow as just an optional signifier

6:23to remind us that this is a vector. If you've taken a linear algebra class before, you might

6:29recognize that this is a row vector as opposed to a column vector, but if you don't know

6:35what those terms mean, you don't need to worry about it.

6:38Next, same as before, b is a single number, not a vector, and so this vector w together

6:46with this number b are the parameters of the model.

6:52Let me also write x as a list, or a vector, again a row vector, that lists all of the

7:00features x1, x2, x3, up through xn. This is again a vector, so I'm going to add a little

7:08arrow up on top to signify. So, in the notation up on top, we can also add little arrows here

7:16and here to signify that that w and that x are actually these lists of numbers. They're

7:27actually these vectors.

7:29So, with this notation, the model can now be rewritten more succinctly as f of x equals

7:37the vector w dot, and this dot refers to a dot product from linear algebra, of x the

7:47vector plus the number b. So, what is this dot product thing? Well, the dot product of

7:55two vectors of two lists of numbers, w and x, is computed by taking the corresponding

8:03pairs of numbers, w1 and x1, multiplying that, w2 x2, multiplying that, w3 x3, multiplying

8:14that, all the way up to wn xn, multiplying that, and then summing up all of these products.

8:24Writing that out, this means that the dot product is equal to w1 x1 plus w2 x2, multiplying

8:33that, w2 x2 plus w3 x3 plus, all the way up to wn xn, and then finally we add back in

8:43the b on top. And you notice that this gives us exactly the same expression as we had on

8:51top. So, the dot product notation lets you write the model in a more compact form with

8:59fewer characters. The name for this type of linear regression model with multiple input

9:05features is multiple linear regression. This is in contrast to univariate regression, which

9:11had just one feature. And by the way, you might think this algorithm is called multivariate

9:17regression, but that term actually refers to something else that we won't be using here.

9:23So I'm going to refer to this model as multiple linear regression. And so that's it for linear

9:29regression with multiple features, which is also called multiple linear regression. In

9:35order to implement this, there's a really neat trick called vectorization, which will

9:40make it much simpler to implement this and many other learning algorithms. Let's go on

9:45to the next video to take a look at what is vectorization.

---
0:02In this video, you see a very useful idea called vectorization.

0:06When you're implementing a learning algorithm, using vectorization will both make your code shorter and also make it run much more efficiently.

0:15Learning how to write vectorized code will allow you to also take advantage of modern numerical linear algebra libraries,

0:23as well as maybe even GPU hardware, that stands for Graphics Processing Unit.

0:28This is hardware originally designed to speed up computer graphics on your computer,

0:33but turns out can be used when you write vectorized code to also help you execute your code much more quickly.

0:39Let's look at a concrete example of what vectorization means.

0:43Here's an example with parameters w and b, where w is a vector with three numbers,

0:51and you also have a vector of features x with also three numbers.

0:56Here, n is equal to 3.

0:59Notice that in linear algebra, the index or the counting starts from 1,

1:05and so the first value is subscripted w1 and x1.

1:10In Python code, you can define these variables, w, b, and x, using arrays like this.

1:18Here, I'm actually using a numerical linear algebra library in Python called NumPy,

1:24which is by far the most widely used numerical linear algebra library in Python and in machine learning.

1:30Because in Python, the indexing of arrays or counting in arrays starts from 0,

1:38you would access the first value of w using w square bracket 0,

1:44the second value using w square bracket 1, and the third using w square bracket 2.

1:52So the indexing here goes from 0, 1, to 2, rather than 1, 2, to 3.

1:59Similarly, to access individual features of x, you would use x0, x1, and x2.

2:09Many programming languages, including Python, start counting from 0 rather than 1.

2:15Now, let's look at an implementation without vectorization for computing the model's prediction.

2:21In code, it would look like this.

2:24You take each parameter w and multiply it by its associated feature.

2:31Now, you could write your code like this, but what if n isn't 3, but instead n is 100 or 100,000?

2:39It's both inefficient for you to code and inefficient for your computer to compute.

2:44So here's another way, still without using vectorization, but using a for loop.

2:50In math, you can use a summation operator to add all the products of wj and xj for j equals 1 through n.

3:00Then, outside the summation, you add b at the end.

3:05So the summation goes from j equals 1 up to and including n.

3:10For n equals 3, j therefore goes from 1, 2, to 3.

3:16In code, you can initialize f to 0.

3:19Then, for j in range from 0 to n, this actually makes j go from 0 to n minus 1.

3:28So from 0, 1, to 2, you can then add to f the product of wj times xj.

3:36Finally, outside the for loop, you add b.

3:40Notice that in Python, the range 0 to n means that j goes from 0 all the way to n minus 1 and does not include n itself.

3:49And more commonly, this is written range n in Python.

3:54But in this video, I added a 0 here just to emphasize that it starts from 0.

3:59While this implementation is a bit better than the first one, it still doesn't use vectorization and isn't that efficient.

4:08Now, let's look at how you can do this using vectorization.

4:14This is the math expression of the function f, which is the dot product of w and x plus b.

4:21And now, you can implement this with a single line of code.

4:25By computing fp equals np dot dot.

4:30I said dot dot because the first dot is the period and the second dot is the function or the method called dot.

4:38But it's fp equals np dot dot w comma x.

4:44And this implements the mathematical dot product between the vectors w and x.

4:51And then finally, you can add b to it at the end.

4:55This numpy dot function is a vectorized implementation of the dot product operation between two vectors.

5:02And especially when n is large, this will run much faster than the two previous code examples.

5:09I want to emphasize that vectorization actually has two distinct benefits.

5:14First, it makes the code shorter. It's now just one line of code. Isn't that cool?

5:19And second, it also results in your code running much faster than either of the two previous implementations that did not use vectorization.

5:28And the reason that the vectorized implementation is much faster is behind the scenes,

5:35the numpy dot function is able to use parallel hardware in your computer.

5:40And this is true whether you're running this on a normal computer, that is on a normal computer CPU,

5:46or if you are using a GPU, a graphics processor unit that's often used to separate machine learning jobs.

5:54And the ability of the numpy dot function to use parallel hardware makes it much more efficient than the for loop or the sequential calculation that we saw previously.

6:07Now, this version is much more practical when n is large because you are not typing w0 times x0 plus w1 times x1 plus lots of additional terms like you would have had for the previous version.

6:22But while this saves a lot on the typing, it's still not that computationally efficient because it still doesn't use vectorization.

6:32So to recap, vectorization makes your code shorter, so hopefully easier to write and easier for you or others to read, and it also makes it run much faster.

6:43But what is this magic behind vectorization that makes this run so much faster?

6:48Let's take a look at what your computer is actually doing behind the scenes to make vectorized code run so much faster.

---
0:02I remember when I first learned about vectorization, I spent many hours on my computer taking an

0:08un-vectorized version of an algorithm, running it, see how long it ran, and then running

0:12a vectorized version of the code and seeing how much faster that ran, and I just spent

0:17hours playing with that, and it frankly blew my mind that the same algorithm, vectorized,

0:22would run so much faster.

0:24It felt almost like a magic trick to me.

0:27In this video, let's figure out how this magic trick really works.

0:31Let's take a deeper look at how a vectorized implementation may work on your computer behind

0:36the scenes.

0:37Let's look at this for loop.

0:39A for loop like this runs without vectorization, so if j ranges from 0 to, say, 15, this piece

0:48of code performs operations one after another.

0:52On the first time step, which I'm going to write as time 0, or t0, it first operates

0:59on the values at index 0.

1:02At the next time step, it calculates values corresponding to index 1, and so on until

1:08the 15th step, where it computes that.

1:13In other words, it calculates these computations one step at a time, one step after another.

1:21In contrast, this function in NumPy is implemented in the computer hardware with vectorization.

1:28So the computer can get all values of the vectors w and x, and in a single step, it

1:35multiplies each pair of w and x with each other all at the same time in parallel.

1:42Then after that, the computer takes these 16 numbers and uses specialized hardware to

1:47add them all together very efficiently, rather than needing to carry out distinct additions

1:54one after another to add up these 16 numbers.

1:58This means that code with vectorization can perform calculations in much less time than

2:03code without vectorization, and this matters more when you're running learning algorithms

2:09on large datasets or trying to train large models, which is often the case with machine

2:14learning.

2:16So that's why being able to write vectorized implementations of learning algorithms has

2:20been a key step to getting learning algorithms to run efficiently and therefore scale well

2:26to the large datasets that many modern machine learning algorithms now have to operate on.

2:32Now let's take a look at a concrete example of how this helps with implementing multiple

2:38linear regression, that is, linear regression with multiple input features.

2:43Say you have a problem with 16 features and 16 parameters, w1 through w16, in addition

2:52to the parameter b.

2:55You calculated 16 derivative terms for these 16 weights, and in code, maybe you stored

3:02the values of w and d in two numpy arrays, with d storing the values of the derivatives.

3:10For this example, I'm just going to ignore the parameter b.

3:14Now you want to compute and update for each of these 16 parameters, so wj is updated to

3:22wj minus the learning rate, say 0.1, times dj, for j from 1 through 16.

3:34In code, without vectorization, you would be doing something like this.

3:40Update w1 to be w1 minus the learning rate 0.1 times d1 makes update w2, similarly, and

3:49so on through w16, updated as w16 minus 0.1 times d16.

3:57In code, without vectorization, you could use a for loop like this, for j in range 0,

4:0516, that again goes from 0 to 15, set wj equals wj minus 0.1 times dj.

4:14In contrast, with vectorization, you can imagine the computer's parallel processing hardware

4:21like this.

4:22It takes all 16 values in the vector w, and subtracts, in parallel, 0.1 times all 16 values

4:31in the vector d, and assign all 16 calculations back to w, all at the same time and all in

4:39one step.

4:40In code, you can implement this as follows, w is assigned to w minus 0.1 times d.

4:50Behind the scenes, the computer takes these numpy arrays, w and d, and uses parallel processing

4:56hardware to carry out all 16 computations efficiently.

5:00So using a vectorized implementation, you should get a much more efficient implementation

5:05of linear regression.

5:07Maybe the speed difference won't be huge if you have 16 features, but if you have thousands

5:13of features, and perhaps very large training sets, this type of vectorized implementation

5:18will make a huge difference in the running time of your learning algorithm.

5:22It could be the difference between code finishing in one or two minutes, versus taking many

5:26many hours to do the same thing.

5:29In the optional lab that follows this video, you see an introduction to one of the most

5:34used Python libraries in machine learning, which we've already touched on in this video,

5:39called numpy.

5:41You see how to create vectors in code, and these vectors, or lists of numbers, are called

5:46numpy arrays.

5:48And you also see how to take the dot product of two vectors using a numpy function called

5:54dot.

5:56And you also get to see how vectorized code, such as using the dot function, can run much

6:02faster than a for loop.

6:03In fact, you get to time this code yourself, and hopefully see it run much faster.

6:09This optional lab introduces a fair amount of new numpy syntax, so when you read through

6:16the optional lab, please don't feel like you have to understand all the code right away.

6:20But you can save this notebook and use it as a reference to look at when you're working

6:25with data stored in numpy arrays.

6:27So congrats on finishing this video on vectorization.

6:31You've learned one of the most important and useful techniques in implementing machine

6:35learning algorithms.

6:37In the next video, we'll put the math of multiple linear regression together with vectorization,

6:43so that you'll be able to implement gradient descent for multiple linear regression with

6:48vectorization.

6:49Let's go on to the next video.

---

0:02So, you've learned about gradient descent, about multiple linear regression, and also vectorization.

0:08Let's put it all together to implement gradient descent for multiple linear regression with vectorization. This would be cool.

0:15Let's quickly review what multiple linear regression looks like.

0:18Using our previous notation, let's see how you can write it more succinctly using vector notation.

0:24We have parameters w1 to wn as well as b, but instead of thinking of w1 to wn as separate numbers, that is, separate parameters,

0:35let's instead collect all of the w's into a vector w, so that now w is a vector of length n.

0:44So, we're just going to think of the parameters of this model as a vector w, as well as b, where b is still a number, same as before.

0:54Whereas before, we had defined multiple linear regression like this, now, using vector notation,

1:01we can write the model as f sub wb of x equals the vector w dot product with the vector x plus b.

1:10And remember that this dot here means dot product.

1:15Our cost function can be defined as j of w1 through wn comma b,

1:21but instead of just thinking of j as a function of these n different parameters wj as well as b,

1:29we're going to write j as a function of parameter vector w and the number b.

1:36So, this w1 through wn is replaced by this vector w, and j now takes its input, a vector w and a number b, and returns a number.

1:50Here's what gradient descent looks like.

1:52We're going to repeatedly update each parameter wj to be wj minus alpha times the derivative of the cost j,

2:01where j has parameters w1 through wn and b, and once again, we just write this as j of vector w and number b.

2:13Let's see what this will look like when you implement gradient descent, and in particular, let's take a look at the derivative term.

2:21We'll see that gradient descent becomes just a little bit different with multiple features compared to just one feature.

2:29Here's what we had when we had gradient descent with one feature.

2:33We had an update rule for w and a separate update rule for b, so hopefully these look familiar to you.

2:41And this term here is the derivative of the cost function j with respect to the parameter w,

2:49and similarly, we have an update rule for parameter b with univariate regression.

2:55We had only one feature.

2:57We call that feature xi without any subscript.

3:02Now, here's the new notation for when we have n features where n is 2 or more.

3:09We get this update rule for gradient descent.

3:12Update w1 to be w1 minus alpha times this expression here, and this formula is actually the derivative of the cost j with respect to w1.

3:27The formula for the derivative of j with respect to w1 on the right looks very similar to the case of one feature on the left.

3:36The error term still takes a prediction f of x minus the target y.

3:42One difference is that w and x are now vectors, and just as w on the left has now become w1 here on the right,

3:52xi here on the left is now instead xi subscript 1 here on the right, and this is just for j equals 1.

4:04For multiple linear regression, we have j ranging from 1 through n, and so we'll update the parameters w1, w2 all the way up to wn,

4:19and then as before, we'll update b, and if you implement this, you get gradient descent for multiple regression.

4:29So that's it for gradient descent for multiple regression.

4:34Before moving on from this video, I want to make a quick aside or a quick side note on an alternative way for finding w and b for linear regression,

4:47and this method is called the normal equation.

4:51Whereas it turns out gradient descent is a great method for minimizing the cost function j to find w and b,

4:59there is one other algorithm that works only for linear regression and pretty much none of the other algorithms you see in this specialization for solving for w and b,

5:10and this other method does not need an iterative gradient descent algorithm.

5:15Called the normal equation method, it turns out to be possible to use an advanced linear algebra library to just solve for w and b all in one go without iterations.

5:26Some disadvantages of the normal equation method are, first, unlike gradient descent, this does not generalize to other learning algorithms,

5:35such as the logistic regression algorithm that you learn about next week or the neural networks or other algorithms you see later in this specialization.

5:44The normal equation method is also quite slow if the number of features n is large.

5:50Almost no machine learning practitioners should implement the normal equation method themselves,

5:56but if you are using a mature machine learning library and call linear regression, there is a chance that on the back end you will be using this to solve for w and b.

6:08So if you are ever in a job interview and hear the term normal equation, that's what this refers to.

6:14Don't worry about the details of how the normal equation works.

6:18Just be aware that some machine learning libraries may use this complicated method in the back end to solve for w and b.

6:26But for most learning algorithms, including how you implement linear regression yourself, gradient descents are often a better way to get the job done.

6:36In the optional lab that follows this video, you see how to define a multiple regression model in code, and also how to calculate the prediction f of x.

6:47You also see how to calculate the cost and implement gradient descent for a multiple linear regression model.

6:55This will be using Python's NumPy library, so if any of the code looks very new, that's okay.

7:02But you should feel free also to take a look at the previous optional lab that introduces NumPy and vectorization for a refresher of NumPy functions and how to implement those in code.

7:15So that's it. You now know multiple linear regression.

7:19This is probably the single most widely used learning algorithm in the world today.

7:24But there's more. With just a few tricks, such as picking and scaling features appropriately, and also choosing the learning rate alpha appropriately, you'll be able to make this work much better.

7:35So just a few more videos to go for this week. Let's go on to the next video to see those little tricks that'll help you make multiple linear regression work much better.