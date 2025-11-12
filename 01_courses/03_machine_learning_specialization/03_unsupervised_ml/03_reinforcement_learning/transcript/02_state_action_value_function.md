0:02When we start to develop reinforcement learning arrows later this week, you see that there's

0:06a key quantity that reinforcement learning arrows will try to compute, and that's called

0:11the state action value function.

0:13Let's take a look at what this function is.

0:16The state action value function is a function typically denoted by the letter uppercase

0:22Q, and it's a function of a state you might be in, as well as the action you might choose

0:30to take in that state.

0:32And Q of S A will give a number that equals the return if you start in that state S and

0:42take the action A just once, and after taking action A once, you then behave optimally after

0:50that.

0:51And after that, you take whatever actions will result in the highest possible return.

0:56Now you might be thinking, there's something a little bit strange about this definition,

1:00because how do we know what is the optimal behavior?

1:03And if we knew what's the optimal behavior, if we already knew what's the best action

1:07to take in every state, why do we still need to compute Q of S A?

1:11Because we already have the optimal policy.

1:13So I do want to acknowledge that there's something a little bit strange about this definition.

1:18There's almost something a little bit circular about this definition, but rest assured when

1:22we look at specific reinforcement learning algorithms later, we'll resolve this slightly

1:27circular definition, and we'll come up with a way to compute the Q function even before

1:33we've come up with the optimal policy, but you see that in a later video, so don't worry

1:38about this for now.

1:39Let's look at an example.

1:41We saw previously that this is a pretty good policy.

1:46Go left from states 2, 3, and 4, and go right from state 5.

1:51It turns out that this is actually the optimal policy for the Mars Rover application when

1:56the discount factor gamma is 0.5.

2:00So Q of S A will be equal to the total return if you start from state S, take the action

2:08A, and then behave optimally after that, meaning take actions according to this policy shown

2:15over here.

2:17Let's figure out what Q of S A is for a few different states.

2:21Let's look at, say, Q of state 2, and what if we take the action to go right?

2:30Well if you're in state 2 and you go right, then you end up at state 3, and then after

2:37that you behave optimally.

2:39You're going to go left from state 3, and then go left from state 2, and then eventually

2:43get the reward of 100.

2:46In this case, the rewards you get would be 0 from state 2, 0 when you get to state 3,

2:520 when you get back to state 2, and then 100 when you finally get to the terminal state

2:591.

3:00And so the return will be 0 plus 0.5 times that plus 0.5 squared times that plus 0.5

3:09cubed times 100, and this turns out to be 12.5.

3:14And so Q of state 2 of going right is equal to 12.5.

3:20Note that this passes no judgment on whether going right is a good idea or not.

3:24It's actually not that good an idea from state 2 to go right, but it just faithfully reports

3:29out the return if you take action A and then behave optimally afterward.

3:35Here's another example.

3:36If you're in state 2 and you were to go left, then the sequence of rewards you get will

3:44be 0 when you're in state 2, followed by 100, and so the return is 0 plus 0.5 times 100,

3:52and that's equal to 50.

3:54In order to write down the values of QSA in this diagram, I'm going to write 12.5 here

4:04on the right to denote that this is Q of state 2 going to the right, and I'm going

4:10to write a little 50 here on the left to denote that this is Q of state 2 going to the left.

4:18Just to take one more example, what if we're in state 4 and we decide to go left?

4:24Well if you're in state 4 and you go left, you get reward 0, and then you take action

4:30left here, so 0 again, take action left here, 0, and then 100, so Q of 4 left results in

4:40rewards 0 because the first action is left, and then because we follow the optimal policy

4:47afterward, you get rewards 0, 0, 100, and so the return is 0 plus 0.5 times that plus

4:550.5 squared times that plus 0.5 cubed times that, which is therefore equal to 12.5.

5:03So Q4 left is 12.5, I'm going to write this here as 12.5.

5:11And it turns out if you were to carry out this exercise for all of the other states

5:15and all of the other actions, you end up with this being the Q of SA for different states

5:23and different actions.

