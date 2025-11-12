0:02The typical workflow of developing a machine learning system is that you have an idea and

0:08you train a model, and you almost always find that it doesn't work as well as you wish yet.

0:14When I'm training a machine learning model, it pretty much never works that well the first

0:17time.

0:18And so key to the process of building a machine learning system is how to decide what to do

0:23next in order to improve its performance.

0:26I've found across many different applications that looking at the bias and variance of a

0:31learning algorithm gives you very good guidance on what to try next.

0:35Let's take a look at what this means.

0:38You might remember this example from the first course on linear regression, where given this

0:45data set, if you were to fit a straight line to it, it doesn't do that well.

0:49And we said that this algorithm has high bias, or that it underfits this data set.

0:56Or if you were to fit a 4-fold polynomial, then it has high variance, or it overfits.

1:04And in the middle, if you fit a quadratic polynomial, then it looks pretty good, and

1:08we said that was just right.

1:11Because this is a problem with just a single feature x, we could plot the function f and

1:16look at it like this, but if you had more features, you can't plot f and visualize whether

1:22it's doing well as easily.

1:24So instead of trying to look at plots like this, a more systematic way to diagnose or

1:31to find out if your algorithm has high bias or high variance will be to look at the performance

1:37of your algorithm on the training set and on the cross-validation set.

1:42In particular, let's look at the example on the left.

1:45If you were to compute J-train, how well does the algorithm do on the training set?

1:52Not that well.

1:53So I'd say J-train here would be high, because there are actually pretty large errors between

1:58the examples and the actual predictions of the model.

2:02And how about J-CV?

2:04So J-CV would be if you had a few new examples, maybe examples like that, that the algorithm

2:12had not previously seen, and here the algorithm also doesn't do that well on examples that

2:20it had not previously seen, so J-CV would also be high.

2:25And one characteristic of an algorithm with high bias, something that is underfitting,

2:30is that it's not even doing that well on the training set.

2:33And so when J-train is high, that gives you a strong indicator that this algorithm has

2:38high bias.

2:39Let's now look at the example on the right.

2:42If you were to compute J-train, how well is this doing on the training set?

2:47Well, it's actually doing great on the training set, because the training data is really well.

2:51So J-train here would be low, but if you were to evaluate this model on other houses not

2:59in the training set, then you find that J-CV, the cross-validation error, would be quite high.

3:07And so a characteristic signature, or a characteristic cue, that your algorithm has high variance

3:13would be if J-CV is much higher than J-train.

3:18In other words, it does much better on data it has seen than on data it has not seen,

3:23and this turns out to be a strong indicator that your algorithm has high variance.

3:28And again, the point of what we're doing is that by computing J-train and J-CV, and seeing

3:35if J-train is high, or if J-CV is much higher than J-train, this gives you a sense, even

3:41if you can't plot to function f, of whether your algorithm has high bias or high variance.

3:49And finally, the case in the middle.

3:51If you look at J-train, it's pretty low, since it's doing quite well on the training set.

3:59But if you were to look at a few new examples, like those, from, say, your cross-validation

4:05set, you find that J-CV is also pretty low.

4:09And so J-train not being too high indicates this doesn't have a high bias problem, and

4:16J-CV not being much worse than J-train, this indicates that it doesn't have a high variance

4:22problem either, which is why this model, the quadratic model, seems to be a pretty good

4:27one for this application.

4:30So to summarize, when D equals 1, for a linear polynomial, J-train was high and J-CV was

4:36high.

4:38When D equals 4, J-train was low, but J-CV is high, and when D equals 2, both were pretty

4:45low.

4:46Let's now take a different view on bias and variance, and in particular, on the next slide,

4:51I'd like to show you how J-train and J-CV vary as a function of the degree of the polynomial

4:59you're fitting.

5:00So let me draw a figure where the horizontal axis of this figure will be the degree of

5:05polynomial that we're fitting to the data.

5:09Over on the left will correspond to a small value of D, like D equals 1, which corresponds

5:15to a fitting straight line, and over to the right will correspond to, say, D equals 4,

5:21or even higher values of D, where we're fitting this high-order polynomial.

5:27So if you were to plot J-train for WB as a function of the degree of polynomial, what

5:36you find is that as you fit a higher and higher degree polynomial, here I'm assuming we're

5:42not using regularization, but as you fit a higher and higher-order polynomial, the training

5:48error will tend to go down, because when you have a very simple linear function, it doesn't

5:53fit the training data that well.

5:55When you fit a quadratic function, or a third-order polynomial, or a fourth-order polynomial,

6:01it fits the training data better and better.

6:04So as the degree of polynomial increases, J-train will typically go down.

6:10Next, let's look at J-CV, which is how well does it do on data that it did not get to fit to.

6:21What we saw was when D equals 1, when the degree of polynomial was very low, J-CV was

6:28pretty high, because it underfit, so it didn't do well on the cross-validation set.

6:33And here on the right as well, when the degree of polynomial is very large, say 4, it does

6:40not do well on the cross-validation set either, and so is also high.

6:46But if D was in between, say a second-order polynomial, then it actually did much better.

6:51And so, if you were to vary the degree of polynomial, you'd actually get a curve that

6:56looks like this, which comes down and then goes back up, where if the degree of polynomial

7:03is too low, it underfits, and so doesn't do well on the cross-validation set.

7:08If it is too high, it overfits, and also doesn't do well on the cross-validation set.

7:14And it's only if it's somewhere in the middle that is just right, which is why the second-order

7:19polynomial in our example ends up with a lower cross-validation error, and neither high bias

7:25nor high variance.

7:28So to summarize, how do you diagnose bias and variance in your learning algorithm?

7:34If your learning algorithm has high bias or has underfitted data, the key indicator will

7:39be if J-train is high, and so that corresponds to this leftmost portion of the curve, which

7:46is where J-train is high.

7:48And usually, you have J-train and J-CV will be close to each other.

7:53And how do you diagnose if you have high variance?

