0:02Welcome to the final week of this course on advanced learning algorithms.

0:06One of the learning algorithms that's very powerful, widely used in many applications,

0:11also used by many to win machine learning competitions, is decision trees and tree ensembles.

0:18Despite all the successes of decision trees, they somehow haven't received that much attention in academia,

0:25and so you may not hear about decision trees nearly that much.

0:28But it is a tool well worth having in your toolbox.

0:31So in this week, we'll learn about decision trees and you'll see how to get them to work for yourself.

0:36Let's dive in.

0:37To explain how decision trees work, I'm going to use as a running example this week a cat classification example.

0:43You're running a cat adoption center, and given a few features,

0:48you want to train a classifier to quickly tell you if an animal is a cat or not.

0:55I have here 10 training examples, and associated with each of these 10 examples,

1:02we're going to have features regarding the animal's ear shape, face shape, whether it has whiskers,

1:09and then the ground truth label that you want to predict is, is this animal a cat?

1:13So the first example has pointy ears, a round face, whiskers are present, and it is a cat.

1:20The second example has floppy ears, the face shape is not round, whiskers are present, and yes, that is a cat.

1:27And so on for the rest of the examples.

1:30This data set has five cats and five dogs in it.

1:34And the input features, X, are these three columns,

1:40and the target output that you want to predict, Y, is this final column of is this a cat or not.

1:47In this example, the features X take on categorical values.

1:52In other words, the features take on just a few discrete values.

1:57Ear shapes are either pointy or floppy, the face shape is either round or not round,

2:03and whiskers are either present or absent.

2:07And this is a binary classification task, because the labels are also 1 or 0.

2:14For now, each of the features, X1, X2, and X3, take on only two possible values.

2:22We'll talk about features that can take on more than two possible values,

2:27as well as continuous value features later in this week.

2:32So what is a decision tree?

2:35Here's an example of a model that you might get after training a decision tree learning algorithm

2:42on the data set that you just saw.

2:45The model that is output by the learning algorithm looks like a tree,

2:50and a picture like this is what computer scientists call a tree.

2:54If it looks nothing like the biological trees that you see out there to you, it's okay, don't worry about it.

3:01We'll go through an example to make sure that this computer science definition of a tree makes sense to you as well.

3:08Every one of these ovals or rectangles is called a node in the tree.

3:15And the way this model works is if you have a new test example.

3:20Here's a cat where the ear shape is pointy, face shape is round, and whiskers are present.

3:25The way this model will look at this example and make a classification decision is,

3:32we'll start with this example at this topmost node of the tree.

3:38This is called the root node of the tree.

3:42And we will look at the feature written inside, which is ear shape.

3:47Based on the value of the ear shape of this example, we'll either go left or go right.

3:55The value of the ear shape of this example is pointy, and so we'll go down the left branch of the tree like so,

4:05and end up at this oval node over here.

4:09We then look at the face shape of this example, which turns out to be round.

4:14And so we will follow this arrow down over here, and the algorithm will make an inference that it thinks this is a cat.

4:25And so you get to this node, and the algorithm will make a prediction that this is the cat.

4:30What I've shown on this slide is one specific decision tree model.

4:36To introduce a bit more terminology, this topmost node in the tree is called the root node.

4:46And all of these nodes, that is, all of these oval shapes, but excluding the boxes at the bottom,

4:52all of these are called decision nodes.

4:56And decision nodes, because they look at a particular feature, and then based on the value of the feature,

5:02causes you to decide whether to go left or right down the tree.

5:07Finally, these nodes at the bottom, these rectangular boxes, are called leaf nodes, and they make a prediction.

5:16If you haven't seen computer scientists' definitions of trees before,

5:21it may seem non-intuitive that the root of the tree is at the top, and the leaves of the tree are down at the bottom.

5:29Maybe one way to think about this is this is more akin to an indoor hanging plant,

5:35which is why the roots are up top, and then the leaves tend to fall down to the bottom of the tree.

5:41In this slide, I've shown just one example of a decision tree.

5:45Here are a few others.

5:47This is a different decision tree for trying to classify cat versus not cat.

5:54In this tree, to make a classification decision, you would again start at this topmost root node,

6:00and depending on the ear shape of an example, you go either left or right.

6:05If the ear shape is pointy, then you look at the whiskers feature,

6:08and depending on whether whiskers are present or absent, you go left or right again and classify cat versus not cat.

