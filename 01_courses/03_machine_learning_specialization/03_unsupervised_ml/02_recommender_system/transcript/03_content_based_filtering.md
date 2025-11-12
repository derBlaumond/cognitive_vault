0:02In this video, we'll start to develop a second type of recommended system called a content-based

0:07filtering algorithm.

0:08To get started, let's compare and contrast the collaborative filtering approach that

0:13we've been looking at so far with this new content-based filtering approach.

0:17Let's take a look.

0:19With collaborative filtering, the general approach is that we would recommend items

0:25to you based on ratings of users who gave similar ratings as you.

0:31So we have some number of users give some ratings for some items, and the algorithm

0:36figures out how to use that to recommend new items to you.

0:40In contrast, content-based filtering takes a different approach to deciding what to recommend

0:48to you.

0:49A content-based filtering algorithm will recommend items to you based on the features of users

0:55and features of the items to find a good match.

0:58In other words, it requires having some features of each user as well as some features of each

1:05item, and it uses those features to try to decide which items and users might be a good

1:12match for each other.

1:13With a content-based filtering algorithm, you still have data where users have rated

1:19some items.

1:20So with content-based filtering, we'll continue to use Rij to denote whether or not user j

1:28has rated item i, and we'll continue to use Yij to denote the rating that user j has given

1:37item i, if it's defined.

1:39But the key to content-based filtering is that we'll be able to make good use of features

1:46of the user and of the items to find better matches than potentially a pure collaborative

1:53filtering approach might be able to.

1:55Let's take a look at how this works.

1:57In the case of movie recommendations, here are some examples of features.

2:02You may know the age of the user, or you may have the gender of the user.

2:08So this could be a one-hot feature, similar to what you saw when we were talking about

2:14decision trees, where you could have a one-hot feature with three values based on whether

2:20the user's self-identified gender is male or female or unknown.

2:26And you may know the country of the user.

2:29So if there are about 200 countries in the world, then this would be a one-hot feature

2:35with about 200 possible values.

2:38You can also look at past behaviors of the user to construct this feature vector.

2:43For example, if you look at the top 1,000 movies in your catalog, you might construct

2:481,000 features that tell you of the 1,000 most popular movies in the world, which of

2:54these has the user watched.

2:57And in fact, you can also take ratings the user might have already given in order to

3:02construct new features.

3:04So it turns out that if you have a set of movies, and if you know what genre each movie

3:10is in, then the average rating per genre that the user has given.

3:16So of all the romance movies that the user has rated, what was the average rating?

3:22Of all the action movies that the user has rated, what was the average rating?

3:27And so on for all the other genres.

3:30This too can be a powerful feature to describe the user.

3:35One interesting thing about this feature is that it actually depends on the ratings

3:41that the user has given, but there's nothing wrong with that.

3:44Constructing a feature vector that depends on the user's ratings is a completely fine

3:49way to develop a feature vector to describe that user.

3:53So with such features like these, you can then come up with a feature vector x subscript

4:00u, u stands for user, superscript j for user j.

4:04Similarly, you can also come up with a set of features for each movie or for each item,

4:10such as what was the year of the movie, what's the genre or genres of the movie of now.

4:16If there are critic reviews of the movie, you can construct one or multiple features

4:22to capture something about what the critics are saying about the movie.

4:27Or once again, you can actually take user ratings of the movie to construct a feature

4:32of, say, the average rating of this movie.

4:36This feature, again, depends on the ratings that users had given, but again, there's nothing

4:43wrong with that.

4:44You can construct a feature for a given movie that depends on the ratings the movie had

4:49received, such as the average rating of the movie.

4:52Or if you wish, you can also have average rating per country or average rating per user

4:58demographic and so on to construct other types of features of the movies as well.

5:03And so with this, for each movie, you can then construct a feature vector, which I'm

5:08going to denote x subscript m, m stands for movie, and superscript i for movie i.

5:15Given features like this, the task is to try to figure out whether a given movie i is going

5:23to be a good match for user j.

5:27Notice that the user features and the movie features can be very different in size.

5:33For example, maybe the user features could be 1,500 numbers and the movie features could

5:41be just 50 numbers, and that's okay too.

