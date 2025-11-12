0:01One of the reasons that deep learning researchers have been able to scale up neural networks

0:07and build really large neural networks over the last decade is because neural networks can be vectorized.

0:14They can be implemented very efficiently using matrix multiplications.

0:19And it turns out that parallel computing hardware, including GPUs, but also some CPU functions,

0:26are very good at doing very large matrix multiplications.

0:30In this video, we'll take a look at how these vectorized implementations of neural networks work.

0:36Without these ideas, I don't think deep learning would be anywhere near success and scale today.

0:42Here on the left is the code that you had seen previously of how you would implement forward prop

0:50or forward propagation in a single layer.

0:55X here is the input.

0:58W, the weights of the first, second, and third neurons, say.

1:03Parameters B, and then this is the same code as what you saw before.

1:08And this will output three numbers, say, like that.

1:12And if you actually implement this computation, you get 101.

1:17It turns out you can develop a vectorized implementation of this function as follows.

1:26Set X to be equal to this.

1:29Notice the double square brackets.

1:31So this is now a 2D array, like in TensorFlow.

1:36W is the same as before.

1:38And B, I'm now using capital B, is also a 1 by 3 2D array.

1:47And then it turns out that all of these steps, this for loop inside, can be replaced with just a couple lines of code.

1:56Z equals np.matmul.

2:00Matmul is how NumPy carries out matrix multiplication.

2:04Where now X and W are both matrices, and so you just multiply them together.

2:11And it turns out that this for loop, all of these lines of code, can be replaced with just a couple lines of code,

2:18which gives a vectorized implementation of this function.

2:23So you compute Z, which is now a matrix again, as np.matmul between A-in and W.

2:32Where here A-in and W are both matrices.

2:36And matmul is how NumPy carries out a matrix-matrix multiplication.

2:41It multiplies two matrices together, and then adds the matrix B to it.

2:45And then A here, or A out, is equal to deactivation function G, that is a sigmoid function,

2:53applied element-wise to this matrix Z, and then you finally return A out.

3:00So this is what the code looks like.

3:04Notice that in the vectorized implementation, all of these quantities, X, which is fed into the value of A-in,

3:11as well as W, B, as well as Z, and A out, all of these are now 2D arrays.

3:17All of these are matrices, and this turns out to be a very efficient implementation

3:24of one step before propagation through a dense layer in the neural network.

3:29So this is code for a vectorized implementation of forward prop in a neural network.

3:35But what is this code doing, and how does it actually work?

3:39And what is this matmul actually doing?

3:42In the next two videos, both also optional, we'll go over matrix multiplication and how that works.

3:50If you're familiar with linear algebra, if you're familiar with vectors, matrices, transposes,

3:57and matrix-matrix multiplications, you can safely just quickly skim over these two videos

4:03and jump to the last video of this week.

4:06And then in the last video of this week, also optional, we'll dive into more detail

4:11to explain how matmul gives you this vectorized implementation.

4:15And so with that, let's go on to the next video, where we'll take a look at what matrix multiplication is.

---
0:02So you know that a matrix is just a block or 2D array of numbers.

0:08What does it mean to multiply two matrices?

0:10Let's take a look.

0:12In order to build up to multiplying matrices, let's start by looking at how we tick dot

0:19products between vectors.

0:22Let's use the example of ticking the dot product between this vector, 1, 2, and this

0:27vector, 3, 4.

0:30If z is the dot product between these two vectors, then you compute z by multiplying

0:35the first element by this first element here, so it's 1 times 3, plus the second element

0:42times the second element, plus 2 times 4, and so that's just 3 plus 8, which is equal

0:47to 11.

0:50In the more general case, if z is the dot product between a vector a and a vector w,

0:58then you compute z by multiplying the first element together, and then the second element

1:03together, and the third, and so on, and then adding up all of these products.

1:07So that's the vector-vector dot product.

1:10It turns out there's another equivalent way of writing a dot product, which is given a

1:16vector a, that is, 1, 2, written as a column, you can turn this into a row, that is, you

1:25can turn it from what's called a column vector to a row vector by taking the transpose of

1:32a.

1:33So the transpose of a vector a means you take this vector and lay its elements on the side

