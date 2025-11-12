0:02Back in the first course, you had seen how for linear regression, feature normalization

0:07can help the algorithm run faster.

0:09In the case of building a recommended system with numbers Y, such as movie ratings from

0:151 to 5 or 0 to 5 stars, it turns out your algorithm will run more efficiently and also

0:20perform a bit better if you first carry out mean normalization, that is, if you normalize

0:27the movie ratings to have a consistent average value.

0:31Let's take a look at what that means.

0:34So here's the dataset that we've been using, and down below is the cost function you would

0:39use to learn the parameters for the model.

0:42In order to explain mean normalization, I'm actually going to add a fifth user, Eve, who

0:51has not yet rated any movies.

0:53And you see in a little bit that adding mean normalization will help the algorithm make

0:59better predictions on the user, Eve.

1:02In fact, if you were to train a collaborative filtering algorithm on this data, then because

1:10we are trying to make the parameters W small because of this regularization term, if you

1:16were to run the algorithm on this dataset, you actually end up with the parameters W

1:23for the fifth user, for the user Eve, to be equal to 0, 0, as well as quite likely B5

1:32equals 0.

1:33Because Eve hasn't rated any movies yet, the parameters W and B don't affect this first

1:40term in the cost function because none of Eve's movies rating play a role in this squared

1:47error cost function.

1:49And so, minimizing this means making the parameters W as small as possible.

1:56We didn't really regularize B, but if you initialize B to 0 as a default, you end up

2:01with B5 equals 0 as well.

2:04But if these are the parameters for user 5, that is for Eve, then what the algorithm will

2:10end up doing is predict that all of Eve's movies ratings would be W5.x for movie i plus

2:22B5, and this is equal to 0 if W and B above equal 0.

2:27And so this algorithm will predict that if you have a new user that has not yet rated

2:31anything, we think they'll rate all movies with 0 stars, and that's not particularly

2:36hopeful.

2:38So in this video, we'll see that mean normalization will help this algorithm come up with better

2:44predictions of the movie ratings for a new user that has not yet rated any movies.

2:50In order to describe mean normalization, let me take all of the values here, including

2:57all the question marks for Eve, and put them in a two-dimensional matrix like this just

3:03to write out all the ratings, including the question marks, in a more succinct and more

3:08compact way.

3:10To carry out mean normalization, what we're going to do is take all of these ratings and

3:16for each movie, compute the average rating that was given.

3:21So movie 1 had two 5s and two 0s, and so the average rating is 2.5.

3:27Movie 2 had a 5 and a 0, so that averages out to 2.5.

3:31Movie 3, 4 and 0 averages out to 2.

3:34Movie 4 averages out to 2.25 rating, and movie 5, not that popular, has an average 1.25 rating.

3:45So I'm going to take all of these five numbers and gather them into a vector, which I'm going

3:49to call mu, because this is the vector of the average ratings that each of the movies

3:55had, averaging over just the users that did rate that particular movie.

4:00Instead of using these original 0 to 5 star ratings over here, I'm going to take this

4:05and subtract from every rating the mean rating that it was given.

4:11So for example, this movie rating was 5, I'm going to subtract 2.5 giving me 2.5 over here.

4:21This movie had a 0 star rating, I'm going to subtract 2.25 giving me a negative 2.25

4:28rating and so on for all of the now five users, including the new user Eve, as well as for

4:34all five movies.

4:35Then these new values on the right become your new values of yij.

4:39We're going to pretend that user 1 had given a 2.5 rating to movie 1 and a negative 2.25

4:46rating to movie 4.

4:49Using this, you can then learn wj, vj, and xi.

4:54Same as before, for user j on movie i, you would predict wj dot xi plus vj, but because

5:05we had subtracted off mu i for movie i during this mean normalization step, in order to

5:13predict not a negative star rating, which isn't possible if a user rates from 0 to 5

5:19stars, we have to add back this mu i, which is just the value we had subtracted out.

5:26So as a concrete example, if we look at what happens with user 5, with the new user Eve,

