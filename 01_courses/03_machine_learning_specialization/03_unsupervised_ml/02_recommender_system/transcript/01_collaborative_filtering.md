0:02Welcome to this second-to-last week of the machine learning specialization.

0:07I'm really happy that together we're almost all the way to the finish line.

0:11What we'll do this week is discuss recommender systems.

0:15This is one of the topics that has received quite a bit of attention in academia,

0:19but the commercial impact and the actual number of practical use cases of recommender systems

0:25seems to me to be even vastly greater than the amount of attention it has received in academia.

0:32Every time you go to an online shopping website like Amazon, or a movie streaming site like Netflix,

0:39or go to one of the apps or sites that do food delivery,

0:44many of these sites will recommend things to you that they think you may want to buy,

0:49or movies they think you may want to watch, or restaurants that they think you may want to try out.

0:54For many companies, a large fraction of sales is driven by their recommender systems.

0:59So today, for many companies, the economics or the value driven by recommender systems is very large.

1:07And so what we'll do in this week is take a look at how they work.

1:11So with that, let's dive in and take a look at what is a recommender system.

1:15I'm going to use as a running example the application of predicting movie ratings.

1:21So say you run a large movie streaming website, and your users have rated movies using one to five stars.

1:29And so in a typical recommender system, you have a set of users here.

1:34We have four users, Alice, Bob, Carol, and Dave, which I've numbered users one through four,

1:40as well as a set of movies, Love at Last, Romance Forever, Cheap Puppies of Love,

1:44and then Nonstop Car Chasers and Swords vs. Karate.

1:48And what the users have done is rated these movies one to five stars.

1:53Or in fact, to make some of these examples a little bit easier, I'm actually going to let them rate the movies from zero to five stars.

2:01So say Alice has rated Love at Last five stars, Romance Forever five stars.

2:06Maybe she has not yet watched Cheap Puppies of Love, so you don't have a rating for that.

2:10And I'm going to denote that by a question mark, and she thinks Nonstop Car Chasers and Swords vs. Karate deserve zero stars.

2:18Bob rates that five stars, has not watched that, so you don't have a rating, rates that four stars, zero, zero.

2:26Carol, on the other hand, thinks that deserves zero stars, has not watched that, zero stars,

2:32and she loves Nonstop Car Chasers and Swords vs. Karate.

2:36And Dave rates the movies as follows.

2:40In a typical recommender system, you will have some number of users as well as some number of items.

2:49In this case, the items are movies that you want to recommend to the users.

2:55And even though I'm using movies in this example, the same logic or the same framework works for recommending anything

3:02from products or websites myself, to restaurants, to even which media articles or social media articles to show to a user that may be more interesting to them.

3:11The notation I'm going to use is, I'm going to use NU to denote the number of users.

3:18So in this example, NU is equal to four because we have four users, and NM to denote the number of movies or really the number of items.

3:28So in this example, NM is equal to five because we have five movies.

3:33I'm going to set Rij to be equal to one if user j has rated movie i.

3:42So for example, user one, that is Alice, has rated movie one but has not rated movie three.

3:51And so R11 would be equal to one because she has rated movie one, but R31 would be equal to zero because she has not rated movie number three.

4:04Then finally, I'm going to use Yij to denote the rating given by user j to movie i.

4:11So for example, this rating here would be that movie three was rated by user two to be equal to four.

4:19Notice that not every user rates every movie, and it's important for the system to know which users have rated which movies.

4:27That's why we're going to define Rij to be equal to one if user j has rated movie i, and it would be equal to zero if user j has not rated movie i.

4:38So with this framework for recommended systems, one possible way to approach the problem is to look at the movies that users have not rated

4:47and to try to predict how users would rate those movies, because then we can try to recommend to users things that they are more likely to rate as five stars.

4:58And in the next video, we'll start to develop an algorithm for doing exactly that, but making one very special assumption,

5:05which is we're going to assume temporarily that we have access to features or extra information about the movies,

5:12such as which movies are romance movies, which movies are action movies.

5:17And using that, we'll start to develop an algorithm.

5:20But later this week, we'll actually come back and ask, what if we don't have these features?

5:25How can we still get the algorithm to work then?

5:28But let's go on to the next video to start building up this algorithm.

---
0:02So let's take a look at how we can develop a recommended system if we had features of

0:07each item or features of each movie.

0:10So here's the same data set that we had previously with the four users having rated some but

0:16not all of the five movies.

0:19What if we additionally have features of the movies?

