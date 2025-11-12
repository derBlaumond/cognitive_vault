0:01Welcome to course 2 of this machine learning specialization.

0:04In this course, you learn about neural networks, also called deep learning algorithms, as well as decision trees.

0:11These are some of the most powerful and widely used machine learning algorithms,

0:15and you get to implement them and get them to work for yourself.

0:19One of the things you see also in this course is practical advice on how to build machine learning systems.

0:27This part of the material is quite unique to this course.

0:30When you're building a practical machine learning system, there are a lot of decisions you have to make,

0:35such as should you spend more time collecting data, or should you buy a much bigger GPU to build a much bigger neural network.

0:44Even today, when I visit a leading tech company and talk to the team working there on a machine learning application,

0:51unfortunately sometimes I look at what they've been doing for the last six months and go,

0:56gee, someone could have told you, maybe even six months ago, that that approach wasn't going to work that well.

1:03With some of the tips that you learn in this course, I hope that you'll be one of the ones to not waste those six months,

1:09but instead be able to make more systematic and better decisions about how to build practical working machine learning applications.

1:18So with that, let's dive in.

1:20In detail, this is what you see in the four weeks of this course.

1:25In week one, we'll go over neural networks and how to carry out inference or prediction.

1:31So if you were to go to the Internet and download the parameters of a neural network that someone else had trained

1:38and whose parameters they had posted on the Internet, then to use that neural network to make predictions would be called inference,

1:45and you learn how neural networks work and how to do inference in week one, in this week.

1:49Next week, you learn how to train your own neural network.

1:53In particular, if you have a training set of labeled examples X and Y, how do you train the parameters of a neural network for yourself?

2:01In the third week, we'll then go into practical advice for building machine learning systems,

2:06and I'll share with you some tips that I think even highly paid engineers building machine learning systems very successfully today

2:13don't really always manage to consistently apply, and I think that will help you build systems yourself efficiently and quickly.

2:21And then in the final week of this course, you learn about decision trees.

2:25While decision trees don't get as much buzz in the media, there's a little bit less hype about decision trees compared to neural networks,

2:33they are also one of the widely used and very powerful learning algorithms that I think there's a good chance you end up using yourself

2:40if you end up building an application.

2:42So with that, let's jump into neural networks, and we're going to start by taking a quick look at how the human brain,

2:49that is, how the biological brain works. Let's go on to the next video.

---
0:00When neural networks were first invented many decades ago, the original motivation was to

0:05write software that could mimic how the human brain or how the biological brain learns and

0:10thinks. And even though today neural networks, sometimes also called artificial neural networks,

0:17have become very different than how any of us might think about how the brain actually works

0:22and learns, some of the biological motivation still remains in the way we think about artificial

0:28neural networks or computer neural networks today. So let's start by taking a look at how

0:33the brain works and how that relates to neural networks. The human brain, or maybe more generally

0:39the biological brain, demonstrates a higher level or more capable level of intelligence than anything

0:46else we've built so far. And so neural networks have started with the motivation of trying to

0:52build software to mimic the brain. Work in neural networks had started back in the 1950s and then it

1:00fell out of favor for a while. Then in the 1980s and early 1990s, they gained in popularity again

1:08and showed tremendous traction in some applications like handwritten digit recognition,

1:13which were used even back then to read postal codes for routing mail and for reading dollar

1:19figures in handwritten checks. But then it fell out of favor again in the late 1990s and it was

1:27from about 2005 that it enjoyed a resurgence and also became maybe rebranded a little bit with

1:35deep learning. One of the things that surprised me back then was deep learning and neural networks

1:42meant very similar things. But I maybe underappreciated at the time that the term

1:47deep learning just sounds much better because it's deep and it's learning. And so that turned

1:52out to be the brand that took off in the last decade or decade and a half. And since then,

1:58neural networks have revolutionized application area after application area. I think the first

2:04application area that modern neural networks or deep learning had a huge impact on was probably

