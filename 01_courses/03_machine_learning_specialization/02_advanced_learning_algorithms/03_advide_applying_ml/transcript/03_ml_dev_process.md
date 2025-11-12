0:02In the next few videos, I'd like to share with you what it's like to go through the

0:06process of developing a machine learning system, so that when you are doing so yourself, hopefully

0:12you'll be in a position to make great decisions at many stages of the machine learning development

0:18process.

0:19Let's take a look first at the iterative loop of machine learning development.

0:24This is what developing a machine learning model will often feel like.

0:28First, you decide on what is the overall architecture of your system, and that means choosing your

0:34machine learning model as well as deciding what data to use, maybe picking the hyperparameters

0:40and so on.

0:42Then, given those decisions, you would implement and train a model.

0:48And as I've mentioned before, when you train a model for the first time, it will almost

0:52never work as well as you want it to.

0:56The next step that I recommend is to implement or to look at a few diagnostics, such as looking

1:02at the bias and variance of your algorithm, as well as something we'll see in the next

1:07video called error analysis.

1:10And based on the insights from the diagnostics, you can then make decisions like, do you want

1:15to make your neural network bigger or change the lambda regularization parameter, or maybe

1:22add more data or add more features or subtract features.

1:26And then you go around this loop again with your new choice of architecture.

1:31And it will often take multiple iterations through this loop until you get to the performance

1:36that you want.

1:37Let's look at an example of building an email spam classifier.

1:42I think many of us passionately hate email spam, and this is a problem that I worked

1:48on years ago and also was involved in starting an anti-spam conference once years ago.

1:55The example on the left is what a highly spammy email might look like.

1:59Dear Louis, buy now Rolex watches.

2:02And spammers will sometimes deliberately misspell words like these, watches, medicine, and mortgages

2:10in order to try to trip up a spam recognizer.

2:13And in contrast, this email on the right is an actual email I once got from my younger

2:18brother Alfred about getting together for Christmas.

2:21So how do you build a classifier to recognize spam versus non-spam emails?

2:30One way to do so would be to train a supervised learning algorithm where the input features

2:37x would be the features of an email, and the output label y will be 1 or 0 depending

2:44on whether it's spam or non-spam.

2:47So one way, this application is an example of text classification because you're taking

2:54a text document that is an email and trying to classify it as either spam or non-spam.

3:00One way to construct the features of an email would be to, say, take the top 10,000 words

3:06in the English language or in some other dictionary and use them to define features

3:11x1, x2, through x10,000.

3:16So for example, given this email on the right, if the list of words we have is a, Andrew,

3:23buy, deal, discount, and so on, then given the email on the right, we would set these

3:34features to be, say, 0 or 1 depending on whether or not that word appears.

3:39So the word a does not appear, the word Andrew does appear, the word buy does appear, deal

3:47does, discount does not, and so on.

3:50And so you can construct 10,000 features of this email.

3:54And there are many ways to construct the feature vector.

3:58Another way would be to let these numbers not just be 1 or 0, but actually count the

4:03number of times a given word appears in the email.

4:06So if buy appears twice, maybe you want to set this to 2, but setting it to just 1 or

4:120 actually works decently well.

4:15Given these features, you can then train a classification algorithm such as a logistic

4:21regression model or a neural network to predict y given these features x.

4:29After you've trained your initial model, if it doesn't work as well as you wish, you

4:34will quite likely have multiple ideas for improving the learning algorithm's performance.

4:39For example, it's always tempting to collect more data.

4:43In fact, I have friends that have worked on very large-scale honeypot projects.

4:48And these are projects that create a large number of fake email addresses and tries deliberately

4:54to get these fake email addresses into the hands of spammers so that when they send spam

4:59email to these fake emails, well, we know these are spammy messages.

5:03And so this is a way to get a lot of spam data.

5:06Or you might decide to work on developing more sophisticated features based on the email

5:12routing.

5:13Email routing refers to the sequence of compute servers, sometimes around the world, that

5:20the email has gone through on its way to reach you.

5:24And emails actually have what's called email header information.

5:28That is information that keeps track of how the email has traveled across different servers,

5:33across different networks, to find its way to you.

5:37And sometimes the path that the email has traveled can help tell you if it was sent

5:42by a spammer or not.

5:45Or you might work on coming up with more sophisticated features from the email body

5:50that is the text of the email.

5:52So in the features I talked about last time, discounting and discount might be treated

5:58as different words, but maybe they should be treated as the same words.

6:04Or you might decide to come up with algorithms to detect misspellings or deliberate misspellings

6:09like watches, medicine, and mortgage.

6:12And this too could help you decide if an email is spammy.

6:16So given all of these and possibly even more ideas, how can you decide which of these ideas

6:22are more promising to work on?

6:24Because choosing the more promising path forward can speed up your project easily 10 times

6:30compared to if you were to somehow choose some of the less promising directions.

6:35For example, we've already seen that if your algorithm has high bias rather than high variance,

6:41then spending months and months on a honeypot project may not be the most fruitful direction.

6:46But if your algorithm has high variance, then collecting more data could help a lot.

6:50So during the iterative loop of machine learning development, you may have many ideas for how

6:55to modify the model or the data, and it'll be coming up with different diagnostics that

7:01can give you a lot of guidance on what choices for the model or data or other parts of the

7:07architecture could be most promising to try.

7:11In the last several videos, we've already talked about bias and variance.

7:15In the next video, I'd like to start describing to you the error analysis process, which is