0:22So here I've added two features, X1 and X2, that tell us how much each of these is a romance

0:29movie and how much each of these is an action movie.

0:34So for example, Love at Last is a very romantic movie, so this feature takes on 0.9, but it's

0:41not a non-action movie, so this feature takes on 0.

0:44But it turns out Non-Stop Car Chases has just a little bit of romance in it, so it's 0.1,

0:52but it has a ton of action, so that feature takes on the value of 1.0.

0:58So you recall that I had used the notation NU to denote the number of users, which is

1:054, and M to denote the number of movies, which is 5.

1:09I'm going to also introduce N to denote the number of features we have here, and so N

1:14is equal to 2, because we have two features, X1 and X2, for each movie.

1:20With these features, we have, for example, that the features for movie 1, that is the

1:26movie Love at Last, would be 0.90, and the features for the third movie, Cute Puppies

1:34of Love, would be 0.99 and 0.

1:41And let's start by taking a look at how we might make predictions for Alice's movie ratings.

1:48So for user 1, that is Alice, let's say we predict the rating for movie i as W dot X,

1:58a feature i, plus B. So this is just a lot like linear regression.

2:05For example, if we end up choosing the parameter W1 equal 5, 0, and say B1 is equal to 0, then

2:16the prediction for movie 3, where the features are 0.99 and 0, which is just copied from

2:24here, first feature is 0.99, second feature is 0, our prediction would be W dot X3 plus

2:34B equals 0.99 times 5 plus 0 times 0, which turns out to be equal to 4.95.

2:44And this rating seems pretty plausible.

2:46It looks like Alice has given high ratings to Love at Last and Romance Forever, to two

2:52highly romantic movies, but given low ratings to the action movies Non-Stop Conch Chases

2:58and Souls vs. Karate.

3:00So if we look at Cute Puppies of Love, while predicting that she might rate that 4.95 seems

3:06quite plausible.

3:08And so these parameters W and B for Alice seems like a reasonable model for predicting

3:14her movie ratings.

3:17Just to add a little bit of notation, because we have not just one user, but multiple users,

3:22or really NU equals four users, I'm going to add a superscript 1 here to denote that

3:28this is the parameter W1 for user 1, and add a superscript 1 there as well.

3:35And similarly here, and here as well, so that we would actually have different parameters

3:43for each of the four users on our dataset.

3:46And more generally, in this model, we can, for user J, not just user 1 now, we can predict

3:54user J's rating for movie I as WJ dot product XI plus BJ.

4:02So here, the parameters W, J, and BJ are the parameters used to predict user J's rating

4:11for movie I, which is a function of XI, which is the features of movie I.

4:16And this is a lot like linear regression, except that we're fitting a different linear

4:21regression model for each of the four users in the dataset.

4:25So let's take a look at how we can formulate the cost function for this algorithm.

4:32As a reminder, our notation is that Rij is equal to 1 if user J has rated movie I, or

4:390 otherwise, and Yij is the rating given by user J on movie I.

4:46And on the previous slide, we defined WJ, BJ as the parameters for user J, and XI as

4:53the feature vector for movie I.

4:57So the model we have is for user J and movie I, predict the rating to be WJ dot product

5:03XI plus BJ.

5:07I'm going to introduce just one new piece of notation, which is I'm going to use MJ

5:12to denote the number of movies rated by user J.

5:16So if a user has rated 4 movies, then MJ would be equal to 4.

5:21And if a user has rated 3 movies, then MJ would be equal to 3.

5:26So what we'd like to do is to learn the parameters WJ and BJ given the data that we have, that

5:35is given the ratings a user has given of a set of movies.

5:41So the algorithm we're going to use is very similar to linear regression.

5:47So let's write out the cost function for learning the parameters WJ and BJ for a given user

5:52J.

5:53So let's focus on one user, on user J for now.

5:56I'm going to use the mean squared error criteria.

6:01So the cost will be the prediction, which is WJ dot XI plus BJ minus the actual rating

6:11that the user had given, so minus YIJ squared.

6:18And we'll try to choose parameters W and B to minimize the squared error between their

6:24predicted rating and the actual rating that was observed.

6:30But the user hasn't rated all the movies, so if we're going to sum over this, we're

6:36going to sum over only over the values of I, where RIJ is equal to 1.

6:46So we're going to sum only over the movies I that user J has actually rated.

6:54So that's what this denotes, sum over all values of I, where RIJ is equal to 1, meaning

7:00that user J has rated that movie I.

