0:01In this video, we'll look at what the overall process of supervised learning is like.

0:08Specifically, you see the first model of this course, a linear regression model.

0:14That just means fitting a straight line to your data.

0:17It is probably the most widely used learning algorithm in the world today,

0:22and as you get familiar with linear regression,

0:25many of the concepts you see here will also apply to other machine learning models.

0:30Models that you'll see later in this specialization.

0:34Let's start with a problem that you can address using linear regression.

0:38Say you want to predict the price of a house based on the size of a house.

0:42This is the example we've seen earlier this week.

0:45We're going to use a dataset on house sizes and prices from Portland, a city in the United States.

0:53Here we have a graph where the horizontal axis is the size of the house in square feet,

0:57and the vertical axis is the price of the house in thousands of dollars.

1:03Let's go ahead and plot the data points for various houses in the dataset.

1:08Here at each data point, each of these little crosses is a house with a size and a price that it most recently was sold for.

1:17Now, let's say you're a real estate agent in Portland, and you're helping a client sell her house.

1:23And she's asking you, how much do you think you can get for this house?

1:27This dataset might help you estimate the price she could get for it.

1:32You start by measuring the size of the house, and it turns out that her house is 1,250 square feet.

1:39How much do you think this house could sell for?

1:42One thing you could do is, you can build a linear regression model from this dataset.

1:48Your model will fit a straight line to the data, which might look like this.

1:53And based on this straight line fit to the data, you can kind of see that if a house is 1,250 square feet,

2:01it will intersect the best fit line over here.

2:04And if you trace that to the vertical axis on the left, you can see the price is maybe around here, say about $220,000.

2:13So this is an example of what's called a supervised learning model.

2:17We call this supervised learning because you are first training your model by giving it data that has the right answers.

2:24Because you give the model examples of houses with both the size of the house, as well as the price that the model should predict for each house.

2:32Where here, the prices, that is the right answers, are given for every house in the dataset.

2:38This linear regression model is a particular type of supervised learning model.

2:43It's called a regression model because it predicts numbers as the output, like prices and dollars.

2:49Any supervised learning model that predicts a number, such as 220,000 or 1.5 or negative 33.2, is addressing what's called a regression problem.

3:03So linear regression is one example of a regression model, but there are other models for addressing regression problems too.

3:12And we'll see some of those later in course 2 of this specialization.

3:17And just to remind you, in contrast with the regression model, the other most common type of supervised learning model is called a classification model.

3:28A classification model predicts categories or discrete categories, such as predicting if a picture is of a cat, meow, or a dog, woof.

3:39Or if given a medical record, it has to predict if a patient has a particular disease.

3:45You'll see more about classification models later in this course as well.

3:50So as a reminder about the difference between classification and regression, in classification, there are only a small number of possible outputs.

3:59If your model is recognizing cats versus dogs, that's two possible outputs.

4:04Or maybe you're trying to recognize any of 10 possible medical conditions in a patient.

4:12So there's a discrete, finite set of possible outputs.

4:16We call it a classification problem, whereas in regression, there are infinitely many possible numbers that the model could output.

4:24In addition to visualizing this data as a plot here on the left, there's one other way of looking at the data that would be useful.

4:34And that's a data table here on the right.

4:39The data comprises a set of inputs.

4:42This would be the size of the house, which is this column here.

4:46It also has outputs.

4:49You're trying to predict the price, which is this column here.

4:54Notice that the horizontal and vertical axes correspond to these two columns, the size and the price.

5:04And so if you have, say, 47 rows in this data table, then there are 47 of these lower crosses on the plot of the left, each cross corresponding to one row of the table.

5:22For example, the first row of the table is a house with size 2,104 square feet.

5:31So that's around here.

5:34And this house sold for $400,000, which is around here.

5:41So this first row of the table is plotted as this data point over here.

5:48Now let's look at some notation for describing the data.

5:53This is notation that you find useful throughout your journey in machine learning.

5:58As you increasingly get familiar with machine learning terminology, this would be terminology that you can use to talk about machine learning concepts with others as well, since a lot of this is quite standard across AI.

6:12You'll be seeing this notation multiple times in this specialization, so it's okay if you don't remember everything the first time through. It will naturally become more familiar over time.

6:24The dataset that you just saw and that is used to train the model is called a training set.

6:33Note that your client's house is not in this dataset because it's not yet sold, so no one knows what its price is.

6:41So to predict the price of your client's house, you first train your model to learn from the training set, and that model can then predict your client's house's price.

