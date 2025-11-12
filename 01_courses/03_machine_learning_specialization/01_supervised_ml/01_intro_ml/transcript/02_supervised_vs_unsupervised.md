0:00So, what is machine learning? In this video, you'll learn the definition of what it is,

0:05and also get a sense of when you might want to apply it. Let's take a look together.

0:11Here's the definition of what is machine learning that is attributed to Arthur Samuel.

0:17He defined machine learning as the field of study that gives computers the ability to learn

0:22without being explicitly programmed. Samuel's claim to fame was that back in the 1950s,

0:28he wrote a checkers playing program. And the amazing thing about this program was that Arthur

0:33Samuel himself wasn't a very good checkers player. What he did was, he had programmed a computer to

0:40play maybe tens of thousands of games against itself. And by watching what sorts of board

0:45positions tended to lead to wins, and what positions tended to lead to losses, the checkers

0:51playing program learned over time what are good or bad board positions. By trying to get to good

0:57and avoid bad positions, this program learned to get better and better at playing checkers.

1:03Because the computer had the patience to play tens of thousands of games against itself,

1:08it was able to get so much checkers playing experience that eventually it became a better

1:13checkers player than Arthur Samuel himself. Now, throughout these videos, besides me trying

1:20to talk about stuff, I'll occasionally ask you a question to help make sure you understand the

1:25content. Here's one about what happens if the computer had played far fewer games. Please

1:31take a look and pick whichever you think is a better answer. Thanks for looking at the quiz.

1:40And so if you had selected this answer, would have made it worse, then you got it right.

1:48In general, the more opportunities you give a learning algorithm to learn, the better it will

1:53perform. If you didn't select the correct answer the first time, that's totally okay too. The point

1:59of these quiz questions isn't to see if you can get them all correct on the first try. These

2:05questions are here just to help you practice the concepts you're learning. Arthur Samuel's definition

2:10was a rather informal one, but in the next two videos, we'll dive deeper together into what are

2:16the major types of machine learning algorithms. In this class, you learn about many different

2:23learning algorithms. The two main types of machine learning are supervised learning and

2:29unsupervised learning. We'll define what these terms mean more in the next couple videos. Of

2:36these two, supervised learning is the type of machine learning that is used most in many real

2:42world applications and that has seen the most rapid advancement and innovation. In this specialization,

2:50which has three causes in total, the first and second causes will focus on supervised learning

2:56and the third will focus on unsupervised learning, recommender systems, and reinforcement learning.

3:03By far, the most used types of learning algorithms today are supervised learning, unsupervised

3:09learning, and recommender systems. The other thing we're going to spend a lot of time on in

3:14this specialization is practical advice for applying learning algorithms. This is something

3:21I feel pretty strongly about. Teaching about learning algorithms is like giving someone

3:26a set of tools, and equally important or even more important than making sure you have great tools

3:33is making sure you know how to apply them. Because, you know, what good is it if someone were to give

3:39you a state-of-the-art hammer or a state-of-the-art hand drill and say, good luck, now you have all the

3:44tools you need to build a three-story house? It doesn't really work like that. And so too, in machine

3:51learning, making sure you have the tools is really important and so is making sure that you know how

3:57to apply the tools of machine learning effectively. So that's what you get in this class, the tools

4:03as well as the skills of applying them effectively. I regularly visit with friends and teams in some

4:09of the top tech companies, and even today I see experienced machine learning teams apply machine

4:16learning algorithms to some problems, and sometimes they've been going at it for six months without

4:22much success. And when I look at what they're doing, I sometimes feel like I could have told

4:27them six months ago that the current approach won't work, and there's a different way of using

4:31these tools that will give them a much better chance of success. So in this class, one of the

4:37relatively unique things you learn is you learn a lot about the best practices for how to actually

4:42develop a practical, valuable machine learning system. This way, you're less likely to end up in

4:49one of those teams that end up losing six months going in the wrong direction. In this class, you

4:55gain a sense of how the most skilled machine learning engineers build systems, and I hope you

5:00finish this class as one of those very rare people in today's world that know how to design

5:06and build serious machine learning systems. So that's machine learning. In the next video, let's

5:13look more deeply at what is supervised learning and also what is unsupervised learning. In addition,

5:20you learn when you might want to use each of them, supervised and unsupervised learning.

5:25I'll see you in the next video.

---

0:02Machine learning is creating tremendous economic value today.

0:05I think 99% of the economic value created by machine learning today is through one type of machine learning, which is called supervised learning.

0:14Let's take a look at what that means.

0:16Supervised machine learning, or more commonly, supervised learning, refers to algorithms that learn X-to-Y, or input-to-output, mappings.

