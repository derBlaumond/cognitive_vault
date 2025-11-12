0:01Let's take a look at what the k-means clustering algorithm does.

0:05Let me start with an example.

0:08Here I've plotted a dataset with 30 unlabeled training examples.

0:13So there are 30 points,

0:15and what we'd like to do is run k-means on this dataset.

0:19The first thing that the k-means algorithm does is it will take

0:23a random guess at where might be the centers

0:27of the two clusters that you might ask it to find.

0:31In this example, I'm going to ask it to try to find two clusters.

0:36Later in this week,

0:37we'll talk about how you might decide how many clusters to find.

0:41But the very first step is it will randomly pick two points,

0:45which I've shown here as a red cross and a blue cross,

0:51at where might be the centers of two different clusters.

0:56This is just a random initial guess and they're not

0:58particularly good guesses, but it's a start.

1:02One thing I hope you take away from this video is that

1:05k-means will repeatedly do two different things.

1:09The first is assign points to cluster centroids,

1:13and the second is move cluster centroids.

1:16Let's take a look at what this means.

1:17The first of the two steps is it will go through each of

1:21these points and look at whether it is closer to

1:26the red cross or to the blue cross.

1:31The very first thing that k-means does is it will take

1:34a random guess at where are the centers of the cluster.

1:39The centers of the cluster are called cluster centroids.

1:45After it's made an initial guess at where the cluster centroids,

1:49it will go through all of these examples,

1:51x1 through x30, my 30 data points.

1:57For each of them, it will check if it is

1:59closer to the red cluster centroid shown by the red cross,

2:03or if it's closer to

2:04the blue cluster centroid shown by the blue cross.

2:08It will assign each of these points to

2:11whichever of the cluster centroids it is closer to.

2:14I'm going to illustrate that by

2:17painting each of these examples,

2:19each of these little round dots,

2:21either red or blue,

2:23depending on whether that example is

2:26closer to the red or to the blue cluster centroid.

2:30This point up here is closer to the red centroid,

2:33which is why it's painted red,

2:34whereas this point down there is

2:36closer to the blue cluster centroid,

2:38which is why I've now painted it blue.

2:41That was the first of the two things

2:45that k-means does over and over,

2:47which is assign points to cluster centroids.

2:50All that means is it will associate,

2:53which I'm illustrating with the color,

2:55every point of one of the cluster centroids.

2:58The second of the two steps that k-means does is,

3:02it will look at all of the red points and take an average of

3:07them and it will move the red cross to whatever is

3:12the average location of the red dots,

3:16which turns out to be here.

3:18So the red cross,

3:20that is the red cluster centroid will move here.

3:23Then we do the same thing for all the blue dots.

3:25Look at all the blue dots and take an average of

3:28them and move the blue cross over there,

3:32so you now have a new location

3:34for the blue cluster centroid as well.

3:37In the next video, we'll look at

3:39the mathematical formulas for how to do both of these steps.

3:43But now that you have these new and hopefully slightly improved

3:47guesses for the locations of the two cluster centroids,

3:51we'll look through all of the 30 training examples

3:54again and check for every one of them,

3:57whether it's closer to the red or

3:59the blue cluster centroid for the new locations.

4:02Then we will associate them,

4:05which I indicate by the color again,

4:07every point to the closer cluster centroid.

4:11If you do that, you see that a few of the points change color.

4:15So for example, this point is colored red because it

4:19was closer to the red cluster centroid previously.

4:22But if we now look again,

4:24it's now actually closer to the blue cluster centroid

4:26because the blue and red cluster centroids have moved.

4:30So if we go through and associate

4:33each point with the closer cluster centroid,

4:36you end up with this.

4:38Then we just repeat the second part of k-means again,

4:42which is look at all of the red dots and compute the average,

4:48and also look at all of the blue dots and

4:51compute the average location of all of the blue dots.

4:55It turns out that you end up moving

4:58the red cross over there and the blue cross over here.

5:02We repeat. Let's look at all of the points again and

5:05recolor them either red or blue

5:07depending on which cluster centroid it is closer to.

5:11So you end up with this.

5:13Then again, look at all of the red dots and take

5:16the average location and look at all the blue dots and take

5:18the average location and move the clusters to the new locations.

5:24It turns out that if you were to keep on repeating these two steps,

5:28that is, look at each point and

5:30assign it to the nearest cluster centroid,

5:33and then also move each cluster centroid to

5:35the mean of all the points with the same color.

5:39If you keep on doing those two steps,

5:41you find that there are no more changes to

5:44the colors of the points or to the locations of the cluster centroids.

5:48So this means that at this point,

5:51the k-means clustering algorithm has converged because applying

5:54those two steps over and over results in no further changes

5:59to either the assignment of points to

6:01the cluster centroids or to the location of the cluster centroids.

