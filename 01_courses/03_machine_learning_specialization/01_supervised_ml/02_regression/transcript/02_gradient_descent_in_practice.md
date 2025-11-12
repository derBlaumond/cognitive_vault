0:02So, welcome back. Let's take a look at some techniques that'll make gradient descent work

0:07much better. In this video, you'll see a technique called feature scaling that will enable gradient

0:13descent to run much faster. Let's start by taking a look at the relationship between

0:18the size of a feature, that is, how big are the numbers for that feature, and the size

0:24of its associated parameter. As a concrete example, let's predict the price of a house

0:30using two features, x1, the size of the house, and x2, the number of bedrooms. Let's say

0:37that x1 typically ranges from 300 to 2,000 square feet, and x2 in the dataset ranges

0:45from 0 to 5 bedrooms. So, for this example, x1 takes on a relatively large range of values,

0:53and x2 takes on a relatively small range of values. Now, let's take an example of

0:59a house that has a size of 2,000 square feet, has 5 bedrooms, and a price of 500K, or $500,000.

1:12For this one training example, what do you think are reasonable values for the size of

1:16the parameters w1 and w2? Well, let's look at one possible set of parameters. Say w1

1:25is 50, and w2 is 0.1, and b is 50 for the purposes of discussion. So, in this case,

1:35the estimated price in thousands of dollars is 100,000K here, plus 0.5K, plus 50K, which

1:46is slightly over $100,000,000. So, that's clearly very far from the actual price of

1:54$500,000. And so, this is not a very good set of parameter choices for w1 and w2. Now,

2:04let's take a look at another possibility. Say w1 and w2 were the other way around. w1

2:11is 0.1, and w2 is 50, and b is still also 50. In this choice of w1 and w2, w1 is relatively

2:22small, and w2 is relatively large. 50 is much bigger than 0.1. So here, the predicted price

2:29is 0.1 times 2,000, plus 50 times 5, plus 50. The first term becomes 200K, the second

2:41term becomes 250K, and then plus 50. So, this version of the model predicts a price of $500,000,

2:50which is a much more reasonable estimate, and happens to be the same price as the true

2:54price of the house. So, hopefully you might notice that when a possible range of values

3:00of a feature is large, like the size in square feet, which goes all the way up to 2,000,

3:06it's more likely that a good model will learn to choose a relatively small parameter value,

3:12like 0.1. Likewise, when the possible values of a feature are small, like the number of

3:19bedrooms, then a reasonable value for its parameters will be relatively large, like 50.

3:25So, how does this relate to gradient descent? Well, let's take a look at a scatterplot of the

3:34features, where the size in square feet is the horizontal axis, x1, and the number of bedrooms,

3:41x2, is on the vertical axis. If you plot the training data, you notice that the horizontal

3:48axis is on a much larger scale, or much larger range of values compared to the vertical axis.

3:53Next, let's look at how the cost function might look in a contour plot. You might see a contour

4:02plot where the horizontal axis has a much narrower range, say between 0 and 1, whereas the vertical

4:10axis takes on much larger values, say between 10 and 100. So, the contours form ovals or ellipses,

4:19and they're shorter on one side and longer on the other. And this is because a very small change to

4:26w1 can have a very large impact on the estimated price, and thus a very large impact on the cost

4:34because w1 tends to be multiplied by a very large number, the size in square feet. In contrast,

4:42it takes a much larger change in w2 in order to change the prediction as much, and thus small

4:49changes to w2 don't change the cost function nearly as much. So, where does this leave us?

4:55This is what might end up happening if you were to run gradient descent, if you were to use your

5:02training data as is. Because the contours are so tall and skinny, gradient descent may end up

5:09bouncing back and forth for a long time before it can finally find its way to the global minimum.

5:16In situations like this, a useful thing to do is to scale the features. This means performing some

5:23transformation of your training data so that x1, say, might now range from 0 to 1 and x2 might also

5:33range from 0 to 1. So, the data points now look more like this, and you might notice that the

5:39scale of the plot on the bottom is now quite different than the one on top. The key point is

5:46that the rescaled x1 and x2 are both now taking comparable ranges of values to each other.

