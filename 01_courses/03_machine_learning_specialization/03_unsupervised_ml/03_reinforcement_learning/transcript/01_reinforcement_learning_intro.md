0:02Welcome to this final week of the machine learning specialization.

0:05It's a little bit bittersweet for me that we're approaching the end of this specialization,

0:09but I am looking forward to this week sharing with you some exciting ideas about reinforcement learning.

0:15In machine learning, reinforcement learning is one of those ideas that,

0:19while not very widely applied in commercial applications yet today,

0:23is one of the pillars of machine learning and has lots of exciting research backing it up

0:29and improving it every single day.

0:31So let's start by taking a look at what is reinforcement learning.

0:36Let's start with an example.

0:38Here's a picture of an autonomous helicopter.

0:41This is actually the Stanford autonomous helicopter, weighs 32 pounds,

0:44and is actually sitting in my office right now.

0:47Like many other autonomous helicopters, it's instrumented with an onboard computer,

0:52GPS, accelerometers, and gyroscopes, and a magnetic compass,

0:56so it knows where it is at all times quite accurately.

0:59And if I were to give you the keys to this helicopter and ask you to write a program to fly it,

1:05how would you do so?

1:07Radio-controlled helicopters are controlled with joysticks like these,

1:10and so the task is, ten times per second, you're given the position and orientation and speed

1:16and so on of the helicopter, and you have to decide how to move these two control sticks

1:21in order to keep the helicopter balanced in the air.

1:25By the way, I've flown radio-controlled helicopters as well as quad-rotor drones myself,

1:30and radio-controlled helicopters are actually quite a bit harder to fly,

1:33quite a bit harder to keep balance in the air.

1:36So how would you write a program to do this automatically?

1:39Let me show you a fun video of something we got the Stanford autonomous helicopter to do.

1:44Here's a video of it flying under the control of a reinforcement learning algorithm,

1:49and let me play the video.

1:52I was actually the cameraman that day, and this is the helicopter flying under computer control,

1:56and if I zoom out the video, you see the trees under the sky.

2:01So using reinforcement learning, we actually got this helicopter to learn to fly upside down.

2:06We told it to fly upside down.

2:08And so reinforcement learning has been used to get helicopters to fly a wide range of stunts,

2:14or we call them aerobatic maneuvers.

2:17By the way, if you're interested in seeing other videos, you can also check them out at this URL.

2:22So how do you get a helicopter to fly itself using reinforcement learning?

2:28The task is, given the position of the helicopter, to decide how to move the control sticks.

2:35In reinforcement learning, we call the position and orientation and speed and so on of the helicopter the state S,

2:43and so the task is to find a function that maps from the state of the helicopter to an action A,

2:51meaning how far to push the two control sticks in order to keep the helicopter balanced in the air and flying without crashing.

2:59One way you could attempt this problem is to use supervised learning.

3:05It turns out this is not a great approach for autonomous helicopter flying,

3:09but you could say, well, if we could get a bunch of observations of states

3:15and maybe have an expert human pilot tell us what's the best action Y to take,

3:21you could then train a neural network using supervised learning to directly learn the mapping from the states S,

3:28which I'm calling X here, to an action A, which I'm calling the label Y here.

3:34But it turns out that when the helicopter is moving through the air, it's actually very ambiguous what is the exact one right action to take.

3:43Do you tilt a bit to the left or a lot more to the left or increase the helicopter's thrust a little bit or a lot?

3:50It's actually very difficult to get a data set of X and the ideal action Y,

3:56so that's why for a lot of tasks of controlling a robot like a helicopter and other robots,

4:02the supervised learning approach doesn't work well and we instead use reinforcement learning.

4:08Now, a key input to a reinforcement learning is something called the reward or the reward function,

4:16which tells the helicopter when it's doing well and when it's doing poorly.

4:21So the way I like to think of a reward function is a bit like training a dog.

4:27When I was growing up, my family had a dog and it was my job to train the dog or the puppy to behave.

4:34So how do you get a puppy to behave well?

4:36Well, you can't demonstrate that much to the puppy.

4:39Instead, you let it do a thing and whenever it does something good, you go, oh, good dog.

4:45And whenever it did something bad, you go, bad dog.

