0:02Many robotic control applications, including the Lunar Lander application that you work on in the practice lab, have continuous state spaces.

0:11Let's take a look at what that means and how to generalize the concepts we've talked about to these continuous state spaces.

0:18The Simplified Mars Rover example we used had used a discrete set of states.

0:24And what that means is that Simplified Mars Rover could only be in one of six possible positions.

0:32But most robots can be in more than one of six or any discrete number of positions.

0:39Instead, they can be in any of a very large number of continuous value positions.

0:46For example, if the Mars Rover could be anywhere on a line, so its position was indicated by a number ranging from 0 to 6 kilometers,

0:59where any number in between is valid, that would be an example of a continuous state space.

1:06Because the position would be represented by a number, such as that is 2.7 kilometers along or 4.8 kilometers or any other number between 0 and 6.

1:18Let's look at another example. I'm going to use for this example the application of controlling a car or a truck.

1:25Here's a toy car, or actually a toy truck. This one belongs to my daughter.

1:29If you're building a self-driving car or a self-driving truck and you want to control this to drive smoothly,

1:35then the state of this truck might include a few numbers, such as its X position, its Y position, maybe its orientation, what way is it facing.

1:46Assuming the truck stays on the ground, you probably don't need to worry about how tall it is, how high up it is.

1:53The state would include X, Y, and its angle, theta, as well as maybe its speed in the X direction, its speed in the Y direction, and how quickly it is turning.

2:06Is it turning at 1 degree per second, or is it turning at 30 degrees per second, or is it turning really quickly at 90 degrees per second?

2:14For a truck or a car, the state might include not just one number, like how many kilometers it is along this line, but it might include six numbers.

2:26Its X position, its Y position, its orientation, which I'm going to denote using Greek alphabet theta, as well as its velocity in the X direction, which I'm going to denote using X dot.

2:40So that means how quickly is this X coordinate changing, Y dot, how quickly is the Y coordinate changing, and then finally theta dot, which is how quickly is the angle of the car changing.

2:55Whereas for the six-speed Mazda Rover, for example, the state was just one of six possible numbers.

3:01It could be 1, 2, 3, 4, 5, or 6.

3:05For the car, the state would comprise this vector of six numbers, and any of these numbers can take on any value within its valid range.

3:17For example, theta should range between 0 and 360 degrees.

3:23Let's look at another example.

3:25What if you're building a reinforcement learning algorithm to control an autonomous helicopter?

3:31How would you characterize the position of the helicopter?

3:34To illustrate, I have with me here a small toy helicopter.

3:38The position of the helicopter would include its X position, such as how far north or south is the helicopter, its Y position, maybe how far on the east-west axis is the helicopter, and then also Z, the height of the helicopter above ground.

3:55But other than the position, the helicopter also has an orientation.

4:00Conventionally, one way to capture its orientation is with three additional numbers, one of which captures the roll of the helicopter.

4:09Is it rolling to the left or the right?

4:11The pitch, is it pitching forward or pitching up, pitching back?

4:14And then finally, the yaw, which is what's the compass orientation is it facing.

4:20Is it facing north or east or south or west?

4:22So to summarize, the state of the helicopter includes its position in the, say, north-south direction, its position in the east-west direction, Y, its height above ground, and also the roll, the pitch, and also the yaw of the helicopter.

4:42To write this down, the state therefore includes the position, X, Y, Z, and then the roll, pitch, and yaw, denoted with Greek alphabets, Phi, Theta, and Omega.

4:59But to control the helicopter, we also need to know its speed in the X direction, in the Y direction, and in the Z direction, as well as its rate of turning, also called the angular velocity.

5:13So how fast is this roll changing, and how fast is this pitch changing, and how fast is this yaw changing?

5:21So this is actually the state used to control autonomous helicopters.

5:25It's this list of 12 numbers that is input to a policy, and the job of a policy is to look at these 12 numbers and decide what's an appropriate action to take in a helicopter.

5:38So, in a continuous state reinforcement learning problem, or a continuous state Markov decision process, continuous state MDP, the state of the problem isn't just one of a small number of possible discrete values, like a number from 1 to 6.

