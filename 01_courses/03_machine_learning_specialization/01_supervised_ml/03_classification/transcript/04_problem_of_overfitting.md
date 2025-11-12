0:02Now you've seen a couple of different learning algorithms, linear regression and logistic

0:07regression.

0:08They work well for many tasks, but sometimes, in an application, the algorithm can run into

0:14a problem called overfitting, which can cause it to perform poorly.

0:19What I'd like to do in this video is to show you what is overfitting, as well as a closely

0:24related, almost opposite problem called underfitting.

0:28And in the next videos after this, I'll share with you some techniques for addressing overfitting.

0:34In particular, there's a method called regularization.

0:37Very useful technique.

0:38I use it all the time, but regularization will help you minimize this overfitting problem

0:44and get your learning algorithms to work much better.

0:47So let's take a look at what is overfitting.

0:51To help us understand what is overfitting, let's take a look at a few examples.

0:58Let's go back to our original example of predicting housing prices with linear regression,

1:04where you want to predict the price as a function of the size of a house.

1:10To help us understand what is overfitting, let's take a look at a linear regression example.

1:18And I'm going to go back to our original running example of predicting housing prices with

1:22linear regression.

1:25Suppose your data set looks like this, with the input feature x being the size of the

1:31house and the value y they're trying to predict, the price of the house.

1:36One thing you could do is fit a linear function to this data, and if you do that, you get

1:43a straight line fit to the data that maybe looks like this.

1:47But this isn't a very good model.

1:50Looking at the data, it seems pretty clear that as the size of the house increases, the

1:55housing prices kind of flatten out.

1:59So this algorithm does not fit the training data very well.

2:04The technical term for this is the model is underfitting the training data.

2:11Another term is the algorithm has high bias.

2:16You may have read in the news about some learning algorithms, really unfortunately,

2:21demonstrating bias against certain ethnicities or certain genders.

2:26In machine learning, the term bias has multiple meanings.

2:32Checking learning algorithms for bias based on characteristics such as gender or ethnicity

2:38is absolutely critical.

2:41But the term bias has a second technical meaning as well, which is the one I'm using here,

2:47which is if the algorithm has underfit the data, meaning that it's just not even able

2:52to fit the training set that well, that there's a clear pattern in the training data that

2:58the algorithm is just unable to capture.

3:01Another way to think of this form of bias is as if the learning algorithm has a very

3:07strong preconception, or we say a very strong bias, that the housing prices are going to

3:12be a completely linear function of the size, despite data to the contrary.

3:19So this preconception that the data is linear causes it to fit a straight line that fits

3:26the data poorly, leading it to underfit the data.

3:30Now let's look at a second variation of a model, which is if you instead fit a quadratic

3:39function to the data with two features, x and x squared, then when you fit the parameters

3:45w1 and w2, you can get a curve that fits the data somewhat better.

3:52Maybe it looks like this.

3:55So if you were to get a new house that's not in this set of five training examples,

4:01this model would probably do quite well on that new house.

4:07So if you're a real estate agent, the idea that you want your learning algorithm to do

4:11well, even on examples that are not on the training set, that's called generalization.

4:18Technically, we say that you want your learning algorithm to generalize well, which means

4:23to make good predictions, even on brand new examples that it has never seen before.

4:29So this quadratic model seems to fit the training set not perfectly, but pretty well, and I

4:35think it would generalize well to new examples.

4:38Now let's look at the other extreme.

4:41What if you were to fit a fourth order polynomial to the data?

4:46So you have x, x squared, x cubed, and x to the fourth, all as features.

4:52With this fourth order polynomial, you can actually fit a curve that passes through all

4:56five of the training examples exactly, and you might get a curve that looks like this.

5:03This on one hand seems to do an extremely good job fitting the training data because

5:08it passes through all of the training data perfectly.

5:12In fact, you'll be able to choose parameters that will result in the cost function being

5:17exactly equal to zero because the errors are zero on all five training examples.

5:24But this is a very wiggly curve.

5:26It's going up and down all over the place.

5:29And if you have this house size right here, the model would predict that this house is

5:35cheaper than houses that are smaller than it.

5:39So we don't think that this is a particularly good model for predicting housing prices.

5:46The technical term is that we'll say this model has overfit the data or this model has

5:52an overfitting problem because even though it fits the training set very well, it has

5:57fit the data almost too well, hence it's overfit.

6:02And it does not look like this model will generalize to new examples that it has never