5:44In content-based filtering, we're going to develop an algorithm that learns to match

5:49users and movies.

5:51Previously, we were predicting the rating of user j on movie i as wj dot product of

5:59xi plus bj.

6:02In order to develop content-based filtering, I'm going to get rid of bj.

6:09It turns out this won't hurt the performance of the content-based filtering at all.

6:13Instead of writing wj for a user j and xi for a movie i, I'm instead going to just

6:21replace this notation with vj, u.

6:26This v here stands for a vector, it'll be a list of numbers computed for user j, and

6:33the u subscript here stands for user.

6:37Instead of xi, I'm going to compute a separate vector, subscript m, this stands for movie,

6:44and for movie i, it's what the superscript stands for.

6:49vj, u is a vector, it's a list of numbers computed from the features of user j, and

6:58vim is a list of numbers computed from the features, like the ones you saw in the previous

7:05slide of movie i.

7:08And if we're able to come up with an appropriate choice of these vectors, vj, u and vim, then

7:17hopefully the dot product between these two vectors will be a good prediction of the rating

7:23that user j gives movie i.

7:25Just to illustrate what a learning algorithm could come up with, if v, u, that is a user

7:33vector, turns out to capture the user's preferences, say it's 4.9, 0.1, and so on, a list of numbers

7:43like that.

7:44And the first number captures how much do they like romance movies, and then the second

7:49number captures how much do they like action movies, and so on.

7:55And at vm, the movie vector is 4.5, 0.2, and so on and so forth.

8:03With these numbers capturing how much is this a romance movie, how much is this an action

8:08movie, and so on.

8:10Then the dot product, which multiplies these lists of numbers element-wise and then takes

8:16a sum, hopefully will give a sense of how much this particular user will like this particular

8:22movie.

8:24So the challenge is, given features of a user, say xju, how can we compute this vector vju

8:32that represents succinctly or compactly the user's preferences, and similarly, given features

8:38of the movie, how can we compute vim?

8:43Notice that whereas xu and xm could be different in size, one could be a very long list of

8:50numbers, one could be much shorter list, v here have to be the same size, because if

8:57you want to take a dot product between vu and vm, then both of them have to have the

9:02same dimension, such as maybe both of these are, say, 32 numbers.

9:08So to summarize, in collaborative filtering, we had number of users give ratings of different

9:15items.

9:17In contrast, in content-based filtering, we have features of users and features of

9:22items, and we want to find a way to find good matches between the users and the items.

9:28And the way we're going to do so is to compute these vectors, vu for the users and vm for

9:35the items of the movies, and then take dot products between them to try to find good

9:39matches.

9:40How do we compute vu and vm?

9:43Let's take a look at that in the next video.

---
0:01A good way to develop a content-based filtering algorithm is to use deep learning.

0:06The approach you see in this video is the way that many important commercial city-of-the-art content-based filtering algorithms are built today.

0:15Let's take a look.

0:16Recall that in our approach, given a feature vector describing a user, such as age, gender, country, and so on, we have to compute a vector vu.

0:31And similarly, given a vector describing a movie, such as its year of release, the stars in the movie, and so on, we have to compute a vector vm.

0:42In order to do the former, we're going to use a neural network.

0:47And the first neural network will be what we'll call the user network.

0:53Here's an example of a user network.

0:56It takes as input the list of features of the user, xu, so the age, the gender, the country of the user, and so on.

1:06And then using a few layers, say dense neural network layers, it will output this vector vu that describes the user.

1:17Notice that in this neural network, the output layer has 32 units, and so vu is actually a list of 32 numbers.

1:29Unlike most of the neural networks that we're using earlier, the final layer is not a layer with one unit.

1:36It's a layer with 32 units.

1:39Similarly, to compute vm for a movie, we can have a movie network as follows.

1:48That takes as input features of the movie, and through a few layers of a neural network, ends up outputting vm, that vector that describes the movie.

2:00Finally, we'll predict the rating of this user on that movie as vu dot product with vm.

2:11Notice that the user network and the movie network can hypothetically have different numbers of hidden layers and different numbers of units per hidden layer.

2:20Only the output layer needs to have the same size or the same dimension.