5:54And if you run gradient descent on a cost function defined on this rescaled x1 and x2

6:00using this transformed data, then the contours will look more like this, more like circles and

6:07less tall and skinny, and gradient descents can find a much more direct path to the global minimum.

6:14So, to recap, when you have different features that take on very different ranges of values,

6:19it can cause gradient descent to run slowly, but rescaling the different features so they all

6:25take on comparable ranges of values can speed up gradient descent significantly.

6:30How do you actually do this? Let's take a look at that in the next video.

---

0:02Let's look at how you can implement feature scaling to take features that take on very different ranges of values and scale them to have comparable ranges of values to each other.

0:11So, how do you actually scale features?

0:14Well, if X1 ranges from 3 to 2000, one way to get a scaled version of X1 is to take each original X1 value and divide by 2000, the maximum of the range.

0:28So the scaled X1 will range from 0.15 up to 1.

0:34Similarly, since X2 ranges from 0 to 5, you can calculate a scaled version of X2 by taking each original X2 and dividing by 5, which is, again, the maximum.

0:47So the scaled X2 will now range from 0 to 1.

0:52So if you plot the scaled X1 and X2 on a graph, it might look like this.

0:58In addition to dividing by the maximum, you can also do what's called mean normalization.

1:04So what this looks like is, you start with the original features, and then you rescale them so that both of them are centered around 0.

1:13So whereas before they only had values greater than 0, now they have both negative and positive values that may be usually between negative 1 and plus 1.

1:25So to calculate the mean normalization of X1, first find the average, also called the mean of X1 on your training set, and let's call this mean mu1, with this being the Greek alphabet mu.

1:39For example, you may find that the average of feature 1, mu1, is 600 square feet.

1:46So let's take each X1, subtract the mean, mu1, and then let's divide by the difference, 2000 minus 300, where 2000 is the maximum and 300 the minimum.

2:01And if you do this, you get the normalized X1 to range from negative 0.18 to 0.82.

2:10Similarly, to mean normalize X2, you can calculate the average of feature 2, and for instance, mu2 may be 2.3.

2:20Then you can take each X2, subtract mu2, and divide by 5 minus 0, again, the max 5 minus the min, which is 0.

2:32The mean normalized X2 now ranges from negative 0.46 to 0.54.

2:41So if you plot the training data using the mean normalized X1 and X2, it might look like this.

2:48There's one last common rescaling method called z-score normalization.

2:54To implement z-score normalization, you need to calculate something called the standard deviation of each feature.

3:00If you don't know what the standard deviation is, don't worry about it, you won't need to know it for this class.

3:06Or if you've heard of the normal distribution of the bell-shaped curve, sometimes also called the Gaussian distribution,

3:12this is what the standard deviation for the normal distribution looks like.

3:17But if you haven't heard of this, you don't need to worry about that either.

3:20But if you do know what is the standard deviation, then to implement a z-score normalization,

3:26you first calculate the mean, mu, as well as the standard deviation,

3:31which is often denoted by the lowercase Greek alphabet sigma of each feature.

3:38So for instance, maybe feature 1 has a standard deviation of 450 and mean 600.

3:46Then to z-score normalize X1, take each X1, subtract mu1, and then divide by the standard deviation,

3:56which I'm going to denote as sigma1.

4:00And what you might find is that the z-score normalized X1 now ranges from negative 0.67 to 3.1.

4:10Similarly, if you calculate the second feature's standard deviation to be 1.4 and mean to be 2.3,

4:20then you can compute X2 minus mu2 divided by sigma2,

4:25and in this case, the z-score normalized by X2 might now range from negative 1.6 to 1.9.

4:35So if you plot the training data on the normalized X1 and X2 on a graph, it might look like this.

4:43As a rule of thumb, when performing feature scaling,

4:47you might want to aim for getting the features to range from maybe anywhere around negative 1

4:53to somewhere around plus 1 for each feature X.

4:57But these values negative 1 and plus 1 can be a little bit loose.

5:02So if the features range from negative 3 to plus 3 or negative 0.3 to plus 0.3,

5:10all of these are completely okay.

5:12So if you have a feature X1 that winds up being between 0 and 3, that's not a problem.