7:22a second key set of ideas for gaining insight about what architecture choices might be fruitful.

7:30So that's the iterative loop of machine learning development.

7:34And using the example of building a spam classifier, let's take a look at what error analysis looks

7:39like.

7:40Let's do that in the next video.

---
0:02In terms of the most important ways to help you run diagnostics, to choose what to try

0:07next to improve your learning algorithm performance, I would say bias and variance is probably

0:12the most important idea, and error analysis would probably be second on my list.

0:17So let's take a look at what this means.

0:19Concretely, let's say you have MCV equals 500 cross-validation examples, and your algorithm

0:28misclassifies 100 of these 500 cross-validating examples.

0:33The error analysis process just refers to manually looking through these 100 examples

0:40and trying to gain insights into where the algorithm is going wrong.

0:45Specifically, what I would often do is find a set of examples that the algorithm has misclassified

0:53examples from the cross-validation set, and try to group them into common themes or common

1:00properties or common traits.

1:03So for example, if you notice that quite a lot of the misclassified spam emails are pharmaceutical

1:10sales trying to sell medicines or drugs, then I would actually go through these examples

1:15and count up by hand how many emails it misclassified are pharmaceutical spam, and say there are

1:2221 emails that are pharmaceutical spam.

1:25Or, if you suspect that deliberate misspellings may be tripping up your spam classifier, then

1:33I would also go through and just count up how many of these examples that it misclassified

1:39had a deliberate misspelling.

1:40Let's say I find 3 out of 100.

1:43Or, looking through the email routing info, I find 7 has unusual email routing, and 18

1:53are emails trying to steal passwords or phishing emails.

1:57Spammers sometimes also, instead of writing the spam message in the email body, they instead

2:04create an image and then write the spammy message inside an image that appears in the

2:10email.

2:11This makes it a little bit harder for a learning algorithm to figure out what's going on.

2:14And so, maybe some of those emails are these embedded image spam.

2:19If you end up with these counts, then that tells you that pharmaceutical spam and emails

2:28trying to steal passwords or phishing emails seem to be huge problems, whereas deliberate

2:35misspellings, while it is a problem, it is a smaller one.

2:39In particular, what this analysis tells you is that even if you were to build really sophisticated

2:45algorithms to find deliberate misspellings, it would only solve 3 out of 100 of your

2:52misclassified examples.

2:54So the net impact seems like it may not be that large.

2:58It doesn't mean it's not worth doing, but when you're prioritizing what to do, you

3:03might therefore decide not to prioritize this as highly.

3:06And by the way, I'm telling the story because I once actually spent a lot of time building

3:11algorithms to find deliberate misspellings and spam emails, only much later to realize

3:17that the net impact was actually quite small.

3:19So this is one example where I wish I had done more careful error analysis before spending

3:24a lot of time myself trying to find these deliberate misspellings.

3:29Just a couple of notes on this process.

3:32These categories can be overlapping, or in other words, they're not mutually exclusive.

3:38So for example, there can be a pharmaceutical spam email that also has unusual routing,

3:44or a password that has deliberate misspellings and is also trying to carry out a phishing

3:51attack.

3:52So one email can be counted in multiple categories.

3:56And in this example, I had said that the algorithm misclassifies 100 examples and will look at

4:03all 100 examples manually.

4:05If you have a larger cross-validation set, say if you had 5,000 cross-validation examples,

4:12and if the algorithm misclassified, say, 1,000 of them, then you may not have the time, depending

4:19on the team size and how much time you have to work on this project, you may not have

4:25the time to manually look at all 1,000 examples that the algorithm misclassifies.

4:30In that case, I will often sample randomly a subset of usually around 100, maybe a couple

4:36hundred examples, because that's the amount that you can look through in a reasonable

4:40amount of time.

4:42And hopefully, looking through maybe around 100 examples will give you enough statistics

4:47about what are the most common types of errors, and therefore where may be most fruitful to

4:52focus your attention.

4:54And so after this analysis, if you find that a lot of errors are pharmaceutical spam emails,

5:02then this might give you some ideas or inspiration for things to do next.

5:08For example, you may decide to collect more data, but not more data of everything, but

5:16just try to find more data of pharmaceutical spam emails so that the learning algorithm

5:21can do a better job recognizing these pharmaceutical spams.

5:25Or you may decide to come up with some new features that are related to, say, specific

5:30names of drugs or specific names of pharmaceutical products that the spammers are trying to sell

5:36in order to help your learning algorithm become better at recognizing this type of pharma

5:41spam.

5:43Then again, this might inspire you to make specific changes to the algorithm relating

5:48to detecting phishing emails.

5:50For example, you might look at the URLs in the email and write special code to come up

5:55with extra features to see if it's linking to suspicious URLs.

5:58Or again, you might decide to get more data of phishing emails specifically in order to

6:04help your learning algorithm do a better job at recognizing them.

6:07So the point of this error analysis is by manually examining a set of examples that

6:14your algorithm is misclassifying or mislabeling.

6:17Often this will create inspiration for what might be useful to try next.

6:23And sometimes it can also tell you that certain types of errors are sufficiently rare that

6:30they aren't worth as much of your time to try to fix.

6:33And so returning to this list, a bias-variance analysis should tell you if collecting more

6:40data is helpful or not.

6:42Based on our error analysis in the example we just went through, it looks like more sophisticated

6:47email features could help, but only a bit.

6:50Whereas more sophisticated features to detect pharma spam or phishing emails could help