6:06seen before.

6:08Another term for this is that the algorithm has high variance.

6:14In machine learning, many people will use the terms overfit and high variance almost

6:19interchangeably and will use the terms underfit and high bias almost interchangeably.

6:26The intuition behind overfitting or high variance is that the algorithm is trying very, very

6:30hard to fit every single training example.

6:34And it turns out that if your training set were just even a little bit different, say

6:39one house was priced just a little bit more, a little bit less, then the function that

6:44the algorithm fits could end up being totally different.

6:49So if two different machine learning engineers were to fit this fourth order polynomial model

6:56to just slightly different data sets, they could end up with totally different predictions

7:00or highly variable predictions.

7:03And that's why we say the algorithm has high variance.

7:08Contrasting this rightmost model with the one in the middle for the same house, it seems

7:14the middle model gives the much more reasonable prediction for price.

7:19There isn't really a name for this case in the middle, but I'm just going to call this

7:23just right because it is neither underfit nor overfit.

7:28So we can say that the goal of machine learning is to find a model that hopefully is neither

7:33underfitting nor overfitting.

7:35In other words, hopefully a model that has neither high bias nor high variance.

7:42When I think about underfitting and overfitting, high bias and high variance, I'm sometimes

7:48reminded of the children's story of Goldilocks and the Three Bears.

7:54In this children's tale, a girl called Goldilocks visits the home of a bear family.

8:00There's a bowl of porridge that's too cold to taste, and so that's no good.

8:06There's also a bowl of porridge that's too hot to eat, so that's no good either.

8:12But there's a bowl of porridge that is neither too cold nor too hot.

8:15The temperature is in the middle, which is just right to eat.

8:20So to recap, if you have too many features, like the full water polynomial on the right,

8:26then the model may fit the training set well, but almost too well or overfit and have high

8:31variance.

8:32On the flip side, if you have too few features, then in this example, like the one on the

8:37left, it underfits and has high bias.

8:40And in this example, using quadratic features, x and x-squared, that seems to be just right.

8:47So far, we've looked at underfitting and overfitting for a linear regression model.

8:52Similarly, overfitting applies to classification as well.

8:56Here's a classification example with two features, x1 and x2, where x1 is maybe the tumor size

9:03and x2 is the age of the patient, and we're trying to classify if a tumor is malignant

9:09or benign, as denoted by these crosses and circles.

9:14One thing you can do is fit a logistic regression model, just a simple model, like this, where

9:21as usual, g is the sigmoid function, and this term here inside is z.

9:29So if you do that, you end up with a straight line as the decision boundary.

9:36This is the line where z is equal to zero, that separates the positive and negative examples.

9:42This straight line doesn't look terrible, it looks kind of okay, but it doesn't look

9:46like a very good fit to the data either.

9:49So this is an example of underfitting or of high bias.

9:54Let's look at another example.

9:57If you were to add to your features these quadratic terms, then z becomes this new term

10:03in the middle, and the decision boundary, that is, where z equals zero, can look more

10:08like this, more like an ellipse, or part of an ellipse.

10:13And this is a pretty good fit to the data, even though it does not perfectly classify

10:18every single training example in the training set.

10:21Notice how some of these crosses get classified among the circles, but this model looks pretty

10:27good.

10:28I'm going to call it just right, and it looks like this will generalize pretty well

10:32to new patients.

10:34And finally, at the other extreme, if you were to fit a very high-order polynomial with

10:40many, many features like these, then the model may try really hard and contort or twist itself

10:48to find a decision boundary that fits your training data perfectly.

10:54Having all these higher-order polynomial features allows the algorithm to choose this really

11:00overly complex decision boundary.

11:04If the features are tumor size and age, and you're trying to classify tumors as malignant

11:09or benign, then this doesn't really look like a very good model for making predictions.

11:15So once again, this is an instance of overfitting and high variance, because this model, despite

11:21doing very well in the training set, doesn't look like it will generalize well to new examples.

11:27So now you've seen how an algorithm can underfit or have high bias, or overfit and

11:33have high variance.

11:35You may want to know how you can get a model that is just right.

11:39In the next video, we'll look at some ways you can address the issue of overfitting,

11:44and we'll also touch on some ideas relevant for addressing underfitting.

11:49Let's go on to the next video.

---
0:02Later in this specialization, we'll talk about debugging and diagnosing things that

0:07can go wrong with learning algorithms.

