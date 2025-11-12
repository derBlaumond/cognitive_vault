0:02The fundamental building block of most modern neural networks is a layer of neurons.

0:08In this video, you'll learn how to construct a layer of neurons, and once you have that

0:13down, you'll be able to take those building blocks and put them together to form a large

0:18neural network.

0:19Let's take a look at how a layer of neurons works.

0:22Here's the example we had from the demand prediction example, where we had four input

0:28features that were fed to this layer of three neurons in this hidden layer that then sends

0:35its output to this output layer with just one neuron.

0:40Let's zoom in to the hidden layer to look at its computations.

0:47This hidden layer inputs four numbers, and these four numbers are inputs to each of three

0:52neurons, and each of these three neurons is just implementing a little logistic regression

1:01unit or a little logistic regression function.

1:04So take this first neuron.

1:06It has two parameters, w and b, and in fact, to denote that this is the first hidden unit,

1:15I'm going to subscript this as w1, b1, and what it does is it'll output some activation

1:23value a, which is g of w1 in a product with x plus b1, where this is the familiar z value

1:35that you had learned about in logistic regression in the previous course, and g of z is the

1:44familiar logistic function, 1 over 1 plus e to the negative z, and so maybe this ends

1:51up being a number 0.3, and that's the activation value a of the first neuron.

1:59To denote that this is the first neuron, I'm also going to add a subscript a1 over here,

2:04and so a1 may be a number like 0.3, just a 0.3 chance of this being highly affordable

2:11based on the input features.

2:14Now let's look at the second neuron.

2:16The second neuron has parameters w2 and b2, and this wb or w2, b2 are the parameters of

2:27the second logistic unit.

2:29So it computes a2 equals the logistic function g applied to w2 dot product x plus b2, and

2:40this may be some other number, say 0.7, because in this example, there's a 0.7 chance that

2:47we think the potential buyers will be aware of this t-shirt.

2:52And similarly, the third neuron has a third set of parameters, w3, b3, and similarly computes

2:58an activation value a3 equals g of w3 dot product x plus b3, and that may be, say, 0.2.

3:06So in this example, these three neurons output 0.3, 0.7, and 0.2, and this vector of three

3:14numbers becomes the vector of activation values a that is then passed to the final output

3:25layer of this neural network.

3:28Now when you build neural networks with multiple layers, it will be useful to give the layers

3:34different numbers.

3:35So by convention, this layer is called layer one of the neural network, and this layer

3:43is called layer two of the neural network, and the input layer is also sometimes called

3:50layer zero.

3:52And today, there are neural networks that can have dozens or even hundreds of layers.

3:57But in order to introduce notation to help us distinguish between the different layers,

4:03I'm going to use superscript square bracket one to index into different layers.

4:12So in particular, a superscript in square brackets one, I'm going to use as a notation

4:18to denote the output of layer one of this hidden layer of this neural network.

4:24And similarly, w1, b1 here are the parameters of the first unit in layer one of the neural

4:33network, so I'm also going to add the superscript in square brackets one here.

4:37And w2, b2 are the parameters of the second hidden unit, or the second hidden neuron in

4:47layer one, and so those parameters are also denoted here, w superscript square bracket

4:52one, like so.

4:54And similarly, I can add superscript square brackets, like so, to denote that these are

5:00the activation values of the hidden units of layer one of this neural network.

5:08I know maybe this notation is getting a little bit cluttered, but the thing to remember is

5:15whenever you see this superscript square bracket one, that just refers to a quantity that is

5:22associated with layer one of the neural network.

5:26And if you see superscript square bracket two, that refers to a quantity associated

5:32with layer two of the neural network, and similarly for other layers as well, including

5:37layer three, layer four, and so on for neural networks with more layers.

5:42So that's the computation of layer one of this neural network.

5:47Its output is this activation vector, a superscript square bracket one, and I'm going to copy

5:55this over here because this output, a1, becomes the input to layer two.