6:55a lot.

6:55And this detecting misspellings would not help nearly as much.

7:00So in general, I found both the bias-variance diagnostic as well as carrying out this form

7:05of error analysis to be really helpful to screening or to deciding which changes to

7:11the model are more promising to try out next.

7:14Now, one limitation of error analysis is that it's much easier to do for problems

7:19that humans aren't good at.

7:21So you can look at an email and say, you think it's a spam email, why did the algorithm

7:25get it wrong?

7:26Error analysis can be a bit harder for tasks that even humans aren't good at.

7:31For example, if you're trying to predict what ads someone will click on on a website,

7:35well, I can't predict what someone will click on, so error analysis there actually

7:39tends to be more difficult.

7:41But when you apply error analysis to problems that you can, it can be extremely helpful

7:46for focusing attention on the more promising things to try.

7:50And that in turn can easily save you months of otherwise fruitless work.

7:55In the next video, I'd like to dive deeper into the problem of adding data.

8:01When you train a learning algorithm, sometimes you decide there's high variance and you

8:06want to get more data for it.

8:08And there's some techniques that can make how you add data much more efficient.

8:13So let's take a look at that so that hopefully you'll be armed with some good ways to get

8:18more data for your learning application.

---
0:03In this video, I'd like to share with you some tips for adding data, or collecting more data, or sometimes even creating more data for your machine learning application.

0:12Just a heads up that this and the next few videos will seem a little bit like a grab bag of different techniques, and I apologize if it seems a little bit grab baggy.

0:22And that's because machine learning applications are different. Machine learning is applied to so many different problems, and for some, humans are great at creating labels.

0:31And for some, you can get more data, and for some, you can't. And that's why different applications actually sometimes call for slightly different techniques.

0:40But I hope in this and the next few videos to share with you some of the techniques that I've found to be most useful for different applications.

0:47Although not every one of them will apply for every single application, but I hope many of them will be useful for many of the applications that you'll be working on as well.

0:56But let's take a look at some tips for how to add data for your application.

1:01When training machine learning algorithms, it feels like always we wish we had even more data almost all the time.

1:08And so sometimes it's tempting to let's just get more data of everything.

1:14But trying to get more data of all types can be slow and expensive.

1:20Instead, an alternative way of adding data might be to focus on adding more data of the types where error analysis has indicated it might help.

1:31In the previous slide, we saw if error analysis revealed that farmer spam was a large problem, then you may decide to have a more targeted effort not to get more data of everything under the sun, but to instead focus on getting more examples of farmer spam.

1:50And with a more modest cost, this could let you add just the emails you need to help your learning algorithm get smarter on recognizing farmer spam.

2:01And so one example of how you might do this is if you have a lot of unlabeled email data, say email sitting around and no one has bothered to label yet spam or non-spam.

2:14You may be able to ask the labelers to quickly skim through the unlabeled data and find more examples specifically of farmer related spam.

2:24And this could boost your learning algorithm's performance much more than just trying to add more data of all sorts of emails.

2:33But the more general pattern I hope you take away from this is if you have some ways to add more data of everything, that's okay.

2:42Nothing wrong with that. But if error analysis has indicated that there are certain subsets of the data that the algorithm is doing particularly poorly on and that you want to improve performance on,

2:55then getting more data of just the types where you want it to do better, be it more examples of pharmaceutical spam or more examples of phishing spam or something else,

3:05that could be a more efficient way to add just a little bit of data but boost your algorithm's performance by quite a lot.

3:11Beyond getting your hands on brand new training examples XY, there's another technique that's widely used especially for images and audio data that can increase your training set size significantly.

3:27This technique is called data augmentation, and what we're going to do is take an existing training example to create a new training example.

3:35For example, if you're trying to recognize the letters from A to Z for an OCR, optical character recognition problem, so not just the digits 0 to 9 but also the letters from A to Z.

3:48Given an image like this, you might decide to create a new training example by rotating the image a bit or by enlarging the image a bit or by shrinking a little bit or by changing the contrast of the image.

4:07These are examples of distortions to the image that don't change the fact that this is still the letter A.

4:16For some letters but not others, you can also take the mirror image of the letter and it still looks like the letter A, but this only applies to some letters.

4:27These would be ways of taking a training example XY and applying a distortion or transformation to the input X in order to come up with another example that has the same label.

4:44By doing this, you're telling the algorithm that the letter A rotated a bit or enlarged a bit or shrunk a little bit, it is still the letter A.

4:53Creating additional examples like this helps the learning algorithm do a better job learning how to recognize the letter A.

5:01For a more advanced example of data augmentation, you can also take the letter A and place a grid on top of it.

5:10By introducing random warping of this grid, you can take the letter A and introduce warping of the letter A to create a much richer library of examples of the letter A.

5:23This process of distorting these examples then has turned one image or one example into here training examples that you can feed to the learning algorithm to help it learn more robustly what is the letter A.

5:38This idea of data augmentation also works for speech recognition.

5:43Let's say for a voice search application, you have an original audio clip that sounds like this.

5:50What is today's weather?

5:52One way you can apply data augmentation to speech data would be to take noisy background audio like this.

6:00For example, this is what the sound of a crowd sounds like.

6:09And it turns out that if you take these two audio clips, the first one and the crowd noise, and you add them together, then you end up with an audio clip that sounds like this.

6:21What is today's weather?

6:23And you just created an audio clip that sounds like someone saying, what's the weather today, but they're saying it around a noisy crowd in the background.

