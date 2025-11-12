0:02So far, we've been using the sigmoid activation function in all the nodes, in the hidden layers, and in the output layer.

0:10And we had started that way because we were building up neural networks by taking logistic regression,

0:17and creating a lot of logistic regression units and stringing them together.

0:22But if you use other activation functions, your neural network can become much more powerful.

0:28Let's take a look at how to do that.

0:30Recall the demand prediction example from last week, where given price, shipping cost, marketing, and material,

0:36you would try to predict if something is highly affordable, if there's good awareness, and high perceived quality,

0:43and based on that, try to predict if it's a top seller.

0:46But this assumes that awareness is maybe binary, as either people are aware or they are not.

0:54But it seems like the degree to which possible buyers are aware of the t-shirt you're selling may not be binary.

1:02They can be a little bit aware, somewhat aware, extremely aware, or it could have gone completely viral.

1:08So rather than modeling awareness as a binary number, 0, 1, that you try to estimate the probability of awareness,

1:16or rather than modeling awareness as just a number between 0 and 1,

1:20maybe awareness should be any non-negative number, because there can be any non-negative value of awareness,

1:27going from 0 up to very, very large numbers.

1:31So whereas previously we had used this equation to calculate the activation of that second hidden unit,

1:40estimating awareness, where g was the sigmoid function and thus goes between 0 and 1,

1:47if you want to allow A12 to potentially take on much larger positive values,

1:54we can instead swap in a different activation function.

1:58It turns out that a very common choice of activation function in neural networks is this function.

2:05It looks like this. It goes, if z is this, then g of z is 0 to the left,

2:14and then it's this straight line, 45 degrees to the right of 0.

2:19And so when z is greater than or equal to 0, g of z is just equal to z.

2:27That is to the right half of this diagram.

2:31And the mathematical equation for this is g of z equals max of 0, z.

2:38Feel free to verify for yourself that max of 0, z results in this curve that I've drawn over here.

2:49And if A12 is g of z for this value of z,

2:54then A, the activation value, can now take on 0 or any non-negative value.

3:01This activation function has a name. It goes by the name ReLU with this funny capitalization.

3:09And ReLU stands for, again, a somewhat arcane term, but it stands for rectified linear unit.

3:16Don't worry too much about what rectified means or what linear unit means.

3:20This was just a name that the authors had given to this particular activation function when they came up with it.

3:26But most people in deep learning just say ReLU to refer to this g of z.

3:32More generally, you have a choice of what to use for g of z,

3:38and sometimes we'll use a different choice than the sigmoid activation function.

3:42Here are the most commonly used activation functions.

3:47You saw the sigmoid activation function, g of z, equals the sigmoid function.

3:52On the last slide, we just looked at the ReLU, or rectified linear unit, g of z equals max of 0, z.

4:00There's one other activation function which is worth mentioning, which is called the linear activation function,

4:06which is just g of z equals to z.

4:09Sometimes if you use the linear activation function, people will say,

4:13we're not using any activation function because if a is g of z, where g of z equals z,

4:21then a is just equal to this, w dot x plus b, say.

4:26And so it's as if there was no g in there at all.

4:29So when you are using this linear activation function, g of z,

4:34sometimes people will say, well, we're not using any activation function.

4:38Although in this class, I will refer to using the linear activation function rather than no activation function.

4:45But if you hear someone else use that terminology, that's what they mean.

4:48It just refers to the linear activation function.

4:51And these three are probably by far the most commonly used activation functions in neural networks.

4:59Later this week, we'll touch on the fourth one called the softmax activation function.

5:05But with these activation functions, you'll be able to build a rich variety of powerful neural networks.

5:12So when building a neural network, for each neuron, do you want to use the sigmoid activation function

5:19or the regular activation function or a linear activation function?

5:23How do you choose between these different activation functions?

5:27Let's take a look at that in the next video.

---
0:01Let's take a look at how you can choose the activation function for different neurons in your neural network.

0:08We'll start with some guidance for how to choose it for the output layer.

0:12It turns out that depending on what the target label or the ground truth label Y is,

0:17there will be one fairly natural choice for the activation function for the output layer.

0:23And we'll then go and look at the choice of the activation function also for the hidden layers of your neural network.

0:30Let's take a look.

0:31You can choose different activation functions for different neurons in your neural network.

0:37And when considering the activation function for the output layer,

0:42it turns out that there'll often be one fairly natural choice depending on what is the target or the ground truth label Y.

0:52Specifically, if you are working on a classification problem where Y is either 0 or 1,

0:59so a binary classification problem,

1:01then the sigmoid activation function will almost always be the most natural choice