6:15And just for fun, here's a second example of a decision tree, here's a third one, and here's a fourth one.

6:22And among these different decision trees, some will do better and some will do worse on the training set

6:28or on the cross-validation and the test sets.

6:31So the job of the decision tree learning algorithm is, out of all possible decision trees,

6:36to try to pick one that hopefully does well on the training set,

6:40and that also ideally generalizes well to new data, such as your cross-validation and test sets as well.

6:48So it seems like there are a lot of different decision trees one could build for a given application.

6:54How do you get an algorithm to learn a specific decision tree based on a training set?

6:59Let's take a look at that in the next video.

---

0:01The process of building a decision tree, given a training set, has a few steps.

0:06In this video, let's take a look at the overall process of what you need to do to build a decision tree.

0:12Given a training set of 10 examples of cats and dogs like you saw in the last video,

0:19the first step of decision tree learning is we have to decide what feature to use at the root node,

0:28that is, the first node at the very top of the decision tree.

0:32Via an algorithm that we'll talk about in the next few videos,

0:35let's say that we decide to pick as the feature in the root node the ear shape feature.

0:42What that means is we will decide to look at all of our training examples,

0:47all 10 training examples shown here, and split them according to the value of the ear shape feature.

0:54In particular, let's pick out the five examples with pointy ears and move them over down to the left,

1:03and let's pick the five examples with floppy ears and move them down to the right.

1:09The second step is focusing just on the left part, or sometimes called the left branch of the decision tree,

1:16to decide what node to put over there, and in particular, what feature do we want to split on,

1:26or what feature do we want to use next.

1:29Via an algorithm that, again, we'll talk about later this week,

1:32let's say you decide to use the face shape feature there.

1:36What we'll do now is take these five examples and split these five examples into two subsets

1:43based on their value of the face shape.

1:46We'll take the four examples out of these five with a round face shape and move them down to the left,

1:54and the one example with a not round face shape and move it down to the right.

2:00Finally, we notice that these four examples are all cats.

2:04All four of them are cats.

2:07Rather than splitting further, we create a leaf node that makes a prediction that things that get down to that node are cats.

2:15Over here, we notice that none of the examples, zero of the one examples, are cats,

2:21or alternatively, 100% of the examples here are dogs.

2:26We can create a leaf node here that makes a prediction of not cat.

2:31Having done this on the left part, or the left branch of this decision tree,

2:35we now repeat a similar process on the right part, or the right branch of this decision tree

2:40and focus attention on just these five examples, which contains one cat and four dogs.

2:46We would have to pick some feature over here to use to split these five examples further.

2:53If we end up choosing the whiskers feature, we would then split these five examples

3:00based on whether whiskers are present or absent, like so.

3:05You notice that one of the one examples on the left are cats, and zero of the four are cats.

3:12Each of these nodes is completely pure, meaning that it's all cats or all not cats,

3:20and there's no longer a mix of cats and dogs.

3:23We can create these leaf nodes, making a cat prediction on the left and a not cat prediction here on the right.

3:31This is the process of building a decision tree.

3:35Through this process, there were a couple of key decisions that we had to make at various steps during the algorithm.

3:43Let's talk through what those key decisions were,

3:46and we'll keep on fleshing out the details of how to make these decisions in the next few videos.

3:51The first key decision was, how do you choose what feature to use to split on at each node?

3:58At the root node, as well as on the left branch and the right branch of the decision tree,

4:05we had to decide if there were a few examples at that node comprising a mix of cats and dogs,

4:12do you want to split on the ear shape feature, or the face shape feature, or the whiskers feature?

4:17We'll see in the next video that decision trees will choose what feature to split on in order to try to maximize purity.

4:25By purity, I mean you want to get to what subsets, which are as close as possible to all cats or all dogs.

4:33For example, if we had a feature that said, does this animal have cat DNA?

4:39We don't actually have this feature, but if we did, we could have split on this feature at the root node,

4:44which would have resulted in 5 out of 5 cats in the left branch and 0 out of 5 cats in the right branch,

4:51and both these left and right subsets of the data are completely pure,

4:56meaning that there's only one class, either cats only or not cats only, in both of these left and right sub-branches,

5:05which is why the cat DNA feature, if we had this feature, would have been a great feature to use.

5:11But with the features that we actually have, we had to decide whether to split on ear shape,

5:18which resulted in 4 out of 5 examples on the left being cats, and 1 out of 5 examples on the right being cats,

