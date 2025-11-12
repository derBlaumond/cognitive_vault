0:01One of the weaknesses of using a single decision tree is that that decision tree can be highly

0:07sensitive to small changes in the data.

0:11And one solution to make the algorithm less sensitive or more robust is to build not one

0:16decision tree, but to build a lot of decision trees, and we call that a tree ensemble.

0:22Let's take a look.

0:23With the example that we've been using, the best feature to split on at the root node

0:28turned out to be the ear shape, resulting in these two subsets of the data, and then

0:33building further subtrees on these two subsets of the data.

0:38But it turns out that if you were to take just one of the 10 examples and change it

0:42to a different cat, so that instead of having pointy ears, round face, whiskers absent,

0:48this new cat has floppy ears, round face, whiskers present, with just changing a single

0:55training example, the highest information gain feature to split on becomes the whiskers

1:00feature instead of the ear shape feature.

1:04As a result of that, the subsets of data you get in the left and right subtrees become

1:10totally different, and as you continue to run the decision tree learning algorithm recursively,

1:17you build out totally different subtrees on the left and right.

1:21So the fact that changing just one training example causes the algorithm to come up with

1:27a different split at the root, and therefore a totally different tree, that makes this

1:32algorithm just not that robust.

1:36That's why when you're using decision trees, you often get a much better result, that is,

1:41you get more accurate predictions, if you train not just a single decision tree, but

1:46a whole bunch of different decision trees.

1:49This is what we call a tree ensemble, which just means a collection of multiple trees.

1:55We'll see in the next few videos how to construct this ensemble of trees, but if you had this

2:01ensemble of three trees, each one of these is maybe a plausible way to classify cat versus

2:08not cat.

2:09If you had a new test example that you wanted to classify, then what you would do is run

2:15all three of these trees on your new example, and get them to vote on what is the final

2:21prediction.

2:22So this test example has pointy ears, a not round face shape, and whiskers are present,

2:28and so the first tree would carry an inference like this, and predict that it is a cat.

2:35The second tree's inference would follow this path through the tree, and therefore predict

2:41that it is not a cat, and the third tree would follow this path, and therefore predict

2:48that it is a cat.

2:51These three trees have made different predictions, and so what we'll do is actually get them

2:55to vote, and the majority vote of the predictions among these three trees is cat.

3:01So the final prediction of this ensemble of trees is that this is a cat, which happens

3:06to be the correct prediction.

3:08So the reason we use an ensemble of trees is by having lots of decision trees and having

3:14them vote, it makes your overall algorithm less sensitive to what any single tree may

3:20be doing, because it gets only one vote out of three, or one vote out of many, many different

3:25votes, and it makes your overall algorithm more robust.

3:29But how do you come up with all of these different plausible, but maybe slightly different decision

3:35trees in order to get them to vote?

3:37In the next video, we'll talk about a technique from statistics called sampling with replacement,

3:44and this will turn out to be a key technique that we'll use in the video after that in

3:48order to build this ensemble of trees.

3:51So let's go on to the next video to talk about sampling with replacement.

---
0:02In order to build a tree ensemble, we're going to need a technique called sampling with replacement.

0:08Let's take a look at what that means.

0:10In order to illustrate how sampling with replacement works,

0:14I'm going to show you a demonstration of sampling with replacement using four tokens that are colored red, yellow, green, and blue.

0:23So I actually have here with me four tokens of colors red, yellow, green, and blue.

0:29And I'm going to demonstrate what sampling with replacement using them looks like.

0:34Here is a black velvet bag, empty.

0:37And I'm going to take this example of four tokens and drop them in.

0:43And I'm going to sample four times with replacement out of this bag.

0:47And what that means, I'm going to shake it up.

0:49And can't see what I'm picking.

0:51Pick out one token.

0:52Turns out to be green.

0:54And the term with replacement means that before I take out the next token, I'm going to take this and put it back in.

1:01And shake it up again.

1:02And then take out another one.

1:04Yellow.

1:05Replace it.

1:06That's the with replacement part.

1:08And then go again.

1:10Blue.

1:11Replace it again.

1:12And then pick out one more, which is blue again.

1:16So that sequence of tokens I got was green, yellow, blue, blue.

