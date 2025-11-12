0:01Welcome to the third week of this course.

0:03By the end of this week, you have completed the first course of this specialization.

0:08So, let's jump in.

0:10Last week, you learned about linear regression, which predicts a number.

0:15This week, you learned about classification,

0:17where your output variable y can take on only one of a small handful of possible values,

0:23instead of any number in an infinite range of numbers.

0:27It turns out that linear regression is not a good algorithm for classification problems.

0:32Let's take a look at why,

0:34and this will lead us into a different algorithm called logistic regression,

0:39which is one of the most popular and most widely used learning algorithms today.

0:43Here are some examples of classification problems.

0:46Recall the example of trying to figure out whether an email is spam.

0:52So, the answer you want to output is going to be either a no or a yes.

0:57Another example would be figuring out if an online financial transaction is fraudulent.

1:04Fighting online financial fraud is something I once worked on,

1:08and it was strangely exhilarating because I knew there were forces out there trying to steal money,

1:14and my team's job was to stop them.

1:17So, the problem is, given a financial transaction,

1:21can your learning algorithm figure out is this transaction fraudulent,

1:26such as was this credit card stolen.

1:29Another example we've touched on before was trying to classify a tumor as malignant versus not.

1:37In each of these problems, the variable that you want to predict can only be one of two possible values,

1:45either no or yes.

1:47This type of classification problem, where there are only two possible outputs,

1:51is called binary classification,

1:54where the word binary refers to there being only two possible classes or two possible categories.

2:02In these problems, I will use the terms class and category relatively interchangeably.

2:10They mean basically the same thing.

2:12By convention, we can refer to these two classes or categories in a few common ways.

2:18We often designate classes as no or yes,

2:22or sometimes equivalently, false or true,

2:26or very commonly using the numbers 0 or 1,

2:31following the common convention in computer science with 0 denoting false and 1 denoting true.

2:39I'm usually going to use the numbers 0 and 1 to represent the answer y,

2:45because that will fit in most easily with the types of learning algorithms we want to implement.

2:50But when we talk about it, we'll often say no or yes, or false or true as well.

2:57One of the terminologies commonly used is to call the false or 0 class the negative class,

3:04and the true or the 1 class the positive class.

3:09For example, for spam classification, an email that is not spam may be referred to as a negative example,

3:17because the output to the question of is it spam, the output is no or 0.

3:23In contrast, an email that is spam might be referred to as a positive training example,

3:30because the answer to is it spam is yes or true or 1.

3:36To be clear, negative and positive do not necessarily mean bad versus good or evil versus good.

3:42It's just that negative and positive examples are used to convey the concepts of absence or 0 or false

3:49versus the presence or true or 1 of something you might be looking for,

3:53such as the absence or presence of the spaminess or the spam property of an email,

3:59or the absence or presence of fraudulent activity, or absence or presence of malignancy in a tumor.

4:06Between non-spam and spam emails, which one you call false or 0 and which one you call true or 1 is a little bit arbitrary.

4:16Often, either choice could work.

4:20So a different engineer might actually swap it around and have the positive class be the presence of a good email

4:27or the positive class be the presence of a real financial transaction or a healthy patient.

4:34So how do you build a classification algorithm?

4:38Here's the example of a training set for classifying if a tumor is malignant.

4:44A class 1 positive class, yes class, or benign class 0 or negative class.

4:51I've plotted both the tumor size on the horizontal axis as well as the label Y on the vertical axis.

4:59By the way, in week 1, when we first talked about classification,

5:03this is how we previously visualized it on the number line,

5:07except that now we're calling the classes 0 and 1 and plotting them on the vertical axis.

5:14Now, one thing you could try on this training set is to apply the algorithm you already know, linear regression,

5:22and try to fit a straight line to the data.

5:25If you do that, maybe the straight line looks like this, right?

5:29And that's your f of x.

5:32Linear regression predicts not just the values 0 and 1, but all numbers between 0 and 1,

5:38or even less than 0 or greater than 1.

5:42But here, we want to predict categories.

5:46One thing you could try is to pick a threshold of, say, 0.5,

