0:02In this video, we'll look at a way of measuring the purity of a set of examples.

0:07If the examples are all cats or a single class, then it's very pure.

0:11If it's all not cats, that's also very pure.

0:15But if it's somewhere in between, how do you quantify how pure is the set of examples?

0:20Let's take a look at the definition of entropy, which is a measure of the impurity of a set of data.

0:27Given a set of 6 examples like this, we have 3 cats and 3 dogs.

0:33Let's define p1 to be the fraction of examples that are cats.

0:38That is, the fraction of examples with a label 1. That's what the subscript 1 indicates.

0:43And so p1 in this example is equal to 3 out of 6.

0:49We're going to measure the impurity of a set of examples using a function called the entropy, which looks like this.

1:01The entropy function is conventionally denoted as capital H of this number p1.

1:10The function looks like this curve over here, where the horizontal axis is p1, the fraction of cats in the sample,

1:19and the vertical axis is the value of the entropy.

1:22In this example, where p1 is 3 out of 6, or 0.5, the value of the entropy of p1 would be equal to 1.

1:32You notice that this curve is highest when your set of examples is 50-50, so it's most impure.

1:41It has an impurity of 1, or really an entropy of 1, when your set of examples is 50-50.

1:47Whereas in contrast, if your set of examples was either all cats or all not cats, then the entropy is 0.

1:56Let's just go through a few more examples to gain further intuition about entropy and how it works.

2:02Here's a different set of examples with 5 cats and 1 dog.

2:08So p1, the fraction of positive examples, the fraction of examples labeled 1, is 5-6.

2:16So p1 is about 0.83, and if you read off that value at about 0.83, we find that the entropy of p1 is about 0.65,

2:31and here I'm writing it only to 2 significant digits.

2:34Here's one more example.

2:36This sample of 6 images has all cats, so p1 is 6 out of 6 because all 6 are cats,

2:44and the entropy of p1 is this point over here, which is 0.

2:48And so we see that as you go from 3-6 to 6 out of 6 cats, the impurity decreases from 1 to 0,

2:58or in other words, the purity increases as you go from a 50-50 mix of cats and dogs to all cats.

3:06Let's look at a few more examples.

3:09Here's another sample with 2 cats and 4 dogs.

3:13So p1 here is 2-6, which is 1-3, and if you read off the entropy at 0.33, it turns out to be about 0.92.

3:27And this is actually quite impure, and in particular, this set is more impure than this set because it's closer to a 50-50 mix,

3:40which is why the impurity here is 0.92 as opposed to 0.65.

3:46And finally, one last example, if we have a set of all 6 dogs, then p1 is equal to 0,

3:54and the entropy of p1 is just this number down here, which is equal to 0.

3:59So this is a 0 impurity, or this would be a completely pure set of all non-cats, or all dogs.

4:07Now, let's look at the actual equation for the entropy function, h of p1.

4:14Recall that p1 is the fraction of examples that are equal to cats.

4:21So if you have a sample that is 2-3 cats, then that sample must have 1-3 non-cats.

4:29So let me define p0 to be equal to the fraction of examples that are non-cats, to be just equal to 1-p1.

4:38The entropy function is then defined as negative p1 log p1,

4:45and by convention, when computing entropy, we take logs to base 2 rather than to base e,

4:54and then minus p0 log base 2 of p0.

5:00Alternatively, this is also equal to negative p1 log p1 minus 1-p1 log 1-p1.

5:14And if you were to plot this function on a computer, you find that it would be exactly this function on the left.

5:21And we take log base 2 just to make the peak of this curve equal to 1.

5:27If you were to take log of base e, or the base of natural logarithms, then that just vertically scales this function.

5:35And it will still work, but the number has become a bit hard to interpret

5:39because the peak of the function isn't a nice round number like 1 anymore.

5:44One note on computing this function, if p1 or p0 is equal to 0,

5:54then an expression like this will look like 0 log of 0.

6:00And log of 0 is technically undefined. It is actually negative infinity.

6:06But by convention, for the purposes of computing entropy, we'll take 0 log 0 to be equal to 0,