6:05In this example, it looks like k-means has done a pretty good job.

6:09It has found that these points up here correspond to

6:13one cluster and these points down here correspond to a second cluster.

6:19So now you've seen an illustration of how k-means works.

6:24The two key steps are,

6:25assign every point to the cluster centroid depending on

6:28what cluster centroid is nearest to,

6:31and second, move each cluster centroid to

6:35the average or the mean of all the points that were assigned to it.

6:39In the next video,

6:40we'll look at how to formalize this and write

6:43out the algorithm that does what you just saw in this video.

6:46Let's go on to the next video.0:02Welcome to this third and final course of this specialization on unsupervised learning,

0:07recommender systems, and reinforcement learning.

0:11Whereas in the first two courses, we spent a lot of time on supervised learning, in this

0:16third and final course, we'll talk about a new set of techniques that goes beyond supervised

0:21learning, and we'll give you an extra set of powerful tools that I hope you enjoy adding

0:27to your tool set.

0:28And by the time you finish this course and finish this specialization, I think you'll

0:33be well on your way to being an expert in machine learning.

0:36Let's take a look.

0:38This week, we'll start with unsupervised learning, and in particular, you'll learn about clustering

0:43algorithms, which is a way of grouping data into clusters, as well as anomaly detection.

0:50Both of these are techniques used by many companies today in important commercial applications.

0:57And by the end of this week, you know how these algorithms work and be able to get them

1:02to work for yourself as well.

1:04In the second week, you will learn about recommender systems.

1:09When you go to an online shopping website or a video streaming website, how does it

1:15recommend products or movies to you?

1:19Recommender systems is one of the most commercially important machine learning technologies.

1:24It's moving many billions of dollars worth of value or products or other things around.

1:31It's one of the technologies that receives surprisingly little attention from academia,

1:36despite how important it is.

1:37But in the second week, I hope you learn how these systems work and be able to implement

1:43one for yourself.

1:45And if you are curious about how online ad systems work, the description of recommender

1:51systems will also give you a sense for how those large online ad tech companies decide

1:57what ads to show you.

2:00In the third and final week of this course, you learn about reinforcement learning.

2:06You may have read in the news about reinforcement learning being great at playing a variety

2:11of video games, even outperforming humans.

2:14I've also used reinforcement learning many times myself to control a variety of different

2:20robots.

2:21Even though reinforcement learning is a new and emerging technology, that is, the number

2:27of commercial applications of reinforcement learning is not nearly as large as the other

2:32techniques covered in this week or in the previous two courses of this specialization.

2:37It's a technology that is exciting and is opening up a new frontier to what you can

2:44get learning algorithms to do.

2:46And so in the final week, you implement reinforcement learning yourself and use it to land a simulated

2:54moon lander.

2:57And when you see that working for yourself with your own code later in this course, I

3:02think you'll be impressed by what you can get reinforcement learning to do.

3:08So I'm really excited to be here with you to talk about unsupervised learning, recommender

3:12systems, and reinforcement learning.

3:15So let's go on to the next video where you learn about an important unsupervised learning

3:20algorithm called a clustering algorithm.

---
0:01Let's take a look at what the k-means clustering algorithm does.

0:05Let me start with an example.

0:08Here I've plotted a dataset with 30 unlabeled training examples.

0:13So there are 30 points,

0:15and what we'd like to do is run k-means on this dataset.

0:19The first thing that the k-means algorithm does is it will take

0:23a random guess at where might be the centers

0:27of the two clusters that you might ask it to find.

0:31In this example, I'm going to ask it to try to find two clusters.

0:36Later in this week,

0:37we'll talk about how you might decide how many clusters to find.

0:41But the very first step is it will randomly pick two points,

0:45which I've shown here as a red cross and a blue cross,

0:51at where might be the centers of two different clusters.

0:56This is just a random initial guess and they're not

0:58particularly good guesses, but it's a start.

1:02One thing I hope you take away from this video is that

1:05k-means will repeatedly do two different things.

1:09The first is assign points to cluster centroids,

1:13and the second is move cluster centroids.

1:16Let's take a look at what this means.

1:17The first of the two steps is it will go through each of

1:21these points and look at whether it is closer to

1:26the red cross or to the blue cross.

1:31The very first thing that k-means does is it will take

1:34a random guess at where are the centers of the cluster.

1:39The centers of the cluster are called cluster centroids.

1:45After it's made an initial guess at where the cluster centroids,

1:49it will go through all of these examples,

1:51x1 through x30, my 30 data points.

1:57For each of them, it will check if it is

1:59closer to the red cluster centroid shown by the red cross,

2:03or if it's closer to

2:04the blue cluster centroid shown by the blue cross.

2:08It will assign each of these points to

2:11whichever of the cluster centroids it is closer to.

2:14I'm going to illustrate that by