6:04So now let's zoom into the computation of layer two of this neural network, which is

6:09also the output layer.

6:12So the input to layer two is the output of layer one, so a1 is this vector, 0.3, 0.7,

6:230.2, that we just computed on the previous part of this slide.

6:31And so because the output layer has just a single neuron, all it does is it computes

6:37a subscript one that is the output of this first and only neuron as g, the sigmoid function,

6:45applied to w subscript one in a product with a superscript square bracket one.

6:51So this is the input into this layer, and then plus b1.

6:58Here this is the quantity z that you're familiar with, and g, as before, is the sigmoid function

7:05that you apply to this.

7:08And if this results in a number, say 0.84, then that becomes the output of this output

7:15layer of the neural network.

7:18And in this example, because the output layer has just a single neuron, this output is just

7:24a scalar, it's a single number rather than a vector of numbers.

7:28Sticking with our notational convention from before, we're going to use a superscript in

7:34square brackets two to denote the quantities associated with layer two of this neural network.

7:40So a superscript square bracket two is the output of this layer, and so I'm going to

7:47also copy this here as the final output of the neural network.

7:53And to make the notation consistent, you can also add these superscript square bracket

7:59twos to denote that these are the parameters and activation values associated with layer

8:06two of the neural network.

8:09Once the neural network has computed A2, there's one final optional step that you can

8:14choose to implement or not, which is if you want a binary prediction, one or zero, is

8:22this a top seller, yes or no, is you can take the number, a superscript square bracket two

8:28subscript one, and this is the number 0.84 that we computed, and threshold this at 0.5.

8:38So if it's greater than 0.5, you can predict y-hat equals one, and if it's less than 0.5,

8:43then predict y-hat equals zero, and we saw this thresholding as well when you learned

8:48about logistic regression in the first course of the specialization.

8:53So if you wish, this then gives you the final prediction y-hat as either one or zero if

8:58you don't want just a probability of it being a top seller.

9:02So that's how a neural network works.

9:04Every layer inputs a vector of numbers and applies a bunch of logistic regression units

9:09to it, and then computes another vector of numbers that then gets passed from layer to

9:15layer until you get the final output layer's computation, which is a prediction of the

9:20neural network.

9:21Then you can either threshold at 0.5 or not to come up with the final prediction.

9:27And with that, let's go on to use this foundation we've built now to look at some even more

9:33complex, even larger neural network models.

9:37And I hope that by seeing more examples, this concept of layers and how to put them together

9:43to build a neural network will become even clearer.

9:46So let's go on to the next video.

---

0:01In the last video, you learned about the neural network layer and how that takes as input a vector of numbers and in turn outputs another vector of numbers.

0:12In this video, let's use that layer to build a more complex neural network.

0:17And through this, I hope that the notation that we're using for neural networks will become clearer and more concrete as well.

0:25Let's take a look.

0:26This is the running example that I'm going to use throughout this video as an example of a more complex neural network.

0:33This network has four layers, not counting the input layer, which is also called layer 0, where layers 1, 2, and 3 are hidden layers, and layer 4 is the output layer, and layer 0, as usual, is the input layer.

0:50By convention, when we say that a neural network has four layers, that includes all the hidden layers and the output layer, but we don't count the input layer.

1:00So, this is a neural network with four layers in the conventional way of counting layers in the network.

1:06Let's zoom in to layer 3, which is the third and final hidden layer, to look at the computations of that layer.

1:17Layer 3 inputs a vector, a superscript square bracket 2 that was computed by the previous layer, and it outputs a 3, which is another vector.

1:31So, what is the computation that layer 3 does in order to go from a 2 to a 3?

1:40If it has three neurons, or we call it three hidden units, then it has parameters w1, b1, w2, b2, and w3, b3, and it computes a1 equals sigmoid of w1 dot product with this input to the layer plus b1,