5:54Instead, it's a vector of numbers, any of which could take any of a large number of values.

6:03In the practice lab for this week, you get to implement for yourself a reinforcement learning algorithm applied to a simulated lunar lander application, landing something on the moon in simulation.

6:16Let's take a look in the next video at what that application entails, since that would be another continuous state application.

---

0:02The Lunar Lander lets you land a simulated vehicle on the moon.

0:06It's like a fun little video game that's been used by a lot of reinforcement learning researchers.

0:12Let's take a look at what it is.

0:14In this application, you're in command of a lunar lander that is rapidly approaching the surface of the moon,

0:21and your job is to fire thrusters at the appropriate times to land it safely on a landing pad.

0:28To give you a sense of what it looks like, this is the lunar lander landing successfully,

0:33and it's firing thrusters downward and to the left and right to position itself to land between these two yellow flags.

0:41Or if the reinforcement learning algorithms policy does not do well,

0:45then this is what it might look like where the lander unfortunately has crashed on the surface of the moon.

0:51In this application, you have four possible actions.

0:56On every time step, you could either do nothing,

1:00in which case the forces of inertia and gravity pull you toward the surface of the moon,

1:05or you can fire a left thruster.

1:09When you see a little red dot come out on the left, that's firing the left thruster,

1:13they'll tend to push the lunar lander to the right,

1:16or you can fire the main engine that's thrusting down the bottom here,

1:22or you can fire the right thruster,

1:25and that's firing the right thruster which will push you to the left.

1:30And your job is to keep on picking actions over time

1:34so as to land the lunar lander safely between these two flags here on the landing pad.

1:41In order to give the actions a shorter name,

1:43I'm sometimes going to call the actions nothing, meaning do nothing,

1:47or left, meaning fire the left thruster,

1:50or main, meaning fire the main engine downward or right.

1:54So I'm going to call the actions nothing, left, main, and right for short later in this video.

1:59How about the state space of this MTP?

2:02The states are its position, x and y,

2:06so how far to the left or right and how high up is it,

2:09as well as velocity, x dot, y dot.

2:13How fast is it moving in the horizontal and vertical directions?

2:16And then also its angle, so how far is the lunar lander tilted to the left or tilted to the right?

2:23Its angular velocity, theta dot.

2:25And then finally, because a small difference in positioning makes a big difference in whether or not it's landed,

2:32we're going to have two other variables in the state vector, which we'll call L and R,

2:39which corresponds to whether the left leg is grounded,

2:42meaning whether or not the left leg is sitting on the ground,

2:45as well as R, which corresponds to whether or not the right leg is sitting on the ground.

2:51So whereas x, y, x dot, y dot, theta, theta dot are numbers,

2:56L and R will be binary valued and can take on only values 0 or 1,

3:02depending on whether the left and right legs are touching the ground.

3:06Finally, here's the reward function for the lunar lander.

3:09If it manages to get to the landing pad, then it receives a reward between 100 and 140,

3:15depending on how well it's flown and gotten to the center of the landing pad.

3:20We also give it an additional reward for moving toward or away from the pad.

3:25So if it moves closer to the pad, it receives a positive reward.

3:29If it moves away and drifts away, it receives a negative reward.

3:33If it crashes, it gets a large negative 100 reward.

3:38If it achieves a soft landing, that is a landing that's not a crash, it gets a plus 100 reward.

3:44For each leg, the left leg or the right leg that it gets grounded, it receives a plus 10 reward.

3:50And finally, to encourage it not to waste too much fuel and fire thrusters unnecessarily,

3:56every time it fires the main engine, we give it a negative 0.3 reward.

4:01And every time it fires the left or the right side thrusters, we give it a negative 0.03 reward.

4:08Notice that this is a moderately complex reward function.

4:12The designers of the lunar lander application actually put some thought into exactly what behavior you want

4:19and codified it in the reward function to incentivize more of the behaviors you want

4:25and fewer of the behaviors, like crashing, that you don't want.

