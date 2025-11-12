0:02Multi-class classification refers to classification problems where you can have more than just two possible output labels, so not just 0 or 1.

0:13Let's take a look at what that means.

0:15For the handwritten digit classification problems we've looked at so far, we were just trying to distinguish between the handwritten digits 0 and 1.

0:25But if you're trying to read postal codes or zip codes on an envelope, well, there are actually 10 possible digits you might want to recognize.

0:35Or, alternatively, in the first course, you saw the example if you're trying to classify whether patients may have any of 3 or 5 different possible diseases.

0:49That, too, would be a multi-class classification problem.

0:52Or, one thing I've worked on a lot is visual defect inspection of parts manufactured in a factory, where you might look at a picture of a pill that a pharmaceutical company has manufactured

1:07and try to figure out does it have a scratch defect or discoloration defect or a chip defect.

1:14And this would, again, be multiple classes or multiple different types of defects that you could classify this pill as having.

1:23So a multi-class classification problem is still a classification problem in that Y can take on only a small number of discrete categories.

1:33It's not any number, but now Y can take on more than just two possible values.

1:39So, whereas previously, for binary classification, you may have had a dataset like this with features X1 and X2,

1:48in which case logistic regression would fit a model to estimate what's the probability of Y being 1 given the features X,

1:58because Y was either 0 or 1.

2:01With multi-class classification problems, you would instead have a dataset that maybe looks like this,

2:07where we have four classes, where the O's represent one class, the X's represent another class, the triangles represent a third class, and the squares represent a fourth class.

2:20And instead of just estimating the chance of Y being equal to 1, we'll now want to estimate what's the chance that Y is equal to 1,

2:27or what's the chance that Y is equal to 2, or what's the chance that Y is equal to 3, or the chance of Y being equal to 4.

2:38And it turns out that the algorithm you learn about in the next video can learn a decision boundary that maybe looks like this,

2:46that divides the space X1 and X2 into four categories rather than just two categories.

2:54So, that's the definition of the multi-class classification problem.

2:59In the next video, we'll look at the softmax regression algorithm, which is a generalization of the logistic regression algorithm.

3:07And using that, you'll be able to carry out multi-class classification problems.

3:13And after that, we'll take softmax regression and fit it into a new neural network,

3:19so that you'll also be able to train a neural network to carry out multi-class classification problems.

3:25Let's go on to the next video.

---

0:02The softmax regression algorithm is a generalization of logistic regression,

0:07which is a binary classification algorithm, to the multicost classification context.

0:13Let's take a look at how it works.

0:15Recall that logistic regression applies when Y can take on two possible output values, either 0 or 1.

0:26The way it computes its output is,

0:29you would first calculate Z equals W dot product with X plus B,

0:34and then you would compute what I'm going to call here A equals G of Z,

0:39which is a sigmoid function applied to Z.

0:43We interpreted this as logistic regression's estimate of the probability of Y being equal to 1,

0:50given those input features X.

0:53Now, quick quiz question.

0:57If the probability of Y equals 1 is 0.71,

1:02then what is the probability that Y is equal to 0?

1:08Well, the chance of Y being equal to 1 and the chance of Y being equal to 0,

1:12they've got to add up to 1, right?

1:14So if there's a 71% chance of it being 1,

1:17there has to be a 29% or 0.29 chance of it being equal to 0.

1:24So to embellish logistic regression a little bit,

1:27in order to set us up for the generalization to softmax regression,

1:31I'm going to think of logistic regression as actually computing two numbers.

1:36First, A1, which is this quantity that we had previously,

1:41of the chance of Y being equal to 1 given X.

1:45And second, I'm going to think of logistic regression as also computing A2,

1:50which is 1 minus this,

1:54which is just the chance of Y being equal to 0,

1:59given the input features X.

2:01And so A1 and A2, of course, have to add up to 1.

2:06Let's now generalize this to softmax regression.

2:10And I'm going to do this with a concrete example

2:13of when Y can take on four possible outputs.

2:17So Y can take on the values 1, 2, 3, or 4.

2:22Here's what softmax regression will do.

2:25It will compute Z1 as W1 dot product of X plus B1,

2:32and then Z2 equals W2 dot product of X plus B2,

2:36and so on for Z3 and Z4.

2:40Here, W1, W2, W3, W4, as well as B1, B2, B3, B4.

2:46These are the parameters of softmax regression.

2:51Next, here's the formula for softmax regression.

2:55We'll compute A1 equals E to the Z1

