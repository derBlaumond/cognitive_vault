0:02Welcome back to the second week of this course on advanced learning algorithms.

0:07Last week, you learned how to carry out inference in a neural network.

0:11This week, we're going to go over training of a neural network.

0:15I think being able to take your own data and train your own neural network on it is really fun.

0:21This week, we'll look at how you could do that. Let's dive in.

0:25Let's continue with our running example of handwritten digit recognition, recognizing this image as 0 or a 1.

0:34Here, we're using the neural network architecture that you saw last week, where you have an input x, that is the image,

0:43and then a first hidden layer with 25 units, second hidden layer with 15 units, and then one output unit.

0:50If you're given a training set of examples comprising images x, as well as the ground truth label y,

0:58how would you train the parameters of this neural network?

1:01Let me go ahead and show you the code that you can use in TensorFlow to train this network.

1:07And then in the next few videos after this, we'll dive into details to explain what the code is actually doing.

1:13So this is the code you write.

1:15This first part may look familiar from the previous week, where you are asking TensorFlow to sequentially string together these three layers of a neural network.

1:26The first hidden layer with 25 units and sig1 activation, the second hidden layer, and then finally the output layer.

1:34So nothing new here relative to what you saw last week.

1:38Second step is you have to ask TensorFlow to compile the model.

1:42And the key step in asking TensorFlow to compile the model is to specify what is the loss function you want to use.

1:50In this case, we'll use something that goes by the binary cross-entropy loss function.

1:56We'll say more in the next video what this really is.

1:59And then having specified the loss function, the first step is to call the fit function, which tells TensorFlow to fit the model that you specified in step one,

2:10using the loss of the cost function that you specified in step two to the data set x, y.

2:17And back in the first course, when we talked about gradient descent, we had to decide how many steps to run gradient descent or how long to run gradient descent.

2:26So epochs is a technical term for how many steps of a learning algorithm like gradient descent you may want to run.

2:34And that's it. Step one is to specify the model, which tells TensorFlow how to compute for the inference.

2:42Step two compiles the model using a specific loss function. And step three is to train the model.

2:49So that's how you can train a neural network in TensorFlow.

2:53As usual, I hope that you'll be able to not just call these lines of code to train the model,

2:59but that you also understand what's actually going on behind these lines of code.

3:03So you don't just call it without really understanding what's going on.

3:08And I think this is important because when you're running a learning algorithm, if it doesn't work initially,

3:15having that conceptual mental framework of what's really going on will help you debug whenever things don't work the way you expect.

3:24So with that, let's go on to the next video, where we'll dive more deeply into what these steps in the TensorFlow implementation are actually doing.

3:33I'll see you in the next video.

---
0:02Let's take a look at the details of what the TensorFlow code for training a neural network is actually doing.

0:08Let's dive in.

0:09Before looking at the details of training a neural network, let's recall how you had trained a logistic regression model in the previous course.

0:19Step 1 of building a logistic regression model was, you would specify how to compute the output given the input vgelec and the parameters w and b.

0:30In the first course, we said the logistic regression function predicts f of x is equal to g, the sigmoid function applied to w dot product x plus b, which was the sigmoid function applied to w dot x plus b.

0:46So, if z is the dot product of w of x plus b, then f of x is 1 over 1 plus e to the negative z.

1:00So that was the first step, where to specify what is the input-to-output function of logistic regression, and that depends on both the input x and the parameters of the model.

1:12The second step we had to do to train the logistic regression model was to specify the loss function and also the cost function.

1:21So you may recall that the loss function said if logistic regression outputs f of x and the ground truth label, the actual label in the training set was y, then the loss on that single training example was negative y log f of x minus 1 minus y times log of 1 minus f of x.

1:44So, this was a measure of how well is logistic regression doing on a single training example x comma y.

1:54Given this definition of a loss function, we then define the cost function, and the cost function was a function of the parameters w and b.

2:05And that was just the average, that is taking an average over all m training examples of the loss function computed on the m training examples x1, y1 through xm, ym.