4:30You find when you're building your own reinforcement learning application,

4:34it usually takes some thought to specify exactly what you want or don't want

4:39and to codify that in the reward function.

4:41But specifying the reward function should still turn out to be much easier

4:46than specifying the exact right action to take from every single state,

4:50which is much harder for this and many other reinforcement learning applications.

4:54So, the lunar lander problem is as follows.

4:59Our goal is to learn a policy pi that, when given a state s, as written here,

5:07takes an action a equals pi of s so as to maximize the return, the sum of discounted rewards.

5:18And usually for the lunar lander, we'll use a fairly large value for gamma.

5:23We'll use a value of gamma that's equal to 0.985, so pretty close to 1.

5:29And if you can learn a policy pi that does this, then you successfully land this lunar lander.

5:36Exciting application, and we're now finally ready to develop a learning algorithm

5:41which will turn out to use deep learning on neural networks to come up with a policy to land the lunar lander.

5:48Let's go on to the next video where we'll start to learn about deep reinforcement learning.

---
0:02Let's see how we can use reinforcement learning to control the lunar lander or for other reinforcement learning problems.

0:09The key idea is that we're going to train a neural network to compute or to approximate the state action value function, Q of SA, and that in turn will let us pick good actions.

0:23Let's see how this works.

0:24The heart of the learning algorithm is we're going to train a neural network that inputs the current state and the current action and computes or approximates Q of SA.

0:38In particular, for the lunar lander, we're going to take the state S and any action A and put them together.

0:47Briefly, the state was that list of eight numbers that we saw previously.

0:53So you have X, Y, X dot, Y dot, theta, theta dot, and then L, R for whether the lakes are grounded.

1:02So that's a list of eight numbers to describe the state.

1:06Then finally, we have four possible actions, nothing left, main or main engine, and right.

1:12And we can encode any of those four actions using a one-hot feature vector.

1:18So if action were the first action, we may encode it using 1, 0, 0, 0.

1:26Or if it was the second action to fire the left thruster, we may encode it as 0, 1, 0, 0.

1:33So this list of 12 numbers, eight numbers for the state, and then four numbers, a one-hot encoding of the action is the input we'll have to the neural network.

1:44And I'm going to call this X.

1:47We'll then take these 12 numbers and feed them to a neural network with, say, 64 units in the first hidden layer, 64 units in the second hidden layer, and then a single output in the output layer.

2:00And the job of the neural network is to output Q of S, A, the state action value function for the lunar lander, given the input S and A.

2:11And because we'll be using neural network training algorithms in a little bit, I'm also going to refer to this value, Q of S, A, as the target value, Y, that we'll train the neural network to approximate.

2:25Notice that I did say reinforcement learning is different from supervised learning.

2:30But what we're going to do is not input a state and have it output an action.

2:35What we're going to do is input a state-action pair and have it try to output Q of S, A.

2:42And using a neural network inside the reinforcement learning algorithm this way will turn out to work pretty well.

2:48We'll see the details in a little bit.

2:51So don't worry about it if it doesn't make sense yet.

2:54But if you can train a neural network with appropriate choices of parameters in the hidden layers and in the output layer to give you good estimates of Q of S, A,

3:05then whenever your lunar lander is in some state, S, you can then use the neural network to compute Q of S, A for all four actions.

3:17You can compute Q of S, nothing, Q of S, left, Q of S, main, Q of S, right.

3:22And then finally, whichever of these has the highest value, you would pick the corresponding action, A.

3:30So for example, if out of these four values, Q of S, main is largest, then you would decide to go and fire the main engine of the lunar lander.

3:41So the question becomes, how do you train a neural network to output Q of S, A?

3:48It turns out the approach will be to use Bellman's equations to create a training set with lots of examples, X and Y,

3:57and then we'll use supervised learning, exactly as you learned in the second course when we talked about neural networks,

4:04to learn, using supervised learning, a mapping from X to Y.

4:09That is a mapping from the state action pair to this target value, Q of S, A.

4:15But how do you get a training set with values for X and Y that you can then train a neural network on?