6:13and that will correctly compute the entropy at 0 or at 1 to be equal to 0.

6:20If you're thinking that this definition of entropy looks a little bit like the definition of the logistic loss

6:27that we learned about in the last course,

6:29there is actually a mathematical rationale for why these two formulas look so similar.

6:35But you don't have to worry about it, and we won't get into it in this class.

6:39But applying this formula for entropy should work just fine when you're building a decision tree.

6:44To summarize, the entropy function is a measure of the impurity of a set of data.

6:50It starts from 0, goes up to 1, and then comes back down to 0

6:54as a function of the fraction of positive examples in your sample.

6:59There are other functions that look like this, that go from 0 up to 1 and then back down.

7:03For example, if you look in open source packages, you may also hear about something called the Gini criteria,

7:09which is another function that looks a lot like the entropy function,

7:13and that will work well as well for building decision trees.

7:16But for the sake of simplicity in these videos, I'm going to focus on using the entropy criteria,

7:23which will usually work just fine for most applications.

7:27Now that we have this definition of entropy, in the next video,

7:31let's take a look at how you can actually use it to make decisions

7:34as to what feature to split on in the nodes of a decision tree.

---
0:01When building a decision tree, the way we'll decide what feature to split on at a node

0:07will be based on what choice of feature reduces entropy the most.

0:12Reduces entropy, or reduces impurity, or maximizes purity.

0:17In decision tree learning, the reduction of entropy is called information gain.

0:22Let's take a look in this video at how to compute information gain, and therefore choose

0:28what feature to use to split on at each node in your decision tree.

0:32Let's use the example of deciding what feature to use at the root node of the decision tree

0:38we're building just now, or recognizing cats versus not cats.

0:43If we had split using the ear shape feature at the root node, this is what we would have

0:49gotten.

0:51Five examples on the left, and five on the right.

0:54And on the left, we would have four out of five cats, so P1 would be equal to four-fifths,

1:03or 0.8.

1:04And on the right, one out of five are cats, so P1 is equal to one-fifth, or 0.2.

1:10If you apply the entropy formula from the last video to this left subset of data and

1:16this right subset of data, we find that the degree of impurity on the left is entropy

1:22of 0.8, which is about 0.72, and on the right, the entropy of 0.2 turns out also to be 0.72.

1:35So this would be the entropy at the left and right sub-branches if we were to split on

1:42the ear shape feature.

1:44One other option would be to split on the face shape feature.

1:49If we've done so, then on the left, for the seven examples, would be cats, so P1 is four-sevenths,

1:57and on the right, one-third are cats.

2:00So P1 on the right is one-third, and the entropy of four-sevenths and the entropy of one-third

2:07are 0.99 and 0.92.

2:10So the degree of impurity in the left and right node seems much higher, 0.99 and 0.92,

2:17compared to 0.72 and 0.72.

2:20Finally, the third possible choice of feature to use at the root node would be the whiskers

2:25feature, in which case you split based on whether whiskers are present or absent.

2:30In this case, P1 on the left is three-quarters, P1 on the right is two-sixths, and the entropy

2:36values are as follows.

2:39So the key question we need to answer is, given these three options of a feature to

2:44use at the root node, which one do we think works best?

2:50It turns out that rather than looking at these entropy numbers and comparing them, it would

2:59be useful to take a weighted average of them, and here's what I mean.

3:05If there's a node with a lot of examples in it, with high entropy, that seems worse than

3:11if there was a node with just a few examples in it with high entropy, because entropy as

3:16a measure of impurity is worse if you have a very large and impure dataset, compared

3:22to just a few examples in a branch of the tree that is very impure.

3:28So the key decision is, of these three possible choices of features to use at the root node,

3:34which one do we want to use?

3:37What we're going to do with each of these splits is two numbers, the entropy on the

3:41left sub-branch and the entropy on the right sub-branch, and in order to pick from these,

3:47we'd like to actually combine these two numbers into a single number, so we can just pick

3:52of these three choices which one works best.

3:55And the way we're going to combine these two numbers is by taking a weighted average, because

