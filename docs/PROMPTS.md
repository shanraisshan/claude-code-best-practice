# Prompts


# Creating Agents and Commands
create a claude agent and command. the agent will first use tool to call weather api to fetch karachi weather in degree centigrade and then read instructions from @input/input.md to transform the result and update the @output/output.md 

# Invocation difference between agents and commands
I have claude agents @.claude/agents folder and claude commands @.claude/commands folder. I want to invoke agents and commands differently. For example, I want to invoke agents with @agent_name and commands with @command_name. How can I achieve this?

## Claude Answer

  For Commands (Slash Commands)

  Commands in .claude/commands/ are invoked using the slash prefix:

  /command-name

  For your update-readme command:
  /update-readme

  For Agents (Sub-agents)

  Agents in .claude/agents/ are invoked using the Task tool within commands or directly:

  #### Using Task tool in your code/commands
  Task(subagent_type="readme-writer", prompt="Generate README content")

  Or by mentioning them in your instructions to Claude Code.



  | What                 | How                    | Example                             |
  |----------------------|------------------------|-------------------------------------|
  | Commands             | /command-name          | /update-readme                      |
  | Agents (in commands) | Task tool              | Task(subagent_type="readme-writer") |


  # based on @prompts/README.md claude answer, what I understand is commands must be invoked by using / on claude and it cannot be invoked like "claude use 

  - Commands are invoked using the slash prefix syntax: /command-name
  - Example: /update-readme

  However:
  You can also invoke commands in natural language by asking Claude Code to use them. For example:
  - "use the weather command to fetch the weather"
  - "Run the weather slash command"