7:55Well, the key indicator for high variance will be if J-CV is much greater than J-train.

8:02This double greater-than sign in math refers to much greater than, so this is greater and

8:08this means much greater.

8:10And this rightmost portion of the plot is where J-CV is much greater than J-train, and

8:17usually J-train will be pretty low.

8:20But the key indicator is whether J-CV is much greater than J-train.

8:25And that's what happened when we had fit a very high-order polynomial to this small dataset.

8:31And even though we've just seen bias and variance, it turns out in some cases it's

8:36possible to simultaneously have high bias and have high variance.

8:42You won't see this happen that much for linear regression, but it turns out that if you're

8:46training a neural network, there are some applications where unfortunately you have

8:50high bias and high variance.

8:53And one way to recognize that situation will be if J-train is high, so you're not doing

8:59that well in the training set, but even worse, the cross-validation error is, again, even

9:04much larger than the training set.

9:07The notion of high bias and high variance doesn't really happen for linear models applied

9:13to 1D, but to give intuition about what it looks like, it would be as if for part of

9:20the input, you had a very complicated model that overfit.

9:25So it overfits the part of the input, but then for some reason, for other parts of the

9:31input, it doesn't even fit the training data well, and so it underfits for part of the

9:36input.

9:37In this example, which looks artificial because it's a single-feature input, we fit the training

9:43set really well, and we overfit in part of the input, and we don't even fit the training

9:48data well, and we underfit in part of the input.

9:51That's how, in some applications, you can unfortunately end up with both high bias and

9:56high variance, and the indicator for that will be if Diagram does poorly on the training

10:02set and it even does much worse than on the training set.

10:05For most learning applications, you probably have primarily a high bias or a high variance

10:11problem rather than both at the same time, but it is possible sometimes to have both

10:15at the same time.

10:17So I know that there's a lot to process, there are a lot of concepts on the slides, but the

10:21key takeaways are high bias means it's not even doing well on the training set, and high

10:28variance means it does much worse on the cross-validation set than the training set.

10:34Whenever I'm training a machine learning algorithm, I will almost always try to figure out to

10:39what extent the algorithm has a high bias or underfitting versus a high variance or

10:45overfitting problem, and this will give good guidance, as we'll see later this week, on

10:49how you can improve the performance of your algorithm.

10:53But first, let's take a look at how regularization affects the bias and variance of a learning

10:58algorithm, because that will help you better understand when you should use regularization.

11:03Let's take a look at that in the next video.

---
0:02You saw in the last video how different choices of the degree of polynomial d affects the

0:08bias and variance of your learning algorithm, and therefore its overall performance.

0:13In this video, let's take a look at how regularization, specifically the choice of

0:18the regularization parameter lambda, affects the bias and variance, and therefore the overall

0:23performance of the algorithm.

0:25This it turns out will be helpful for when you want to choose a good value of lambda

0:29of the regularization parameter for your algorithm.

0:33Let's take a look.

0:34In this example, I'm going to use a fourth-order polynomial, but we're going to fit this model

0:40using regularization, where here the value of lambda is the regularization parameter

0:48that controls how much you trade off keeping the parameters w small versus fitting the

0:54trading data well.

0:57Let's start with the example of setting lambda to be a very large value.

1:03Say lambda is equal to 10,000.

1:07If you were to do so, you would end up fitting a model that looks roughly like this.

1:14Because if lambda were very, very large, then the algorithm is highly motivated to keep

1:20these parameters w very small, and so you end up with w1, w2, really all of these parameters

1:27would be very close to zero.

1:30The model ends up being f of x is just approximately b, a constant value, which is why you end

1:37up with a model like this.

1:40This model clearly has high bias, and it underfits the trading data because it doesn't even do

1:48well on the trading set, and jtrain is large.

1:53Let's take a look at the other extreme.

1:57Let's say you set lambda to be a very small value.

2:02So with a small value of lambda, in fact, let's go to the extreme of setting lambda

2:07equals zero.

2:09With that choice of lambda, there is no regularization, and so we're just fitting a fourth-order polynomial

2:15with no regularization, and you end up with that curve that you saw previously that overfits

2:23the data.

2:25What we saw previously was when you have a model like this, jtrain is small, but jcv

2:31is much larger than jtrain, or jcv is large, and so this indicates we have high variance,

2:38and it overfits this data.

2:42It would be if you have some intermediate value of lambda, not really large to 10,000,

2:47but not so small as zero, that hopefully you get a model that looks like this, that is

2:53just right and fits the data well with small jtrain and small jcv.

3:00So if you are trying to decide what is a good value of lambda to use for the regularization

3:06parameter, cross-validation gives you a way to do so as well.

3:12Let's take a look at how we could do so, and just as a reminder, the problem we're addressing

3:17is if you're fitting a fourth-order polynomial, so that's the model, and you're using regularization,

3:23how can you choose a good value of lambda?

3:26This would be a procedure similar to what you have seen for choosing the degree of polynomial

3:31d using cross-validation.

3:34Specifically, let's say we try to fit a model using lambda equals zero, and so we would

3:41minimize the cross-function using lambda equals zero, and end up with some parameters w1,

3:49b1, and you can then compute the cross-validation error, jcv of w1, b1.

3:57And now let's try a different value of lambda, let's say you try lambda equals 0.01, then

4:02again, minimizing the cross-function gives you a second set of parameters, w2, b2, and

4:09you can also see how well that does on the cross-validation set, and so on.

4:14And let's keep trying other values of lambda, and in this example, I'm going to try doubling

4:20it to lambda equals 0.02, and so that would give you jcv of w3, b3, and so on.

4:28And let's double it again and double it again, after doubling a number of times, you end

4:32up with lambda approximately equal to 10, and that would give you parameters w12, b12,

4:40and jcv w12, b12.

4:44And by trying out a large range of possible values for lambda, fitting parameters using

4:49those different regularization parameters, and then evaluating the performance on the

4:54cross-validation set, you can then try to pick what is the best value for the regularization