4:02how important it is to have low entropy in, say, the left or right sub-branch also depends

4:08on how many examples went into the left or right sub-branch, because if there are a lot

4:13of examples in, say, the left sub-branch, then it seems more important to make sure

4:18that that left sub-branch's entropy value is low.

4:23So in this example, we have 5 of the 10 examples went to the left sub-branch, so we can compute

4:31the weighted average as 5 of the 10 times the entropy of 0.8, and then add to that 5

4:37of the 10 examples also went to the right sub-branch, plus 5 tenths times the entropy

4:42of 0.2.

4:46Now for this example in the middle, the left sub-branch had received 7 out of 10 examples,

4:54and so we're going to compute 7 tenths times the entropy of 0.57, plus the right sub-branch

5:04had 3 out of 10 examples, so plus 3 tenths times the entropy of 0.33 of 1 third.

5:12And finally, on the right, we'll compute 4 tenths times the entropy of 0.75, plus 6 tenths

5:20times the entropy of 0.33.

5:24And so the way we will choose a split is by computing these 3 numbers and picking whichever

5:31one is lowest, because that gives us the left and right sub-branches with the lowest average

5:38weighted entropy.

5:40In the way that decision trees are built, we're actually going to make one more change

5:44to these formulas to stick to the convention in decision tree building, but it won't

5:50actually change the outcome, which is rather than computing this weighted average entropy,

5:56we're going to compute the reduction in entropy compared to if we hadn't split at all.

6:02So if we go to the root note, remember that at the root note we had started off with all

6:0710 examples of the root note, with 5 cats and 5 dogs, and so at the root note we had

6:14p1 equals 5 tenths, or 0.5, and so the entropy of the root note, entropy of 0.5, was actually

6:24equal to 1.

6:25This was maximum impurity because it was 5 cats and 5 dogs.

6:30So the formula that we're actually going to use for choosing a split is not this weighted

6:35entropy at the left and right sub-branches, instead it's going to be the entropy at the

6:41root note, which is entropy of 0.5, then minus this formula.

6:48And in this example, if you work out the math, it turns out to be 0.28.

6:53For the face shape example, we again compute entropy at the root note, entropy of 0.5,

6:58minus this, which turns out to be 0.03, and for whiskers, compute that, which turns out

7:07to be 0.12.

7:10These numbers that we just calculated, 0.28, 0.03, and 0.12, these are called the information

7:16gain, and what it measures is the reduction in entropy that you get in your tree, resulting

7:23from making a split.

7:25Because the entropy was originally 1 at the root note, and by making the split, you end

7:33up with a lower value of entropy, and the difference between those two values is the

7:37reduction in entropy, and that's 0.28 in the case of splitting on the ear shape.

7:44So why do we bother to compute reduction in entropy rather than just entropy at the left

7:50and right sub-branches?

7:52It turns out that one of the stopping criteria for deciding when to not bother to split any

7:57further is if the reduction in entropy is too small, in which case you could decide

8:02you're just increasing the size of the tree unnecessarily and risking overfitting by splitting

8:07and just decide to not bother if the reduction in entropy is too small below a threshold.

8:13In this example, splitting on ear shape results in the biggest reduction in entropy, 0.28,

8:20is bigger than 0.03 or 0.12, and so we would choose to split on the ear shape feature at

8:27the root note.

8:29On the next slide, let's give a more formal definition of information gain.

8:34And by the way, one additional piece of notation that we'll introduce also in the next slide

8:39is these numbers, 5 tenths and 5 tenths, I'm going to call this w left because that's the

8:45fraction of examples that went to the left branch, and I'm going to call this w right

8:51because that's the fraction of examples that went to the right branch, whereas for this

8:55another example, w left would be 7 tenths and w right would be 3 tenths.

9:00So let's now write down the general formula for how to compute information gain.

9:08Using the example of splitting on the ear shape feature, let me define p1 left to be

9:14equal to the fraction of examples in the left subtree that have a positive label, that are cats.

9:22And so in this example, p1 left would be equal to 4 fifths, and also let me define w left

9:30to be the fraction of examples out of all the examples at the root note that went to