3:00divided by E to the Z1 plus E to the Z2 plus E to the Z3 plus E to the Z4.

3:06And A1 will be interpreted as the algorithm's estimate

3:11of the chance of Y being equal to 1, given the input features X.

3:16Then the formula for softmax regression will compute

3:21A2 equals E to the Z2 divided by the same denominator,

3:26E to the Z1 plus E to the Z2 plus E to the Z3 plus E to the Z4,

3:30and will interpret A2 as the algorithm's estimate

3:34of the chance that Y is equal to 2, given the input features X.

3:38And similarly for A3, where here the numerator is now

3:42E to the Z3 divided by the same denominator.

3:45That's the estimated chance of Y being equal to 3.

3:48And similarly, A4 takes on this expression.

3:52Whereas on the left, we wrote down the specification

3:57for the logistic regression model,

3:59these equations on the right are our specification

4:03for the softmax regression model.

4:06It has parameters W1 through W4 and B1 through B4.

4:12And if you can learn appropriate choices

4:14for all these parameters, then this gives you a way

4:17of predicting what's the chance of Y being 1, 2, 3, or 4,

4:21given a set of input features X.

4:25Quick quiz. Let's say you run softmax regression

4:28on a new input X, and you find that A1 is 0.30,

4:33A2 is 0.20, A3 is 0.15.

4:40What do you think A4 will be?

4:43Why don't you take a look at this quiz

4:45and see if you can figure out the right answer.

4:49So you might have realized that because the chance of Y

4:53taking on the values of 1, 2, 3, or 4,

4:56they have to add up to 1.

4:58A4, the chance of Y being equal to 4, has to be 0.35,

5:03which is 1 minus 0.3 minus 0.2 minus 0.15.

5:07So here I wrote down the formulas for softmax regression

5:12in the case of 4 possible outputs,

5:14and let's now write down the formula for the general case

5:19for softmax regression.

5:21In the general case, Y can take on N possible values,

5:25so Y can be 1, 2, 3, and so on, up to N.

5:29In that case, softmax regression will compute Zj

5:34equals Wj dot product with X plus Bj,

5:38where now the parameters of softmax regression

5:41are W1, W2, through Wn, as well as B1, B2, through Bn.

5:49And then finally, it will compute Aj equals e to the Zj

5:55divided by sum from k equals 1 to N of e to the Z sub k.

6:02Well, here I'm using another variable k to index the summation

6:07because here j refers to a specific fixed number like j equals 1.

6:12Aj is interpreted as the model's estimate that Y is equal to j

6:18given the input feature is X.

6:20And notice that by construction of this formula,

6:24if you add up A1, A2, all the way through An,

6:27these numbers always will end up adding up to 1.

6:30So we'll specify how you would compute the softmax regression model.

6:36And I won't prove it in this video,

6:38but it turns out that if you apply softmax regression with N equals 2,

6:43so there are only two possible output clauses,

6:46then softmax regression ends up computing basically the same thing

6:51as logistic regression.

6:53The parameters end up being a little bit different,

6:55but it ends up reducing to a logistic regression model.

6:58But that's why the softmax regression model is a generalization of logistic regression.

7:03Having defined how softmax regression computes its outputs,

7:08let's now take a look at how to specify the cost function for softmax regression.

7:13Recall for logistic regression, this is what we had.

7:17We said Z is equal to this, and then I wrote earlier that A1 is G of Z,

7:24it was interpreted as the probability that Y is equal to 1.

7:27And we also wrote A2 is the probability that Y is equal to clause 0.

7:34So previously we had written the loss of logistic regression as

7:39negative Y log A1 minus 1 minus Y log 1 minus A1.

7:46But 1 minus A1 is also equal to just A2,

7:52because A2 is 1 minus A1 according to this expression over here.

7:58So I can rewrite or simplify the loss for logistic regression a little bit

8:03to be negative Y log A1 minus 1 minus Y log of A2.

8:11And in other words, the loss if Y is equal to 1 is negative log A1.

8:19And if Y is equal to 0, then the loss is negative log A2.

8:25And then same as before, the cost function for all the parameters in the model

8:29is the average loss, average over the entire training set.

8:33So that was the cost function for logistic regression.

8:37Let's write down the cost function that is conventionally used for softmax regression.

8:44Recall that these are the equations we use for softmax regression.

8:49The loss we're going to use for softmax regression is just this.

8:54The loss for if the algorithm outputs A1 through AN,

9:01and the ground truth label is Y,