2:02and it computes a2 equals sigmoid of w2 dot product with, again, a2, the input to the layer, plus b2, and so on, to get a3, and then the output of this layer is a vector comprising a1, a2, and a3.

2:22And again, by convention, if we want to more explicitly denote that all of these are quantities associated with layer 3, then we add in all of these superscript square brackets 3 here,

2:36to denote that these parameters w and b are the parameters associated with neurons in layer 3, and that these activations are activations of layer 3.

2:48Notice that this term here is w1 superscript square bracket 3, meaning the parameters associated with layer 3, dot product with a superscript square bracket 2, which was the output of layer 2, which became the input to layer 3.

3:04So, that's why there's a 3 here, because it's a parameter associated with layer 3, dot product with, and there's a 2 there, because it's the output of layer 2.

3:14Now, let's just do a quick double-check of our understanding of this.

3:18I'm going to hide the superscripts and subscripts associated with the second neuron, and without rewinding this video, go ahead and rewind if you want, but I prefer you not,

3:32but without rewinding this video, are you able to think through what are the missing superscripts and subscripts in this equation and fill them in yourself?

3:41Why don't you take a look at the end video quiz and see if you can figure out what are the appropriate superscripts and subscripts for this equation over here.

3:50If you chose the first option, then you got it right.

3:54The activation of the second neuron at layer 3 is denoted by a32.

4:01To apply the activation function g, let's use the parameters of this same neuron.

4:07So, W and B will have the same subscript 2 and superscript square bracket 3.

4:15The input features will be the output vector from the previous layer, which is layer 2.

4:22So, that will be the vector A superscript 2.

4:27The second option is using vector A3, which is not the output vector from the previous layer.

4:35The input to this layer is A2.

4:39And the third option has A22 as input, which is just a single number rather than the vector.

4:48Because recall that the correct input is a vector, A2 with the little arrow on top and not just a single number.

4:58So, to recap, A3 is activation associated with layer 3 for the second neuron, hence it's a 2.

5:06It's a parameter associated with the third layer.

5:10For the second neuron, this is A2, same as above.

5:14And then plus B32.

5:17So, hopefully that makes sense.

5:19Here's the more general form of this equation for an arbitrary layer L and for an arbitrary unit J.

5:26Which is that A, the activation output of layer L, unit J, like A32, that's going to be the sigmoid function

5:38applied to this term, which is the weight vector of layer L, such as layer 3, for the J unit.

5:45So, there's 2 again in the example above.

5:48And so that's dot producted with A, the activation value of, and notice this is not L, this is L-1, like the 2 above here.

5:58Because you're dot producting with the output from the previous layer.

6:03And then plus B, the parameter for this layer, for that unit J.

6:09And so this gives you the activation of layer L's unit J.

6:14Where the superscript in square brackets, L, denotes layer L, and the subscript J denotes unit J.

6:21And when building neural networks, unit J refers to the Jth neuron.

6:26So, use those terms a little bit interchangeably, where each unit is a single neuron in the layer.

6:31G here is the sigmoid function.

6:34In the context of a neural network, G has another name, which is also called the activation function,

6:41because G outputs this activation value.

6:44So, when I say activation function, I mean this function G here.

6:49And so far, the only activation function you've seen is the sigmoid function.

6:54But next week, we'll look at when other functions than the sigmoid function can be plugged in in place of G as well.

7:01So, the activation function is just that function that outputs these activation values.

7:07And just one last piece of notation.

7:10In order to make all this notation consistent, I'm also going to give the input vector X another name, which is A0.

7:21So, this way, this same equation also works for the first layer, where when L is equal to 1,

7:27the activations of the first layer, that is A1, will be sigmoid times the weights dot product with A0,

7:36which is just this input feature vector X.

7:39So, with this notation, you now know how to compute the activation values of any layer in a neural network

7:46as a function of the parameters as well as the activations of the previous layer.

7:51So, you now know how to compute the activations of any layer given the activations of the previous layer.