7:03And then finally, we can take the usual normalization, 1 over 2 MJ, and this is very much like the

7:14cost function we had for linear regression with M, or really MJ training examples, where

7:20you're summing over the MJ movies for which you have a rating, taking a squared error,

7:25and then normalizing by this 1 over 2 MJ.

7:28And this is going to be a cost function J of WJ, BJ.

7:38And if we minimize this as a function of WJ and BJ, then you should come up with a

7:46pretty good choice of parameters, WJ and BJ, for making predictions for user J's ratings.

7:51Let me add just one more term to this cost function, which is the regularization term,

7:56to prevent overfitting.

7:58And so here's our usual regularization parameter, lambda, divided by 2 MJ, and then times the

8:05sum of the squared values of the parameters W, and so N is the number of features, XI,

8:16and that's the same as the number of numbers in WJ.

8:19If you were to minimize this cost function J as a function of W and B, you should get

8:25a pretty good set of parameters for predicting user J's ratings for other movies.

8:32Now before moving on, it turns out that for recommended systems, it would be convenient

8:38to actually eliminate this division by MJ term.

8:44MJ is just a constant in this expression, and so even if you take it out, you should

8:49end up with the same value of W and B.

8:52Now let me take this cost function down here at the bottom and copy it to the next slide.

8:59So we have that.

9:00To learn the parameters WJ, BJ for user J, we would minimize this cost function as a

9:06function of WJ and BJ.

9:10But instead of focusing on a single user, let's look at how we learn the parameters

9:15for all of the users.

9:18To learn the parameters W1, B1, W2, B2 through WNU, BNU, we would take this cost function

9:26on top and sum it over all the NU users.

9:30So we would have sum from J equals 1 to NU of the same cost function that we had written

9:41up above, and this becomes the cost for learning all the parameters for all of the users.

9:53And if we use gradient descent or any other optimization algorithm to minimize this as

9:59a function of W1, B1, all the way through WNU, BNU, then you have a pretty good set

10:06of parameters for predicting movie ratings for all the users.

10:11And you may notice that this algorithm is a lot like linear regression, where that plays

10:16a role similar to the output F of X of linear regression, only now we're training a different

10:24linear regression model for each of the N subscript U users.

10:30So that's how you can learn parameters and predict movie ratings if you had access to

10:36these features X1 and X2 that tell you how much is each of the movies a romance movie

10:42and how much is each of the movies an action movie.

10:46But where do these features come from and what if you don't have access to such features

10:51that give you enough detail about the movies with which to make these predictions?

10:56In the next video, we'll look at a modification of this algorithm that will let you make predictions,

11:02let you make recommendations, even if you don't have in advance features that describe

11:08the items of the movies in sufficient detail to run the algorithm that we just saw.

11:13So let's go on and take a look at that in the next video.

---

0:02In the last video, you saw how if you have features for each movie, such as features

0:07X1 and X2, that tell you how much is this a romance movie and how much is this an action

0:12movie, then you can use basically linear regression to learn to predict movie ratings.

0:18But what if you don't have those features, X1 and X2?

0:22Let's take a look at how you can learn or come up with those features, X1 and X2, from

0:27the data.

0:28So here's the data that we had before, but what if instead of having these numbers for

0:35X1 and X2, we didn't know in advance what the values of the features X1 and X2 are?

0:41So I'm going to replace them with question marks over here.

0:44Now, just for the purposes of illustration, let's say we had somehow already learned parameters

0:52for the four users.

0:53So let's say that we learned parameters w1 equals 5 and 0 and b1 equals 0 for user 1,

1:00w2 is also 5, 0, b2 is 0, w3 is 0, 5, b3 is 0, and for user 4, w4 is also 0, 5, and b4

1:17is equal to 0.

1:18We'll worry later about how we might have come up with these parameters w and b, but

1:23let's say we have them already.

1:26And as a reminder, to predict user j's rating on movie i, we're going to use wj.product

1:36the features of Xi plus bj.

1:42So to simplify this example, all the values of b are actually equal to 0, so just to reduce

1:47a little bit of writing, I'm going to ignore b for the rest of this example.

1:52Let's take a look at how we can try to guess what might be reasonable features for movie

1:581.

1:59If these are the parameters you have on the left, then given that Alice rated movie 1

2:055, we should have that w1.x1 should be about equal to 5, and w2.x2 should also be about

2:16equal to 5, because Bob rated it 5, w3.x1 should be close to 0, and w4.x1 should be

2:27close to 0 as well.