4:59parameter.

5:00Now quickly, if in this example, you find that jcv of w5, b5, has the lowest value of

5:10all of these different cross-validation errors, you might then decide to pick this value for

5:16lambda, and so use w5, b5 as the chosen parameters.

5:22And finally, if you want to report out an estimate of the generalization error, you

5:27would then report out the test set error, jtest of w5, b5.

5:34To further hone intuition about what this algorithm is doing, let's take a look at how

5:38training error and cross-validation error vary as a function of the parameter lambda.

5:45So in this figure, I've changed the x-axis again.

5:48Notice that the x-axis here is annotated with the value of the regularization parameter

5:54lambda.

5:57And if we look at the extreme of lambda equals 0, here on the left, that corresponds to not

6:05using any regularization.

6:07And so that's where we wind up with this very wiggly curve, if lambda was small or it was

6:12even 0.

6:14And in that case, we have a high variance model, and so jtrain is going to be small,

6:22and jcv is going to be large, because it does great on the training data, but does much

6:27worse on the cross-validation data.

6:31This extreme on the right, with very large values of lambda, say lambda equals 10,000,

6:37ends up with fitting a model that looks like that.

6:40So this has high bias, it underfits the data, and it turns out jtrain will be high and jcv

6:48will be high as well.

6:50And in fact, if you were to look at how jtrain varies as a function of lambda, you find that

6:57jtrain will go up like this.

7:01Because in the optimization cost function, the larger lambda is, the more the algorithm

7:06is trying to keep w squared small, that is, the more weight it's giving to this regularization

7:11term, and thus the less attention it's paying to actually doing well on the training set.

7:17Remember, this term on the left is jtrain, so the more it's trying to keep the parameters

7:21small, the less good a job it does on minimizing the training error.

7:26So that's why as lambda increases, the training error jtrain will tend to increase like so.

7:33Now how about the cross-validation error?

7:36Turns out the cross-validation error will look like this.

7:41Because we've seen that if lambda is too small or too large, then it doesn't do well on the

7:46cross-validation set.

7:48It either overfits here on the left or underfits here on the right, and there'll be some intermediate

7:55value of lambda that causes the algorithm to perform best.

8:01And what cross-validation is doing is trying out a lot of different values of lambda.

8:07This is what we saw on the last slide.

8:09Try out lambda equals zero, lambda equals 0.01, lambda equals 0.02.

8:13Try a lot of different values of lambda and evaluate the cross-validation error at a lot

8:18of these different points, and then hopefully pick a value that has low cross-validation

8:25error, and this will hopefully correspond to a good model for your application.

8:32If you compare this diagram to the one that we had in the previous video, where the horizontal

8:38axis was the degree of polynomial, these two diagrams look a little bit, not mathematically

8:44and not in any formal way, but they look a little bit like mirror images of each other.

8:50And that's because when you're fitting a degree of polynomial, the left part of this

8:56curve corresponded to underfitting and high bias, the right part corresponded to overfitting

9:02and high variance, whereas in this one, high variance was on the left and high bias was

9:09on the right.

9:10But that's why these two images are a little bit like mirror images of each other.

9:14But in both cases, cross-validation, evaluating different values, can help you choose a good

9:20value of T or a good value of lambda.

9:23So that's how the choice of regularization parameter lambda affects the bias and variance

9:28and overall performance of your algorithm.

9:31And you've also seen how you can use cross-validation to make a good choice for the regularization

9:36parameter lambda.

9:38Now so far, we've talked about how having a high training set error, high J train, is

9:44indicative of high bias, and how having a high cross-validation error, J cv, specifically

9:51if it's much higher than J train, how that's indicative of a variance problem.

9:57But what do these words high or much higher actually mean?

10:01Let's take a look at that in the next video, where we'll look at how you can look at the

10:05numbers J train and J cv and judge if it's high or low.

10:10And it turns out that one further refinement of these ideas, that is establishing a baseline

10:15level performance through a learning algorithm, will make it much easier for you to look at

10:18these numbers, J train, J cv, and judge if they're high or low.

10:23Let's take a look at what all this means in the next video.

---

0:02Let's look at some concrete numbers for what JTRAIN and JCV might be and see how you

0:07can judge if a learning algorithm has high bias or high variance.

0:12And for the examples in this video, I'm going to use as a running example the application

0:17of speech recognition, which is something I've worked on multiple times over the years.

0:21Let's take a look.

0:23A lot of users doing web search on a mobile phone will use speech recognition rather than

0:29type on the tiny keyboards on our phones, because speaking to our phone is often faster

0:34than typing.

0:36And so typical audio that a web search engine would get would be like this.

0:42What is today's weather?

0:44Or like this.

0:45Coffee shops near me.

0:47And it's the job of the speech recognition algorithm to output the transcripts, what

0:51is today's weather or coffee shops near me.

0:54Now, if you were to train a speech recognition system and measure the training error, and

1:01the training error means what's the percentage of audio clips in your training set that the

1:06algorithm does not transcribe correctly in its entirety.

1:10Let's say the training error for this data set is 10.8%, meaning that it transcribes

1:17it perfectly for 89.2% of your training set, but makes some mistake in 10.8% of your training

1:25set.

1:26And if you were to also measure your speech recognition algorithm's performance on a separate

1:31cross-validation set, let's say it gets 14.8% error.

1:37So if you were to look at these numbers, it looks like the training error is really high,

1:43you got 10% wrong, and then the cross-validation error is higher, but getting 10% of even your

1:49training set wrong, that seems pretty high.

1:52And it seems like that 10% error would lead you to conclude it has to have high bias,

1:57because it's not doing well on your training set.

1:59But it turns out that when analyzing speech recognition, it's useful to also measure one

2:05other thing, which is what is the human level of performance.

2:10In other words, how well can even humans transcribe speech accurately from these audio

2:15clips.

2:16And concretely, let's say that you measure how well fluent speakers can transcribe audio