2:19And remember that in the convention we're using, the loss function is a function of the output of the learning algorithm and the ground truth label as computed over a single training example, whereas the cost function j is an average of the loss function computed over your entire training set.

2:40So that was step two of what we did when building up logistic regression.

2:46And then the third and final step to train logistic regression model was to use an algorithm, specifically gradient descent, to minimize that cost function j of w, b, to minimize it as a function of the parameters w and b.

3:03And we minimize the cost j as a function of the parameters using gradient descent, where w is updated as w minus the learning rate alpha times the derivative of j with respect to w, and b similarly is updated as b minus the learning rate alpha times the derivative of j with respect to b.

3:29So with these three steps, step one, specify how to compute the outputs given the input x and parameters, step two, specify the loss and cost, and step three, minimize the cost function, we trained logistic regression.

3:41The same three steps is how we can train a neural network in TensorFlow.

3:47Now let's look at how these three steps map to training a neural network.

3:52We'll go over this in greater detail on the next three slides, but really briefly.

3:58Step one of specifying how to compute the output given the input x and parameters w and b, that's done with this code snippet, which should be familiar from last week of specifying the neural network.

4:10And this was actually enough to specify the computations needed in forward propagation or for the inference algorithm, for example.

4:17The second step is to compile the model and to tell it what loss you want to use.

4:23And here's the code that you use to specify this loss function, which is the binary cross-entropy loss function.

4:32And once you specify this loss, taking an average over the entire training set also gives you the cost function for the neural network.

4:40And then step three is to call a function to try to minimize the cost as a function of the parameters of the neural network.

4:48Let's look in greater detail in these three steps in the context of training a neural network.

4:55The first step, specify how to compute the output given the input x and parameters w and b.

5:00This code snippet specifies the entire architecture of the neural network.

5:04It tells you that there are 25 hidden units in the first hidden layer, then 15 in the next one, and then one output unit, and that we're using the sigmoid activation value.

5:14And so based on this code snippet, we know also what are the parameters, w1, b1 of the first layer, parameters of the second layer, and parameters of the third layer.

5:24So this code snippet specifies the entire architecture of the neural network and therefore tells TensorFlow everything it needs in order to compute the output.

5:34The output a3 or f of x as a function of the input x and the parameters.

5:41Here we have written wl and bl.

5:45Let's go on to step two.

5:47In the second step, you have to specify what is the loss function, and that will also define the cost function we use to train the neural network.

5:55So for the handwritten digit classification problem where images are either of a 0 or a 1.

6:04And the most common by far loss function to use is this one.

6:09It's actually the same loss function as what we had for logistic regression.

6:14It's negative y log f of x minus 1 minus y times log 1 minus f of x.

6:21Where y is the ground truth label, sometimes also called the target label y, and f of x is now the output of the neural network.

6:29And in TensorFlow, this is called the binary cross-entropy loss function.

6:35Where does that name come from?

6:37Well, it turns out in statistics, this function on top is called the cross-entropy loss function.

6:42So that's what cross-entropy means.

6:44And the word binary just re-emphasizes or points out that this is a binary classification problem because each image is either a 0 or a 1.

6:54And the syntax is to ask TensorFlow to compile the neural network using this loss function.

7:01And another historical note, Keras was originally a library that had developed independently of TensorFlow.

7:08It was actually a totally separate project from TensorFlow.

7:10But eventually it got merged into TensorFlow, which is why we have tf.keraslibrary.losses.the name of this loss function.

7:20And by the way, I don't always remember the names of all the loss functions in TensorFlow.

7:26But I just do a quick web search myself to find the right name, and then I plug that into my code.

7:31Having specified the loss with respect to a single training example,

7:36TensorFlow knows that the cost you want to minimize is then the average,

7:41taking the average over all m training examples, of the loss on all of the training examples.

7:47And optimizing this cost function will result in fitting the neural network to your binary classification data.

7:55In case you want to solve a regression problem rather than a classification problem,

8:01you can also tell TensorFlow to compile your model using a different loss function.

8:08For example, if you have a regression problem, and if you want to minimize the squared error loss,