2:29So the question is, given these values for w that we have up here, what choice for x1

2:38would cause these values to be right?

2:44Well, one possible choice would be if the features for that first movie were 1,0, in

2:50which case w1.x1 would equal to 5, w2.x1 would equal to 5, and similarly w3 or w4.product

3:04with this feature vector x1 would be equal to 0.

3:08So what we have is that if you have the parameters for all four users here, and if you have four

3:14ratings in this example that you want to try to match, you can take a reasonable guess

3:20at what is the feature vector x1 for movie 1 that would make good predictions for these

3:27four ratings up on top.

3:30And similarly, if you have these parameter vectors, you can also try to come up with

3:37a feature vector x2 for the second movie, a feature vector x3 for the third movie, and

3:43so on, to try to make the algorithm's predictions on these additional movies close to what was

3:53actually the ratings given by the users.

3:57Let's come up with a cost function for actually learning the values of x1 and x2.

4:04And by the way, notice that this works only because we have parameters for four users.

4:11That's what allows us to try to guess appropriate features x1.

4:17This is why in a typical linear regression application, if you have just a single user,

4:22you don't actually have enough information to figure out what would be the features x1

4:26and x2, which is why in the linear regression context that you saw in course 1, you can't

4:33come up with features x1 and x2 from scratch.

4:37But in collateral filtering, it is because you have ratings for multiple users of the

4:42same item, of the same movie, that's what makes it possible to try to guess what the

4:47plausible value is for these features.

4:50So given w1, b1, w2, b2, and so on, through w, n, u, b, n, u for the n subscript u users,

4:59if you want to learn the features xi for a specific movie i, here's a cost function

5:06we could use, which is that I'm going to want to minimize squared error as usual.

5:14So if the predicted rating by user j on movie i is given by this, let's take the squared

5:24difference from the actual movie rating yij, and as before, let's sum over all the users

5:33j, but this will be a sum over all values of j where rij is equal to 1, and I'll add

5:42a 1 half there as usual.

5:44And so if I define this as a cost function for xi, then if we minimize this as a function

5:52of xi, you'd be choosing the features xi for movie i, so that for all the users j that

6:01had rated movie i, we would try to minimize the squared difference between what your choice

6:08of features xi results in, in terms of the predicted movie rating, minus the actual movie

6:14rating that the user had given it.

6:17And finally, if we want to add a regularization term, we add the usual plus lambda over 2,

6:23k equals 1 through n, where n as usual is the number of features of xik squared.

6:31Lastly, to learn all the features x1 through xnm, because we have nm movies, we can take

6:40this cost function on top and sum it over all the movies, so sum from i equals 1 through

6:47the number of movies, and then just take this term from above, and this becomes a cost function

6:56for learning the features for all of the movies in the dataset.

7:02And so, if you have parameters w and b for all the users, then minimizing this cost function

7:11as a function of x1 through xnm using gradient descent or some other algorithm, this will

7:17actually allow you to take a pretty good guess at learning good features for the movies.

7:22And this is pretty remarkable.

7:25For most machine learning applications, the features have to be externally given, but

7:30in this algorithm, we can actually learn the features for a given movie.

7:35But in what we've done so far in this video, we assume you had those parameters w and b

7:40for the different users.

7:42Where do you get those parameters from?

7:45Well, let's put together the algorithm from the last video for learning w and b, and what

7:49we just talked about in this video for learning x, and that will give us our collaborative

7:55filtering algorithm.

7:57Here's the cost function for learning the features.

8:01This is what we had derived on the last slide.

8:04Now, it turns out that if we put these two together, this term here is exactly the same

8:13as this term here.

8:15Notice that sum over j of all values of i, that rij equals 1, is the same as summing

8:22over all values of i with all j where rij is equal to 1.

8:28This summation is just summing over all user movie pairs where there is a rating.

8:34And so what I'm going to do is put these two cost functions together and have this,

8:42where I'm just writing out the summation more explicitly as summing over all pairs

8:48i and j where we do have a rating of the usual squared cost function, and then let

8:55me take the regularization term from learning the parameters w and b and put that here,

9:04and take the regularization term from learning the features x and put them here, and this

9:11ends up being our overall cost function for learning w, b, and x.

9:19And it turns out that if you minimize this cost function as a function of w and b as

9:24well as x, then this algorithm actually works.

9:28Here's what I mean.

9:29If we had three users and two movies, and if you have ratings for these four movies

9:37but not those two, what it does is it sums over all the users, and for user 1 it has