5:25And then finally at the terminal state, well it doesn't matter what you do, you just get

5:29that terminal reward 100 or 40, so I'll just write down those terminal rewards over here.

5:36So this is Q of SA for every state, state 1 through 6, and for the two actions, action

5:42left and action right.

5:45Because the state action value function is almost always denoted by the letter Q, this

5:52is also often called the Q function.

5:56So the terms Q function and state action value function are used interchangeably, and it

6:01tells you what are your returns, or really what is the value, how good is it to take

6:07action A in state S, and then behave optimally after that.

6:11Now it turns out that once you can compute the Q function, this would give you a way

6:17to pick actions as well.

6:19Here's the policy and return, and here are the values Q of SA from the previous slide.

6:26You notice one interesting thing when you look at the different states, which is that

6:31if you take state 2, taking the action left results in a Q value or state action value

6:39of 50, which is actually the best possible return you can get from that state.

6:43In state 3, Q of SA for the action left also gives you that higher return.

6:50In state 4, the action left gives you the return you want, and in state 5, it's actually

6:57the action going to the right that gives you that higher return of 20.

7:03So it turns out that the best possible return from any state S is the largest value of Q

7:11of SA, maximizing over A.

7:13Just to make sure this is clear, what I'm saying is that in state 4, there is Q of state

7:204 left, which is 12.5, and Q of state 4 right, which turns out to be 10, and the larger of

7:31these two values, which is 12.5, is the best possible return from that state 4.

7:38In other words, the highest return you can hope to get from state 4 is 12.5, and it's

7:42actually the larger of these two numbers, 12.5 and 10.

7:46And moreover, if you want your Mars rover to enjoy a return of 12.5 rather than state

7:5310, then the action you should take is the action A that gives you the larger value of

8:00Q of SA.

8:02So the best possible action in state S is the action A that actually maximizes Q of

8:08SA.

8:10So this might give you a hint for why computing Q of SA is an important part of the reinforcement

8:19learning algorithm that we'll build later.

8:22Namely, if you have a way of computing Q of SA for every state and for every action, then

8:29when you're in some state S, all you have to do is look at the different actions A and

8:35pick the action A that maximizes Q of SA.

8:39And some pi of S can just pick the action A that gives the largest value of Q of SA,

8:45and that will turn out to be a good action.

8:47In fact, it'll turn out to be the optimal action.

8:51Another intuition about why this makes sense is Q of SA is returned if you start in state

8:56S and take the action A and then behave optimally after that.

9:01So in order to earn the biggest possible return, what you really want is to take the action

9:07A that results in the biggest total return.

9:13That's why if only we have a way of computing Q of SA for every state, taking the action

9:18A that maximizes the return under these circumstances seems like it's the best action to take in

9:24that state.

9:25Although this isn't something you need to know for this course, I want to mention also

9:29that if you look online or look at the reinforcement learning literature, sometimes you also see

9:36this Q function written as Q star instead of Q, and this Q function is sometimes also

9:42called the optimal Q function.

9:46These terms just refer to the Q function exactly as we've defined it.

9:50So if you look at the reinforcement learning literature and read about Q star or the optimal

9:54Q function, that just means the state action value function that we've been talking about.

9:59But for the purposes of this course, you don't need to worry about this.

10:02So to summarize, if you can compute Q of SA for every state and every action, then that

10:10gives us a good way to compute the optimal policy pi of S.

10:15So that's the state action value function or the Q function.

10:20We'll talk later about how to come up with an algorithm to compute them, despite the

10:25slightly circular aspect of the definition of the Q function.

10:29But first, let's take a look in the next video at some specific examples of what these values

10:33QSA actually look like.

---
0:02Using the Mars Rover example, you've seen what the values of QSA are like.

0:07In order to keep honing our intuition about reinforcement learning problems and how the values of QSA change depending on the problem,

0:17we've provided an optional lab that lets you play around, modify the Mars Rover example, and see for yourself how Q of SA will change.

0:26Let's take a look.

0:27Here's a Jupyter notebook that I hope you play with after watching this video.