1:41like this.

1:43And it turns out that if you multiply a transpose, this is a row vector, or you can think of

1:50this as a 1 by 2 matrix, with w, which you can now think of as a 2 by 1 matrix, then

2:00z equals a transpose times w, and this is the same as taking the dot product between

2:07a and w.

2:11So to recap, z equals the dot product between a and w is the same as z equals a transpose,

2:19this is a, laid on the side, multiplied by w.

2:25And this will be useful for understanding matrix multiplication, that these are just

2:30two ways of writing the exact same computation to arrive at z.

2:36Now let's look at vector matrix multiplication, which is when you take a vector and you multiply

2:42a vector by a matrix.

2:45Here again is the vector a, 1, 2, and a transpose is a laid on the side, so rather than just

2:53kind of think of this as a 2 by 1 matrix, it becomes a 1 by 2 matrix.

3:00And let me now create a 2 by 2 matrix w with these four elements, 3, 4, 5, 6.

3:07If you want to compute capital Z as a transpose times w, so let's see how you would go about

3:18doing so.

3:19It turns out that z is going to be a 1 by 2 matrix, and to compute the first value of

3:29z, we're going to take a transpose, 1, 2 here, and multiply that by the first column

3:36of w, so that's 3, 4.

3:40And so to compute the first element of z, you end up with 1 times 3 plus 2 times 4,

3:48which we saw earlier is equal to 11, and so the first element of z is 11.

3:55Let's figure out what's the second element of z.

3:58Turns out you just repeat this process, but now I'm multiplying a transpose by the second

4:05column of w, and so to do that computation, you have 1 times 5 plus 2 times 6, which is

4:15equal to 5 plus 12, which is 17, so that's equal to 17.

4:22The z is equal to this 1 by 2 matrix, 11 and 17.

4:28Now just one last thing, and then that'll take us to the end of this video, which is

4:34how to take vector matrix multiplication and generalize it to matrix matrix multiplication.

4:41I have a matrix A with these four elements.

4:45The first column is 1, 2, and the second column is negative 1, negative 2, and I want to know

4:52how to compute A transpose times w.

4:57Unlike the previous slide, A now is a matrix rather than just a vector, but the matrix

5:03is just a set of different vectors stacked together in columns.

5:08So first, let's figure out what is A transpose.

5:12In order to compute A transpose, we're going to take the columns of A, and similar to what

5:17happened when you transpose a vector, we're going to take the columns and lay them on

5:22the side, one column at a time.

5:25So the first column, 1, 2, becomes the first row, 1, 2, because it's just laid on the side,

5:31and this second column, negative 1, negative 2, becomes laid on the side, negative 1, negative

5:372, like this.

5:39So the way you transpose a matrix is you take the columns and you just lay the columns on

5:43the side, one column at a time.

5:45So you end up with this being A transpose.

5:48Next, we have this matrix, w, which we're going to write as 3, 4, 5, 6.

5:55So there's a column 3, 4, and a column 5, 6.

6:00One way I encourage you to think of matrices that's useful for neural network implementations

6:06is if you see a matrix, think of the columns of the matrix, and if you see the transpose

6:13of a matrix, think of the rows of that matrix as being grouped together, as illustrated

6:18here with A and A transpose, as well as w.

6:22And now, let me show you how to multiply A transpose and w.

6:29In order to carry out this computation, let me call the columns of A, A1 and A2, and that

6:38means that A1 transpose is the first row of A transpose, and A2 transpose is the second

6:47row of A transpose.

6:49And then, same as before, let me call the columns of w to be w1 and w2.

6:57So it turns out that to compute A transpose w, the first thing we need to do is, let's

7:04just ignore the second row of A, and let's just pay attention to the first row of A,

7:11and let's take this row 1, 2, that is A1 transpose, and multiply that with w.

7:18So you already know how to do that from the previous slide.

7:22The first element is 1, 2, inner product or dot product with 3, 4, so that ends up with

7:283 times 1 plus 2 times 4, which is 11.

7:32And then the second element is 1, 2, A transpose, inner product with 5, 6, so that's 5 times

