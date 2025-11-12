0:02Hi and welcome back. By now, you've seen a lot of different learning algorithms, including

0:07linear regression, logistic regression, even deep learning or neural networks. And next

0:12week you'll see decision trees as well. So you now have a lot of powerful tools of machine

0:18learning, but how do you use these tools effectively? I've seen teams sometimes take six months

0:24to build a machine learning system that I think a more skilled team could have taken

0:29or done in just a couple of weeks. And the efficiency of how quickly you can get a machine

0:34learning system to work well will depend a large part on how well you can repeatedly

0:39make good decisions about what to do next in the course of a machine learning project.

0:44So in this week, I hope to share with you a number of tips on how to make decisions

0:48about what to do next in a machine learning project that I hope will end up saving you

0:52a lot of time. So let's take a look at some advice on how to build machine learning systems.

0:59Let's start with an example. Say you've implemented regularized linear regression to predict

1:04housing prices. So you have the usual cost function for your learning algorithm, squared

1:11error plus regularization term. But if you've trained the model and find that it makes unacceptably

1:17large errors in its predictions, what do you try next? When you're building a machine learning

1:22algorithm, there are usually a lot of different things you could try. For example, you could

1:26decide to get more training examples since it seems like having more data should help.

1:32Or maybe you think maybe you have too many features. You could try a smaller set of features.

1:37Or maybe you want to get additional features, such as find additional properties of the

1:42houses to toss into your data. And maybe that will help you to do better. Or you might take

1:48the existing features, x1, x2, and so on, and try adding polynomial features like x1

1:53squared, x2 squared, x1, x2, and so on. Or you might wonder if the value of lambda is

1:59chosen well, and you might say, hmm, maybe it's too big. I want to decrease it. Or you

2:02may say, oh, maybe it's too small. I want to try increasing it. So on any given machine

2:08learning application, it will often turn out that some of these things could be fruitful,

2:14and some of these things not fruitful. And a key to being effective at how you build

2:19a machine learning algorithm will be if you can find a way to make good choices about

2:24where to invest your time. For example, I have seen teams spend literally many, many

2:29months collecting more training examples, thinking that more training data has got to

2:35help. But it turns out sometimes it helps a lot, and sometimes it doesn't. So in this

2:40week, you learn about how to carry out a set of diagnostics. And by diagnostic, I mean

2:47a test that you can run to gain insight into what is or isn't working with a learning

2:52algorithm, to gain guidance into improving its performance. And some of these diagnostics

2:57will tell you things like, is it worth weeks or even months collecting more training data?

3:02Because if it is, then you can then go ahead and make the investment to get more data,

3:06which will hopefully lead to improved performance. Or if it isn't, then running that diagnostic

3:12could have saved you months of time. And one thing you see this week as well is that diagnostics

3:19can take time to implement, but running them can be a very good use of your time. So this

3:26week, we'll spend a lot of time talking about different diagnostics you can use to give

3:30you guidance on how to improve your learning algorithm's performance. But first, let's

3:35take a look at how to evaluate the performance of your learning algorithm. Let's go do that

3:39in the next video.

---
0:01Let's say you've trained a machine learning model.

0:04How do you evaluate that model's performance?

0:06You'll find that having a systematic way to evaluate performance will also help paint a clearer path for how to then improve its performance.

0:14So let's take a look at how to evaluate a model.

0:17Let's take the example of learning to predict housing prices as a function of the size.

0:24Let's say you've trained a model to predict housing prices as a function of the size x.

0:31And for the model, that is a fourth-order polynomial, so it features x, x-squared, x-cubed, and x to the fourth.

0:40Because we'll fit a fourth-order polynomial to a training set with five data points, this fits the training data really well.

0:50But we don't like this model very much, because even though the model fits the training data well,

0:57we think it will fail to generalize to new examples that aren't in the training set.

1:03So when you are predicting prices just a single feature of the size of the house,

1:09you could plot the model like this, and we could see that the curve is very wiggly, so we know this probably isn't a good model.