5:52so that if the model outputs a value below 0.5, then you predict Y equals 0, or not malignant,

6:01and if the model outputs a number equal to or greater than 0.5, then predict Y equals 1, or malignant.

6:10Notice that this threshold value, 0.5, intersects the best fit straight line at this point,

6:18so if you draw this vertical line here, everything to the left ends up with a prediction of Y equals 0,

6:26and everything on the right ends up with a prediction of Y equals 1.

6:31Now, for this particular dataset, it looks like linear regression could do something reasonable.

6:38But now, let's see what happens if your dataset has one more training example,

6:43this one way over here on the right.

6:46Let's also extend the horizontal axis.

6:49Notice that this training example shouldn't really change how you classify the data points.

6:55This vertical dividing line that we drew just now still makes sense as the cutoff

7:00where 2 miss smaller than this should be classified as 0, and 2 miss greater than this should be classified as 1.

7:07But once you've added this extra training example on the right,

7:10the best fit line for linear regression will shift over like this,

7:15and if you continue using the threshold of 0.5,

7:20you now notice that everything to the left of this point is predicted as 0, non-malignant,

7:27and everything to the right of this point is predicted to be 1, or malignant.

7:33This isn't what we want, because adding that example way to the right

7:38shouldn't change any of our conclusions about how to classify malignant versus benign tumors.

7:45But if you try to do this with linear regression, adding this one example,

7:50which feels like it shouldn't be changing anything,

7:52it ends up with us learning a much worse function for this classification problem.

7:57Clearly, when a tumor is large, we want the algorithm to classify it as malignant.

8:03So what we just saw was linear regression causes the best fit line,

8:09when we added one more example to the right, to shift over,

8:13and thus the dividing line, also called the decision boundary, to shift over to the right.

8:20You'll learn more about the decision boundary in the next video.

8:25You'll also learn about an algorithm called logistic regression,

8:29where the output value of the outcome will always be between 0 and 1,

8:34and the algorithm will avoid these problems that we're seeing on the slide.

8:38By the way, one thing confusing about the name logistic regression is that

8:43even though it has the word regression in it, it's actually used for classification.

8:48Don't be confused by the name, which was given for historical reasons.

8:53It's actually used to solve binary classification problems,

8:56where the output label y is either 0 or 1.

9:00In the upcoming optional lab, you'll also get to take a look at what happens

9:05when you try to use linear regression for classification.

9:10Sometimes you get lucky and it may work, but often it will not work well,

9:16which is why I don't use linear regression myself for classification.

9:21In the optional lab, you'll see an interactive plot that attempts to classify between two categories,

9:27and you'll hopefully notice how this often doesn't work very well,

9:32which is okay, because that motivates the need for a different model to do classification tasks.

9:38So, please check out this optional lab, and after that,

9:42we'll go on to the next video to look at logistic regression for classification.

---

0:00Let's talk about logistic regression, which is probably the single most widely used

0:05classification algorithm in the world. This is something that I use all the time in my work.

0:10Let's continue with the example of classifying whether a tumor is malignant,

0:16where, as before, we're going to use the label 1, or yes, the positive clause to represent

0:21malignant tumors, and 0, or no, or negative examples to represent benign tumors.

0:27Here's a graph of the dataset, where the horizontal axis is the tumor size,

0:33and the vertical axis takes on only values of 0 and 1, because it's a classification problem.

0:40You saw in the last video that linear regression is not a good algorithm for this problem.

0:46In contrast, what logistic regression will end up doing is fit a curve that looks like this,

0:54a sort of S-shaped curve to this dataset. For this example, if a patient comes in with a tumor

1:03of this size, which I'm showing on the x-axis, then the algorithm will output 0.7,

1:11suggesting that it's closer or maybe more likely to be malignant and benign. We'll say more later

1:18what 0.7 actually means in this context, but the output label y is never 0.7, is only ever 0 or 1.

1:29To build up to the logistic regression algorithm, there's an important mathematical function I'd

1:34like to describe, which is called the sigmoid function, sometimes also referred to as the