7:58Let's put this into an inference algorithm for a neural network.

8:02In other words, how to get a neural network to make predictions.

8:06Let's go see that in the next video.

---

0:01Let's take what we've learned and put it together into an algorithm to let your neural network make inferences or make predictions.

0:09This will be an algorithm called forward propagation. Let's take a look.

0:14I'm going to use as a multi-example handwritten digit recognition.

0:19And for simplicity, we're just going to distinguish between the handwritten digits 0 and 1.

0:26So it's just a binary classification problem where we're going to input an image and classify is this the digit 0 or the digit 1.

0:34And you get to play with this yourself later this week in the practice lab as well.

0:38For the example of this line, I'm going to use an 8 by 8 image.

0:43And so this image of a 1 is this grid or matrix of 8 by 8 or 64 pixel intensity values where 255 denotes a bright white pixel and 0 would denote a black pixel.

0:58And different numbers are different shades of gray in between the shades of black and white.

1:05Given these 64 input features, we're going to use a neural network with two hidden layers where the first hidden layer has 25 neurons or 25 units.

1:17Second hidden layer has 15 neurons or 15 units.

1:21And then finally, the output layer outputs what's the chance of this being 1 versus 0.

1:27So let's step through the sequence of computations that the neural network would need to make to go from the input x, this 8 by 8 or 64 numbers to the predicted probability a3.

1:41The first computation is to go from x to a1.

1:45And that's what the first layer or the first hidden layer does.

1:49It carries out a computation of a superscript square bracket 1 equals this formula on the right.

1:56Notice that a1 has 25 numbers because this hidden layer has 25 units, which is why the parameters go from w1 through w25 as well as b1 through b25.

2:11And I've written x here, but I could also have written a0 here because by convention, the activation of layer 0, that is a0, is equal to the input feature value x.

2:23So that lets us compute a1.

2:26The next step is to compute a2.

2:29Looking at the second hidden layer, it then carries out this computation where a2 is a function of a1 and is computed as the safe-void activation function applied to w dot product a1 plus the corresponding value of b.

2:48Notice that layer 2 has 15 neurons or 15 units, which is why the parameters here run from w1 through w15 and b1 through b15.

3:01Now we've computed a2.

3:03The final step is then to compute a3.

3:07And we do so using a very similar computation, only now this third layer, the output layer, has just one unit, which is why there's just one output here.

3:19So a3 is just a scalar.

3:22And finally, you can optionally take a3, subscript 1, and threshold it at 0.5 to come up with a binary classification label.

3:32Is this the digit 1? Yes or no.

3:34So the sequence of computations first takes x and then computes a1 and then computes a2 and then computes a3, which is also the output of the neural network.

3:45So you can also write that as f of x.

3:48So remember when we learned about linear regression and logistic regression, we used f of x to denote the output of linear regression or logistic regression.

3:58So we can also use f of x to denote the function computed by the neural network as a function of x.

4:05Because this computation goes from left to right, you start from x, then compute a1, then a2, then a3.

4:12This algorithm is also called forward propagation because you're propagating the activations of the neurons.

4:20So you're making these computations in the forward direction from left to right.

4:26And this is in contrast to a different algorithm called backward propagation or backpropagation, which is used for learning.

4:33And that's something you learn about next week.

4:35And by the way, this type of neural network architecture, where you have more hidden units initially and then the number of hidden units decreases as you get closer to the output layer,

4:46that's also a pretty typical choice when choosing neural network architectures.

4:50And you see more examples of this in the practice lab as well.

4:53So that's neural network inference using the forward propagation algorithm.

4:59And with this, you'd be able to download the parameters of a neural network that someone else had trained and posted on the Internet.

5:07And you'd be able to carry out inference on your new data using their neural network.

5:13Now that you've seen the math and the algorithm, let's take a look at how you can actually implement this in TensorFlow.

5:20Specifically, let's take a look at this in the next video.

---