1:17But if you were fitting this model with even more features, say we had x1 the size of the house,

1:23number of bedrooms, the number of floors of the house, also the age of the home in years,

1:28then it becomes much harder to plot f, because f is now a function of x1 through x4.

1:36And how do you plot a four-dimensional function?

1:43So in order to tell if your model is doing well, especially for applications where you have more than one or two features,

1:50which makes it difficult to plot f of x, we need some more systematic way to evaluate how well your model is doing.

1:58Here's a technique that you can use.

2:01If you have a training set, and this is a small training set with just ten examples listed here,

2:07rather than taking all your data to train the parameters w and b of the model,

2:12you can instead split the training set into two subsets.

2:16I'm going to draw a line here, and let's put 70% of the data into the first part,

2:24and I'm going to call that the training set.

2:27And the second part of the data, let's say 30% of the data, I'm going to put into a test set.

2:35And what we're going to do is train the model's parameters on the training set on this first 70% or so of the data,

2:42and then we'll test its performance on this test set.

2:47In notation, I'm going to use x1, y1, same as before, to denote the training examples through xm, ym,

3:02except that now to make explicit.

3:06So in this little example, we would have seven training examples,

3:10and to introduce one new piece of notation, I'm going to use m subscript train.

3:17m train is the number of training examples, which in this small data set is seven.

3:23So the subscript train just emphasizes if we're looking at the training set portion of the data.

3:29And for the test set, I'm going to use the notation x1, subscript test, comma, y1, subscript test,

3:38to denote the first test example, and this goes all the way to xm test, subscript test, ym test, subscript test,

3:50and m test is the number of test examples, which in this case is three.

3:56And it's not uncommon to split your data set according to maybe a 70-30 split or 80-20 split,

4:04with most of your data going into the training set and then a smaller fraction going into the test set.

4:10So in order to train a model and evaluate it,

4:15this is what it would look like if you're using linear regression with a squared error cost.

4:21Start off by fitting the parameters by minimizing the cost function J of WB.

4:26So this is a usual cost function, minimize over WB of this squared error cost plus regularization term,

4:36lambda over 2m times sum of the WJ squared.

4:41And then to tell how well this model is doing, you would compute J test of WB,

4:49which is equal to the average error on the test set, and that's just equal to 1 over 2 times m test,

4:57that's the number of test examples, and then of sum over all the examples from i equals 1

5:04to the number of test examples of the squared error on each of the test examples, like so.

5:10So it's a prediction on the i-th test example input minus the actual price of the house on the i-th test example squared.

5:22And notice that the test error formula J test, it does not include that regularization term.

5:29And this will give you a sense of how well your learning algorithm is doing.

5:35One other quantity that's often useful to compute as well is the training error,

5:40which is a measure of how well your learning algorithm is doing on the training set.

5:45So let me define J train of WB to be equal to the average over the training set, 1 over 2m,

5:53or 1 over 2m subscript train of sum over your training set of this squared error term.

6:00And once again, this does not include the regularization term,

6:03unlike the cost function that you were minimizing to fit the parameters.

6:08So in a model like what we saw earlier in this video, J train of WB will be low,

6:16because the average error on your training examples will be 0 or very close to 0.

6:23So J train will be very close to 0.

6:26But if you had a few additional examples in your test set that the algorithm had not trained on,

6:31then those test examples might look like these.

6:36And there's a large gap between what the algorithm is predicting as the estimated housing price

6:41and the actual value of those housing prices.

6:44And so J test will be high.

6:47So seeing that J test is high on this model gives you a way to realize that

6:54even though it does great on the training set,

6:56it's actually not so good at generalizing to new examples,

7:00to new data points that were not in the training set.

7:04So that was regression with squared error cost.

7:08Now let's take a look at how you'd apply this procedure to a classification problem.

7:12For example, if you were classifying between handwritten digits that are either 0 or 1.

7:19So same as before, you fit the parameters by minimizing the cost function to find the parameters WB.

7:25For example, if you were training logistic regression,

