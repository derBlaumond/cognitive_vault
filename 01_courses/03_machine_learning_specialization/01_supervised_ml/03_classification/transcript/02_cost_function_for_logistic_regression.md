0:01Remember that the cost function gives you a way to measure how well a specific set of parameters fits the training data,

0:09and thereby gives you a way to try to choose better parameters.

0:14In this video, we'll look at how the squared error cost function is not an ideal cost function for logistic regression,

0:21and we'll take a look at a different cost function that can help us choose better parameters for logistic regression.

0:28Here's what the training set for a logistic regression model might look like,

0:33where here each row might correspond to a patient that was paying a visit to the doctor and wound up with some sort of diagnosis.

0:44As before, we'll use m to denote the number of training examples.

0:50Each training example has one or more features, such as the tumor size, the patient's age, and so on, for a total of n features.

1:01And so, let's call the features x1 through xn.

1:06And since this is a binary classification task, the target label y takes on only two values, either 0 or 1.

1:15And finally, the logistic regression model is defined by this equation.

1:21Okay, so the question you want to answer is, given this training set, how can you choose parameters w and b?

1:30Recall, for linear regression, this is the squared error cost function.

1:35The only thing I've changed is that I put the one-half inside the summation instead of outside the summation.

1:42And you might remember that in the case of linear regression, where f of x is the linear function w dot x plus b,

1:50the cost function looks like this, is a convex function, or a bow shape or a hammer shape.

1:56And so gradient descents will look like this, where you take one step, one step, one step, and so on, to converge at the global minimum.

2:05Now, you could try to use the same cost function for logistic regression,

2:10but it turns out that if I were to write f of x equals 1 over 1 plus e to the negative wx plus b,

2:18and plot the cost function using this value of f of x, then the cost will look like this.

2:25This becomes what's called a non-convex cost function. It's not convex.

2:32And what this means is that if you were to try to use gradient descents, there are lots of local minima that you can get stuck in.

2:42So it turns out that for logistic regression, this squared error cost function is not a good choice.

2:49Instead, there will be a different cost function that can make the cost function convex again,

2:55so that gradient descents can be guaranteed to converge to the global minimum.

3:00The only thing I've changed is that I put the one-half inside the summation instead of outside the summation.

3:06This will make the math you see later on this slide a little bit simpler.

3:11In order to build a new cost function, one that we'll use for logistic regression,

3:16I'm going to change a little bit the definition of the cost function J of w and b.

3:22In particular, if you look inside this summation, let's call this term inside the loss on a single training example.

3:32And I'm going to denote the loss via this capital L and is a function of the prediction of the learning algorithm, f of x,

3:43as well as of the true label, y.

3:47And so the loss, given the predicted f of x and the true label y, is equal, in this case, to one-half of the squared difference.

3:58We'll see shortly that by choosing a different form for this loss function,

4:03we'll be able to keep the overall cost function, which is 1 over m times the sum of these loss functions, to be a convex function.

4:13Now, the loss function inputs f of x and the true label y and tells us how well we're doing on that example.

4:24I'm going to just write down here the definition of the loss function we'll use for logistic regression.

4:31If the label y is equal to 1, then the loss is negative log of f of x.

4:39And if the label y is equal to 0, then the loss is negative log of 1 minus f of x.

4:49Let's take a look at why this loss function hopefully makes sense.

4:55Let's first consider the case of y equals 1 and plot what this function looks like to gain some intuition about what this loss function is doing.

5:06And remember, the loss function measures how well you're doing on one training example,

5:11and it's by summing up the losses on all of the training examples that you then get the cost function,

5:17which measures how well you're doing on the entire training set.

5:22So if you plot log of f, it looks like this curve here, where f here is on the horizontal axis.

5:32And so a plot of negative of the log of f looks like this, where we just flip the curve along the horizontal axis.

5:41Notice that it intersects the horizontal axis at f equals 1 and continues downward from there.

5:50Now f is the output of logistic regression. Thus, f is always between 0 and 1, because the output of logistic regression is always between 0 and 1.

6:02The only part of the function that's relevant is therefore this part over here, corresponding to f between 0 and 1.

6:13So let's zoom in and take a closer look at this part of the graph.

6:18If the algorithm predicts a probability close to 1, and the true label is 1, then the loss is very small.

6:28It's pretty much 0, because you're very close to the right answer.

6:34Now, continuing with the example of the true label y being 1, so say it really is a malignant tumor,

6:41if the algorithm predicts 0.5, then the loss is at this point here, which is a bit higher, but not that high.

6:52Whereas in contrast, if the algorithm were to have output 0.1, if it thinks that there's only a 10% chance of the tumor being malignant,

7:02but y really is 1, it really is malignant, then the loss is this much higher value over here.

7:10So when y is equal to 1, the loss function incentivizes, or nudges, or helps push the algorithm to make more accurate predictions,

7:20because the loss is lowest when it predicts values close to 1.

7:25Now on this slide, we've been looking at what the loss is when y is equal to 1.

7:30On this slide, let's look at the second part of the loss function corresponding to when y is equal to 0.

7:37In this case, the loss is negative log of 1 minus f of x.

7:43When this function is plotted, it actually looks like this.

7:48The range of f is limited to 0 to 1, because logistic regression only outputs values between 0 and 1.

7:56And if we zoom in, this is what it looks like.

8:00So in this plot, corresponding to y equals 0, the vertical axis shows the value of the loss for different values of f of x.

8:13So when f is 0, or very close to 0, the loss is also going to be very small,

8:20which means that if the true label is 0 and the model's prediction is very close to 0, well, you nearly got it right.

8:27So the loss is appropriately very close to 0.

8:31And the larger the value of f of x gets, the bigger the loss, because the prediction is further from the true label 0.