0:09You'll also learn about specific tools to recognize when overfitting and underfitting

0:14may be occurring.

0:15But for now, when you think overfitting has occurred, let's talk about what you can

0:20do to address it.

0:22Let's say you fit a model and it has high variance.

0:26It's overfit.

0:27Here's our overfit house price prediction model.

0:32One way to address this problem is to collect more training data.

0:37So that's one option.

0:39If you're able to get more data, that is, more training examples on sizes and prices

0:44of houses, then with the larger training set, the learning algorithm will learn to fit a

0:51function that is less wiggly.

0:54So you can continue to fit a high-order polynomial or some other function with a lot of features.

1:00And if you have enough training examples, it will still do okay.

1:04So to summarize, the number one tool you can use against overfitting is to get more training

1:10data.

1:11Now, getting more data isn't always an option.

1:15Maybe only so many houses have been sold in this location.

1:18So maybe there just isn't more data to be had.

1:21So when the data is available, this can work really well.

1:24A second option for addressing overfitting is to see if you can use fewer features.

1:31In the previous video, our model's features included the size X as well as the size squared,

1:38that is, X squared, and X cubed, and X to the fourth, and so on.

1:44These were a lot of polynomial features.

1:48So in that case, one way to reduce overfitting is to just not use so many of these polynomial

1:54features.

1:55But now let's look at a different example.

1:58Maybe you have a lot of different features of a house with which to try to predict its

2:02price, ranging from the size, number of bedrooms, number of floors, the age, average income

2:07of the neighborhood, and so on and so forth to the distance to the nearest coffee shop.

2:13It turns out that if you have a lot of features like these but don't have enough training

2:18data, then your learning algorithm may also overfit to your training set.

2:24Now instead of using all 100 features, if we were to pick just a subset of the most

2:29useful ones, maybe size, bedrooms, and the age of the house, if you think those are the

2:37most relevant features, then using just that smallest subset of features, you may find

2:42that your model no longer overfits as badly.

2:46Choosing the most appropriate set of features to use is sometimes also called feature selection.

2:52One way you could do so is to use your intuition to choose what you think is the best set of

2:57features, what's most relevant for predicting the price.

3:01Now one disadvantage of feature selection is that by using only a subset of the features,

3:08the algorithm is throwing away some of the information that you have about the houses.

3:13For example, maybe all of these features, all 100 of them, are actually useful for predicting

3:18the price of a house.

3:20So maybe you don't want to throw away some of the information by throwing away some of

3:24the features.

3:25Later in course 2, you also see some algorithms for automatically choosing the most appropriate

3:32set of features to use for a prediction task.

3:35Now this takes us to the third option for reducing overfitting.

3:39This technique, which we'll look at in even greater depth in the next video, is called

3:44regularization.

3:47If you look at an overfit model, here's a model using polynomial features, x, x squared,

3:54x cubed, and so on.

3:56You find that the parameters are often relatively large.

4:00Now if you were to eliminate some of these features, say if you were to eliminate the

4:05feature x4, that corresponds to setting this parameter to 0.

4:13So setting a parameter to 0 is equivalent to eliminating a feature, which is what we

4:18saw on the previous slide.

4:21It turns out that regularization is a way to more gently reduce the impact of some of

4:26the features without doing something as harsh as eliminating it outright.

4:32What regularization does is encourage the learning algorithm to shrink the values of

4:37the parameters without necessarily demanding that the parameter is set to exactly 0.

4:44And it turns out that even if you fit a higher-order polynomial like this, so long as you can get

4:49the algorithm to use smaller parameter values, w1, w2, w3, w4, you end up with a curve that

4:56ends up fitting the training data much better.

5:00So what regularization does is it lets you keep all of your features, but it just prevents

5:06the features from having an overly large effect, which is what sometimes can cause overfitting.

5:14By the way, by convention, we normally just reduce the size of the wj parameters, that

5:21is w1 through wn.

5:23It kind of doesn't make a huge difference whether you regularize the parameter b as

5:28well.

5:29You could do so if you want, or not if you don't.

5:31I usually don't, and it's just fine to regularize w1, w2, all the way to wn, but not really

5:39encourage b to become smaller.

5:41In practice, it should make very little difference whether you also regularize b or not.

5:47So to recap, these are the three ways you saw in this video for addressing overfitting.

5:54One, collect more data.

5:57If you can get more data, this can really help reduce overfitting.