2:24clips, and you find that human level performance achieves 10.6% error.

2:30Why is human level error so high?

2:34It turns out that for web search, there are a lot of audio clips that sound like this.

2:39I'm going to navigate to somewhere on the...

2:43And there's a lot of noisy audio where really no one can accurately transcribe what was

2:48said because of the noise in the audio.

2:51And if even a human makes 10.6% error, then it seems difficult to expect a learning algorithm

2:59to do much better.

3:00And so in order to judge if the training error is high, it turns out to be more useful to

3:06see if the training error is much higher than a human level of performance.

3:12And in this example, it does just 0.2% worse than humans.

3:17Given that humans are actually really good at recognizing speech, I think if I can build

3:20a speech recognition system that achieves 10.6% error matching human performance, I'd

3:25be pretty happy.

3:26So it's just doing a little bit worse than humans.

3:29But in contrast, the gap or the difference between JCV and JTrain is much larger.

3:36There's actually a 4% gap there.

3:39So whereas previously we had said maybe 10.8% error means this is high bias, when we benchmark

3:47it to human level performance, we see that the algorithm is actually doing quite well

3:52in the training set.

3:53But the bigger problem is the cross-validation error is much higher than the training error,

4:00which is why I would conclude that this algorithm actually has more of a variance problem than

4:05a bias problem.

4:07So it turns out when judging if the training error is high, it's often useful to establish

4:16a baseline level of performance.

4:18And by baseline level of performance, I mean, what is the level of error you can reasonably

4:23hope your learning algorithm to eventually get to?

4:28And one common way to establish a baseline level of performance is to measure how well

4:33humans can do on this task.

4:36Because humans are really good at understanding speech data or processing images or understanding

4:41text.

4:42Human level performance is often a good benchmark when you are using unstructured data such

4:48as audio, images, or text.

4:51Another way to estimate a baseline level of performance is if there's some competing algorithm,

4:56maybe a previous implementation that someone else implemented, or even a competitor's algorithm

5:03to establish a baseline level of performance, if you can measure that.

5:08Or sometimes you might guess based on prior experience.

5:12And if you have access to this baseline level of performance, that is, what is the level

5:18of error you can reasonably hope to get to, or what is the design level of performance

5:22that you want your algorithm to get to, then when judging if an algorithm has high bias

5:28or variance, you would look at the baseline level of performance, and the training error,

5:34and the cross-validation error.

5:36And the two key quantities to measure are then, what is the difference between training

5:42error and the baseline level that you hope to get to?

5:46So this is 0.2, and if this is large, then you would say you have a high bias problem,

5:52and you would then also look at this gap between your training error and your cross-validation

5:58error.

5:59And if this is high, then you would conclude you have a high variance problem.

6:03And that's why in this example, we concluded we have a high variance problem.

6:08Whereas, let's look at the second example.

6:12If the baseline level of performance, that is human level performance, and training error

6:16and cross-validation error look like this, then this first gap is 4.4%, and so there's

6:24actually a big gap.

6:25The training error is much higher than what humans can do and what we hope to get to,

6:30whereas the cross-validation error is just a little bit bigger than the training error.

6:34And so if your training error and cross-validation error look like this, I would say this algorithm

6:39has high bias.

6:42And so by looking at these numbers, training error and cross-validation error, you can

6:47get a sense, intuitively or informally, of the degree to which your algorithm has a high

6:52bias or high variance problem.

6:55And so just to summarize, this gap between these first two numbers gives you a sense

7:01of whether you have a high bias problem, and the gap between these two numbers gives you

7:07a sense of whether you have a high variance problem.

7:11And sometimes the baseline level of performance could be 0%.

7:14If your goal is to achieve perfect performance, then the baseline level of performance could

7:18be 0%.

7:20But for some applications, like the speech recognition application, where some audio

7:24is just noisy, then the baseline level of performance could be much higher than 0%.

7:28And the method described on this slide will give you a better read in terms of whether

7:33your algorithm suffers from bias or variance.

7:36And by the way, it is possible for your algorithm to have high bias and high variance.

7:41So concretely, if you get numbers like these, then the gap between the baseline and the

7:48training error is large, that would be a 4.4%.

7:53And the gap between training error and cross-validation error is also large.

7:57This is 4.7%.

7:58If it looks like this, you would conclude that your algorithm has high bias and high

8:03variance, although hopefully this won't happen that often for your learning applications.

8:09So to summarize, we're seeing that looking at whether your training error is large is

8:13a way to tell if your algorithm has high bias.

8:17But on applications where the data is sometimes just noisy and it's infeasible or unrealistic

8:23to ever expect to get to zero error, then it's useful to establish this baseline level

8:28of performance so that rather than just asking, is my training error large?

8:32You can ask, is my training error large relative to what I hope I can get to eventually, such

8:38as is my training error large relative to what humans can do on a task?

8:42And that gives you a more accurate read on how far away you are in terms of the training

8:47error from where you hope to get to.

8:50And then similarly, looking at whether your cross-validation error is much larger than

8:53your training error gives you a sense of whether or not your algorithm may have a high variance

8:58problem as well.

9:00And in practice, this is how I often will look at these numbers to judge if my learning

9:04algorithm has a high bias or high variance problem.

9:08Now to further hone our intuition about how a learning algorithm is doing, there's one

9:13other thing that I found useful to think about, which is the learning curve.

9:19Let's take a look at what that means in the next video.

---
0:01Learning curves are a way to help understand how your learning algorithm is doing as a function of the amount of experience it has,

0:09where by experience I mean, for example, the number of training examples it has.

0:14Let's take a look.

0:15Let me plot learning curves for a model that fits a second-order polynomial quadratic function like so,

0:22and I'm going to plot both Jcv, the cross-validation error, as well as Jtrain, the training error.

0:29So on this figure, the horizontal axis is going to be m, train, that is, the training set size,

0:38or the number of examples that the algorithm can learn from, and on the vertical axis I'm going to plot the error,