9:05is if Y equals 1, the loss is negative log A1.

9:10So it's negative log of the probability that it thought Y was equal to 1.

9:16Or if Y is equal to 2, then the loss I'm going to define as negative log A2.

9:23So if Y is equal to 2, the loss of the algorithm on this example is

9:28negative log of the probability it thought Y was equal to 2.

9:32And so on all the way down to if Y is equal to N,

9:36then the loss is negative log of AN.

9:40And to illustrate what this is doing,

9:43if Y is equal to J, then the loss is negative log of AJ.

9:51And that's what this function looks like.

9:54Negative log of AJ is a curve that looks like this.

9:59And so if AJ was very close to 1,

10:03then you'd be on this part of the curve and the loss would be very small.

10:07But if it thought, say, AJ had only a 50% chance,

10:11then the loss gets a little bit bigger.

10:13And the smaller AJ is, the bigger the loss.

10:18And so this incentivizes the algorithm to make AJ as large as possible,

10:24as close to 1 as possible.

10:26Because whatever the actual value Y was,

10:29you want the algorithm to say, hopefully,

10:31that the chance of Y being that value was pretty large.

10:34Notice that in this loss function,

10:37Y in each training example can take on only one value.

10:42And so you end up computing this negative log of AJ

10:46only for one value of AJ,

10:49which is whatever was the actual value of Y equals J

10:52in that particular training example.

10:54For example, if Y was equal to 2,

10:56you end up computing negative log of A2,

10:59but not any of the other negative log of A1 or the other terms here.

11:03So that's the form of the model,

11:05as well as the cost function for softmax regression.

11:08And if you were to train this model,

11:11you can start to build multicost classification algorithms.

11:16And what we'd like to do next is take this softmax regression model

11:20and fit it into a neural network

11:22so that you're able to do something even better,

11:25which is to train a neural network for multicost classification.

11:29Let's go do that in the next video.

---
0:02In order to build a neural network that can carry out multiclass classification,

0:06we're going to take the softmax regression model and put it into essentially the output layer of a neural network.

0:14Let's take a look at how to do that.

0:16Previously, when we were doing handwritten digit recognition with just two classes,

0:22we used a neural network with this architecture.

0:26If you now want to do handwritten digit classification with 10 classes, all the digits from 0 to 9,

0:35then we're going to change this neural network to have 10 output units, like so.

0:42And this new output layer will be a softmax output layer.

0:47So sometimes we'll say this neural network has a softmax output or that this output layer is a softmax layer.

0:54And the way forward propagation works in this neural network is, given an input x, a1 gets computed exactly the same as before,

1:04and then a2, deactivations for the second hidden layer, also get computed exactly the same as before.

1:12And we now have to compute deactivations for this output layer, that is, a3.

1:19This is how it works.

1:21If you have 10 output classes, we will compute z1, z2, through z10 using these expressions.

1:29So this is actually very similar to what we had previously for the formula you used to compute z.

1:35z1 is w1 dot product with a2, deactivations from the previous layer, plus v1, and so on for z1 through z10.

1:46Then a1 is equal to e to the z1 divided by e to the z1 plus dot dot dot plus up to e to the z10,

1:57and that's our estimate of the chance that y is equal to 1.

2:02And similarly for a2, and similarly all the way up to a10.

2:09And so this gives you your estimates of the chance of y being equal to 1, 2, and so on up through the 10th possible label for y.

2:19And just for completeness, if you want to indicate that these are the quantities associated with layer 3,

2:26technically I should add these superscript 3s there.

2:31It does make the notation a little bit more cluttered,

2:34but this makes explicit that this is, for example, the z31 value,

2:39and this is the parameters associated with the first unit of layer 3 of this neural network.

2:48And with this, your softmax output layer now gives you estimates of the chance of y being any of these 10 possible output labels.

3:00I do want to mention that the softmax layer, or sometimes also called the softmax activation function,

3:06it is a little bit unusual in one respect compared to the other activation functions we've seen so far,

3:12like sigmoid, ReLU, and linear,

3:14which is that when we're looking at sigmoid or ReLU or linear activation functions,

3:19a1 was a function of z1, and a2 was a function of z2 and only z2.

3:30In other words, to obtain the activation values, we could apply the activation function g,

3:35be it sigmoid or ReLU or something else, element-wise, to z1 and z2 and so on to get a1 and a2 and a3 and a4.

3:44But with the softmax activation function, notice that a1 is a function of z1 and z2 and z3 all the way up to z10.