2:17painting each of these examples,

2:19each of these little round dots,

2:21either red or blue,

2:23depending on whether that example is

2:26closer to the red or to the blue cluster centroid.

2:30This point up here is closer to the red centroid,

2:33which is why it's painted red,

2:34whereas this point down there is

2:36closer to the blue cluster centroid,

2:38which is why I've now painted it blue.

2:41That was the first of the two things

2:45that k-means does over and over,

2:47which is assign points to cluster centroids.

2:50All that means is it will associate,

2:53which I'm illustrating with the color,

2:55every point of one of the cluster centroids.

2:58The second of the two steps that k-means does is,

3:02it will look at all of the red points and take an average of

3:07them and it will move the red cross to whatever is

3:12the average location of the red dots,

3:16which turns out to be here.

3:18So the red cross,

3:20that is the red cluster centroid will move here.

3:23Then we do the same thing for all the blue dots.

3:25Look at all the blue dots and take an average of

3:28them and move the blue cross over there,

3:32so you now have a new location

3:34for the blue cluster centroid as well.

3:37In the next video, we'll look at

3:39the mathematical formulas for how to do both of these steps.

3:43But now that you have these new and hopefully slightly improved

3:47guesses for the locations of the two cluster centroids,

3:51we'll look through all of the 30 training examples

3:54again and check for every one of them,

3:57whether it's closer to the red or

3:59the blue cluster centroid for the new locations.

4:02Then we will associate them,

4:05which I indicate by the color again,

4:07every point to the closer cluster centroid.

4:11If you do that, you see that a few of the points change color.

4:15So for example, this point is colored red because it

4:19was closer to the red cluster centroid previously.

4:22But if we now look again,

4:24it's now actually closer to the blue cluster centroid

4:26because the blue and red cluster centroids have moved.

4:30So if we go through and associate

4:33each point with the closer cluster centroid,

4:36you end up with this.

4:38Then we just repeat the second part of k-means again,

4:42which is look at all of the red dots and compute the average,

4:48and also look at all of the blue dots and

4:51compute the average location of all of the blue dots.

4:55It turns out that you end up moving

4:58the red cross over there and the blue cross over here.

5:02We repeat. Let's look at all of the points again and

5:05recolor them either red or blue

5:07depending on which cluster centroid it is closer to.

5:11So you end up with this.

5:13Then again, look at all of the red dots and take

5:16the average location and look at all the blue dots and take

5:18the average location and move the clusters to the new locations.

5:24It turns out that if you were to keep on repeating these two steps,

5:28that is, look at each point and

5:30assign it to the nearest cluster centroid,

5:33and then also move each cluster centroid to

5:35the mean of all the points with the same color.

5:39If you keep on doing those two steps,

5:41you find that there are no more changes to

5:44the colors of the points or to the locations of the cluster centroids.

5:48So this means that at this point,

5:51the k-means clustering algorithm has converged because applying

5:54those two steps over and over results in no further changes

5:59to either the assignment of points to

6:01the cluster centroids or to the location of the cluster centroids.

6:05In this example, it looks like k-means has done a pretty good job.

6:09It has found that these points up here correspond to

6:13one cluster and these points down here correspond to a second cluster.

6:19So now you've seen an illustration of how k-means works.

6:24The two key steps are,

6:25assign every point to the cluster centroid depending on

6:28what cluster centroid is nearest to,

6:31and second, move each cluster centroid to

6:35the average or the mean of all the points that were assigned to it.

6:39In the next video,

6:40we'll look at how to formalize this and write

6:43out the algorithm that does what you just saw in this video.

6:46Let's go on to the next video.

---

0:02In the last video, you saw an illustration of the k-means algorithm running.

0:07Now let's write out the k-means algorithm in detail so that you'd be able to implement

0:11it for yourself.

0:12Here's the k-means algorithm.

0:15The first step is to randomly initialize k cluster centroids, mu1, mu2, through mu k.

0:24In the example that we had, this corresponded to when we randomly chose a location for the

0:31red cross and for the blue cross corresponding to the two cluster centroids.

0:39In our example, k was equal to 2, so if the red cross was cluster centroid 1 and the blue

0:46cross was cluster centroid 2, these are just two indices to denote the first and the second

0:53cluster, then the red cross would be the location of mu1, and the blue cross would

1:01be the location of mu2.

1:05Just to be clear, mu1 and mu2 are vectors which have the same dimension as your training

1:12examples x1 through, say, x30 in our example.

1:17All of these are lists of two numbers, or they are two-dimensional vectors, or whatever

1:23dimension the training data had.

1:26So if we had n equals 2 features for each of the training examples, then mu1 and mu2

1:33will also be two-dimensional vectors, meaning vectors with two numbers in them.

1:39Having randomly initialized the k cluster centroids, k-means will then repeatedly carry