5:18And you can rescale it if you want, but if you don't rescale it, it should work okay too.

5:24Or if you have a different feature, X2, whose values are between negative 2 and plus 0.5,

5:31again, that's okay. No harm rescaling it, but it might be okay if you leave it alone as well.

5:39But if another feature like X3 here ranges from negative 100 to plus 100,

5:46then this takes on a very different range of values than something from around negative 1 to plus 1.

5:52So you're probably better off rescaling this feature X3 so that it ranges from something closer to negative 1 to plus 1.

6:02Similarly, if you have a feature X4 that takes on really small values,

6:07say between negative 0.001 and plus 0.001, then these values are so small.

6:15That means you may want to rescale it as well.

6:18Finally, what if your feature X5, such as measurements of a hospital patient's body temperature,

6:26ranges from 98.6 to 105 degrees Fahrenheit?

6:32In this case, these values are around 100, which is actually pretty large compared to other scale features,

6:40and this will actually cause gradient descents to run more slowly.

6:44So in this case, feature rescaling will likely help.

6:48There's almost never any harm to carrying out feature rescaling, so when in doubt, I encourage you to just carry it out.

6:56And that's it for feature scaling. With this little technique, you'll often be able to get gradient descents to run much faster.

7:05So that's feature scaling.

7:07And with or without feature scaling, when you run gradient descents, how can you know, how can you check if gradient descent is really working,

7:16if it is finding you the global minimum or something close to it?

7:20In the next video, let's take a look at how to recognize if gradient descent is converging,

7:26and then in the video after that, this will lead to discussion of how to choose a good learning rate for gradient descent.

---

0:01When running gradient descent, how can you tell if it is converging?

0:05That is, whether it is helping you to find parameters close to the global minimum of the cost function.

0:11By learning to recognize what a well-running implementation of gradient descent looks like,

0:16we will also, in a later video, be better able to choose a good learning rate alpha.

0:22Let's take a look.

0:23As a reminder, here's the gradient descent rule, and one of the key choices is the choice of the learning rate alpha.

0:32Here's something that I often do to make sure that gradient descent is working well.

0:37Recall that the job of gradient descent is to find parameters w and b that hopefully minimize the cost function j.

0:46So what I'll often do is plot the cost function j, which is calculated on the training set,

0:53and I'll plot the value of j at each iteration of gradient descent.

0:59Remember that each iteration means after each simultaneous update of the parameters w and b,

1:07So in this plot, the horizontal axis is the number of iterations of gradient descent that you've run so far.

1:16And so you may get a curve that looks like this.

1:20Notice that the horizontal axis is the number of iterations of gradient descent, and not a parameter like w or b.

1:30This differs from previous graphs you've seen, where the vertical axis was cost j,

1:36and the horizontal axis was a single parameter, like w or b.

1:42This curve is also called a learning curve.

1:46Note that there are a few different types of learning curves used in machine learning,

1:51and you'll see some other types later in this course as well.

1:56Concretely, if you look at this point on the curve, this means that after you've run gradient descent for 100 iterations,

2:05meaning 100 simultaneous updates of the parameters, you have some learned values for w and b.

2:12And if you compute the cost, jwb, for those values of w and b, the ones you got after 100 iterations,

2:22you get this value for the cost j, that is, this point on the vertical axis.

2:29And this point here corresponds to the value of j for the parameters that you got after 200 iterations of gradient descent.

2:39So looking at this graph helps you to see how your cost j changes after each iteration of gradient descent.

2:47If gradient descent is working properly, then the cost j should decrease after every single iteration.

2:54If j ever increases after one iteration, that means either alpha is chosen poorly,

3:02and it usually means alpha is too large, or there could be a bug in the code.

3:07Another useful thing that this plot can tell you is that if you look at this curve,

3:13by the time you reach maybe 300 iterations or so, the cost j is leveling off and is no longer decreasing much.

3:22And by 400 iterations, it looks like the curve has flattened out.

3:27So this means that gradient descent has more or less converged, because the curve is no longer decreasing.

3:37So looking at this learning curve, you can try to spot whether or not gradient descent is converging.