1:41logistic function. The sigmoid function looks like this. Notice that the x-axis of the graphs

1:49on the left and right are different. In the graph to the left, on the x-axis is the tumor size,

1:56so it's all positive numbers. Whereas in the graph on the right, you have 0 down here,

2:02and the horizontal axis takes on both negative and positive values,

2:09and I've labeled the horizontal axis z. I'm showing here just a range of negative 3 to plus 3.

2:18The sigmoid function outputs values between 0 and 1. If I use g of z to denote this function,

2:26then the formula of g of z is equal to 1 over 1 plus e to the negative z, where here e is a

2:35mathematical constant that takes on a value of about 2.7, and so e to the negative z is that

2:42mathematical constant to the power of negative z. Notice if z were really big, say 100, e to the

2:51negative z is e to the negative 100, which is a tiny, tiny number. So this ends up being 1 over

3:011 plus a tiny little number, and so the denominator will be basically very, very close to 1,

3:08which is why when z is large, g of z, that is the sigmoid function of z, is going to be very close

3:16to 1. And conversely, you can also check for yourself that when z is a very large negative

3:24number, then g of z becomes 1 over a giant number, which is why g of z is very close to 0.

3:35So that's why the sigmoid function has this shape, where it starts very close to 0 and

3:41slowly builds up or grows to the value of 1. Also, in the sigmoid function, when z is equal to 0,

3:52then e to the negative z is e to the negative 0, which is equal to 1, and so g of z is equal to

4:001 over 1 plus 1, which is 0.5. So that's why it pauses the vertical axis at 0.5.

4:11Now let's use this to build up to the logistic regression algorithm. We're going to do this

4:17in two steps. In the first step, I hope you remember that a straight line function,

4:23like a linear regression function, can be defined as w dot product of x plus b.

4:31So let's store this value in a variable, which I'm going to call z. And this will turn out to

4:38be the same z as the one you saw on the previous slide, but we'll get to that in a minute.

4:43The next step then is to take this value of z and pass it to the sigmoid function,

4:51also called the logistic function, g. So now g of z then outputs a value computed

5:01by this formula, 1 over 1 plus e to the negative z, that's going to be between 0 and 1.

5:06When you take these two equations and put them together,

5:10they then give you the logistic regression model f of x, which is equal to g of wx plus b,

5:22or equivalently, g of z, which is equal to this formula over here.

5:30So this is the logistic regression model, and what it does is it inputs a feature,

5:39or set of features x, and it outputs a number between 0 and 1.

5:45Next, let's take a look at how to interpret the output of logistic regression.

5:51We'll return to the tumor classification example. The way I'd encourage you to think

5:57of logistic regression's output is to think of it as outputting the probability

6:03that the class or the label y will be equal to 1 given a certain input x.

6:10So for example, in this application where x is the tumor size and y is either 0 or 1,

6:18if you have a patient come in and she has a tumor of a certain size x,

6:23and if, based on this input x, the model outputs 0.7, then what that means is that the model is

6:32predicting, or the model thinks, there's a 70% chance that the true label y will be equal to 1

6:39for this patient. In other words, the model is telling us that it thinks the patient has a 70%

6:46chance of the tumor turning out to be malignant. Now, let me ask you a question.

6:54See if you can get this right. We know that y has to be either 0 or 1.

7:01So if y has a 70% chance of being 1, what is the chance that it is 0?

7:08So y has got to be either 0 or 1, and thus the probability of it being 0 or 1,

7:15these two numbers have to add up to 1, or to 100% chance. So that's why if the chance of y being 1

7:23is 0.7, or 70% chance, then the chance of it being 0 has got to be 0.3, or 30% chance.

7:32If someday you read research papers or blog posts about logistic regression,

7:37sometimes you see this notation that f of x is equal to p of y equals 1,

7:45given the input features x and with parameters w and b. What the semicolon here is used to denote

7:54is just that w and b are parameters that affect this computation of what is the probability of

8:01y being equal to 1, given the input feature x. For the purpose of this class, don't worry too

