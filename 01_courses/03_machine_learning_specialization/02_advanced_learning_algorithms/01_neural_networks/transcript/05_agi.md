0:02Ever since I was a teenager, starting to play around with neural networks, I always felt

0:06the dream of maybe someday building an AI system that's as intelligent as myself, or

0:12as intelligent as a typical human, that that was one of the most inspiring dreams of AI.

0:17I still hold that dream alive today, but I think that the path to get there is not clear

0:22and could be very difficult, and I don't know whether it'll take us mere decades and whether

0:27we'll see breakthroughs within our lifetimes, or if it may take centuries or even longer

0:32to get there.

0:33But let's take a look at what this AGI, Artificial General Intelligence, dream is like, and speculate

0:41a bit on what might be possible paths, unclear paths, difficult paths, to get there someday.

0:47I think there's been a lot of unnecessary hype about AGI, or Artificial General Intelligence,

0:54and maybe one reason for that is AI actually includes two very different things.

1:01One is ANI, which stands for Artificial Narrow Intelligence.

1:06This is an AI system that does one thing, a narrow task, sometimes really, really well,

1:11and can be incredibly valuable, such as a smart speaker, or self-driving car, or web

1:15search, or AI applied to specific applications, such as farming or factories.

1:22Over the last several years, ANI has made tremendous progress and is creating, as you

1:28know, tremendous value in the world today.

1:31Because ANI is a subset of AI, the rapid progress in ANI makes it logically true that AI has

1:39also made tremendous progress in the last decade.

1:44There's a different idea in AI, which is AGI, Artificial General Intelligence, this hope

1:49of building AI systems that could do anything a typical human can do.

1:55And despite all the progress in ANI, and therefore tremendous progress in AI, I'm not sure how

2:02much progress, if any, we're really making toward AGI.

2:07And I think all the progress in ANI has made people conclude correctly that there's tremendous

2:12progress in AI, but that has caused some people to conclude, I think incorrectly, that a lot

2:19of progress in AI necessarily means that there's a lot of progress toward AGI.

2:25So if you ever are asked about AI and AGI, sometimes you might find drawing this picture

2:32useful for explaining some of the things going on in AI as well, and some of the sources

2:37of unnecessary hype about AGI.

2:42And with the rise of modern deep learning, we started to simulate neurons, and with faster

2:49computers and even GPUs, we could simulate even more neurons.

2:54So I think there was this vague hope many years ago that, boy, if only we could simulate

2:59a lot of neurons, then we could simulate the human brain or something like a human brain

3:04that were really intelligent systems, right?

3:06Sadly, it's turned out not to be quite as simple as that.

3:12I think two reasons for this is, first, if you look at the artificial neural networks

3:19we're building, they are so simple that a logistic regression unit is really nothing

3:24like what any biological neuron is doing.

3:27It's so much simpler than what any neuron in your brain or mine is doing.

3:32And second, even to this day, I think we have almost no idea how the brain works.

3:38There's no fundamental questions about how exactly does a neuron map from inputs to outputs

3:43that we just don't know today.

3:45So trying to simulate that in a computer, much less a single logistic function, is just

3:51so far from an accurate model of what the human brain actually does.

3:56Given our very limited understanding, both now and probably for the near future, of how

4:03the human brain works, I think just trying to simulate the human brain as a path to AGI

4:09will be an incredibly difficult path.

4:13Having said that, is there any hope of, within our lifetimes, seeing breakthroughs in AGI?

4:20Let me share with you some evidence that helps me keep that hope alive, at least for myself.

4:28There have been some fascinating experiments done on animals that show or strongly suggest

4:35that the same piece of biological brain tissue can do a surprisingly wide range of tasks.

4:43And this has led to the one learning algorithm hypothesis that maybe a lot of intelligence

4:49could be due to one or a small handful of learning algorithms.

4:52And if only we could figure out what that one or small handful of algorithms are, we

4:57may be able to implement that in a computer someday.

5:01Let me share with you some details of those experiments.

5:05This is a result due to Ro et al. from many decades ago.

5:10The part of your brain shown here is your auditory cortex, and your brain is wired to