9:44a term in the cost function for this, for user 2 it has a term in the cost function

9:48for these, for user 3 it has a term in the cost function for this.

9:51So we're summing over users first and then having one term for each movie where there

9:59is a rating.

10:00But an alternative way to carry out this summation is to first look at movie 1, that's what this

10:06summation here does, and then to include all the users that rated movie 1, and then

10:12look at movie 2 and have a term for all the users that had rated movie 2.

10:19And you see that in both cases we're just summing over these four pairs where the user

10:26had rated the corresponding movie.

10:28So that's why this summation on top and this summation here, they're two ways of summing

10:33over all of the pairs where the user had rated the movie.

10:38So how do you minimize this cost function as a function of W, B, and X?

10:43One thing you could do is to use gradient descent.

10:47So in course 1 when we learned about linear regression, this is the gradient descent algorithm

10:55you had seen, where we had a cost function J which is a function of the parameters W

11:00and B, and we'd apply gradient descent as follows.

11:03With collateral filtering, the cost function isn't a function of just W and B, it's now

11:09a function of W, B, and X.

11:13And I'm using W and B here to denote the parameters for all of the users, and X here just informally

11:19to denote the features for all of the movies.

11:22But if you're able to take partial derivatives with respect to the different parameters,

11:27you can then continue to update the parameters as follows.

11:32But now we need to optimize this with respect to X as well, so we also will want to update

11:38each of these parameters X using gradient descent as follows.

11:44And it turns out that if you do this, then you actually find pretty good values of W

11:51and B as well as X.

11:54And in this formulation of the problem, the parameters are W and B, and X is also a parameter.

12:04And then finally, to learn the values of X, we also will update X as X minus the partial

12:13derivative with respect to X of the cost W, B, X.

12:19I'm using the notation here a little bit informally and not keeping very careful track of the

12:24superscripts and subscripts, but the key takeaway I hope you have from this is that

12:30the parameters of this model are W and B, and X now is also a parameter.

12:37Which is why we minimize the cost function as a function of all three of these sets of

12:41parameters W and B as well as X.

12:45So the algorithm we just derived is called collaborative filtering.

12:50And the name collaborative filtering refers to the sense that because multiple users have

12:56rated the same movie kind of collaboratively, giving you a sense of what this movie may

13:01be like, that allows you to guess what are appropriate features for that movie.

13:07And this in turn allows you to predict how other users that haven't yet rated that same

13:12movie may decide to rate it in the future.

13:16So this collaborative filtering is this gathering of data from multiple users, this collaboration

13:22between users to help you predict ratings for even other users in the future.

13:29So far, our problem formulation has used movie ratings from 1 to 5 stars or from 0 to 5 stars.

13:37A very common use case of recommended systems is when you have binary labels, such as did

13:42the user favorite or like or interact with an item.

13:47In the next video, let's take a look at the generalization of the model you've seen so

13:51far to binary labels.

13:53Let's go see that in the next video.

---

0:02Many important applications of recommended systems or of collateral filtering algorithms

0:08involve binary labels, where instead of a user giving you a 1-5 star or 0-5 star rating,

0:15they just somehow give you a sense of if they like this item or they did not like this item.

0:21Let's take a look at how to generalize the algorithm we've seen to this setting.

0:25The process we'll use to generalize the algorithm will be very much reminiscent to how we had gone from

0:31linear regression to logistic regression, to predicting numbers, to predicting a binary label back in course 1.

0:39Let's take a look.

0:40Here's an example of a collaborative filtering dataset with binary labels.

0:45A 1 denotes that the user liked or engaged with a particular movie.

0:52Label 1 could mean that Alice watched the movie Love at Last all the way to the end,

0:57and watched Romance Forever all the way to the end, but after playing a few minutes of non-stop car chases,

1:03decided to stop the video and move on.

1:06Or it could mean that she explicitly hit Like or Favorite on an app to indicate that she liked these movies,

1:14but after checking out non-stop car chases and Souls vs. Karate, did not hit Like.

1:19And a question mark usually means the user has not yet seen the item,

1:23and so they weren't in a position to decide whether or not to hit Like or Favorite on that particular item.

1:30So the question is, how can we take the collaborative filtering algorithm that you saw in the last video

1:35and get it to work on this dataset?

1:37And by predicting how likely Alice, Bob, Carol, and Dave are to like the items that they have not yet rated,

1:46we can then decide how much we should recommend these items to them.

1:51There are many ways of defining what is a label 1, and what is a label 0, and what is a label question mark