9:35the left sub branch, and so in this example, w left would be 5 tenths.

9:41Similarly, let's define p1 right to be, of all the examples in the right branch, the

9:49fraction that are positive examples, and so if one out of five of these examples being

9:53cats, that would be 1 fifth, and similarly w right is 5 tenths.

9:59The fraction of examples that went to the right sub branch.

10:03And let's also define p1 root to be the fraction of examples that are positive in the root

10:11note.

10:12So in this case, this would be 5 tenths, or 0.5.

10:19Information gain is then defined as the entropy of p1 root, so what's the entropy at the root

10:26note, minus that weighted entropy calculation that we had on the previous slide, minus

10:33w left, this would be 5 tenths in the example, times the entropy applied to p1 left, that's

10:39entropy on the left sub branch, plus w right, the fraction of examples that went to the

10:45right branch, times entropy of p1 right.

10:51And so with this definition of entropy, you can calculate the information gain associated

10:57with choosing any particular feature to split on in the note, and then out of all the possible

11:04features you could choose to split on, you can then pick the one that gives you the highest

11:08information gain, and that will result in hopefully increasing the purity of your subset

11:16of data that you get on the left and right sub branches of your decision tree.

11:21And that will result in choosing a feature to split on that increases the purity of your

11:28subset of data in both the left and right sub branches of your decision tree.

11:33Now that you know how to calculate information gain, or reduction in entropy, you know how

11:38to pick a feature to split on at a note.

11:41Let's put all the things we've talked about together into the overall algorithm for building

11:47a decision tree, given a training set.

11:49Let's go see that in the next video.

---
0:02The information gain criteria lets you decide how to choose one feature to split at one node.

0:07Let's take that and use that in multiple places through a decision tree in order to figure out how to build a large decision tree with multiple nodes.

0:16Here's the overall process of building a decision tree.

0:19Start with all training examples at the root node of the tree and calculate the information gain for all possible features and pick the feature to split on that gives the highest information gain.

0:33Having chosen this feature, you would then split the dataset into two subsets according to the selected feature and create left and right branches of the tree

0:44and send the training examples to either the left or the right branch depending on the value of that feature for that example.

0:53And this allows you to have made a split at the root node.

0:58After that, you would then keep on repeating the splitting process on the left branch of the tree, on the right branch of the tree, and so on, and keep on doing that until the stopping criteria is met.

1:12Where the stopping criteria can be when a node is 100% a single class, so when it has reached entropy of zero,

1:21or when further splitting a node will cause a tree to exceed the maximum depth that you have set.

1:27Or if the information gain from an additional split is less than a threshold, or if the number of examples in a node is below a threshold.

1:38And so you would keep on repeating the splitting process until the stopping criteria that you've chosen, which could be one or more of these criteria, is met.

1:50Let's look at an illustration of how this process will work.

1:54We started all of the examples at the root node, and based on computing information gain for all three features, decide that ear shape is the best feature to split on.

2:07Based on that, we create left and right sub-branches and send the subset of the data with pointy vs. floppy ears to the left and right sub-branches.

2:18So let me cover up the root node and the right sub-branch and just focus on the left sub-branch, where we have these five examples.

2:26Let's say our splitting criteria is to keep splitting until everything in the node belongs to a single class, so either all cats or all dogs.

2:35We would look at this node and see if it meets the splitting criteria, and it does not, because there is a mix of cats and dogs here.

2:43The next step is to then pick a feature to split on.

2:47We then go through the features one at a time and compute the information gain of each of those features as if this node were the new root node of a decision tree that was trained using just five training examples shown here.

3:06So we would compute the information gain for splitting on the whiskers feature, the information gain on splitting on the face shape feature,

3:14and it turns out that the information gain for splitting on ear shape will be zero because all of these have the same pointy ear shape.

3:22Between whiskers and face shape, face shape turns out to have the highest information gain, so we're going to split on face shape, and that allows us to build left and right sub-branches as follows.

3:36For the left sub-branch, we'll check for the criteria for whether or not we should stop splitting, and we have all cats here.

3:44The stopping criteria is met, and we create a leaf node that makes a prediction of cat.

