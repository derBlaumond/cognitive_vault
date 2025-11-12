0:02If you had to implement forward propagation yourself from scratch in Python, how would

0:07you go about doing so?

0:09In addition to gaining intuition about what's really going on in libraries like TensorFlow

0:14and PyTorch, if ever someday you decide you want to build something even better than TensorFlow

0:20and PyTorch, maybe now you'd have a better idea how.

0:24I don't really recommend doing this for most people, but maybe someday someone will

0:28come up with an even better framework than TensorFlow and PyTorch, and whoever does that

0:33may end up having to implement these things from scratch themselves.

0:37So let's take a look.

0:39On this slide, I'm going to go through quite a bit of code, and you'll see all this code

0:44again later in the optional lab as well as in the practice lab.

0:48So don't worry about having to take notes on every line of code or memorize every line

0:52of code.

0:53You see this code written down in the Jupyter Notebook in the lab, and the goal of this

0:59video is to just show you the code to make sure you can understand what it's doing so

1:04that when you go to the optional lab and the practice lab and see the code there, you know

1:08what to do.

1:09So don't worry about taking detailed notes on every line.

1:13If you can read through the code on this slide and understand what it's doing, that's all

1:17you need.

1:18So let's take a look at how you implement forward prop in a single layer.

1:23We're going to continue using the coffee roasting model shown here, and let's look at how you

1:30would take an input feature vector x and implement forward prop to get this output a2.

1:40In this Python implementation, I'm going to use 1D arrays to represent all of these vectors

1:47and parameters, which is why there's only a single square bracket here.

1:51This is a 1D array in Python rather than a 2D matrix, which is what we had when we had

1:57double square brackets.

1:59So the first value you need to compute is a superscript square bracket 1 subscript 1,

2:06which is the first activation value of a1, and that's g of this expression over here.

2:13So I'm going to use the convention on this slide that a term like w21, I'm going to represent

2:22as a variable w2 and then subscript 1.

2:26This underscore 1 denotes subscript 1, so w2 means w superscript 2 in square brackets

2:33and then subscript 1.

2:36So to compute a11, we have parameters w11 and b11, which are say 1, 2 and negative 1.

2:50You would then compute z11 as the dot product between that parameter w11 and the input x

3:00and add it to b11.

3:03And then finally, a11 is equal to g, the safe point function, applied to z11.

3:12Next let's go on to compute a12, which again by the convention I described here is going

3:18to be a12 written like that.

3:23So similar as what we did on the left, w12 is your two parameters, minus v for b12 is

3:31the term b12 over there, so you compute z as this term in the middle and then apply

3:37the safe point function and then you end up with a12.

3:42And finally, you do the same thing to compute a13.

3:48Now you've computed these three values a11, a12, and a13 and we'd like to take these three

3:57numbers and group them together into an array to give you a1 up here, which is the output

4:04of the first layer, and so you do that by grouping them together using a numpy array

4:10as follows.

4:11So now you've computed a1, let's implement the second layer as well to compute the output

4:18a2.

4:20So a2 is computed using this expression and so we would have parameters w21 and b21 corresponding

4:29to these parameters and then you would compute z as the dot product between w21 and a1 and

4:37add b21 and then apply the safe point function to get a21 and that's it.

4:44That's how you implement FOILPROP using just Python and numpy.

4:49Now there are a lot of expressions in this page of code that you just saw.

4:54Let's in the next video look at how you can simplify this to implement FOILPROP for a

4:58more general neural network rather than hard coding it for every single neuron like we

5:03just did.

5:04So let's go see that in the next video.

---

0:02In the last video, you saw how to implement forward prop in Python, but by hard-coding

0:07lines of code for every single neuron.

0:10Let's now take a look at the more general implementation of forward prop in Python.

0:15Similar to the previous video, my goal in this video is to show you the code so that

0:20when you see it again in the practice lab and the optional labs, you know how to interpret

0:25it.

0:26So as we walk through this example, don't worry about taking notes on every single line

0:30of code.

0:31If you can read through the code and understand it, that's definitely enough.

0:36So what you can do is write a function to implement a dense layer that is a single layer

0:42of a neural network.

0:45So I'm going to define the dense function, which takes as input the activation from the

0:50previous layer, as well as the parameters w and b for the neurons in a given layer.

0:59Using the example from the previous video, if layer 1 has 3 neurons, and if w1 and w2

1:11and w3 are these, then what we'll do is stack all of these weight vectors into a matrix.

1:19This is going to be a 2 by 3 matrix, where the first column is the parameter w11, the