5:33because she had not yet rated any movies, the algorithm might learn parameters w5 equals

5:380 and say b5 equals 0.

5:43And so if we look at the predicted rating for movie 1, we will predict that Eve would

5:49rate it w5 dot x1 plus b5, but this is 0, and then plus mu 1, which is equal to 2.5.

6:05So this seems more reasonable to think Eve is likely to rate this movie 2.5 rather than

6:11think Eve will rate all movies 0 stars, just because she hasn't rated any movies yet.

6:17And in fact, the effect of this algorithm is it will cause the initial guesses for the

6:23new user Eve to be just equal to the mean of whatever other users have rated these five

6:30movies.

6:31And that seems more reasonable to take the average rating of the movies rather than to

6:35guess that all the ratings by Eve will be 0.

6:40It turns out that by normalizing the mean of the different movies' ratings to be 0,

6:46the optimization algorithm for the recommender system will also run just a little bit faster.

6:52But it does make the algorithm behave much better for users that have rated no movies

6:57or very small numbers of movies, and the predictions will become more reasonable.

7:04In this example, what we did was normalize each of the rows of this matrix to have 0

7:09mean, and we saw this helps when there's a new user that hasn't rated a lot of movies

7:13yet.

7:14There's one other alternative that you could use, which is to instead normalize the columns

7:21of this matrix to have 0 mean, and that would be a reasonable thing to do too, but I think

7:27in this application, normalizing the rows so that you can give reasonable ratings for

7:33a new user seems more important than normalizing the columns.

7:40Normalizing the columns would help if there was a brand new movie that no one has rated

7:44yet, but if there's a brand new movie that no one has rated yet, you probably shouldn't

7:49show that movie to too many users initially because you don't know that much about that

7:54movie.

7:55So, normalizing columns to help with the case of a movie with no ratings seems less important

8:02to me than normalizing the rows to help with the case of a new user that's hardly rated

8:07any movies yet.

8:09And when you are building your own recommender system, in this week's practice lab, normalizing

8:15just the rows should work fine.

8:17So that's mean normalization.

8:19It makes the algorithm run a little bit faster, but even more important, it makes the algorithm

8:24give much better, much more reasonable predictions when there are users that have rated very

8:30few movies or even no movies at all.

8:33This implementational detail of mean normalization will make your recommender system work much

8:38better.

8:39Next, let's go on to the next video to talk about how you can implement this for yourself

8:44in TensorFlow.

---

0:02In this video, we'll take a look at how you can use TensorFlow to implement the collaborative

0:07filtering algorithm.

0:09You might be used to thinking of TensorFlow as a tool for building neural networks, and

0:14it is.

0:15It's a great tool for building neural networks.

0:17And it turns out that TensorFlow can also be very helpful for building other types of

0:22learning algorithms as well, like the collaborative filtering algorithm.

0:27One of the reasons I like using TensorFlow for tasks like these is that for many applications,

0:33in order to implement gradient descent, say, you need to find the derivatives of the cost

0:38function.

0:39But TensorFlow can automatically figure out for you what are the derivatives of a cost

0:46function.

0:47All you have to do is implement the cost function, and without needing to know any calculus,

0:52without needing to take derivatives yourself, you can get TensorFlow with just a few lines

0:57of code to compute that derivative term that can then be used to optimize the cost function.

1:02Let's take a look at how all this works.

1:05You might remember this diagram here on the right from course one.

1:10This is exactly the diagram that we had looked at when we talked about optimizing W when

1:16we were working through our first linear regression example.

1:21And at that time, we had set B equals to zero.

1:25And so the model was just predicting f of x equals W dot x, and we wanted to find the

1:30value of W that minimizes the cost function J.

1:34So the way we were doing that was via a gradient descent update, which looks like this, where

1:41W gets repeatedly updated as W minus the learning rate alpha times the derivative term.

1:47If you were updating B as well, this is the expression you would use.

1:51But if you set B equals zero, you just forego the second update, and you keep on performing

1:58this gradient descent update until convergence.