3:55So each of these activation values depends on all of the values of z,

4:01and this is a property that's a bit unique to the softmax output or the softmax activation function.

4:07Or stated differently, if you want to compute a1 through a10,

4:12that is a function of z1 all the way up to z10 simultaneously,

4:20and this is unlike the other activation functions we've seen so far.

4:24Finally, let's look at how you would implement this in TensorFlow.

4:30If you want to implement the neural network that I've shown here on this slide, this is the code to do so.

4:38Similar as before, there are three steps to specifying and training a model.

4:42The first step is to tell TensorFlow to sequentially string together three layers.

4:48First layer is this 25 units of a ReLU activation function.

4:52Second layer, 15 units of a ReLU activation function.

4:55And then the third layer, because there are now 10 output units, you want to output a1 through a10,

5:01so there are now 10 output units, and we'll tell TensorFlow to use the softmax activation function.

5:08And the cost function that you saw in the last video,

5:13TensorFlow calls that the sparse categorical cross-entropy function.

5:19So I know this name is a bit of a mouthful,

5:23whereas for logistic regression, we had the binary cross-entropy function.

5:28Here, we're using the sparse categorical cross-entropy function.

5:33And what sparse categorical refers to is that you're still classifying y into categories,

5:40so it's categorical, it takes on values from 1 to 10,

5:45and sparse refers to that y can only take on one of these 10 values.

5:50So each image is either 0 or 1 or 2 or so on up to 9,

5:53you're not going to see a picture that is simultaneously the number 2 and the number 7.

5:58So sparse refers to that each digit is only one of these categories.

6:03So that's why the loss function that you saw in the last video is called in TensorFlow,

6:09the sparse categorical cross-entropy loss function.

6:13And then the code for training the model is just the same as before.

6:17And if you use this code, you can train a neural network on a multiclass classification problem.

6:23Just one important note.

6:26If you use this code exactly as I've written here, it will work,

6:30but don't actually use this code because it turns out that in TensorFlow,

6:35there's a better version of the code that makes TensorFlow work better.

6:40So even though the code shown in this slide works,

6:44don't use this code the way I've written it here,

6:47because in a later video this week, you'll see a different version.

6:51There's actually a recommended version of implementing this that will work better.

6:55But we'll take a look at that in a later video.

6:58So now you know how to train a neural network with a softmax output layer with one caveat.

7:05There's a different version of the code that will make TensorFlow able to compute these probabilities much more accurately.

7:13Let's take a look at that in the next video,

7:16which will also show you the actual code that I recommend you use if you're training a softmax neural network.

7:22Let's go on to the next video.

---
0:03The implementation that you saw in the last video of a neural network with a softmax layer will work okay, but there's an even better way to implement it.

0:13Let's take a look at what can go wrong with that implementation and also how to make it better.

0:18Let me show you two different ways of computing the same quantity in a computer.

0:24Option 1, we can set x equals to 2 over 10,000.

0:29Option 2, we can set x equals 1 plus 1 over 10,000 minus 1 minus 1 over 10,000.

0:40In which you first compute this, and then compute this, and then you take the difference.

0:44And if you simplify this expression, this turns out to be equal to 2 over 10,000.

0:51Let me illustrate this in this notebook.

0:53So first, let's set x equals 2 over 10,000 and print the result to a lot of decimal points of accuracy.

1:01Okay, that looks pretty good.

1:03Second, let me set x equals, I'm going to insist on computing 1 over 1 plus 10,000, and then subtract from that 1 minus 1 over 10,000, and let's print that out.

1:14And, oh, okay, it just looks a little bit off, as if there's some round-off error.

1:20Because the computer has only a finite amount of memory to store each number, called a floating-point number in this case,

1:28depending on how you decide to compute the value 2 over 10,000, the result can have more or less numerical round-off error.

1:38And it turns out that while the way we have been computing the cost function for Softmax is correct,

1:47there's a different way of formulating it that reduces these numerical round-off errors, leading to more accurate computations within TensorFlow.

1:57Let me first explain this in a little bit more detail using logistic regression, and then we will show how these ideas apply to improving our implementation of Softmax.

2:08So, first let me illustrate these ideas using logistic regression, and then we'll move on to show how to improve your implementation of Softmax as well.

2:18Recall that for logistic regression, if you want to compute the loss function, for a given example, you would first compute this output activation A,

2:28which is g of z, or 1 over 1 plus e to the negative z, and then you compute the loss using this expression over here.