4:23Let's take a look.

4:24So here's the Bellman equation, Q of S, A equals R of S plus gamma, max of A prime, Q of S prime, A prime.

4:32So the right-hand side is what you want Q of S, A to be equal to.

4:38So I'm going to call this value on the right-hand side, Y.

4:42And the input to the neural network is a state and an action, so I'm going to call that X.

4:49And the job of a neural network is to input X, that is, input a state-action pair,

4:55and try to accurately predict what will be the value on the right.

5:01So in supervised learning, we were training a neural network to learn a function, F,

5:07which depends on a bunch of parameters, W and B, the parameters of the various layers of the neural network.

5:13And it was the job of the neural network to input X and hopefully output something close to the target value, Y.

5:25So the question is, how can we come up with a training set with values X and Y for a neural network to learn from?

5:36Here's what we're going to do.

5:37We're going to use the lunar lander and just try taking different actions in it.

5:43If we don't have a good policy yet, we'll take actions randomly,

5:47fire the left thruster, fire the right thruster, fire the main engine, do nothing.

5:52And by just trying out different things in the lunar lander simulator,

5:58we'll observe a lot of examples of when we're in some state and we took some action,

6:04maybe a good action, maybe a terrible action, either way.

6:07And then we got some rewards, R of S, for being in that state.

6:12And as a result of our action, we got to some new state, S prime.

6:18As you take different actions in the lunar lander, you see these S, A, R of S, S prime,

6:24and we call them tuples in Python code, many times.

6:28For example, maybe one time you're in some state, S, and just to give this an index,

6:33I'm going to call this S1.

6:35And you happen to take some action, A1.

6:38This could be nothing, left, main thruster, or right.

6:41As a result of which, you got some reward, and you wound up at some state, S prime 1.

6:48And maybe a different time, you're in some other state, S2.

6:51You took some other action, could be a good action, could be a bad action,

6:55could be any of the four actions, and you got the reward,

6:59and then you wound up with S prime 2, and so on, multiple times.

7:04And maybe you've done this 10,000 times, or even more than 10,000 times.

7:08So you would have to save the way with not just S1, A1, and so on, but up to S10,000, A10,000.

7:16It turns out that each of these lists of four elements, each of these tuples,

7:22will be enough to create a single training example, X1, Y1.

7:29In particular, here's how you do it.

7:31There are four elements in this first tuple.

7:34The first two will be used to compute X1, and the second two will be used to compute Y1.

7:42In particular, X1 is just going to be S1, A1 put together.

7:51S1 would be eight numbers, the state of the lunar lander.

7:55A1 would be four numbers, the one-hot encoding of whatever action this was.

8:00And Y1 would be computed using the right-hand side of the Bellman equation.

8:05In particular, the Bellman equation says when you input S1, A1,

8:11you want Q of S1, A1 to be this right-hand side,

8:16to be equal to R of S1 plus gamma max over A prime of Q of S1 prime A prime.

8:28And notice that these two elements of the tuple on the right give you enough information to compute this.

8:35You know what is R of S1, that's the reward you've saved away here,

8:40plus the discount factor gamma times max over all actions A prime of Q of S prime 1.

8:47That's the state you got to in this example.

8:50And then take the max over all possible actions A prime.

8:53And so I'm going to call this Y1.

8:57And when you compute this, this will be some number like 12.5 or 17 or 0.5 or some other number.

9:06And we'll save that number here as Y1 so that this pair, X1, Y1,

9:13becomes the first trading example in this little data set we're computing.

9:18Now, you may be wondering, wait, where does Q of S prime A prime or Q of S prime 1 A prime come from?

9:27Well, initially we don't know what is the Q function.

9:31But it turns out that when you don't know what is the Q function,

9:34you can start off with taking a totally random guess of what is the Q function.

9:38And we'll see on the next slide that the algorithm will work nonetheless.

9:43But in every step, Q here is just going to be some guess.

9:48They'll get better over time, it turns out, of what is the actual Q function.

9:52Let's look at a second example.

9:54If you had a second experience where you're in state S2, took action A2, got that reward, and then got to that state,