0:32I'm going to run these helper functions.

0:35Now, notice here that this specifies the number of states.

0:39There are two actions, so I wouldn't change these.

0:43And this specifies the terminal left and the terminal right rewards, which has been 140.

0:48And then 0 was the reward of the intermediate states.

0:53The discount factor gamma was 0.5, and let's ignore the misstep probability for now.

0:58We'll talk about that in a later video.

1:00And with these values, if you run this code, this will compute and visualize the optimal policy as well as the Q function, Q of SA.

1:13You'll learn later about how to develop a learning algorithm to estimate or compute Q of SA yourself.

1:20So for now, don't worry about what code we have written to compute Q of SA.

1:25But you see that the values here, Q of SA, are the values we saw in the lecture.

1:31Now, here's where the fun starts.

1:33Let's change around some of the values and see how these things change.

1:37I'm going to update the terminal right reward to a much smaller value, say it's only 10.

1:45If I now rerun the code, look at how Q of SA changes.

1:50It now thinks that if you're in state 5, then if you go left and behave optimally, you get 6.25.

1:59Whereas if you go right and behave optimally after that, you get a return of only 5.

2:04So now, when the reward at the right is so small, it's only 10, even when you're so close to it, you'd rather go left all the way.

2:12And in fact, the optimal policy is now to go left from every single state.

2:17Let's make some other changes.

2:19I'm going to change the terminal right reward back to 40.

2:22But let me change the discount factor to 0.9.

2:28With a discount factor that's closer to 1, this makes the Mars rover less impatient.

2:35It's willing to take longer to hold out for a higher reward because rewards in the future are not multiplied by 0.5 to some high power.

2:45It's multiplied by 0.9 to some high power.

2:48And so it's willing to be more patient because rewards in the future are not discounted or multiplied by as small a number as when the discount was 0.5.

3:00So let's rerun the code.

3:02And now you see this is Q of SA for the different states.

3:07And now for state 5, going left actually gives you a higher reward of 65.61 compared to 36.

3:18Notice, by the way, that 36 is 0.9 times this terminal reward of 40.

3:23So these numbers make sense.

3:24But when it's more patient, it's willing to go to the left, even when you're in state 5.

3:29Now, let's change gamma to a much smaller number, like 0.3.

3:34So this very heavily discounts rewards in the future.

3:38This makes it incredibly impatient.

3:40So let me rerun this code.

3:42And now the behavior has changed.

3:45Notice that now in state 4, it's not going to have the patience to go for the larger 100 reward because the discount factor gamma is now so small, it's 0.3.

3:58It would rather go for the reward of 40, even though it's a much smaller reward, it's closer.

4:04And that's what it would choose to do.

4:06So I hope that you can get a sense by playing around with these numbers yourself and running this code, how the values of Q of SA change, as well as how the optimal return, which you notice is the larger of these two numbers, QSA, how that changes, as well as how the optimal policy also changes.

4:29So I hope you go and play with the optional lab and change the reward function and change the discount factor gamma and try different values and see for yourself how the values of Q of SA change, how the optimal return from different states change, and how the optimal policy changes depending on these different values.

4:51And by doing so, I hope that will sharpen your intuition about how these different quantities are affected depending on the rewards and so on in reinforcement learning application.

5:02After you play the lab, we then be ready to come back and talk about what's probably the single most important equation in reinforcement learning, which is something called the Bellman equation.

5:14So I hope you have fun playing with the optional lab, and after that, let's come back to talk about Bellman equations.

---
0:02Let me summarize where we are.

0:04If you can compute the state action value function, Q of S A, then it gives you a way

0:09to pick a good action from every state.

0:12Just pick the action A that gives you the largest value of Q of S A.

0:17So the question is, how do you compute these values, Q of S A?

0:22In reinforcement learning, there's a key equation called the Bellman equation that

0:26will help us to compute the state action value function.

0:29Let's take a look at what is this equation.

0:33As a reminder, this is the definition of Q of S A. As a return, if you start at state

0:39S, take the action A once, and then behave optimally after that.