0:28The key characteristic of supervised learning is that you give your learning algorithm examples to learn from that include the right answers,

0:39where by right answer, I mean the correct label Y for a given input X.

0:45And it's by seeing correct pairs of input X and desired output label Y that the learning algorithm eventually learns to take just the input alone,

0:56without the output label, and gives a reasonably accurate prediction, or guess, of the output.

1:03Let's look at some examples.

1:05If the input X is an email, and the output Y is this email spam or not spam,

1:13this gives you your spam filter.

1:16Or if the input is an audio clip, and the algorithm's job is to output the text transcript, then this is speech recognition.

1:29Or if you want to input English and have it output the corresponding Spanish, Arabic, Hindi, Chinese, Japanese, or something else translation,

1:39then that's machine translation.

1:43Or the most lucrative form of supervised learning today is probably used in online advertising.

1:50Nearly all the large online ad platforms have a learning algorithm that inputs some information about an ad and some information about you,

2:00and then tries to figure out if you will click on that ad or not.

2:04Because by showing you ads that you're slightly more likely to click on, for these large online ad platforms, every click is revenue.

2:12This actually drives a lot of revenue for these companies.

2:15This is something that one's done a lot of work on.

2:18Maybe not the most inspiring application, but it certainly has a significant economic impact in some companies today.

2:25Or if you want to build a self-driving car, the learning algorithm would take as input an image and some information from other sensors,

2:34such as a radar or other things, and then try to output the position of, say, other cars so that your self-driving car can safely drive around the other cars.

2:45Or take manufacturing. I've actually done a lot of work in this sector at Lanning AI.

2:52You can have a learning algorithm take as input a picture of a manufactured product, say a cell phone that just rolled off the production line,

3:01and have the learning algorithm output whether or not there is a scratch, dent, or other defects in the product.

3:08This is called visual inspection and is helping manufacturers reduce or prevent defects in their products.

3:15In all of these applications, you would first train your model with examples of inputs X and the right answers, that is, the labels Y.

3:25After the model has learned from these input-output or X and Y pairs, it can then take a brand new input X, something it's never seen before,

3:34and try to produce the appropriate corresponding output Y.

3:39Let's dive more deeply into one specific example.

3:44Say you want to predict housing prices based on the size of the house.

3:49You've collected some data, and say you plot the data, and it looks like this.

3:55Here on the horizontal axis is the size of the house in square feet.

3:59And yes, I live in the United States where we still use square feet. I know most of the world uses square meters.

4:05And here on the vertical axis is the price of the house in, say, thousands of dollars.

4:13So with this data, let's say a friend wants to know what's the price for their 750 square foot house.

4:21How can a learning algorithm help you?

4:23One thing a learning algorithm might be able to do is, say, fit a straight line to the data.

4:29And reading off the straight line, it looks like your friend's house could be sold for maybe about, I don't know, $150,000.

4:39But fitting a straight line isn't the only learning algorithm you can use.

4:43There are others that could work better for this application.

4:46For example, rather than fitting a straight line, you might decide that it's better to fit a curve,

4:52a function that's slightly more complicated or more complex than a straight line.

4:58If you do that and make a prediction here, then it looks like, well, your friend's house could be sold for closer to $200,000.

5:08One of the things you see later in this class is how you can decide whether to fit a straight line, a curve,

5:15or another function that is even more complex to the data.

5:20Now, it doesn't seem appropriate to pick the one that gives your friend the best price.

5:25But one thing you see is how to get an algorithm to systematically choose the most appropriate line or curve or other thing to fit to this data.

5:37What you see in this slide is an example of supervised learning.

5:41Because we gave the algorithm a dataset in which the so-called right answer, that is, the label or the correct price Y, is given for every house on the plot,

5:52and the task of the learning algorithm is to produce more of these right answers,

5:57specifically predicting what is the likely price for other houses like your friend's house.

6:03That's why this is supervised learning.

6:06To define a little bit more terminology, this housing price prediction is a particular type of supervised learning called regression.

6:14And by regression, I mean we're trying to predict a number from infinitely many possible numbers,

6:21such as the house prices in our example, which could be $150,000 or $70,000 or $183,000 or any other number in between.

6:33So that's supervised learning, learning input-output or X-to-Y mappings.

6:39And you saw in this video an example of regression, where the task is to predict a number.

6:46But there's also a second major type of supervised learning problem called classification.

6:52Let's take a look at what that means in the next video.

---

0:02So, supervised learning algorithms learn to predict input-output, or x-to-y, mappings,