6:53In machine learning, the standard notation to denote the input here is lowercase x, and we call this the input variable.

7:03It's also called a feature or an input feature.

7:09For example, for the first house in your training set, x is the size of the house, so x equals 2104.

7:19The standard notation to denote the output variable, which you're trying to predict, which is also sometimes called the target variable, is lowercase y.

7:34Here, y is the price of the house, and for the first training example, this is equal to 400, so y equals 400.

7:48The dataset has one row for each house, and in this particular training set, there are 47 rows, with each row representing a different training example.

8:04We're going to use lowercase m to refer to the total number of training examples, and so here, m is equal to 47.

8:13To indicate a single training example, we're going to use the notation parentheses x comma y.

8:22For the first training example, x comma y, this pair of numbers is 2104 comma 400.

8:33Now, we have a lot of different training examples. We have 47 of them, in fact.

8:38So, to refer to a specific training example, this will correspond to a specific row in this table on the left.

8:47I'm going to use the notation x superscript in parentheses i comma y superscript in parentheses i.

8:57This superscript tells us that this is the i-th training example, such as the first, second, or third up to the 47th training example.

9:09i here refers to a specific row in the table.

9:15So, for instance, here is the first example when i equals 1 in the training set.

9:25And so x superscript 1 is equal to 2104, and y superscript 1 is equal to 400.

9:36And let's add the superscript 1 here as well.

9:41Just a note, this superscript i in parentheses is not exponentiation.

9:47So when I write this, this is not x squared. This is not x to the power of 2.

9:55It just refers to the second training example.

9:59So this i is just an index in the training set, and refers to row i in the table.

10:06In this video, you saw what a training set is like, as well as the standard notation for describing this training set.

10:13In the next video, let's look at what it will take to take this training set that you just saw and feed it to a learning algorithm so that the algorithm can learn from this data.

10:24Let's see that in the next video.

---
0:01Let's look in this video at the process of how supervised learning works.

0:06Supervised learning algorithm will input a dataset,

0:09and then what exactly does it do and what does it output?

0:12Let's find out in this video.

0:14Recall that a training set in supervised learning

0:18includes both the input features,

0:20such as the size of the holes,

0:21and also the output targets,

0:24such as the price of the holes.

0:26The output targets are the right answers

0:28that the model will learn from.

0:30To train the model, you feed the training set,

0:33both the input features and the output targets,

0:36to your learning algorithm.

0:39Then, your supervised learning algorithm

0:42will produce some function.

0:45We'll write this function as lowercase f,

0:47where f stands for function.

0:50Historically, this function used to be called a hypothesis,

0:54but I'm just going to call it a function f in this class.

0:58And the job of f is to take the new input, x,

1:04and output an estimate or a prediction,

1:08which I'm going to call y-hat.

1:11And it's written like the variable y

1:14with this little hat symbol on top.

1:18In machine learning, the convention is that y-hat

1:22is the estimate or the prediction for y.

1:27The function f is called the model.

1:31x is called the input or the input feature,

1:35and the output of the model is the prediction, y-hat.

1:41The model's prediction is the estimated value of y.

1:45When the symbol is just the letter y,

1:49then that refers to the target,

1:51which is the actual true value in the training set.

1:55In contrast, y-hat is an estimate.

1:58It may or may not be the actual true value.

2:02Well, if you're helping your client to sell their house,

2:05well, the true price of the house

2:06is unknown until they sell it.

2:09So your model f, given the size,

2:12outputs a price which is the estimated,

2:14that is the prediction of what the true price will be.

2:19Now, when we design a learning algorithm,

2:22a key question is,

2:24how are we going to represent the function f?

2:28Or in other words, what is the math formula

2:31we're going to use to compute f?

2:35For now, let's stick with f being a straight line.

2:39So your function can be written as

2:42f subscript w comma b of x

2:46equals, I'm going to use w times x plus b.

2:52I'll define w and b soon,

2:55but for now, just know that w and b are numbers,

2:58and the values chosen for w and b

3:01will determine the prediction y-hat

3:04based on the input feature x.

3:08So this f w b of x means f is a function

3:13that takes x's input,

3:15and depending on the values of w and b,

3:18f will output some value of a prediction y-hat.

3:24As an alternative to writing this f w comma b of x,

3:29I'll sometimes just write f of x

3:32without explicitly including w and b in the subscript.

3:35It's just a simple notation,

3:37but means exactly the same thing as f w b of x.

3:43Let's plot the trading set on the graph

3:46where the input feature x is on the horizontal axis,

3:49and the output target y is on the vertical axis.

