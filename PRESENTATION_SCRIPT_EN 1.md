# DCP AI Expert Service - Presentation Script (English)
## Total Duration: ~20 minutes

---

## Part 1: PowerPoint Introduction (~10 minutes)

### [Slide 1: Title & Purpose] (2 minutes)

**Script:**
"Good morning/afternoon. Today, I'm presenting the DCP AI Expert Service. This is a web-based tool that enables you to ask questions about SAP Digital Commerce Platform, or DCP, documentation and receive intelligent answers.

The purpose of this tool is to quickly search through complex DCP documentation and provide accurate answers with source citations. Instead of spending time searching through documents, you can simply ask a question.

This is what we're introducing today - an intelligent Q&A tool for DCP documentation."

**Key Message:** "Intelligent Q&A tool for DCP documentation"

---

### [Slide 2: What It Does] (3 minutes)

**Script:**
"So, what can this tool do?

First, you can ask questions about DCP through a web-based interface. No complex setup or installation is required. All you need is a browser.

Second, multiple specialized agents are available. We have a primary agent - the **Wiki MD Agent** - which handles most DCP documentation questions. It's our go-to agent for the majority of use cases. Additionally, we have other specialized agents for specific scenarios like PDF documents, GitOps, or general AI tasks.

Third, you receive AI-powered answers, and all answers include source citations. This means you can see which document the answer came from, ensuring reliability.

In summary, it's web-based, provides specialized agents with **Wiki MD as the primary agent**, and delivers AI answers with source citations."

**Key Message:** "Web-based, specialized agents with Wiki MD as primary, AI answers with source citations"

---

### [Slide 3: Available Agents Overview] (4 minutes)

**Script:**
"Currently, four agents are active, each specializing in different areas. Let me explain when to use each one, starting with our **primary agent**.

**First, the Wiki MD Agent - this is our PRIMARY and RECOMMENDED agent for most questions.**

This agent uses Markdown files exported from Confluence. It contains the same DCP documentation content as the PDF Agent, but in a more compact format.

**Key advantages of MD format:**
- **Much more compact**: Contains only page content without menus, labels, or edit entries
- **Source links included**: Direct links to original pages for easy reference
- **Cleaner search results**: No unnecessary UI elements

**Purpose:** Both MD and PDF agents are testing which format provides better retrieval results for daily use. Currently, MD format is preferred because it's more compact and includes source links.

**When to use it:** For general DCP questions, technical documentation queries, questions about processes, APIs, or configuration. This should be your first choice for most questions.

**Example questions:** 'How does the DCP checkout process work?', 'What are the configuration service APIs?', 'Explain the order fulfillment workflow.'

**Second, the PDF Agent.**

This agent uses PDF format for the **same content** as Wiki MD. Both agents are testing which format provides better retrieval results.

**Purpose:** To compare PDF format against Markdown format and determine which provides better search results for daily use.

**Current status:** PDF is less compact than MD and may include menus and labels. MD format is currently preferred, but PDF Agent remains active for testing purposes.

**Third, the GitOps Workload Agent.**

This agent specializes in GitOps, deployment, and configuration files. It can handle multiple file formats including YAML, JSON, Python scripts, shell scripts, and configuration files.

**When to use it:** For questions about GitOps workflows, deployment processes, YAML or JSON configuration options, or when you need information about configuration files and scripts.

**Example questions:** 'How do I configure GitOps deployment?', 'What are the YAML configuration options?', 'Explain the deployment workflow.'

**Note:** This is currently a test agent and may be removed in the future.

**Fourth, the AICore Agent - this is different from the others.**

This is NOT a document-based agent. It's a general-purpose AI assistant that uses direct LLM access without document retrieval.

**When to use it:** For general AI questions that don't require DCP documentation, or for typo correction - which happens automatically when you use other agents.

**Important:** Do NOT use AICore for document-based Q&A. It won't provide source citations because it doesn't search through documents. For any DCP documentation questions, use one of the RAG agents instead.

**So, to summarize:**
- **For most DCP questions:** Use **Wiki MD Agent** - it's your best bet
  - Same content as PDF, but more compact with source links
- **PDF Agent:** Same content as MD, used for testing which format works better
- **For GitOps and deployment:** Use GitOps Agent
- **For general AI (not documentation):** Use AICore Agent

**My recommendation:** Start with **Wiki MD Agent** for most questions. It uses the same content as PDF but in a more compact Markdown format with source links, providing cleaner and more useful results."

**Key Message:** "Wiki MD Agent is optimal for most questions - use it as your first choice"

---

### [Slide 4: Future Vision: Multi-Agent System] (1-2 minutes)

**Script:**
"Now, let me show you our future vision. [Point to diagram]

**Current Status:** Right now, we have the Wiki Agent running - that's our RAG agent with 4 specialized agents that we just demonstrated. This is our starting point.

**Future Expansion:** We plan to extend this system with more specialized agents for different enterprise tools and services. As you can see in this diagram:

- **JIRA Agent** - for JIRA Tickets integration, so you can ask questions about tickets and create tickets directly
- **Runtime Agent** - for Kyma Runtime integration, to answer questions about runtime configurations
- **Dynatrace Agent** - for monitoring and observability questions
- **Git Agent** - for Github Enterprise integration, to answer questions about code and repositories

We're also planning **TNG (Next Generation) integration** to bring everything together.