3:44By the way, the number of iterations that gradient descent takes to converge can vary a lot between different applications.

3:52In one application, it may converge after just 30 iterations.

3:57For a different application, it could take 1,000 or 100,000 iterations.

4:02It turns out to be very difficult to tell in advance how many iterations gradient descent needs to converge,

4:10which is why you can create a graph like this, a learning curve,

4:15to try to find out when you can stop training your particular model.

4:20Another way to decide when your model is done training is with an automatic convergence test.

4:28So let's let epsilon, this here is the Greek alphabet epsilon,

4:34let's let epsilon be a variable representing a small number, such as 0.001 or 10 to the power of negative 3.

4:43If the cost j decreases by less than this number epsilon on one iteration,

4:48then you're likely on this flattened part of the curve that you see on the left, and you can declare convergence.

4:56Remember, convergence hopefully indicates that you found parameters w and b that are close to the minimum possible value of j.

5:05I usually find that choosing the right threshold epsilon is pretty difficult,

5:10so I actually tend to look at graphs like this one on the left rather than rely on automatic convergence tests.

5:17Looking at this sort of figure can tell you or give you some advance warning if maybe gradient descent is not working correctly as well.

5:26So you've now seen what the learning curve should look like when gradient descent is running well.

5:32Let's take these insights and in the next video take a look at how to choose an appropriate learning rate.

---

0:02Your learning algorithm will run much better with an appropriate choice of learning rate.

0:06If it's too small, it will run very slowly, and if it's too large, it may not even converge.

0:12Let's take a look at how you can choose a good learning rate for your model.

0:16Concretely, if you plot the cost for a number of iterations and notice that the cost sometimes

0:23goes up and sometimes goes down, you should take that as a clear sign that gradient descent

0:29is not working properly.

0:31This could mean that there's a bug in the code, or sometimes it could mean that your

0:36learning rate is too large.

0:38So here's an illustration of what might be happening.

0:41Here, the vertical axis is a cost function j, and the horizontal axis represents a parameter

0:50like maybe w1, and if the learning rate is too big, then if you start off here, your

0:57update step may overshoot the minimum and end up here, and in the next update step

1:03here, you're again overshooting, so you end up here, and so on.

1:08And that's why the cost can sometimes go up instead of decreasing.

1:13To fix this, you can use a smaller learning rate.

1:16So then your updates may start here, and go down a little bit, and down a bit, and will

1:21hopefully consistently decrease until it reaches the global minimum.

1:26Sometimes you may see that the cost consistently increases after each iteration, like this

1:32curve here.

1:33This is also likely due to a learning rate that is too large, and it could be addressed

1:38by choosing a smaller learning rate.

1:42But learning rates like this could also be a sign of a possible bug in the code.

1:47For example, if I wrote my code so that w1 gets updated as w1 plus alpha times this derivative

1:55term, this could result in the cost consistently increasing at each iteration.

2:02And this is because adding the derivative term moves your cost j further from the global

2:07minimum instead of closer.

2:10So remember, you want to use a minus sign, so the code should be updated, w1 updated

2:16by w1 minus alpha times the derivative term.

2:22One debugging tip for a correct implementation of gradient descent is that with a small enough

2:27learning rate, the cost function should decrease on every single iteration.

2:33So if gradient descent isn't working, one thing I will often do, and I hope you find

2:38this tip useful too, one thing I'll often do is just set alpha to be a very, very small

2:44number and see if that causes the cost to decrease on every iteration.

2:52If even with alpha set to a very small number, j doesn't decrease on every single iteration

2:58but instead sometimes increases, then that usually means there's a bug somewhere in the

3:02code.

3:04Note that setting alpha to be really, really small is meant here as a debugging step, and

3:10a very, very small value of alpha is not going to be the most efficient choice for actually

3:15training your learning algorithm.

3:17One important tradeoff is that if your learning rate is too small, then gradient descent can

3:22take a lot of iterations to converge.

3:26So when I am running gradient descent, I will usually try a range of values for the learning

3:31rate alpha.

3:32So I might start by trying a learning rate of 0.001, and I might also try a learning

3:38rate that's 10 times as large, say 0.01 and 0.1 and so on.