3:53Remember, the algorithm learns from this data

3:57and generates a bested line, like maybe this one here.

4:02This straight line is the linear function

4:05f w b of x equals w times x plus b.

4:11Or more simply, we can drop w and b

4:15and just write f of x equals wx plus b.

4:20Here's what this function is doing.

4:22It's making predictions for the value of y

4:25using a straight line function of x.

4:28So you may ask, why are we choosing a linear function

4:32where linear function is just a fancy term

4:34for a straight line instead of some nonlinear function

4:38like a curve or a parabola?

4:41Well, sometimes you want to fit

4:42more complex nonlinear functions as well,

4:45like a curve like this.

4:47But since this linear function is relatively simple

4:50and easy to work with, let's use a line as a foundation

4:54that will eventually help you

4:55to get to more complex models that are nonlinear.

5:00This particular model as a name is called linear regression.

5:04More specifically, this is linear regression

5:07with one variable, where the phrase one variable

5:10means that there's a single input variable or feature x,

5:14namely the size of the host.

5:17Another name for a linear model with one input variable

5:21is univariate linear regression,

5:23where uni means one in Latin

5:26and where variate means variable.

5:29So univariate is just a fancy way of saying one variable.

5:34In a later video, you'll also see a variation of regression

5:38where you want to make a prediction

5:40based not just on the size of a host,

5:42but on a bunch of other things

5:44that you may know about the host,

5:46such as the number of bedrooms and other features.

5:49And by the way, when you're done with this video,

5:51there is another optional lab.

5:53You don't need to write any code.

5:55Just review it, run the code and see what it does.

5:58That will show you how to define in Python

6:01a straight line function.

6:03And the lab will let you choose the values of W and B

6:07to try to fit the training data.

6:10You don't have to do the lab if you don't want to,

6:13but I hope you play with it

6:14when you're done watching this video.

6:17So that's linear regression.

6:19In order for you to make this work,

6:21one of the most important things you have to do

6:22is construct a cost function.

6:25The idea of a cost function is one of the most universal

6:28and important ideas in machine learning

6:31and is used in both linear regression

6:33and in training many of the most advanced AI models

6:36in the world.

6:37So let's go on to the next video

6:39and take a look at how you can construct a cost function.

---

0:01In order to implement linear regression,

0:04the first key step is for us to define something called a cost function.

0:08This is something we'll build in this video.

0:10And the cost function will tell us how well the model is doing,

0:14so that we can try to get it to do better.

0:17Let's look at what this means.

0:19Recall that you have a training set that contains input features x and output targets y.

0:26And the model you're going to use to fit this training set is this linear function,

0:32fwb of x equals w times x plus b.

0:37To introduce a little bit more terminology,

0:40the w and b are called the parameters of the model.

0:44In machine learning, parameters of a model are the variables you can adjust during training

0:51in order to improve the model.

0:54Sometimes, you also hear the parameters w and b referred to as coefficients or as weights.

1:02Now, let's take a look at what these parameters w and b do.

1:08Depending on the values you've chosen for w and b,

1:11you get a different function, f of x, which generates a different line on the graph.

1:17And remember that we can write f of x as a shorthand for fwb of x.

1:24We're going to take a look at some plots of f of x on a chart.

1:29Maybe you're already familiar with drawing lines on charts,

1:32but even if this is a review for you,

1:34I hope this will help you build intuition on how w and b, the parameters, determine f.

1:42When w is equal to 0 and b is equal to 1.5, then f looks like this horizontal line.

1:50In this case, the function f of x is 0 times x plus 1.5,

1:57so f is always a constant value.

2:00It always predicts 1.5 for the estimated value of y.

2:05So y hat is always equal to b, and here b is also called the y-intercept

2:12because that's where it crosses the vertical axis or the y-axis on this graph.

2:18As a second example, if w is 0.5 and b is equal to 0, then f of x is 0.5 times x.

2:28When x is 0, the prediction is also 0,

2:32and when x is 2, then the prediction is 0.5 times 2, which is 1.

2:38So you get a line that looks like this.

2:40Notice that the slope is 0.5 divided by 1,

2:46so the value of w gives you the slope of the line, which is 0.5.

2:53And finally, if w equals 0.5 and b equals 1, then f of x is 0.5 times x plus 1,

3:04and when x is 0, then f of x equals b, which is 1,

3:09so the line intersects the vertical axis at b, the y-intercept.

3:14Also, when x is 2, then f of x is 2, so the line looks like this.

3:21Again, the slope is 0.5 divided by 1, so the value of w gives you the slope, which is 0.5.