1:21Notice that I got blue twice and didn't get red even a single time.

1:25If you were to repeat this sampling with replacement procedure multiple times, if you were to do it again, you might get red, yellow, red, green.

1:35Or green, green, blue, red.

1:38Or you might also get red, blue, yellow, green.

1:44Notice that the with replacement part of this is critical.

1:48Because if I were not replacing a token every time I sample, then if I were to pull out four tokens from my bag of four, I would always just get the same four tokens.

1:58That's why replacing a token after I pull it out each time is important to make sure I don't just get the same four tokens every single time.

2:07The way that sampling with replacement applies to building an ensemble of trees is as follows.

2:14We are going to construct multiple random training sets that are all slightly different from our original training set.

2:22In particular, we're going to take our ten examples of cats and dogs, and we're going to put the ten training examples in a theoretical bag.

2:33Please don't actually put a real cat or dog in a bag. That sounds inhumane.

2:38But you can take a training example and put it in a theoretical bag if you want.

2:42And using this theoretical bag, we're going to create a new random training set of ten examples of the exact same size as the original data set.

2:53And the way we'll do so is we'll reach in and pick out one random training example.

2:58And let's say we get this training example.

3:01Then we put it back into the bag and then again randomly pick out one training example.

3:08And so you get that. And you pick again and again and again.

3:14And notice now this fifth training example is identical to the second one that we had up there.

3:19But that's fine. And you keep going and keep going.

3:22And we get another repeated example and so on and so forth.

3:26Until eventually you end up with ten training examples, some of which are repeats.

3:31And you notice also that this training set does not contain all ten of the original training examples.

3:37But that's okay. That is part of the sampling with replacement procedure.

3:41The process of sampling with replacement lets you construct a new training set that's a little bit similar to but also pretty different from your original training set.

3:51It turns out that this would be the key building block for building an ensemble of trees.

3:56Let's take a look in the next video at how you could do that.

---
0:02Now that we have a way to use sampling with replacement to create new training sets that

0:07are a bit similar to but also quite different from the original training set, we're ready

0:12to build our first tree ensemble algorithm.

0:15In particular, in this video, we'll talk about the random forest algorithm, which is

0:20one powerful tree ensemble algorithm that works much better than using a single decision

0:25tree.

0:26Here's how we can generate an ensemble of trees.

0:29If you are given a training set of size m, then for b equals 1 to capital B, so we do

0:37this capital B times, you can use sampling with replacement to create a new training

0:43set of size m.

0:45So if you had 10 training examples, you will put the 10 training examples in that virtual

0:50bag and sample with replacement 10 times to generate a new training set with also 10 examples.

0:58And then you would train a decision tree on this data set.

1:02So here's the data set I've generated using sampling with replacement.

1:06If you look carefully, you may notice that some of the training examples are repeated,

1:10and that's okay.

1:11And if you train the decision tree algorithm on this data set, you end up with this decision

1:16tree.

1:18And having done this once, we would then go and repeat this a second time.

1:22If you use sampling with replacement to generate another training set of m or 10 training examples,

1:29this again looks a bit like the original training set, but it's also a little bit different.

1:34You then train a decision tree on this new data set, and you end up with a somewhat different

1:39decision tree, and so on.

1:42And you may do this a total of capital B times.

1:46Typical choice of capital B, the number of such trees you build might be around 100.

1:52People recommend any value from, say, 64 to 128.

1:57And having built an ensemble of, say, 100 different trees, you would then, when you

2:03are trying to make a prediction, get these trees to all vote on the correct final prediction.

2:08It turns out that setting capital B to be larger never hurts performance, but beyond

2:15a certain point, you end up with diminishing returns, and it doesn't actually get that

2:19much better when B is much larger than, say, 100 or so.

2:24And that's why I never use, say, 1,000 trees.

2:27That just slows down the computation significantly without meaningfully increasing the performance

2:33of the overall algorithm.

2:36Just to give this particular algorithm a name, this specific instantiation of tree ensemble

2:42is sometimes also called a bagged decision tree, and that refers to putting your training

2:47examples in that virtual bag.

2:50And that's why also we use the letters lowercase b and uppercase b here, because that stands