10:01then we would create a second trading example in this data set, X2, where the input is now S2, A2.

10:10So the first two elements go to computing the input X.

10:14And then Y2 will be equal to R of S2 plus gamma max over A prime Q of S prime 2 A prime.

10:28And whatever this number is, Y2, we put this over here in our small but growing training set.

10:35And so on and so forth, until maybe you end up with 10,000 training examples with these X, Y pairs.

10:46And what we'll see later is that we'll actually take this training set where the Xs are inputs with 12 features,

10:55and the Ys are just numbers, and we'll train a neural network with, say,

11:01the mean squared error loss to try to predict Y as a function of the input X.

11:08So what I describe here is just one piece of the learning algorithm we'll use.

11:14Let's put it all together on the next slide and see how it all comes together into a single algorithm.

11:19So let's take a look at what the full algorithm for learning the Q function is like.

11:25First, we're going to take our neural network and initialize all the parameters of the neural network randomly.

11:32Initially, we have no idea what is the Q function, so let's just pick totally random values of the weights,

11:38and we'll pretend that this neural network is our initial random guess for the Q function.

11:44This is a little bit like when you are training linear regression,

11:48and you initialize all the parameters randomly and then use gradient descent to improve the parameters.

11:54Initializing randomly for now is fine.

11:57What's important is whether the algorithm can slowly improve the parameters to get to a better estimate.

12:03Next, we will repeatedly do the following.

12:06We will take actions in the lunar lander.

12:09So fly it around randomly, take some good actions, take some bad actions, it's okay either way.

12:14But you get lots of these tuples of when it was in some state, you took some action A, got a reward R of S, and you got to some state S'.

12:23And what we will do is score the 10,000 most recent examples of these tuples.

12:30As you run this algorithm, you will see many, many steps in the lunar lander, maybe hundreds of thousands of steps.

12:39But to make sure we don't end up using excessive computer memory,

12:43common practice is to just remember the 10,000 most recent such tuples that we saw taking actions in the NTP.

12:52This technique of storing the most recent examples only is sometimes called the replay buffer in a reinforcement learning algorithm.

13:02So for now, we're just flying the lunar lander randomly, sometimes crashing, sometimes not.

13:08And getting these tuples as experience for our learning algorithm.

13:13Occasionally then, we will train the neural network.

13:17In order to train the neural network, here's what we'll do.

13:21We'll look at these 10,000 most recent tuples we have saved and create a training set of 10,000 examples.

13:30So the training set needs lots of pairs of X and Y.

13:33And for our training examples, X will be the SA from this part of the tuple.

13:41So it will be a list of 12 numbers.

13:43The 8 numbers for the state and the 4 numbers for the one-hot encoding of the action.

13:47And the target value that we want the neural network to try to predict will be Y equals R of S plus gamma max of A' Q of S' A'.

14:00How do we get this value of Q?

14:02Well, initially, it is this neural network that we have randomly initialized.

14:06So it may not be a very good guess, but it's a guess.

14:09After creating these 10,000 training examples, we'll have training examples X1, Y1 through X 10,000, Y 10,000.

14:21And so we'll train a neural network, and I'm going to call the new neural network Q new, such that Q new of S A learns to approximate Y.

14:33So this is exactly training that neural network to output F with parameters W and B to input X to try to approximate the target value Y.

14:45Now, this neural network should be a slightly better estimate of what the Q function or the state action value function should be.

14:54And so what we'll do is we're going to take Q and set it to this new neural network that we had just learned.

15:02Many of the ideas in this algorithm are due to Min et al.

15:07And it turns out that if you run this algorithm where you start with a really random guess of the Q function,

15:14then use Bellman's equations to repeatedly try to improve the estimates of the Q function,

15:20then by doing this over and over, taking lots of actions, training a model, that will improve your guess for the Q function.

15:28And so for the next model you train, you now have a slightly better estimate of what is the Q function.

15:34And then the next model you train will be even better.

15:37And when you update Q equals Q new, then for the next time you train a model, Q of S prime A prime will be an even better estimate.