3:29Recall that you have a training set like the one shown here.

3:33With linear regression, what you want to do is to choose values for the parameters w and b

3:39so that the straight line you get from the function f somehow fits the data well,

3:44like maybe this line shown here.

3:47And when I say that the line fits the data visually,

3:51you can think of this to mean that the line defined by f is roughly passing through

3:56or somewhat close to the training examples as compared to other possible lines

4:02that are not as close to these points.

4:05And just to remind you of some notation, a training example like this point here

4:11is defined by x superscript i, y superscript i, where y is the target.

4:20For a given input x i, the function f also makes a predicted value for y,

4:29and the value that it predicts for y is y-hat i, shown here.

4:34For our choice of a model, f of x i is w times x i plus b.

4:40Stated differently, the prediction y-hat i is f of w b of x i,

4:47where for the model we're using, f of x i is equal to w x i plus b.

4:58So now the question is, how do you find values for w and b

5:04so that the prediction y-hat i is close to the true target y i

5:11for many or maybe all training examples x i, y i?

5:16To answer that question, let's first take a look at how to measure

5:21how well a line fits the training data.

5:24To do that, we're going to construct our cost function.

5:28The cost function takes the prediction y-hat and compares it to the target y

5:36by taking y-hat minus y.

5:39This difference is called the error.

5:42We're measuring how far off the prediction is from the target.

5:47Next, let's compute the square of this error.

5:52Also, we're going to want to compute this term for different training examples,

5:57i in the training set.

5:59So when measuring the error, for example, i, we'll compute this squared error term.

6:05Finally, we want to measure the error across the entire training set.

6:10In particular, let's sum up the squared errors like this.

6:14We'll sum from i equals 1, 2, 3, all the way up to m.

6:20Remember that m is the number of training examples, which is 47 for this data set.

6:26Notice that if we have more training examples, m is larger,

6:30and your cost function will calculate a bigger number

6:33since it's summing over more examples.

6:36To build a cost function that doesn't automatically get bigger

6:40as the training set size gets larger,

6:43by convention, we will compute the average squared error

6:48instead of the total squared error,

6:50and we do that by dividing by m like this.

6:55Okay, we're nearly there.

6:57Just one last thing.

6:59By convention, the cost function that machine learning people use

7:03actually divides by 2 times m.

7:06The extra division by 2 is just meant to make some of our later calculations

7:11a little bit neater, but the cost function still works

7:14whether you include this division by 2 or not.

7:17So this expression right here is the cost function,

7:20and we're going to write J of WB to refer to the cost function.

7:28This is also called the squared error cost function,

7:32and it's called this because you're taking the square of these error terms.

7:37In machine learning, different people will use different cost functions

7:41for different applications,

7:43but the squared error cost function is by far the most commonly used one

7:48for linear regression, and for that matter, for all regression problems,

7:52where it seems to give good results for many applications.

7:56So just as a reminder, the prediction Y hat is equal to the output of the model,

8:03f at x, so we can rewrite the cost function J of WB as 1 over 2m

8:13times the sum from i equals 1 to m of f of x, i, minus yi, the quantity squared.

8:23Eventually, we're going to want to find values of W and B

8:27that make the cost function small.

8:30But before going there, let's first gain more intuition

8:33about what J of WB is really computing.

8:38At this point, you might be thinking we've done a whole lot of math

8:42to define the cost function, but what exactly is it doing?

8:46Let's go on to the next video where we'll step through one example

8:50of what the cost function is really computing

8:53that I hope will help you build intuition about what it means

8:56if J of WB is large versus if the cost J is small.

9:01Let's go on to the next video.

---

0:02We've seen the mathematical definition of the cost function.

0:05Now, let's build some intuition about what the cost function is really doing.

0:09In this video, we'll walk through one example to see how the cost function can be used to find the best parameters for your model.

0:17I know this video is a little bit longer than the others, but bear with me, I think it'll be worth it.

0:22To recap, here's what we've seen about the cost function so far.

0:26You want to fit a straight line to the training data, so you have this model fwb of x is w times x plus b.

0:35And here, the model's parameters are w and b.

0:39Now, depending on the values chosen for these parameters, you get different straight lines, like this.

0:46And you want to find values for w and b so that the straight line fits the training data well.

0:53To measure how well a choice of w and b fits the training data, you have a cost function J.

1:02And what the cost function J does is, it measures the difference between the model's predictions and the actual true values for y.

1:13What you see later is that linear regression would try to find values for w and b that make J of w be as small as possible.