7:28then this would be the cost function J of WB,

7:32where this is the usual logistic loss function,

7:37and then plus also the regularization term.

7:41And to compute the test error, J test is then the average over your test examples.

7:50That's that 30% of your data that wasn't in the training set of the logistic loss on your test set.

7:58And the training error, you can also compute using this formula.

8:03It's the average logistic loss on your training data that the algorithm was using to minimize the cost function J of WB.

8:11Well, what I describe here will work okay for figuring out if your learning algorithm is doing well,

8:18by seeing how well it's doing in terms of test error.

8:21When applying machine learning to classification problems,

8:24there's actually one other definition of J test and J train that is maybe even more commonly used,

8:31which is instead of using the logistic loss to compute the test error and the training error,

8:36to instead measure what's the fraction of the test set and the fraction of the training set that the algorithm has misclassified.

8:45So specifically, on the test set, you can have the algorithm make a prediction 1 or 0 on every test example.

8:56So recall y hat, we would predict as 1 if f of x is greater than or equal to 0.5 and 0 if it's less than 0.5.

9:05And you can then count up in the test set the fraction of examples where y hat is not equal to the actual ground truth label y in the test set.

9:17So concretely, if you were classifying handwritten digits, 0 or 1, binary classification tasks,

9:24then J test would be the fraction of that test set where 0 was classified as 1 and 1 classified as 0.

9:31And similarly, J train is the fraction of the training set that has been misclassified.

9:37Taking a data set and splitting it into a training set and a separate test set

9:42gives you a way to systematically evaluate how well your learning algorithm is doing.

9:46By computing both J test and J train, you can now measure how well it's doing on the test set and on the training set.

9:53This procedure is one step to what you've been able to automatically choose one model to use for a given machine learning application.

10:02For example, if you're trying to predict housing prices,

10:05should you fit a straight line to your data or fit a second order polynomial or third order or fourth order polynomial?

10:11It turns out that with one further refinement to the idea you saw in this video,

10:15you'll be able to have an algorithm help you to automatically make that type of decision well.

10:20Let's take a look at how to do that in the next video.

---
0:01In the last video, you saw how to use a test set to evaluate the performance of a model.

0:07Let's make one further refinement to that idea in this video, which allows you to use

0:12the technique to automatically choose a good model for your machine learning algorithm.

0:17One thing we've seen is that once the model's parameters W and B have been fit to the training

0:23set, the training error may not be a good indicator of how well the algorithm will do

0:29or how well it will generalize to new examples that were not in the training set.

0:34And in particular, for this example, the training error will be pretty much zero, and that's

0:40likely much lower than the actual generalization error.

0:44And by that, I mean the average error on new examples that were not in the training set.

0:51And what you saw in the last video is that JTest, the performance of the algorithm on

0:56examples it's not trained on, that that would be a better indicator of how well the model

1:01will likely do on new data.

1:03And by that, I mean other data that's not in the training set.

1:08Let's take a look at how this affects how we might use a test set to choose a model

1:14for a given machine learning application.

1:17So if we're fitting a function to predict housing prices or some other regression problem,

1:22one model you might consider is to fit a linear model like this.

1:26And this is a first-order polynomial, and I'm going to use d equals 1 on this slide

1:31to denote fitting a 1 or first-order polynomial.

1:36If you were to fit a model like this to your training set, you'd get some parameters w

1:40and b, and you can then compute JTest to estimate how well this will generalize to new data.

1:48And on this slide, I'm going to use w1, b1, superscript there, to denote that these are

1:54the parameters you get if you were to fit a first-order polynomial or degree 1, d equals

2:001 polynomial.

2:02Now, you might also consider fitting a second-order polynomial or quadratic model.

2:08So this is the model, and if you were to fit this to your training set, you would get some

2:15parameters w2, b2, and you can then similarly evaluate those parameters on your test set

2:24and get JTest w2, b2, and this would give you a sense of how well the second-order polynomial

2:30does.

2:31And you can go on to try d equals 3.

