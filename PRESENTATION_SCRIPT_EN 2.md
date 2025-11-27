# DCP AI Expert Service - Presentation Script (English)
## Total Duration: ~20 minutes

---

## Part 1: PowerPoint Introduction (~10 minutes)

### [Slide 1: Agenda] (1 minute)

**Script:**
"Good afternoon. Today, I'm presenting the DCP AI Expert Service.

Let me start with the agenda. Today's presentation consists of three parts:

**First, Introduction** - I'll explain what DCP AI Expert Service is and provide an overview of available agents.

**Second, Live Demonstration** - I'll show you real Q&A examples using the actual web interface.

**Third, Discussion** - We'll have a Q&A session where you can ask any questions.

Let's begin with the introduction."

---

### [Slide 2: What It Does] (2 minutes)

"So, what can this tool do?

First, you can ask questions about DCP through a web-based interface. No complex setup or installation is required. All you need is a browser.

Second, multiple specialized agents are available. We have a primary agent - the **Wiki MD Agent** - which handles most DCP documentation questions. It's our go-to agent for the majority of use cases. Additionally, we have other specialized agents for specific scenarios like PDF documents, GitOps, or general AI tasks.

Third, you receive AI-powered answers, and all answers include source citations. This means you can see which document the answer came from, ensuring reliability.

In summary, it's web-based, provides specialized agents with **Wiki MD as the primary agent**, and delivers AI answers with source citations."

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


**Second, the PDF Agent.**

This agent uses PDF format for the **same content** as Wiki MD. Both agents are testing which format provides better retrieval results.

**Purpose:** To compare PDF format against Markdown format and determine which provides better search results for daily use.

PDF is less compact than MD and may include menus and labels. MD format is currently preferred, but PDF Agent remains active for testing purposes.

**Third, the GitOps Workload Agent.**

This agent specializes in GitOps, deployment, and configuration files. It can handle multiple file formats including YAML, JSON, Python scripts, shell scripts, and configuration files.

**When to use it:** For questions about GitOps workflows, deployment processes, YAML or JSON configuration options, or when you need information about configuration files and scripts.

**Example questions:** 'How do I configure GitOps deployment?', 'What are the YAML configuration options?', 'Explain the deployment workflow.'

**Note:** This is currently a test agent and may be removed in the future.

**Fourth, the AICore Agent - this is different from the others.**

This is NOT a document-based agent. It's a general-purpose AI assistant that uses direct LLM access without document retrieval.

**When to use it:** For general AI questions that don't require DCP documentation, or for typo correction - which happens automatically when you use other agents.

**Important:** Do NOT use AICore for document-based Q&A. It won't provide source citations because it doesn't search through documents. For any DCP documentation questions, use one of the RAG agents instead.

---

##아누팜

### [Slide 4: System Architecture] (2 minutes)

**Script:**
"Now, let me show you how the system works at a high level. [Point to diagram]

[Note: This slide may be explained by Boris or another team member]

This diagram shows the technical architecture of the DCP AI Expert Service. As you can see, the system consists of several layers:

- **Web UI** - This is what users interact with. It provides real-time streaming responses, multi-agent selection, and integrated analysis mode.

- **Agent Router & Task Manager** - This component receives requests from the UI and routes them to the appropriate specialized agents.

- **Specialized Agents** - We have four active agents: Wiki MD, Wiki PDF, GitOps, and AI Core Service. Each agent handles different types of questions.

- **Vector Retrieval Layer** - This handles document processing, embedding, similarity search, and context augmentation.

- **SAP HANA Cloud Vector Engine** - This stores document embeddings and performs semantic search and retrieval.

- **SAP Generative AI Hub** - This provides the underlying AI models for generating answers and creating embeddings.

The flow is straightforward: User asks a question → Agent Router selects the right agent → Agent retrieves relevant documents → AI generates an answer → Answer is streamed back to the user.

This architecture enables fast, accurate answers with source citations."

**Key Message:** "High-level architecture showing how the system works"

---

### [Slide 5: Future Vision: Multi-Agent System] (1-2 minutes)

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
"Now, let me show you the actual web UI. [웹 브라우저 열기]

As you can see, this is what end users see. It's very simple. After logging in, there's an input box where you can ask questions, and a dropdown to select agents.

No complex setup or technical knowledge is required. Simply enter your question, select an agent, and receive an answer."


---

### [2. Agent Selection Demo] (1 minute)

**Script:**
"If you look at the agent selection dropdown, you'll see four agents available. [Show dropdown]

Each agent specializes in different areas. However, **the Wiki MD Agent is our primary agent** - it's designed to handle the majority of DCP documentation questions. For example, you can use the Wiki MD agent for general DCP questions, checkout processes, API references, and configuration guides. The other agents like GitOps are for specific scenarios.

---

### [3. Question & Answer Demonstrations] (8-9 minutes)

#### Question 1: Operational/Configuration Question (1-2 minutes)

**Script:**
"For this demonstration, I'll be using the **Wiki MD Agent** - our primary agent for most questions. [Show Wiki MD Agent is selected]