2:38And in fact, this is what the code would look like for a logistic output layer with this binary cross-entropy loss.

2:50And for logistic regression, this works okay, and usually the numerical round-off errors aren't that bad.

2:56But it turns out that if you allow TensorFlow to not have to compute A as an intermediate term,

3:05but instead if you tell TensorFlow that the loss is this expression down here, and all I've done is I've taken A and expanded it into this expression down here,

3:17then TensorFlow can rearrange terms in this expression and come up with a more numerically accurate way to compute this loss function.

3:28And so, whereas the original procedure was like insisting on computing as an intermediate value 1 plus 1 over 10,000,

3:39and another intermediate value 1 minus 1 over 10,000, and then manipulating these two to get 2 over 10,000,

3:47this original implementation was insisting on explicitly computing A as an intermediate quantity.

3:55But instead, by specifying this expression at the bottom directly as a loss function, it gives TensorFlow more flexibility in terms of how to compute this,

4:05and whether or not it wants to compute A explicitly.

4:08And so, the code you can use to do this is shown here.

4:14And what this does is it sets the output layer to just use a linear activation function,

4:21and it puts both the activation function, 1 over 1 plus e to the negative z, as well as this cross-entropy loss into the specification of the loss function over here.

4:34And that's what this from logits equals true argument causes TensorFlow to do.

4:41And in case you're wondering what the logits are, it's basically this number z.

4:46So, TensorFlow will compute z as an intermediate value, but it can rearrange terms to make this become computed more accurately.

4:55One downside of this code is it becomes a little bit less legible, but this causes TensorFlow to have a little bit less numerical round-off error.

5:05Now, in the case of logistic regression, either of these implementations actually works okay.

5:11But the numerical round-off errors can get worse when it comes to softmax.

5:16Now, let's take this idea and apply it to softmax regression.

5:20Recall what you saw in the last video was you compute deactivations as follows.

5:26Deactivations is g of z1 through z10, where a1, for example, is e to the z1 divided by the sum of the e to the zj's.

5:38And then the loss was this, depending on what is the actual value of y is negative log of aj for one of the aj's.

5:46And so, this was the code that we had to do this computation in two separate steps.

5:53But once again, if you instead specify that the loss is, if y is equal to 1, is negative log of this formula, and so on.

6:05If y is equal to 10, is this formula, then this gives TensorFlow the ability to rearrange terms and compute this in a more numerically accurate way.

6:20Just to give you some intuition for why TensorFlow might want to do this.

6:25It turns out if one of the z's is really small, then e to the negative small number becomes very, very small.

6:32Or if one of the z's is a very large number, then e to the z can become a very, very large number.

6:37And by rearranging terms, TensorFlow can avoid some of these very small or very large numbers,

6:43and therefore come up with a more accurate computation for the loss function.

6:48So the code for doing this is shown here.

6:51In the output layer, we're now just using a linear activation function.

6:55So the output layer just computes z1 through z10.

7:00And this whole computation of the loss is then captured in the loss function over here,

7:09where again, we have the from logist equals true parameter.

7:13So once again, these two pieces of code do pretty much the same thing,

7:18except that the version that is recommended is more numerically accurate,

7:23although unfortunately it is a little bit harder to read as well.

7:27So if you're reading someone else's code and you see this and you wonder what's going on,

7:31it's actually equivalent to the original implementation, at least in concept, except that it's more numerically accurate.

7:38The numerical round-off errors for logistic regression aren't that bad,

7:44but it is recommended that you use this implementation down at the bottom instead.

7:50And conceptually, this code does the same thing as the first version that you had previously,

7:56except that it is a little bit more numerically accurate,

8:01although the downside is it's maybe just a little bit harder to interpret as well.

8:05Now, there's just one more detail,

8:08which is that we've now changed the neural network to use a linear activation function

8:13rather than a softmax activation function.

8:16And so the neural network's final layer no longer outputs these probabilities, a1 through a10.

8:24It is instead outputting z1 through z10.

8:28And I didn't talk about it in the case of logistic regression,

8:32but if you were combining the output logistic function with the loss function,

8:38then for logistic regression, you also have to change the code this way

8:42to take the output value and map it through the logistic function in order to actually get the probability.

8:49So you now know how to do multicost classification with a softmax output layer

8:55and also how to do it in a numerically stable way.

8:59Before wrapping up multicost classification,

9:02I want to share with you one other type of classification problem

9:06called a multilabel classification problem.

9:09Let's talk about that in the next video.