0:44and by error I mean either Jcv or Jtrain.

0:47So let's start by plotting the cross-validation error.

0:51It will look something like this.

0:53So that's what Jcv of WB will look like.

0:58And it's maybe no surprise that as m, train, the training set size gets bigger,

1:03then you learn a better model, and so the cross-validation error goes down.

1:08Now let's plot Jtrain of WB, of what the training error looks like as the training set size gets bigger.

1:17It turns out that the training error will actually look like this,

1:22that as the training set size gets bigger, the training set error actually increases.

1:28Let's take a look at why this is the case.

1:30We'll start with an example of when you have just a single training example.

1:35Well, if you were to fit a quadratic model to this, you can fit easily a straight line or a curve,

1:41and your training error will be zero.

1:43How about if you have two training examples like this?

1:46Well, you can again fit a straight line and achieve zero training error.

1:51In fact, if you have three training examples,

1:54the quadratic function can still fit this very well and get pretty much zero training error.

1:59But now, if your training set gets a little bit bigger, say you have four training examples,

2:04then it gets a little bit harder to fit all four examples perfectly,

2:09and you may get a curve that looks like this, fits it pretty well,

2:12but a little bit off in a few places here and there.

2:15And so when you have increased the training set size to four,

2:20the training error has actually gone up a little bit.

2:24How about when you have five training examples?

2:26Well, again, you can fit it pretty well, but it gets even a little bit harder to fit all of them perfectly,

2:32and when you have an even larger training set,

2:34it just gets harder and harder to fit every single one of your training examples perfectly.

2:40So to recap, when you have a very small number of training examples,

2:43like one or two or even three, it's relatively easy to get zero or very small training error.

2:51But when you have a larger training set,

2:54it's harder for a quadratic function to fit all the training examples perfectly,

2:59which is why as the training set gets bigger, the training error increases,

3:05because it's harder to fit all of the training examples perfectly.

3:09Notice one other thing about these curves,

3:11which is the cross-validation error will be typically higher than the training error,

3:18because you fit the parameters to the training set,

3:21and so you expect to do at least a little bit better, or when m is small,

3:25maybe even a lot better on the training set than on the cross-validation set.

3:31Let's now take a look at what the learning curves will look like for an algorithm with high bias

3:37versus one with high variance.

3:39Let's start with the high bias or the underfitting case.

3:43Recall that an example of high bias would be if you're fitting a linear function to a curve that looks like this.

3:50If you were to plot the training error, then the training error will go up like so, as you'd expect.

3:58And in fact, this curve of training error may start to flatten out,

4:03or we call it plateau, meaning flatten out after a while.

4:08And that's because as you get more and more training examples,

4:12when you're fitting this simple linear function, your model doesn't actually change that much more.

4:18It's fitting a straight line, and even as you get more and more and more examples,

4:22there's just not that much more to change, which is why the average training error flattens out after a while.

4:29And similarly, your cross-validation error will come down and also flatten out after a while,

4:36which is why JCV, again, is higher than J-train, but JCV will tend to look like that.

4:43And it's because beyond a certain point, even as you get more and more and more examples,

4:48not much is going to change about the straight line you're fitting.

4:51It's just too simple a model to be fitting to this much data,

4:56which is why both of these curves, JCV and J-train, tend to flatten out after a while.

5:01And if you have a measure of that baseline level of performance, such as human-level performance,

5:09then it'll tend to be a value that is lower than your J-train and your JCV.

5:15So human-level performance may look like this,

5:18and there's a big gap between the baseline level of performance and J-train,

5:23which was our indicator for this algorithm having high bias.

5:28That is, one could hope to be doing much better

5:32if only we could fit a more complex function than just a straight line.

5:37Now, one interesting thing about this plot is you can ask,

5:43what do you think will happen if you could have a much bigger training set?

5:49So what would it look like if we could increase M even further than the right of this plot,

5:55and go further to the right, as follows?

5:58Well, you can imagine, if you were to extend both of these curves to the right,

6:02they'd both sort of flatten out, and both of them will probably just continue to be flat like that.

6:08And no matter how far you extend to the right of this plot,

6:11these two curves, they will never somehow find a way to dip down to this human-level performance

6:17or just keep on being kind of flat like this pretty much forever,

6:22no matter how large the training set gets.

6:25So that gives this conclusion, maybe a little bit surprising,

6:29that if a learning algorithm has high bias, getting more training data will not, by itself, help that much.

6:37And I know that we're used to thinking that having more data is good,

6:42but if your algorithm has high bias, then if the only thing you do is throw more training data at it,

6:49that, by itself, will not ever let you bring down the error rate that much.

6:53And it's because of this, really.

6:55No matter how many more examples you add to this figure,

6:57the straight linear fitting just isn't going to get that much better.

7:02And that's why, before investing a lot of effort into collecting more training data,

7:07it's worth checking if your learning algorithm has high bias,

7:10because if it does, then you probably need to do some other things,

7:14other than just throw more training data at it.

7:17Let's now take a look at what the learning curve looks like for a learning algorithm with high variance.

7:23You might remember that if you were to fit a 4-fold polynomial with small lambda,

7:29say, or even lambda equals zero, then you get a curve that looks like this.

7:33And even though it fits the training data very well, it doesn't generalize.

7:39Let's now look at what a learning curve might look like in this high variance scenario.

7:45J-train will be going up as the training set size increases, so you get a curve that looks like this.

7:53And J-CV will be much higher.

7:56So your cross-validation error is much higher than your training error.

8:00And the fact that there's a huge gap here is what can tell you that there's high variance.

8:06It's doing much better on the training set than it's doing on your cross-validation set.

8:11If you were to plot a baseline level of performance, such as human-level performance,

8:16you may find that it turns out to be here, that J-train can sometimes be even lower than the human-level performance,

8:24or maybe human-level performance is a little bit lower than this.

8:27But when you're overfitting the training set, you may be able to fit the training set so well

8:33to have an unrealistically low error, such as zero error in this example over here,