1:45out the two steps that you saw in the last video.

1:49The first step is to assign points to cluster centroids, meaning color each of the points

1:54either red or blue, corresponding to assigning them to cluster centroids 1 or 2 when k is

2:04equal to 2.

2:06Rinse it out in math.

2:08That means that we're going to, for i equals 1 through m, for all m training examples,

2:14we're going to set c i to be equal to the index, which can be anything from 1 to k,

2:20of the cluster centroid closest to the training example x i.

2:26Mathematically, you can write this out as computing the distance between x i and mu

2:31k, and in math, the distance between two points is often written like this.

2:38It is also called the L2 norm, and what you want to find is the value of k that minimizes

2:46this, because that corresponds to the cluster centroid mu k that is closest to the training

2:56example x i, and then the value of k that minimizes this is what gets set to c i.

3:07When you implement this algorithm, you find that it's actually a little bit more convenient

3:12to minimize the squared distance, because the cluster centroid with the smallest squared

3:18distance should be the same as the cluster centroid with the smallest distance, and when

3:26you look at this week's optional labs and practice labs, you see how to implement this

3:31in code for yourself.

3:34As a concrete example, this point up here is closer to the red or to cluster centroid

3:401, so if this was training example x 1, we will set c 1 to be equal to 1, whereas this

3:50point over here, if this was the 12 training example, this is closer to the second cluster

3:55centroid, the blue one, and so we will set this, the corresponding cluster assignment

4:01variable to 2, because it's closer to cluster centroid 2.

4:06So that's the first step of the k-means algorithm, assign points to cluster centroids.

4:12The second step is to move the cluster centroids, and what that means is for lowercase k equals

4:211 to capital K, the number of clusters, we're going to set the cluster centroid location

4:29to be updated to be the average or the mean of the points assigned to that cluster K.

4:35Concretely, what that means is we'll look at all of these red points, say, and look

4:40at their position on the horizontal axis, look at the value of the first feature x 1,

4:46and average that out, and compute the average value on the vertical axis as well, and after

4:52computing those two averages, you find that the mean is here, which is why mu 1, that

5:00is the location of the red cluster centroid, gets updated as follows.

5:06Similarly, we will look at all of the points that were colored blue, that is, with C i

5:13equals 2, and compute the average of the value on the horizontal axis, the average of their

5:20feature x 1, compute the average of their feature x 2, and those two averages give you

5:27the new location of the blue cluster centroid, which therefore moves over here.

5:33Just to write those out in math, if the first cluster had assigned to it training examples

5:411, 5, 6, and 10, just as an example, then what that means is you would compute the average

5:53this way.

5:54Notice that x 1, x 5, x 6, and x 10 are training examples, four training examples, so we divide

6:03by 4, and this gives you the new location of mu 1, the new cluster centroid 4, cluster

6:111.

6:12To be clear, each of these x values are vectors with two numbers in them, or n numbers in

6:19them if you have n features, and so mu will also have two numbers in it, or n numbers

6:26in it if you have n features instead of 2.

6:29Now there is one corner case to this algorithm, which is what happens if a cluster has zero

6:37training examples assigned to it?

6:38In that case, the second step, mu k, would be trying to compute the average of zero points,

6:45and that's not well defined.

6:47If that ever happens, the most common thing to do is to just eliminate that cluster so

6:52you end up with k minus 1 clusters, or if you really, really need k clusters, an alternative

6:59would be to just randomly reinitialize that cluster centroid and hope that it gets assigned

7:04at least some points next time around, but it's actually more common when running k-means

7:09to just eliminate a cluster if no points are assigned to it.

7:14Even though I've mainly been describing k-means for clusters that are well separated, so clusters

7:19that may look like this, where if you ask it to find three clusters, hopefully it will

7:26find these three distinct clusters, it turns out that k-means is also frequently applied

7:32to datasets where the clusters are not that well separated.

7:36For example, if you are a designer and manufacturer of cool t-shirts, and you want to decide how

7:44do I size my small, medium, and large t-shirts, how small should a small be, how large should

7:51a large be, and what should a medium-sized t-shirt really be?

7:56One thing you might do is collect data of people likely to buy your t-shirts based on

8:01their heights and weights, and you find that the height and weight of people tend to vary

8:08continuously on the spectrum without very clear clusters.

8:12Nonetheless, if you were to run k-means with, say, three cluster centroids, you might find

8:20that k-means would group these points into one cluster, these points into a second cluster,

8:26and these points into a third cluster.

8:29So if you're trying to decide exactly how to size your small, medium, and large t-shirts,

8:37you might then choose the dimensions of your small t-shirt to try to make it fit these

8:43individuals well, the medium-sized t-shirt to try to fit these individuals well, and

8:48the large t-shirt to try to fit these individuals well, with potentially the cluster centroids