15:45And so as you run this algorithm on every iteration, Q of S prime A prime hopefully becomes an even better estimate of the Q function.

15:55So that when you run the algorithm long enough, this will actually become a pretty good estimate of the true value of Q of S A,

16:04so that you can then use this to pick hopefully good actions for the MTP.

16:09The algorithm you just saw is sometimes called the DQN algorithm, which stands for Deep Q Network,

16:16because you're using deep learning, a neural network, to train a model to learn the Q function.

16:23So hence DQN or Deep Q Network, DQ using a neural network.

16:28And if you use the algorithm as I described it, it will kind of work okay on the lunar lander.

16:35Maybe it will take a long time to converge, maybe it won't land perfectly, but it will sort of work.

16:40But it turns out that with a couple of refinements to the algorithm, it can work much better.

16:45So in the next few videos, let's take a look at some refinements to the algorithm that you just saw.

---
0:02In the last video, we saw a neural network architecture that would input the state and

0:07action and attempt to output the Q function, Q of S A. It turns out that there's a change

0:14to neural network architecture that makes this algorithm much more efficient. So most

0:19implementations of DQN actually use this more efficient architecture that we'll see in

0:24this video. Let's take a look.

0:27This is the neural network architecture we saw previously, where it would input 12 numbers

0:33and output Q of S A. Whenever we are in some state S, we would have to carry out inference

0:41in the neural network separately four times to compute these four values so as to pick

0:47the action A that gives us the largest Q value. This is inefficient because we have to carry

0:54out inference four times from every single state. Instead, it turns out to be more efficient

1:01to train a single neural network to output all four of these values simultaneously.

1:09This is what it looks like. Here's a modified neural network architecture where the input

1:14is eight numbers corresponding to the state of the lunar lander. It then goes through

1:21the neural network with 64 units in the first hidden layer, 64 units in the second hidden

1:26layer, and now the output unit has four output units. The job of the neural network is to

1:34have the four output units output Q of S nothing, Q of S left, Q of S main, and Q of S right.

1:44The job of the neural network is to compute simultaneously the Q value for all four possible

1:50actions for when we are in the state S. This turns out to be more efficient because given

1:57the state S, we can run inference just once and get all four of these values and then

2:04very quickly pick the action A that maximizes Q of S A. You notice also in Bellman's equations

2:12there's a step in which we have to compute max over A prime Q of S prime A prime. This

2:19is multiplied by gamma and then there's plus R of S up here. This neural network also makes

2:25it much more efficient to compute this because we're getting Q of S prime A prime for all

2:31actions A prime at the same time. So you then just pick the max to compute this value for

2:37the right hand side of Bellman's equations. This change to the neural network architecture

2:41makes the algorithm much more efficient and so we will be using this architecture in the

2:46practice lab. Next, there's one other idea that will help the algorithm a lot which is

2:52something called an epsilon greedy policy which affects how you choose actions even

2:56when you're still learning. Let's take a look at the next video at what that means.

---
0:02In the learning algorithm that we developed, even while you're still learning how to approximate

0:08QFSA, you need to take some actions in the lunar lander.

0:13So how do you pick those actions while you're still learning?

0:17The most common way to do so is to use something called an epsilon greedy policy.

0:22Let's take a look at how that works.

0:24Here's the algorithm that you saw earlier.

0:27One of the steps in the algorithm is to take actions in the lunar lander.

0:33So when the learning algorithm is still running, we don't really know what's the best action

0:38to take in every state.

0:39If we did, we'd already be done learning.

0:42But even while we're still learning and don't have a very good estimate of QFSA yet, how

0:48do we take actions in this step of the learning algorithm?

0:52Let's look at some options.

0:54When you're in some state S, we might not want to take actions totally at random because

1:00that will often be a bad action.

1:04So one natural option would be to pick, whenever in state S, pick an action A that maximizes

1:12QFSA.

1:14So we may say, even if QFSA is not a great estimate of the Q function, let's just do

1:20our best and use our current guess of QFSA and pick the action A that maximizes it.

