0:02Gradient descent is an optimization algorithm that is widely used in machine learning and

0:08was the foundation of many algorithms, like linear regression and logistic regression

0:14and early implementations of neural networks.

0:18But it turns out that there are now some other optimization algorithms for minimizing the

0:23cost function that are even better than gradient descent.

0:27In this video, we'll take a look at an algorithm that can help you train your neural network

0:32much faster than gradient descent.

0:34Recall that this is the expression for one step of gradient descent.

0:40The parameter wj is updated as wj minus the learning rate alpha times this partial derivative

0:47term.

0:48How can we make this work even better?

0:51In this example, I've plotted the cost function j using a contour plot comprising these ellipses.

0:59The minimum of this cost function is at the center of these ellipses down here.

1:05If you were to start gradient descent down here, one step of gradient descent, if alpha

1:12is small, may take you a little bit in that direction, then another step, then another

1:16step, then another step, then another step.

1:19You notice that every single step of gradient descent is pretty much going in the same direction.

1:25If you see this to be the case, you might wonder, why don't we make alpha bigger?

1:31Can we have an algorithm to automatically increase alpha to just make it take bigger

1:35steps and get to the minimum faster?

1:39There's an algorithm called the Adam algorithm that can do that.

1:44If it sees that the learning rate is too small and we are just taking tiny little steps in

1:50a similar direction over and over, we should just make the learning rate alpha bigger.

1:56In contrast, here again, there's the same cost function.

2:00If we were starting here and had a relatively big learning rate alpha, then maybe one step

2:06of gradient descent takes us here, and a second step takes us here, third step, and a fourth

2:10step, and a fifth step, and a sixth step.

2:14If you see gradient descent doing this, it's oscillating back and forth, you'd be tempted

2:19to say, well, why don't we make the learning rate smaller?

2:22The Adam algorithm can also do that automatically, and with a smaller learning rate, you can

2:27then take a more smooth path toward the minimum of the cost function.

2:33Depending on how gradient descent is proceeding, sometimes you wish you had a bigger learning

2:38rate alpha, and sometimes you wish you had a smaller learning rate alpha.

2:44So the Adam algorithm can adjust the learning rate automatically.

2:48Adam stands for Adaptive Moment Estimation, or ADAM, and don't worry too much about what

2:55this name means, it's just what the authors had called this algorithm.

3:00But interestingly, the Adam algorithm doesn't use a single global learning rate alpha, it

3:06uses a different learning rate for every single parameter of your model.

3:10So if you have parameters w1 through w10 as well as b, then it actually has 11 learning

3:17rate parameters, alpha 1, alpha 2, all the way through alpha 10, for w1 through w10,

3:23as well as, I'll call it alpha 11, for the parameter b.

3:29And the intuition behind the Adam algorithm is, if a parameter, wj or b, seems to keep

3:36on moving in roughly the same direction, this is what we saw on the first example on the

3:41previous slide.

3:42But if it seems to keep on moving in roughly the same direction, let's increase the learning

3:47rate for that parameter, let's go faster in that direction.

3:50Conversely, if a parameter keeps oscillating back and forth, this is what you saw in the

3:56second example on the previous slide, then let's not have it keep on oscillating or

4:01bouncing back and forth, let's reduce alpha j for that parameter a little bit.

4:08The details of how Adam does this are a bit complicated and beyond the scope of this course,

4:14but if you take some more advanced deep learning courses later, you may learn more about the

4:18details of this Adam algorithm.

4:20But in code, this is how you would implement it.

4:24The model is exactly the same as before, and the way you compile the model is very

4:30similar to what we had before, except that we now add one extra argument to the compile

4:36function, which is that we specify that the optimizer you want to use is tf.keras.optimizers.theAdamOptimizer.

4:46So the Adam optimization algorithm does need some default initial learning rate alpha,

4:53and in this example, I've set that initial learning rate to be 10 to the negative 3.

5:00But when you're using the Adam algorithm in practice, it's worth trying a few values for

5:04this initial, this default global learning rate.

5:08Try some larger and some smaller values to see what gives you the fastest learning performance.

5:13Compared to the original gradient descent algorithm that you had learned in the previous

5:19course though, the Adam algorithm, because it can adapt the learning rate a bit automatically,

5:25it is more robust to the exact choice of learning rate that you pick, though it is still worth

5:31tuning this parameter a little bit to see if you can get somewhat faster learning.

5:35So that's it for the Adam optimization algorithm.

5:39It typically works much faster than gradient descent, and it's become a de facto standard

5:45in how practitioners train their neural networks.

5:48So if you're trying to decide what learning algorithm to use, what optimization algorithm

5:52to use to train your neural network, a safe choice would be to just use the Adam optimization

5:58algorithm.

5:59And most practitioners today will use Adam rather than the optional gradient descent

6:04algorithm.

6:05And with this, I hope that your learning algorithms will be able to learn much more quickly.

6:11Now, in the next couple videos, I'd like to touch on some more advanced concepts for neural

6:18networks.

6:19And in particular, in the next video, let's take a look at some alternative layer types.


---

0:03All the neural network layers we've used so far have been the dense layer type,

0:05in which every neuron in a layer gets as its inputs all the activations from the previous layer.

0:12And it turns out that just using the dense layer type, you can actually build some pretty powerful learning algorithms.

0:19And to help you build further intuition about what neural networks can do,

0:24it turns out that there are some other types of layers as well.

0:27In this video, I'd like to briefly touch on this and give you an example of a different type of neural network layer.

0:34Let's take a look.

0:35To recap, in the dense layer that we've been using, the activation of a neuron in, say, the second hidden layer,

