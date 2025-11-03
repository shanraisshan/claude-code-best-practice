# Prompts


# Creating Agents and Commands
create a claude agent and command. the agent will first use tool to call weather api to fetch karachi weather in degree centigrade and then read instructions from @input/input.md to transform the result and update the @output/output.md 

# Invocation difference between agents and commands
see the table in @PROMPTS.md of Agent Invocation and Command Invocation and cross verify, also add missing invocation cases if I have missed any

### Agent Invocation

  | From                 | How                    | Example                             |
  |----------------------|------------------------|-------------------------------------|
  | Claude CLI           | Prompt                 | use weather transformer agent to transform 50 degree |
  | /commands/Commands.md| Task tool              | Task(subagent_type="weather-transformer") |
  | Another subagent     | Task tool              | Task(subagent_type="weather-fetcher") |

  ### Command Invocation

  | From                 | How                    | Example                             |
  |----------------------|------------------------|-------------------------------------|
  | Claude CLI           | Prompt                 | use the weather command to fetch the weather |
  | Claude CLI           | /command-name          | /weather-karachi |
  | /agents/Agents.md    | SlashCommand tool      | SlashCommand(command="/weather-karachi") |
  | Another /command     | SlashCommand tool      | SlashCommand(command="/weather-karachi") |