8:38which is actually better than how well humans would actually be able to predict housing prices

8:44or whatever the application you're working on.

8:46But again, the signal for high variance is whether J-CV is much higher than J-train.

8:52And when you have high variance, then increasing the training set size could help a lot.

8:59And in particular, if we could extrapolate these curves to the right, increase M-train,

9:04then the training error will continue to go up, but then the cross-validation error hopefully will come down

9:13and approach J-train.

9:15And so in this scenario, it might be possible just by increasing the training set size

9:22to lower the cross-validation error and to get your algorithm to perform better and better.

9:28And this is unlike the high bias case where if the only thing you do is get more training data,

9:34that won't actually help your learning algorithm's performance much.

9:37So to summarize, if a learning algorithm suffers from high variance,

9:42then getting more training data is indeed likely to help.

9:47Because extrapolating to the right of this curve, you see that you can expect J-CV to keep on coming down.

9:53And in this example, just by getting more training data allows the algorithm to go from this relatively high cross-validation error

10:00to get much closer to human-level performance.

10:04You can see that if you were to add a lot more training examples and continue to fit a 4-fold polynomial,

10:10then you can just get a better 4-fold polynomial fit to this data than this very weakly curve up on top.

10:18So if you're building a machine learning application, you could plot the learning curve if you want.

10:24That is, you can take different subsets of your training set.

10:27And even if you have, say, 1,000 training examples, you could train a model on just 100 training examples

10:33and look at the training error and the cross-validation error.

10:36Then train a model on 200 examples, holding out 800 examples and just not using them for now,

10:42and plot J-train and J-CV and so on and repeat and plot out what the learning curve looks like.

10:49And if you were to visualize it that way, then that could be another way for you to see

10:54if your learning curve looks more like a high-bias or high-variance one.

10:58One downside of plotting learning curves like this is something I've done,

11:01but one downside is it is computationally quite expensive to train so many different models

11:07using different size subsets of your training set.

11:10So in practice, it isn't done that often.

11:13But nonetheless, I find that having this mental visual picture in my head of what the training set looks like,

11:19sometimes that helps me to think through what I think my learning algorithm is doing

11:24and whether it has high-bias or high-variance.

11:27So I know we've gone through a lot about bias and variance.

11:31Let's go back to our earlier example of if you've trained a model for housing price prediction,

11:37how does bias and variance help you decide what to do next?

11:41Let's go back to that earlier example, which I hope will now make a lot more sense to you.

11:45Let's do that in the next video.

---

0:02You've seen how by looking at Jtrain and Jcv, that is the training error and the cross-validation

0:08error, or maybe even plotting a learning curve, you can try to get a sense of whether your

0:14learning algorithm has high bias or high variance.

0:17This is a procedure I routinely do when I'm training a learning algorithm.

0:21I'll often look at the training error and the cross-validation error to try to decide

0:25if my algorithm has high bias or high variance.

0:28It turns out this will help you make better decisions about what to try next in order

0:32to improve the performance of your learning algorithm.

0:35Let's look at an example.

0:38This is actually the example that you had seen earlier.

0:41If you've implemented regularized linear regression on predicting housing prices, but your algorithm

0:48makes unacceptably large errors in its predictions, what do you try next?

0:53And these are the six ideas that we had when we had looked over this slide earlier.

0:57We looked at more training examples, tried a smaller set of features, additional features,

1:01and so on.

1:02It turns out that each of these six items either helps fix a high variance or a high

1:09bias problem.

1:11And in particular, if your learning algorithm has high bias, three of these techniques will

1:17be useful.

1:18If your learning algorithm has high variance, then a different three of these techniques

1:23will be useful.

1:24Let's see if we can figure out which is which.

1:27First, one is get more training examples.

1:31We saw in the last video that if your algorithm has high bias, then if the only thing we do

1:37is get more training data, that by itself probably won't help that much.

1:43But in contrast, if your algorithm had high variance, say it was overfitting to a very

1:49small training set, then getting more training examples will help a lot.

1:55So this first option of getting more training examples helps to fix a high variance problem.

2:02How about the other five?

2:04Do you think you can figure out which of the remaining five fix high bias or high variance

2:09problems?

2:10I'm going to go through the rest of them in this video in a minute, but if you want,

2:13feel free to pause the video and see if you can think through these five other things

2:18by yourself.

2:18So feel free to pause the video.

2:22Just kidding, that was me pausing, not your video pausing.

2:25But seriously, if you want, go ahead and pause the video and think through it if you want

2:29or not, and we'll go over these with you in a minute.

2:32How about trying a smaller set of features?

2:36Sometimes if your learning algorithm has too many features, then it gives the algorithm

2:42too much flexibility to fit very complicated models.

2:46This is a little bit like if you had x, x squared, x cubed, x to the fourth, x to the

2:52fifth, and so on.

2:54And if only you were to eliminate a few of these, then your model won't be so complex

3:00and won't have such high variance.

3:03So if you suspect that your algorithm has a lot of features that are not actually relevant

3:09or helpful to predicting a housing price, or if you suspect that you had even somewhat

3:15redundant features, then eliminating or reducing the number of features will help reduce the

3:22flexibility of your algorithm to overfit the data.

3:26And so this is a tactic that will help you to fix high variance.

3:30Conversely, getting additional features, that's just adding additional features, is kind of

3:34the opposite of going to a smaller set of features.

3:38This will help you to fix a high bias problem.

3:42As a concrete example, if you were trying to predict the price of a house just based

3:46on the size, but it turns out that the price of a house also really depends on the number

3:52of bedrooms and on the number of floors and on the age of a house, then the algorithm

3:58will never do that well unless you add in those additional features.

4:01So that's a high bias problem because you just can't do that well on the training set

4:07when you know only the size.

4:09It's only when you tell the algorithm how many bedrooms are there, how many floors are

4:14there, what's the age of the house, that it finally has enough information to even do

4:17better on the training set.

4:20And so adding additional features is a way to fix a high bias problem.

