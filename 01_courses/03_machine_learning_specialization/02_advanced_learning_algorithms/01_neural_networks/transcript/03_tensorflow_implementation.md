0:01TensorFlow is one of the leading frameworks for implementing deep learning algorithms.

0:06When I'm building projects, TensorFlow is actually the tool that I use the most often,

0:11and the other popular tool is PyTorch.

0:14But we're going to focus in this specialization on TensorFlow.

0:18In this video, let's take a look at how you can implement inference in code using TensorFlow.

0:24Let's dive in.

0:25One of the remarkable things about neural networks is the same algorithm can be applied to so many different applications.

0:33So in order, both for this video and in some of the labs, for you to see what a neural network is doing,

0:40I'm going to use another example to illustrate inference.

0:46So sometimes I do like to roast coffee beans myself at home.

0:50My favorite is actually Colombian coffee beans.

0:54So can the learning algorithm help optimize the quality of the beans you get from a roasting process like this?

1:01When you're roasting coffee, two parameters you get to control are the temperature at which you're heating up the raw coffee beans

1:09to turn them into nicely roasted coffee beans, as well as the duration or how long you're going to roast the beans.

1:16And in this slightly simplified example, we've created the data sets of different temperatures and different durations,

1:25as well as labels showing whether the coffee you roasted is good-tasting coffee,

1:32where cross here, the positive class, y equals 1, corresponds to good coffee,

1:37and O, the negative class, corresponds to bad coffee.

1:42So it looks like a reasonable way to think of this data set is if you cook it at too low a temperature,

1:50it doesn't get roasted and ends up undercooked.

1:54If you cook it not for long enough, the duration is too short.

1:58It's also not a nicely roasted set of beans.

2:01And finally, if you were to cook it either for too long or for too high a temperature,

2:06then you end up with overcooked beans.

2:09They're a little bit burnt beans, and so there's not good coffee either.

2:12And there's only points within this little triangle here that corresponds to good coffee.

2:19This example is simplified a bit from actual coffee roasting.

2:23Even though this example is a simplified one for the purpose of illustration,

2:29there have actually been serious projects using machine learning to optimize coffee roasting as well.

2:35So the task is, given a feature vector x with both temperature and duration,

2:41say 200 degrees Celsius for 17 minutes,

2:45how can we do inference in a neural network to get it to tell us whether or not

2:51this temperature and duration setting will result in good coffee or not?

2:56It looks like this.

2:59We're going to set x to be an array of two numbers,

3:06the input features 200 degrees Celsius and 17 minutes.

3:11Then you create layer 1 as this first hidden layer of the neural network as dense.

3:19Open parens units 3, that means 3 units or 3 hidden units in this layer,

3:25using as the activation function the sigmoid function.

3:29And dense is another name for the layers of a neural network that we've learned about so far.

3:35And as you learn more about neural networks, you learn about other types of layers as well.

3:41But for now, we'll just use the dense layer,

3:43which is the layer type you've learned about in the last few videos for all of our examples.

3:48So next, you compute A1 by taking layer 1,

3:53which is actually a function and applying this function layer 1 to the values of x.

3:59So that's how you get A1,

4:01which is going to be a list of three numbers because layer 1 had three units.

4:06And so A1 here may, just for the sake of illustration, be 0.2, 0.7, 0.3.

4:13Next, for the second hidden layer, layer 2 would be dense of,

4:18now this time it has one unit, and again, the sigmoid activation function.

4:23And you can then compute A2 by applying this layer 2 function to the activation values from layer 1 to A1.

4:31And that will give you the value of A2, which, for the sake of illustration, is maybe 0.8.

4:37Finally, if you wish the threshold is at 0.5,

4:41then you can just test if A2 is greater than or equal to 0.5

4:45and set y hat equals to 1 or 0, positive or negative plus, accordingly.

4:51So that's how you do inference in the neural network using TensorFlow.

4:55There are some additional details that I didn't go over here,

4:58such as how to load the TensorFlow library

5:01and how to also load the parameters W and B of the neural network.

5:07But we'll go over that in the lab, so please be sure to take a look at the lab.

5:11But these are the key steps for propagation and how you compute A1 and A2 and optionally threshold A2.

5:20Let's look at one more example, and we're going to go back to the handwritten digit classification problem.

5:28In this example, x is a list of the pixel intensity values.

5:32So x is equal to a NumPy array of this list of pixel intensity values.

5:37And then to initialize and carry out one step before propagation,

5:42layer 1 is a dense layer with 25 units and a sigmoid activation function.

5:49And you then compute A1 equals the layer 1 function applied to x.

5:54To build and carry out inference through the second layer,

5:59similarly, you set up layer 2 as follows and then compute A2 as layer 2 applied to A1.

6:07And then finally, layer 3 is the third and final dense layer.