1:07because then the neural network learns to predict the probability that Y is equal to 1,

1:13just like we had for logistic regression.

1:16So my recommendation is if you're working on a binary classification problem,

1:20use sigmoid at the output layer.

1:23Alternatively, if you're solving a regression problem,

1:27then you might choose a different activation function.

1:30For example, if you're trying to predict how tomorrow's stock price will change compared to today's stock price,

1:38well, it can go up or down.

1:40And so in this case, Y would be a number that can be either positive or negative.

1:45And in that case, I would recommend you use the linear activation function.

1:50Why is that?

1:51Well, that's because then the output of your neural network, f of X,

1:55which is equal to A3 in the example above,

1:58would be G applied to Z3.

2:01And with the linear activation function, G of Z can take on either positive or negative values.

2:08So Y can be positive or negative.

2:10Use the linear activation function.

2:12And finally, if Y can only take on non-negative values,

2:17such as if you're predicting the price of a house,

2:20that can never be negative,

2:22then the most natural choice would be the ReLU activation function,

2:26because as you see here, this activation function only takes on non-negative values,

2:31either zero or positive values.

2:33So when choosing the activation function to use for your output layer,

2:38usually, depending on what is the label Y you're trying to predict,

2:42there'll be one fairly natural choice.

2:45And in fact, the guidance on this slide is how I pretty much always choose my activation function as well

2:52for the output layer of a neural network.

2:54How about the hidden layers of a neural network?

2:58It turns out that the ReLU activation function is by far the most common choice

3:04in how neural networks are trained by many, many practitioners today.

3:10Even though we had initially described neural networks using the sigmoid activation function,

3:16and in fact, in the early history of the development of neural networks,

3:20people use sigmoid activation functions in many places,

3:24the field has evolved to use ReLU much more often and sigmoids hardly ever.

3:31With the one exception that you do use a sigmoid activation function in the output layer

3:36if you have a binary classification problem.

3:38So why is that? Well, there are a few reasons.

3:41First, if you compare the ReLU and the sigmoid activation functions,

3:46the ReLU is a bit faster to compute because it just requires computing max of 0, z,

3:53whereas the sigmoid requires taking an exponentiation and an inverse and so on,

3:58so it's a little bit less efficient.

4:00But the second reason, which turns out to be even more important,

4:04is that the ReLU function kind of goes flat.

4:08Only in one part of the graph, here on the left, is completely flat.

4:13Whereas the sigmoid activation function, it kind of goes flat in two places.

4:18It goes flat to the left of the graph and it goes flat to the right of the graph.

4:26And if you're using gradient descent to train a neural network,

4:29then when you have a function that is flat in a lot of places,

4:34gradient descent will be really slow.

4:38I know that gradient descent optimizes the cost function J of WB

4:43rather than optimizes the activation function,

4:46but the activation function is a piece of what goes into computing.

4:51And that results in more places in the cost function J of WB

4:55that are flat as well and with a smaller gradient and it slows down learning.

5:01I know that that was just an intuitive explanation,

5:04but researchers have found that using the ReLU activation function

5:08can cause your neural network to learn a bit faster as well,

5:12which is why for most practitioners, if you're trying to decide

5:15what activation function to use for the hidden layer,

5:18the ReLU activation function has become now by far the most common choice.

5:23And in fact, if I'm building a neural network,

5:25this is how I choose activation functions for the hidden layers as well.

5:30So to summarize, here's what I recommend

5:33in terms of how you choose the activation functions for your neural network.

5:38For the output layer, use a sigmoid if you have a binary classification problem,

5:44linear if Y is a number that can take on positive or negative values,

5:49or use ReLU if Y can take on only positive values

5:53or zero positive values or non-negative values.

5:56Then for the hidden layers, I would recommend just using ReLU

6:01as the default activation function.

6:04And in TensorFlow, this is how you would implement it.

6:08Rather than saying activation equals sigmoid as we had previously,

6:13you can then for the hidden layers, that's the first hidden layer,

6:17the second hidden layer, ask TensorFlow to use the ReLU activation function.

6:22And then for the output layer, in this example,

6:26I've asked it to use the sigmoid activation function,

6:29but if you wanted to use the linear activation function instead,

6:34that's the syntax for it.

6:36Or if you wanted to use the ReLU activation function,

6:39that shows the syntax for it.

6:42With this richer set of activation functions,

6:45you'd be well-positioned to build much more powerful neural networks

6:49than just once using only the sigmoid activation function.

6:53By the way, if you look at the research literature,

6:56you sometimes hear of authors using even other activation functions,