6:33Or in fact, if you were to take a different background noise, say someone in a car, this is what background noise of a car sounds like.

6:44And you were to add the original audio clip to the car noise, then you get this.

6:50What is today's weather?

6:52And it sounds like the original audio clip, but as if the speaker was saying it from a car.

6:59And a more advanced data augmentation step would be if you make the original audio sound like you're recording it on a bad cell phone connection like this.

7:08What is today's weather?

7:11And so we've seen how you can take one audio clip and turn it into three training examples here.

7:16One with crowd background noise, one with car background noise, and one as if it was recorded on a bad cell phone connection.

7:24And the times I've worked on speech recognition systems, this was actually a really critical technique for increasing, artificially, the size of the training data I had to build a more accurate speech recognizer.

7:36One tip for data augmentation is that the changes or the distortions you make to the data should be representative of the types of noise or distortions in the test set.

7:48So, for example, if you take the letter A and warp it like this, this still looks like examples of letters you might see up there that you would like to recognize.

7:58Or for audio, adding background noise or bad cell phone connection, if that's representative of what you expect to hear in the test set, then these would be helpful ways to carry out data augmentation on your audio data.

8:14In contrast, it's usually not that helpful to add purely random, meaningless noise to your data.

8:21For example, here I've taken the letter A and I've added per pixel noise, where if xi is the intensity or the brightness of pixel i, if I were to just add noise to each pixel, then you end up with images that look like this.

8:37But to the extent that this isn't that representative of what you see in the test set, because you don't often get images like this in the test set, this is actually going to be less helpful.

8:48So one way to think about data augmentation is how can you modify or warp or distort or make more noisy your data, but in a way so that what you get is still quite similar to what you have in your test set.

9:02Because that's what the learning algorithm will ultimately end up doing well on.

9:07Now, whereas data augmentation takes an existing training example and modifies it to create another training example, there's one other technique, which is data synthesis, in which you make up brand new examples from scratch, not by modifying an existing example, but by creating brand new examples.

9:27So take the example of photo OCR. Photo OCR, or photo optical character recognition, refers to the problem of looking at an image like this and automatically having a computer read the text that appears in this image.

9:43So there's a lot of text in this image.

9:45How can you train an OCR algorithm to read text from an image like this?

9:53Well, when you look closely at what the letters in this image look like, they actually look like this.

9:59So this is real data from a photo OCR task.

10:02And one key step of the photo OCR task is to be able to look at a little image like this and recognize the letter at the middle.

10:10So this has T in the middle, this has the letter L in the middle, this has the letter C in the middle, and so on.

10:20So one way to create artificial data for this task is if you go to your computer's text editor, you find that it has a lot of different fonts.

10:31And what you can do is take these fonts and basically type out random text in your text editor and screenshot it using different colors and different contrasts and very different fonts.

10:45And you get synthetic data like that on the right.

10:49The images on the left were real data from real pictures taken out in the world.

10:55The images on the right are synthetically generated using fonts on the computer, and it actually looks pretty realistic.

11:03So with synthetic data generation like this, you can generate a very large number of images or examples for your photo OCR task.

11:13It can be a lot of work to write the code to generate realistic-looking synthetic data for a given application.

11:21But when you spend the time to do so, it can sometimes help you generate a very large amount of data for your application and give you a huge boost to your album's performance.

11:33Synthetic data generation has been used most probably for computer vision tasks and less for other applications, not that much for audio tasks as well.

11:44All the techniques you've seen in this video relate to finding ways to engineer the data used by your system.

11:52In the way that machine learning has developed over the last several decades, many decades, most machine learning researchers' attention was on the conventional model-centric approach.

12:03And here's what I mean.

12:06A machine learning system, or an AI system, includes both code to implement your algorithm or your model, as well as the data that you train the algorithm on.

12:15And over the last few decades, most researchers doing machine learning research would download the data set and hold the data fixed while they focus on improving the code of the algorithm or the model.

12:29Thanks to that paradigm of machine learning research, I find that today, the algorithms we have access to, such as linear regression, logistic regression, neural networks, also decision trees which you'll see next week,

12:43there are algorithms that are already very good and will work well for many applications.

12:49And so sometimes it can be more fruitful to spend more of your time taking a data-centric approach in which you focus on engineering the data used by your algorithm.

13:02And this can be anything from collecting more data to collecting more data just on pharmaceutical spam, if that's what error analysis tells you to do,

13:11to using data augmentation to generate more images or more audio, or using data synthesis to just create more training examples.

13:19And sometimes that focus on the data can be an efficient way to help your learning algorithm improve its performance.

13:27So I hope that this video gives you a set of tools to be efficient and effective in how you add more data to get your learning algorithm to work better.

13:38Now, there are also some applications where you just don't have that much data and it's really hard to get more data.

13:44It turns out that there's a technique called transfer learning, which could apply in that setting to give your learning algorithm's performance a huge boost.

13:53And the key idea is to take data from a totally different, fairly related task.

13:58But using a neural network, there's sometimes ways to use that data from a very different task to get your algorithm to do better on your application.

14:08It doesn't apply to everything, but when it does, it can be very powerful.

14:12Let's take a look in the next video at how transfer learning works.

---

0:02For an application where you don't have that much data, transfer learning is a wonderful

0:07technique that lets you use data from a different task to help on your application.

0:13This is one of those techniques that I use very frequently.

0:16Let's take a look at how transfer learning works.