6:13And then finally, you can optionally threshold A3 to come up with a binary prediction for y hat.

6:20So that's the syntax for carrying out inference in TensorFlow.

6:25One thing I briefly alluded to is the structure of the NumPy arrays.

6:30TensorFlow treats data in a certain way that is important to get right.

6:35So in the next video, let's take a look at how TensorFlow handles data.


---

0:02In this video, I want to step through with you how data is represented in NumPy and in

0:08TensorFlow, so that as you're implementing new neural networks, you can have a consistent

0:14framework to think about how to represent your data.

0:18One of the unfortunate things about the way things are done in code today is that many

0:23many years ago, NumPy was first created and became a standard library for linear algebra

0:28in Python.

0:30And then much later, the Google Brain team, the team that I had started and once led,

0:35created TensorFlow.

0:36And so unfortunately, there are some inconsistencies between how data is represented in NumPy and

0:42in TensorFlow.

0:44So it's good to be aware of these conventions so that you can implement correct code and

0:49hopefully get things running in your neural networks.

0:52Let's start by taking a look at how TensorFlow represents data.

0:56Let's say you have a dataset like this from the coffee example.

1:01I mentioned that you would write X as follows.

1:06So why do you have this double square bracket here?

1:11Let's take a look at how NumPy stores vectors and matrices.

1:17In case you think matrices and vectors are complicated mathematical concepts, don't worry

1:23about it.

1:24We'll go through a few concrete examples and you'll be able to do everything you need to

1:28do with matrices and vectors in order to implement your networks.

1:33Let's start with an example of a matrix.

1:37Here is a matrix with two rows and three columns.

1:43Notice that there are one, two rows and one, two, three columns.

1:51So we call this a two-by-three matrix.

1:57The convention is the dimension of the matrix is written as the number of rows by the number

2:04of columns.

2:05So in code, to store this matrix, this two-by-three matrix, you just write x equals np.array of

2:15these numbers like these, where you notice that the square bracket tells you that one,

2:22two, three is the first row of this matrix, and four, five, six is the second row of this

2:30matrix, and then this upper square bracket groups the first and the second row together.

2:38So this sets x to be this 2D array of numbers.

2:43So a matrix is just a 2D array of numbers.

2:48Let's look at one more example.

2:51Here I've written out another matrix.

2:54How many rows and how many columns does this have?

2:57Well, we can count.

2:58This has one, two, three, four rows, and it has one, two columns.

3:05So this is a number of rows by number of columns matrix, so it's a four-by-two matrix.

3:12And so to store this in code, you would write x equals np.array, and then this syntax over

3:19here to store these four rows of a matrix in the variable x.

3:25So this creates a 2D array of these eight numbers.

3:31Matrices can have different dimensions.

3:33You saw an example of a two-by-three matrix and a four-by-two matrix.

3:39A matrix can also be other dimensions like one-by-two or two-by-one, and we'll see examples

3:46of these on the next slide.

3:49So what we did previously when setting x to be input feature vectors was set x to be equal

3:56to np.array with two square brackets, 200 comma 17.

4:02And what that does is this creates a one-by-two matrix that is just one row and two columns.

4:13Let's look at a different example.

4:15If you were to define x to be np.array, but now written like this, this creates a two-by-one

4:24matrix that has two rows and one column because the first row is just the number 200, and

4:34the second row is just the number 17, and so this has the same numbers but in a two-by-one

4:42instead of a one-by-two matrix.

4:45In Nav, this example on top is also called a row vector.

4:49Here is a vector that is just a single row, and this example is also called a column vector

4:55because it's a vector that just has a single column.

5:00And the difference between using double square brackets like this versus a single square

5:06bracket like this is that whereas the two examples on top are of 2D arrays where one

5:14of the dimensions happens to be 1, this example results in a 1D vector.

5:22So this is just a 1D array that has no rows or columns, although by convention we may

5:29write x as a column like this.

5:33So I want to contrast this with what we had previously done in the first course, which

5:38was to write x like this with a single square bracket, and that resulted in what's called

5:46in Python a 1D vector instead of a 2D matrix.

5:50And this technically is not one-by-two or two-by-one, it's just a linear array with

5:55no rows or no columns, but it's just a list of numbers.

6:00So whereas in course one, when we're working with linear regression and logistic regression,

6:05we use these 1D vectors to represent the input features x, with TensorFlow the convention

6:12is to use matrices to represent the data.

6:16And why is there this switch in conventions?

6:19Well it turns out that TensorFlow was designed to handle very large datasets, and by representing

6:25the data in matrices instead of 1D arrays, it lets TensorFlow be a bit more computationally

6:31efficient internally.

6:34So going back to our original example, for the first training example in this dataset

6:39which features 200 degrees Celsius in 17 minutes, we would represent it like this, and so this

6:46is actually a one-by-two matrix that happens to have one row and two columns to store the