0:09and in the last video, you saw that regression algorithms, which is a type of supervised

0:14learning algorithm, learns to predict numbers out of infinitely many possible numbers.

0:19There's a second major type of supervised learning algorithm, called a classification

0:24algorithm.

0:25Let's take a look at what this means.

0:29Take breast cancer detection as an example of a classification problem.

0:34Say you're building a machine learning system so that doctors can have a diagnostic tool

0:39to detect breast cancer.

0:41This is important because early detection could potentially save a patient's life.

0:47Using a patient's medical records, your machine learning system tries to figure out if a tumor,

0:52that is, a lump, is malignant, meaning cancerous or dangerous, or if that tumor, that lump,

1:00is benign, meaning that it's just a lump that isn't cancerous and isn't that dangerous.

1:07Some of my friends have actually been working on this specific problem.

1:11So maybe your dataset has tumors of various sizes, and these tumors are labeled as either

1:19benign, which I will designate in this example with a zero, or malignant, which I'll designate

1:25in this example with a one.

1:28You can then plot your data on a graph like this, where the horizontal axis represents

1:35the size of the tumor, and the vertical axis takes on only two values, zero or one, depending

1:42on whether the tumor is benign, zero, or malignant, one.

1:48One reason that this is different from regression is that we're trying to predict only a small

1:56number of possible outputs, or categories.

1:59In this case, two possible outputs, zero or one, benign or malignant.

2:04This is different from regression, which tries to predict any number out of an infinitely

2:10many number of possible numbers.

2:15The fact that there are only two possible outputs is what makes this classification.

2:21Because there are only two possible outputs, or two possible categories in this example,

2:28you can also plot this dataset on a line like this, where now I'm going to use two different

2:35symbols to denote the category, using a circle or an O to denote the benign examples, and

2:43a cross to denote the malignant examples.

2:48And if a new patient walks in for a diagnosis, and they have a lump that is this size, then

2:55the question is, will your system classify this tumor as benign or malignant?

3:03It turns out that in classification problems, you can also have more than two possible output

3:08categories.

3:10Maybe your learning algorithm can output multiple types of cancer diagnoses if it turns out

3:15to be malignant.

3:17So let's call two different types of cancer type 1 and type 2.

3:22In this case, the algorithm would have three possible output categories it could predict.

3:30And by the way, in classification, the terms output classes and output categories are often

3:36used interchangeably.

3:38So when I say class or category when referring to the output, it means the same thing.

3:44So to summarize, classification algorithms predict categories.

3:51Categories don't have to be numbers.

3:53It could be non-numeric.

3:54For example, it can predict whether a picture is that of a cat or a dog, and it can predict

4:03if a tumor is benign or malignant.

4:07Categories can also be numbers like 0 or 1 or 0 or 1 or 2.

4:13But what makes classification different from regression when you're interpreting the numbers

4:18is that classification predicts a small, finite, limited set of possible output categories

4:25such as 0, 1, and 2, but not all possible numbers in between like 0.5 or 1.7.

4:34In the example of supervised learning that we've been looking at, we had only one input

4:39value, the size of the tumor, but you can also use more than one input value to predict

4:49an output.

4:50Here's an example.

4:51Instead of just knowing the tumor size, say you also have each patient's age in years.

4:59The new dataset now has two inputs, age and tumor size.

5:05Using this new dataset, we're going to use circles to show patients whose tumors are

5:10benign and crosses to show the patients with a tumor that was malignant.

5:17So when a new patient comes in, the doctor can measure the patient's tumor size and also

5:22record the patient's age.

5:25And so given this, how can we predict if this patient's tumor is benign or malignant?

5:32Well, given a dataset like this, what the learning algorithm might do is find some boundary

5:38that separates out the malignant tumors from the benign ones.

5:44So the learning algorithm has to decide how to fit a boundary line to this data.

5:50The boundary line found by the learning algorithm would help the doctor with the diagnosis.

5:55In this case, the tumor is more likely to be benign.

6:01From this example, we've seen how two inputs, the patient's age and tumor size, can be used.

6:07In other machine learning problems, often many more input values are required.

6:13My friends who worked on breast cancer detection used many additional inputs, like the thickness

6:18of the tumor clump, uniformity of the cell size, uniformity of the cell shape, and so on.

6:24So to recap, supervised learning maps input X to output Y, where the learning algorithm

6:32learns from the quote, right answers.

6:35The two major types of supervised learning are regression and classification.

6:41In a regression application, like predicting prices of houses, the learning algorithm has

6:46to predict numbers from infinitely many possible output numbers, whereas in classification,