2:09speech recognition, where we started to see much better speech recognition systems due to modern

2:15deep learning. And authors such as Li Deng and Geoff Hinton were instrumental to this.

2:20And then it started to make inroads into computer vision. And sometimes people still speak of the

2:27ImageNet moment in 2012, and that was maybe a bigger splash where it then caught broader

2:34imagination and had a big impact on computer vision. Then in the next few years, it made its

2:39inroads into text or into natural language processing, and so on and so forth. And now,

2:45neural networks are used in everything from climate change to medical imaging to online

2:50advertising to product recommendations, and really lots of application areas of machine learning now

2:55use neural networks. Even though today's neural networks have almost nothing to do with how the

3:02brain learns, there was the early motivation of trying to build software to mimic the brain.

3:09So how does the brain work? Here's a diagram illustrating what neurons in a brain look like.

3:16All of human thought is from neurons like these in your brain and mine,

3:21sending electrical impulses and sometimes forming new connections with other neurons.

3:27Given a neuron like this one, it has a number of inputs where it receives electrical impulses

3:34from other neurons, and then this neuron that I've circled carries out some computations

3:40and will then send its output to other neurons via these electrical impulses.

3:47This upper neuron's output in turn becomes the input to this neuron down below, which again

3:53aggregates inputs from multiple other neurons to then maybe send its own output to yet other

3:59neurons. And this is the stuff of which human thought is made. Here's a simplified diagram of a

4:07biological neuron. A neuron comprises a cell body shown here on the left, and if you have taken a

4:16class in biology, you may recognize this to be the nucleus of the neuron. And as we saw on the

4:23previous slide, the neuron has different inputs, and in a biological neuron, the input wires are

4:30called the dendrites, and it then occasionally sends electrical impulses to other neurons via

4:37the output wire, which is called the axon. Don't worry about these biological terms. If you saw

4:43them in a biology class, you may remember them, but you don't really need to memorize any of these

4:48terms for the purpose of building artificial neural networks. But this biological neuron may

4:54then send electrical impulses that becomes the input to another neuron. So the artificial neural

5:01network uses a very simplified mathematical model of what a biological neuron does. And I'm going to

5:11draw a little circle here to denote a single neuron. And what a neuron does is it takes some

5:19inputs, one or more inputs, which are just numbers, and it does some computation and it outputs some

5:27other number, which then could be an input to a second neuron shown here on the right. When you're

5:34building an artificial neural network or a deep learning algorithm, rather than building one neuron

5:40at a time, you often want to simulate many such neurons at the same time. And so when in this

5:48diagram I'm drawing three neurons, and what these neurons do collectively is input a few numbers,

5:57carry out some computation, and output some other numbers. Now at this point, I'd like to give one

6:04big caveat, which is that even though I made a loose analogy between biological neurons and

6:10artificial neurons, I think that today we have almost no idea how the human brain works. In fact,

6:17every few years, neuroscientists make some fundamental breakthrough about how the brain

6:21works, and I think we'll continue to do so for the foreseeable future. And that to me is a sign that

6:28there are many breakthroughs that are yet to be discovered about how the brain actually works,

6:32and thus attempts to blindly mimic what we know of the human brain today, which is frankly very

6:38little, probably won't get us that far toward building real intelligence, certainly not with

6:44our current level of knowledge in neuroscience. Having said that, even with these extremely

6:50simplified models of a neuron, which we'll talk about, we'll be able to build really powerful

6:55deep learning algorithms. And so as we go deeper into neural networks and into deep learning,

7:01even though the origins were biologically motivated, don't take the biological motivation

7:07too seriously. In fact, those of us that do research in deep learning have shifted away

7:12from looking to biological motivation that much, but instead are just using engineering principles

7:18to figure out how to build algorithms that are more effective. But I think it might still be

7:22fun to speculate and think about how biological neurons work every now and then. The ideas of

7:29neural networks have been around for many decades, so a few people have asked me,