The key message is: **This is just the starting point. We have a tool, and we have a direction.** We're using AI wherever possible and combining Wiki and other agents as sources for intelligent Q&A. We plan to extend this system to cover more enterprise tools and services, making it a comprehensive multi-agent system for DCP operations.

We're quite at the beginning, but we have a clear vision for where we want to go."

**Key Message:** "Starting point with Wiki Agent - plan to extend with more specialized agents for enterprise tools"

---

## Part 2: Live Demo (~10 minutes) - THE MAIN FOCUS

### [1. Login & Interface Overview] (1 minute)

**Script:**
"Now, let me show you the actual web UI. [Open web browser]

As you can see, this is what end users see. It's very simple. After logging in, there's an input box where you can ask questions, and a dropdown to select agents.

No complex setup or technical knowledge is required. Simply enter your question, select an agent, and receive an answer."

**Key Message:** "Simple interface - no technical knowledge required"

---

### [2. Agent Selection Demo] (1 minute)

**Script:**
"If you look at the agent selection dropdown, you'll see four agents available. [Show dropdown]

Each agent specializes in different areas. However, **the Wiki MD Agent is our primary agent** - it's designed to handle the majority of DCP documentation questions. For example, you can use the Wiki MD agent for general DCP questions, checkout processes, API references, and configuration guides. The other agents like GitOps are for specific scenarios.

**Important:** For most questions, use the **Wiki MD Agent**. It's our primary agent and provides the best results. [Select Wiki MD Agent] This is what you should use by default."

**Key Message:** "Wiki MD Agent is primary - use it by default for most questions"

---

### [3. Question & Answer Demonstrations] (8 minutes)

#### Question 1: Short, Practical Question (2 minutes)

**Script:**
"For this demonstration, I'll be using the **Wiki MD Agent** - our primary agent for most questions. [Show Wiki MD Agent is selected]

The first question is a practical scenario: 'shop is down, what shall I do?' [Enter question]

This is a situation that could actually happen. Someone is asking what to do when the shop is down.

[Wait for answer]

As you can see, the Wiki MD Agent provided support contacts, troubleshooting steps, and a troubleshooting guide. And below the answer, there are source citations. [Show source citations]

This is the value of this tool. You can get quick, practical answers with source citations using our primary Wiki MD Agent."

**Key Message:** "Practical and actionable answers with source citations"

---

#### Question 2: Long Technical Documentation Question (3 minutes)

**Script:**
"Again, I'm using the **Wiki MD Agent** - our primary agent. [Show Wiki MD Agent is still selected]

Now let's try a more complex technical question: 'How does the DCP checkout process work? Please explain step by step.' [Enter question]

This is a longer question that requires a detailed answer. This is exactly the type of question where Wiki MD Agent excels.

[Wait for answer]

As you can see, the Wiki MD Agent provided a detailed process explanation. It includes step-by-step descriptions, related APIs, and source citations. [Scroll through answer]

This demonstrates the strength of our primary Wiki MD Agent. It can explain complex technical documentation in an easy-to-understand way, which is why it's our go-to agent for most questions."

**Key Message:** "Complex technical questions answered in detail"

---

#### Question 3: Error Handling Demonstration (2 minutes)

**Script:**
"Now let me show you how the system handles incorrect input. Let me enter meaningless input: 'asdfghjkl' [Enter question]

[Wait for answer]

As you can see, the system indicates that it cannot understand the question and requests a more specific question or suggests similar questions. This shows that the system is trying to help the user.

This is error handling. The system appropriately handles incorrect input."

**Key Message:** "Incorrect input is handled appropriately"

---

#### Question 4: Conversation History (1 minute)

**Script:**
"Finally, let me show you the conversation history. [Scroll through history]

As you can see, all questions and answers are saved in the history. You can refer to previous conversations or review answers again.

This is another advantage of this tool. It maintains conversation context."

**Key Message:** "Conversation history maintains context"

---

## Closing (1 minute)

**Script:**
"In summary, the DCP AI Expert Service is a tool that quickly and accurately answers questions about DCP documentation.

- It's simple to use with a web-based interface
- **Wiki MD Agent is our primary agent** - use it for most DCP documentation questions
- Other specialized agents are available for specific scenarios
- All answers include source citations for reliability
- Conversation history maintains context

**Remember:** For most questions, start with the **Wiki MD Agent**. It's optimized for DCP documentation and provides the best results.

That's the entire presentation. If you have any questions, please feel free to ask."

**Key Message:** "Simple, fast, and reliable DCP documentation Q&A tool - Wiki MD Agent is primary"

---

## Time Management Guide

- **Part 1 (PowerPoint):** 10 minutes
  - Slide 1: 2 minutes
  - Slide 2: 3 minutes
  - Slide 3: 4 minutes
  - Slide 4: 1 minute

- **Part 2 (Live Demo):** 10 minutes
  - Interface Overview: 1 minute
  - Agent Selection: 1 minute
  - Question 1 (Short): 2 minutes
  - Question 2 (Long): 3 minutes
  - Question 3 (Error Handling): 2 minutes
  - Conversation History: 1 minute

- **Closing:** 1 minute

**Total Time: ~21 minutes** (With Q&A: ~23-25 minutes)

---

## Important Notes

- ❌ DO NOT mention: Flask, SocketIO, OAuth, or other technical stacks
- ❌ DO NOT explain backend architecture
- ❌ DO NOT mention Streamlit
- ✅ Focus only on what users see
- ✅ Focus only on "what you can do"
- ✅ Emphasize source citations