8:07much about what this vertical line and what this semicolon mean. You don't need to remember or

8:14follow any of this mathematical notation for this class. I'm mentioning this only because you may

8:18see this in other places. In the optional lab that follows this video, you also get to see

8:24how the sigmoid function is implemented in code. You can see a plot that uses the sigmoid function

8:31so as to do better on the classification task that you saw in the previous optional lab.

8:37Remember that the code will be provided to you, so you just have to run it. I hope you take a look

8:42and get familiar with the code. So, congrats on getting here. You now know what is the logistic

8:50regression model, as well as the mathematical formula that defines logistic regression.

8:56For a long time, a lot of internet advertising was actually driven by basically a slight variation

9:02of logistic regression. This was very lucrative for some large companies, and this is basically

9:07the algorithm that decided what ad was shown to you and many others on some large websites.

9:14Now, there's even more to learn about this algorithm. In the next video, we'll take a look

9:19at the details of logistic regression. We'll look at some visualizations and also examine

9:25something called the decision boundary. This will give you a few different ways to map the numbers

9:32that this model outputs, such as 0.3 or 0.7 or 0.65, to a prediction of whether y is actually

9:400 or 1. So, let's go on to the next video to learn more about logistic regression.

---

0:01In the last video, you learned about the logistic regression model.

0:05Now, let's take a look at the decision boundary to get a better sense of how logistic regression is computing its predictions.

0:13To recap, here's how the logistic regression model's outputs are computed in two steps.

0:20In the first step, you compute z as w dot x plus b.

0:26Then, you apply the sigmoid function g to this value z, and here again is the formula for the sigmoid function.

0:35Another way to write this is, we can say f of x is equal to g, the sigmoid function, also called the logistic function,

0:45applied to w dot x plus b, where this is of course the value of z.

0:52And if you take the definition of the sigmoid function and plug in the definition of z,

0:59then you find that f of x is equal to this formula over here, 1 over 1 plus e to the negative z, where z is w dot x plus b.

1:11And you may remember we said in the previous video that we interpret this as the probability that y is equal to 1,

1:19given x, and with parameters w and b, and so this is going to be a number, like maybe 0.7 or 0.3.

1:27Now, what if you want the learning algorithm to predict, is the value of y going to be 0 or 1?

1:35Well, one thing you might do is set a threshold above which you predict y is 1, or you set y hat, the prediction, to be equal to 1,

1:45and below which you might say y hat, my prediction, is going to be equal to 0.

1:51So, a common choice would be to pick a threshold of 0.5, so that if f of x is greater than or equal to 0.5, then predict y is 1,

2:03and we write that prediction as y hat equals 1, or if f of x is less than 0.5, then predict y is 0,

2:11or in other words, the prediction, y hat is equal to 0.

2:16So, now let's dive deeper into when the model would predict 1.

2:20In other words, when is f of x greater than or equal to 0.5?

2:25We'll recall that f of x is just equal to g of z, and so f is greater than or equal to 0.5 whenever g of z is greater than or equal to 0.5.

2:38But when is g of z greater than or equal to 0.5?

2:43Well, here's the sigmoid function over here, and so g of z is greater than or equal to 0.5 whenever z is greater than or equal to 0, right?

2:57That is, whenever z is on the right half of this axis.

3:03And finally, when is z greater than or equal to 0?

3:07Well, z is equal to w dot x plus b, and so z is greater than or equal to 0 whenever w dot x plus b is greater than or equal to 0.

3:20So, to recap, what you've seen here is that the model predicts 1 whenever w dot x plus b is greater than or equal to 0.

3:33And conversely, when w dot x plus b is less than 0, the algorithm predicts y is 0.

3:43So, given this, let's now visualize how the model makes predictions.

3:49I'm going to take an example of a classification problem where you have two features, x1 and x2, instead of just one feature.

3:59Here's a training set where the little red crosses denote the positive examples, and the little blue circles denote negative examples.

4:08So the red crosses correspond to y equals 1, and the blue circles correspond to y equals 0.

4:19So, the logistic regression model will make predictions using this function, f of x equals g of z,