7:33hey Andrew, why now? Why is it that only in the last handful of years that neural networks have

7:39really taken off? This is a picture I draw for them when I'm asked that question, and that maybe

7:45you could draw for others as well if they ask you that question. Let me plot on the horizontal axis

7:51the amount of data you have for a problem, and on the vertical axis the performance or the accuracy

7:58of a learning algorithm applied to that problem. Over the last couple decades, with the rise of

8:05the internet, the rise of mobile phones, the digitalization of our society, the amount of

8:10data we have for a lot of applications has steadily marched to the right. A lot of records

8:16that used to be on paper, such as if you order something, rather than it being on a piece of

8:21paper, that's much more likely to be a digital record. Your health record, if you see a doctor,

8:26is much more likely to be digital now compared to on pieces of paper.

8:32And so in many application areas, the amount of digital data has exploded.

8:37And what we saw was with traditional machine learning algorithms, such as logistic regression

8:43and linear regression, even as you fed those algorithms more data, it was very difficult to

8:50get the performance to keep on going up. So it was as if the traditional learning algorithms,

8:55like linear regression and logistic regression, they just weren't able to scale with the amount

9:00of data we could now feed it, and they weren't able to take effective advantage of all this data

9:05we had for different applications. And what AI researchers started to observe was that if you

9:12were to train a small neural network on this data set, then the performance maybe looks like this.

9:19And if you were to train a medium-sized neural network, meaning one with more neurons in it,

9:25this performance may look like that. And if you were to train a very large neural network,

9:30meaning one with a lot of these artificial neurons, then for some applications, the performance would

9:35just keep on going up. And so this meant two things. It meant that for a certain class of

9:41applications where you do have a lot of data, sometimes you hear the term big data tossed

9:47around. If you're able to train a very large neural network to take advantage of that huge

9:54amount of data you have, then you could obtain performance on anything ranging from speech

10:00recognition, to image recognition, to natural language processing applications, and many more

10:04that just were not possible with earlier generations of learning algorithms. And this

10:10caused deep learning algorithms to take off. And this too is why faster computer processes,

10:17including the rise of GPUs or graphics processor units, this is hardware originally designed

10:24to generate nice-looking computer graphics, but turned out to be really powerful for deep learning

10:31as well. That was also a major force in allowing deep learning algorithms to become what it is

10:37today. That's how neural networks got started, as well as why they took off so quickly in the

10:43last several years. Let's now dive more deeply into the details of how a neural network actually

10:49works. Please go on to the next video.

---

0:01To illustrate how neural networks work, let's start with an example.

0:05We'll use an example from demand prediction,

0:08in which you look at a product and try to predict,

0:10will this product be a top seller or not?

0:13Let's take a look.

0:14In this example, you're selling T-shirts,

0:17and you would like to know if a particular T-shirt will be a top seller,

0:22you know, yes or no.

0:23And you have collected data of different T-shirts that were sold at different prices,

0:28as well as which ones became a top seller.

0:31This type of application is used by retailers today

0:34in order to plan better inventory levels, as well as marketing campaigns.

0:40If you know what's likely to be a top seller,

0:42you would plan, for example, to just purchase more of that stock in advance.

0:47So in this example, the input feature X is the price of the T-shirt,

0:53and so that's the input to the learning algorithm.

0:56And if you apply logistic regression to fit a sigmoid function to the data

1:02that might look like that, then the output of your prediction might look like this,

1:071 over 1 plus e to the negative WX plus B.

1:11Previously, we had written this as F of X as the output of the learning algorithm.

1:17In order to set us up to build a neural network,

1:20I'm going to switch the terminology a little bit

1:22and use the alphabet A to denote the output of this logistic regression algorithm.

1:28The term A stands for activation, and it's actually a term from neuroscience,

1:33and it refers to how much a neuron is sending the high output

1:38to other neurons downstream from it.

1:42It turns out that this logistic regression unit,

1:45or this little logistic regression algorithm,