7:01such as the tanh activation function or the leaky ReLU activation function

7:06or the swish activation function.

7:09Every few years, researchers sometimes come up with another interesting

7:13activation function, and sometimes they do work a little bit better.

7:17For example, I've used the leaky ReLU activation function a few times in my work,

7:22and sometimes it works a little bit better than the ReLU activation function

7:26you've learned about in this video.

7:28But I think for the most part, and for the vast majority of applications,

7:33what you learned about in this video would be good enough.

7:36Of course, if you want to learn more about other activation functions,

7:41feel free to look on the Internet.

7:43And there are just a small handful of cases where these other activation functions

7:47could be even more powerful as well.

7:51With that, I hope you also enjoy practicing these ideas,

7:56these activation functions in the optional labs and in the practice labs.

8:00But this raises yet another question.

8:03Why do we even need activation functions at all?

8:06Why don't we just use the linear activation function

8:09or use no activation function anywhere?

8:12It turns out this does not work at all.

8:15And in the next video, let's take a look at why that's the case

8:19and why activation functions are so important for getting your neural networks to work.

---

0:02Let's take a look at why neural networks need activation functions, and why they just

0:08don't work if we were to use the linear activation function in every neuron in the

0:14neural network.

0:15Recall this demand prediction example.

0:19What would happen if we were to use a linear activation function for all of the nodes in

0:24this neural network?

0:26It turns out that this big neural network will become no different than just linear

0:31regression, and so this would defeat the entire purpose of using a neural network, because

0:37it would then just not be able to fit anything more complex than the linear regression model

0:43that we learned about in the first course.

0:46Let's illustrate this with a simpler example.

0:51Let's look at the example of a neural network where the input x is just a number, and we

0:57have one hidden unit with parameters w1 and b1 that outputs a1, which is here just a number,

1:08and then the second layer is the output layer, and it has also just one output unit with

1:14parameters w2 and b2, and that outputs a2, which is also just a number, just a scalar,

1:21which is the output of the neural network f of x.

1:25Let's see what this neural network would do if we were to use the linear activation function

1:30g of z equals z everywhere.

1:35To compute a1 as a function of x, the neural network would use a1 equals g of w1 times

1:44x plus b1, but g of z is equal to z, so this is just w1 times x plus b1.

1:55Then a2 is equal to w2 times a1 plus b2 because g of z equals z, and let me take this expression

2:06for a1 and substitute it in there, so that becomes w2 times w1 x plus b1 plus b2, and

2:20if we simplify, this becomes w2 w1 times x plus w2 b1 plus b2, and it turns out that

2:34if I were to set w equals w2 times w1 and set b equals this quantity over here, then

2:42what we've just shown is that a2 is equal to wx plus b.

2:48So a2 is just a linear function of the input x, and rather than using a neural network

2:55with one hidden layer and one output layer, we might as well have just used a linear regression

2:59model.

3:01If you're familiar with linear algebra, this result comes from the fact that the linear

3:06function of a linear function is itself a linear function, and this is why having multiple

3:11layers in a neural network doesn't let the neural network compute any more complex features

3:16or learn anything more complex than just a linear function.

3:21So in the general case, if you had a neural network with multiple layers like this, and

3:29say you were to use a linear activation function for all of the hidden layers, and also use

3:33a linear activation function for the output layer, then it turns out this model will compute

3:40an output that is completely equivalent to linear regression.

3:44The output a4 can be expressed as a linear function of the input features x plus b.

3:52Alternatively, if we were to still use a linear activation function for all the hidden layers,

3:59for these three hidden layers here, but we were to use a logistic activation function

4:04for the output layer, then it turns out you can show that this model becomes equivalent

4:10to logistic regression, and a4, in this case, can be expressed as 1 over 1 plus e to the

4:18negative wx plus b for some values of w and b.

4:22And so this big neural network doesn't do anything that you can't also do with logistic

4:28regression.

4:29That's why a common rule of thumb is don't use the linear activation function in the

4:32hidden layers of your neural network, and in fact I recommend typically using the Rayleigh

4:38activation function should do just fine.

4:41So that's why a neural network needs activation functions other than just the linear activation

4:47function everywhere.

4:50So far, you've learned to build neural networks for binary classification problems, where

4:55y is either 0 or 1, as well as for regression problems, where y can take negative or positive

5:02values, or maybe just positive and non-negative values.

5:06In the next video, I'd like to share with you a generalization of what you've seen

5:11so far for classification, in particular, when y doesn't just take on two values, but

5:19may take on 3 or 4 or 10 or even more categorical values.

5:25Let's take a look at how you can build a neural network for that type of classification problem.