1:23In math, we write it like this. We want to minimize J as a function of w and b.

1:33So now, in order for us to better visualize the cost function J, let's work with a simplified version of the linear regression model.

1:41We're going to use the model fw of x is w times x.

1:48You can think of this as taking the original model on the left and getting rid of the parameter b, or setting the parameter b equal to 0, so it just goes away from the equation.

2:00So f is now just w times x.

2:04So you now have just one parameter, w, and your cost function J looks similar to what it was before, taking the difference and squaring it.

2:15Except that now, f is equal to w times xi, and J is now a function of just w.

2:25And the goal becomes a little bit different as well, because you have just one parameter, w, not w and b.

2:32So with this simplified model, the goal is to find the value for w that minimizes J of w.

2:41To see this visually, what this means is that if b is set to 0, then f defines a line that looks like this.

2:50And you see that the line passes through the origin here, because when x is 0, well, f of x is 0 too.

2:58Now, using this simplified model, let's see how the cost function changes as you choose different values for the parameter w.

3:07In particular, let's look at graphs of the model f of x and the cost function J.

3:15I'm going to plot these side by side, and you'll be able to see how the two are related.

3:21First, notice that for f subscript w, when the parameter w is fixed, that is, is always a constant value, then f w is only a function of x.

3:35Which means that the estimated value of y depends on the value of the input x.

3:42In contrast, looking to the right, the cost function J is a function of w, where w controls the slope of the line defined by f w.

3:55So the cost defined by J depends on a parameter, in this case, the parameter w.

4:03So let's go ahead and plot these functions f w of x and J of w side by side, so you can see how they are related.

4:15We'll start with a model that is the function f w of x on the left.

4:22Here, the input feature x is on the horizontal axis, and the output value y is on the vertical axis.

4:31Here's the plot of three points representing the trading set at positions 1, 1, 2, 2, and 3, 3.

4:40Let's pick a value for w, say w is 1.

4:44So for this choice of w, the function f w looks like this straight line with a slope of 1.

4:55Now, what you can do next is calculate the cost J when w equals 1.

5:03So you may recall that the cost function is defined as follows.

5:07It's the squared error cost function.

5:10So if you substitute f w of x i with w times x i, the cost function looks like this, where this expression is now w times x i minus y i.

5:25So for this value of w, it turns out that the error term inside the cost function for this w times x i minus y i is equal to 0 for each of the three data points.

5:37Because for this data set, when x is 1, then y is 1.

5:42When w is also 1, then f of x equals 1.

5:47So f of x equals y for this first training example, and the difference is 0.

5:53Plugging this into the cost function J, you get 0 squared.

5:58Similarly, when x is 2, then y is 2, and f of x is also 2.

6:05So again, f of x equals y for the second training example.

6:09In the cost function, the squared error for the second example is also 0 squared.

6:15Finally, when x is 3, then y is 3, and f of 3 is also 3.

6:23In the cost function, the third squared error term is also 0 squared.

6:27So for all three examples in this training set, f of x i equals y i for each training example i.

6:37So f of x i minus y i is 0.

6:43So for this particular data set, when w is 1, then the cost J is equal to 0.

6:52Now, what you can do on the right is plot the cost function J.

6:58And notice that because the cost function is a function of the parameter w,

7:03the horizontal axis is now labeled w and not x.

7:09And the vertical axis is now J and not y.

7:15So you have J of 1 equals to 0.

7:20In other words, when w equals 1, J of w is 0.

7:27So let me go ahead and plot that.

7:30Now let's look at how f and J change for different values of w.

7:36w can take on a range of values, right?

7:38So w can take on negative values, w can be 0, and it can take on positive values too.

7:45So what if w is equal to 0.5 instead of 1?

7:50What would these graphs look like then?

7:53Let's go ahead and plot that.

7:55So let's set w to be equal to 0.5.

7:59And in this case, the function f of x now looks like this.

8:04It's aligned with a slope equal to 0.5.

8:09And let's also compute the cost J when w is 0.5.

8:16Recall that the cost function is measuring the squared error or difference

8:20between the estimated value, that is, y-hat-i, which is f of x-i,

8:27and the true value, that is, y-i, for each example i.

8:34So visually, you can see that the error or difference is equal to the height

8:40of this vertical line here when x is equal to 1.

8:44Because this little line is the gap between the actual value of y

8:49and the value that the function f predicted, which is a bit further down here.

8:55So for this first example, when x is 1, f of x is 0.5.

9:03So the squared error on the first example is 0.5 minus 1 squared.