2:25In the description you've seen so far, we were predicting the 1 to 5 or 0 to 5 star movie rating.

2:33If you had binary labels, if y was to the user like or favorite an item, then you can also modify this algorithm to output instead of vu dot vm,

2:46you can apply the sigmoid function to that and use this to predict the probability that yij is 1.

2:57To flesh out this notation, we can also add superscripts i and j here, if we want to emphasize that this is the prediction by user j on movie i.

3:08I've drawn here the user network and the movie network as two separate neural networks,

3:13but it turns out that we can actually draw them together in a single diagram, as if it was a single neural network.

3:21This is what it looks like.

3:23On the upper portion of this diagram, we have the user network which inputs xu and ends up computing vu.

3:32On the lower portion of this diagram, we have what was the movie network that inputs xm and ends up computing vm.

3:40These two vectors are then dot producted together.

3:45This dot here represents dot product and this gives us our prediction.

3:52Now, this model has a lot of parameters.

3:56Each of these layers of a neural network has a usual set of parameters of the neural network.

4:01So, how do you train all the parameters of both the user network and the movie network?

4:09What we're going to do is construct a cost function, j, which is going to be very similar to the cost function that you saw in collaborative filtering,

4:18which is, assuming that you do have some data of some users having rated some movies,

4:24we're going to sum over all pairs i and j of where you have labels, where iij equals 1,

4:32of the difference between the predictions.

4:36That would be vuj dot product with vmi minus yij squared.

4:47The way we would train this model is, depending on the parameters of the neural network,

4:53you end up with different vectors here for the users and for the movies.

4:59What we'd like to do is train the parameters of the neural network so that you end up with vectors for the users and for the movies

5:07that results in small squared error in the predictions you get out here.

5:13To be clear, there's no separate training procedure for the user and the movie networks.

5:20This expression down here, this is the cost function used to train all the parameters of the user and the movie networks.

5:29We're going to judge the two networks according to how well vu and vm predict yij.

5:36With this cost function, we're going to use gradient descent or some other optimization algorithm

5:42to tune the parameters of the neural network to cause the cost function j to be as small as possible.

5:48If you want to regularize this model, we can also add the usual neural network regularization term

5:56to encourage the neural networks to keep the values of their parameters small.

6:01It turns out after you've trained this model, you can also use this to find similar items.

6:07This is akin to what we have seen with collateral filtering features helping you find similar items as well.

6:14Let's take a look.

6:16vuj is a vector of length 32 that describes a user j that has features xuj.

6:25Similarly, vim is a vector of length 32 that describes a movie with these features over here.

6:34Given a specific movie, what if you want to find other movies similar to it?

6:42Well, this vector vim describes the movie i.

6:48If you want to find other movies similar to it, you can then look for other movies k

6:55so that the distance between the vector describing movie k and the vector describing movie i,

7:02that distance, the square distance, is small.

7:06This expression plays a role similar to what we had previously with collaborative filtering

7:13where we talked about finding a movie with features xk that was similar to the features xi.

7:21Thus, with this approach, you can also find items similar to a given item.

7:27One final note, this can be pre-computed ahead of time.

7:31By that, I mean you can run a compute server overnight to go through the list of all your movies

7:39and for every movie, find the similar movies to it so that tomorrow,

7:44if a user comes to the website and they're browsing a specific movie,

7:48you can already have pre-computed the 10 or 20 most similar movies to show to the user at that time.

7:54The fact that you can pre-compute ahead of time what's similar to a given movie will turn out to be important later

8:01when we talk about scaling up this approach to a very large catalog of movies.

8:07So that's how you can use deep learning to build a content-based filtering algorithm.

8:13You might remember when we were talking about decision trees

8:17and the pros and cons of decision trees versus neural networks.

8:21I mentioned that one of the benefits of neural networks is that it's easier to take multiple neural networks

8:27and put them together to make them work in concert to build a larger system.

8:32What you just saw was actually an example of that,

8:35where we could take a user network and a movie network and put them together

8:40and then take the inner product of the output.

8:43This ability to put two neural networks together is how we've managed to come up

8:49with a more complex architecture that turns out to be quite powerful.

8:54One note, if you're implementing these algorithms in practice,