7:401 plus 6 times 2, which is 5 plus 12, which is 17.

7:46So that gives you the first row of z equals A transpose w.

7:51So all we've done is take A1 transpose and multiply that by w.

7:56That's exactly what we did on the previous slide.

8:00Next, let's forget A1 for now, and let's just look at A2, and take A2 transpose and

8:07multiply that by w.

8:10So now we have A2 transpose times w, and to compute that, first we take negative 1 and

8:17negative 2, and dot product that with 3, 4.

8:21So that's negative 1 times 3 plus negative 2 times 4, and that turns out to be negative

8:2711.

8:29And then we have to compute A2 transpose times the second column, and that's negative

8:361 times 5 plus negative 2 times 6, and that turns out to be negative 17.

8:43So you end up with A transpose times w is equal to this 2 by 2 matrix over here.

8:51Let's talk about the general form of matrix multiplication next.

8:54So let's go see that in the next video.

8:58So this was an example of how you multiply a vector with a matrix, or a matrix with a

9:04matrix.

9:05There's a lot of dot products between vectors, but all did in a certain way to construct

9:09the elements of the output z one element at a time.

9:14I know this was a lot, but in the next video, let's look at the general form of how a matrix

9:20matrix multiplication is defined, and I hope that that will make all this clear as well.

9:25Let's go on to the next video.

---
0:02So, let's take a look at the general form of how you multiply two matrices together.

0:08And then, in the last video after this one, we'll take this and apply it to the vectorized

0:13implementation of a neural network.

0:16Let's dive in.

0:17Here's a matrix A, which is a 2 by 3 matrix, because it has two rows and three columns.

0:26As before, I'd encourage you to think of the columns of this matrix as three vectors.

0:33Vectors A1, A2, and A3.

0:37And what we're going to do is take A transpose and multiply that with a matrix W.

0:44The first, what is A transpose?

0:46Well, A transpose is obtained by taking the first column of A and laying it on its side

0:52like this, and then taking the second column of A and laying it on its side like this,

0:57and then the third column of A and laying it on its side like that.

1:00And so these rows are now A1 transpose, A2 transpose, and A3 transpose.

1:08Next, here's a matrix W. I encourage you to think of W as vectors, W1, W2, W3, and W4

1:20stacked together.

1:22Let's look at how you then compute A transpose times W.

1:26Now, notice that I've also used slightly different shades of orange to denote the different columns

1:33of A, where the same shade corresponds to numbers that we think of as grouped together

1:39into a vector, and that same shade is used to indicate different rows of A transpose,

1:46because the different rows of A transpose are A1 transpose, A2 transpose, and A3 transpose.

1:52And in a similar way, I've used different shades to denote the different columns of

1:57W, because the numbers of the same shade of blue are the ones that are grouped together

2:03to form the vectors W1, or W2, or W3, or W4.

2:08Now let's look at how you can compute A transpose times W.

2:15I'm going to draw vertical bars with the different shades of blue, and horizontal bars with the

2:19different shades of orange to indicate which elements of Z, that is A transpose W, are

2:29influenced or affected by the different rows of A transpose, and which are influenced or

2:36affected by the different columns of W.

2:40So for example, let's look at the first column of W, so that's W1, as indicated by the lightest

2:46shade of blue here.

2:49So W1 will influence or correspond to this first column of Z, shown here by this lightest

2:59shade of blue, and the values of this second column of W, that is W2, as indicated by this

3:07second lightest shade of blue, will affect the values computed in the second column of

3:12Z, and so on for the third and fourth columns.

3:18Correspondingly, let's look at A transpose.

3:21A1 transpose is the first row of A transpose, as indicated by the lightest shade of orange,

3:27and A1 transpose will affect, or influence, or correspond to the values in the first row

3:34of Z, and A2 transpose will influence the second row of Z, and A3 transpose will influence

3:42or correspond to this third row of Z.

3:46So let's figure out how to compute the matrix Z, which is going to be a 3 by 4 matrix, so

3:53with 12 numbers all together.

3:55Let's start off and figure out how to compute the number in the first row and the first

4:01column of Z, so this upper left most element here.

4:05Because this is the first row and the first column corresponding to the lightest shade