4:48And then hopefully it learns by itself how to do more of the good dog and fewer of the bad dog things.

4:54So training for reinforcement learning algorithm is like that.

4:57When the helicopter is flying well, you go, oh, good helicopter.

5:00And if it does something bad like crash, you go, bad helicopter.

5:04And then it's a reinforcement learning algorithm's job to figure out how to get more of the good helicopter and fewer of the bad helicopter outcomes.

5:12One way to think of why reinforcement learning is so powerful is you have to tell it what to do rather than how to do it

5:20and specifying the reward function rather than the optimal action gives you a lot more flexibility in how you design the system.

5:28Concretely, for flying the helicopter, whenever it is flying well, you may give it a reward of plus one every second that it's flying well.

5:38And maybe whenever it's flying poorly, you may give it a negative reward.

5:44Or if it ever crashes, you may give it a very large negative reward like negative one thousand.

5:50And so this would incentivize the helicopter to spend a lot more time flying well and hopefully to never crash.

5:57But here's another fun video. I was using the good dog, bad dog analogy for reinforcement learning for many years.

6:06And then one day I actually managed to get my hands on a robotic dog and could actually use this reinforcement learning good dog, bad dog methodology to train a robot dog to get over obstacles.

6:18So this is a video of a robot dog that using reinforcement learning, which rewards it moving toward the left of the screen, has learned how to place his feet carefully or climb over a variety of obstacles.

6:33And if you think about what it takes to program a dog like this, I have no idea. I really don't know how to tell it what's the best way to place his legs to get over a given obstacle.

6:45All of these things were figured out automatically by the robot just by giving it rewards that incentivizes it making progress toward the goal on the left of the screen.

6:57Today, reinforcement learning has been successfully applied to a variety of applications ranging from controlling robots.

7:04And in fact, later this week in the practice lab, you implement for yourself a reinforcement learning algorithm to land a lunar lander in simulation.

7:15It's also been used for factory optimization. How do you rearrange things in the factory to maximize throughput and efficiency as well as financial stock trading?

7:26For example, one of my friends was working on efficient stock execution.

7:31So if you've decided to sell a million shares over the next several days, well, you may not want to dump a million shares on the stock market suddenly because that will move prices against you.

7:41So what's the best way to sequence out your trades over time so that you can sell the shares you want to sell and hopefully get the best possible price for them?

7:51Finally, there have also been many applications of reinforcement learning to playing games, everything from checkers to chess to the card game of bridge to go, as well as for playing many video games.

8:05So that's reinforcement learning. Even though reinforcement learning is not used nearly as much as supervised learning, it is still used in a few applications today.

8:16And the key idea is rather than you needing to tell the algorithm what is the right output Y for every single input, all you have to do instead is specify a reward function that tells it when it's doing well and when it's doing poorly.

8:32And it's the job of the algorithm to automatically figure out how to choose good actions.

8:37With that, let's now go on to the next video where we'll formalize the reinforcement learning problem and also start to develop algorithms for automatically picking good actions.

---
0:02To flesh out the reinforcement learning formalism, instead of looking at something as complicated

0:08as a helicopter or a robot dog, we're going to use a simplified example that's loosely

0:14inspired by the Mars rover.

0:17This is adapted from an example due to Stanford professor Emma Brunskill and one of my collaborators,

0:23Jack Reti-Agarwal, who had actually written code that is actually controlling the Mars

0:28rover right now.

0:29It also helped me talk through and help develop this example.

0:33Let's take a look.

0:34We'll develop reinforcement learning using a simplified example inspired by the Mars

0:42rover. In this application, the rover can be in any of six positions, as shown by the

0:49six boxes here.

0:51And the rover might start off, say, in this position, in the fourth box shown here.

0:58The position of the Mars rover is called the state in reinforcement learning, and I'm going

1:04to call these six states State 1, State 2, State 3, State 4, State 5, and State 6.

1:12And so the rover is starting off in State 4.

1:15Now, the rover was sent to Mars to try to carry out different science missions.

1:21It can go to different places to use its sensors, such as a drill or radar or spectrometer, to

1:29analyze the rock at different places on the planet or go to different places to take

1:34interesting pictures for scientists on Earth to look at.

1:37In this example, State 1, here on the left, has a very interesting surface that scientists