6:02Sometimes that's not possible, in which case, some other options are, two, try selecting

6:08and using only a subset of the features.

6:12You learn more about feature selection in course two.

6:16Three, would be to reduce the size of the parameters using regularization.

6:23This will be the subject of the next video as well.

6:27Just for myself, I use regularization all the time, so this is a very useful technique

6:31for training learning algorithms, including neural networks specifically, which you see

6:36later in this specialization as well.

6:38I hope you also check out the optional lab on overfitting.

6:44In the lab, you'll be able to see different examples of overfitting and adjust those examples

6:50by clicking on options in the plots.

6:53You'll also be able to add your own data points by clicking on the plot and see how that changes

6:59the curve that is fit.

7:01You can also try examples for both regression and classification, and you will change the

7:07degree of the polynomial to be x, x squared, x cubed, and so on.

7:13The lab also lets you play with two different options for adjusting overfitting.

7:19You can add additional training data to reduce overfitting, and you can also select which

7:24features to include or to exclude as another way to try to reduce overfitting.

7:31So please take a look at the lab, which I hope will help you build your intuition about

7:35overfitting as well as some methods for addressing it.

7:40In this video, you also saw the idea of regularization at a relatively high level.

7:46I realize that all of these details on regularization may not fully make sense to you yet, but in

7:52the next video, we'll start to formulate exactly how to apply regularization and exactly what

7:58regularization means.

8:00And then we'll start to figure out how to make this work with our learning algorithms

8:04to make linear regression and logistic regression and in the future other algorithms as well

8:10avoid overfitting.

8:11Let's take a look at that in the next video.

---

0:01In the last video, we saw that regularization tries to make the parameter values w1 through wn small to reduce overfitting.

0:10In this video, we'll build on that intuition and develop a modified cost function for your learning algorithm that you can use to actually apply regularization.

0:20Let's jump in.

0:21Recall this example from the previous video, in which we saw that if you fit a quadratic function to this data, it gives a pretty good fit.

0:31But if you fit a very high-order polynomial, you end up with a curve that overfits the data.

0:37But now, consider the following.

0:40Suppose that you had a way to make the parameters w3 and w4 really, really small, say close to zero.

0:50Here's what I mean.

0:51Let's say instead of minimizing this objective function, this is the cost function for linear regression.

0:59Let's say you were to modify the cost function and add to it 1000 times w3 squared plus 1000 times w4 squared.

1:10And here, I'm just choosing 1000 because it's a big number, but any other really large number would be okay.

1:17So with this modified cost function, you'd in effect be penalizing the model if w3 and w4 are large.

1:25Because if you want to minimize this function, the only way to make this new cost function small is if w3 and w4 are both small, right?

1:35Because otherwise, this 1000 times w3 squared and 1000 times w4 squared terms are going to be really, really big.

1:45So when you minimize this function, you're going to end up with w3 close to zero and w4 close to zero.

1:53So we're effectively nearly canceling out the effect of the features x cubed and x to the power of 4 and getting rid of these two terms over here.

2:05And if we do that, then we end up with a fit to the data that's much closer to the quadratic function,

2:11including maybe just tiny contributions from the features x cubed and x to the 4.

2:17And this is good because it's a much better fit to the data compared to if all the parameters could be large and you end up with this weakly quadratic function.

2:27More generally, here's the idea behind regularization.

2:31The idea is that if there are smaller values for the parameters, then that's a bit like having a simpler model,

2:38maybe one with fewer features, which is therefore less prone to overfitting.

2:44On the last slide, we penalized or we say we regularized only w3 and w4.

2:52But more generally, the way that regularization tends to be implemented is if you have a lot of features, say 100 features,

3:00you may not know which are the most important features and which ones to penalize.

3:05So the way regularization is typically implemented is to penalize all of the features, or more precisely, you penalize all the wj parameters.

3:14And it's possible to show that this will usually result in fitting a smoother, simpler, less weakly function that's less prone to overfitting.

3:24So for this example, if you have data with 100 features for each host, it may be hard to pick and advance which features to include and which ones to exclude.

3:32So let's build a model that uses all 100 features.

3:37So you have these 100 parameters, w1 through w100, as well as the 101st parameter, b.

3:47Because we don't know which of these parameters are going to be the important ones, let's penalize all of them a bit and shrink all of them by adding this new term,

3:58lambda times the sum from j equals 1 through n, where n is 100, the number of features, of wj squared.