3:45And for each choice of alpha, you might run gradient descent just for a handful of iterations

3:51and plot the cost function j as a function of the number of iterations.

3:57And after trying a few different values, you might then pick the value of alpha that seems

4:02to decrease the learning rate rapidly but also consistently.

4:07In fact, what I actually do is try a range of values like this.

4:12After trying 0.001, I'll then increase the learning rate threefold to 0.003, and after

4:20that I'll try 0.01, which is again about three times as large as 0.003.

4:28So these are roughly trying out gradient descent with each value of alpha being roughly three

4:33times bigger than the previous value.

4:37So what I'll do is try a range of values until I found a value that's too small, and then

4:42also make sure I found a value that's too large.

4:46And I'll slowly try to pick the largest possible learning rate, or just something slightly

4:51smaller than the largest reasonable value that I found.

4:55And when I do that, it usually gives me a good learning rate for my model.

5:00So I hope this technique too will be useful for you to choose a good learning rate for

5:05your implementation of gradient descent.

5:09In the upcoming optional lab, you can also take a look at how feature scaling is done

5:15in code and also see how different choices of the learning rate alpha can lead to either

5:20better or worse training of your model.

5:24I hope you have fun playing with the value of alpha and seeing the outcomes of different

5:28choices of alpha.

5:30So please take a look and run the code in the optional lab to gain a deeper intuition

5:35about feature scaling as well as the learning rate alpha.

5:39Training learning rates is an important part of training many learning algorithms, and

5:44I hope that this video gives you intuition about different choices and how to pick a

5:48good value for alpha.

5:50Now there are a couple more ideas that you can use to make multiple linear regression

5:55much more powerful, and that is choosing custom features which will also allow you to fit

6:01curves, not just a straight line, to your data.

6:04Let's take a look at that in the next video.

---
0:01The choice of features can have a huge impact on your learning algorithm's performance.

0:06In fact, for many practical applications, choosing or engineering the right features is a critical step to making the algorithm work well.

0:14In this video, let's take a look at how you can choose or engineer the most appropriate features for your learning algorithm.

0:21Let's take a look at feature engineering by revisiting the example of predicting the price of a house.

0:28Say you have two features for each house.

0:31X1 is the width of the lot size of the plot of land that the house is built on.

0:37This in real estate is also called the frontage of the lot.

0:42And the second feature, X2, is the depth of the lot size of, let's assume, the rectangular plot of land that the house was built on.

0:51Given these two features, X1 and X2, you might build a model like this, where f of x is W1X1 plus W2X2 plus b, where X1 is the frontage, or width, and X2 is the depth.

1:07And this model might work okay.

1:10But here's another option for how you might choose a different way to use these features in the model that could be even more effective.

1:17You might notice that the area of the land can be calculated as the frontage, or width, times the depth.

1:24And you may have an intuition that the area of the land is more predictive of the price than the frontage and depth as separate features.

1:33So you might define a new feature, X3, as X1 times X2.

1:39So this new feature, X3, is equal to the area of the plot of land.

1:45With this feature, you can then have a model, fWb of x equals W1X1 plus W2X2 plus W3X3 plus b, so that the model can now choose parameters W1, W2, and W3, depending on whether the data shows the frontage, or the depth, or the area, X3, of the lot, turns out to be the most important thing for predicting the price of the house.

2:12What we just did, creating a new feature, is an example of what's called feature engineering, in which you might use your knowledge or intuition about the problem to design new features,

2:24usually by transforming or combining the original features of the problem in order to make it easier for the learning algorithm to make accurate predictions.

2:33So depending on what insights you may have into the application, rather than just taking the features that you happen to have started off with, sometimes by defining new features, you might be able to get a much better model.

2:47So that's feature engineering.

2:50And it turns out that there's one flavor of feature engineering that allows you to fit not just straight lines, but curves, nonlinear functions, to your data.

3:00Let's take a look in the next video at how you can do that.

---
0:03So far, we've just been fitting straight lines to our data.

0:07Let's take the ideas of multiple linear regression and feature engineering to come up with a new algorithm called polynomial regression,

0:15which lets you fit curves, nonlinear functions, to your data.