9:10Remember, the cost function will sum over all the training examples in the training set.

9:15So let's go on to the second training example.

9:19When x is 2, the model is predicting f of x is 1.

9:25And the actual value of y is 2.

9:29So the error for the second example is equal to the height of this little line segment here.

9:37And the squared error is the square of the length of this line segment.

9:42So you get 1 minus 2 squared.

9:46Let's do the third example.

9:48Repeating this process, the error here, also shown by this line segment, is 1.5 minus 3 squared.

9:59Next, we sum up all of these terms, which turns out to be equal to 3.5.

10:05Then we multiply this term by 1 over 2m, where m is the number of training examples.

10:15Since there are 3 training examples, m equals 3.

10:20So this is equal to 1 over 2 times 3, where this m here is 3.

10:29If we work out the math, this turns out to be 3.5 divided by 6.

10:35So the cost J is about 0.58.

10:40Let's go ahead and plot that over there on the right.

10:45Now let's try one more value for w.

10:48How about if w equals 0?

10:51What do the graphs for f and J look like when w is equal to 0?

10:57It turns out that if w is equal to 0, then f of x is just this horizontal line that is exactly on the x-axis.

11:07And so the error for each example is a line that goes from each point down to the horizontal line that represents f of x equals 0.

11:17So the cost J when w equals 0 is 1 over 2m times the quantity 1 squared plus 2 squared plus 3 squared.

11:29And that's equal to 1 over 6 times 14, which is about 2.33.

11:36So let's plot this point where w is 0 and J of 0 is 2.33 over here.

11:44And we can keep doing this for other values of w.

11:48Since w can be any number, it can also be a negative value.

11:53So if w is negative 0.5, then the line f is a downward sloping line like this.

12:02It turns out that when w is negative 0.5, then you end up with an even higher cost around 5.25, which is this point up here.

12:14And you can continue computing the cost function for different values of w and so on and plot these, right?

12:21So it turns out that by computing a range of values, you can slowly trace out what the cost function J looks like.

12:29And that's what J is.

12:32To recap, each value of parameter w corresponds to a different straight line fit f of x on the graph to the left.

12:43And for the given training set, that choice for a value of w corresponds to a single point, a single point on the graph on the right.

12:54Because for each value of w, you can calculate the cost J of w.

13:00For example, when w equals 1, this corresponds to this straight line fit through the data.

13:08And it also corresponds to this point on the graph of J, where w equals 1 and the cost J of 1 equals 0.

13:19Whereas when w equals 0.5, this gives you this line, which has a smaller slope.

13:26And this line, in combination with the training set, corresponds to this point on the cost function graph at w equals 0.5.

13:37So for each value of w, you wind up with a different line and its corresponding cost J of w.

13:45And you can use these points to trace out this plot on the right.

13:49Given this, how can you choose the value of w that results in the function f fitting the data well?

13:57Well, as you can imagine, choosing a value of w that causes J of w to be as small as possible seems like a good bet.

14:06J is the cost function that measures how big the squared errors are.

14:11So choosing w that minimizes these squared errors, makes them as small as possible, would give us a good model.

14:18In this example, if you were to choose the value of w that results in the smallest possible value of J of w, you'd end up picking w equals 1.

14:29And as you can see, that's actually a pretty good choice. This results in a line that fits the training data very well.

14:36So that's how, in linear regression, you use the cost function to find the value of w that minimizes J.

14:46Or in the more general case, when we had parameters w and b rather than just w, you find the values of w and b that minimize J.

14:58So to summarize, you solve plots of both f and J and work through how the two are related.

15:05As you vary w or vary w and b, you end up with different straight lines.

15:10And when that straight line passes close to the data, the cost J is small.

15:16So the goal of linear regression is to find the parameters w or w and b that results in the smallest possible value for the cost function J.

15:26Now in this video, we worked through our example with a simplified problem using only w.

15:33In the next video, let's visualize what the cost function looks like for the full version of linear regression using both w and b.

15:42And you'll see some cool 3D plots. Let's go to the next video.

---

0:01In the last video, you saw one visualization of the cost function J of W or J of WB.

0:08Let's look at some further, richer visualizations so we can get an even better intuition about what the cost function is doing.

0:16Here is what we've seen so far.

0:18There's the model, the model's parameters W and B, the cost function J of W and B, as well as the goal of linear regression, which is to minimize the cost function J of W and B over parameters W and B.

0:35In the last video, we had temporarily set B to 0 in order to simplify the visualizations.

0:42But now, let's go back to the original model with both parameters W and B without setting B to be equal to 0.