2:56for bag.

2:57There's one modification to this algorithm that will actually make it work even much

3:01better, and that changes this algorithm, the bagged decision tree, into the random forest

3:06algorithm.

3:07The key idea is that even with this sampling with replacement procedure, sometimes you

3:13end up with always using the same split at the root node and very similar splits near

3:19the root node.

3:20That didn't happen in this particular example, where a small change to the training set resulted

3:25in a different split at the root node, but for other training sets, it's not uncommon

3:31that for many or even all capital B training sets, you end up with the same choice of feature

3:38at the root node and at a few of the nodes near the root node.

3:42So there's one modification to the algorithm to further try to randomize the feature choice

3:48at each node that can cause the set of trees you learn to become more different from each

3:54other, so that when you vote them, you end up with an even more accurate prediction.

3:59The way this is typically done is, at every node, when choosing a feature to use the split,

4:07if n features are available, so in our example, we had three features available, rather than

4:14picking from all n features, we would instead pick a random subset of k less than n features

4:21and allow the algorithm to choose only from that subset of k features.

4:27So in other words, you would pick k features as the allowed features, and then out of those

4:32k features, choose the one with the highest information gain as the choice of feature

4:38to use the split.

4:39When n is large, say n is dozens or tens or even hundreds, a typical choice for the value

4:47of k would be to choose it to be square root of n.

4:51In our example, we had only three features, and this technique tends to be used more for

4:56larger problems with a larger number of features.

5:00With this further change to the algorithm, you end up with the random forest algorithm,

5:05which will work typically much better and becomes much more robust than just a single

5:10decision tree.

5:12One way to think about why this is more robust than a single decision tree is the sampling

5:17with replacement procedure causes the algorithm to explore a lot of small changes in the data

5:23already and is training different decision trees and is averaging over all of those changes

5:29to the data that the sampling with replacement procedure causes.

5:33And so this means that any little change further to the training set makes it less likely to

5:38have a huge impact on the overall output of the overall random forest algorithm, because

5:44it's already explored and is averaging over a lot of small changes to the training set.

5:50Before wrapping up this video, there's just one more thought I want to share with you,

5:53which is, where does a machine learning engineer go camping?

5:58In a random forest.

6:00Alright, go and tell that joke to your friends, I hope you enjoy it.

6:04The random forest is an effective algorithm and I hope you will use it in your work.

6:08Beyond the random forest, it turns out there's one other algorithm that works even better,

6:13which is a boosted decision tree.

6:16In the next video, let's talk about a boosted decision tree algorithm called XGBoost.

---
0:01Over the years, machine learning researchers have come up with a lot of different ways to build decision trees and decision tree ensembles.

0:09Today, by far the most commonly used way or implementation of decision tree ensembles or decision trees is an algorithm called XGBoost.

0:18It runs quickly, the open source implementations are easily used.

0:22It has also been used very successfully to win many machine learning competitions, as well as in many commercial applications.

0:29Let's take a look at how XGBoost works.

0:32There's a modification to the bagged decision tree algorithm that we saw in the last video that can make it work much better.

0:39Here again is the algorithm that we had written down previously.

0:43Given a training set of size m, you repeat capital B times use sampling replacement to create a new training set of size m and then train a decision tree on the new data set.

0:54And so the first time through this loop, we may create a training set like that and train a decision tree like that.

1:02But here's where we're going to change the algorithm, which is every time through this loop, other than the first time, there's a second time, third time, and so on.

1:11When sampling, instead of picking from all m examples with equal probability, with 1 over m probability, let's make it more likely that we'll pick misclassified examples that the previously trained trees do poorly on.

1:26In training and education, there's an idea called deliberate practice.

1:30For example, if you're learning to play the piano and you're trying to master a piece on the piano, rather than practicing the entire, say, 5-minute piece over and over, which is quite time-consuming,

1:43if you instead play the piece and then focus your attention on just the parts of the piece that you aren't yet playing that well and practice those smaller parts over and over,

1:52then that turns out to be a more efficient way for you to learn to play the piano well.

1:56And so this idea of boosting is similar.

1:59We're going to look at the decision trees we've trained so far and look at what we're still not yet doing well on.