4:08This value, lambda here, is the Greek alphabet lambda, and is also called a regularization parameter.

4:17So similar to picking a learning rate alpha, you now also have to choose a number for lambda.

4:27A couple things I would like to point out.

4:29By convention, instead of using lambda times the sum of wj squared, we also divide lambda by 2m,

4:38so that both the first and second terms here are scaled by 1 over 2m.

4:44It turns out that by scaling both terms the same way, it becomes a little bit easier to choose a good value for lambda.

4:53In particular, you find that even if your training set size grows, say you find more training examples, so m, the training set size, is now bigger,

5:02the same value of lambda that you have picked previously is now also more likely to continue to work if you have this extra scaling by 2m.

5:12Also, by the way, by convention, we're not going to penalize the parameter b for being large.

5:19In practice, it makes very little difference whether you do or not,

5:22and some machine learning engineers and actually some learning algorithm implementations will also include lambda over 2m times the b squared term.

5:33But this makes very little difference in practice, and the more common convention which we'll use in this course is to regularize only the parameters w rather than the parameters b.

5:45So to summarize, in this modified cost function, we want to minimize the original cost, which is the mean squared error cost,

5:55plus additionally the second term, which is called the regularization term.

6:00And so this new cost function trades off two goals that you might have.

6:05Trying to minimize this first term encourages the algorithm to fit the training data well by minimizing the squared differences of the predictions and the actual values.

6:15And trying to minimize the second term, the algorithm also tries to keep the parameters wj small, which will tend to reduce overfitting.

6:25The value of lambda that you choose specifies the relative importance or the relative tradeoff or how you balance between these two goals.

6:35Let's take a look at what different values of lambda will cause your learning algorithm to do.

6:42Let's use the housing price prediction example using linear regression.

6:46So f of x is the linear regression model.

6:49If lambda was set to be 0, then you're not using the regularization term at all because the regularization term is multiplied by 0.

6:59And so if lambda was 0, you end up fitting this overly wiggly, overly complex curve and it overfits.

7:07So that was one extreme of if lambda was 0.

7:11Let's now look at the other extreme.

7:13If you set lambda to be a really, really, really large number, say lambda equals 10 to the power of 10,

7:20then you're placing a very heavy weight on this regularization term on the right.

7:25And the only way to minimize this is to be sure that all the values of w are pretty much very close to 0.

7:33So if lambda is very, very large, the learning algorithm will choose w1, w2, w3, and w4 to be extremely close to 0.

7:43And thus, f of x is basically equal to b.

7:48And so the learning algorithm fits a horizontal straight line and underfits.

7:54To recap, if lambda is 0, this model will overfit.

8:00If lambda is enormous, like 10 to the power of 10, this model will underfit.

8:05And so what you want is some value of lambda that is in between,

8:09that more appropriately balances these first and second terms of trading off minimizing the mean squared error

8:18and keeping the parameters small.

8:22And when the value of lambda is not too small and not too large, but just right,

8:27then hopefully you end up able to fit a fourth-order polynomial keeping all of these features,

8:32but with a function that looks like this.

8:36So that's how regularization works.

8:39When we talk about model selection later into specialization,

8:42we'll also see a variety of ways to choose good values for lambda.

8:47In the next two videos, we'll flesh out how to apply regularization to linear regression and logistic regression,

8:54and how to train these models with gradient descent.

8:57With that, you'll be able to avoid overfitting with both of these algorithms.

---

0:01In this video, we'll figure out how to get gradient descent to work with regularized linear regression.

0:07Let's jump in.

0:08Here's the cost function we've come up with in the last video for regularized linear regression.

0:14The first part is the usual squared error cost function.

0:18And now you have this additional regularization term, where lambda is the regularization parameter.

0:25And you'd like to find parameters w and b that minimize the regularized cost function.

0:32Previously, we were using gradient descent for the original cost function, just the first term, before we added that second regularization term.

0:43And previously, we had the following gradient descent algorithm,

0:48which is that we repeatedly update the parameters w, j, and b for j equals 1 through n according to this formula,

0:56and b is also updated similarly.

0:59Again, alpha is a very small positive number called the learning rate.

1:04In fact, the updates for regularized linear regression look exactly the same,

1:09except that now the cost j is defined a bit differently.

1:14Previously, the derivative of j with respect to wj was given by this expression over here,

1:21and the derivative with respect to b was given by this expression over here.