1:43would love for the robot to sample.

1:45And State 6 also has a pretty interesting surface that scientists would quite like the

1:50rover to sample, but not as interesting as State 1.

1:54So we would more like to carry out the science mission at State 1 than at State 6, but

2:02State 1 is further away.

2:04The way we would reflect State 1 being potentially more valuable is through the reward

2:10function. So the reward at State 1 is 100, and the reward at State 6 is 40.

2:19And the rewards at all of the other states in between, I'm going to write as a reward of

2:24zero because there's not as much interesting science to be done at these states 2, 3, 4, and

2:315. On each step, the rover gets to choose one of two actions.

2:36It can either go to the left or it can go to the right.

2:43So the question is, what should the rover do?

2:46In reinforcement learning, we pay a lot of attention to the rewards because that's how we

2:50know if the robot is doing well or poorly.

2:54So let's look at some examples of what might happen if the robot were to go left, starting

3:00from State 4. Then initially, starting from State 4, it will receive a reward of zero.

3:07And after going left, it gets to State 3, where it receives again a reward of zero.

3:13Then it gets to State 2, receives a reward of zero, and finally gets to State 1, where it

3:19receives a reward of 100.

3:22For this application, I'm going to assume that when it gets to either State 1 or State 6,

3:27that the day ends.

3:29And so in reinforcement learning, we sometimes call this a terminal state.

3:35And what that means is that after it gets to one of these terminal states, it gets a reward at

3:40that state, but then nothing more happens after that.

3:43Maybe the robots run out of fuel or run out of time for the day, which is why it only gets to

3:49either enjoy the 100 or the 40 reward.

3:54But then that's it for the day.

3:56And it doesn't get to earn additional rewards after that.

3:59Now, instead of going left, the robot could also choose to go to the right, in which case

4:05from State 4, it would first have a reward of zero, and then it will move right and get to

4:12State 5, have another reward of zero, and then it will get to this other terminal state on the

4:18right, State 6, and get a reward of 40.

4:22But going left and going right aren't the only options.

4:26One thing the robot could do is it could start from State 4 and decide to move to the right.

4:32So it goes from State 4 to 5, gets a reward of zero in State 4, a reward of zero in State 5, and

4:39then maybe it changes its mind and decides to start going to the left as follows, in which case

4:45it would get a reward of zero at State 4, at State 3, at State 2, and then a reward of 100 when it

4:51gets to State 1.

4:53In this sequence of actions and states, the robot is wasting a bit of time.

4:58So this maybe isn't such a great way to take actions, but it is one choice that the algorithm

5:04could pick. But hopefully it won't pick this one.

5:07So to summarize, at every time step, the robot is in some state, which I'm going to call S, and it

5:16gets to choose an action, and it also enjoys some rewards, R of S, that it gets from that state.

5:26And as a result of this action, it gets to some new state, S'.

5:32So as a concrete example, when the robot was in State 4 and it took the action, go left, it

5:39enjoyed, well, maybe didn't enjoy the reward of zero associated with that State 4, and it wound

5:46up in a new state, 3.

5:49When you learn about specific reinforcement learning algorithms, you see that these four

5:54things, the state, action, the reward, and the next state, which is what happens basically

5:59every time you take an action, that this is a core element of what reinforcement learning

6:04algorithms will look at when deciding how to take actions.

6:08And just for clarity, the reward here, R of S, this is a reward associated with this state.

6:15So this reward of zero is associated with the State 4 rather than with the State 3.

6:21So that's the formalism of how a reinforcement learning application works.

6:26In the next video, let's take a look at how we specify exactly what we want the reinforcement

6:32learning algorithm to do.

6:33In particular, we'll talk about an important idea in reinforcement learning called the

6:37return.

6:38Let's go on to the next video to see what that means.

---
0:02You saw in the last video what are the states of a reinforcement learning application, as

0:06well as how depending on the actions you take, you go through different states and also get

0:12to enjoy different rewards.

0:14But how do you know if a particular set of rewards is better or worse than a different

0:19set of rewards?

0:21The return in reinforcement learning, which we'll define in this video, allows us to

0:25capture that.

0:26As we go through this, one analogy that you might find helpful is if you imagine you