0:19Let's say you have a housing dataset that looks like this, where feature x is the size in square feet.

0:26It doesn't look like a straight line fits this dataset very well.

0:30So maybe you want to fit a curve, maybe a quadratic function, to the data, like this, which includes a size, x, and also x squared,

0:41which is the size raised to the power of 2.

0:44And maybe that will give you a better fit to the data.

0:48But then you may decide that your quadratic model doesn't really make sense,

0:51because the quadratic function eventually comes back down.

0:55And, well, we wouldn't really expect housing prices to go down when the size increases, right?

1:00Big houses seem like they should usually cost more.

1:04So then you may choose a cubic function, where we now have not only x squared, but x cubed.

1:12So maybe this model produces this curve here, which is a somewhat better fit to the data,

1:18because the size does eventually come back up as the size increases.

1:23These are both examples of polynomial regression,

1:26because you took your optional feature x and raised it to the power of 2 or 3 or any other power.

1:34And in the case of the cubic function, the first feature is the size,

1:38the second feature is the size squared, and the third feature is the size cubed.

1:44I just want to point out one more thing,

1:47which is that if you create features that are these powers,

1:50like the square of the original features like this,

1:53then feature scaling becomes increasingly important.

1:57So if the size of the house ranges from, say, 1 to 1,000 square feet,

2:02then the second feature, which is the size squared, would range from 1 to a million,

2:08and the third feature, which is size cubed, ranges from 1 to a billion.

2:14So these two features, x squared and x cubed,

2:18take on very different ranges of values compared to the optional feature x.

2:23And if you're using gradient descent,

2:25it's important to apply feature scaling to get your features into comparable ranges of values.

2:32Finally, here's one last example of how you really have a wide range of choices of features to use.

2:39Another reasonable alternative to taking the size squared and size cubed is to, say, use the square root of x.

2:46So your model may look like w1 times x plus w2 times the square root of x plus b.

2:55The square root function looks like this, and it becomes a bit less steep as x increases,

3:01but it doesn't ever completely flatten out, and it certainly never, ever comes back down.

3:07So this would be another choice of features that might work well for this data set as well.

3:12So you may ask yourself, how do I decide what features to use?

3:17Later in the second course in this specialization,

3:20you see how you can choose different features and different models that include or don't include these features,

3:26and you have a process for measuring how well these different models perform

3:31to help you decide which features to include or not include.

3:35For now, I just want you to be aware that you have a choice in what features you use,

3:40and by using feature engineering and polynomial functions,

3:43you can potentially get a much better model for your data.

3:48In the optional lab that follows this video,

3:51you will see some code that implements polynomial regression using features like x, x squared, and x cubed.

3:58So please take a look and run the code and see how it works.

4:03There's also another optional lab after that one that shows how to use a popular open-source toolkit

4:09that implements linear regression.

4:13Scikit-learn is a very widely used open-source machine learning library

4:18that is used by many practitioners in many of the top AI, Internet, machine learning companies in the world.

4:26So if either now or in the future you're using machine learning in your job,

4:31there's a very good chance you'll be using tools like Scikit-learn to train your models.

4:37And so working through that optional lab will give you a chance to not only better understand linear regression,

4:43but also see how this can be done in just a few lines of code using a library like Scikit-learn.

4:50For you to have a solid understanding of these algorithms and be able to apply them,

4:56I do think it's important that you know how to implement linear regression yourself

5:00and not just call some Scikit-learn function that is a black box.

5:04But Scikit-learn also has an important role in the way machine learning is done in practice today.

5:10So we're just about at the end of this week.

5:14Congratulations on finishing all of this week's videos.

5:17Please do take a look at the practice quizzes and also the practice lab,

5:22which I hope will let you try out and practice ideas that we've discussed.

5:27In this week's practice lab, you implement linear regression.

5:31I hope you have a lot of fun getting this learning algorithm to work for yourself.

5:35Best of luck with that.

5:37And I also look forward to seeing you in next week's videos,

5:41where we'll go beyond regression, that is predicting numbers,

5:44to talk about our first classification algorithm, which can predict categories.

5:49I'll see you next week.