2:02Sometimes computing this derivative or partial derivative term can be difficult, and it turns

2:09out that TensorFlow can help with that.

2:12Let's see how.

2:13I'm going to use a very simple cost function, J equals Wx minus one squared.

2:23So Wx is our simplified fW of x, and y is equal to one, and so this would be the cost

2:32function if we had f of x equals Wx, y equals one for the one training example that we have.

2:42What if we were not optimizing this with respect to B?

2:45So the gradient descent algorithm would repeat until convergence this update over here.

2:51It turns out that if you implement the cost function J over here, TensorFlow can automatically

2:57compute for you this derivative term, and thereby get gradient descent to work.

3:02I'll give you a high-level overview of what this code does.

3:07W equals tf.variable three takes the parameter W and initializes it to the value of three.

3:16Telling TensorFlow that W is a variable is how we tell it that W is a parameter that

3:23we want to optimize.

3:24I'm going to set x equals one, y equals one, and the learning rate alpha to be equal to

3:290.01, and let's run gradient descent for 30 iterations.

3:35So in this code, we'll do for error in range iterations, so for 30 iterations, and this

3:40is the syntax to get TensorFlow to automatically compute derivatives for you.

3:45TensorFlow has a feature called a gradient tape, and if you write this with tfr.gradienttape

3:53as tape f, this is compute f of x as W times x, and compute J as f of x minus y squared,

4:05then by telling TensorFlow how to compute the cost J, and by doing it with a gradient

4:11tape syntax as follows, TensorFlow will automatically record the sequence of steps, the sequence

4:17of operations needed to compute the cost J.

4:21And this is needed to enable automatic differentiation.

4:25Next, TensorFlow will have saved the sequence of operations in tape, in the gradient tape.

4:33And with this syntax, TensorFlow will automatically compute this derivative term, which I'm going

4:39to call djdw, and TensorFlow knows you want to take the derivative with respect to W,

4:47and W is the parameter you want to optimize because you had told it so up here, and because

4:53we're also specifying it down here.

4:55So now that you've computed derivatives, finally you can carry out this update by taking W

5:03and subtracting from it the learning rate alpha times that derivative term that we just

5:08got from up above.

5:11TensorFlow variables, tier variables, require special handling, which is why instead of

5:16setting W to be W minus alpha times the derivative in the usual way, we use this assign add function.

5:23But when you get to the practice lab, don't worry about it, we'll give you all the syntax

5:27you need in order to implement the collaborative filtering algorithm correctly.

5:31So notice that with the gradient tape feature of TensorFlow, the main work you need to do

5:38is to tell it how to compute the cost function J, and the rest of the syntax causes TensorFlow

5:44to automatically figure out for you what is that derivative.

5:50And with this, TensorFlow will start with finding the slope of this at 3, shown by this

5:56dashed line, take a gradient step, and update W, and compute the derivative again, and update

6:04W over and over until eventually it gets to the optimal value of W, which is at W equals 1.

6:13So this procedure allows you to implement gradient descent without ever having to figure

6:18out yourself how to compute this derivative term.

6:22This is a very powerful feature of TensorFlow called AutoDiff, and some other machine learning

6:29packages like PyTorch also support AutoDiff.

6:34Sometimes you hear people call this AutoGrad, the technically correct term is AutoDiff,

6:39and AutoGrad is actually the name of a specific software package for doing automatic differentiation,

6:45for taking derivatives automatically.

6:47But sometimes if you hear someone refer to AutoGrad, they're just referring to this same

6:51concept of automatically taking derivatives.

6:54So let's take this and look at how you can implement the collaborative filtering algorithm

6:59using AutoDiff.

7:01And in fact, once you can compute derivatives automatically, you're not limited to just gradient descent.

7:07You can also use a more powerful optimization algorithm like the Adam optimization algorithm.

7:14In order to implement the collaborative filtering algorithm in TensorFlow, this is the syntax

7:19you can use.

7:20We'll start with specifying that the optimizer is Keras optimizer's Adam with learning rate