6:52the learning algorithm has to make a prediction of a category out of a small set of possible outputs.

6:59So you now know what is supervised learning, including both regression and classification.

7:05I hope you're having fun.

7:07Next, there's a second major type of machine learning called unsupervised learning.

7:13Let's go on to the next video to see what that is.

---

0:02After supervised learning, the most widely used form of machine learning is unsupervised learning.

0:08Let's take a look at what that means.

0:10We've talked about supervised learning, and this video is about unsupervised learning.

0:16But don't let the name unsupervised fool you.

0:19Unsupervised learning is, I think, just as super as supervised learning.

0:25When we're looking at supervised learning in the last video, recall that it looks something like this.

0:30In the case of a classification problem, each example was associated with an output label Y,

0:36such as benign or malignant, designated by the O's and crosses.

0:41In unsupervised learning, we're given data that isn't associated with any output labels Y.

0:49Say you're given data on patients and their tumor size and the patient's age, but not whether the tumor was benign or malignant.

0:58So the dataset looks like this on the right.

1:03We're not asked to diagnose whether the tumor is benign or malignant because we're not given any labels Y in the dataset.

1:13Instead, our job is to find some structure or some pattern or just find something interesting in the data.

1:20This is unsupervised learning.

1:23We call it unsupervised because we're not trying to supervise the algorithm to give some, quote, right answer for every input.

1:32Instead, we ask the algorithm to figure out all by itself what's interesting or what patterns or structures there might be in this data.

1:42With this particular dataset, an unsupervised learning algorithm might decide that the data can be assigned to two different groups or two different clusters.

1:52And so it might decide that there's one cluster or group over here and there's another cluster or group over here.

2:03This is a particular type of unsupervised learning called a clustering algorithm because it places the unlabeled data into different clusters.

2:13And this turns out to be used in many applications.

2:17For example, clustering is used in Google News.

2:22What Google News does is every day it goes and looks at hundreds of thousands of news articles on the Internet and groups related stories together.

2:31For example, here's a sample from Google News where the headline of the top article is,

2:37Giant Panda Gives Birth to Rare Twin Cubs at Japan's Oldest Zoo.

2:41This article had actually caught my eye because my daughter loves pandas.

2:46And so there are a lot of stuffed panda toys and watching panda videos in my house.

2:51And looking at this, you might notice that below this are other related articles.

2:59Maybe from the headlines alone, you can start to guess what clustering might be doing.

3:05Notice that the word panda appears here, here, here, here, and here.

3:14And notice that the word twin also appears in all five articles.

3:21And the word zoo also appears in all of these articles.

3:26So the clustering algorithm is finding articles out of all the hundreds of thousands of news articles on the Internet that day,

3:33finding the articles that mention similar words and grouping them into clusters.

3:39Now what's cool is that this clustering algorithm figures out on its own which words suggest that certain articles are in the same group.

3:47What I mean is there isn't an employee at Google News who's telling the algorithm to find articles that have the word panda and twins and zoo to put them into the same cluster.

3:57The news topics change every day and there are so many news stories,

4:01it just isn't feasible to have people doing this every single day for all the topics the news covers.

4:08Instead, the algorithm has to figure out on its own, without supervision, what are the clusters of news articles today.

4:17So that's why this clustering algorithm is a type of unsupervised learning algorithm.

4:23Let's look at a second example of unsupervised learning applied to clustering genetic or DNA data.

4:31This image shows a picture of DNA microarray data.

4:36These look like tiny grids of a spreadsheet and each tiny column represents the genetic or DNA activity of one person.

4:45So, for example, this entire column here is from one person's DNA and this other column is of another person.

4:54Each row represents a particular gene.

4:58So just as an example, perhaps this row here might represent a gene that affects eye color,

5:04or this row here is a gene that affects how tall someone is.

5:09Researchers have even found a genetic link to whether someone dislikes certain vegetables, such as broccoli or Brussels sprouts or asparagus.

5:19So next time someone asks you, why didn't you finish your salad, you can tell them, oh, maybe it's genetic.

5:25For DNA microarrays, the idea is to measure how much certain genes are expressed for each individual person.

5:33So these colors, red, green, gray, and so on, show the degree to which different individuals do or do not have a specific gene active.

5:44And what you can do is then run a clustering algorithm to group individuals into different categories or different types of people.

5:54Like maybe these individuals are grouped together, and let's just call this type 1.

5:59And these people are grouped into type 2.

6:04And these people are grouped as type 3.

6:09This is unsupervised learning because we're not telling the algorithm in advance that there is a type 1 person with certain characteristics or a type 2 person with certain characteristics.