The first question is about operational tasks: ==**'how do I update jenkins certificate?'**== [Enter question]

This is a practical question that operations or DevOps teams might ask when they need to update certificates.

[Wait for answer]

As you can see, the Wiki MD Agent provided step-by-step instructions for updating the Jenkins certificate. Notice how it includes specific steps, configuration details, and source citations below the answer. [Show source citations]

This demonstrates that our Wiki MD Agent can handle operational and configuration questions effectively, providing actionable guidance with reliable sources."

**Key Message:** "Operational questions answered with actionable steps and source citations"

---

#### Question 2: Access Permission Question (1 minute)

Now let's ask about access permissions: **=='what CAM role access into kyma?'==** [Enter question]

This is an important question about who can access Kyma and what roles are required. This type of information is crucial for users who need to understand access requirements.

[Wait for answer]

As you can see, the Wiki MD Agent provided information about CAM roles and Kyma access. It explains which roles are needed and how to get access. Notice the source citations - you can click on these links to see the original documentation. [Show source citations and mention clickable links]

This is another example of how Wiki MD Agent helps users quickly find access and permission information."

**Key Message:** "Access and permission questions answered clearly with source links"

---

#### Question 3: Problem-Solving/Troubleshooting Question (2-3 minutes)

**Script:**
"Let me show you how the Agent handles troubleshooting questions. [Show Wiki MD Agent is still selected]

This is a real-world scenario: **=='It seems we do have an issue with the pricing service connecting to CPQ. Please suggest what to do and whom to contact?'==** [Enter question]

This is exactly the type of question that support teams or developers face when troubleshooting integration issues. They need both technical guidance and contact information.

[Wait for answer]

Excellent! The Wiki MD Agent provided a comprehensive answer including troubleshooting steps, potential solutions, and contact information. Notice how it breaks down the problem systematically and provides actionable next steps. [Scroll through answer]

Below the answer, you can see multiple source citations. These are clickable links that take you directly to the original documentation pages. [Show source citations and demonstrate clickable links]

This demonstrates the real value of this tool - when you have an urgent issue, you can quickly get both technical guidance and contact information, all with reliable source citations."


---

#### Question 4: Concept Comparison Question (2 minutes)

**Script:**
"Now let's try a conceptual question that requires comparing two different concepts.

The question is: **=='Explain the difference between upsell and net new ordering on DCP'==** [Enter question]

This is a business concept question that helps users understand the distinction between two important ordering types in DCP.

[Wait for answer]

Perfect! The Wiki MD Agent provided a clear comparison between upsell and net new ordering. Notice how it explains each concept separately and then highlights the key differences. [Scroll through answer]

This type of conceptual explanation is valuable for users who need to understand business logic and process differences. The answer includes examples and use cases, making it easy to understand. [Show source citations]

This demonstrates that Wiki MD Agent excels at explaining complex concepts in a clear and structured way."

**Key Message:** "Conceptual questions answered with clear comparisons and examples"

---

#### Question 5: Process Documentation Question (2 minutes)

**Script:**
"Finally, let me show you how Wiki MD Agent handles process documentation questions. [Show Wiki MD Agent is still selected]

This question asks about a specific process: **=='Describe TDD ordering process'==** [Enter question]

Process questions require step-by-step explanations, which is exactly what Wiki MD Agent is designed to handle.

[Wait for answer]

Excellent! The Wiki MD Agent provided a detailed step-by-step explanation of the TDD ordering process. Notice how it breaks down the process into clear stages, explains each step, and includes related information like APIs or configuration requirements. [Scroll through answer]

The answer is well-structured and easy to follow, which is crucial when learning a new process. And as always, source citations are provided so you can verify the information or get more details. [Show source citations]

This demonstrates the strength of Wiki MD Agent in explaining complex processes in an organized and understandable way."

**Key Message:** "Process questions answered with detailed step-by-step explanations"

---

#### Conversation History (30 seconds - optional)

**Script:**
"Before we wrap up the demo, let me quickly show you the conversation history. [Scroll through history]

As you can see, all five questions and their answers are saved in the history. You can refer back to any previous question or review answers again. This is particularly useful when you're working on related topics and want to reference earlier information.

This conversation history feature helps maintain context across multiple questions."

**Key Message:** "Conversation history maintains context across questions"

---

## Closing (1 minute)

**Script:**
"In summary, the DCP AI Expert Service is a tool that quickly and accurately answers questions about DCP documentation.

- It's simple to use with a web-based interface
- **Wiki MD Agent is our primary agent** - use it for most DCP documentation questions
- Other specialized agents are available for specific scenarios
- All answers include source citations for reliability
- Conversation history maintains context

That's the entire presentation. If you have any questions, please feel free to ask."

---

Finally, I'd like to share one personal update.
I completed my undergraduate studies this week, and my working-student contract ends as scheduled on November 30th.
And recently, I received a formal full-time offer from the SAP AI Core team.
I'll be taking a break from December to February, and then returning to SAP on March 1st of next year.

Since today is the last wrap-up session, I wanted to share this in person.