0:45is a function of every single activation value from the previous layer of a neural network.

0:52It's a function of every single activation value from the previous layer of A1.

0:58But it turns out that for some applications, someone designing a neural network may choose to use a different type of layer.

1:07One other layer type that you may see in some work is called a convolutional layer.

1:14Let me illustrate this with an example.

1:16So what I'm showing on the left is the input x, which is a handwritten digit 9.

1:22And what I'm going to do is construct a hidden layer, which will compute different activations as functions of this input image x.

1:31But here's something I can do.

1:33For the first hidden unit, which I've drawn in blue, rather than saying this neuron can look at all the pixels in this image,

1:42I might say this neuron can only look at the pixels in this little rectangular region.

1:48Second neuron, which I'm going to illustrate in magenta, is also not going to look at the entire input image x.

1:55Instead, it's only going to look at the pixels in a limited region of the image.

2:00And so on for the third neuron, and the fourth neuron, and so on and so forth,

2:07down to the last neuron, which maybe looks only at that region of the image.

2:13So why might you want to do this?

2:16Why won't you let every neuron look at all the pixels, but instead look at only some of the pixels?

2:22Well, some of the benefits are, first, it speeds up computation.

2:29Second advantage is that a neural network that uses this type of layer, called a convolutional layer, can need less training data.

2:37Alternatively, it can also be less prone to overfitting.

2:42You've heard me talk a bit about overfitting in the previous course, but this is something that we'll dive into greater detail on next week as well,

2:50when we talk about practical tips for using learning algorithms.

2:55And this preferred type of layer, where each neuron only looks at a region of the input image, is called a convolutional layer.

3:06It was a researcher, Yann LeCun, who had figured out a lot of the details of how to get convolutional layers to work and popularize their use.

3:15Let me illustrate in more detail a convolutional layer.

3:21And if you have multiple convolutional layers in a neural network, sometimes that's called a convolutional neural network.

3:29To illustrate the convolutional layer or convolutional neural network, on this slide I'm going to use, instead of a 2D image input, I'm going to use a one-dimensional input.

3:41And the motivating example I'm going to use is classification of EKG signals, or electrocardiograms.

3:49So if you put two electrodes on your chest, you will record the voltages that look like this, that correspond to your heartbeat.

3:57This is actually something that my Stanford research group did research on.

4:02We're actually reading EKG signals that actually look like this, to try to diagnose if a patient may have a heart issue.

4:10So an EKG signal, an electrocardiogram, ECG in some places, EKG in some places, is just a list of numbers corresponding to the height of this surface at different points in time.

4:23So you may have, say, 100 numbers corresponding to the height of this curve at 100 different points of time.

4:32And the learning task is, given this time series, given this EKG signal, to classify, say, whether this patient has a heart disease or some diagnosable heart condition.

4:46Here's what a convolutional neural network might do.

4:49So I'm going to take the EKG signal and rotate it 90 degrees to lay it on the side, and so we have here 100 inputs, X1, X2, all the way through X100, like so.

5:00And when I construct the first hidden layer, instead of having the first hidden unit take as input all 100 numbers, let me have the first hidden unit look at only X1 through X20.

5:16So that corresponds to looking at just a small window of this EKG signal.

5:22The second hidden unit, shown in a different color here, will look at X11 through X30, so it looks at a different window in this EKG signal.

5:32And the third hidden layer looks at another window, X21 through X40, and so on.

5:37And the final hidden unit, in this example, will look at X81 through X100, so it looks at a small window toward the end of this EKG time series.

5:49So this is a convolutional layer, because each unit in this layer looks at only a limited window of the input.

5:57Now, this layer of the neural network has nine units.

6:03The next layer can also be a convolutional layer.

6:08So, in the second hidden layer, let me architect my first unit not to look at all nine activations from the previous layer, but to look at, say, just the first five activations from the previous layer.

6:25And then my second unit in this second hidden layer may look at just another five numbers, say, A3 to A7.

6:34And the third and final hidden unit in this layer will only look at A5 through A9.

6:41And then maybe, finally, these activations A2 get inputs to a sigmoid unit that does look at all three of these values of A2 in order to make a binary classification regarding presence or absence of heart disease.

6:59So this is an example of a neural network with the first hidden layer being a convolutional layer, the second hidden layer also being a convolutional layer, and then the output layer being a sigmoid layer.

7:12And it turns out that with convolutional layers, you have many architectural choices, such as how big is the window of inputs that a single neuron should look at, and how many neurons should each layer have.

7:25And by choosing those architectural parameters effectively, you can build new versions of neural networks that can be even more effective than the dense layer for some applications.

7:36To recap, that's it for the convolutional layer and convolutional neural networks.

7:41I'm not going to go deeper into convolutional networks in this class, and you don't need to know anything about them to do the homeworks and finish this class successfully.

7:52But I hope that you find this additional intuition that neural networks can have other types of layers as well to be useful.

7:59And in fact, if you sometimes hear about the latest cutting-edge architectures like a transformer model or an LSTM or an attention model,

8:09a lot of this research in neural networks, even today, pertains to researchers trying to invent new types of layers for neural networks,

8:18and plugging these different types of layers together as building blocks to form even more complex and hopefully more powerful neural networks.

8:27So that's it for the required videos for this week. Thank you, and congrats on sticking with me all the way through this.

8:34And I look forward to seeing you next week also, where we'll start to talk about practical advice for how you can build machine learning systems.

8:44I hope that the tips you learn next week will help you become much more effective at building useful machine learning systems.

8:52So I look forward also to seeing you next week.