0:43In order to describe the Bellman equation, I'm going to use the following notation.

0:48I'm going to use S to denote the current state.

0:52Next, I'm going to use R of S to denote the reward of the current state.

0:59So for our low MDP example, we would have that R of 1, state 1, is 100, the reward of

1:06state 2 is 0, and so on, and the reward of state 6 is 40.

1:13I'm going to use the alphabet A to denote the current action, so the action that you

1:19take in the state S. After you take the action A, you get to some new state.

1:25For example, if you're in state 4 and you take the action left, then you get to state

1:313, and so I'm going to use S prime to denote the state you get to after taking that action

1:38A from the current state S. I'm also going to use A prime to denote the action that you

1:44might take in state S prime, the new state that you got to.

1:50The notation convention, by the way, is that S A corresponds to the current state in action,

1:55and when we add the prime, that's the next state and the next action.

2:00The Bellman equation is the following.

2:03It says that Q of S A, that is, the return under this set of assumptions, that's equal

2:12to R of S, so the reward you get for being in that state, plus the discount factor gamma

2:22times max over all possible actions A prime of Q of S prime, the new state you just got

2:30to, and then of A prime.

2:34There's a lot going on in this equation, so let's first take a look at some examples that

2:39we'll come back to see why this equation might make sense.

2:43Let's look at an example.

2:44Let's look at Q of state 2 and action right, and apply Bellman equation to this to see

2:52what value it gives us.

2:55So if the current state is state 2, and if the action is to go right, then the next state

3:03you get to after going right, S prime, would be the state 3.

3:07So the Bellman equation says Q of 2 right is R of S, so this R of state 2, which is

3:18just a reward 0, plus the discount factor gamma, which we've set to 0.5 in this example,

3:26times max of the Q values in state S prime, in state 3.

3:34So this is going to be the max of 25 and 6.25, since this is max over A prime of Q

3:43of S prime, A prime, and this is taking the larger of 25 or 6.25, because those are the

3:52two choices for state 3, and this turns out to be equal to 0 plus 0.5 times 25, which

4:01is equal to 12.5, which fortunately is Q of 2 and then the action right.

4:10Let's look at just one more example.

4:11Let me pick state 4 and see what is Q of state 4 if you decide to go left.

4:19In this case, the current state is 4, current action is to go left, and so the next state,

4:25if you start from 4 and go left, you end up also at state 3.

4:30So S prime is 3 again.

4:32Development equation will say this is equal to R of S, so R of state 4, which is 0, plus

4:400.5, the discount factor gamma, of max over A prime of Q of S prime, that is the state

4:483 again, comma A prime.

4:52So once again, the Q values for state 3 are 25 and 6.25, and the larger of these is 25,

5:00and so this works out to be R of 4 is 0 plus 0.5 times 25, which is again equal to 12.5.

5:10So that's why Q of 4 with the action left is also equal to 12.5.

5:17Just one note, if you're in a terminal state, then development equation simplifies to Q

5:23of S A equals to R of S, because there's no state S prime, and so that second term

5:30would go away, which is why Q of S A in the terminal state is just 100, 100, or 40, 40.

5:37If you wish, feel free to pause the video and apply the development equation to any

5:41other state action in this MDP and check for yourself if this math works out.

5:48Just to recap, this is how we had defined Q of S A, and we saw earlier that the best

5:56possible return from any state S is max over A Q of S A. In fact, just to rename S and

6:04A, it turns out that the best possible return from a state S prime is max over S prime of

6:12A prime.

6:14I didn't really do anything other than rename S S prime and A to A prime, but this will

6:19make some of the intuitions a little bit easier later.

6:22But for any state S prime, like state 3, the best possible return from state 3 is the max

6:28over all possible actions of Q of S prime A prime.

6:32So here again is development equation, and the intuition that this captures is if you're

6:40starting from state S and you're going to take action A and then act optimally after

6:46that, then you're going to see some sequence of rewards over time.

6:51In particular, the return will be computed from the reward at the first step plus gamma

6:59times the reward at the second step plus gamma squared times the reward at the third step