5:16feed signals from your ears in the form of electrical impulses depending on what sound

5:22your ear is detecting to that auditory cortex.

5:26It turns out that if you were to rewire an animal brain to cut the wire between the ear

5:33and the auditory cortex, and instead feed in images to the auditory cortex, then the

5:39auditory cortex learns to see.

5:42Auditory refers to sound, and so this piece of the brain that most people learn to hear,

5:48when it is fed different data, it instead learns to see.

5:52Here's another example.

5:54This part of your brain is your somatosensory cortex.

5:58Somatosensory refers to touch processing.

6:01If you were to similarly rewire the brain to cut the connection from the touch sensors

6:06to that part of the brain, and instead rewire the brain to feed in images, then the somatosensory

6:12cortex learns to see.

6:14So there's been a sequence of experiments like this showing that many different parts

6:19of the brain, just depending on what data it is given, can learn to see, or learn to

6:24feel, or learn to hear, as if there was one, maybe one algorithm that just depending on

6:31what data it is given, learns to process that input accordingly.

6:36There have been systems built which take a camera, maybe mounted to someone's forehead,

6:42and maps it to a pattern of voltages in a grid on someone's tongue.

6:48And by mapping a grayscale image to a pattern of voltages on your tongue, this can help

6:54people that are not sighted, blind individuals, learn to see with your tongue.

7:01Or there have been fascinating experiments with human echolocation, or human sonar.

7:07So animals like dolphins and bats use sonar to see, and researchers have found that if

7:14you train humans to make clicking sounds, and listen to how that bounces off surroundings,

7:22humans can sometimes learn some degree of human echolocation.

7:28Or this is a haptic belt, and my research lab at Stanford once built something like

7:34this before as well, but if you mount a ring of buzzers around your waist, and program

7:41it using a magnetic compass, so that say the buzzers to the northmost direction are always

7:47vibrating slightly, then you somehow gain a direction sense, which some animals have

7:53but humans don't.

7:54Then it just feels like you're walking around and you just know where north is.

7:58It doesn't feel like, oh, that part of my waist is buzzing, it feels like, oh, I know

8:02where that north is.

8:04Or surgery to implant a third eye onto a frog, and the brain just learns to deal with this

8:10input.

8:11There have been a variety of experiments like these, showing that the human brain is amazingly

8:17adaptable.

8:18Neuroscientists say it's amazingly plastic, that just means adaptable, to deal with a

8:23bewildering range of sensory inputs.

8:26And so the question is, if the same piece of brain tissue can learn to see, or touch,

8:32or feel, or even other things, what is the algorithm it uses?

8:36And can we replicate this algorithm and implement it in a computer?

8:40I do feel bad for the frog and other animals on which these experiments were done, although

8:46I think the conclusions are also quite fascinating.

8:50So even to this day, I think working on AGI is one of the most fascinating science and

8:56engineering problems of all time, and maybe you will choose someday to do research on

9:01it.

9:02However, I think it's important to avoid overhyping.

9:07I don't know if the brain is really one or a small handful of algorithms, and even if

9:12it were, I have no idea, and I don't think anyone knows what the algorithm is.

9:17But I still hold this hope alive, and maybe it is, and maybe we could, through a lot of

9:23hard work, someday discover an approximation to it.

9:28I still find this one of the most fascinating topics, and I still often idly think about

9:33it in my spare time.

9:35And maybe someday you will be the one to make a contribution to this problem.

9:41So in the short term, I think even without pursuing AGI, machine learning and neural

9:47networks are a very powerful tool, and even without trying to go all the way to build

9:53human-level intelligence, I think you find neural networks to be an incredibly powerful

9:59and useful set of tools for applications that you might build.

10:04And so that's it for the required videos of this week.

10:08Congratulations on getting to this point in the lessons.

10:12After this, we'll also have a few optional videos to dive a little bit more deeply into

10:17efficient implementations of neural networks.

10:21And in particular, in the optional videos to come, I'd like to share with you some details

10:26of how to implement vectorized implementations of neural networks.

10:30So I hope you also take a look at those videos.