1:27It turns out this may work okay, but isn't the best option.

1:32Instead, here's what is commonly done.

1:36Here's option two, which is most of the time, let's say with probability 0.95, pick the

1:42action that maximizes QFSA.

1:47So most of the time, we'll try to pick a good action using our current guess of QFSA.

1:52But a small fraction of the time, let's say 5% of the time, we'll pick an action A randomly.

1:59Why do we want to occasionally pick an action randomly?

2:02Well, here's why.

2:04Suppose for some strange reason that QFSA was initialized randomly so that the learning

2:11algorithm thinks that firing the main thruster is never a good idea.

2:15Maybe the neural network parameters were initialized so that Q of S main is always

2:24very low.

2:25If that's the case, then the neural network, because it's trying to pick the action A that

2:30maximizes QFSA, it will never, ever try firing the main thruster.

2:35And because it never, ever tries firing the main thruster, it will never learn that firing

2:41the main thruster is actually sometimes a good idea.

2:44So because of the random initialization, if the neural network somehow initially gets

2:50stuck in its mind that something's a bad idea, just by chance, then option one means that

2:57it will never try out those actions and discover that maybe it's actually a good idea to take

3:03that action, like fire the main thruster sometimes.

3:06So under option two, on every step, we have some small probability of trying out different

3:12actions so that the neural network can learn to overcome its own possible preconceptions

3:20about what might be a bad idea that turns out not to be the case.

3:24This idea of picking actions randomly is sometimes called an exploration step because we're going

3:32to try out something that may not be the best idea, but we're going to just try out some

3:37action in some circumstance to explore and learn more about an action in a circumstance

3:42where we may not have had as much experience before.

3:46Taking an action that maximizes QFSA, sometimes this is called a greedy action because we're

3:54trying to actually maximize our return by picking this.

4:00Or in the reinforcement learning literature, sometimes you also hear this as an exploitation

4:06step.

4:07I know that exploitation is not a good thing.

4:10Nobody should ever exploit anyone else.

4:13But historically, this was the term used in reinforcement learning to say, let's exploit

4:18everything we've learned to do the best we can.

4:20So in the reinforcement learning literature, sometimes you hear people talk about the exploration

4:26versus exploitation trade-off, which refers to how often do you take actions randomly

4:31or take actions that may not be the best in order to learn more versus trying to maximize

4:38your return by, say, taking the action that maximizes QFSA.

4:43This approach, that is option two, has a name, is called an epsilon greedy policy, where

4:51here epsilon is 0.05, is the probability of picking an action randomly.

4:59This is the most common way to make your reinforcement learning algorithm explore a little bit, even

5:07while it's occasionally or maybe most of the time taking greedy actions.

5:12By the way, a lot of people have commented that the name epsilon greedy policy is confusing

5:17because you're actually being greedy 95% of the time, not 5% of the time.

5:23So maybe 1 minus epsilon greedy policy, because it's 95% greedy, 5% exploring, that's actually

5:30a more accurate description of the algorithm.

5:33But for historical reasons, the name epsilon greedy policy is what has stuck.

5:38And so this is the name that people use to refer to the policy that explores actually

5:44epsilon fraction of the time rather than is greedy epsilon fraction of the time.

5:50Lastly, one of the tricks that's sometimes used in reinforcement learning is to start

5:54off epsilon high.

5:56So initially, you are taking random actions a lot of the time and then gradually decrease

6:04it so that over time, you are less likely to take actions randomly and more likely to

6:11use your improving estimates of the Q function to pick good actions.

6:17For example, in the lunar lander exercise, you might start off with epsilon very, very

6:23high, maybe even epsilon equals 1.0.

6:26So you're just picking actions completely at random initially and then gradually decrease

6:30it all the way down to say 0.01 so that eventually you're taking greedy actions 99% of the time

6:39and acting randomly only a very small 1% of the time.

6:44If this seems complicated, don't worry about it.

6:46We'll provide the code in the practice lab, in the juvenile lab that shows you how to

6:51do this.

6:53If you were to implement the algorithm as we've described it with the more efficient