1:48can be thought of as a very simplified model of a single neuron in the brain,

1:54where what the neuron does is it takes as input the price X,

2:00and then it computes this formula on top,

2:03and it outputs the number A, which is computed via this formula,

2:08and it outputs the probability of this T-shirt being a top seller.

2:13Another way to think of a neuron is as a tiny little computer

2:18whose only job is to input one number or a few numbers, such as a price,

2:24and then to output one number or maybe a few other numbers,

2:29which in this case is the probability of the T-shirt being a top seller.

2:34As I alluded in the previous video,

2:37a logistic regression algorithm is much simpler

2:40than what any biological neuron in your brain or mind does,

2:44which is why the artificial neural network

2:46is such a vastly oversimplified model of the human brain,

2:50even though in practice, as you know, deep learning algorithms do work very well.

2:55Given this description of a single neuron,

2:58building a neural network now just requires taking a bunch of these neurons

3:03and wiring them together or putting them together.

3:06Let's now look at a more complex example of demand prediction.

3:10In this example, we're going to have four features

3:13to predict whether or not a T-shirt is a top seller.

3:17The features are the price of the T-shirt, the shipping cost,

3:21the amount of marketing of that particular T-shirt,

3:24as well as the material quality.

3:26Is this a high-quality thick cotton or is this maybe a lower-quality material?

3:32Now, you might suspect that whether or not a T-shirt becomes a top seller

3:37actually depends on a few factors.

3:40First, what is the affordability of this T-shirt?

3:43Second is, what's the degree of awareness of this T-shirt

3:47that potential buyers have?

3:49And third is perceived quality.

3:51Do buyers or potential buyers think this is a high-quality T-shirt?

3:56And so what I'm going to do is create one artificial neuron

4:01to try to estimate the probability that this T-shirt is perceived as highly affordable.

4:07And affordability is mainly a function of price and shipping cost

4:12because the total amount you have to pay is the sum of the price plus the shipping cost.

4:15And so we're going to use a little neuron here, a logistic regression unit,

4:19to input price and shipping cost and predict, do people think this is affordable?

4:25Second, I'm going to create another artificial neuron here

4:29to estimate, is there high awareness of this?

4:32And awareness in this case is mainly a function of the marketing of the T-shirt.

4:37And finally, I'm going to create another neuron to estimate,

4:42do people perceive this to be of high quality?

4:45And that may mainly be a function of the price of the T-shirt and of the material quality.

4:51Price is a factor here because fortunately or unfortunately,

4:56if there's a very high-priced T-shirt, people will sometimes perceive that to be of high quality

5:02because if it's very expensive, then maybe people think it's got to be of high quality.

5:07Given these estimates of affordability, awareness, and perceived quality,

5:11we then wire the outputs of these three neurons to another neuron here on the right

5:17that then is another logistic regression unit that finally inputs those three numbers

5:23and outputs the probability of this T-shirt being a top seller.

5:27So in the terminology of neural networks, we're going to group these three neurons together

5:34into what's called a layer.

5:37And a layer is a grouping of neurons which take as input the same or similar features

5:43and that in turn outputs a few numbers together.

5:47So these three neurons on the left form one layer, which is why I drew them on top of each other.

5:53And the single neuron on the right is also one layer.

5:57The layer on the left has three neurons, so a layer can have multiple neurons

6:02or it can also have a single neuron, as in the case of this layer on the right.

6:07This layer on the right is also called the output layer

6:11because the output of this final neuron is the output probability predicted by the neural network.

6:18In the terminology of neural networks, we're also going to call affordability, awareness,

6:24and perceived quality to be activations.

6:28The term activations comes from biological neurons,

6:31and it refers to the degree that a biological neuron is sending a high output value

6:36or sending many electrical impulses to other neurons, to the downstream from it.

6:41And so these numbers on affordability, awareness, and perceived quality

6:45are the activations of these three neurons in this layer.