0:50Same as last time, we want to get a visual understanding of the model function f of x, shown here on the left, and how it relates to the cost function J of WB, shown here on the right.

1:06Here's a training set of house sizes and prices.

1:10Let's say you pick one possible function of x, like this one.

1:14Here, I've set W to 0.06 and B to 50.

1:20So f of x is 0.06 times x plus 50.

1:25Note that this is not a particularly good model for this training set.

1:28It's actually a pretty bad model that seems to consistently underestimate housing prices.

1:35Given these values for W and B, let's look at what the cost function J of W and B may look like.

1:42Recall what we saw last time was when you had only W because we temporarily set B to 0 to simplify things.

1:51Back then, we had come up with a plot of the cost function that looked like this as a function of W only.

2:00So when we had only one parameter W, the cost function had this U-shaped curve, shaped a bit like a soup bowl.

2:08Mmm, that sounds delicious.

2:10Now, in this housing price example that we have on this slide, we have two parameters, W and B, and so the plot becomes a little more complex.

2:23It turns out that the cost function also has a similar shape, like a soup bowl, except in three dimensions instead of two.

2:34In fact, depending on your training set, the cost function will look something like this.

2:40To me, this looks like a soup bowl, maybe because I'm a little bit hungry.

2:44Or maybe to you, it looks like a curved dinner plate or a hammock.

2:50Actually, that sounds relaxing too, and there's your coconut drink.

2:55Maybe when you're done with this course, you should treat yourself to a vacation and relax in a hammock like this.

3:01What you see here is a 3D surface plot where the axes are labeled W and B.

3:08So as you vary W and B, which are the two parameters of the model, you get different values for the cost function J of W and B.

3:19This is a lot like the U-shaped curve you saw in the last video, except instead of having one parameter, W, as input into J,

3:27you now have two parameters, W and B, as inputs into this soup bowl or this hammock-shaped function J.

3:35And I just want to point out that any single point on this surface represents a particular choice of W and B.

3:43For example, if W was minus 10 and B was minus 15, then the height of the surface above this point is the value of J when W is minus 10 and B is minus 15.

3:59Now, in order to look even more closely at specific points, there's another way of plotting the cost function J that would be useful for visualization,

4:10which is, rather than using these 3D surface plots, I'd like to take this exact same function J, so I'm not changing the function J at all,

4:19and plot it using something called a contour plot.

4:23And if you've ever seen a topographical map showing how high different mountains are,

4:28the contours in a topographical map are basically horizontal slices of the landscape of, say, a mountain.

4:36This image is of Mount Fuji in Japan. I still remember my family visiting Mount Fuji when I was a teenager.

4:45It's a beautiful sight.

4:47And if you fly directly above the mountain, that's what this contour map looks like.

4:53It shows all the points that are at the same height for different heights.

4:59At the bottom of this slide is the 3D surface plot of the cost function J.

5:05I know it doesn't look very bow-shaped, but it is actually a bow just very stretched out, which is why it looks like that.

5:13In an optional lab that is surely to follow, you'll be able to see this in 3D and spin around the surface yourself, and it'll look more obviously bow-shaped there.

5:24Next, here on the upper right is a contour plot of this exact same cost function as that shown at the bottom.

5:32The two axes on this contour plot are B on the vertical axis and W on the horizontal axis.

5:41What each of these ovals, also called ellipses, shows is the set of points on the 3D surface which are at the exact same height.

5:52In other words, the set of points which have the same value for the cost function J.

5:58To get a contour plot, you take the 3D surface at the bottom, and you use a knife to slice it horizontally.

6:08You take horizontal slices of that 3D surface and get all the points that are at the same height.

6:15Therefore, each horizontal slice ends up being shown as one of these ellipses, or one of these ovals.

6:25So concretely, if you take that point, and that point, and that point, all of these three points have the same value for the cost function J,

6:38even though they have different values for W and B.

6:44And in the figure on the upper left, you see also that these three points correspond to different functions, F,

6:53all three of which are actually pretty bad for predicting housing prices in this case.

6:58Now, the bottom of the boat, where the cost function J is at a minimum, is this point right here, at the center of these concentric ovals.

7:11If you haven't seen contour plots much before, I'd like you to imagine, if you will, that you're flying high up above the boat in an airplane or in a rocket ship,

7:23and you're looking straight down at it.

7:26So that is as if you set your computer monitor flat on your desk, facing up, and the boat shape is coming directly out of your screen, rising above your desk.

7:37Imagine that the boat shape grows out of your computer screen, lying flat, like that.