7:04and so on, plus dot, dot, dot, until you get to terminal state.

7:08So what Bellman equation says is this sequence of rewards with the discount factors can be

7:16broken down into two components.

7:18First, this R of S, that's the reward you get right away.

7:25In the reinforcement learning literature, this is sometimes also called the immediate

7:30reward, but that's what R1 is, is the reward you get for starting out in some state S.

7:37The second term then is the following.

7:40After you start in state S and take action A, you get to some new state S prime.

7:47The definition of Q of S A assumes we're going to behave optimally after that.

7:52So after we get to S prime, we're going to behave optimally and get the best possible

7:57return from the state S prime.

8:00And so what this is, max over A prime of Q of S prime A prime, this is the return from

8:08behaving optimally starting from the state S prime.

8:13That's exactly what we had written up here, is the best possible return for when you start

8:20from state S prime.

8:22Another way of phrasing this is, this total return down here is also equal to R1 plus,

8:31and I'm going to factor out gamma in the math, it's gamma times R2 plus, and instead of gamma

8:37squared, it's just gamma times R3 plus gamma squared times R4 plus dot dot dot.

8:45Notice that if you were starting from state S prime, the sequence of rewards you get will

8:51be R2, then R3, then R4, and so on.

8:57And that's why this expression here, that's the total return if you were to start from

9:05state S prime.

9:07And if you were to behave optimally, then this expression should be the best possible

9:12return for starting from state S prime, which is why this sequence of discounted rewards

9:19equals that, max over A prime of Q of S prime A prime, and they were also left over with

9:26this extra discount factor gamma there, which is why Q of S A is also equal to this expression

9:34over here.

9:36In case you think this is quite complicated and you aren't following all the details,

9:40don't worry about it.

9:42So long as you apply this equation, you will manage to get the right results.

9:46But the high-level intuition I hope you take away is that the total return you get in a

9:53reinforcement learning problem has two parts.

9:56The first part is this reward that you get right away, and then the second part is gamma

10:04times the return you get starting from the next state S prime, and as these two components

10:11together, R of S plus gamma times the return from the next state that is equal to the total

10:18return from the current state S. That is the essence of the Bellman equation.

10:24So just to relate this back to our earlier example, Q of 4 left, that's the total return

10:31for starting in state 4 and going left.

10:35So if you were to go left in state 4, the rewards you get are 0 in state 4, 0 in state

10:423, 0 in state 2, and then 100, which is why the total return is this, 0.5 squared plus

10:490.5 cubed, which is 12.5.

10:52And what Bellman equation is saying is that we can break this up into two pieces.

10:56There is this 0, which is R of the state 4, and then plus 0.5 times this other sequence,

11:070 plus 0.5, 0 plus 0.5 squared times 100.

11:14But if you look at what this sequence is, this is really the optimal return from the

11:19next state S prime that you got to after taking the action left from state 4.

11:25So that's why this is equal to the reward 4 plus 0.5 times the optimal return from state

11:343, because if you were to start from state 3, the rewards you get would be 0 followed

11:39by 0 followed by 100.

11:42So this is the optimal return from state 3, and that's why this is just R of 4 plus 0.5

11:50max of A prime Q of state 3 A prime.

11:55I know the Bellman equation is a somewhat complicated equation, breaking down your total

12:00returns into the reward you get right away, the immediate reward, plus gamma times the

12:06returns from the next state S prime.

12:08If it kind of makes sense to you but not fully, it's okay, don't worry about it.

12:13You can still apply Bellman's equations to get a reinforcement learning algorithm to

12:17work correctly.

12:19But I hope that at least a high level intuition of why breaking down the rewards into what

12:24you get right away plus what you get in the future, I hope that makes sense.

12:30Before moving on to develop a reinforcement learning algorithm, we have coming up next

12:34an optional video on stochastic Markov decision processes or on reinforcement learning applications

12:41where the actions that you take can have a slightly random effect.

12:46Take a look at the optional video if you wish, and then after that, we'll start to

12:50develop a reinforcement learning algorithm.