6:49And also, this output probability is the activation of this neuron shown here on the right.

6:58So this particular neural network, therefore, carries out computations as follows.

7:03It inputs four numbers, then this layer of the neural network uses those four numbers

7:08to compute three new numbers, also called activation values.

7:13And then the final layer, the output layer of the neural network,

7:17uses those three numbers to compute one number.

7:21And in a neural network, this list of four numbers is also called the input layer,

7:30and that's just a list of four numbers.

7:33Now, there's one simplification I'd like to make to this neural network,

7:38which is the way I've described it so far, we had to go through the neurons one at a time

7:43and decide what inputs it would take from the previous layer.

7:48So, for example, we said affordability is a function of just price and shipping costs,

7:53and awareness is a function of just marketing, and so on.

7:57But if you're building a large neural network, it'd be a lot of work to go through

8:00and manually decide which neurons should take which features as inputs.

8:05The way a neural network is implemented in practice, each neuron in a certain layer,

8:11say this layer in the middle, will have access to every feature,

8:16to every value from the previous layer, from the input layer.

8:20Which is why I'm now drawing arrows from every input feature

8:25to every one of these neurons shown here in the middle.

8:29And you can imagine that if you're trying to predict affordability

8:33and it knows what's the price, shipping cost, marketing, and material,

8:37maybe it'll learn to ignore marketing and material

8:40and just figure out through setting the parameters appropriately

8:44to only focus on the subset of features that are most relevant to affordability.

8:50To further simplify the notation and the description of this neural network,

8:55I'm going to take these four input features and write them as a vector x,

9:02and we're going to view the neural network as having four features

9:06that comprise this feature vector x,

9:10and this feature vector is fed to this layer in the middle,

9:15which then computes three activation values, that is these three numbers,

9:21and these three activation values in turn becomes another vector

9:27which is fed to this final output layer

9:31that finally outputs the probability of this t-shirt being a top seller.

9:37So that's all a neural network is.

9:40It has a few layers where each layer inputs a vector

9:44and outputs another vector of numbers,

9:48where, for example, this layer in the middle inputs four numbers, x,

9:53and outputs three numbers corresponding to affordability, awareness, and perceived quality.

9:58To add a little bit more terminology,

10:02you've seen that this layer is called the output layer

10:06and this layer is called the input layer.

10:09To give the layer in the middle a name as well,

10:12this layer in the middle is called a hidden layer.

10:16I know that this is maybe not the best or the most intuitive name,

10:20but that terminology comes from that when you have a training set.

10:25In a training set, you get to observe both x and y.

10:29Your data set tells you what is x and what is y,

10:32and so you get data that tells you what are the correct inputs and the correct outputs,

10:37but your data set doesn't tell you what are the correct values

10:41for affordability, awareness, and perceived quality.

10:44And so the correct values for those are hidden.

10:47You don't see them in the training set,

10:49which is why this layer in the middle is called a hidden layer.

10:52I'd like to share with you another way of thinking about neural networks

10:57that I found useful for building my intuition about it.

11:00Just let me cover up the left half of this diagram and see what we're left with.

11:05What you see here is that there is a logistic regression algorithm

11:10or logistic regression unit that is taking as input affordability,

11:14awareness, and perceived quality of a T-shirt

11:17and using these three features to estimate the probability of the T-shirt being a top seller.

11:23So this is just logistic regression.

11:28But the cool thing about this is rather than using the original features,

11:33price, shipping cost, marketing, and so on,

11:35it's using a new, maybe better set of features, affordability, awareness, and perceived quality

11:40that are hopefully more predictive of whether or not this T-shirt will be a top seller.

11:46So one way to think of this neural network is just logistic regression,

11:51but it is a version of logistic regression that can learn its own features

11:56that makes it easier to make accurate predictions.

12:00In fact, you might remember from the previous course,

12:04this housing example where we said that if you want to predict the price of a house,

12:09you might take the frontage or the width of a lot and multiply that by the depth of a lot