3:50And for the right sub-branch, we find that it is all dogs, and so we will also stop splitting since we've met the splitting criteria and put a leaf node there that predicts not cat.

4:03So having built out this left sub-tree, we can now turn our attention to building the right sub-tree.

4:10Let me now again cover up the roots node and the entire left sub-tree.

4:15To build out the right sub-tree, we have these five examples here, and again, the first thing we do is check if the criteria to stop splitting has been met.

4:25The criteria being whether or not all the examples are single class, we've not met the criteria, and so we'll decide to keep splitting in this right sub-branch as well.

4:37And in fact, the procedure for building the right sub-branch will be a lot like as if you were training a decision tree learning algorithm from scratch, where the data set you have comprises just these five training examples.

4:52And so, again, computing information gain for all of the possible features to split on, you find that the whiskers feature gives the highest information gain.

5:03Split this set of five examples according to whether whiskers are present or absent, check if the criteria to stop splitting are met in the left and right sub-branches here, and decide that they are, and so you end up with leaf nodes that predict cat and not cat.

5:19And so this is the overall process for building the decision tree.

5:25Notice that there's an interesting aspect of what we've done, which is after we decided what to split on at the root node, the way we built the left sub-tree was by building a decision tree on a subset of five examples.

5:43And the way we built the right sub-tree was by, again, building a decision tree on a subset of five examples.

5:51In computer science, this is an example of a recursive algorithm.

5:57And all that means is the way you build a decision tree at the root is by building other smaller decision trees in the left and the right sub-branches.

6:08So recursion in computer science refers to writing code that calls itself.

6:14And the way this comes up in building a decision tree is you build the overall decision tree by building smaller sub-decision trees and then putting them all together.

6:25So that's why if you look at software implementations of decision trees, you see sometimes references to a recursive algorithm.

6:34But if you don't feel like you fully understood this concept of recursive algorithms, don't worry about it.

6:40You'll still be able to fully complete this week's assignments as well as use libraries to get decision trees to work for yourself.

6:48But if you're implementing a decision tree algorithm from scratch, then a recursive algorithm turns out to be one of the steps you have to implement.

6:59And by the way, you may be wondering how to choose the maximum depth parameter.

7:04There are many different possible choices, but some of the open source libraries will have good default choices that you can use.

7:12One intuition is the larger the maximum depth, the bigger the decision tree you're willing to build.

7:19And this is a bit like fitting a higher degree polynomial or training a larger neural network.

7:25It lets the decision tree learn a more complex model, but it also increases the risk of overfitting if it's fitting a very complex function to your data.

7:35In theory, you could use cross-validation to pick parameters like the maximum depth, where you try out different values of the maximum depth and pick what works best on the cross-validation set.

7:46Although in practice, the open source libraries have even somewhat better ways to choose this parameter for you.

7:52Or another criteria that you can use to decide when to start splitting is if the information gain from an additional split is less than a certain threshold.

8:03So if any feature you split on achieves only a small reduction in entropy or a very small information gain, then you might also decide to not bother.

8:13And finally, you can also decide to start splitting when the number of examples in the node is below a certain threshold.

8:21So that's the process of building a decision tree.

8:24Now that you've learned the decision tree, if you want to make a prediction, you can then follow the procedure that you saw in the very first video of this week,

8:32where you take a new example, say a test example, and start at the root and keep on following the decisions down until you get to the leaf node, which then makes the prediction.

8:44Now that you know the basic decision tree learning algorithm, in the next few videos, I'd like to go into some further refinements of this algorithm.

8:52So far, we've only used features that take on two possible values, but sometimes you have a feature that takes on categorical or discrete values, but maybe more than two values.

9:03Let's take a look in the next video at how to handle that case.

---

0:02In the example we've seen so far, each of the features could take on only one of two

0:07possible values.

0:08The ear shape was either pointy or floppy, the face shape was either round or not round,

0:14and whiskers were either present or absent.

0:17But what if you have features that can take on more than two discrete values?

0:22In this video, we'll look at how you can use one-hot encoding to adjust features like