1:27Now that we've added this additional regularization term,

1:31the only thing that changes is that the expression for the derivative with respect to wj ends up with one additional term.

1:39This plus lambda over m times wj.

1:44And in particular, for the new definition of the cost function j,

1:48these two expressions over here, these are the new derivatives of j with respect to wj,

1:56and the derivative of j with respect to b.

1:59Recall that we don't regularize b, so we're not trying to shrink b.

2:04That's why the updated b remains the same as before,

2:08whereas the updated w changes because the regularization term causes us to try to shrink wj.

2:16So let's take these definitions for the derivatives and put them back into the expression on the left

2:23to write out the gradient descent algorithm for regularized linear regression.

2:28So to implement gradient descent for regularized linear regression,

2:33this is what you would have your code do.

2:37Here's the update for wj for j equals 1 through n, and here's the update for b.

2:42And as usual, please remember to carry out simultaneous updates for all of these parameters.

2:49Now, in order for you to get this algorithm to work, this is all you need to know.

2:55But what I'd like to do in the remainder of this video is to go over some optional material

3:00to convey a slightly deeper intuition about what this formula is actually doing,

3:05as well as chat briefly about how these derivatives are derived.

3:10The rest of this video is completely optional.

3:12It's completely okay if you skip the rest of this video.

3:16But if you have a strong interest in math, then stick with me.

3:19It's always nice to hang out with you here.

3:22And through these equations, perhaps you can build a deeper intuition

3:26about what the math and what the derivatives are doing as well.

3:29So let's take a look.

3:32Let's look at the update rule for wj and rewrite it in another way.

3:37We're updating wj as 1 times wj minus alpha times lambda over m times wj.

3:49So I've moved the term from the end to the front here.

3:53And then minus alpha times 1 over m and then the rest of that term over there.

4:01So we just rearranged the terms a little bit.

4:04And if we simplify, then we're saying that wj is updated as wj times 1 minus alpha times lambda over m

4:15minus alpha times this other term over here.

4:20And you might recognize this second term as the usual gradient descent update

4:25for unregularized linear regression.

4:28This is the update for linear regression before we had regularization.

4:32And this is the term we saw in week 2 of this course.

4:37And so the only change when you add regularization is that instead of wj being set to be equal to,

4:44wj minus alpha times this term is now w times this number minus the usual update.

4:53So this is what we had in week 1 of this course.

4:56So what is this first term over here?

4:59Well, alpha is a very small positive number, say 0.01.

5:05Lambda is usually a small number, say 1 or maybe 10.

5:11Let's say lambda is 1 for this example and m is the training set size, say 50.

5:18And so when you multiply alpha lambda over m, say 0.01 times 1 divided by 50,

5:28this term ends up being a small positive number, say 0.0002.

5:35And thus, 1 minus alpha lambda over m is going to be a number just slightly less than 1, in this case 0.9998.

5:44And so the effect of this term is that on every single iteration of gradient descent,

5:49you're taking wj and multiplying it by 0.9998.

5:54That is by some number slightly less than 1 before carrying out the usual update.

6:00So what regularization is doing on every single iteration is you're multiplying w by a number slightly less than 1

6:07and that has the effect of shrinking the value of wj just a little bit.

6:13So this gives us another view on why regularization has the effect of shrinking the parameters wj a little bit on every iteration.

6:22And so that's how regularization works.

6:25If you're curious about how these derivative terms were computed,

6:29I have just one last optional slide that goes through just a little bit of the calculation of the derivative term.

6:36Again, this slide and the rest of this video are completely optional,

6:40meaning you won't need any of this to do the practice labs and the quizzes.

6:45So let's step through quickly the derivative calculation.

6:49The derivative of j with respect to wj looks like this.

7:06Recall that f of x for linear regression is defined as w dot x plus b or w dot product x plus b.

7:16And it turns out that by the rules of calculus, the derivatives look like this.

7:22It's 1 over 2m times the sum i equals 1 through m of w dot x plus b minus y times 2xj

7:36plus the derivative of the regularization term, which is lambda over 2m times 2wj.

7:46Notice that the second term does not have the summation term from j equals 1 through n anymore.

7:54The 2s cancel out here and here and also here and here.

8:00And so it simplifies to this expression over here.

8:07And finally, remember that wx plus b is f of x, and so you can rewrite it as this expression down here.

8:17So this is why this expression is used to compute the gradient in regularized linear regression.