0:19So here's how transfer learning works.

0:22Let's say you want to recognize the handwritten digits from 0 through 9, but you don't have

0:29that much label data of these handwritten digits.

0:33Here's what you can do.

0:34Say you find a very large data set of 1 million images of pictures of cats, dogs, cars, people,

0:43and so on, 1,000 classes.

0:45You can then start by training a neural network on this large data set of a million images

0:51with 1,000 different classes and train the algorithm to take as input an image X and

0:56learn to recognize any of these 1,000 different classes.

1:01In this process, you end up learning parameters for the first layer of the neural network,

1:06W1B1, for the second layer, W2B2, and so on, W3B3, W4B4, and W5B5 for the upper layer.

1:15To apply transfer learning, what you do is then make a copy of this neural network where

1:22you would keep the parameters W1B1, W2B2, W3B3, and W4B4, but for the last layer, you

1:32would eliminate the upper layer and replace it with a much smaller upper layer with just

1:3810 rather than 1,000 output units.

1:44These 10 output units will correspond to the classes 0, 1, through 9 that you want your

1:49neural network to recognize.

1:52The problem is that the parameters W5B5 can't be copied over because the dimension of this

1:57layer has changed.

1:58You need to come up with new parameters, W5B5, that you need to train from scratch rather

2:06than just copy it from the previous neural network.

2:11In transfer learning, what you can do is use the parameters from the first 4 layers, really

2:19all the layers except the final upper layer as a starting point for the parameters, and

2:24then run an optimization algorithm such as gradient descent or the Adam optimization

2:28algorithm with the parameters initialized using the values from this neural network

2:33up on top.

2:34In detail, there are two options for how you can train this neural network's parameters.

2:41Option 1 is you only train the upper layer's parameters.

2:45You would take the parameters W1B1, W2B2, through W4B4 as the values from on top and

2:52just hold them fixed and don't even bother to change them.

2:55Use an algorithm like stochastic gradient descent or the Adam optimization algorithm

2:59to only update W5B5 to lower the cost function, the usual cost function that you use for learning

3:07to recognize these digits 0 to 9 from a small training set of these digits 0 to 9.

3:13So that's option 1.

3:15Option 2 would be to train all the parameters in the network, including W1B1, W2B2, all

3:20the way through W5B5, but the first 4 layers' parameters would be initialized using the

3:26values that you had trained on top.

3:30If you have a very, very small training set, then option 1 might work a little bit better.

3:36But if you have a training set that's a little bit larger, then option 2 might work a little

3:41bit better.

3:43This algorithm is called transfer learning because the intuition is by learning to recognize

3:49cats, dogs, cars, people, and so on, it will hopefully have learned some plausible sets

3:54of parameters for the earlier layers for processing image inputs.

4:00And then by transferring these parameters to the new neural network, the new neural

4:04network starts off with the parameters in a much better place.

4:09So that with just a little bit of further learning, hopefully it can end up at a pretty

4:13good model.

4:14These two steps of first training on a large data set and then tuning the parameters further

4:21on a smaller data set go by the name of supervised pre-training for the step on top.

4:27That's when you train the neural network on a very large data set of, say, a million images

4:31of not quite related tasks.

4:34And then the second step is called fine-tuning, where you take the parameters that you had

4:40initialized or gotten from supervised pre-training and then run gradient descent further to fine-tune

4:46the weights to suit the specific application of handwritten digit recognition that you

4:52may have.

4:53And so if you have a small data set, even tens or hundreds or thousands or just tens

4:58of thousands of images of the handwritten digits, able to learn from this million images

5:04of a not quite related task can actually help your learning algorithms performance a lot.

5:09One nice thing about transfer learning as well is maybe you don't need to be the one

5:15to carry out supervised pre-training.

5:18For a lot of neural networks, there will already be researchers that have already trained a

5:22neural network on a large image and will have posted their trained neural networks on the

5:30internet, freely licensed for anyone to download and use.

5:34And what that means is rather than carrying out the first step yourself, you can just

5:38download the neural network that someone else may have spent weeks training and then replace

5:43the output layer with your own output layer and carry out either option one or option

5:48two to fine-tune a neural network that someone else has already carried out supervised pre-training

5:54on and just do a little bit of fine-tuning to quickly be able to get to neural network

5:59that performs well on your task.

6:02Downloading a pre-trained model that someone else has trained and provided for free is

6:07one of those techniques where by building on each other's work in the machine learning

6:11community, we can all get much better results by the generosity of other researchers that

6:16have pre-trained and posted their neural networks online.

6:20But why does transfer learning even work?

6:23How can you possibly take parameters obtained by recognizing cats, dogs, cars, and people

6:28and use that to help you recognize something as different as handwritten digits?

6:34Here's some intuition behind it.

6:37If you are training a neural network to detect, say, different objects from images, then the

6:45first layer of a neural network may learn to detect edges in the image.

6:50We think of these as somewhat low-level features in the image, which is to detect edges.

6:56Each of these squares is a visualization of what a single neuron has learned to detect,

7:01has learned to group together pixels to find edges in an image.

7:06The next layer of the neural network then learns to group together edges to detect corners.

7:12And so each of these is a visualization of what one neuron may have learned to detect,

7:17has learned to detect little simple shapes like corner-like shapes like this.

7:23And the next layer of the neural network may have learned to detect somewhat more complex

7:27but still generic shapes like basic curves or small little shapes like these.