6:54numbers 200 and 17.

6:57And in case this seems like a lot of details and really complicated conventions, don't

7:02worry about it, all of this will become clearer and you get to see the concrete implementations

7:07of the code yourself in the optional labs and in the practice labs.

7:12Going back to the code for carrying out forward propagation or inference in the neural network,

7:18when you compute A1 equals layer one applied to x, what is A1?

7:26Well A1 is actually going to be, because there are three numbers, is actually going

7:31to be a one-by-three matrix.

7:35And if you print out A1, you will get something like this, tf.tensor.2.7.3 is a shape of one-by-three.

7:46One-three refers to that this is a one-by-three matrix, and this is TensorFlow's way of saying

7:53that this is a floating point number, meaning that it's a number that can have a decibel

7:58point represented using 32 bits of memory in your computer.

8:02That's what a float 32 is.

8:04And what is a tensor?

8:05A tensor here is a data type that the TensorFlow team had created in order to store and carry

8:12out computations on matrices efficiently.

8:15So whenever you see tensor, just think of it as matrix on these few slides.

8:22Typically, a tensor is a little bit more general than a matrix, but for the purposes

8:25of this course, think of tensor as just a way of representing matrices.

8:30So remember I said at the start of this video that there's the TensorFlow way of representing

8:36a matrix and the NumPy way of representing a matrix.

8:40This is an artifact of the history of how NumPy and TensorFlow were created, and unfortunately

8:46there are two ways of representing a matrix that have been baked into these systems.

8:54And in fact, if you want to take A1, which is a tensor, and want to convert it back to

9:00a NumPy array, you can do so with this function, A1.NumPy, and it will take the same data and

9:07return it in the form of a NumPy array rather than in the form of a TensorFlow array or

9:13TensorFlow matrix.

9:14Now let's take a look at what the activations output by the second layer would look like.

9:19Here's the code that we had from before.

9:21Layer 2 is a dense layer with one unit and a sequence activation, and A2 is computed

9:26by taking layer 2 and applying it to A1.

9:29So what is A2?

9:30A2 may be a number like 0.8, and technically this is a 1 by 1 matrix.

9:38It's a 2D array with one row and one column, and so it's equal to this number, 0.8.

9:48And if you print out A2, you see that it is a TensorFlow tensor with just one element,

9:55one number, 0.8, and it is a 1 by 1 matrix, and again it is a float 32, decimal point

10:04number, taking up 32 bits in computer memory.

10:08Once again, you can convert from a TensorFlow tensor to a NumPy matrix using A2.NumPy, and

10:17that will turn this back into a NumPy array that looks like this.

10:22So that hopefully gives you a sense of how data is represented in TensorFlow and in NumPy.

10:29I'm used to loading data and manipulating data in NumPy, but when you pass a NumPy array

10:35into TensorFlow, TensorFlow likes to convert it to its own internal format, the tensor,

10:41and then operate efficiently using tensors.

10:44And when you read the data back out, you can keep it as a tensor or convert it back to

10:48a NumPy array.

10:50I think it's a bit unfortunate that the history of how these libraries evolved has led us

10:55to have to do this extra conversion work when actually the two libraries can work quite

11:00well together.

11:02But when you convert back and forth, whether you're using a NumPy array or a tensor, it's

11:07just something to be aware of when you're writing code.

11:11Next, let's take what we've learned and put it together to actually build a neural network.

11:16Let's go see that in the next video.

---

0:01So you've seen a bunch of TensorFlow code by now, learned about how to build a layer

0:05in TensorFlow, how to do forward prop through a single layer in TensorFlow, and also learned

0:11about data in TensorFlow.

0:13Let's put it all together and talk about how to build a neural network in TensorFlow.

0:19This is also the last video on TensorFlow for this week, and in this video, you'll also

0:24learn about a different way of building a neural network that will be even a little

0:28bit simpler than what you've seen so far.

0:31So let's dive in.

0:32What you saw previously was, if you want to do forward prop, you initialize the data X,

0:40create layer 1 like so, then compute A1, then create layer 2, and compute A2.

0:46So this was an explicit way of carrying out forward prop one layer of computation at a

0:52time.

0:55It turns out that TensorFlow has a different way of implementing forward prop as well

1:03as learning.

1:04Let me show you a different way of building a neural network in TensorFlow, which is that,

1:10same as before, you're going to create layer 1 and create layer 2, but now, instead of

1:17you manually taking the data and passing it to layer 1 and then taking the activations

1:22from layer 1 and passing it to layer 2, we can instead tell TensorFlow that we would

1:29like it to take layer 1 and layer 2 and string them together to form a neural network.

1:35That's what the sequential function in TensorFlow does, which is it says, Dear TensorFlow, please

1:42create a neural network for me by sequentially stringing together these two layers that I