6:19Instead, what we're saying is, here's a bunch of data.

6:22I don't know what the different types of people are, but can you automatically find structure in the data and automatically figure out what are the major types of individuals?

6:32Since we're not giving the algorithm the right answer for the examples in advance, this is unsupervised learning.

6:39Here's a third example.

6:41Many companies have huge databases of customer information.

6:46Given this data, can you automatically group your customers into different market segments so that you can more efficiently serve your customers?

6:56Quite briefly, the DeepLearning.ai team did some research to better understand the DeepLearning.ai community and why different individuals take these classes, subscribe to the BASH weekly newsletter, or attend our Pioneer AI events.

7:11Let's visualize the DeepLearning.ai community as this collection of people.

7:17Running clustering, that is, market segmentation, found a few distinct groups of individuals.

7:25One group's primary motivation is seeking knowledge to grow their skills.

7:30Perhaps this is you.

7:31And so, that's great.

7:33A second group's primary motivation is looking for a way to develop their career.

7:38Maybe you want to get a promotion or a new job or make some career progression.

7:42If this describes you, that's great too.

7:45And yet another group wants to stay updated on how AI impacts their field of work.

7:51Perhaps this is you.

7:52That's great too.

7:54This is a clustering that our team used to try to better serve our community as we're trying to figure out what are the major categories of learners in the DeepLearning.ai community.

8:06So if any of these is your top motivation for learning, that's great.

8:10And I hope I'll be able to help you on your journey.

8:13Or in case this is you and you want something totally different than the other three categories, that's fine too.

8:20And I want you to know I love you all the same.

8:24So to summarize, a clustering algorithm, which is a type of unsupervised learning algorithm, takes data without labels and tries to automatically group them into clusters.

8:35And so maybe the next time you see or think of a panda, maybe you think of clustering as well.

8:42And besides clustering, there are other types of unsupervised learning as well.

8:47Let's go on to the next video to take a look at some other types of unsupervised learning algorithms.

---

0:01In the last video, you saw what is unsupervised learning and one type of unsupervised learning called clustering.

0:08Let's give a slightly more formal definition of unsupervised learning and take a quick look at some other types of unsupervised learning other than clustering.

0:17Whereas in supervised learning, the data comes with both inputs x and output labels y,

0:23in unsupervised learning, the data comes only with inputs x but not output labels y,

0:30and the algorithm has to find some structure or some pattern or something interesting in the data.

0:37We've seen just one example of unsupervised learning called a clustering algorithm, which groups similar data points together.

0:46In this specialization, you learn about clustering as well as two other types of unsupervised learning.

0:53One is called anomaly detection, which is used to detect unusual events.

1:00This turns out to be really important for fraud detection in the financial system,

1:05where unusual events, unusual transactions could be a sign of fraud and for many other applications.

1:13And you also learn about dimensionality reduction.

1:17This lets you take a big dataset and almost magically compress it to a much smaller dataset while losing as little information as possible.

1:27In case anomaly detection and dimensionality reduction don't seem to make too much sense to you yet, don't worry about it.

1:34We'll get to this later in this specialization.

1:37Now, I'd like to ask you another question to help you check your understanding.

1:43And no pressure, if you don't get it right on the first try, it's totally fine.

1:48Please select any of the following that you think are examples of unsupervised learning.

1:54Two are unsupervised examples and two are supervised learning examples.

1:59So please take a look.

2:02Maybe you remember the spam filtering problem.

2:06If you have labeled data, you know, labeled as spam or non-spam email, you can treat this as a supervised learning problem.

2:15The second example, the news story example, that's exactly the Google News and Tandem example that you saw in the last video.

2:23And so you can approach that using a clustering algorithm to group news articles together.

2:29So that would use unsupervised learning.

2:32The market segmentation example that I talked about a little bit earlier, you can do that as an unsupervised learning problem as well.

2:40Because you can give your algorithm some data and ask it to discover market segments automatically.

2:47And the final example on diagnosing diabetes.

2:51Well, actually, that's a lot like our breast cancer example from the supervised learning videos.

2:57Only instead of benign or malignant tumors, we instead have diabetes or not diabetes.

3:03And so you can approach this as a supervised learning problem, just like we did for the breast tumor classification problem.

3:10Even though in this and the last video, we've talked mainly about clustering, in later videos in this specialization, we'll dive much more deeply into anomaly detection and dimensionality reduction as well.

3:25So that's unsupervised learning.

3:27Before we wrap up this section, I want to share with you something that I find really exciting and useful, which is the use of Jupyter notebooks in machine learning.

3:36Let's take a look at that in the next video.