8:55giving you a sense of what is the most representative height and weight that you want your three

9:00t-shirt sizes to fit.

9:03So this is an example of k-means working just fine and giving a useful result, even if the

9:10data does not lie in well-separated groups or clusters.

9:15So that was the k-means clustering algorithm.

9:18Assign cluster centroids randomly, and then repeatedly assign points to cluster centroids

9:23and move the cluster centroids.

9:25But what is this algorithm really doing, and do we think this algorithm will converge or

9:30might it just keep on running forever and never converge?

9:33To gain deeper intuition about the k-means algorithm and also see why we might hope this

9:38algorithm does converge, let's go on to the next video where you see that k-means is actually

9:44trying to optimize a specific cost function.

9:47Let's take a look at that in the next video.

---

0:01In the earlier clauses, clauses 1 and 2 of the specialization,

0:06you saw a lot of supervised learning algorithms as a technique training set posing a cost function

0:13and then using gradient descent or some other algorithm to optimize that cost function.

0:18It turns out that the Q-means algorithm that you saw in the last video is also optimizing a specific cost function,

0:26although the optimization algorithm that it uses to optimize that is not gradient descent,

0:31it's actually the algorithm that you already saw in the last video.

0:35Let's take a look at what all this means.

0:38Let's take a look at what is the cost function for k-means.

0:42To get started, as a reminder, this is the notation we've been using,

0:47where c i is the index of the cluster, so c i is some number from 1 through k,

0:55of the index of the cluster to which training example x i is currently assigned,

1:02and mu k is the location of cluster centroid k.

1:06Let me introduce one more piece of notation, which is when lowercase k equals c i,

1:15so mu subscript c i is the cluster centroid of the cluster to which example x i has been assigned.

1:24For example, if I were to look at some training example, say training example 10,

1:31and I were to ask, what's the location of the cluster centroid to which the 10th training example has been assigned?

1:39Well, I would then look up c 10.

1:42This would give me a number from 1 to k that tells me,

1:45was example 10 assigned to the red or the blue or some other cluster centroid?

1:51And then mu subscript c 10 is the location of the cluster centroid to which x 10 has been assigned.

2:01So, armed with this notation, let me now write out the cost function that k-means turns out to be minimizing.

2:11The cost function J, which is a function of c 1 through c m,

2:19these are all the assignments of points to cluster centroids, as well as mu 1 through mu K.

2:27These are the locations of all the cluster centroids, as defined as this expression on the right.

2:35It is the average, so 1 over m, of sum from i equals 1 to m,

2:41of the squared distance between every training example x i, as i goes from 1 through m,

2:49it is the squared distance between x i and mu subscript c i, so this quantity up here.

2:58In other words, the cost function for k-means is the average squared distance between every training example x i

3:06and the location of the cluster centroid to which the training example x i has been assigned.

3:13For this example up here, we would be measuring the distance between x 10 and mu subscript c 10,

3:21the cluster centroid to which x 10 has been assigned, and taking the square of that distance.

3:26That would be one of the terms over here that we're averaging over.

3:30It turns out that what the k-means algorithm is doing is trying to find assignments of points to cluster centroids,

3:39as well as find locations of cluster centroids that minimizes the squared distance.

3:45Visually, here's what you saw partway into the run of k-means in an earlier video.

3:53At this step, the cost function, if you were to compute it, would be to look at every one of the blue points

3:59and measure these distances and compute the square.

4:03Then also similarly, look at every one of the red points and compute these distances and compute the square.

4:11Then the average of the squares of all of these differences for the red and the blue points

4:17is the value of the cost function j at this particular configuration of the parameters for k-means.

4:30What it will do on every step is try to update the cluster assignments c 1 through c 30 in this example,

4:37or update the positions of the cluster centroids mu 1 and mu 2 in order to keep on reducing this cost function j.

4:45By the way, this cost function j also has a name in the literature.

4:50It's called the distortion function.

4:54I don't know that this is a great name,

4:56but if you hear someone talk about the k-means algorithm and the distortion or the distortion cost function,

5:02that's just what this formula j is computing.

5:06Let's now take a deeper look at the algorithm and why the algorithm is trying to minimize this cost function j,

5:13or why it's trying to minimize the distortion.

5:16Here on top, I've copied over the cost function from the previous slide.

5:21It turns out that the first part of k-means, where you assign points to cluster centroids,

5:27that turns out to be trying to update c 1 through c m to try to minimize the cost function j as much as possible,

5:37while holding mu 1 through mu k fixed.

5:40And the second step, in contrast, where you move the cluster centroid,

5:45it turns out that that is trying to leave c 1 through c m fixed,

5:50but to update mu 1 through mu k to try to minimize the cost function or the distortion as much as possible.

5:58Let's take a look at why this is the case.

6:00During the first step, if you want to choose the values of c 1 through c m,