8:57I find that developers often end up spending a lot of time carefully designing the features needed

9:03to feed into these content-based filtering algorithms.

9:06So if you end up building one of these systems commercially,

9:09it may be worth spending some time engineering good features for this application as well.

9:16In terms of these applications, one limitation of the algorithm, as we've described it,

9:21is it can be computational, very expensive to run

9:24if you have a large catalog of a lot of different movies you may want to recommend.

9:29So in the next video, let's take a look at some of the practical issues

9:33and how you can modify this algorithm to make a scale to working on even very large item catalogs.

9:40Let's go see that in the next video.

---
0:00Today's recommended systems will sometimes need to pick a handful of items to recommend

0:06from a catalog of thousands or millions or tens of millions or even more items.

0:11How do you do this efficiently computationally? Let's take a look.

0:15Here's a neural network we've been using to make predictions about how a user might rate an item.

0:22Today, a large movie streaming site may have thousands of movies,

0:29or a system that is trying to decide what ad to show may have a catalog of millions of ads

0:37to choose from, or a music streaming site may have tens of millions of songs to choose from,

0:46and large online shopping sites can have millions or even tens of millions of products to choose

0:51from. When a user shows up on your website, they have some feature XU, but if you need to take

0:59thousands or millions of items to feed through this neural network in order to compute the

1:06inner product to figure out which products you should recommend, then having to run neural

1:11network inference thousands or millions of times every time a user shows up on your website becomes

1:17computationally infeasible. Many large-scale recommender systems are implemented as

1:23two steps, which are called the retrieval and the ranking steps. The idea is during the retrieval

1:31step will generate a large list of plausible item candidates that tries to cover a lot of possible

1:40things you might recommend to the user, and it's okay during the retrieval step if you include a

1:46lot of items that the user is not likely to like, and then during the ranking step we'll fine-tune

1:53and pick the best items to recommend to the user. So here's an example. During the retrieval step,

2:00we might do something like for each of the last 10 movies that the user has watched, find the 10

2:07most similar movies. So this means, for example, if a user has watched the movie i with vector vim,

2:17you can find the movies k with vector vkm that is similar to that, and as you saw in the last video,

2:27finding the similar movies to a given movie can be pre-computed. So having pre-computed the most

2:33similar movies to a given movie, you can just pull up the results using a lookup table. This would give

2:39you an initial set of maybe somewhat plausible movies to recommend to a user that just showed up

2:44on your website. Additionally, you might decide to add to it for whatever are the most viewed three genres

2:52of the user. Say there's a user that's watched a lot of romance movies and a lot of comedy movies

2:59and a lot of historical dramas. Then we would add to the list of plausible item candidates the top

3:0510 movies in each of these three genres. And then maybe we would also add to this list the top 20

3:12movies in the country of the user. So this retrieval step can be done very quickly, and you may end up

3:20with a list of a hundred or maybe hundreds of plausible movies to recommend to the user.

3:27And hopefully this list will recommend some good options, but it's also okay if it includes some

3:34options that the user won't like at all. The goal of the retrieval step is to ensure broad

3:40coverage, to have enough movies to at least have many good ones in there. Finally, we would then

3:48take all the items we retrieve during the retrieval step and combine them into a list,

3:53removing duplicates and removing items that the user has already watched or that the user has

3:58already purchased and that you may not want to recommend to them again. The second step of this

4:04is then the ranking step. During the ranking step, you would take the list retrieved during the

4:10retrieval step. So this may be just hundreds of possible movies and rank them using the learned

4:17model. And what that means is you will feed the user feature vector and the movie feature vector

4:25into this neural network, and for each of the user movie pairs compute the predicted rating.

4:33And based on this, you now have all of the, say, hundred plus movies, the ones that the user is

4:40most likely to give a high rating to. And then you can just display the rank list of items to

4:46the user depending on what you think the user will give the highest rating to. One additional

4:51optimization is that if you have computed VM for all the movies in advance, then all you need to do

4:59is to do inference on this part of the neural network a single time to compute a VU and then

5:06take that VU that you just computed for the user on your website right now and take the inner product

5:12between VU and VM for the movies that you have retrieved during the retrieval step. So this