0:31have a $5 bill at your feet, you can reach down and pick up, or half an hour across town,

0:37you can walk half an hour and pick up a $10 bill.

0:41Which one would you rather go after?

0:43$10 is much better than $5, but if you need to walk for half an hour to go and get that

0:49$10 bill, then maybe it'd be more convenient to just pick up the $5 bill instead.

0:55The concept of a return captures that rewards you can get quicker are maybe more attractive

1:00than rewards that take you a long time to get to.

1:03Let's take a look at exactly how that works.

1:06Here's a Mars rover example.

1:08If starting from state 4, you go to the left, we saw that the rewards you get would be zero

1:15on the first step from state 4, zero from state 3, zero from state 2, and then 100 at

1:21state 1, the terminal state.

1:24The return is defined as the sum of these rewards, but weighted by one additional factor,

1:32which is called the discount factor.

1:35So the discount factor is a number a little bit less than one.

1:39So let me pick 0.9 as the discount factor.

1:42I'm going to weight the reward on the first step, which is zero.

1:45The reward on the second step is a discount factor, 0.9 times that reward, and then plus

1:52the discount factor squared times that reward, and then plus the discount factor cubed times

1:58that reward.

1:59And if you calculate this out, this turns out to be 0.729 times 100, which is 72.9.

2:09The more general formula for the return is that if your robot goes through some sequence

2:15of states and gets reward R1 on the first step, and R2 on the second step, and R3 on

2:22the third step, and so on, then the return is R1 plus the discount factor gamma, that's

2:32Greek alphabet gamma, which I've set to 0.9 in this example, but gamma times R2 plus gamma

2:39squared times R3 plus gamma cubed times R4, and so on, until you get to the terminal state.

2:48What the discount factor gamma does is it has the effect of making the reinforcement

2:56learning algorithm a little bit impatient, because the return gives full credit to the

3:01first reward, it's 100%, it's 1 times R1, but then it gives a little bit less credit

3:08to the reward you get at the second step, that's multiplied by 0.9, and then even less

3:12credit to the reward you get at the next time step, R3, and so on.

3:17And so getting rewards sooner results in a higher value for the total return.

3:23In many reinforcement learning algorithms, a common choice for the discount factor would

3:27be a number pretty close to 1, like 0.9 or 0.99 or even 0.999, but for illustrative purposes,

3:37in the running example I'm going to use, I'm actually going to use a discount factor

3:41of 0.5, so this very heavily downweights, or very heavily, we say, discounts rewards

3:49in the future, because with every additional passing time step, you get only half as much

3:54credit as rewards that you would have gotten one step earlier, and so if gamma were equal

4:00to 0.5, the return under the example above would have been 0 plus 0.5 times 0, replacing

4:09this equation on top, plus 0.5 squared, 0 plus 0.5 cubed, times 100, that's the last

4:18reward because state 1 is a terminal state, and this turns out to be a return of 12.5.

4:26In financial applications, the discount factor also has a very natural interpretation as

4:32the interest rate, or the time value of money. So if you can have a dollar today, that may

4:39be worth a little bit more than if you could only get a dollar in the future, because if

4:43you get a dollar today, you can put it in the bank, earn some interest, and end up with

4:48a little bit more money a year from now. So for financial applications, often that discount

4:53factor represents how much less is a dollar in the future worth compared to a dollar today.

4:59Let's look at some concrete examples of returns. The return you get depends on the rewards,

5:06and the rewards depend on the actions you take, and so the return depends on the actions

5:12you take. Let's use our usual example, and say for this example, I'm going to always

5:19go to the left. And so, we already saw previously that if the robot were to start off in state

5:274, the return is 12.5, as we worked out on the previous slide. It turns out that if it

5:34were to start off in state 3, the return would be 25, because it gets to the 100 reward one

5:43step sooner, and so it's discounted less. If it were to start off in state 2, the return

5:50would be 50, and if it were to just start off in state 1, well it gets the reward of

5:55100 right away, so it's not discounted at all. And so the return, if it were to start

5:59off in state 1, would be 100, and then the return in these two states are 6.25. It turns

6:06out if you start off in state 6, which is terminal state, you just get the reward, and

6:11thus the return of 40. Now, if you were to take a different set of actions, the returns