4:09of orange and the lightest shade of blue, the way you compute that is to grab the first

4:14row of A transpose and the first column of W, and take their inner product, or the dot

4:20product.

4:22And so this number is going to be 1 2 dot product with 3 4, which is 1 times 3 plus

4:302 times 4, which is equal to 11.

4:35Let's look at a second example.

4:36How would you compute this number, this element of Z?

4:42So this is in the third row, row 1, row 2, row 3, so this is in row 3, and the second

4:48column, column 1, column 2.

4:50So to compute the number in row 3, column 2 of Z, you would now grab row 3 of A transpose

5:01and column 2 of W, and dot product those together.

5:05Notice that this corresponds to the darkest shade of orange and the second lightest shade

5:10of blue.

5:12And to compute this, this is 0.1 times 5 plus 0.2 times 6, which is 0.5 plus 1.2, which

5:22is equal to 1.7.

5:25So to compute the number in row 3, column 2 of Z, you grab the third row, row 3 of A

5:31transpose and column 2 of W.

5:34Let's look at one more example, and let's see if you can figure this one out.

5:40So this is row 2, column 3 of the matrix Z.

5:47Why don't you take a look and see if you can figure out which row and which column to grab

5:52to dot product together, and therefore, what is the number that will go in this element

5:58of this matrix.

5:59Hopefully, you got that you should be grabbing row 2 of A transpose and column 3 of W, and

6:08when you dot product that together, you have A2 transpose W3 is negative 1 times 7 plus

6:15negative 2 times 8, which is negative 7 plus negative 16, which is equal to negative 23.

6:22And so that's how you compute this element of the matrix Z.

6:26And it turns out if you do this for every element of the matrix Z, then you can compute

6:31all of the numbers in this matrix, which turns out to look like that.

6:37Feel free to pause the video if you want, and pick any element, and double check that

6:40the formula we've been going through gives you the right value for Z.

6:46I just want to point out one last interesting requirement for multiplying matrices together,

6:54which is that X transpose here is a 3 by 2 matrix, because it has 3 rows and 2 columns,

7:01and W here is a 2 by 4 matrix, because it has 2 rows and 4 columns.

7:08One requirement in order to multiply two matrices together is that this number must match that

7:15number, and that's because you can only take dot products between vectors that are the

7:21same length.

7:22So you can take the dot product between a vector with two numbers, and that's because

7:28you can take the inner product between a vector of length 2 only with another vector of length

7:342.

7:35You can't take the inner product between a vector of length 2 with a vector of length

7:393, for example.

7:41And that's why matrix multiplication is valid only if the number of columns of the first

7:47matrix, that is A transpose here, is equal to the number of rows of the second matrix,

7:54which is the number of rows of W here.

7:57So that when you take dot products during this process, you're taking dot products of

8:02vectors of the same size.

8:05And then the other observation is that the output Z equals A transpose W, the dimensions

8:13of Z is 3 by 4.

8:15And so the output of this multiplication will have the same number of rows as X transpose,

8:23and the same number of columns as W. And so that too is another property of matrix

8:29multiplication.

8:31So that's matrix multiplication.

8:34All of these videos are optional, so thank you for sticking with me through these.

8:38And if you're interested, later in this week there are also some purely optional quizzes

8:44to let you practice some more of these calculations yourself as well.

8:47So with that, let's take what we've learned about matrix multiplication and apply it back

8:53to the vectorized implementation of a neural network.

8:55I have to say, the first time I understood the vectorized implementation, I thought it

9:00was actually really cool.

9:02I've been implementing neural networks for a while myself without the vectorized implementation,

9:08and when I finally understood the vectorized implementation and implemented it that way

9:13for the first time, it ran blazingly much faster than anything I've ever done before.

9:18And I thought, wow, I wish I had figured this out earlier.

9:21The vectorized implementation, it is a little bit complicated, but it makes neural networks

9:26run much faster.

9:28So let's take a look at that in the next video.

---
0:01So, without further ado, let's jump into the vectorized implementation of a neural network.

0:07We'll look at the code that you have seen in an earlier video,

0:10and hopefully matmul, that is, that matrix multiplication calculation, will make more sense.