12:14to construct a more complex feature, x1 times x2, which was the size of the lot.

12:20So there we were doing manual feature engineering where we had to look at the features x1 and x2

12:26and decide by hand how to combine them together to come up with better features.

12:30What a neural network does is instead of you needing to manually engineer the features,

12:36it can learn, as you see later, its own features to make the learning problem easier for itself.

12:44So this is what makes neural networks one of the most powerful learning algorithms in the world today.

12:50So to summarize, a neural network does this.

12:54The input layer has a vector of features, four numbers in this example.

12:58It is input to the hidden layer, which outputs three numbers,

13:03and I'm going to use a vector to denote this vector of activations that this hidden layer outputs.

13:12And then the output layer takes as input those three numbers and outputs one number,

13:18which would be the final activation or the final prediction of the neural network.

13:24One note, even though I previously described this neural network

13:28as computing affordability, awareness, and perceived quality,

13:31one of the really nice properties of a neural network is when you train it from data,

13:37you don't need to go in to explicitly decide what are the features,

13:40such as affordability and so on, that a neural network should compute.

13:44Instead, it will figure out all by itself what are the features it wants to use in this hidden layer.

13:51And that's what makes it such a powerful learning algorithm.

13:54So you've seen here one example of a neural network,

13:58and this neural network has a single layer that is a hidden layer.

14:02Let's take a look at some other examples of neural networks,

14:05specifically examples with more than one hidden layer.

14:10Here's an example.

14:11This neural network has an input feature vector x that is fed to one hidden layer,

14:19and I'm going to call this the first hidden layer.

14:22And so if this hidden layer has three neurons,

14:25it will then output a vector of three activation values.

14:30These three numbers can then be input to the second hidden layer,

14:35and if this second hidden layer has two neurons, two logistic units,

14:40then this second hidden layer will output another vector of now two activation values

14:46that maybe goes to the output layer that then outputs the neural network's final prediction.

14:52Or here's another example.

14:54Here's a neural network that has its input go to the first hidden layer,

14:58that the output of the first hidden layer goes to the second hidden layer,

15:02goes to the third hidden layer, and then finally to the output layer.

15:06When you're building your own neural network,

15:08one of the decisions you need to make is how many hidden layers do you want

15:12and how many neurons do you want each hidden layer to have.

15:17And this question of how many hidden layers and how many neurons per hidden layer

15:22is a question of the architecture of the neural network.

15:26You'll learn later in this course some tips for choosing an appropriate architecture

15:31for a neural network, but choosing the right number of hidden layers

15:35and number of hidden units per layer can have an impact

15:39on the performance of your learning algorithm as well.

15:41So later in this course, you'll learn how to choose a good architecture

15:45for your neural network as well.

15:47By the way, in some of the literature, you see this type of neural network

15:51with multiple layers like this called a multi-layer perceptron.

15:55So if you see that, that just refers to a neural network

15:57that looks like what you see here on the slide.

16:01So that's a neural network.

16:04I know we went through a lot in this video, so thank you for sticking with me.

16:08But you now know how a neural network works.

16:11In the next video, let's take a look at how these ideas can be applied

16:14to other applications as well.

16:16In particular, we'll take a look at the computer vision application of face recognition.

16:21Let's go on to the next video.

---

0:01In the last video, you saw how a neural network works in a demand prediction example.

0:06Let's take a look at how you can apply a similar type of idea to a computer vision application.

0:12Let's dive in.

0:13If you're building a face recognition application, you might want to train, say, a neural network

0:18that takes as input a picture like this and outputs the identity of the person in the picture.

0:25This image is 1,000 by 1,000 pixels, and so its representation in the computer is actually

0:33as a 1,000 by 1,000 grid, or also called a 1,000 by 1,000 matrix of pixel intensity values.

0:42In this example, my pixel intensity values, or pixel brightness values, goes from 0 to 255.

0:50197 here would be the brightness of the pixel in the very upper left of the image.