7:33And that's why by learning on detecting lots of different images, you're teaching the neural

7:39network to detect edges, corners, and basic shapes.

7:43And that's why by training a neural network to detect things as diverse as cats and dogs

7:47and cats and people, you're helping it to learn to detect these pretty generic features

7:53of images and finding edges, corners, curves, basic shapes.

7:59This is useful for many other computer vision tasks such as recognizing handwritten digits.

8:06One restriction of pre-training though is that the image type X has to be the same for

8:12the pre-training and the fine-tuning steps.

8:15So if the final task you want to solve is a computer vision task, then the pre-training

8:20step also has to be a neural network trained on the same type of input, namely an image

8:26of the desired dimensions.

8:28Conversely, if your goal is to build a speaker recognition system to process audio, then

8:34a neural network pre-trained on images probably won't do much good on audio.

8:38Instead, you want a neural network pre-trained on audio data that you then fine-tune on your

8:43own audio dataset, and the same for other types of applications.

8:47You can pre-train a neural network on text data, and if your application has the same

8:53feature input X of text data, then you can fine-tune that neural network on your own

8:58data.

8:59To summarize, these are the two steps for transfer learning.

9:03Step one is download a neural network with parameters that have been pre-trained on a

9:08large dataset with the same input type as your application, and that input type could

9:14be images, audio, text, or something else.

9:17Or if you don't want to download a neural network, maybe you can train your own.

9:21But in practice, if you're using images, say, it's much more common to download someone

9:26else's pre-trained neural network.

9:28Then further train or fine-tune the network on your own data, and I found that if you

9:35can get a neural network pre-trained on a large dataset, say a million images, then

9:40sometimes you can use a much smaller dataset, maybe a thousand images, maybe even smaller,

9:47to fine-tune the neural network on your own data and get pretty good results.

9:52And I've sometimes trained neural networks on as few as 50 images that work quite well

9:57using this technique when it has already been pre-trained on a much larger dataset.

10:03This technique isn't panacea.

10:04You can't get every application to work just on 50 images, but it does help a lot when

10:10the dataset you have for your application isn't that large.

10:14And by the way, if you've heard of advanced techniques in the news like GPT-3 or BERT

10:20or neural networks pre-trained on image nets, those are actually examples of neural networks

10:26that someone else has pre-trained on a very large image dataset or text dataset that can

10:32then be fine-tuned on other applications.

10:34If you haven't heard of GPT-3 or BERT or image nets, don't worry about it, but if you have,

10:39those have been successful applications of transfer learning in the machine learning

10:43literature.

10:44One of the things I like about transfer learning is it's been one of the ways that the machine

10:48learning community has shared ideas and code and even parameters with each other, because

10:54thanks to the researchers that have pre-trained large neural networks and posted the parameters

10:59on the internet freely for anyone else to download and use, this empowers anyone to

11:04take models they have pre-trained to fine-tune on potentially a much smaller dataset.

11:10In machine learning, all of us end up often building on the work of each other, and that

11:15open sharing of ideas, of code, of trained parameters is one of the ways that the machine

11:22learning community, all of us collectively, manage to do much better work than any single

11:27person by themselves can.

11:29And so I hope that you joining the machine learning community will someday maybe find

11:33a way to contribute back to this community as well.

11:36So that's it for pre-training.

11:39I hope you find this technique useful, and in the next video, I'd like to share with

11:44you some thoughts on the full cycle of a machine learning project.

11:50So when building a machine learning system, what are all the steps that are worth thinking

11:54about?

11:55We'll take a look at that in the next video.

---
0:02So far, we've talked a lot about how to train a model, and also talked a bit about how to get data for your machine learning application.

0:10But when I'm building a machine learning system, I find that training a model is just part of the puzzle.

0:17In this video, I'd like to share with you what I think of as the full cycle of a machine learning project.

0:23That is, when you're building a valuable machine learning system, what are the steps to think about and plan for?

0:30Let's take a look.

0:31Let me use speech recognition as an example to illustrate the full cycle of a machine learning project.

0:37The first step of a machine learning project is to scope the project.

0:41In other words, decide what is the project and what you want to work on.

0:46For example, I once decided to work on speech recognition for voice search.

0:51That is, to do web search using speaking to your mobile phone rather than typing into your mobile phone.

0:57So that's project scoping.

0:59After deciding what to work on, you have to collect data.

1:03So decide what data you need to train your machine learning system and go and do the work to get the audio and get the transcripts or the labels for your dataset.

1:12So that's data collection.

1:14After you have your initial data collection, you can then start to train the model.

1:20And so here you would train the speech recognition system and carry out error analysis and iteratively improve your model.

1:29And it's not at all uncommon after you've started training the model for an error analysis or for a bias-variance analysis to tell you that you might want to go back to collect more data.

1:42Maybe collect more data of everything or just collect more data of a specific type where your error analysis tells you you want to improve the performance of your learning algorithm.

1:52For example, once when working on speech, I realized that my model was doing particularly poorly when there was car noise in the background.

2:00So it sounded like someone was speaking in a car.

2:03My speech system performed poorly, decided to get more data, actually using data augmentation to get more speech data that sounds like it was a car in order to improve the performance of my learning algorithm.

2:17So you go around this loop a few times, train the model, carry out error analysis, go back to collect more data, maybe do this for a while, until eventually you think the model is good enough to then deploy in a production environment.

2:30And what that means is you make it available for users to use.

