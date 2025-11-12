0:02To fit the parameters of a logistic regression model, we're going to try to find the values

0:07of the parameters w and b that minimize the cost function J of w and b.

0:12And we'll again apply gradient descent to do this.

0:15Let's take a look at how.

0:18In this video, we'll focus on how to find a good choice of the parameters w and b.

0:24After you've done so, if you give the model a new input x, say a new patient at the hospital with a certain tumor size and age

0:34that needs a diagnosis, the model can then make a prediction, or it can try to estimate the probability that the label y is 1.

0:46The algorithm you can use to minimize the cost function is gradient descent.

0:51Here again is the cost function.

0:54And so if you want to minimize the cost J as a function of w and b, well, here's the usual gradient descent algorithm,

1:04where you repeatedly update each parameter as the O value minus alpha, the learning rate, times this derivative term.

1:15Let's take a look at the derivative of J with respect to wj, this term up on top here, where as usual, J goes from 1 through n, where n is the number of features.

1:28If someone were to apply the rules of calculus, you can show that the derivative with respect to wj of the cost function capital J is equal to this expression over here.

1:41It's 1 over m times the sum from 1 through m of this error term, that is, f minus the label y, times xj.

1:56Here, this xij is the jth feature of training example i.

2:03Now, let's also look at the derivative of J with respect to the parameter b.

2:09It turns out to be this expression over here, and it's quite similar to the expression above, except that it is not multiplied by this x superscript i subscript j at the end.

2:22So, just as a reminder, similar to what you saw for linear regression, the way to carry out these updates is to use simultaneous updates,

2:30meaning that you would first compute the right-hand side for all of these updates, and then simultaneously overwrite all the values on the left at the same time.

2:42So, let me take these derivative expressions here and plug them into these terms here.

2:51This gives you gradient descent for logistic regression.

2:57Now, one funny thing you might be wondering is, huh? That's weird.

3:02These two equations look exactly like the algorithm we had come up with previously for linear regression.

3:08So, you might be wondering, is linear regression actually secretly the same as logistic regression?

3:14Well, even though these equations look the same, the reason that this is not linear regression is because the definition for the function f of x has changed.

3:26In linear regression, f of x is this, is wx plus b, but in logistic regression, f of x is defined to be the sigmoid function applied to wx plus b.

3:39So, although the algorithm written looked the same for both linear regression and logistic regression,

3:46actually they are two very different algorithms because the definition for f of x is not the same.

3:53When we talked about gradient descent for linear regression previously, you saw how you can monitor gradient descent to make sure it converges.

4:03You can just apply the same method for logistic regression to make sure it also converges.

4:10I've written out these updates as if you're updating the parameters wj, one parameter at a time.

4:20Similar to the discussion on vectorized implementations of linear regression,

4:26you can also use vectorization to make gradient descent run faster for logistic regression.

4:33I won't dive into the details of the vectorized implementation in this video, but you can also learn more about it and see the code in the optional labs.

4:42So now you know how to implement gradient descent for logistic regression.

4:48You might also remember feature scaling when we were using linear regression,

4:54where you saw how feature scaling, that is scaling all the features to take on similar ranges of values,

5:00say between negative one and plus one, how that can help gradient descent to converge faster.

5:06Feature scaling applied the same way to scale the different features to take on similar ranges of values can also speed up gradient descent for logistic regression.

5:16In the upcoming optional lab, you also see how the gradient for logistic regression can be calculated in code.

5:25This will be useful to look at because you also implement this in a practice lab at the end of this week.

5:32After you run gradient descent in this lab, there'll be a nice set of animated plots that show gradient descent in action.

5:40You see the sigmoid function, the contour plot of the cost, the 3D surface plot of the cost, and the learning curve all evolve as gradient descent runs.

5:50There will be another optional lab after that, which is short and sweet, but also very useful,

5:56because I'll show you how to use the popular Scikit-learn library to train the logistic regression model for classification.

6:04Many machine learning practitioners in many companies today use Scikit-learn regularly as part of their job,

6:11and so I hope you check out the Scikit-learn function as well and take a look at how that is used.

6:17So that's it. You now know how to implement logistic regression.

6:22This is a very powerful, very widely used learning algorithm, and you now know how to get it to work yourself. Congratulations.