7:27specified here, and then for, say, 200 iterations, here's the syntax as before, with tf.gradientate

7:37acetate.

7:38You need to provide code to compute the value of the cost function J.

7:43So recall that in collaborative filtering, the cost function J takes as input parentheses

7:50X, W, and B, as well as the ratings we normalize, so that's why I'm writing Y norm, rij specifying

7:59which values have a rating, number of users, or nu in annotation, number of movies, or

8:05an M in annotation just now, as well as the regularization parameter lambda.

8:10And if you can implement this cost function J, then this syntax will cause TensorFlow

8:15to figure out the derivatives for you.

8:18Then this syntax will cause TensorFlow to record the sequence of operations used to compute

8:22the cost, and then by asking it to give you grads equals tf.gradient, this will give you

8:29the derivative of the cost function with respect to X, W, and B, and finally, with

8:38the optimizer that we have specified up on top as the Adam optimizer, you can use the

8:43optimizer with the gradients that we just computed.

8:48And the zip function in Python is just a function that rearranges the numbers into an appropriate

8:53ordering for the applied gradients function.

8:55If you are using gradient descent for Kaggle filtering, recall that the cost function J

9:01would be a function of W, B, as well as X, and if you're applying gradient descent, you

9:07take the partial derivative with respect to W, and then update W as follows, and you'd

9:13also take the partial derivative of this with respect to B, and update B as follows, and

9:19similarly update the features X as follows, and you repeat until convergence.

9:25But as I mentioned earlier, with TensorFlow and AutoDiff, you're not limited to just gradient

9:31descent.

9:32You can also use a more powerful optimization algorithm like the Adam optimizer.

9:37The dataset you use in the practice lab is a real dataset comprising actual movies rated

9:43by actual people.

9:45This is the MovieLens dataset, and it's due to Harper and Konstan, and I hope you enjoy

9:51running this algorithm on a real dataset of movies and ratings, and see for yourself

9:56the results that this algorithm can get.

9:59So that's it.

10:00That's how you can implement the collaborative filtering algorithm in TensorFlow.

10:04If you're wondering why do we have to do it this way, why couldn't we use a dense layer

10:09and then model compile and model fit, the reason we couldn't use that old recipe is

10:14the collaborative filtering algorithm and cost function, it doesn't neatly fit into

10:19the dense layer or the other standard neural network layer types of TensorFlow.

10:24That's why we had to implement it this other way, where we would implement the cost function

10:28ourselves, but then use TensorFlow's tools for automatic differentiation, also called

10:34AutoDiff, and use TensorFlow's implementation of the Adam optimization algorithm to let

10:39it do a lot of the work for us of optimizing the cost function.

10:44If the model you have is a sequence of dense neural network layers or other types of layers

10:50supported by TensorFlow, then the old implementation recipe of model compile, model fit works.

10:57But even when it isn't, these tools in TensorFlow give you a very effective way to implement

11:03other learning algorithms as well.

11:05And so I hope you enjoy playing more with the collaborative filtering exercise in this

11:10week's practice lab, and if it looks like there's a lot of code and a lot of syntax,

11:14don't worry about it, make sure you have what you need to complete that exercise successfully.

11:20And in the next video, I'd like to also move on to discuss more of the nuances of collaborative

11:27filtering, and specifically, the question of how do you find related items, given one

11:33movie, what are other movies similar to this one?

11:36Let's go on to the next video.

---
0:02If you go to an online shopping website and are looking at a specific item, say maybe

0:08a specific book, the website may show you things like, here are some other books similar

0:13to this one.

0:14Or if you're browsing a specific movie, it may say, here are some other movies similar

0:19to this one.

0:20How do the websites do that, so that when you're looking at one item, it gives you

0:24other similar related items to consider?

0:27It turns out the collaborative filtering algorithm that we've been talking about gives

0:31you a nice way to find related items.

0:33Let's take a look.

0:35As part of the collaborative filtering we've discussed, you learn features Xi for every

0:42item i, for every movie i or other type of item that you're recommending to users.