4:26Adding polynomial features is a little bit like adding additional features.

4:30So if your linear function, straight line, can't fit the training set that well, then

4:36adding additional polynomial features could help you do better on the training set.

4:40And helping you do better on the training set is a way to fix a high bias problem.

4:46And then decreasing lambda means to use a lower value for the regularization parameter.

4:54And that means we're going to pay less attention to this term and pay more attention to this

4:58term to try to do better on the training set.

5:01And again, that helps you to fix a high bias problem.

5:05And finally, increasing lambda, well, that's the opposite of this.

5:09But that says you're overfitting the data.

5:12And so increasing lambda would make sense if it's overfitting the training set, just

5:17putting too much attention to fitting the training set, but at the expense of generalizing

5:22to new examples.

5:24And so increasing lambda would force the algorithm to fit a smoother function, maybe a less wiggly

5:30function, and use this to fix a high variance problem.

5:35So I realize that this was a lot of stuff on this slide, but the takeaways I hope you

5:41have are, if you find that your algorithm has high variance, then the two main ways

5:46to fix that are either get more training data or simplify your model.

5:53And by simplify model, I mean either get a smaller set of features or increase the

6:00regularization parameter lambda so your algorithm has less flexibility to fit very complex,

6:05very wiggly curves.

6:08Conversely, if your algorithm has high bias, then that means it's not doing well, even

6:14on the training set.

6:16So if that's the case, the main fixes are to make your model more powerful, to give

6:21it more flexibility, to fit more complex or more wiggly functions.

6:26And so some ways to do that are to give it additional features or add these polynomial

6:31features or to decrease the regularization parameter lambda.

6:36By the way, in case you're wondering if you should fix high bias by reducing the training

6:42set size, that doesn't actually help.

6:44If you reduce the training set size, you will fit the training set better, but that tends

6:48to worsen your cross-validation error and the performance of your learning algorithm.

6:52So don't randomly throw away training examples.

6:55Just to try to fix a high bias problem.

6:57One of my PhD students from Stanford, many years after he'd already graduated from Stanford,

7:02once said to me that while he was studying at Stanford, he learned about bias-invariance

7:08and felt like he got it, he understood it.

7:11But that subsequently, after many years of work experience in a few different companies,

7:16he realized that bias-invariance is one of those concepts that takes a short time to

7:21learn but takes a lifetime to master.

7:24Those were his exact words.

7:26And I think bias-invariance, it is one of those very powerful ideas.

7:31When I'm training learning algorithms, I almost always try to figure out if it is

7:36high bias or high variance.

7:38But the way you go about addressing it systematically is something that I think you will keep on

7:44getting better at through repeated practice.

7:48But you'll find, I think, that understanding these ideas will help you be much more effective

7:53at how you decide what to try next when developing a learning algorithm.

7:59Now, I know that we did go through a lot in this video.

8:03And if you feel like, boy, there's just a lot of stuff here, it's okay, don't worry

8:06about it.

8:07Later this week, in the practice labs and practice quizzes, we'll have also additional

8:12opportunities to go over these ideas so you can get additional practice with thinking

8:17about bias-invariance of different learning algorithms.

8:21So if it seems like a lot right now, it's okay.

8:24You get to practice these ideas later this week and hopefully deepen your understanding

8:28of them at that time.

8:31Before moving on, bias-invariance also are very useful when thinking about how to train

8:37a neural network.

8:39So in the next video, let's take a look at these concepts applied to neural network

8:43training.

8:44Let's go on to the next video.

---

0:01We're seeing that high bias or high variance are both bad,

0:05in the sense that they hurt the performance of your algorithm.

0:08One of the reasons that neural networks have been so successful

0:12is because neural networks, together with the idea of big data,

0:16or hopefully having large data sets,

0:18has given us new ways to address both high bias and high variance.

0:24Let's take a look.

0:25You saw that if you're fitting different order polynomials to a data set,

0:31then if you were to fit a linear model like this on the left,

0:36you have a pretty simple model that can have high bias,

0:39whereas if you were to fit a complex model,

0:42then you might suffer from high variance,

0:45and there's this trade-off between bias and variance.

0:50In our example, it was choosing a second-order polynomial

0:54that helps you make a trade-off and pick a model

0:58with the lowest possible cross-validation error.

1:02Before the days of neural networks,

1:05machine learning engineers talked a lot about this bias-variance trade-off,

1:10in which you had to balance the complexity,

1:13that is, the degree of polynomial or the regularization parameter lambda,

1:18to make bias and variance both not be too high.

1:23If you hear machine learning engineers talk about the bias-variance trade-off,

1:28this is what they're referring to,

1:30where if you have too simple a model, you have high bias,

1:33too complex a model, high variance,

1:35and you have to find a trade-off between these two bad things

1:38to find hopefully the best possible outcome.

1:42But it turns out that neural networks offer us a way out of this dilemma

1:47of having a trade-off bias and variance, with some caveats.

1:51It turns out that large neural networks,

1:55when trained on small-to-moderate-sized datasets,

1:59are low-bias machines.

2:01What I mean by that is if you make your neural network large enough,

2:07you can almost always fit your training set well,

2:11so long as your training set is not enormous.

2:13What this means is this gives us a new recipe

2:16to try to reduce bias or reduce variance as needed,

2:21without needing to really trade-off between the two of them.

2:24Let me share with you a simple recipe that isn't always applicable,

2:28but if it applies, can be very powerful

2:31for getting an accurate model using a neural network,

2:36which is first train your algorithm on your training set,

2:41and then ask, does it do well on the training set?

2:44You measure J-train and see if it is high.

2:48By high, I mean, for example, relative to human-level performance

2:53or some baseline-level performance.

2:56If it is not doing well, then you have a high-bias problem,

3:01high training set error.

3:03One way to reduce bias is to just use a bigger neural network.

3:08By bigger neural network, I mean either more hidden layers

3:12or more hidden units per layer,