0:27that.

0:28Here's a new training set for our Pet Adoption Center application, where all the data is

0:34the same except for the ear shape feature.

0:37Rather than the ear shape only being pointy and floppy, it can now also take on an oval

0:44shape.

0:46And so the ear shape feature is still a categorical value feature, but it can take on three possible

0:53values instead of just two possible values.

0:57And this means that when you split on this feature, you end up creating three subsets

1:02of the data and end up building three sub-branches for this tree.

1:09But in this video, I'd like to describe a different way of adjusting features that can

1:16take on more than two values, which is to use a one-hot encoding.

1:22In particular, rather than using an ear shape feature that can take on any of three possible

1:27values, we're instead going to create three new features, where one feature is, does this

1:36animal have pointy ears, a second is, does it have floppy ears, and a third is, does

1:41it have oval ears.

1:43And so for the first example, whereas we previously had ear shape as pointy, we will now instead

1:51say that this animal has a value for the pointy ear feature of 1 and 0 for floppy and oval.

2:00Whereas previously, for the second example, we previously said it had oval ears, now we'll

2:05say that it has a value of 0 for pointy ears, because it doesn't have pointy ears.

2:12It also doesn't have floppy ears, but it does have oval ears, which is why this value here

2:16is 1, and so on for the rest of the examples in the dataset.

2:21And so instead of one feature taking on three possible values, we've now constructed three

2:27new features, each of which can take on only one of two possible values, either 0 or 1.

2:35In a little bit more detail, if a categorical feature can take on k possible values, k was

2:423 in our example, then we will replace it by creating k binary features that can only

2:49take on the values 0 or 1.

2:52And you notice that among all of these three features, if you look at any row here, exactly

2:59one of the values is equal to 1.

3:03And that's what gives this method of feature construction the name one-hot encoding.

3:08And because one of these features will always take on the value 1, that's the hot feature,

3:14and hence the name one-hot encoding.

3:17And with this choice of features, we're now back to the original setting of where each

3:22feature only takes on one of two possible values, and so the decision tree learning

3:26algorithm that we've seen previously will apply to this data with no further modifications.

3:33Just as an aside, even though this week's material has been focused on training decision

3:39tree models, the idea of using one-hot encodings to encode categorical features also works

3:45for training neural networks.

3:48In particular, if you were to take the phase shape feature and replace round and not round

3:54with 1 and 0, where round gets mapped to 1, not round gets mapped to 0, and so on, and

4:02for whiskers, similarly, replace presence with 1 and absence with 0, then notice that

4:10we have taken all the categorical features we had, where we had three possible values

4:15for ear shape, two for phase shape, and one for whiskers, and encoded it as a list of

4:20these five features, three from the one-hot encoding of ear shape, one from phase shape,

4:27one from whiskers, and now this list of five features can also be fed to a neural network

4:32or to logistic regression to try to train a cat classifier.

4:37So one-hot encoding is a technique that works not just for decision tree learning, but also

4:43lets you encode categorical features using 1s and 0s so that it can be fed as inputs

4:50to a neural network as well, which expects numbers as inputs.

4:55So that's it.

4:56With a one-hot encoding, you can get your decision tree to work on features that can

5:00take on more than two discrete values, and you can also apply this to neural network

5:06or linear regression or logistic regression training.

5:10But how about features that are numbers, that can take on any value, not just a small number

5:16of discrete values?

5:17In the next video, let's look at how you can get the decision tree to handle continuous

5:22value features that can be any number.

---

0:01Let's look at how you can modify Decision Tree to work with features that aren't just discrete value,

0:06but continuous value, that is, features that can be any number. Let's start with an example.

0:12I have modified the Cat Adoption Center dataset to add one more feature,

0:17which is the weight of the animal in pounds. On average, between cats and dogs, cats are

0:26a little bit lighter than dogs, although there are some cats that are heavier than some dogs,

0:30but so the weight of an animal is a useful feature for deciding if it is a cat or not.

0:38So how do you get a Decision Tree to use a feature like this? The Decision Tree learning

0:43algorithm will proceed similarly as before, except that rather than considering splitting