8:24So you now know how to implement regularized linear regression.

8:29Using this, you really reduce overfitting when you have a lot of features and a relatively small training set.

8:35And this should let you get linear regression to work much better on many problems.

8:40In the next video, we'll take this regularization idea and apply it to logistic regression to avoid overfitting for logistic regression as well.

8:49Let's take a look at that in the next video.

---

0:01In this video, you see how to implement regularized logistic regression.

0:06Just as the gradient update for logistic regression has seemed surprisingly similar to the gradient update for linear regression,

0:13you'll find that the gradient descent update for regularized logistic regression will also look similar to the update for regularized linear regression.

0:21Let's take a look.

0:22Here's the idea.

0:24We saw earlier that logistic regression can be prone to overfitting if you fit it with very high-order polynomial features like this.

0:32Here, z is a high-order polynomial that gets passed into the sigmoid function, like so, to compute f.

0:42And in particular, you can end up with a decision boundary that is overly complex and overfits this training set.

0:50More generally, when you train logistic regression with a lot of features, whether polynomial features or some other features,

0:58there can be a higher risk of overfitting.

1:01This was the cost function for logistic regression.

1:05If you want to modify it to use regularization, all you need to do is add to it the following term.

1:13Let's add lambda, the regularization parameter, over 2m, times the sum from j equals 1 through n,

1:21where n is the number of features as usual, of wj squared.

1:26So when you minimize this cost function as a function of w and b,

1:31it has the effect of penalizing parameters w1, w2, through wn and preventing them from being too large.

1:39And if you do this, then even though you're fitting a high-order polynomial with a lot of parameters,

1:45you still get a decision boundary that looks like this,

1:49something that looks more reasonable for separating positive and negative examples

1:54while also generalizing, hopefully, to new examples not in the training set.

2:00So when using regularization, even when you have a lot of features,

2:04how can you actually implement this?

2:07How can you actually minimize this cost function j of wb that includes the regularization term?

2:13Well, let's use gradient descent as before.

2:17So here's the cost function that you want to minimize,

2:21and to implement gradient descent as before,

2:24we'll carry out the following simultaneous updates over wj and b.

2:31These are the usual update rules for gradient descent,

2:35and just like regularized linear regression,

2:38when you compute what are these derivative terms,

2:41the only thing that changes now is that the derivative with respect to wj gets this additional term,

2:49lambda over m times wj added here at the end.

2:54And again, it looks a lot like the update for regularized linear regression.

2:59In fact, it's the exact same equation,

3:02except for the fact that the definition of f is now no longer the linear function,

3:07it is the logistic function applied to z.

3:11And similar to linear regression, we will regularize only the parameters wj,

3:17but not the parameter b, which is why there's no change to the update you would make for b.

3:24In the final optional lab of this week, you revisit overfitting,

3:30and in the interactive plot in the optional lab,

3:34you can now choose to regularize your models, both regression and classification,

3:39by enabling regularization during gradient descent by selecting a value for lambda.

3:45Please take a look at the code for implementing regularized logistic regression in particular,

3:50because you implement this in a practice lab yourself at the end of this week.

3:56So, now you know how to implement regularized logistic regression.

4:01When I walk around Silicon Valley, there are many engineers using machine learning

4:05to create a ton of value, sometimes making a lot of money for their companies.

4:09And I know you've only been studying this stuff for a few weeks,

4:13but if you understand and can apply linear regression and logistic regression,

4:18that's actually all you need to create some very valuable applications.

4:23While the specific learning algorithms you use are important,

4:26knowing things like when and how to reduce overfitting

4:30turns out to be one of the very valuable skills in the real world as well.

4:34So, I want to say congratulations on how far you've come,

4:38and I want to say great job for getting through all the way to the end of this video.

4:44I hope you also work through the practice labs and quizzes.

4:48Having said that, there are still many more exciting things to learn.

4:53In the second course of this specialization, you learn about neural networks,

4:57also called deep learning algorithms.

5:00Neural networks are responsible for many of the latest breakthroughs in AI today,

5:04from practical speech recognition,

5:06to computers accurately recognizing objects and images, to self-driving cars.

5:11The way a neural network gets built actually uses a lot of what you've already learned,

5:16like cost functions and gradient descent and sigmoid functions.

5:20So again, congratulations on reaching the end of this third and final week of course 1.

5:26I hope you have fun in the labs, and I will see you in next week's material on neural networks.