6:06or save a particular value of c i to try to minimize this,

6:11well, what would make x i minus mu c i as small as possible?

6:20This is the distance, or the square distance, between a training example x i

6:26and the location of the cluster centroid to which it's been assigned.

6:31So if you want to minimize this distance, or this square distance,

6:35what you should do is assign x i to the closest cluster centroid.

6:42So to take a simplified example, if you have two cluster centroids,

6:47say cluster centroids 1 and 2, and just a single training example x i,

6:53if you were to assign it to cluster centroid 1,

6:57this square distance here would be this large distance, well, squared.

7:04And if you were to assign it to cluster centroid 2,

7:08then this square distance would be the square of this much smaller distance.

7:12So if you want to minimize this term, you would take x i and assign it to the closer cluster centroid,

7:18which is exactly what the algorithm is doing up here.

7:22So that's why the step where you assign points to cluster centroids is choosing the values for c i

7:28to try to minimize j, without changing mu 1 through mu k for now,

7:33but just choosing the values of c 1 through c m to try to make these terms as small as possible.

7:40How about the second step of the k-means algorithm?

7:43That is to move the cluster centroids.

7:46It turns out that choosing mu k to be average of the mean of the points assigned

7:52is the choice of these terms mu that will minimize this expression.

8:00To take a simplified example, say you have a cluster with just two points assigned to it, shown as follows.

8:10With the cluster centroid here, the average of the squared distances would be the distance of 1 here, squared,

8:19plus this distance here, which is 9, squared, and you take the average of these two numbers.

8:26And so that turns out to be 1 half of 1 plus 81, which turns out to be 41.

8:35But if you were to take the average of these two points, so 1 plus 11 over 2, that's equal to 6,

8:43and if you were to move the cluster centroid over here to the middle,

8:48then the average of these two squared distances turns out to be a distance of 5 and 5 here,

8:57so you end up with 1 half of 5 squared plus 5 squared, which is equal to 25.

9:04And this is a much smaller average squared distance than 41.

9:08And in fact, you can play around with the location of this cluster centroid

9:13and maybe convince yourself that taking this mean location, this average location,

9:18in the middle of these two training examples, that is really the value that minimizes the squared distance.

9:25So the fact that the k-means algorithm is optimizing a cost function J

9:30means that it is guaranteed to converge.

9:33That is, on every single iteration, the distortion cost function should go down or stay the same.

9:40But if it ever fails to go down or stay the same in the worst case,

9:44if it ever goes up, that means there's a bug in the code.

9:47It should never go up because every single step of k-means is setting the values C i and mu k

9:55to try to reduce the cost function.

9:58Also, if the cost function ever stops going down, that also gives you one way to test if k-means has converged.

10:06Once there's a single iteration where it stays the same, that usually means k-means has converged

10:12and you should just stop running the algorithm even further.

10:16Or in some rare cases, you will run k-means for a long time

10:20and the cost function or the distortion is just going down very, very slowly.

10:24And that's a bit like gradient descent, where maybe running it even longer might help a bit.

10:29But if the rate at which the cost function is going down has become very, very slow,

10:34you might also just say, this is good enough.

10:36I'm just going to say it's close enough to convergence

10:39and not spend even more compute cycles running the algorithm for even longer.

10:44So these are some of the ways that computing the cost function is helpful.

10:49It helps you figure out if the algorithm has converged.

10:52It turns out that there's one other very useful way to take advantage of the cost function,

10:59which is to use multiple different random initializations of the cluster centroids.

11:05It turns out if you do this, you can often find much better clusters using k-means.

11:10Let's take a look at the next video of how to do that.

---

0:01The very first step of the k-means clustering algorithm was to choose random locations as the initial guesses for the cluster centroids mu1 through mu k.

0:12But how do you actually take that random guess?

0:15Let's take a look at that in this video, as well as how you can take multiple attempts at the initial guesses for mu1 through mu k that will result in you finding a better set of clusters.

0:27Let's take a look.

0:28Here again is the k-means algorithm, and in this video, let's take a look at how you can implement this first step.

0:38When running k-means, you should pretty much always choose the number of cluster centroids k to be less than the training examples m.

0:47It doesn't really make sense to have k greater than m, because then there won't even be enough training examples to have at least one training example per cluster centroid.

0:58So in our earlier example, we had k equals 2 and m equals 30.

1:04In order to choose the cluster centroids, the most common way is to randomly pick k training examples.

1:17Here is a training set where if I were to randomly pick two training examples, maybe I end up picking this one and this one, and then we would set mu1 through mu k equal to these k training examples.

1:35So I might initialize my red cluster centroid here and initialize my blue cluster centroid over here in the example where k was equal to 2.

1:49It turns out that if this was your random initialization and you were to run k-means, you probably end up with k-means deciding that these are the two clusters in the data set.