2:05And then when building the next decision tree, we're going to focus more attention on the examples that we're not yet doing well.

2:11So rather than looking at all the training examples, we focus more attention on the subset of examples that we're not yet doing well on

2:19and get the new decision tree, the next decision tree, without the ensemble, to try to do well on them.

2:25And this is the idea behind boosting, and it turns out to help the learning algorithm learn to do better more quickly.

2:32So in detail, we will look at this tree that we have just built and go back to the original training set.

2:41Notice that this is the original training set, not one generated through something or replacement.

2:47And we'll go through all 10 examples and look at what this learned decision tree predicts on all 10 examples.

2:54So this fourth most column are their predictions.

2:58And I put a checkmark across next to each example, depending on whether the tree's classification was correct or incorrect.

3:09So what we'll do in the second time through this loop is we will sort of use something with replacement to generate another training set of 10 examples.

3:20But every time we pick an example from these 10, we'll give a higher chance of picking from one of these three examples that we're still misclassifying.

3:30And so this focuses the second decision tree's attention via a process like deliberate practice on the examples that the algorithm is still not yet doing that well on.

3:42And the boosting procedure will do this for a total of B times, where on each iteration, you'll look at what the ensemble of trees for trees 1, 2 up through B-1 are not yet doing that well on.

4:02And when you're building tree number B, you will then have a higher probability of picking examples that the ensemble of the previously built trees is still not yet doing well on.

4:14The mathematical details of exactly how much to increase the probability of picking this versus that example are quite complex, but you don't have to worry about them in order to use boosted tree implementations.

4:28And of different ways of implementing boosting, the most widely used one today is XGBoost, which stands for Extreme Gradient Boosting, which is an open source implementation of boosted trees that is very fast and efficient.

4:44XGBoost also has a good choice of the default splitting criteria and criteria for when to stop splitting.

4:50And one of the innovations in XGBoost is that it also has built-in regularization to prevent overfitting.

4:57And in machine learning competitions, such as a widely used competition site called Kaggle, XGBoost is often a highly competitive algorithm.

5:07In fact, XGBoost and deep learning algorithms seem to be the two types of algorithms that win a lot of these competitions.

5:15Oh, and one technical note, rather than doing sampling with replacements, XGBoost actually assigns different weights to different training examples, so it doesn't actually need to generate a lot of randomly chosen training sets.

5:29And this makes it even a little bit more efficient than using a sampling with replacement procedure.

5:34But the intuition that you saw on the previous slide is still correct in terms of how XGBoost is choosing examples to focus on.

5:42The details of XGBoost are quite complex to implement, which is why many practitioners will use the open source libraries that implement XGBoost.

5:54This is all you need to do in order to use XGBoost.

5:59You would import the XGBoost library as follows and initialize a model as an XGBoost classifier for the model.

6:09And then finally, this allows you to make predictions using this boosted decision trees algorithm.

6:16I hope that you find this algorithm useful for many applications that you may build in the future.

6:21Alternatively, if you want to use XGBoost for regression rather than for classification, then this line here just becomes XGBRegressor.

6:32And the rest of the code works similarly.

6:35So that's it for the XGBoost algorithm.

6:38We have just one last video for this week and for this course, where we'll wrap up and also talk about when should you use a decision tree versus maybe use a neural network.

6:48Let's go on to the last and final video of this week.

---
0:02Both decision trees, including tree ensembles, as well as neural networks, are very powerful,

0:08very effective learning algorithms.

0:10When should you pick one or the other?

0:12Let's look at some of the pros and cons of each.

0:15Decision trees and tree ensembles will often work well on tabular data, also called structured

0:21data.

0:22And what that means is, if your dataset looks like a giant spreadsheet, then decision trees

0:28would be worth considering.

0:30So for example, in the housing price prediction application, we had a dataset with features

0:36corresponding to the size of the house, the number of bedrooms, the number of floors,

0:41and the age of the home.

0:42And that type of data is stored in a spreadsheet with either categorical or continuous value

0:49features, and both for classification or for regression tasks, where you're trying to predict

0:53a discrete category or predict a number.

0:57All of these problems are ones that decision trees can do well on.