2:34And when you deploy a system, you want to also make sure that you continue to monitor the performance of the system and to maintain the system in case the performance gets worse to bring its performance back up.

2:46Instead of just hosting your machine learning model on a server, I'll say a little bit more about why you need to maintain these machine learning systems on the next slide.

2:56But after this deployment, sometimes you realize that it's not working as well as you hoped, and you go back to train the model to improve it again or even go back and get more data.

3:07In fact, if users and if you have permission to use data from your production deployment, sometimes that data from your working speech system can give you access to even more data with which to keep on improving the performance of your system.

3:24Now, I think you have a sense of what scoping a project means.

3:27And we'll talk a bunch about collecting data and training models in this course.

3:32But let me share with you a little bit more detail about what deploying in production might look like.

3:39After you've trained a high-performing machine learning model, say a speech recognition model, a common way to deploy the model would be to take your machine learning model and implement it in a server, which I'm going to call an inference server, whose job it is to call your machine learning model, your trained model, in order to make predictions.

4:06Then if your team has implemented a mobile app, say a search application, then when a user talks to the mobile app, the mobile app can then make an API call to pass to your inference server the audio clip that was recorded.

4:23And the inference server's job is to apply the machine learning model to it and then return to it the prediction of your model, which in this case would be the text transcript of what was said.

4:36So this would be a common way of implementing an application that calls via an API an inference server that has your model repeatedly make predictions based on the input X.

4:49So this would be a common pattern where depending on the application that's implemented, you have an API call to give your learning algorithm the input X, and your machine learning model would then output the prediction, say Y hat.

5:04To implement this, some software engineering may be needed to write all the code that does all of these things.

5:13And depending on whether your application needs to serve just a few handful of users or millions of users, the amounts of software engineering needed can be quite different.

5:23So I've built software that serves just a handful of users on my laptop, and I've also built software that serves hundreds of millions of users, requiring significant data center resources.

5:37So depending on the scale of the application needed, software engineering may be needed to make sure that your inference server is able to make reliable and efficient predictions, hopefully at not too high a computational cost.

5:50Software engineering may be needed to manage scaling to a large number of users.

5:54You often want to log the data you're getting, both the inputs X as well as the predictions Y hat, assuming that user privacy and consent allows you to store this data.

6:05And this data, if you can access to it, is also very useful for system monitoring.

6:12For example, I once built a speech recognition system on a certain data set that I had.

6:17But when there were new celebrities that suddenly became well-known, or elections caused new politicians to become elected, then people would search for these new names that were not in the training set and that my system did poorly on.

6:33And it was because we're monitoring the system, it allowed us to figure out when the data was shifting and the algorithm was becoming less accurate, and this allowed us to retrain the model and then to carry out a model update to replace the old model with a new one.

6:52So the deployment process can require some amount of software engineering.

6:57For some applications, if you're just running it on a laptop or on a one-on-two service, maybe not that much software engineering is needed.

7:05And depending on the team you're working on, it's possible that you build the machine learning model, but there could be a different team responsible for deploying it.

7:18But there is a growing field in machine learning called MLOps.

7:22This stands for Machine Learning Operations, and this refers to the practice of how to systematically build and deploy and maintain machine learning systems to do all of these things to make sure that your machine learning model is reliable, scales well, has good logs, is monitored, and that you have the opportunity to make updates.

7:47to the model as appropriate to keep it running well.

7:50For example, if you're deploying your system to millions of people, you may want to make sure you have a highly optimized implementation so that the compute cost of serving millions of people is not too expensive.

8:03So in this and the last class, we spent a lot of time talking about how to train a machine learning model, and that is absolutely the critical piece to making sure you have a high-performance system.

8:15And if you ever have to deploy a system to millions of people, these are some additional steps that you probably have to address, think about and address at that point as well.

8:26Before moving on from the topic of the machine learning development process, there's one more set of ideas that I want to share with you that relates to the ethics of building machine learning systems.

8:38This is a crucial topic for many applications, so let's take a look at this in the next video.

---
0:02Machine learning algorithms today are affecting billions of people.

0:06You've heard me mention ethics in other videos before, and I hope that if you're building a machine learning system that affects people,

0:14that you give some thought to making sure that your system is reasonably fair, reasonably free from bias,

0:21and that you're taking an ethical approach to your application.

0:26Let's take a look at some issues related to fairness, bias, and ethics.

0:32Unfortunately, in the history of machine learning, there have been a few systems, some widely publicized,

0:38that turned out to exhibit a completely unacceptable level of bias.

0:43For example, there was a hiring tool that was once shown to discriminate against women.

0:49The company that built the system stopped using it, but one wishes that the system had never been rolled out in the first place.

0:58Well, there was also a well-documented example of face recognition systems that matched dark-skinned individuals to criminal mugshots

1:06much more often than lighter-skinned individuals.

1:09Clearly, this is not acceptable, and we should get better at the community at just not building and deploying systems with a problem like this in the first place.

1:19There have been systems that gave bank loan approvals in a way that was biased and discriminated against subgroups,

1:26and we also really like learning algorithms to not have the toxic effect of reinforcing negative stereotypes.

1:34For example, I have a daughter, and if she searches online for certain professions and doesn't see anyone that looks like her,

1:41I would hate for that to discourage her from taking on certain professions.

1:46In addition to the issues of bias and fair treatment of individuals,

1:52there have also been adverse use cases or negative use cases of machine learning algorithms.

1:59For example, there was this widely cited and widely viewed video released with full disclosure and full transparency