0:56185 is the brightness of the pixel, 1 pixel over, and so on, down to 214 would be the lower right corner of this image.

1:06If you were to take these pixel intensity values and unroll them into a vector,

1:13you end up with a list or a vector of a million pixel intensity values.

1:19One million because 1,000 by 1,000 squared gives you a million numbers.

1:24The face recognition problem is, can you train a neural network that takes as input a feature vector

1:32with a million pixel brightness values and outputs the identity of the person in the picture?

1:40This is how you might build a neural network to carry out this task.

1:45The input image x is fed to this layer of neurons.

1:50This is the first hidden layer, which then extracts some features,

1:55and the output of this first hidden layer is fed to a second hidden layer,

2:00and that output is fed to a third hidden layer, and then finally to the output layer,

2:05which then estimates, say, the probability of this being a particular person.

2:11One interesting thing would be if you look at a neural network that's been trained on a lot of images of faces

2:18and to try to visualize what are these hidden layers trying to compute.

2:23It turns out that when you train a system like this on a lot of pictures of faces

2:28and you peer at the different neurons in the hidden layers to figure out what they may be computing,

2:35this is what you might find.

2:37In the first hidden layer, you might find one neuron that is looking for a little vertical line or a vertical edge like that,

2:46and a second neuron looking for a oriented line or oriented edge like that,

2:52and a third neuron looking for a line at that orientation, and so on.

2:57In the earliest layers of a neural network, you might find that the neurons are looking for very short lines

3:04or very short edges in the image.

3:08If you look at the next hidden layer, you find that these neurons might learn to group together lots of little short lines

3:18and little short edge segments in order to look for parts of faces.

3:22For example, each of these little square boxes is a visualization of what that neuron is trying to detect.

3:30This first neuron looks like it's trying to detect the presence or absence of an eye in a certain position of the image,

3:38and the second neuron looks like it's trying to detect the horn of a nose,

3:43and maybe this neuron over here is trying to detect the bottom of an ear.

3:50Then as you look at the next hidden layer, in this example, the neural network is aggregating different parts of faces

3:58to then try to detect presence or absence of larger, coarser face shapes,

4:04and then finally, detecting how much the face corresponds to different face shapes

4:10creates a rich set of features that then helps the output layer try to determine the identity of the person pictured.

4:18And a remarkable thing about the neural network is it can learn these feature detectors at the different hidden layers all by itself.

4:26In this example, no one ever told it to look for short little edges in the first layer,

4:32and eyes and noses and face parts in the second layer, and then more complete face shapes at the third hidden layer.

4:39The neural network is able to figure out these things all by itself from data.

4:44Just one note, in this visualization, the neurons in the first hidden layer are shown looking at relatively small windows to look for these edges,

4:54and then the second hidden layer is looking at a bigger window, and the third hidden layer is looking at an even bigger window.

5:01So these little neurons' visualizations actually correspond to differently sized regions in the image.

5:08Just for fun, let's see what happens if you were to train this neural network on a different dataset,

5:15say on lots of pictures of cars pictured on the side.

5:20The same learning algorithm, if it's asked to detect cars, will then learn edges in the first layer, so pretty similar,

5:30but then they'll learn to detect parts of cars in the second hidden layer, and then more complete car shapes in the third hidden layer.

5:38So just by feeding it different data, the neural network automatically learns to detect very different features,

5:47so as to try to make the predictions of car detection or person recognition or whatever is a particular given task that it's trained on.

5:58So that's how a neural network works for a computer vision application.

6:02And in fact, later this week, you'll see how you can build a neural network yourself and apply it to a handwritten digit recognition application.

6:11So far, we've been going over the description of intuitions of neural networks to give you a feel for how they work.

6:18In the next video, let's look more deeply into the concrete mathematics and the concrete implementational details of how you actually build one or more layers of a neural network,

6:30and therefore how you can implement one of these things yourself.

6:33Let's go on to the next video.