1:29second column is the parameter w12, and the third column is the parameter w13.

1:36And then in a similar way, if you have parameters b, b11 equals negative 1, b12 equals 1, and

1:45so on, then we're going to stack these three numbers into one D-array, b, as follows, negative

1:531, 1, 2.

1:54So what the dense function will do is take as input the activation from the previous

1:59layer, and a here could be a0, which is equal to x, or the activation from a later layer,

2:07as well as the w parameters stacked in columns like shown on the right, as well as the b

2:15parameters also stacked into a one D-array like shown to the left, over there.

2:23And what this function will do is input a, the activation from the previous layer, and

2:30will output the activations from the current layer.

2:34So let's step through the code for doing this.

2:37Here's the code.

2:39First, units equals w dot shape 1, so w here is a 2 by 3 matrix, and so the number of columns

2:49is 3, that's equal to the number of units in this layer.

2:53So here, units would be equal to 3, and looking at the shape of w, it's just a way of pulling

3:00out the number of hidden units, or the number of units in this layer.

3:05Next, we set a to be an array of zeros with as many elements as there are units.

3:12So in this example, we need to output three activation values, so this just initializes

3:17a to be 0, 0, 0, an array of three zeros.

3:22Next, we go through a for loop to compute the first, second, and third elements of a.

3:28So for j in range units, so j goes from 0 to units minus 1, so it goes from 0, 1, 2,

3:35indexing from 0 in Python as usual.

3:38This command, w equals capital W colon comma j, this is how you pull out the jth column

3:47of a matrix in Python.

3:50So the first time through this loop, this will pull out the first column of w, and so

3:55it will pull out w11.

3:59The second time through this loop, when you're computing the activation of the second unit,

4:03it will pull out the second column corresponding to w12, and so on for the third time through

4:09this loop.

4:11And then you compute z using the usual formula as a dot product between that parameter w

4:17and the activation that you had received, plus bj.

4:23And then you compute the activation, aj equals g, sigmoid function applied to z.

4:29So three times through this loop, and you've computed the values for all three values of

4:33this vector of activations a, and then finally you return a.

4:39So what the dense function does is it inputs the activations from the previous layer, and

4:44given the parameters for the current layer, it returns the activations for the next layer.

4:50So given the dense function, here's how you can string together a few dense layers sequentially

4:56in order to implement forward prop in the neural network.

5:00Given the input features x, you can then compute the activations a1 to be a1 equals dense of

5:10x, w1, b1, where here w1, b1 are the parameters, sometimes also called the weights, of the

5:19first hidden layer.

5:21Then you can compute a2 as dense of a1, which you just computed above, and w2, b2, which

5:30are the parameters or weights of this second hidden layer, and then compute a3 and a4.

5:38And if this is a neural network with four layers, then the final output, f of x, is

5:44just equal to a4, and so you return f of x.

5:49Notice that here I'm using a capital W because one of the notational conventions from linear

5:55algebra is to use uppercase or capital alphabets when it's referring to a matrix, and lowercase

6:02to refer to vectors and scalars.

6:05So because this is a matrix, this is capital W.

6:08So that's it.

6:09You now know how to implement forward prop yourself from scratch.

6:13And you get to see all this code and run it and practice it yourself in the practice

6:17lab coming after this as well.

6:20I think that even when you're using powerful libraries like TensorFlow, it's helpful to

6:25know how it works under the hood.

6:27Because in case something goes wrong, in case something runs really slowly, or you have

6:31a strange result, or it looks like there's a bug, your ability to understand what's actually

6:37going on will make you much more effective when debugging your code.

6:41When I run machine learning algorithms a lot of the time, frankly, it doesn't work, certainly

6:46not the first time.

6:47And so I find that my ability to debug my code, be it TensorFlow code or something else,

6:53is really important to being an effective machine learning engineer.

6:57So even when you're using TensorFlow or some other framework, I hope that you find this

7:03deeper understanding useful for your own applications and for debugging your own machine learning

7:09algorithms as well.

7:11So that's it.

7:13That's the last required video of this week with code in it.

7:17In the next video, I'd like to dive into what I think is a fun and fascinating topic, which

7:21is what is the relationship between neural networks and AI or AGI, artificial general

7:28intelligence?

7:29This is a controversial topic, but because it's been so widely discussed, I want to share

7:34with you some thoughts on this.

7:36So when you are asked, are neural networks at all on the path to human level intelligence,

7:43you have a framework for thinking about that question.

7:47Let's go take a look at that fun topic, I think, in the next video.