3:14and you can then keep on going through this loop

3:17and make your neural network bigger and bigger

3:20until it does well on the training set,

3:22meaning it achieves a level of error on your training set

3:25that is roughly comparable to the target level of error you hope to get to,

3:31which could be human-level performance.

3:34After it does well on the training set,

3:36so the answer to that question is yes,

3:38you would then ask, does it do well on the cross-validation set?

3:42In other words, does it have high variance?

3:46If the answer is no,

3:48then you can conclude that the algorithm has high variance

3:51because it does well on the training set,

3:53does not do well on the cross-validation set,

3:55so that big gap in J-CV and J-train

3:59indicates you probably have a high-variance problem.

4:02If you have a high-variance problem,

4:05then one way to try to fix it is to get more data.

4:08So you get more data and go back and retrain the model

4:12and just double-check, does it do well on the training set?

4:14If not, have a bigger network, or if it does,

4:17see if it does well on the cross-validation set,

4:19and if not, get more data.

4:21If you can keep on going round and round and round this loop

4:24until eventually it does well on the cross-validation set,

4:28then you're probably done

4:30because now you have a model that does well on the cross-validation set

4:34and hopefully will also generalize to new examples as well.

4:38Now, of course, there are limitations to the application of this recipe.

4:43Training a bigger neural network does reduce bias,

4:46but at some point it does get computationally expensive.

4:49That's why the rise of neural networks has been really assisted

4:53by the rise of very fast computers,

4:56including especially GPUs or graphics processor units,

5:01hardware traditionally used to speed up computer graphics,

5:04but that turns out has been very useful for speeding up neural networks as well.

5:08But even with hardware accelerators, beyond a certain point,

5:12the neural networks are so large and take so long to train,

5:14it becomes infeasible.

5:16And then, of course, the other limitation is more data.

5:20Sometimes you can only get so much data,

5:23and beyond a certain point, it's hard to get much more data.

5:27But I think this recipe explains a lot of the rise of deep learning

5:31in the last several years,

5:34which is for applications where you do have access to a lot of data,

5:38then being able to train large neural networks

5:41allows you to eventually get pretty good performance on a lot of applications.

5:47One thing that was implicit in this slide that may not have been obvious

5:52is that as you're developing a learning algorithm,

5:55sometimes you find that you have high bias,

5:58in which case you do things like increase the neural network.

6:01But then after you increase the neural network,

6:03you may find that you have high variance,

6:05in which case you might do other things like collect more data.

6:09And during the hours or days or weeks you're developing a machine learning algorithm,

6:15at different points you may have high bias or high variance, and it can change.

6:19But it's depending on whether your algorithm has high bias or high variance at that time

6:24that that can help give guidance for what you should be trying next.

6:28When you're training a neural network,

6:31one thing that people have asked me before is,

6:34hey, Andrew, what if my neural network is too big?

6:37Will that create a high variance problem?

6:41It turns out that a large neural network with well-chosen regularization

6:47will usually do as well or better than a smaller one.

6:52For example, if you have a small neural network like this,

6:57and you were to switch to a much larger neural network like this,

7:02you would think that the risk of overfitting goes up significantly.

7:06But it turns out that if you were to regularize this larger neural network appropriately,

7:12then this larger neural network usually will do at least as well or better than the smaller one,

7:19so long as the regularization is chosen appropriately.

7:22Another way of saying this is that it almost never hurts to go to a larger neural network

7:28so long as you regularize appropriately.

7:31We have one caveat, which is that when you train a larger neural network,

7:35it does become more computationally expensive.

7:38The main way it hurts is it will slow down your training and your inference process.

7:43Very briefly, to regularize a neural network, this is what you do.

7:49If the cost function for your neural network is the average loss,

7:54and so the loss here could be squared error or logistic loss,

7:59then the regularization term for a neural network looks like pretty much what you expect,

8:04which is lambda over 2m times the sum of w squared,

8:09where this is the sum over all weights w in the neural network.

8:14Similar to regularization for linear regression and logistic regression,

8:18we usually don't regularize the parenthesis b in a neural network,

8:22although in practice it makes very little difference whether you do so or not.

8:26The way you would implement regularization in TensorFlow is,

8:31recall that this was the code for implementing

8:34an unregularized handwritten digit classification model.

8:38We create three layers like so with number of hidden units, activation,

8:43and then create a sequential model with the three layers.

8:47If you want to add regularization, then you would just add this extra term,

8:53kernel regularizer equals L2 and then 0.01,

8:57where that's the value of lambda.

9:00TensorFlow actually lets you choose different values of lambda for different layers,

9:05although for simplicity, you can choose the same value of lambda

9:09for all the weights in all of the different layers as follows,

9:12and then this will allow you to implement regularization in your neural network.

9:17To summarize, two takeaways I hope you have from this video are,

9:22one, it hardly ever hurts to have a larger neural network

9:26so long as you regularize appropriately.

9:29One caveat being that having a larger neural network can slow down your algorithm,

9:34so maybe that's the one way it hurts,

9:36but it shouldn't hurt your algorithm's performance for the most part.

9:39In fact, it could even help it significantly.

9:42Second, so long as your training set isn't too large,

9:47then a neural network, especially a large neural network,

9:50is often a low-bias machine.

9:52It just fits very complicated functions very well,

9:55which is why when I'm training neural networks,

9:58I find that I'm often fighting variance problems rather than bias problems,

10:02at least if the neural network is large enough.

10:05So the rise of deep learning has really changed the way that

10:08machine learning practitioners think about bias and variance.

10:11Having said that, even when you're training a neural network,

10:14measuring bias and variance and using that to guide what you do next

10:19is often a very helpful thing to do.

10:22So that's it for bias and variance.

10:25Let's go on to the next video where we'll take all the ideas we've learned

10:29and see how they fit in to the development process of machine learning systems.

10:34I hope that will tie a lot of these pieces together

10:37to give you practical advice on how to quickly move forward

10:41into development of your machine learning systems.