7:44So that each of these ovals have the same height above your screen, and the minimum of the boat is right down there, in the center of the smallest oval.

7:56So it turns out that the contour plots are a convenient way to visualize the 3D cost function J, but in a way that's plotted in just 2D.

8:07In this video, you saw how the 3D boat-shaped surface plot can also be visualized as a contour plot.

8:16Using this visualization tool, in the next video, let's visualize some specific choices of W and B in a linear regression model,

8:24so that we can see how these different choices affect the straight line you're fitting to the data.

8:30Let's go on to the next video.

---

0:04Let's look at some more visualizations of W and B.

0:07Here's one example.

0:09Over here, you have a particular point on the graph J.

0:14For this point, W equals about negative 0.15, and B equals about 800.

0:22So this point corresponds to one pair of values for W and B that yields a particular cost J.

0:30And in fact, this particular pair of values for W and B corresponds to this function, f of x,

0:37which is this line that you can see on the left.

0:41This line intersects the vertical axis at 800, because B equals 800,

0:47and the slope of the line is negative 0.15, because W equals negative 0.15.

0:54Now, if you look at the data points in the training set, you may notice that this line is not a good fit to the data.

1:01For this function, f of x, with these values of W and B,

1:07many of the predictions for the value of y are quite far from the actual target value of y that is in the training data.

1:16Because this line is not a good fit, if you look at the graph of J, the cost of this line is out here,

1:25which is pretty far from the minimum.

1:28It's a pretty high cost, because this choice of W and B is just not that good a fit to the training set.

1:35Now, let's look at another example with a different choice of W and B.

1:42Now, here is another function that is, you know, still not a great fit for the data, but maybe slightly less bad.

1:49So, this point here represents the cost for this particular pair of W and B that creates that line.

1:57The value of W is equal to 0, and the value of B is about 360.

2:04This pair of parameters corresponds to this function, which is a flat line, because f of x equals 0 times x plus 360.

2:14I hope that makes sense.

2:16Let's look at yet another example.

2:19Here's one more choice for W and B, and with these values, you end up with this line, f of x.

2:26Again, not a great fit to the data.

2:28It's actually further away from the minimum compared to the previous example.

2:33And remember that the minimum is at the center of that smallest ellipse.

2:38Last example.

2:40If you look at f of x on the left, this looks like a pretty good fit to the training set.

2:47You can see on the right, this point, representing the cost, is very close to the center of the small ellipse.

2:56It's not quite exactly the minimum, but it's pretty close.

3:00For this value of W and B, you get this line, f of x.

3:06You can see that if you measure the vertical distances between the data points and the predicted values on the straight line,

3:14you get the error for each data point.

3:18The sum of squared errors for all of these data points is pretty close to the minimum possible sum of squared errors among all possible straight line fits.

3:30I hope that by looking at these figures, you can get a better sense of how different choices of the parameters affect the line, f of x,

3:39and how this corresponds to different values for the cost, J.

3:45Hopefully, you can see how the better fit lines correspond to points on the graph of J that are closer to the minimum possible cost for this cost function, J of W and B.

4:01In the optional lab that follows this video, you get to run some code.

4:07Remember, all of the code is given, so you just need to hit Shift-Enter to run it and take a look at it.

4:13The lab will show you how the cost function is implemented in code.

4:18Given a small training set and different choices for the parameters, you'll be able to see how the cost varies depending on how well the model fits the data.

4:29In the optional lab, you also can play with an interactive contour plot.

4:34Check this out.

4:35You can use your mouse cursor to click anywhere on the contour plot, and you'll be able to see the straight line defined by the values you chose for the parameters W and B.

4:45You'll see a dot appear, also on the 3D surface plot, showing the cost.

4:51Finally, the optional lab also has a 3D surface plot that you can manually rotate and spin around using your mouse cursor to take a better look at what the cost function looks like.

5:04I hope you enjoy playing with the optional lab.

5:07Now, in linear regression, rather than having to manually try to read the contour plot for the best value for W and B, which isn't really a good procedure and also won't work once we get to more complex machine learning models,

5:21what you really want is an efficient algorithm that you can write in code for automatically finding the values of parameters W and B that give you the best fit line that minimizes the cost function J.

5:35There is an algorithm for doing this, called gradient descent.

5:38This algorithm is one of the most important algorithms in machine learning.

5:43Gradient descent and variations on gradient descent are used to train not just linear regression, but some of the biggest and most complex models in all of AI.

5:53So, let's go to the next video to dive into this really important algorithm, called gradient descent.