6:18would actually be different. For example, if we were to always go to the right, if those

6:25were our actions, then if you were to start in state 4, get a reward of 0, then you get

6:32to state 5, get a reward of 0, and you get to state 6, and get a reward of 40. In this

6:38case, the return would be 0 plus 0.5, the discount factor, times 0 plus 0.5 squared

6:47times 40, and that turns out to be equal to 0.5 squared is one quarter, so one quarter

6:54of 40 is 10. And so the return from this state, from state 4, is 10. If you were to take actions,

7:01always go to the right. And through similar reasoning, the return from this state is 20,

7:07the return from this state is 5, the return from this state is 2.5, and then the return

7:13at the terminal state is 140. By the way, if these numbers don't fully make sense, feel

7:20free to pause the video and double check the math and see if you can convince yourself

7:24that these are the appropriate values for the return for if you start from different

7:29states and if you were to always go to the right. And so we see that if we were to always

7:36go to the right, the return you expect to get is lower for most states. So maybe always

7:43going to the right isn't as good an idea as always going to the left. But it turns out

7:49that we don't have to always go to the left or always go to the right. We could also decide

7:55if you're in state 2, go left. If you're in state 3, go left. If you're in state 4, go

8:01left. But if you're in state 5, then you're so close to this reward, let's go right. So

8:08this would be a different way of choosing actions to take based on what state you're

8:13in. And it turns out that the return you get from the different states will be 100, 50,

8:2225, 12.5, 20, and 40. Just to illustrate one case, if you were to start off in state 5,

8:34here you would go to the right and so the rewards you get would be 0 first in state

8:395 and then 40. And so the return is 0, the first reward, plus the discount factor 0.5

8:47times 40, which is 20, which is why the return from this state is 20 if you take actions

8:53shown here. So to summarize, the return in reinforcement learning is the sum of the rewards

9:00that the system gets but weighted by the discount factor, where rewards in the far future are

9:06weighted by the discount factor raised to a higher power. Now, this actually has an

9:12interesting effect when you have systems with negative rewards. In the example we went through,

9:17all the rewards were 0 or positive. But if there are any rewards that are negative,

9:23then the discount factor actually incentivizes the system to push out the negative rewards as

9:29far into the future as possible. Taking a financial example, if you had to pay someone $10,

9:36that's a negative reward of minus 10. But if you could postpone payment by a few years,

9:43then you're actually better off because $10 a few years from now, because of the interest

9:49rate, is actually worth less than $10 that you had to pay today. So for systems with negative

9:56rewards, it causes the algorithm to try to push out the negative rewards as far into the future

10:02as possible. And for financial applications and for other applications, that actually turns out

10:07to be the right thing for the system to do. You now know what is the return in reinforcement

10:13learning. Let's go on to the next video to formalize the goal of a reinforcement learning algorithm.

---
0:02Let's formalize how a reinforcement learning algorithm takes actions.

0:06In this video, you'll learn about what is a policy in a reinforcement learning algorithm.

0:11Let's take a look.

0:12As we've seen, there are many different ways that you can take actions in a reinforcement learning problem.

0:19For example, we could decide to always go for the nearer reward.

0:25So you go left if this leftmost reward is nearer, or go right if this rightmost reward is nearer.

0:33Another way we could choose actions is to always go for the larger reward.

0:39Or we could always go for the smaller reward.

0:43It doesn't seem like a good idea, but it is another option.

0:47Or you could choose to go left unless you're just one step away from the lesser reward, in which case you go for that one.

0:55In reinforcement learning, our goal is to come up with a function, which is called a policy pi,

1:05whose job it is to take as input any state, S, and map it to some action, A, that it wants us to take.

1:15For example, for this policy here at the bottom, this policy would say that if you're in state 2, then it maps us to the left action.

1:27If you're in state 3, the policy says go left.

1:31If you're in state 4, also go left.

1:34And if you're in state 5, go right.

1:37And so pi applied to state S tells us what action it wants us to take in that state.

1:44And so the goal of reinforcement learning is to find a policy, pi or pi of S, that tells you what action to take in every state so as to maximize the return.

1:57By the way, I don't know if policy is the most descriptive term of what pi is, but it's one of those terms that's become standard in reinforcement learning.