2:33That's a third-order or a degree 3 polynomial that looks like this, and fit parameters and

2:40similarly get JTest, and you might keep doing this until, say, you try up to a 10th-order

2:47polynomial, and you end up with JTest of w10, b10.

2:52That gives you a sense of how well the 10th-order polynomial is doing.

2:57So one procedure you could try, this turns out not to be the best procedure, but one

3:03thing you could try is look at all of these JTests and see which one gives you the lowest

3:10value.

3:11And say you find that JTest for the fifth-order polynomial, for w5, b5, turns out to be the

3:20lowest.

3:21If that's the case, then you might decide that the fifth-order polynomial, d equals

3:265, does best and choose that model for your application.

3:31And if you want to estimate how well this model performs, one thing you could do, but

3:35this turns out to be a slightly flawed procedure, is to report the tested error, JTest w5, b5.

3:44The reason this procedure is flawed is JTest of w5, b5 is likely to be an optimistic estimate

3:52of the generalization error.

3:54In other words, it is likely to be lower than the actual generalization error.

4:00And the reason is, in the procedure we talked about on this slide, we basically fit one

4:06extra parameter, which is d, the degree of polynomial, and we chose this parameter using

4:13the test set.

4:15So on the previous slide, we saw that if you were to fit wb to the training data, then

4:22the training data would be an overly optimistic estimate of generalization error.

4:28And it turns out, too, that if you were to choose the parameter d using the test set,

4:33then the test set, JTest, is now an overly optimistic, that is lower than the actual

4:38estimate of the generalization error.

4:41So the procedure on this particular slide is flawed, and I don't recommend using this.

4:46Instead, if you want to automatically choose a model, such as decide what degree of polynomial

4:52to use, here's how you modify the training and testing procedure in order to carry out

4:58model selection, where by model selection, I mean choosing amongst different models,

5:04such as these 10 different models that you might contemplate using for your machine learning

5:09application.

5:11The way we'll modify the procedure is, instead of splitting your data into just two subsets,

5:16the training set and the test set, we're going to split your data into three different subsets,

5:21which we're going to call the training set, the cross-validation set, and then also the

5:26test set.

5:28So using our example from before of these 10 training examples, we might split it into

5:36putting 60% of the data into the training set, and so the notation we'll use for the

5:44training set portion will be the same as before, except that now mtrain, the number of training

5:50examples, will be 6.

5:52And we might put 20% of the data into the cross-validation set, and the notation I'm

6:00going to use is xcv of 1 comma ycv of 1 for the first cross-validation example.

6:07So cv stands for cross-validation, all the way down to xcv of mcv and ycv of mcv, where

6:16here mcv equals 2 in this example is the number of cross-validation examples.

6:22And then finally, we have the test set, same as before.

6:26So x1 through xmtest and y1 through ymtest, where mtest here is equal to 2.

6:36This is the number of test examples.

6:38We'll see on the next slide how to use the cross-validation set.

6:42So the way we'll modify the procedure is you've already seen the training set and the test

6:49set, and we're going to introduce a new subset of the data called the cross-validation set.

6:56The name cross-validation refers to that this is an extra data set that we're going to use

7:02to check or cross-check the validity or really the accuracy of different models.

7:08I don't think it's a great name, but that is what people in machine learning have gotten

7:13to call this extra data set.

7:15You may also hear people call this the validation set for short.

7:19It's just fewer syllables than cross-validation.

7:22Or in some applications, people also call this the development set.

7:26It means basically the same thing.

7:28Or for short, sometimes you hear people call this the dev set.

7:32But all of these terms mean the same thing as cross-validation set.

7:36I personally use the term dev set the most often because it's the shortest, fastest way

7:42to say it, but cross-validation is probably used a little bit more often by machine learning practitioners.

7:48So onto these three subsets of the data, training set, cross-validation set, and test set,

7:54you can then compute the training error, the cross-validation error, and the test error

7:59using these three formulas.

8:02Whereas usual, none of these terms include the regularization term that is included in