1:03In contrast, I would not recommend using decision trees and tree ensembles on unstructured data,

1:09and that's data such as images, video, audio, and text that you're less likely to store

1:15in a spreadsheet format.

1:17Neural networks, as we'll see in a second, will tend to work better for unstructured

1:21data tasks.

1:23One huge advantage of decision trees and tree ensembles is that they can be very fast to

1:28train.

1:30You might remember this diagram from the previous week, in which we talked about the iterative

1:36loop of machine learning development.

1:38If your model takes many hours to train, then that limits how quickly you can go through

1:44this loop and improve the performance of your algorithm.

1:48Because decision trees, including tree ensembles, tend to be pretty fast to train, that allows

1:53you to go through this loop more quickly and maybe more efficiently improve the performance

1:58of your learning algorithm.

2:00Finally, small decision trees may be human interpretable.

2:05If you are training just a single decision tree, and if that decision tree has only,

2:10say a few dozen nodes, you may be able to print out the decision tree to understand

2:16exactly how it's making decisions.

2:19I think that the interpretability of decision trees is sometimes a bit overstated, because

2:24when you build an ensemble of a hundred trees, and if each of those trees has hundreds of

2:29nodes, then looking at that ensemble to figure out what it's doing does become difficult

2:35and may need some separate visualization techniques.

2:38But if you have a small decision tree, you can actually look at it and see, oh, it's

2:42classifying whether something is a cat by looking at certain features in certain ways.

2:49If you've decided to use a decision tree or tree ensemble, I would probably use XGBoost

2:56for most of the applications I would work on.

2:59One slight downside of a tree ensemble is that it is a bit more expensive than a single

3:04decision tree, and so if you had a very, very constrained computational budget, you might

3:10use a single decision tree.

3:12But other than that setting, I would almost always use a tree ensemble and use XGBoost

3:17in particular.

3:18How about neural networks?

3:21In contrast to decision trees and tree ensembles, it works well on all types of data, including

3:26tabular or structured data, as well as unstructured data, as well as mixed data that includes

3:32both structured and unstructured components.

3:36Whereas on tabular structured data, neural networks and decision trees are often both

3:42competitive, on unstructured data, such as images, video, audio, and text, a neural network

3:48will really be the preferred algorithm and not a decision tree or tree ensemble.

3:54On the downside, though, neural networks may be slower than a decision tree.

4:00A large neural network can just take a long time to train.

4:05One of the benefits of neural networks includes that it works with transfer learning, and

4:10this is really important because for many applications where you have only a small dataset,

4:15being able to use transfer learning and carry out pre-training on a much larger dataset,

4:22that is critical to getting competitive performance.

4:26Finally, if you're building a system of multiple machine learning models working together,

4:32it might be easier to string together and train multiple neural networks than multiple decision trees.

4:38The reasons for this are quite technical, and you don't need to worry about it for the

4:42purpose of this course, but it relates to that even when you string together multiple

4:46neural networks, you can train them all together using gradient descent, whereas for decision

4:53trees, you can only train one decision tree at a time.

4:57So that's it.

4:58You've reached the end of the videos for this course on advanced learning algorithms.

5:03Thank you for sticking with me all this way, and congratulations on getting to the end

5:07of the videos on advanced learning algorithms.

5:10You've now learned how to build and use both neural networks and decision trees, and also

5:15heard about a variety of tips, practical advice, on how to get these algorithms to work well

5:21for you.

5:22But even with all that you've seen on supervised learning, that's just part of what learning

5:28algorithms can do.

5:30Supervised learnings need label datasets with the labels Y on your training set.

5:35There's another set of very powerful algorithms called unsupervised learning algorithms, where

5:40you don't even need labels Y for the algorithm to figure out very interesting patterns and

5:45to do things with the data that you have.

5:48So I look forward to seeing you also in the third and final course of this specialization,

5:53which will be on unsupervised learning.

5:57Now, before you finish up this course, I hope you also enjoy practicing the ideas of decision

6:02trees in their practice quizzes and in their practice labs.

6:06I'd like to wish you the best of luck in their practice labs, or for those of you that may

6:11be Star Wars fans, let me say, may the forest be with you.