5:19computation can be done relatively quickly if the retrieval step just brings up, say, hundreds of

5:25movies. One of the decisions you need to make for this algorithm is how many items do you want to

5:31retrieve during the retrieval step to feed into the more accurate ranking step. During the retrieval

5:39step, retrieving more items will tend to result in better performance, but the algorithm will end

5:47up being slower. To analyze or to optimize the trade-off between how many items to retrieve,

5:54do you retrieve a hundred or five hundred or a thousand items, I would recommend carrying out

6:00offline experiments to see how much retrieving additional items results in more relevant

6:05recommendations. And in particular, if the estimated probability that yij is equal to one,

6:13according to your neural network model, or if the estimated rating of y being high of the retrieved

6:20items, according to your model's prediction, ends up being much higher. If only you were to retrieve,

6:28say, 500 items instead of only 100 items, then that would argue for maybe retrieving more items,

6:36even if it slows down the algorithm a bit. But with the separate retrieval step and the ranking step,

6:43this allows many recommended systems today to give both fast as well as accurate results,

6:49because the retrieval step tries to prune out a lot of items that are just not worth

6:56doing the more detailed inference and inner product on, and then the ranking step makes

7:01a more careful prediction for what are the items that the user is actually likely to enjoy. So

7:08that's it. This is how you would make your recommended system work efficiently, even on

7:13very large catalogs of movies or products or what have you. Now, it turns out that as commercially

7:22important as our recommended systems, there are some significant ethical issues associated with

7:28them as well. And unfortunately, there have been recommended systems that have created harm. So as

7:35you build your own recommended system, I hope you take an ethical approach and use it to serve your

7:41users and society at large, as well as yourself and the company that you might be working for.

7:47Let's take a look at the ethical issues associated with recommended systems in the next video.

---
0:02Even though recommended systems have been very profitable for some businesses,

0:06there have been some use cases that have left people and society at large worse off.

0:13However you use recommended systems, or for that matter, other learning algorithms,

0:18I hope you only do things that make society at large and people better off.

0:24Let's take a look at some of the problematic use cases of recommended systems,

0:29as well as ameliorations to reduce harm or to increase the amount of good that they can do.

0:35As you've seen in the last few videos, there are many ways of configuring a recommended system.

0:41When we saw binary labels, the label Y could be, does the user engage, or do they click,

0:47or do they explicitly like an item.

0:50So when designing a recommended system, choices in setting the goal of the recommended system,

0:57and a lot of choices in deciding what to recommend to users.

1:02For example, you can decide to recommend to users movies most likely to be rated 5 stars by that user.

1:10So that seems fine. That seems like a fine way to show users movies that they will like.

1:15Or maybe you can recommend to the user products that they are most likely to purchase.

1:21And that seems like a very reasonable use of a recommended system as well.

1:26Versions of recommended systems can also be used to decide what ads to show to a user.

1:34And one thing you could do is to recommend or really to show to the user ads that are most likely to be clicked on.

1:42Actually, what many companies will do is try to show ads that are likely to be clicked on,

1:48and where the advertiser had put in a high bid.

1:53Because for many ad models, the revenue that the company collects depends on whether the ad was clicked on

2:01and what the advertiser had bid per click.

2:05And so while this is a profit maximizing strategy, there are also some possible negative implications of this type of advertising.

2:15I'll give a specific example on the next slide.

2:18One other thing that many companies do is try to recommend products that generate the largest profit.

2:26If you go to a website and search for a product today,

2:30there are many websites that are not showing you the most relevant product or the product that you are most likely to purchase,

2:38but are instead trying to show you the products that will generate the largest profit for the company.

2:44And so if a certain product is more profitable for them because they can buy it more cheaply and sell it at a higher price,

2:52that gets ranked higher in the recommendations.

2:56Now, many companies feel a pressure to maximize profit.

3:00So this doesn't seem like an unreasonable thing to do.

3:04But on the flip side, from the user perspective, when a website recommends to you a product,

3:10sometimes it feels like it would be nice if the website was transparent with you about the criteria by which it is deciding what to show you.

3:17Is it trying to maximize their profits or trying to show you things that are most useful to you?

3:24On video websites or social media websites, a recommended system can also be modified to try to show you the content that leads to the maximum watch time.