1:58in collaborative filtering with binary labels.

2:01Let's take a look at a few examples.

2:03In an online shopping website, the label could denote whether or not user J chose to purchase an item

2:12after they were exposed to it, after they were shown the item.

2:16So 1 would denote that they purchased it, 0 would denote that they did not purchase it,

2:20and a question mark would denote that they were not even shown, were not even exposed to the item.

2:25Or in a social media setting, the labels 1 or 0 could denote did the user favorite or like an item

2:33after they were shown it, and question mark would be if they've not yet been shown the item.

2:38Or many sites, instead of asking for explicit user rating, will use the user behavior to try to guess if the user liked the item.

2:48So for example, you can measure if a user spends at least 30 seconds with an item,

2:55and if they did, then assign that a label 1 because the user found the item engaging.

3:00Or if a user was shown an item but did not spend at least 30 seconds with it,

3:05then assign that a label 0, or if the user was not shown the item yet, then assign it a question mark.

3:12Another way to generate a rating implicitly as a function of the user behavior will be to see did the user click on an item.

3:21This is often done in online advertising, where if the user has been shown an ad,

3:26if they clicked on it, assign it a label 1, if they did not click, assign it a label 0,

3:32and a question mark will refer to if the user has not even been shown that ad in the first place.

3:37So often, these binary labels will have a rough meaning as follows.

3:42A label of 1 means that the user engaged after being shown an item,

3:47and engaged could mean that they clicked or spent 30 seconds or explicitly favored or liked or purchased the item.

3:53A 0 will reflect the user not engaging after being shown the item,

3:58and a question mark will reflect the item not yet having been shown to the user.

4:03So given these binary labels, let's look at how we can generalize our algorithm,

4:09which is a lot like linear regression from the previous couple of videos to predicting these binary outputs.

4:16Previously, we were predicting label yij as wj dot product xi plus b.

4:23So this was a lot like a linear regression model.

4:26For binary labels, we're going to predict that the probability of yij being equal to 1

4:34is given by not wj dot xi plus b, but instead by g of this formula,

4:43where now g of z is 1 over 1 plus e to the negative z.

4:48So this is the logistic function just like we saw in logistic regression.

4:52And what we would do is take what was a lot like a linear regression model

4:58and turn it into something that would be a lot like a logistic regression model,

5:03where we'll now predict the probability of yij being 1,

5:09that is, of the user having engaged with or liked the item using this model.

5:16In order to build this algorithm, we'll also have to modify the cost function

5:21from the squared error cost function to a cost function that is more appropriate for binary labels,

5:31for a logistic regression-like model.

5:34So previously, this was the cost function that we had,

5:38where this term played a role similar to f of x, the prediction of the algorithm.

5:44When you now have binary labels yij, when the labels are 1 or 0 or a question mark,

5:51then the prediction f of x becomes, instead of wj dot xi plus bj,

6:01it becomes g of this, where g is the logistic function.

6:06And similar to when we had derived logistic regression,

6:10we had written out the following loss function for a single example,

6:15which was that the loss, if the algorithm predicts f of x and the true label was y,

6:21the loss was this. It was negative y log f minus 1 minus y log 1 minus f.

6:31This is also sometimes called the binary cross-entropy cost function,

6:36but this is the standard cost function that we had used for logistic regression,

6:40as well as for the binary classification problems when we were training neural networks.

6:45And so, to adapt this to the collaborative filtering setting,

6:49let me write out the cost function, which is now a function of all the parameters w and b,

6:56as well as all the parameters x, which are the features of the individual movies or items.

7:04We now need to sum over all the pairs, ij, where rij is equal to 1.

7:12Notice this is just similar to the summation up on top.

7:16And now, instead of this squared error cost function,

7:20we're going to use that loss function as a function of f of x comma yij,

7:28where f of x here, that's my abbreviation, my shorthand for g of w, j dot xi plus vj.

7:38And if you plug this into here, then this gives you the cost function

7:44they could use for collaborative filtering on binary labels.

7:48So, that's it. That's how you can take the linear regression-like collaborative filtering algorithm

7:54and generalize it to work with binary labels.

7:57And this actually very significantly opens up the set of applications you can address with this algorithm.

8:04Now, even though you've seen the key structure and cost function of the algorithm,

8:10there are also some implementational tips that will make your algorithm work much better.

8:15Let's go on to the next video to take a look at some details of how you would implement this

8:21and some little modifications that will make the algorithm run much faster.

8:25Let's go on to the next video.