2:08Maybe calling pi a controller rather than a policy would be more natural terminology, but policy is what everyone in reinforcement learning now calls this.

2:19In the last video, we've gone through quite a few concepts in reinforcement learning, from states to actions to rewards to returns to policies.

2:28Let's do a quick review of them in the next video, and then we'll go on to start developing algorithms for finding good policies.

2:35Let's go on to the next video.

---
0:02We've developed a reinforcement learning formalism using the six-state Mars rover example.

0:08Let's do a quick review of the key concepts and also see how this set of concepts can be used for other applications as well.

0:16Some of the concepts we've discussed are states of a reinforcement learning problem, the set of actions, the rewards,

0:26a discount factor, then how rewards and the discount factor are together used to compute the return,

0:32and then finally, a policy whose job it is to help you pick actions so as to maximize the return.

0:39For the Mars rover example, we had six states that we numbered 1 to 6, and the actions were to go left or to go right.

0:48The rewards were 100 for the leftmost state, 40 for the rightmost state, and 0 in between, and I was using a discount factor of 0.5.

0:59The return was given by this formula, and we could have different policies pi that pick actions depending on what state you're in.

1:07This same formalism of states, actions, rewards, and so on can be used for many other applications as well.

1:15Take the problem of flying an autonomous helicopter.

1:18The set of states would be the set of possible positions and orientations and speeds and so on of the helicopter.

1:26The possible actions would be the set of possible ways to move the control stick of the helicopter,

1:33and the rewards may be a plus 1 if it's flying well and a negative 1,000 if it doesn't feel really bad or crashes.

1:41So a reward function that tells you how well the helicopter is flying, the discount factor, a number slightly less than 1, maybe say 0.99,

1:50and then based on the rewards and the discount factor, you compute the return using the same formula,

1:57and the job of reinforcement learning algorithm would be to find some policy pi of s so that given as input the position of the helicopter s,

2:07it tells you what action to take, that is, tells you how to move the control sticks.

2:12Here's one more example. Here's a game-playing one.

2:15Say you want to use reinforcement learning to learn to play chess.

2:18The state of this problem would be the position of all the pieces on the board.

2:24By the way, if you play chess and know the rules well, I know that there's a little bit more information than just the position of the pieces that's important for chess.

2:33I'll simplify it a little bit for this video.

2:36The actions are the possible legal moves in the game, and then a common choice of reward would be if you give your system a reward of plus 1 if it wins a game,

2:47minus 1 if it loses a game, and a reward of 0 if it ties a game.

2:53For chess, usually a discount factor very close to 1 would be used, so maybe 0.99 or even 0.995 or 0.999,

3:04and the return uses the same formula as the other applications.

3:08Once again, the goal is, given a board position, to pick a good action using a policy pie.

3:17This formalism of a reinforcement learning application actually has a name.

3:23It's called a Markov decision process.

3:26I know that sounds like a big, technical, complicated term, but if you ever hear this term Markov decision process, or MDP for short,

3:36that's just the formalism that we've been talking about in the last few videos.

3:40The term Markov in the MDP or Markov decision process refers to that the future only depends on the current state,

3:49and not on anything that might have occurred prior to your getting to the current state.

3:54In other words, in a Markov decision process, the future depends only on where you are now, not on how you got here.

4:02One other way to think of the Markov decision process formalism is that we have a robot or some other agent that we wish to control,

4:15and what we get to do is choose actions A, and based on those actions, something will happen in the world or in the environment,

4:28such as opposition in the world changes, or we get to sample a piece of rock and execute a science mission.

4:34The way we choose the actions A is with a policy pie, and based on what happens in the world, we then get to see, or we observe back,

4:44what state we're in, as well as what rewards are that we get.

4:50And so you sometimes see different authors use a diagram like this to represent the Markov decision process or the MDP formalism,

5:00but this is just another way of illustrating the set of concepts that you learned about in the last few videos.

5:06So, you now know how a reinforcement learning problem works.

5:11In the next video, we'll start to develop an algorithm for picking good actions.

5:16The first step toward that would be to define, and then eventually learn to compute, the state action value function.

5:23This turns out to be one of the key quantities for when we want to develop a learning algorithm.

5:29Let's go on to the next video to see what is this state action value function.