3:38So specifically, websites that earn ad revenue tend to have an incentive to keep you on the website for a long time.

3:47And so try to maximize the time you spend on the site is one way for the site to try to get more of your time so they can show you more ads.

3:57And recommended systems today are used to try to maximize user engagements or to maximize the amount of time that someone spends on a site for a specific app.

4:07So whereas the first two of these seem quite innocuous, the third, fourth and fifth, they may be just fine.

4:15They may not cause any harm at all, or they could also be problematic use cases for recommended systems.

4:22Let's take a deeper look at some of these potentially problematic use cases.

4:28Let me start with the advertising example.

4:32It turns out that the advertising industry can sometimes be an amplifier of some of the most harmful businesses.

4:41It can also be an amplifier of some of the best and the most fruitful businesses.

4:47Let me illustrate with a good example and a bad example.

4:50Take the travel industry.

4:52I think in the travel industry, the way to succeed is to try to give good travel experiences to users, to really try to serve users.

5:01Now, it turns out that if there's a really good travel company that can sell your trip to fantastic destinations and make sure you and your friends and family have a lot of fun, then a good travel business, I think, will often end up being more profitable.

5:17And if a business is more profitable, it can then bid higher for ads.

5:23It can afford to pay more to get users.

5:27And because it can afford to bid higher for ads, an online advertising site will show its ads more often and drive more users to this good company.

5:37And this is a virtuous cycle where the more users you serve well, the more profitable the business, and the more you can bid more for ads, and the more traffic you get, and so on.

5:47And this virtuous circle will maybe even tend to help the good travel companies do even better.

5:54So this is a good example.

5:56Let's look at a problematic example.

5:58The payday loan industry tends to charge extremely high interest rates, often to low-income individuals.

6:07And one of the ways to do well in the payday loan business is to be really efficient at squeezing customers for every single dollar you can get out of them.

6:16So if there's a payday loan company that is very good at exploiting customers, really squeezing customers for every single dollar, then that company will be more profitable.

6:27And thus, they can bid higher for ads.

6:30And because they can bid higher for ads, they will get more traffic sent to them, and this allows them to squeeze even more customers and exploit even more people for profit.

6:41And this, in turn, also creates a positive feedback loop.

6:45Also, a positive feedback loop that can cause the most exploitative, the most harmful payday loan companies to get sent more traffic.

6:55And this seems like the opposite effect than what we think would be good for society.

7:01I don't know that there's an easy solution to this, and these are very difficult problems that recommended systems face.

7:10One amelioration might be to refuse to accept ads from exploitative businesses.

7:15Of course, that's easy to say, but how do you define what is an exploitative business and what is not is a very difficult question.

7:24But as we build recommended systems for advertising or for other things, I think these are questions that each one of us working on these technologies should ask ourselves so that we can hopefully invite open discussion and debate, get multiple opinions from multiple people, and try to come up with design choices that allows our systems to try to do much more good than potential harm.

7:50Let's look at some of the examples.

7:52It's been widely reported in news that maximizing user engagement, such as the amount of time that someone watches videos on a website or the amount of time someone spends on social media, this has led to large social media and video sharing sites to amplify conspiracy theories or hate and toxicity.

8:12Because conspiracy theories and certain types of hate and toxic content is highly engaging and causes people to spend a lot of time on it, even if the effect of amplifying conspiracy theories or amplifying hate and toxicity turns out to be harmful to individuals and to society at large.

8:32One amelioration for this, partial and imperfect, is to try to filter out problematic content, such as hate speech, fraud, scams, maybe certain types of violent content.

8:43Again, the definitions of what exactly we should filter out is surprisingly tricky to develop, and this is a set of problems that I think companies and individuals and even governments have to continue to wrestle with.

8:59Just one last example.

9:01When a user goes to many apps or websites, I think users think the app or website are trying to recommend to the user things that they will like.

9:12And I think many users don't realize that many apps and websites are trying to maximize their profit rather than necessarily the user's enjoyment of the media items that are being recommended.

9:25I would encourage you and other companies, if at all possible, to be transparent with users about the criteria by which you are deciding what to recommend to them.