5:26or face shape, where it resulted in 4 out of 7 on the left and 1 out of 3 on the right,

5:32or whiskers, which resulted in 3 out of 4 examples being cats on the left and 2 out of 6 being not cats on the right.

5:40And so the decision tree learning algorithm has to choose between ear shape, face shape, and whiskers,

5:48which of these features results in the greatest purity of the labels on the left and right sub-branches.

5:58Because if you can get to a highly pure subset of examples,

6:04then you can either predict cat or predict not cat and get it mostly right.

6:10So the next video on entropy will talk about how to estimate impurity and how to minimize impurity.

6:19So the first decision we have to make when learning a decision tree is how to choose which feature to split on in each node.

6:28The second key decision you need to make when building a decision tree is to decide when do you stop splitting.

6:35The criteria that we used just now was until a node is either 100% all cats or 100% all dogs and not cats.

6:44Because at that point, it seems natural to build a leaf node that just makes a classification prediction.

6:52Alternatively, you might also decide to stop splitting when splitting a node further will result in the tree exceeding a maximum depth,

7:01where the maximum depth that you allow the tree to grow to is a parameter that you could decide.

7:07In a decision tree, the depth of a node is defined as the number of hops that it takes to get from the root node,

7:16that is the node at the very top, to that particular node.

7:20So the root node takes 0 hops to get to itself and is at depth 0.

7:25The nodes below it are at depth 1 and the nodes below it would be at depth 2.

7:32And so if you had decided that the maximum depth of the decision tree is, say, 2,

7:39then you would decide not to split any nodes below this level so that the tree never gets to depth 3.

7:51And one reason you might want to limit the depth of the decision tree is to make sure, first, the tree doesn't get too big and unwieldy,

8:00and second, by keeping the tree small, it makes it less prone to overfitting.

8:06Another criteria you might use to decide to stop splitting might be if the improvements in the purity score,

8:12which you'll see in a later video, are below a certain threshold.

8:16So if splitting a node results in minimum improvements to purity, or you'll see later, it actually decreases in impurity.

8:27But if the gains are too small, then you might not bother.

8:30Again, both to keep the tree smaller and to reduce the risk of overfitting.

8:35And finally, if the number of examples at a node is below a certain threshold, then you might also decide to stop splitting.

8:45So, for example, if at the root node we had split on the face shape feature,

8:51then the right branch would have had just three training examples with one cat and two dogs.

8:59And rather than splitting this into even smaller subsets,

9:03if you decided not to split further sets of examples with just three or fewer examples,

9:09then you would just create a decision node.

9:12And because there are mainly dogs, two out of three are dogs here,

9:17this would be a node that makes a prediction of not cat.

9:21And again, one reason you might decide this is not worth splitting on is to keep the tree smaller and to avoid overfitting.

9:28When I look at decision tree learning algorithms myself,

9:31sometimes I feel like, boy, there are a lot of different pieces, a lot of different things going on in this algorithm.

9:37Part of the reason it might feel like that is in the evolution of decision trees,

9:42there was one researcher that proposed a basic version of decision trees,

9:47and then a different researcher said, oh, we can modify this thing this way,

9:51such as here's a new criteria for splitting.

9:54Then a different researcher comes up with a different thing,

9:56like, oh, maybe we should stop splitting when it reaches a certain maximum depth.

10:00And over the years, different researchers came up with different refinements to the algorithm.

10:05As a result of that, it does work really well.

10:08But when you look at all the details of how to implement a decision tree,

10:11it feels like a lot of different pieces, such as why there's so many different ways to decide when to stop splitting.

10:17So if it feels like a somewhat complicated, messy algorithm to you, it does to me too.

10:23But these different pieces, they do fit together into a very effective learning algorithm.

10:28And what you learn in this course is the key, most important ideas on how to make it work well.

10:34And then at the end of this week, I'll also share with you some guidance,

10:39some suggestions for how to use open source packages so that you don't have to have too complicated a procedure for making all these decisions,

10:47like how do I decide to stop splitting so that you really get these algorithms to work well for yourself.

10:52But I want to reassure you that this algorithm seems complicated and messy.

10:56It frankly does to me too, but it does work well.

11:00Now, the next key decision that I want to dive more deeply into is how do you decide how to split at a node?

11:08So in the next video, let's take a look at this definition of entropy,

11:12which would be a way for us to measure purity or more precisely impurity in a node.

11:18Let's go on to the next video.