8:16so here is the squared error loss, the loss with respect to if your learning algorithm outputs f of x,

8:22with a target or ground truth label of y, that's one half of the squared error,

8:26then you can use this loss function in TensorFlow,

8:31which is to use the maybe more intuitively named mean squared error loss function.

8:37And then TensorFlow will try to minimize the mean squared error.

8:41In this expression, I'm using J of capital W comma capital B to denote the cost function.

8:48The cost function is a function of all of the parameters in the neural network.

8:53So you can think of capital W as including W1, W2, W3,

9:00so all the W parameters in the entire neural network, and B as including B1, B2, and B3.

9:08So if you are optimizing the cost function with respect to W and B,

9:15you'd be trying to optimize it with respect to all of the parameters in the neural network.

9:20And up on top as well, I have written f of x as the output of the neural network,

9:26but if you want, you can also write f of WB if you want to emphasize that

9:31the output of the neural network as a function of x depends on all the parameters

9:35and all the layers of the neural network.

9:38So that's the loss function and the cost function.

9:41Finally, you will ask TensorFlow to minimize the cost function.

9:46You might remember the gradient descent algorithm from the first course.

9:51If you are using gradient descent to train the parameters of a neural network,

9:55then you will repeatedly, for every layer L and for every unit J,

10:01update WLJ according to WLJ minus the learning rate alpha

10:08times the partial derivative with respect to that parameter of the cost function,

10:13J of WB, and similarly for the parameters B as well.

10:20And after doing, say, 100 iterations of gradient descent,

10:25hopefully you get to a good value of the parameters.

10:29So in order to use gradient descent,

10:32the key thing you need to compute is these partial derivative terms.

10:37And what TensorFlow does, and in fact what is standard in neural network training,

10:41is to use an algorithm called backpropagation

10:45in order to compute these partial derivative terms.

10:49TensorFlow can do all of these things for you.

10:52It implements backpropagation all within this function called fit.

10:57So all you have to do is call model.fit x, y as your training set

11:02and tell it to do so for 100 iterations or 100 epochs.

11:07In fact, what you see later is that TensorFlow can use an algorithm

11:12that is even a little bit faster than gradient descent.

11:15And you see more about that later this week as well.

11:18Now, I know that we're relying heavily on the TensorFlow library

11:22in order to implement a neural network.

11:25One pattern I've seen across multiple ideas is,

11:29as the technology evolves, libraries become more mature

11:32and most engineers will use libraries rather than implement code from scratch.

11:37And there have been many other examples of this in the history of computing.

11:42Once, many, many decades ago,

11:45programmers had to implement their own sorting function from scratch.

11:49But now, sorting libraries are quite mature,

11:52that you probably call someone else's sorting function

11:55rather than implement it yourself,

11:57unless you're taking a computing class that asks you to do it as an exercise.

12:01And today, if you want to compute the square root of a number,

12:05like, what is the square root of 7?

12:08Well, once, programmers had to write their own code to compute this,

12:12but now pretty much everyone just calls a library to take square roots

12:17or matrix operations, such as multiplying two matrices together.

12:22So when deep learning was younger and less mature,

12:26many developers, including me,

12:27were implementing things from scratch,

12:30using Python or C++ or some other library.

12:33But today, deep learning libraries have matured enough

12:37that most developers will use these libraries.

12:40And in fact, most commercial implementations of neural networks today

12:44use a library like TensorFlow or PyTorch.

12:47But as I've mentioned,

12:49it's still useful to understand how they work under the hood

12:52so that if something unexpected happens,

12:54which still does with today's libraries,

12:55you have a better chance of knowing how to fix it.

12:58Now that you know how to train a basic neural network,

13:02also called a multilayer perceptron,

13:05there are some things you can change about the neural network

13:08that will make it even more powerful.

13:10In the next video, let's take a look

13:13at how you can swap in different activation functions

13:16as an alternative to the sigmoid activation function we've been using.

13:21This will make your neural networks work even much better.

13:23So let's go take a look at that in the next video.