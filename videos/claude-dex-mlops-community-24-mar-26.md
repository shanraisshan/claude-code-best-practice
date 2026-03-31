# Everything We Got Wrong About Research-Plan-Implement — MLOps Community

Transcript of the talk by Dexter Horthy ([@daborhey](https://x.com/daborhey)), co-founder of HumanLayer, at MLOps Community, published March 24, 2026.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Video Details

- **Speaker:** Dexter Horthy (Co-founder, HumanLayer)
- **Host:** Demetrios (MLOps Community)
- **Published:** March 24, 2026
- **YouTube:** [Watch on YouTube](https://youtu.be/YwZR6tc7qYg)

---

## Transcript

[`0:04`](https://youtu.be/YwZR6tc7qYg?t=4) All right. Before I bring up Dex, I gotta say I met James. And James Yeah. Can you stand up real fast? James told me this morning that he is going — We can't see the QR code. You got to hit it up. He's going to be having dinner tonight and everybody's invited. So, if you want to go, just scan that QR code real fast and go hang out with James. That's awesome. And that's what we're going for here. That is great.

[`0:33`](https://youtu.be/YwZR6tc7qYg?t=33) Yeah, you rock. Yeah, that's I like it. I like it, too. Okay, so I'm gonna bring up Dex. Uh earlier somebody said we need to have a mustache competition. I don't think that's going to happen, but I will say that he gave us 200 slides that he's about to present.

[`0:48`](https://youtu.be/YwZR6tc7qYg?t=48) Whoa, whoa. 158. 158. We're going to keep him honest on the timing. All right, so let it start now everybody.

[`0:57`](https://youtu.be/YwZR6tc7qYg?t=57) Let's do it. What's up everybody? I am Dex. Uh this is a talk with a very long title that I'm not going to read because we're on the clock now. Uh I have been talking about coding agents for quite a while. Basically since like August um we did a long talk in November. Um there's this methodology that we've been talking about a lot uh called research plan implement. Um a lot of up votes on hackernews. There's probably 10,000 people who have gone to our open source and grabbed our prompts and are using them internally from small startups up to the enterprise.

[`1:29`](https://youtu.be/YwZR6tc7qYg?t=89) Um it all started with this guy. Um this guy has anyone seen this talk? Yes. Okay. So Eigor went in and he said like okay cool we're using a lot of tokens we're spending a lot of money to get AI developer productivity. But what he found was that it actually tends to lead to a lot of rework. Like you are shipping 50% more but half of that is just cleaning up the slop from last week. And the other thing they found, and these are last year's numbers, so this does not account for opus 4.5. So I would inflate this a little bit, but like it's great for low complexity green field tasks, not great for high complexity brownfield tasks.

[`2:02`](https://youtu.be/YwZR6tc7qYg?t=122) Um, and so I could give you a talk about RPI and why it's great. Uh, but that would be boring. And there's other talks, so if you haven't seen them, go watch them. It'll give more context. But, uh, I'm going to tell you everything we got wrong about RPI today. Um, we thought we had this AI thing figured out. I, uh, am humble enough to admit when I was wrong.

[`2:22`](https://youtu.be/YwZR6tc7qYg?t=142) Uh, so we got a couple things wrong. Uh, one thing that's very relevant if you've been on Twitter today is, uh, I don't think it's okay to not read the code. Uh, I also don't think you should read really long plan files. Uh, those two are related. Uh, and no, Cloud should not be allowed to — if you're writing production code that is used by users and you're going to get paged at 3 a.m. if it's broken. Uh, no slop. This is the year 2026. No more slop.

[`2:46`](https://youtu.be/YwZR6tc7qYg?t=166) So, we're all on this journey. We're all figuring this out. We all are wrong all the time. We did get a couple things right. Uh there is no magic prompt. Uh do not outsource the thinking. You the engineer are an important part of this process and seek leverage. There's a lot of code being written. Find ways to make sure it's correct without having to read all of it and resteer after the fact.

[`3:05`](https://youtu.be/YwZR6tc7qYg?t=185) Um so, lots of people I'm sure have heard of research plan implement. Has anyone actually run this claude command? Research codebase? Okay, cool. Leave your hand up if you've run it like this. Tell me how this system works. Has anyone run it like this of like, "Hey, I want to build this thing. Go do the research." Okay. Um or maybe go fetch a ticket or something. What about the create plan prompt? Okay. Couple hands.

[`3:28`](https://youtu.be/YwZR6tc7qYg?t=208) Uh how many of you run it like that? Hey, we got to go build this thing. Yes. Has anyone run it like this? Work back and forth with me starting with your open questions and outline before writing the plan. Okay. Some of you found out about the magic words. A lot of people didn't though. Uh we'll get into why that's a problem.

[`3:44`](https://youtu.be/YwZR6tc7qYg?t=224) Um so since October we've basically worked with thousands of engineers from tiny startups all the way up to Fortune 500s. Um and we would find over and over again we would give these tools to an expert uh and they would get great results. They would go sit and talk to Cloud for 70 hours a week and they would start shipping like crazy. Uh and then they would go give it to their team and the results were not always so good.

[`4:03`](https://youtu.be/YwZR6tc7qYg?t=243) Um and so people weren't getting good results. And so we got in the trenches with our users and we went to go figure out what was going wrong. And the first thing that was going wrong was people were not getting good research. Um, so we talked about this in November. This is uh one of the only slides I'm reusing, but you would pick a zone of your codebase. You would say, "We're going to build something over here." And then you would launch a coding agent session to go send these sub agents through these deep vertical slices through the codebase for just the context, compressed context about what is the thing we're about to go build, right?

[`4:32`](https://youtu.be/YwZR6tc7qYg?t=272) And we said keep things objective, discourage opinions, don't actually put any implementation details in there. You just want to compress the truth. What is true about how the code works today? And a skilled engineer was really good at taking, okay, here's my ticket. Let me write some questions that will cause the model to go touch all the parts of the codebase that matter. So if it was, you know, add a new endpoint to reticulate splines across tenants. We would say something like, okay, tell me how endpoints work and trace the logic flow for everything that touches splines and go find the workers that do all the reticulation.

[`5:03`](https://youtu.be/YwZR6tc7qYg?t=303) Uh, so if this is your ticket, a lot of people would run it like this. They would just say, "Hey, research codebase. Here's what I'm building." Um, and the problem is that good research is all facts. But if you tell the model what you're building, then you get opinions. And we don't, we'll get into why the model shouldn't have opinions later. Comes back to this thing that Jake from Netflix came up with, which is do not outsource the thinking.

[`5:22`](https://youtu.be/YwZR6tc7qYg?t=322) Um, the other thing that wasn't working is people were getting not great plans. Um, and basically there were these steps built into this planning prompt uh that was this single giant like monolithic thing with 85 or more instructions. And it had these steps in it of like cool present design options to the user uh get feedback on the structure uh before you actually go write the plan.

[`5:43`](https://youtu.be/YwZR6tc7qYg?t=343) And so a good planning session would look something like you know you have your claude system tools and your prompt and then you say hey create plan loads the skill looks at your ticket loads your research doc launches a bunch of sub agents to go find a bunch of things that are true about the codebase just confirms some stuff that wasn't maybe in the research. This is all one big context window by the way. Usually I'll use these columns to mean separate context windows, but today this is all one session. I just — slides are sideways, so I had to put them on next to each other.

[`6:11`](https://youtu.be/YwZR6tc7qYg?t=371) Um, but the agent would come and ask questions. So, okay, here's our options for question one. User would pick an option. User would pick an option. And then eventually it would say, cool, here's the order we're going to do the things. Um, what do you think? And the user could say, well, we need to add a testing step up front, and I want to swap phases three and four. Assistant would give the new outline of the phases. Then the user would approve it and only then would we write our plan file.

[`6:33`](https://youtu.be/YwZR6tc7qYg?t=393) Um complex process of aligning with the user on what was going to be built. Um but for about 50% of people maybe more if you didn't prompt it with this work back and forth with me or Opus was just feeling dumb for that particular hour of the day. Um it would just take the stuff and it would just immediately go and write the plan out. And so you would get this and it would be like cool. I wrote the plan, didn't ask me any questions, made all the decisions for me. Yikes.

[`6:58`](https://youtu.be/YwZR6tc7qYg?t=418) So we gave the tools to people and some people got good results and some people didn't. And we dug in and we were like, "What's the difference?" Uh, and people would literally say this to me like, "Well, you have to say the magic words." And I found myself in workshops full of enterprise engineers saying, "Well, guys, guys, guys, yeah, here's the software, but don't forget to say the magic words." It was, quite frankly, it was embarrassing.

[`7:16`](https://youtu.be/YwZR6tc7qYg?t=436) But if you said this, work back and forth with me starting with your open questions and outline before writing the plan. Then the agent would ask you the questions. And this isn't the user's fault. If you built a tool that requires hours and hours of training and reps to get like good results from, go fix the tool. And so I'll talk about how we did that.

[`7:35`](https://youtu.be/YwZR6tc7qYg?t=455) Um, but why these steps were getting skipped, one of the big takeaways I'll give you today is like you have an instruction budget. Uh, my co-founder Kyle is somewhere over here. He wrote this really good blog post in December or November I guess technically um that basically cited this archive paper which again this is from last year so the number is probably a little bit higher now but that frontier LLMs could only follow about 150 to 200 instructions with like good consistency anything more than that and it's kind of half attending to all of them and you're rolling the dice.

[`8:04`](https://youtu.be/YwZR6tc7qYg?t=484) So if you have a prompt with 85 instructions and your cloud MD and your system prompt and your tools and your MCP um yeah you're not likely to get full adherence to the workflow. So, more on how we fix this later.

[`8:16`](https://youtu.be/YwZR6tc7qYg?t=496) The other thing that I think really wasn't working for people was like we advocated for reading the plans that were output. This is me on stage in November telling people you have to read the plan otherwise it won't work. Um some people even would PR their plans and code review them together. But a thousand line plan tends to be about a thousand lines of code within 10% or so. And plans can have surprises.

[`8:38`](https://youtu.be/YwZR6tc7qYg?t=518) So you would go and you would review the plan and then you would go write the code and it would be different. And so you're telling — you're asking one of your co-workers like, "Okay, go spend an hour reading this and tell me what's wrong with it." And then you would go implement it. It would be different. They have to go read the code again and see what the surprises were and what changed. Um, and so this isn't leverage. Leverage is about like do less work to get more output.

[`9:01`](https://youtu.be/YwZR6tc7qYg?t=541) So the new advice, uh, don't read the plans. Please read the code. Uh, just because it's the same amount of work and like look for leverage elsewhere. And I'll talk about how we found better leverage.

[`9:10`](https://youtu.be/YwZR6tc7qYg?t=550) Um, and you may say, "Hey, Dex, in August you said don't read the code." You said the plans are enough. Just don't — just go just ship and let Cloud do its thing. I was wrong. I am humble enough to admit when I was wrong. Uh, this is actually a very big conversation right now. Please please read the code. We tried not reading the code for like six months. Uh, it did not end well. We had to rip out and replace large parts of that system.

[`9:32`](https://youtu.be/YwZR6tc7qYg?t=572) Um, and you may say, "Hey, Dex, but other people don't read the code." Beads, 300,000 lines and counting. Uh, no one's read that code allegedly. Uh, OpenClaw Pete's like, "Okay, you know, I know the structure and the pieces and how they fit together, but I don't read every line of every PR." Um, these are OSS projects. They don't charge money.

[`9:58`](https://youtu.be/YwZR6tc7qYg?t=598) They are very very cool projects. I am humbled, deeply humbled by the accomplishments of the maintainers and the stakes are still high. Like if you break openclaw, a lot of people are going to be upset but they are different than if you're say working in a regulated industry shipping production SAS code. Um so if you have people who depend on your code, please I'm begging you please read it. Please read it. We have a profession to uphold. 2026 is supposed to be the year of no more slop.

[`10:25`](https://youtu.be/YwZR6tc7qYg?t=625) Uh, literally everyone is talking about the difference between slop and craft. Uh, this is why I'm a little mid on agent swarms and the whole gas town thing because you still need to be able to ensure quality and like going 10 times faster doesn't matter if you're going to throw it all away in 6 months.

[`10:40`](https://youtu.be/YwZR6tc7qYg?t=640) So, shoot for 2 to 3x. That's actually another talk of like how you measure this and how you actually get there and maintain like a near human level of quality. Um, but I'll talk about the goals and like what you should think about if you want to get there is you should have high leverage planning. You should not outsource the thinking, read and own the code and ideally we will avoid uh magic words.

[`11:02`](https://youtu.be/YwZR6tc7qYg?t=662) So uh we got better research, we got better plans, we got better leverage. I'm going to talk about each of those um as far as like in general what we and like in specifically what we did and also some general concepts as you're building workflows and systems around coding agents what you can do.

[`11:15`](https://youtu.be/YwZR6tc7qYg?t=675) So we talked about how a skilled engineer could detangle the ticket to the questions to the research uh and then the research would be very objective. Um basically we just hide the ticket from the context window that's doing research and we do it deterministically. So basically you have one context window to generate questions and then a fresh context window with no knowledge of what we're building to go make your research doc.

[`11:38`](https://youtu.be/YwZR6tc7qYg?t=698) Um this is pretty trivial if you're familiar with the concept of query planning. Um it's similar in concept but for you know LLMs reading through codebases.

[`11:48`](https://youtu.be/YwZR6tc7qYg?t=708) Um so I've been hacking on agents for a while and before we did the coding agent stuff I wrote this paper called 12 factor agents which was uh allegedly the first time anyone was like talking a lot about context engineering. Uh there's two ways to read context engineering and most people jumped in. Is anyone building like rag pipelines? Raise your hand if you built a rag pipeline? Okay. Some people are feeling uh not like not raising their hands today.

[`12:10`](https://youtu.be/YwZR6tc7qYg?t=730) Um, but it's like, okay, put more information. You put too much information in, the model can't make sense of it. I actually think the more interesting read of context engineering is like better instructions and simpler tasks and smaller context windows.

[`12:22`](https://youtu.be/YwZR6tc7qYg?t=742) Of course, we all know Jeff now. I don't have to introduce him anymore. I used to have to tell people who Jeff was when I was talking. Um, we talked about this like context window thing as the idea of the dumb zone, which is, you know, you have about 168,000 tokens and 200,000, but some of them are reserved for output. You have various things that they're for and around like 40% on average depending on what you're doing and how much of your context is user messages versus files and all of this stuff you hit this point where you have degrading results.

[`12:48`](https://youtu.be/YwZR6tc7qYg?t=768) And obviously sometimes you can still get good enough for you results at 60% but the less of the context window you use the better results you will get. Um our friends at Databricks were just talking about you have too many MCPs the whole context window is full of instructions about how to use a bunch of tools that you don't care about and then by the time you're writing code the model is like not good at following your instructions. So you're not just giving the model too much information, you're also probably giving it too many instructions.

[`13:12`](https://youtu.be/YwZR6tc7qYg?t=792) And so the idea of what we were doing was this thing like makes a lot of sense. Use prompts for control flow. This is a customer support example, but you know, if it's a complaint, go do this. If it's product feedback, go do this. If it's a billing issue, go do this.

[`13:27`](https://youtu.be/YwZR6tc7qYg?t=807) Um, and what you can do instead is you can instead of using prompts for control flow, you can kind of classify the input and then feed it to a series of smaller, more focused prompts where there are far fewer instructions and far fewer actions to choose from. I'm sure many of us have already done things like this to improve the performance of pipelines.

[`13:43`](https://youtu.be/YwZR6tc7qYg?t=823) Um, so this was a single mega prompt with 85 instructions. Um, and if you did it right, you would go through all these different steps. All these different phases were part of that. And if any of the instructions didn't get followed, you would skip the things that made this really high leverage.

[`13:54`](https://youtu.be/YwZR6tc7qYg?t=834) Um, so we split it across several prompts and so like before it was research, plan, implement. Now it's questions, research, design, structure, plan, work, implement, PR. We're actually not going to have time to talk about the implement side of the thing today, but um, we split up the planning into a design discussion and outline and a plan. And before it was 85 instructions, now they're all less than 40, which is really exciting. And I think some of them could actually be even smaller. We're still iterating on them.

[`14:18`](https://youtu.be/YwZR6tc7qYg?t=858) The lesson is don't use prompts for control flow if you can use control flow for control flow. Like the if statement is really really powerful and LLMs are really good at classifying things. This is not just true for coding agents. This is any AI LLM based system you're building.

[`14:31`](https://youtu.be/YwZR6tc7qYg?t=871) Um and it's really funny because we were writing all this stuff and we got on stage we said like full fat agents don't work. Don't just call tools in a loop. Do context engineering and build workflows and graphs and micro agents. We told everybody don't do this. And then we turned around in August and we're like all right but this Cloud Code thing is pretty good. And we turned around and we wrote this giant monolithic prompt. So, we figured it was time to actually go drink our own Kool-Aid. Um, mind your instruction budget.

[`14:56`](https://youtu.be/YwZR6tc7qYg?t=896) How do we get better leverage? So, we split things up to get better instruction following, right? These three different phases. But we also got more leverage. I'm going to talk about why. Because even if the plan is a thousand lines and the code is 1,000 lines, your design discussion might only be 200 lines. And you get a lot of opportunities to resteer in that moment.

[`15:12`](https://youtu.be/YwZR6tc7qYg?t=912) And so, what this looks like is basically where are we going? What does the final solution look like? And it has, you know, the current state, the desired end state, it has the patterns to follow. How many of you ever like sent off a coding agent and it like found the wrong way to do a thing in your codebase and it followed the bad patterns? Yes. Right.

[`15:29`](https://youtu.be/YwZR6tc7qYg?t=929) This is your chance to go read all the patterns it found that it thinks are relevant and be like, "Nope, that's not how we do atomic SQL updates. That's some engineer that doesn't work here anymore and it's crazy and everyone hates it. Go find the way we do it over there."

[`15:40`](https://youtu.be/YwZR6tc7qYg?t=940) Um, it'll keep track of resolved design decisions that we've made. It will ask open questions. This is sort of like taking Cloud Code plan mode and the ask user question tool and just brain dumping it all to a single document that you can interact with that's like moldable and flexible.

[`15:54`](https://youtu.be/YwZR6tc7qYg?t=954) Um Matt PCO has this idea, he calls it the design concept and it's this idea of like the thing that is locked up in this context window that is the shared understanding between you and the agent of what's being built and how. Uh so we put it in a 200-line markdown artifact.

[`16:07`](https://youtu.be/YwZR6tc7qYg?t=967) Um, and so we now have human agent alignment. And the idea here is like you're forcing the agent to brain dump out all the things it found, all the things it wants to do, all the things it thinks you want, and ask you questions about things it doesn't know. So you can do brain surgery on the agent before you proceed downstream.

[`16:24`](https://youtu.be/YwZR6tc7qYg?t=984) And it's all about do not outsource the thinking. You want to give the agent every single opportunity to show you what it's wrong about before you go write 2,000 lines of code.

[`16:35`](https://youtu.be/YwZR6tc7qYg?t=995) So uh, 200 lines instead of a thousand, a little bit more leverage. We also get better leverage from the outline. So if design is like where are we going the structure outline is how do we get there or if you're an engineer who is miserable because of sitting in meetings all day there's the like architecture review and then there's the sprint planning meeting — what are we going to build and then how do we break it down into tasks.

[`16:56`](https://youtu.be/YwZR6tc7qYg?t=1016) And so we take our design and we take it to ticket and the research we build up a new context window and we create the structure outline and this is basically high-level overview of the phases not the exact code we're going to write but just kind of what it's going to look like what order we're going to do the changes in and how we're going to test it along the way.

[`17:12`](https://youtu.be/YwZR6tc7qYg?t=1032) Now, I don't actually test in between every phase, everything I'm building, but if it's sensitive or if it's hard or if it's complex, I want to be able to catch it before it goes and writes all the code. I want to make sure each two, three, 400 line block is correct.

[`17:23`](https://youtu.be/YwZR6tc7qYg?t=1043) Um, and these docs mean lighter reviews. Instead of reviewing the plan, this is two things for the same feature. Plan, eight pages, structure outline, two-ish pages, much shorter.

[`17:33`](https://youtu.be/YwZR6tc7qYg?t=1053) Um, I like to think of this, has anyone ever written a C header file, .h file? Yeah. Okay, so if the plan is the implementation, the outline is the C header files. Just here's the signatures and the new types that we're changing enough again for you to see what the agent is thinking and correct it if it's wrong.

[`17:50`](https://youtu.be/YwZR6tc7qYg?t=1070) Um, and the reason why we do this is despite like every single model and trying to prompt this out and eval the hell out of this, we cannot get models to stop writing horizontal plans or — it like this is the best way to fix their need to write horizontal plans. And when I say horizontal plans, I basically mean you start with — models love to like we're going to do all the database and then we're going to do all the services and then we're going to do all the API and then we're going to do all the front end and before you know it, you're on the other side of 1,200 lines of code and it's not working and now you have to go figure out which part is broken because there was nothing really to test along the way.

[`18:24`](https://youtu.be/YwZR6tc7qYg?t=1104) Whether the model is verifying it or whether you the human are jumping in and checking it's correct. And so what we've seen work really really well across orgs of all sizes um is what I call vertical plans. This is how I build when I'm like before AI I would like make a mock API endpoint and then get it working in the front end and then wire that and then mock out the services layer and then do the database migration and then put everything together.

[`18:46`](https://youtu.be/YwZR6tc7qYg?t=1126) And so even though it's the same amount of code you have these like checkpoints where you can see if it's working and if it's not you can pause and fix it before you go try to do the rest of it. So these are just markdown docs too. Like you can and should ask for more detail. They start high level, but like here's an example of like I don't think you're going to get this right. Tell me what you're thinking. And it like dumped out the types and the signatures.

[`19:04`](https://youtu.be/YwZR6tc7qYg?t=1144) Um and then getting better leverage from the plan itself. I mean again like usual like we've been doing. We just take that artifact, we build it up with all the previous artifacts and then we can go build the plan. Um and it is the same if you use create plan. It's the exact same template, exact same setup, exact same prompt, but this is a tactical doc for the agent. We've already done enough aligning that like I'm just going to spot check this and then we save the deep review for the actual code.

[`19:28`](https://youtu.be/YwZR6tc7qYg?t=1168) And so if you've used any of the RPI plans, they look like this. It's the model saying, "Hey, here's all the changes I'm going to make."

[`19:35`](https://youtu.be/YwZR6tc7qYg?t=1175) Um, the most important part of this leverage is not just about you and the agent, though. Like human agent alignment is important and knowing what the agent's going to do and correcting that is good but it's also you know if you're working with a team of engineers we've found a lot of value from taking these design discussions these structure outlines and review — I said don't review the plans but these shorter docs are really really good.

[`19:57`](https://youtu.be/YwZR6tc7qYg?t=1197) Uh I am not the code owner of most of our code at HumanLayer my uh co-founder is and I send him my design discussions on purpose we don't have a required step but I want to — I want to know that when we get code review, it's just going to be like, "Yep, that's what I wanted. That's it. That's it." So any of my bad decisions are headed off on a 200-line doc before I've gone and written the code and gotten it working and I'm attached to it. And so this is really really powerful.

[`20:22`](https://youtu.be/YwZR6tc7qYg?t=1222) Um before AI, we would basically — the way another way to think about this is like time savings. You would say, "Okay, it's a two-day feature. I got to do all this stuff. The coding is probably two to four hours." If you just pick up Cloud Code and use it to ship for you, you do get some speed up because now the coding takes 20 minutes. It's still a two-day feature because I still have to like align with my team on what we're going to do. I still have to get a code review and fix stuff. Maybe I'm working across repos that I don't personally own and then we still have to verify and test it.

[`20:47`](https://youtu.be/YwZR6tc7qYg?t=1247) But if you use AI to help you with your planning and alignment, then you also save time there. And I think you get much better alignment. Um, and so your code review and rework is also much shorter because you already know what's coming. The team that's reviewing it already kind of like had their chance to resteer you. And really good teams do this. It's they have a meeting that's called architecture review where we decide, you know, what's our technical design doc on how we're going to build this.

[`21:12`](https://youtu.be/YwZR6tc7qYg?t=1272) So, um, as far as testing and verifying, sorry, I don't have a good answer for you. It's a whole other talk. If you went to Drew's talk downstairs, go find Drew Brun after this. He will tell you all about testing and verifying.

[`21:21`](https://youtu.be/YwZR6tc7qYg?t=1281) Um, let's put this all together. So, we have these five stages of research and planning. Um, the process is basically questions, research, design, structure, outline, plan, work tree, implement. Finally, the poll request. Uh, that didn't make a very good acronym though, so we just picked the ones we liked. And, uh, we're calling this crispy. Uh, so RPI to crispy. That's the — There you go.

[`21:43`](https://youtu.be/YwZR6tc7qYg?t=1303) Um, what's next and what did I not have time to talk about today? Um, three steps was already a lot for some people to learn and now there are seven. I thought we were supposed to make this easier for teams to learn this and adopt it. We can talk about how we're like thinking about that.

[`21:57`](https://youtu.be/YwZR6tc7qYg?t=1317) Um the idea of how do you measure the impact of doing this um in engineering teams I think is like we've been trying to measure developer productivity for 50 years and we still don't know how to do it very well.

[`22:06`](https://youtu.be/YwZR6tc7qYg?t=1326) Um and then it's like if you're a central kind of platform team rolling out changes to everybody in your org, how do you make these prompts better? How do you make this engineering system better? I mean, um, we were just talking about like, oh, every team has a skill now, and we want to consolidate and make that shared and let people benefit from each other's learnings. How do you make that stuff better without like breaking somebody's workflow or regressing it for some team?

[`22:31`](https://youtu.be/YwZR6tc7qYg?t=1351) Uh, if you want to help us, if you're in San Francisco and you're working on critical systems and you want to like figure out how to get coding agents to do more, uh, let's chat. We're also hiring. Um, send us a note either way. Founders@humanlayer.dev.

[`22:43`](https://youtu.be/YwZR6tc7qYg?t=1363) Uh we're building an IDE that orchestrates this stuff for you. Uh you don't need this to get this value out of this, but this is the kind of stuff we're working on.

[`22:52`](https://youtu.be/YwZR6tc7qYg?t=1372) Uh if you want to hang out, I'm doing a sandbox research hackathon on Saturday. We're going to just get together with a bunch of cool builders, test all of the sandbox providers together, uh and see which one's the best and then share our learnings. I'll also be at the Daytona Compute Conference. Uh and if you feel like coming to Miami, uh AI Engineer Miami is going to be really fun. Will be giving uh the updated version of this talk with more stuff that I didn't have time to get to today.

[`23:15`](https://youtu.be/YwZR6tc7qYg?t=1395) Um, thank you so much to all of you for your energy to Demetrios and the entire organizing squad. Good luck.

[`23:22`](https://youtu.be/YwZR6tc7qYg?t=1402) Questions. Who's got a question for Dex? That was super fast. I like it. I was very doubtful that you were going to get through it, but I like it.

[`23:32`](https://youtu.be/YwZR6tc7qYg?t=1412) All right. I'm curious about reading the code. Like, it's not scalable, right? Like, are you going to be saying the same thing in six months? I mean, six months ago, I said not to read it. Uh, and it was — I think everyone who is saying don't read the code now is going to be in six months being like, "Yeah, we had to throw that out." There's something there's something in the middle, right? We're binary searching through the space uh of how much of the code should you read.

[`23:55`](https://youtu.be/YwZR6tc7qYg?t=1435) Um, I think, yeah, the idea is if you still read the code, you can still get two to three x speed up. And that's actually better business outcomes than uh than going 10x faster and shipping a bunch of slop and hoping that you know GPT7 will fix it for you.

[`24:12`](https://youtu.be/YwZR6tc7qYg?t=1452) Yeah, I hit things. Uh awesome talk. Um curious your thoughts on like the software factory. I think it's like strong DM that's saying the opposite which is like never have a human read either side of it. And I think that pushes us further into eval. So what is your thinking on that?

[`24:35`](https://youtu.be/YwZR6tc7qYg?t=1475) Yeah, there is a whole class of like there's a whole rabbit hole you can go down with like formal verification and TLA plus or — I talked to a guy who's building a new TLA plus that is TLA++ that is like okay what if we don't read the code? How can we actually like formally verify everything that's working?

[`24:52`](https://youtu.be/YwZR6tc7qYg?t=1492) Uh, I think there's a lot more to be built and I think there's a lot of people right now who need to ship like code to production systems faster. So like maybe someday, but like I used to cite Sean Gro's talk where he was like it's just the spec. Just write the document that explains the desired behavior and you treat the code like it's assembly and you never read it anymore. Um, I do not endorse that. Let's put it that way.

[`25:17`](https://youtu.be/YwZR6tc7qYg?t=1517) We got one more. All right, last one. Uh I know you mentioned one of the slides about the like context window and uh the the dumb zone, right? Uh I know you researched that like heavily a few — like have you gone back to look at that again to see how true that still is after certain like context window especially with like all the autocompaction they have now and other methods for that.

[`25:41`](https://youtu.be/YwZR6tc7qYg?t=1541) I mean, I think like for if you have been using AI coding agents for six to nine months and you use them for 60 hours a week, like the dumb zone is not a useful concept to you. I will regularly go up to 60. I will regularly like aggressively keep it below 30. It depends on the complexity of your task, the amount of instructions versus information.

[`26:06`](https://youtu.be/YwZR6tc7qYg?t=1566) So like your mileage may vary. If you are using coding agents for the first time, this is what we teach people is like if you don't know what to do and you haven't developed that intuition, then like shoot to keep it under 40 and if you get up to 60, like think about wrapping it up.

[`26:15`](https://youtu.be/YwZR6tc7qYg?t=1575) And like you can keep iterating on the same doc. That's what's also nice about these is like we don't use the built-in compaction because everything that matters is going into static assets and so you can always resume from where you left off without having to worry about the quality of an autocompact or a manual compact.

[`26:32`](https://youtu.be/YwZR6tc7qYg?t=1592) Brilliant, Dex. Well done, dude. Thank you. Let's give it up for him.