8:06the training objective.

8:08And this new term in the middle, the cross-validation error, is just the average over your MCV cross-validation

8:14examples of the average, say, squared error.

8:18And this term, in addition to being called cross-validation error, is also commonly called

8:25the validation error for short or even the development set error or the dev error.

8:30Armed with these three measures of learning algorithm performance, this is how you can

8:36then go about carrying out model selection.

8:40You can, with the 10 models, same as earlier on this slide, with D equals 1, D equals 2,

8:47all the way up to a 10th degree or the 10th order polynomial, you can then fit the parameters

8:54W1, B1, but instead of evaluating this on your test set, you would instead evaluate

9:01these parameters on your cross-validation set and compute JCV of W1, B1, and similarly

9:08for the second model, you get JCV of W2, B2, and all the way down to JCV of W10, B10.

9:18Then, in order to choose a model, you would look at which model has the lowest cross-validation

9:27error. And concretely, let's say that JCV of W4, B4 is lowest, then what that means

9:36is you would pick this fourth order polynomial as the model you will use for this application.

9:42Finally, if you want to report out an estimate of the generalization error of how well this

9:48model will do on new data, you would do so using that third subset of your data, the

9:55test set, and you report out JTest of W4, B4. And you notice that throughout this entire

10:02procedure, you had fit these parameters using the training set, you then chose the parameter

10:09D or chose the degree of polynomial using the cross-validation set, and so up until

10:15this point, you have not fit any parameters, either W or B or D, to the test set. And that's

10:21why JTest in this example will be a fair estimate of the generalization error of this

10:28model that has parameters W4, B4. So this gives a better procedure for model selection

10:37and it lets you automatically make a decision like what order polynomial to choose for your

10:43linear regression model. This model selection procedure also works for choosing among other

10:49types of models. For example, choosing a neural network architecture. If you are fitting a

10:55model for handwritten digit recognition, you might consider three models like these, maybe

11:01even a larger set of models than just three, but here are a few different neural networks,

11:06small, somewhat larger, and then even larger. To help you decide how many layers should

11:13your neural network have and how many hidden units per layer should you have, you can then

11:18train all three of these models and end up with parameters W1, B1 for the first model,

11:27W2, B2 for the second model, and W3, B3 for the third model. And you can then evaluate

11:35the neural network's performance using JCV, using your cross-validation set. And since

11:42this is a classification problem, JCV, the most common choice, would be to compute this

11:48as a fraction of cross-validation examples that the algorithm has misclassified. And

11:54you would compute this using all three models and then pick the model with the lowest cross-validation

12:02error. So if, in this example, this has the lowest cross-validation error, you would then

12:09pick the second neural network and use parameters trained on this model. And finally, if you

12:17want to report out an estimate of the generalization error, you would then use the test set to

12:23estimate how well the neural network that you just chose will do. So it's considered

12:28best practice in machine learning that if you have to make decisions about your model,

12:34such as fitting parameters or choosing the model architecture, such as neural network

12:38architecture or degree of polynomial, if you're fitting linear regression, to make

12:43all those decisions only using your training set and your cross-validation set, and to

12:49not look at the test set at all while you're still making decisions regarding your learning

12:54algorithm. And it's only after you've come up with one model, that's your final model,

12:59to only then evaluate it on the test set. And because you haven't made any decisions

13:05using the test set, that ensures that your test set is a fair and not overly optimistic

13:11estimate of how well your model will generalize to new data. So that's model selection. And

13:17this is actually a very widely used procedure. I use this all the time to automatically choose

13:24what model to use for a given machine learning application. Now, earlier this week, I mentioned

13:30running diagnostics to decide how to improve the performance of a learning algorithm. Now

13:36that you have a way to evaluate learning algorithms and even automatically choose a model, let's

13:41dive more deeply into examples of some diagnostics. The most powerful diagnostic that I know of

13:48and that I use for a lot of machine learning applications is one called bias and variance.

13:53Let's take a look at what that means in the next video.