6:57neural network architecture and with an epsilon greedy exploration policy, you'll find that

7:03it'll work pretty well on the lunar lander.

7:07One of the things that I've noticed for reinforcement learning algorithm is that compared to supervised

7:12learning, they're more finicky in terms of the choice of hyperparameters.

7:16So for example, in supervised learning, if you set the learning rate a little bit too

7:22small, then maybe the algorithm will take longer to learn.

7:25Maybe it takes three times as long to train, which is annoying, but maybe not that bad.

7:31Whereas in reinforcement learning, find that if you set the value of epsilon not quite

7:36as well or set other parameters not quite as well, it doesn't take three times as long

7:41to learn.

7:42It may take 10 times or a hundred times as long to learn.

7:45And so reinforcement learning algorithms, I think because they're less mature than supervised

7:51learning algorithms, are much more finicky to lower choices of parameters like that.

7:56And it actually sometimes is frankly more frustrating to tune these parameters for reinforcement

8:02learning algorithm compared to a supervised learning algorithm.

8:07But again, if you're worried about the practice lab, the program exercise, we'll give you

8:12a sense of good parameters to use in the program exercise so that you should be able to do

8:16that and successfully land the lunar lander, hopefully without too many problems.

8:22In the next optional video, I want to describe a couple more algorithm refinements, mini

8:28batching, and also using soft updates.

8:32If you're new about these additional refinements, the algorithm will work okay, but these are

8:36additional refinements that make the algorithm run much faster.

8:41And it's okay if you skip this video, we've provided everything you need in the practice

8:45lab to hopefully successfully complete it.

8:48But if you're interested in learning about more of these details of tuning reinforcement

8:52learning algorithms, then come with me and let's see in the next video, mini batching

8:57and soft updates.

---

0:02Reinforcement learning is an exciting set of technologies.

0:06In fact, when I was working on my PhD thesis, reinforcement learning was the subject of my thesis.

0:12So I was and still am excited about these ideas.

0:16Despite all the research momentum and excitement behind reinforcement learning, though,

0:21I think there is a bit, or maybe sometimes a lot, of hype around it.

0:26So what I hope to do is share with you a practical sense of where reinforcement learning is today,

0:32in terms of its utility for applications.

0:36One of the reasons for some of the hype about reinforcement learning is, it turns out,

0:41many of the research publications have been on simulated environments.

0:46And having worked in both simulations and on real robots myself,

0:50I can tell you that it's much easier to get a reinforcement learning algorithm to work in a simulation

0:56or in a video game than in a real robot.

1:00So a lot of developers have commented that even after they got it to work in simulation,

1:06it turned out to be surprisingly challenging to get something to work in the real world or in a real robot.

1:13And so if you apply these algorithms to a real application,

1:17this is one limitation that I hope you pay attention to, to make sure what you do does work on the real application.

1:24Second, despite all the media coverage about reinforcement learning,

1:28today there are far fewer applications of reinforcement learning than supervised and unsupervised learning.

1:34So if you are building a practical application, the odds that you will find supervised learning or unsupervised learning useful,

1:42or the right tool for the job, is much higher than the odds that you will end up using reinforcement learning.

1:48I have used reinforcement learning a few times myself, especially on robotic control applications.

1:54But in my day-to-day applied work, I end up using supervised and unsupervised learning much more.

2:00There is a lot of exciting research in reinforcement learning right now.

2:04And I think the potential of reinforcement learning for future applications is very large.

2:10And reinforcement learning still remains one of the major pillars of machine learning.

2:15And so having it as a framework as you develop your own machine learning algorithms,

2:21I hope will make you more effective at building working machine learning systems as well.

2:27So I hope you've enjoyed this week's materials on reinforcement learning.

2:32And specifically, I hope you have fun getting the Lunar Lander to land for yourself.

2:37I hope it will be a satisfying experience when you implement an algorithm

2:41and then see that Lunar Lander land safely on the moon because of code that you wrote.

2:47That brings us toward the end of this specialization.

2:51Let's go on to the last video where we'll wrap up.