9:34I know this isn't always easy, but ultimately I hope that being more transparent with users about what we're showing them and why will increase trust and also cause our systems to do more good for society.

9:50Recommended systems are a very powerful technology, a very profitable, a very lucrative technology, and there are also some problematic use cases.

9:59If you are building one of these systems using recommended technology or really any other machine learning or other technology, I hope you think through not just the benefits you can create, but also the possible harm and invite diverse perspectives and discuss and debate.

10:16And please only build things and do things that you really believe can leave society better off.

10:24I hope that collectively, all of us in AI can only do work that makes people better off.

10:31Thanks for listening, and we have just one more video to go in recommended systems in which we'll take a look at some practical tips for how to implement a content-based filtering algorithm in TensorFlow.

10:44So let's go on to that last video on recommended systems.

---
0:01In the practice lab, you'll see how to implement content-based filtering in TensorFlow.

0:07What I'd like to do in this video is just step through a few of the key concepts in the code that you get to play with.

0:14Let's take a look.

0:15Recall that our code has started with a user network, as well as a movie network.

0:22And the way you can implement this in TensorFlow is very similar to how we have previously implemented a neural network with a set of dense layers.

0:34We're going to use a sequential model.

0:36We then, in this example, have two dense layers with the number of hidden units specified here.

0:41And then the final layer has 32 units and outputs 32 numbers.

0:47Then for the movie network, I'm going to call it the item network, because the movies are the items here.

0:53This is what the code looks like.

0:55Once again, we have a couple of dense hidden layers, followed by this layer, which outputs 32 numbers.

1:04And for the hidden layers, we'll use our default choice of activation function, which is the ReLU activation function.

1:12Next, we need to tell TensorFlow Keras how to feed the user features or the item features, that is, the movie features, to the two neural networks.

1:24This is the syntax for doing so.

1:26That extracts out the input features for the user and then feeds it to the user NN that we had to find up here to compute VU, the vector for the user.

1:39And then one additional step that turns out to make this algorithm work a bit better is to add this line here, which normalizes the vector VU to have length 1.

1:49So this normalizes the length, also called the L2 norm, but basically the length of the vector VU to be equal to 1.

1:57And then we do the same thing for the item network, for the movie network.

2:02This extracts out the item features and feeds it to the item neural network that we defined up there.

2:10And this computes the movie vector VM.

2:15And then finally, this step also normalizes that vector to have length 1.

2:21After having computed VU and VM, we then have to take the dot product between these two vectors.

2:30And this is the syntax for doing so.

2:32Keras has a special layer type.

2:36Notice we had here tf.keras.layers.dense.

2:40Here, this is tf.keras.layers.dot.

2:43It turns out that there's a special Keras layer that just takes a dot product between two numbers.

2:49And so we're going to use that to take the dot product between the vectors VU and VM.

2:56And this is the output of the neural network.

3:00This gives the final prediction.

3:03Finally, to tell Keras what are the inputs and outputs of the model,

3:08This line tells it that the overall model is a model with inputs being the user features and the movie or the item features.

3:17And the output is this output that we just defined up above.

3:21And the cost function that we use to train this model is going to be the mean squared error cost function.

3:28So these are the key code snippets for implementing content-based filtering as a neural network.

3:35And you see the rest of the code in the practice lab, but hopefully you'll be able to play with that

3:43and see how all these code snippets fit together into a working TensorFlow implementation of a content-based filtering algorithm.

3:51It turns out that there's one other step that I didn't talk about previously.

3:54But if you do this, which is normalize the length of the vector VU, that makes the algorithm work a bit better.

4:02And so TensorFlow has this L2 normalized function that normalizes the vector.

4:09It's also called normalizing the L2 norm of the vector, hence the name of the function.

4:14And so that's it. Thanks for sticking with me through all this material on recommender systems.

4:20It's an exciting technology, and I hope you enjoy playing with these ideas in code in the practice labs for this week.

4:27And so that takes us to the last of these videos on recommender systems and to the end of the next to final week for this specialization.

4:37I look forward to seeing you next week as well. We'll talk about the exciting technology of reinforcement learning.

4:43Hope you have fun with the quizzes and with the practice labs, and I look forward to seeing you next week.