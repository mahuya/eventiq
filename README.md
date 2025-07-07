# EventIQ – Reimagine Event Decisions, Intelligently

**EventIQ** is a smart event-fit assistant that helps professionals evaluate if a given event is worth their time — based on their LinkedIn profile, career goals, and the event’s agenda.


## Key Features

- Analyze your public LinkedIn profile
- Understand your stated career goal
- Parse any event link to evaluate fit
- Returns personalized event-fit insights: 
  - **Goal Fit** – How aligned the event is with your objective
  - **Network Boost** – Your potential to grow relevant connections
  - **Brand ROI** – Whether attending helps build authority


## AI Workflow

- **Model Provider:** Groq (LLaMA 3.1 8B-Instant)
- **Agent Workflow:** Built in [Langflow](https://github.com/langflow-ai/langflow)
- **MCP Server Fetch:** Used to extract structured content from:
  - Your LinkedIn public profile
  - The event page (agenda, speakers, etc.)

> See the included [`eventiq-langflow-workflow.json`]) for the full Langflow agent design.


## Frontend UI

- Built using a no-code visual builder 
- Clean, minimal interface with:
  - LinkedIn URL input
  - Goal statement
  - Event link
  - "Analyze Event Fit" button
- Results displayed as a summary + 3 decision metrics


## Tech Stack: From Propmt to Production

- Prompt Prototyping: Used NativelyAI Conductor to quickly sketch early agent logic and test prompt flows — no setup, just raw ideas to validation.
- Final AI Workflow: Shifted to Langflow for structured visual orchestration and integrated with Groq’s blazing-fast LLaMA 3.1 8B model.
- Frontend/UI: Built using a visual development stack powered by Vite, Tailwind CSS, and ShadCN UI components — fully customizable and fast.


## How to Use

1. Open the app.
2. Paste your LinkedIn profile, enter your career goal, and add an event link.
3. Click **"Analyze Event Fit"**.
4. See real-time Groq-powered feedback on whether this event is a smart choice for your career.


## Credits

Built with ❤️ for the **RAISE 2025 Hackathon** for the **Conduct(or) x NativelyAI** Track  
Author: Mahuya Ghosh © 2025