2:02Note that this method of initializing the cluster centroids is a little bit different than what I had used in the illustration in the earlier videos,

2:10where I was initializing the cluster centroids mu1 and mu2 to be just random points rather than sitting on top of specific training examples.

2:19I've done that to make the illustrations clearer in the earlier videos, but what I'm showing in this slide is actually the much more commonly used way of initializing the cluster centroids.

2:31Now, with this method, there is a chance that you will end up with an initialization of the cluster centroids where the red crosses here and maybe the blue crosses here.

2:45Depending on how you choose the random initial cluster centroids, k-means will end up picking a different set of clusters for your data set.

2:56Let's look at a slightly more complex example where we're going to look at this data set and try to find three clusters, so k equals 3 in this data.

3:07If you were to run k-means with one random initialization of the cluster centroids, you may get this result up here.

3:18This looks like a pretty good choice, pretty good clustering of the data into three different clusters.

3:24But with a different initialization, say you had happened to initialize two of the cluster centroids within this group of points and one within this group of points,

3:35after running k-means, you might end up with this clustering, which doesn't look as good.

3:42This turns out to be a local optima in which k-means is trying to minimize the distortion cost function, that cost function J of C1 through Cm and mu1 through muk that you saw in the last video.

3:58But with this less fortunate choice of random initialization, it had just happened to get stuck in a local minima.

4:09Here's another example of a local minima where a different random initialization caused k-means to find this clustering of the data into three clusters, which again doesn't seem as good as the one that you saw up here on top.

4:26If you want to give k-means multiple shots at finding the best local optima, if you want to try multiple random initializations to give it a better chance of finding this good clustering up on top,

4:42one other thing you could do with the k-means algorithm is to run it multiple times and then to try to find the best local optima.

4:52It turns out that if you were to run k-means three times and end up with these three distinct clusterings, then one way to choose between these three solutions is to compute the cost function J for all three of these solutions,

5:10all three of these choices of clusters found by k-means, and then to pick one of these three according to which one of them gives you the lowest value for the cost function J.

5:23And in fact, if you look at this grouping of clusters up here, this green cross has relatively small square distances to all the green dots.

5:33The red cross has a relatively small distance to the red dots.

5:36And similarly, the blue cross, and so the cost function J would be relatively small for this example on top.

5:45But here, the blue cross has larger distances to all of the blue dots.

5:51And here, the red cross has larger distances to all of the red dots, which is why the cost function J for these examples down below would be larger,

6:03which is why if you pick from these three options, the one with the smallest distortion, the smallest cost function J, you end up selecting this choice of the three cluster centroids.

6:15So let me write this out more formally into an algorithm in which you would run k-means multiple times using different random initializations.

6:26Here's the algorithm.

6:28If you want to use 100 random initializations for k-means, then you would run 100 times randomly initialized k-means using the method that you saw earlier in this video.

6:44Pick k training examples and let the cluster centroids initially be the locations of those k training examples.

6:53Using that random initialization, run the k-means algorithm to convergence, and that will give you a choice of cluster assignments and cluster centroids.

7:05And then finally, you would compute the distortion, compute the cost function as follows.

7:11After doing this, say, 100 times, you would finally pick the set of clusters that gave the lowest cost.

7:21And it turns out that if you do this, it will often give you a much better set of clusters with a much lower distortion function than if you were to run k-means only a single time.

7:34I plugged in the number up here as 100.

7:38When I'm using this method, doing this somewhere between, say, 50 to 1,000 times would be pretty common, where if you run this procedure a lot more than 1,000 times, it tends to get computationally expensive and you tend to have diminishing returns when you run it a lot of times.

7:58Whereas trying at least maybe 50 or 100 random initializations will often give you a much better result than if you only had one shot at picking a good random initialization.

8:10But with this technique, you are much more likely to end up with this good choice of clusters on top than these less superior local minima down at the bottom.

8:20So that's it. When I'm using the k-means algorithm myself, I will almost always use more than one random initialization because it just causes k-means to do a much better job minimizing the distortion cost function and finding a much better choice for the cluster centroids.

8:37Before we wrap up our discussion of k-means, there's just one more video in which I hope to discuss with you the question of how do you choose the number of cluster centroids? How do you choose the value of k? Let's go on to the next video to take a look at that.

---

0:02The k-means algorithm requires as one of its inputs, k, the number of clusters you want

0:07it to find.

0:08But how do you decide how many clusters to use?

0:11Do you want 2 clusters, or 3 clusters, or 5 clusters, or 10 clusters?

0:15Let's take a look.

0:17For a lot of clustering problems, the right value of k is truly ambiguous.

0:24If I were to show different people the same dataset and ask, how many clusters do you

0:29see?

0:30There will definitely be people that will say, it looks like there are 2 distinct clusters,

0:37and they would be right.