1:48just created.

1:50It turns out that with the sequential framework, TensorFlow can do a lot of work for you.

1:58Let's say you have a training set like this on the left.

2:00This is for the coffee example.

2:03You can then take the training data's inputs X and put them into a NumPy array.

2:11This here is a 4 by 2 matrix, and the target labels Y can then be written as follows.

2:21This is just a one-dimensional array of length 4.

2:26Y, this set of targets, can then be stored as a 1D array like this, 1 0 0 1, corresponding

2:34to the four training examples.

2:36It turns out that given the data X and Y stored in this matrix X and this array Y,

2:45if you want to train this neural network, all you need to do is call two functions.

2:51You need to call model.compile with some parameters.

2:55We'll talk more about this next week, so don't worry about it for now.

2:59Then you need to call model.fitXY, which tells TensorFlow to take this neural network

3:07that it created by sequentially string together layers 1 and 2, and to train it on the data

3:15X and Y.

3:16But we'll learn the details of how to do this next week.

3:22Then finally, how do you do inference on this neural network?

3:26How do you do forward prop?

3:27If you have a new example, say X new, which is NP array with these two features, then

3:34to carry out forward prop, instead of having to do it one layer at a time yourself, you

3:40just have to call model.predict on X new, and this will output the corresponding value

3:48of A2 for you, given this input value of X.

3:55Model.predict carries out forward propagation, or carries out inference for you using this

4:00neural network that you compiled using the sequential function.

4:05Now I want to take these three lines of code on top and just simplify it a little bit further,

4:13which is when coding TensorFlow, by convention, we don't explicitly assign the two layers

4:20to two variables, layer 1 and layer 2, as follows.

4:24But by convention, I would usually just write the code like this.

4:28What we say the model is a sequential model of a few layers strung together sequentially,

4:34where the first layer, layer 1, is a dense layer with three units and activation of sigmoid,

4:41and the second layer is a dense layer with one unit and again a sigmoid activation function.

4:47So if you look at others' TensorFlow code, you often see it look more like this, rather

4:52than having an explicit assignment to these layer 1 and layer 2 variables.

4:59And so that's it.

5:01This is pretty much the code you need in order to train, as well as do inference on, a neural

5:09network in TensorFlow, where again, we'll talk more about the training bits of this,

5:13the compile and the fit function, next week.

5:18Let's redo this for the digit classification example, as well.

5:23So previously, we had x is this input, layer 1 is the layer, a1 equals layer 1 applied

5:30to x, and so on, through layer 2 and layer 3, in order to try to classify a digit.

5:36With this new coding convention, with using TensorFlow's sequential function, you can

5:42instead specify what are layer 1, layer 2, layer 3, and tell TensorFlow to string the

5:49layers together for you into a neural network.

5:53And same as before, you can then store the data in a matrix and run the compile function

6:01and fit the model as follows.

6:03Again, more on this next week.

6:06And finally, to do inference or to make predictions, you can use model predict on x new.

6:15And similar to what you saw before, with the coffee classification network, by convention,

6:21instead of assigning layer 1, layer 2, layer 3, explicitly like this, we would more commonly

6:26just take these layers and put them directly into the sequential function, so you end up

6:31with this more compact code, where you just tell TensorFlow, create a model for me that

6:36sequentially strings together these three layers, and then the rest of the code works

6:40same as before.

6:41So that's how you would build a neural network in TensorFlow.

6:46Now I know that when you're learning about these techniques, sometimes someone may ask

6:49you to, hey, implement these five lines of code, and then you type five lines of code,

6:54and then someone says, congratulations, with just five lines of code, you've built this

6:58crazy complicated, state-of-the-art neural network.

7:01And sometimes that makes you wonder, what exactly did I do with just these five lines

7:05of code?

7:07One thing I want you to take away from the machine learning specialization is the ability

7:11to use cutting-edge libraries like TensorFlow to do your work efficiently.

7:17But I don't really want you to just call five lines of code and not really also know what

7:22the code is actually doing underneath the hood.

7:26So in the next video, I'd like to go back and share with you how you can implement from

7:30scratch by yourself, forward propagation in Python, so that you can understand the

7:35whole thing for yourself.

7:37In practice, most machine learning engineers don't actually implement forward propagation

7:42in Python that often.

7:44We just use libraries like TensorFlow and PyTorch.

7:47But because I want you to understand how these algorithms work yourself, so that if something

7:52goes wrong, you can think through for yourself what you might need to change, what's likely

7:56to work, what's less likely to work.

7:59Let's also go through what it would take for you to implement forward propagation from

8:03scratch.

8:04Because that way, even when you're calling a library and having it run efficiently and

8:09do great things in your application, I want you in the back of your mind to also have

8:14that deeper understanding of what your code is actually doing.

8:19So with that, let's go on to the next video.