0:16Let's jump in.

0:17So you saw previously how you can take the matrix A

0:20and compute A transpose times W, resulting in this matrix here, Z.

0:27In code, if this is the matrix A, this is a NumPy array with the elements corresponding to what I wrote on top,

0:37then A transpose, which I'm going to write as AT, is going to be this matrix here,

0:42with, again, the columns of A now laid out in rows instead.

0:49And, by the way, instead of setting up AT this way, another way to compute AT in NumPy would be to write AT equals A dot T.

1:01That's the transpose function that takes the columns of the matrix and lays them on the side.

1:07In code, here's how you would initialize the matrix W as another 2D NumPy array,

1:15and then to compute Z equals A transpose times W, you would write Z equals NP dot matmul AT comma W.

1:27And that will compute this matrix Z over here, giving you this result down here.

1:35And, by the way, if you read others' code, sometimes you see Z equals AT and then the at symbol W.

1:43This is an alternative way of calling the matmul function, although I find using NP dot matmul to be clearer,

1:52and so the code you see in this class will just use the matmul function like this, rather than this at symbol.

1:58So, let's look at what a vectorized implementation of forward prop looks like.

2:03I'm going to set A transpose to be equal to the input feature values 217.

2:11So these are just the usual input feature values, 200 degrees, roasting coffee for 17 minutes.

2:17So this is a 1 by 2 matrix, and I'm going to take the parameters W1, W2, and W3,

2:27and stack them in columns like this to form this matrix capital W.

2:33And the values B1, B2, B3, I'm going to put into a 1 by 3 matrix that is this matrix B as follows.

2:42Then it turns out that if you were to compute Z equals A transpose W plus B,

2:50that will result in these three numbers, and that's computed by taking the input feature values

2:59and multiplying that by the first column and then adding B to get 165.

3:06Taking these feature values, dot producting with the second column, that is the weights W2,

3:12and adding B2 to get negative 531, and these feature values dot product with the weights W3 plus B3 to get 900.

3:24Feel free to pause the video if you wish to double check these calculations,

3:28but this gives you the values of Z11, Z12, and Z13.

3:37And then finally, if the function G applies the sigmoid function to these three numbers element-wise,

3:44that is applies the sigmoid function to 165, to negative 531, and to 900,

3:49then you end up with A equals G of this matrix Z ends up being 101.

3:57And it's 101 because sigmoid of 165 is so close to 1 that up to numerical round off, it's basically 1,

4:04and these are basically 0 and 1.

4:07Let's look at how you implement this in code.

4:10A transpose is equal to this, is this 1 by 2 array of 217.

4:16The matrix W is this 2 by 3 matrix, and B is this 1 by 3 matrix.

4:25And so the way you can implement forward prop in the layer is dense input A transpose WB is equal to Z equals matmul A transpose times W plus B.

4:38So that just implements this line of code.

4:41And then A out, that is the output of this layer, is equal to G, the activation function applied element-wise to this matrix Z.

4:54And you return A out, and that gives you this value.

4:59In case you're comparing this slide with the slide a few videos back, there was just one little difference,

5:05which was by convention, the way this is implemented in TensorFlow, and rather than calling this variable AT,

5:12we were calling it AIN, which is why this too is a correct implementation of the code.

5:19And there is a convention in TensorFlow that individual examples are actually laid out in rows in the matrix X,

5:28rather than in the matrix X transpose, which is why the code implementation actually looks like this in TensorFlow.

5:35But this explains why, with just a few lines of code, you can implement forward prop in the neural network,

5:41and moreover, get a huge bonus because modern computers are very good at implementing matrix multiplication such as matmul efficiently.

5:50That's the last video of this week.

5:52Thanks for sticking with me all the way through the end of these optional videos.

5:57For the rest of this week, I hope you also take a look at the quizzes and the practice labs,

6:02and also the optional labs to exercise this material even more deeply.

6:06You now know how to do inference and forward prop in the neural network, which I think is really cool, so congratulations.

6:13After you have gone through the quizzes and the labs, please also come back,

6:17and in the next week, we'll look at how to actually train the neural network.

6:22So I look forward to seeing you next week.