0:39And there would also be others that will see actually 4 distinct clusters, and they would

0:48also be right.

0:50Because clustering is an unsupervised learning algorithm, you're not given the quote right

0:56answers in the form of specific labels to try to replicate.

1:01And so there are a lot of applications where the data itself does not give a clear indicator

1:08for how many clusters there are in it.

1:10And I think it truly is ambiguous if this data has 2, or 4, or maybe 3 clusters.

1:18If you take, say, the red one here and the 2 blue ones here, say.

1:23If you look at the academic literature on k-means, there are a few techniques to try

1:28to automatically choose the number of clusters to use for a certain application.

1:34I'll briefly mention one here that you may see others refer to, although I have to say

1:40I personally do not use this method myself.

1:45But one way to try to choose the value of k is called the ELBO method.

1:52And what that does is you would run k-means with a variety of values of k and plot the

2:00cost function or the distortion function j as a function of the number of clusters.

2:06What you find is that when you have very few clusters, say 1 cluster, the distortion function

2:12of the cost function j will be high.

2:15And as you increase the number of clusters, it will go down, maybe as follows.

2:22And if the curve looks like this, you say, well, it looks like the cost function is decreasing

2:28rapidly until we get to 3 clusters, but it decreases more slowly after that.

2:33So let's choose k equals 3.

2:36And this is called an ELBO, by the way, because think of it as analogous to that's your

2:42hand and that's your elbow over here.

2:47So plotting the cost function as a function of k, it could help you gain some insight.

2:53I personally hardly ever use the ELBO method myself to choose the right number of clusters

3:00because I think for a lot of applications, the right number of clusters is truly ambiguous.

3:06And you find that a lot of cost functions look like this, where it just decreases smoothly

3:12and it doesn't have a clear ELBO by which you could use to pick the value of k.

3:19By the way, one technique that does not work is to choose k so as to minimize the cost

3:25function j, because doing so will cause you to almost always just choose the largest possible

3:31value of k, because having more clusters will pretty much always reduce the cost function j.

3:38So choosing k to minimize the cost function j is not a good technique.

3:43So how do you choose the value of k in practice?

3:48Often you're running k-means in order to get clusters to use for some later or some downstream purpose.

3:55That is, you're going to take the clusters and do something with those clusters.

4:00So what I usually do and what I recommend you do is to evaluate k-means based on how

4:05well it performs for that later downstream purpose.

4:11Let me illustrate to the example of t-shirt sizing.

4:15One thing you could do is run k-means on this dataset to find three clusters, in which case

4:22you may find clusters like that.

4:25And this would be how you size your small, medium, and large t-shirts.

4:29But how many t-shirt sizes should there be?

4:32Well, it's ambiguous.

4:34If you were to also run k-means with five clusters, you might get clusters that look

4:42like this, and this would let you size t-shirts according to extra small, small, medium, large,

4:49and extra large.

4:51And so both of these are completely valid and completely fine groupings of the data

4:56into clusters.

4:58But whether you want to use three clusters or five clusters can now be decided based

5:04on what makes sense for your t-shirt business.

5:08There's a trade-off between how well the t-shirts will fit, depending on whether you have three

5:13sizes or five sizes, but there will be extra costs as well associated with manufacturing

5:20and shipping five types of t-shirts instead of three different types of t-shirts.

5:25So what I would do in this case is to run k-means with k equals three and k equals five,

5:31and then look at these two solutions to see, based on the trade-off between fit of t-shirts,

5:39where more sizes results in better fit, versus the extra costs of making more t-shirts, where

5:46making fewer t-shirts is simpler and less expensive, to try to decide what makes sense

5:51for the t-shirt business.

5:53When you get to the programming exercise, you also see there an application of k-means

5:58to image compression.

6:00This is actually one of the most fun visual examples of k-means.

6:06And there you see that there will be a trade-off between the quality of the compressed image,

6:10that is, how good the image looks, versus how much you can compress the image to save

6:16the space.

6:18And in that programming exercise, you see that you can use that trade-off to maybe manually

6:24decide what's the best value of k, based on how good you want the image to look, versus

6:30how large you want the compressed image size to be.

6:34So that's it for the k-means clustering algorithm.

6:38Congrats on learning your first unsupervised learning algorithm.

6:42You now know not just how to do supervised learning, but also unsupervised learning.

6:47And I hope you also have fun with the practice lab.

6:50It's actually one of the most fun exercises I know of for k-means.

6:55And with that, we're ready to move on to our second unsupervised learning algorithm, which

7:01is anomaly detection.

7:03How do you look at a dataset and find unusual or anomalous things in it?

7:08This turns out to be another one of the most commercially important applications of unsupervised

7:14learning.

7:15I've used this myself many times in many different applications.

7:18Let's go on to the next video to talk about anomaly detection.