4:26where z is now this expression over here, w1 x1 plus w2 x2 plus b, because we have two features, x1 and x2.

4:38And let's just say, for this example, that the value of the parameters are w1 equals 1, w2 equals 1, and b equals negative 3.

4:50And let's now take a look at how logistic regression makes predictions.

4:55In particular, let's figure out when wx plus b is greater than or equal to 0, and when wx plus b is less than 0.

5:04To figure that out, there's a very interesting line to look at, which is when wx plus b is exactly equal to 0.

5:13It turns out that this line is also called the decision boundary, because that's the line where you're just almost neutral about whether y is 0 or y is 1.

5:27Now, for the values of the parameters w1, w2, and b that we had written down above, this decision boundary is just x1 plus x2 minus 3.

5:43And so, when is x1 plus x2 minus 3 equal to 0?

5:49Well, that will correspond to the line x1 plus x2 equals 3, and that is this line shown over here.

6:01And so, this line turns out to be the decision boundary, where if the features x are to the right of this line, logistic regression would predict 1,

6:13and to the left of this line, logistic regression would predict 0.

6:19In other words, what we have just visualized is the decision boundary for logistic regression when the parameters w1, w2, and b are 1, 1, and negative 3.

6:32Of course, if you had a different choice of the parameters, the decision boundary would be a different line.

6:39Now, let's look at a more complex example where the decision boundary is no longer a straight line.

6:46As before, crosses denote the class y equals 1, and the little circles denote the class y equals 0.

6:57Earlier last week, you saw how to use polynomials in linear regression, and you can do the same in logistic regression.

7:07So, let's set z to be w1 x1 squared plus w2 x2 squared plus b.

7:17With this choice of features, polynomial features into logistic regression, so f of x, which equals g of z, is now g of this expression over here.

7:27And let's say that we end up choosing w1 and w2 to be 1, and b to be negative 1.

7:36So, z is equal to 1 times x1 squared plus 1 times x2 squared minus 1.

7:43And the decision boundary, as before, will correspond to when z is equal to 0.

7:50And so this expression will be equal to 0 when x1 squared plus x2 squared is equal to 1.

7:57And if you plot on the diagram on the left, the curve corresponding to x1 squared plus x2 squared equals 1, this turns out to be this circle.

8:09When x1 squared plus x2 squared is greater than or equal to 1, that's this area outside the circle, and that's when you predict y to be 1.

8:19Conversely, when x1 squared plus x2 squared is less than 1, that's this area inside the circle, and that's when you predict y to be 0.

8:31So, can we come up with even more complex decision boundaries than these?

8:36Yes, you can. You can do so by having even higher-order polynomial terms.

8:42Say z is w1x1 plus w2x2 plus w3x1 squared plus w4x1x2 plus w5x2 squared.

8:53Then it's possible that you can get even more complex decision boundaries.

8:58The model can define decision boundaries such as this example, an ellipse that's like this, or with a different choice of the parameters.

9:09You can even get more complex decision boundaries, which can look like functions that maybe look like that.

9:16So, this is an example of an even more complex decision boundary than the ones we've seen previously.

9:23And this implementation of logistic regression will predict y equals 1 inside this shape, and outside this shape will predict y equals 0.

9:34So, with these polynomial features, you can get very complex decision boundaries.

9:40In other words, logistic regression can learn to fit pretty complex data.

9:45Although, if you were to not include any of these higher-order polynomials, so if the only features you use are x1, x2, x3, and so on,

9:54then the decision boundary for logistic regression will always be linear, will always be a straight line.

10:01In the upcoming optional lab, you also get to see the code implementation of the decision boundary.

10:08In the example in the lab, there will be two features, so you can see the decision boundary as a line.

10:15So, with this visualization, I hope that you now have a sense of the range of possible models you can get with logistic regression.

10:23Now that you've seen what f of x can potentially compute,

10:27let's take a look at how you can actually train a logistic regression model.

10:32We'll start by looking at the cost function for logistic regression, and after that, figure out how to apply gradient descent to it.

10:39Let's go on to the next video.