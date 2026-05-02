# From Vibe Coding to Agentic Engineering — Andrej Karpathy

Transcript of the conference fireside chat with Andrej Karpathy ([@karpathy](https://x.com/karpathy)), AI researcher and founding member of OpenAI, published May 2, 2026.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Video Details

- **Speaker:** Andrej Karpathy (AI researcher, founding member of OpenAI, ex-Tesla AI Director)
- **Format:** Conference fireside chat
- **Published:** May 2, 2026
- **YouTube:** [Watch on YouTube](https://www.youtube.com/watch?v=96jN2OCOfLs)

---

## Transcript

### Introduction

We're so excited for our very first special guest. He has helped build modern AI, then explain modern AI, and then occasionally rename modern AI. He actually helped co-found OpenAI right inside of this office. Was the one who actually got Autopilot working at Tesla back in the day, and he has a rare gift of making the most complex technical shifts feel both accessible and inevitable. You all know him for having coined the term vibe coding last year, but just in the last few months, he said something even more startling. That he's never felt more behind as a programmer. That's where we're starting today. Thank you, Andrej, for joining us.

Yeah. Hello. Excited to be here and to kick us off.

### "Never Felt More Behind as a Programmer"

Okay. So, just a couple months ago, you said that you've never felt more behind as a programmer. That's startling to hear from you of all people. Can you help us unpack that? Was that feeling exhilarating or unsettling?

Yeah, a mixture of both for sure. Well, first of all, as many of you, I've been using agentic tools like Claude Code, adjacent things, for a while, maybe over the last year as it came out and it was very good at chunks of code and sometimes it would mess up and you have to edit them and it was kind of helpful. And then I would say December was this clear point where for me — I was on a break so I had a bit more time. I think many other people were similar — and I just started to notice that with the latest models the chunks just came out fine and then I kept asking for more and it just came out fine and then I can't remember the last time I corrected it. And then I just trusted the system more and more and then I was vibe coding.

So it was a very stark transition. I think that a lot of people actually — I tried to stress this on Twitter, or X — because I think a lot of people experienced AI last year as ChatGPT-adjacent thing. But you really had to look again, and you had to look as of December, because things have changed fundamentally — especially on this agentic coherent workflow that really started to actually work. And so I would say that it was just that realization that really had me go down this whole rabbit hole of just infinity side projects. My side projects folder is extremely full with lots of random things, and just vibe coding all the time. So that kind of happened in December, I would say, and I was looking at the repercussions of that since.

### Software 3.0: The New Computing Paradigm

You've talked a lot about this idea of LLMs as a new computer. That it isn't just better software, it's a whole new computing paradigm. Software 1.0 was explicit rules, software 2.0 was learned weights, software 3.0 is this. If that's actually true, what does a team build differently the day they actually believe this?

Right. So software 1.0, I'm writing code, software 2.0, I'm actually programming by creating data sets and training neural networks. So the programming is kind of like arranging data sets and maybe some objectives and neural network architectures. And then what happened is that basically if you train one of these GPT models or LLMs on a sufficiently large set of tasks — implicitly, because by training on the internet you have to multitask all the things that are in the data set — these actually become kind of like a programmable computer in a certain sense.

So software 3.0 is kind of about your programming now turns to prompting, and what's in the context window is your lever over the interpreter that is the LLM that is interpreting your context and performing computation in the digital information space.

I think there's a few examples of that really drove it home for me. So for example when OpenClaw came out, when you want to install OpenClaw you would expect that normally this is a bash script, like a shell script. So run the shell script to install OpenClaw. But the thing is that in order to target lots of different platforms and lots of different types of computers you might run an OpenClaw, these shell scripts usually balloon up and become extremely complex. But the thing is you're still stuck in a software 1.0 universe of wanting to write the code. And actually the OpenClaw installation is a copy paste of a bunch of text that you're supposed to give to your agent. So basically it's a little skill of "copy paste this and give it to your agent and it will install OpenClaw." And the reason this is a lot more powerful is you're working now in the software 3.0 paradigm where you don't have to precisely spell out all the individual details of that setup. The agent has its own intelligence that it packages up and then it kind of follows the instructions and it looks at your environment, your computer, and it performs intelligent actions to make things work and it debugs things in the loop. It's just so much more powerful. So that's a very different way of thinking about it — what is the piece of text to copy paste to your agent? That's the programming paradigm.

### MenuGen and the "App That Shouldn't Exist"

Now one more example that comes to mind that is even more extreme than that is when I was building MenuGen. So MenuGen is this idea where you come to a restaurant, they give you a menu. There's no pictures usually. So I don't know what any of these things are — usually like 30% of the things I have no idea what they are, 50%. So I wanted to take a photo of the restaurant menu and to get pictures of what those things might look like in a generic sense.

I vibe-coded this app that basically lets you upload a photo and it does all this stuff and it runs on Vercel and it basically rerenders the menu and it gives you all the items and it gives you a picture that it uses an image generator to OCR all the different titles, use the image generator to get pictures of them and then shows it to you.

And then I saw the software 3.0 version of this — which blew my mind — which is literally just take your photo, give it to Gemini and say "use Nanobanana to overlay the things onto the menu." And Nanobanana basically returned an image that is exactly the picture of the menu that I took, but it actually put into the pixels — it rendered the different things in the menu. And this blew my mind because actually all of my MenuGen is spurious. It's working in the old paradigm. That app shouldn't exist.

The software 3.0 paradigm is a lot more raw. Your neural network is doing more and more of the work and your prompt or context is just the image and the output is an image and there's no need to have any of the app in between. So people have to reframe — not to work in the existing paradigm of what things existed and just think about it as a speed up of what exists. New things are available now.

And going back to your programming question, it's not even — I think that's also an example of working in the old mindset because it's not just about programming and programming becoming faster. This is more general information processing that is automatable now. So it's not just even about code. Previous code worked over structured data, right? You write code over structured data. But for example with my LLM knowledge bases project — basically you get LLMs to create wikis for your organization or for you in person — this is not even a program. This is not something that could exist before because there was no code that would create a knowledge base based on a bunch of facts. But now you can just take these documents and basically recompile them in a different way and reorder them and create something that is new and interesting as a reframing of the data. These are new things that weren't possible. So I think this is something that I keep trying to get back to as to not only what can we do that existed that is faster now, but I think there's new opportunities of just things that couldn't be possible before, and I almost think that that's more exciting.

### Extrapolating to 2026 and Beyond

I love the MenuGen progression and dichotomy that you laid out. If you extrapolate that further, what is the 2026 equivalent for building websites in the '90s, building mobile apps in the 2010s, building SaaS in the last cloud era? What will look completely obvious in hindsight that is still mostly unbuilt today?

Going with the example of menu, a lot of this code shouldn't exist and it's just neural network doing most of the work. I do think that the extrapolation looks very weird because you could basically imagine completely neural computers in a certain sense. You feed raw videos — imagine a device that takes raw videos or audio into basically what's a neural net — and uses diffusion to render a UI that is unique for that moment in a certain sense.

I kind of feel like in the early days of computing actually people were a little bit confused as to whether computers would look like calculators or computers would look like neural nets. And in the 50s and 60s it was not really obvious which way would go. And of course we went down the calculator path and ended up building classical computing, and then neural nets are currently running virtualized on existing computers. But I think that a lot of this will flip and that the neural net becomes the host process and the CPUs become the co-processor. So we saw the diagram of intelligence compute of neural networks is going to take over and become the dominant spend of FLOPs. So you could imagine something really weird and foreign where neural nets are doing most of the heavy lifting. They're using tool use as this historical appendage for some kinds of deterministic tasks. But what's really running the show is these neural nets. So you can imagine something extremely foreign as the extrapolation, but I think we're going to probably get there piece by piece.

### Verifiability and Jagged Intelligence

I'd like to talk a little bit about this concept of verifiability — the fact that AI will automate faster and more easily domains where the output can be verified. If that framework is right, what work is about to move much faster than people realize, and what professions do we have that people actually think are safe but that are actually highly verifiable?

So I spent some time writing about verifiability. Basically traditional computers can easily automate what you can specify in code, and this latest round of LLMs can easily automate what you can verify, in a certain sense, because the way this works is that when frontier labs are training these LLMs these are giant reinforcement learning environments. So they are given verification rewards and then because of the way that these models are trained they end up basically progressing and creating these jagged entities that really peak in capability in verifiable domains like math and code and adjacent — and stagnate and are a little bit rough around the edges when things are not in that space.

So the reason I wrote about verifiability is I'm trying to understand why these things are so jagged. Some of it has to do with how the labs train the models, but I think some of it also has to do with the focus of the labs and what they happen to put into the data distribution. Because some things basically are significantly more valuable in economy and end up creating more environments because the labs wanted to work in those settings. So I think code is a good example of that. There's probably lots of verifiable environments they could think about that happen not to make it into the mix because they're just not that useful to have the capability around.

The big mystery — the favorite example for a while was "how many letters are in strawberry," and the models would famously get this wrong, and it's an example of jaggedness. The models now patch this, I think. But the new one is: "I want to go to a car wash to wash my car and it's 50 meters away. Should I drive or should I walk?" And state-of-the-art models today will tell you to walk because it's so close. How is it possible that state-of-the-art Opus 4.7 will simultaneously refactor a 100,000-line codebase, or find zero-day vulnerabilities, and yet tells me to walk to this car wash? This is insane.

To whatever extent these models remain jagged, it's an indication that number one, maybe something's slightly off, or number two, you need to actually be in the loop a little bit and you need to treat them as tools and you do have to stay in touch with what they're doing. So all of my writing long story short about verifiability is just trying to understand why these things are jagged. Is there any pattern to it? And I think it's some kind of a combination of verifiable plus labs care.

Maybe one more anecdote that is instructive: from GPT-3.5 to GPT-4 people noticed that chess improved a lot, and a lot of people thought "oh well it's just a progression of the capabilities" — but actually it's more that a huge amount of data of chess made it into the pre-training set, and just because it's in a data distribution the model improved a lot more than it would just by default. So someone at OpenAI decided to add this data and now you have a capability that just peaked a lot more.

So that's why I'm stressing this dimension of it: as we are slightly at the mercy of whatever the labs are doing, whatever they happen to put into the mix. And you have to actually explore this thing that they give you that has no manual. It works in certain settings, but maybe not in some settings. If you're in the circuits that were part of the RL, you fly. And if you're in the circuits that are out of the data distribution, you're going to struggle and you have to figure out which circuits you're in in your application. And if you're not in the circuits, then you have to really look at fine-tuning and doing some of your own work because it's not going to necessarily come out of the LLM out of the box.

### Advice for Founders

If you are a founder today and thinking about building a company, you are trying to solve a problem that you think is tractable, something that is a domain that is verifiable, but you look around and you think, "Oh my gosh, the labs have really started getting to escape velocity in the ones that seem most obvious — math, coding, and others." What would your advice be to the founders in the audience?

I do think that verifiability makes something tractable in the current paradigm because you can throw a huge amount of RL at it. So one way to see it is that that remains true even if the labs are not focusing on it directly. So if you are in a verifiable setting where you could create these RL environments or examples, then that actually sets you up to potentially do your own fine-tuning and you might benefit from that. That is fundamentally technology that just works. You can pull a lever if you have huge amount of diverse data sets of RL environments, you can use your favorite fine-tuning framework and pull the lever and get something that actually works pretty well.

I do think there are some very valuable reinforcement learning environments that people could think of that I think are not part of the [labs' focus]. I don't want to give away the answer, but there is one domain that I think is very [valuable]. Sorry, I don't mean to vague-post on the stage, but there are some examples of this.

On the flip side, what do you think still feels automatable only from a distance?

I do think that ultimately almost everything can be made verifiable to some extent — some things easier than others. Because even for things like writing or so on, you can imagine having a council of LLM judges and probably get to something reasonable from this kind of approach. So it's more about what's easy or hard. I think ultimately everything is automatable.

### Vibe Coding vs Agentic Engineering

Last year you coined the term vibe coding and today we're in a world that feels a little bit more serious — more agentic engineering. What do you think is the difference between the two and what would you actually call what we're in today?

Yeah. So I would say vibe coding is about raising the floor for everyone in terms of what they can do in software. So the floor rises, everyone can vibe code anything, and that's amazing, incredible. But then I would say agentic engineering is about preserving the quality bar of what existed before in professional software. So you're not allowed to introduce vulnerabilities due to vibe coding. You're still responsible for your software just as before, but can you go faster? And spoiler is: you can. But how do you do that properly? And so to me agentic engineering — when I call it that, because I do think it's an engineering discipline — you have these agents which are these spiky entities. They're a bit fallible, a little bit stochastic, but they are extremely powerful. How do you coordinate them to go faster without sacrificing your quality bar? Doing that well and correctly is the realm of agentic engineering.

So I see them as different — one is about raising the floor and the other is about extrapolating. And what I'm seeing is there is a very high ceiling on agentic engineer capability. People used to talk about the 10x engineer previously — I think that this is magnified a lot more. 10x is not the speed up you gain. It does seem to me like people who are very good at this peak a lot more than 10x from my perspective right now.

### What AI-Native Coding Looks Like

One memorable thing Sam Altman said when he came to AI Engineer last year was that people of different generations use ChatGPT differently. So if you're in your 30s, you use it as a Google search replacement. But if you're in your teens, ChatGPT is your gateway to the internet. What is the parallel here in coding today? If we were to watch two people code using OpenClaw, Claude Code, Codex — one you'd consider mediocre at it and one you would consider fully AI-native — how would you describe the difference?

I think it's just trying to get the most out of the tools that are available — utilizing all of their features, investing into your own setup. So just like previously all the engineers used to basically getting the most out of the tools they use — either it's Vim or VS Code or now it's Claude Code or Codex — investing into your setup and utilizing a lot of the tools that are available to you. I think it just kind of looks like that.

A related thought — a lot of people are maybe hiring for this right now, because they want to hire strong agentic engineers. I do think most people have still not refactored their hiring process for agentic engineer capability. If you're giving out puzzles to solve, this is still the old paradigm. I would say that hiring has to look like: give me a really big project and see someone implement that big project. Like let's write a Twitter clone for agents and then make it really good, make it really secure, and then have some agents simulate some activity on this Twitter, and then I'm going to use 10 Codex 5.4x for X high to try to break your website that you deployed, and they're going to try to break it and they should not be able to break it. So maybe it looks like that. Watching people in that setting, building bigger projects and utilizing the tooling, is maybe what I would look at for the most part.

### Taste, Judgment, and the Human in the Loop

As agents do more, what human skill do you think becomes more valuable, not less?

Right now the answer is that the agents are kind of like these intern entities. So it's remarkable — you basically still have to be in charge of the aesthetics, the judgment, the taste, and a little bit of oversight.

One of my favorite examples of the weirdness of agents is — for MenuGen, you sign up with a Google account but you purchase credits using a Stripe account, and both of them have email addresses. My agent actually tried to, when you purchase credits, it assigned it using the email address from Stripe to the Google email address — like there wasn't a persistent user ID. For people, it was trying to match up the email addresses, but you could use different email address for your Stripe and your Google and basically would not associate the funds. So this is the kind of thing that these agents still will make mistakes about — like why would you use email addresses to try to cross-correlate the funds? They can be arbitrary. You can use different emails. This is such a weird thing to do.

So I think people have to be in charge of this spec, this plan. And I actually don't even like the plan mode. Obviously it's very useful, but I think there's something more general here where you have to work with your agent to design a spec that is very detailed — maybe basically the docs — and then get the agents to write them and you're in charge of the oversight and the top-level categories, but the agents are doing a lot of the under-the-hood. So you're not caring about some of the details.

As an example also with arrays or tensors in neural networks. There's a ton of details between PyTorch and NumPy and all the different — Pandas and so on for all the different little API details. And I already forgot about the keep_dims versus keep_dim, or whether it's `dim` or `axis`, or reshape or permute or transpose. I don't remember this stuff anymore. Because you don't have to. This is the kind of details that are handled by the intern because they have very good recall. But you still have to know, for example, that there's an underlying tensor, there's an underlying view, and then you can manipulate view of the same storage or you can have different storage which would be less efficient. So you still have to have an understanding of what this stuff is doing and some of the fundamentals so that you're not copying memory around unnecessarily and so on. But the details of the APIs are now handed off. So you're in charge of the taste, the engineering, the design — and that it makes sense and that you're asking for the right things. That, OK, these have to be unique user IDs that we're going to tie everything to. So you're doing some of the design and development and the engineers are doing the fill-in-the-blanks. That's currently where we are.

Do you think there's a chance that this taste and judgment matters less over time, or will the ceiling just keep rising?

I'm hoping that it improves. I think probably the reason it doesn't improve right now is, again, it's not part of the RL. There's probably no aesthetics cost or reward, or it's not good enough or something like that. I do think that when you actually look at the code, sometimes I get a little bit of a heart attack because it's not super amazing code necessarily all the time. And it's very bloated and there's a lot of copy paste and there's awkward abstractions that are brittle and it works but it's just really gross. I do hope that this can improve in future models.

A good example also is this microGPT project where I was trying to simplify LLM training to be as simple as possible. The models hate this. They can't do it. I tried to keep prompting an LLM to simplify more, simplify more, and it just can't. You feel like you're outside of the RL circuits. It feels like you're pulling teeth. It's not like light speed. So I do think that people still remain in charge of this. But there's nothing fundamental that's preventing it. It's just the labs haven't done it yet, almost.

### Animals vs Ghosts: Understanding What LLMs Are

So I'd love to come back to this idea of jagged forms of intelligence. You wrote a thought-provoking piece around animals versus ghosts. The idea is that we're not building animals, we are summoning ghosts. And these are jagged forms of intelligence that are shaped by data and reward functions, but not by intrinsic motivation or fun or curiosity or empowerment — things that came about via evolution. Why does that framing matter and what does it actually change about how you build and deploy and evaluate or even trust them?

The reason I wrote about this is because I'm trying to wrap my head around what these things are. Because if you have a good model of what they are or are not, then you're going to be more competent at using them. I'm not sure if it actually has real power. I think it's a little bit of philosophizing. But it's just coming to terms with the fact that these things are not animal intelligences. Like if you yell at them, they're not going to work better or worse — it doesn't have any impact. It's all just statistical simulation circuits where the substrate is pre-training (so statistics) and then there's RL bolting on top, so it kind of increases the dispendages. Maybe it's just a mindset of what I'm coming into, or what's likely to work or not likely to work, or how to modify it. But I don't actually have, here are the five obvious outcomes of how to make your system better. It's more just being suspicious of it and figuring out over time. That's where it starts.

### Agent-Native Infrastructure

Okay, so you are so deep in working with agents that don't just chat — they have real permissions, they have local context, they actually take action on your behalf. What does the world look like when we all start to live in that world?

I think a lot of people probably here are excited about what this agent-native agentic environment looks like. Everything has to be rewritten. Everything is still fundamentally written for humans and has to be moved around. I still use most of the time when I use different frameworks or libraries or things like that, they still have docs that are fundamentally written for humans. This is my favorite pet peeve. Why are people still telling me what to do? I don't want to do anything. What is the thing I should copy paste to my agent? Every time I'm told "go to this URL" or something like that, it's just like ahh.

Everyone is excited about how do we decompose the workloads that need to happen into fundamentally sensors over the world, actuators over the world. How do we make it agent-native? Basically describe it to agents first. And then have a lot of automation around data structures that are very legible to the LLMs.

For MenuGen famously when I wrote the blog post about MenuGen — a lot of the trouble was not even writing the code for MenuGen, it was deploying it in Vercel, because I had to work with all these different services and I had to string them up and I had to go to their settings and the menus and configure my DNS and it was just so annoying. So that's a good example of: I would hope that MenuGen, that I could give a prompt to an LLM "build MenuGen" and then I didn't have to touch anything and it's deployed in that same way on the internet. I think that would be a good test for whether or not a lot of our infrastructure is becoming more and more agent-native.

Ultimately I do think we're going towards a world where there's agent representation for people and for organizations. "I'll have my agent talk to your agent" to figure out some of the details of our meetings or things like that. So I do think that's roughly where things are going.

### Education: Outsource Thinking, Not Understanding

I think we have to end on a question about education. Because you are probably one of the very best in the world at making complex technical concepts simple, and deeply thoughtful about how we design education around it. What still remains worth learning deeply when intelligence gets cheap as we move into the next era of AI?

There was a tweet that blew my mind recently and I keep thinking about it like every other day. It was something along the lines of: **"You can outsource your thinking but you can't outsource your understanding."**

I think that's really nicely put. Because I'm still part of the system and I still have to somehow — information still has to make it into my brain — and I feel like I'm becoming a bottleneck of just even knowing what are we trying to build, why is it worth doing, how do I direct my agents and so on. So I do still think that ultimately something has to direct the thinking and the processing, and that's still fundamentally constrained somehow by understanding.

This is one reason I also was very excited about all the LLM knowledge bases — because I feel like that's a way for me to process information. Anytime I see a different projection onto information I always feel like I gain insight. So it's really just a lot of prompts for me to do synthetic data generation over some fixed data. I really enjoy whenever I read an article — I have my wiki that's being built up from these articles and I love asking questions about things. I think that ultimately these are tools to enhance understanding in a certain way. And this is still kind of a bottleneck because then you can't direct, you can't be a good director if you still — because the LLMs certainly don't excel at understanding, you still are uniquely in charge of that. So tools to that effect, I think, are incredibly interesting and exciting.

I'm excited to be back here in a couple years and to see if we've been fully automated out of the loop and they actually take care of understanding as well. Thank you so much for joining us, Andrej. We really appreciate it.