2:07by the company BuzzFeed of a deepfake of former U.S. President Barack Obama.

2:14You can actually find and watch the whole video online if you want,

2:18but the company that created this video did so with full transparency and full disclosure,

2:24but clearly using this technology to generate fake videos without consent and without disclosure would be unethical.

2:34We've also seen, unfortunately, social media sometimes spreading toxic or incendiary speech

2:41because optimizing for user engagement has led to algorithms doing so.

2:47There have been bots that were used to generate fake content for either commercial purposes,

2:54such as posting fake comments on products, or for political purposes.

3:00And there are users of machine learning to build harmful products, commit fraud, and so on.

3:07And in parts of the machine learning world, just as in email,

3:11there has been a battle between the spammers and the anti-spam community.

3:16I am seeing today in, for example, the financial industry,

3:22a battle between people trying to commit fraud and the people fighting fraud.

3:28And unfortunately, machine learning is used by some of the fraudsters and some of the spammers.

3:35So for goodness sakes, please don't build a machine learning system that has a negative impact on society.

3:42And if you are asked to work on an application that you consider unethical, I urge you to walk away.

3:51For what it's worth, there have been multiple times that I have looked at a project that seemed to be financially sound.

3:57You know, make money for some company, but I have killed the project just on ethical grounds

4:02because I think that even though the financial case was sound, I felt that it makes the world worse off.

4:07And I just don't ever want to be involved in a project like that.

4:11Ethics is a very complicated and very rich subject that humanity has studied for at least a few thousand years.

4:18When AI became more widespread, I actually went and read up multiple books on philosophy and multiple books on ethics

4:27because I was hoping, naively it turned out, to come up with, if only there's a checklist of five things we could do

4:34and so lastly do these five things, then we can be ethical.

4:37But I failed and I don't think anyone has ever managed to come up with a simple checklist of things to do

4:43to give that level of concrete guidance about how to be ethical.

4:47So what I hope to share with you instead is not a checklist because I wasn't able to come up with one,

4:54but just some general guidance and some suggestions for how to make sure that our work is less biased, more fair, and more ethical.

5:02And I hope that some of these guidance, which would be relatively general, will help you with your work as well.

5:08So here are some suggestions for making your work more fair, less biased, and more ethical.

5:16Before deploying a system that could create harm, I will usually try to assemble a diverse team

5:25to brainstorm possible things that might go wrong with an emphasis on possible harm to vulnerable groups.

5:32I found many times in my life that having a more diverse team, and by diverse I mean diversity on multiple dimensions

5:40ranging from gender to ethnicity to culture to many other traits.

5:46I found that having more diverse teams actually causes the team collectively to be better at coming up with ideas about things that might go wrong.

5:55And it increases the odds that we'll recognize a problem and fix it before rolling out the system and having that cause harm to some particular group.

6:06In addition to having a diverse team carry out brainstorming, I have also found it useful to carry out a literature search on any standards or guidelines for your industry or particular application area.

6:19For example, in the financial industry, there are starting to be established standards for what it means to be a system, say one that decides who to approve loans to,

6:30what it means for a system like that to be reasonably fair and free from bias, and those standards that are still emerging in different sectors could inform your work depending on what you're working on.

6:41After identifying possible problems, I found it useful to then audit the system against these identified dimensions of possible harm prior to deployment.

6:55You saw in the last video the full cycle of a machine learning project.

7:00And one key step that's often a crucial line of defense against deploying something problematic is after you've trained the model, but before you deploy it in production,

7:10if the team has brainstormed that it may be biased against certain subgroups, such as certain genders or certain ethnicities,

7:17you can then audit the system to measure the performance to see if it really is biased against certain genders or ethnicities or other subgroups and to make sure that any problems are identified and fixed prior to deployment.

7:33Finally, I found it useful to develop a mitigation plan if applicable, and one simple mitigation plan would be a rollback to the earlier system that we knew was reasonably fair.

7:46And then even after deployment, to continue to monitor harm so that you can then trigger a mitigation plan and act quickly in case there is a problem that needs to be addressed.

7:57For example, all of the good self-driving car teams prior to rolling out self-driving cars on the road had developed mitigation plans for what to do in case the car ever gets involved in an accident,

8:10so that if the car was ever in an accident, there was already a mitigation plan that they could execute immediately rather than have a car get into an accident and then only scramble after the fact to figure out what to do.

8:22I've worked on many machine learning systems, and let me tell you, the issues of ethics, fairness, and bias are issues we should take seriously. It's not something to brush off. It's not something to take lightly.

8:34Now, of course, there are some projects with more serious ethical implications than others.

8:40For example, if I'm building a neural network to decide how long to roast my coffee beans, clearly the ethical implications of that seem significantly less than if, say, you are building a system to decide what bank loans to approve, which, if it's biased, can cause significant harm.

8:57But I hope that all of us collectively working in machine learning can keep on getting better, debate these issues, spot problems, fix them before they cause harm so that we collectively can avoid some of the mistakes that the machine learning world had made before, because this stuff matters, and the systems we build can affect a lot of people.

9:19And so that's it on the process of developing a machine learning system, and congratulations on getting to the end of this week's required videos.

9:30I have just two more optional videos this week for you on addressing skewed datasets, and that means datasets where the ratio of positive to negative examples is very far from 50-50, and it turns out that some special techniques are needed to address machine learning applications like that.

9:48So I hope to see you in the next video, optional video, on how to handle skewed datasets.