8:40And in fact, as that prediction approaches 1, the loss actually approaches infinity.

8:47Going back to the tumor prediction example, this says that if a model predicts that the patient's tumor is almost certain to be malignant,

8:55say 99.9% chance of malignancy, but it turns out to actually not be malignant, so y equals 0,

9:02then we penalize the model with a very high loss.

9:07So in this case of y equals 0, similar to the case of y equals 1 on the previous slide,

9:13the further the prediction f of x is away from the true value of y, the higher the loss.

9:18And in fact, if f of x approaches 0, the loss here actually goes really, really large and in fact approaches infinity.

9:29So when the true label is 1, the algorithm is strongly incentivized not to predict something too close to 0.

9:38So in this video, you saw why the squared error cost function doesn't work well for logistic regression.

9:45We also defined the loss for a single training example and came up with a new definition for the loss function for logistic regression.

9:57It turns out that with this choice of loss function, the overall cost function will be convex,

10:04and thus you can reliably use gradient descent to take you to the global minimum.

10:09Proving that this function is convex is beyond the scope of this course.

10:14You may remember that the cost function is a function of the entire training set,

10:20and is therefore the average or 1 over m times the sum of the loss function on the individual training examples.

10:30So the cost on a certain set of parameters w and b is equal to 1 over m times the sum over all the training examples of the loss on the training examples.

10:43And if you can find the value of the parameters w and b that minimizes this,

10:50then you have a pretty good set of values for the parameters w and b for logistic regression.

10:56In the upcoming optional lab, you get to take a look at how the squared error cost function doesn't work very well for classification,

11:04because you see that the surface plot results in a very wiggly cost surface with many local minima.

11:12Then you take a look at the new logistic loss function,

11:17and as you can see here, this produces a nice and smooth convex surface plot that does not have all those local minima.

11:26So please take a look at the code and the plots after this video.

11:31Alright, so we've seen a lot in this video.

11:35In the next video, let's go back and take the loss function for a single training example,

11:40and use that to define the overall cost function for the entire training set.

11:45And we'll also figure out a simpler way to write out the cost function,

11:50which will then later allow us to run gradient descent to find good parameters for logistic regression.

11:56Let's go on to the next video.

---

0:01In the last video, you saw the loss function and the cost function for logistic regression.

0:07In this video, you'll see a slightly simpler way to write out the loss and cost functions

0:13so that the implementation can be a bit simpler when we get to gradient descent

0:18for fitting the parameters of a logistic regression model.

0:22Let's take a look.

0:23As a reminder, here's the loss function that we had defined in the previous video for logistic regression.

0:31Now, because we're still working on a binary classification problem, y is either 0 or 1.

0:38Because y is either 0 or 1 and cannot take on any value other than 0 or 1,

0:45we'll be able to come up with a simpler way to write this loss function.

0:50You can write the loss function as follows.

0:53Given the prediction f of x and the target label y,

0:57the loss equals negative y times log of f minus 1 minus y times log of 1 minus f.

1:10And it turns out this equation, which we just wrote in one line,

1:15is completely equivalent to this more complex formula up here.

1:20Let's see why this is the case.

1:24Now remember, y can only take on the values of either 1 or 0.

1:32In the first case, let's say y equals 1.

1:36This first y over here is 1, and this 1 minus y is 1 minus 1, which is therefore equal to 0.

1:46And so the loss becomes negative 1 times log of f of x minus 0 times a bunch of stuff.

1:55That becomes 0 and goes away.

1:58And so when y is equal to 1, the loss is indeed the first term on top, negative log of f of x.

2:08Let's look at the second case, when y is equal to 0.

2:14In this case, this y here is equal to 0, so this first term goes away.

2:21And the second term is 1 minus 0 times that logarithmic term.

2:29So the loss becomes this negative 1 times log of 1 minus f of x.

2:38And that's just equal to this second term up here.

2:44And so in the case of y equals 0, we also get back the original loss function as defined above.

2:53So what you see is that whether y is 1 or 0, the single expression here is equivalent to the more complex expression up here,

3:03which is why this gives us a simpler way to write the loss with just one equation without separating out these two cases like we did on top.

3:14Using this simplified loss function, let's go back and write out the cost function for logistic regression.

3:22So here again is the simplified loss function.

3:27And recall that the cost J is just the average loss, average across the entire training set of m examples.

3:36So it's 1 over m times the sum of the loss from i equals 1 to m.

3:43Now if you plug in the definition for the simplified loss from above, then it looks like this.

3:481 over m times the sum of this term above.

3:53And if you bring the negative signs and move them outside, then you end up with this expression over here.

4:00And this is the cost function, the cost function that pretty much everyone uses to train logistic regression.

4:08Now you might be wondering, why do we choose this particular function when there could be tons of other cost functions we could have chosen?

4:18Although we won't have time to go into great detail in this class, I'd just like to mention that this particular cost function is derived from statistics

4:28using a statistical principle called maximum likelihood estimation,

4:33which is an idea from statistics on how to efficiently find parameters for different models.

4:40And this cost function has the nice property that it is convex.

4:46But don't worry about learning the details of maximum likelihood.

4:50There's just a deeper rationale and justification behind this particular cost function.

4:57The upcoming optional lab will show you how the logistic cost function is implemented in code.

5:04I recommend taking a look at it because you implement this later in the practice lab at the end of the week.

5:13This upcoming optional lab also shows you how two different choices of the parameters will lead to different cost calculations.

5:22So you can see in the plot that the better fitting blue decision boundary has a lower cost relative to the magenta decision boundary.

5:33So with the simplified cost function, we're now ready to jump into applying gradient descent to logistic regression.

5:41Let's go see that in the next video.