0:47Whereas earlier this week, I had used a hypothetical example of the features representing how much

0:54a movie is a romance movie versus an action movie.

0:57In practice, when you use this algorithm to learn the features Xi automatically, looking

1:03at the individual features like X1, X2, X3, you find them to be quite hard to interpret.

1:10It's quite hard to look at the features and say, oh, X1 is an action movie and X2 is a

1:17foreign film and so on.

1:20Nonetheless, these learned features collectively, X1 and X2 or X1, X2, X3, however many features

1:28and you have, collectively these features do convey something about what that movie

1:35is like.

1:37It turns out that given features Xi of item i, if you want to find other items, say other

1:44movies related to movie i, then what you can do is try to find the item k with features

1:52Xk that is similar to Xi and in particular, given a feature vector Xk, the way we determine

2:04whether or not it's similar to the feature Xi is as follows, is the sum from l equals

2:10one through n with n features of Xkl minus Xil squared.

2:16This turns out to be the square distance between Xk and Xi and in math, this square distance

2:25between these two vectors, Xk and Xi, is sometimes written as follows as well.

2:32And if you find not just the one movie with the smallest distance between Xk and Xi but

2:40find, say, the five or ten items with the most similar feature vectors, then you end

2:46up finding five or ten related items to the item Xi.

2:51So if you're building a website and want to help users find related products to a specific

2:56product they're looking at, this would be a nice way to do so.

3:01Because the features Xi give a sense of what item i is about, other items Xk with similar

3:09features will turn out to be similar to item i.

3:13It turns out later this week, this idea of finding related items will be a small building

3:18block that we'll use to get to an even more powerful recommender system as well.

3:25Before wrapping up this section, I want to mention a few limitations of collaborative

3:30filtering.

3:31In collaborative filtering, you have a set of items and a set of users and the users

3:36have rated some subset of items.

3:39One of its weaknesses is that it's not very good at the cold start problem.

3:44For example, if there's a new item in your catalog, say someone's just published a new

3:49movie and hardly anyone has rated that movie yet, how do you rank the new item if very

3:56few users have rated it before?

3:59Similarly, for new users that rated only a few items, how can we make sure we show them

4:06something reasonable?

4:08We did see in an earlier video how mean normalization can help with this and it does help a lot.

4:15But perhaps there are even better ways to show users that rated very few items things

4:21that are likely to interest them.

4:23This is called the cold start problem because when you have a new item that few users have

4:29rated or when you have a new user that's rated very few items, the results of collaborative

4:36filtering for that item or for that user may not be very accurate.

4:41A second limitation of collaborative filtering is it doesn't give you a natural way to use

4:46side information or additional information about items or users.

4:50For example, for a given movie in your catalog, you might know what is the genre of the movie,

4:56who are the movie stars, what is the studio, what is the budget, and so on.

5:01You may have a lot of features about a given movie or for a single user, you may know something

5:07about their demographics such as their age, gender, location, they express preferences

5:14such as if they tell you they like certain movie genres but not other movie genres or

5:19it turns out if you know the user's IP address, that can tell you a lot about the user's location

5:26and knowing the user's location might also help you guess what might the user be interested

5:31in or if you know whether the user is accessing your sites on a mobile or on a desktop or

5:39if you know what web browser they're using.

5:41It turns out all of these are little cues you can get that can be surprisingly correlated

5:46with the preferences of a user.

5:48It turns out, by the way, that it's known that users that use the Chrome versus Firefox

5:53versus the Safari versus the Microsoft Edge browser, they actually behave in very different

5:58ways.

5:59So even knowing the user web browser can give you a hint when you have collected enough

6:03data of what this particular user might like.

6:06So even though collective filtering where you have multiple users give you ratings of

6:11multiple items is a very powerful set of algorithms, it also has some limitations.

6:17In the next video, let's go on to develop content-based filtering algorithms which can

6:22address a lot of these limitations.

6:25Content-based filtering algorithms are a state-of-the-art technique used in many commercial applications

6:30today.

6:31Let's go take a look at how they work.