0:49just on ear shape, face shape, and whiskers, you have to consider splitting on ear shape,

0:53face shape, whiskers, or weight. If splitting on the weight feature gives better information

1:00gain than the other options, then you will split on the weight feature.

1:04But how do you decide how to split on the weight feature? Let's take a look.

1:10Here's a plot of the data at the root node. I've plotted on the horizontal axis the weight of the

1:17animal, and the vertical axis is cat on top and not cat below. So the vertical axis indicates the

1:24label Y being 1 or 0. The way we would split on the weight feature would be if we were to split

1:32the data based on whether or not the weight is less than or equal to some value, let's say 8 or

1:39some other number. That will be the job of the learning algorithm to choose. And what we should

1:46do when considering splitting on the weight feature is to consider many different values of

1:53this threshold and then to pick the one that is the best. And by the best, I mean the one that

1:59results in the best information gain. So in particular, if you were considering splitting

2:06the examples based on whether the weight is less than or equal to 8, then you would be splitting

2:13this data set into two subsets, where the subset on the left has two cats, and the subset on the

2:20right has three cats and five dogs. So if you were to calculate our usual information gain calculation,

2:30you'd be computing the entropy at the root node, entropy of 0.5, minus now two-tenths

2:39times entropy of the left split has two out of two cats, so entropy of two out of two,

2:46plus the right split has eight out of ten examples, and the entropy of the eight examples on the right

2:56three are cats, so entropy of three-eighths, and this turns out to be 0.24. So this would be

3:03information gain if you were to split on whether the weight is less than or equal to 8.

3:09But we should try other values as well. So what if you were to split on whether or not the weight

3:15is less than or equal to 9? And that corresponds to this new line over here, and the information

3:25gain calculation becomes h of 0.5 minus, so now we have four examples in the left split, all cats,

3:33so that's 4 to 10 times entropy of 4 to 4, plus six examples on the right of which you have one

3:41cat, so that's six-tenths times h of 1.6, which is equal to, it turns out, 0.61. So the information

3:50gain here looks much better, this 0.61 information gain, which is much higher than 0.24. Or we could

3:59try another value, say 13, and the calculation turns out to look like this, which is 0.40.

4:09In the more general case, we'll actually try not just three values, but multiple values along the

4:15x-axis, and one convention would be to sort all of the examples according to the weight or according

4:23to the value on this feature, and take all the values that are the midpoints between the sorted

4:30list of training examples as the values for consideration for this threshold over here.

4:36This way, if you have 10 training examples, you will test nine different possible values for this

4:42threshold, and then try to pick the one that gives you the highest information gain. And finally,

4:48if the information gain from splitting on a given value of this threshold is better than the

4:55information gain from splitting on any other feature, then you will decide to split that node

5:01at that feature. And in this example, an information gain of 0.61 turns out to be higher than that of

5:08any other feature. It turns out there are actually two thresholds, and so assuming the algorithm

5:15chooses this feature to split on, you would end up splitting the dataset according to whether or

5:23not the weight of the animal is less than or equal to nine pounds. And so you end up with two subsets

5:31of the data like this, and you can then build recursively additional decision trees using

5:37these two subsets of the data to build out the rest of the tree. So to summarize, to get a decision

5:43tree to work on continuous value features at every node when considering splits, you would just

5:49consider different values to split on, carry out the usual information gain calculation, and decide

5:54to split on that continuous value feature if it gives the highest possible information gain.

6:01So that's how you get a decision tree to work with continuous value features.

6:06Try different thresholds, do the usual information gain calculation, and split on the continuous

6:12value feature with the selected threshold if it gives you the best possible information gain out

6:17of all possible features to split on. And that's it for the required videos on the core decision tree

6:25algorithm. After this, there is an optional video that you can watch or not that generalizes the

6:31decision tree learning algorithm to regression trees. So far, we've only talked about using

6:37decision trees to make predictions that are classifications, predicting a discrete category

6:42such as cat or not cat. But what if you have a regression problem where you want to

6:47predict a number? In the next video, I'll talk about a generalization of decision trees to handle that.