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

Second, multiple specialized agents are available. Each agent specializes in different areas, so you can choose the appropriate agent based on the type of question.

Third, you receive AI-powered answers, and all answers include source citations. This means you can see which document the answer came from, ensuring reliability.

In summary, it's web-based, provides specialized agents, and delivers AI answers with source citations."

**Key Message:** "Web-based, specialized agents, AI answers with source citations"

---

### [Slide 3: Available Agents Overview] (4 minutes)

**Script:** "Currently, four agents are active.

1. **Wiki MD Agent**

	This agent uses Markdown files exported from Confluence. It contains the **same DCP documentation content** as the PDF Agent, but in a more compact format.
	
	**Key advantages of MD format:**
	
	- **Much more compact**: Contains only page content without menus, labels, or edit entries
	
	- **Source links included**: Direct links to original pages for easy reference
	
	- **Cleaner search results**: No unnecessary UI elements

	**Purpose:** Both MD and PDF agents are testing which format provides better retrieval results for daily use. Currently, MD format is preferred because it's more compact and includes source links.
	
	**When to use it:** For general DCP questions, technical documentation queries, questions about processes, APIs, or configuration. This should be your first choice for most questions.
	
	**Example questions:** 'How does the DCP checkout process work?', 'What are the configuration service APIs?', 'Explain the order fulfillment workflow.'

2. **Wiki PDF Agent**
	This agent uses PDF format for the **same content** as Wiki MD. Both agents are testing which format provides better retrieval results.
	
	**Purpose:** To compare PDF format against Markdown format and determine which provides better search results for daily use. The agents are there to check the reasonability of retrieval data.
		
	**Current status:** PDF is less compact than MD and may include menus and labels. MD format is currently preferred, but PDF Agent remains active for testing purposes.
	
	**Note:** Both PDF and MD have the same content, but MD is much more compact, has only the page contents without all the menus, labels and edit entries. Also, MD has source links.
	  
2. **GitOps Workload Agent**
	This agent specializes in GitOps, deployment, and configuration files. It can handle multiple file formats including YAML, JSON, Python scripts, shell scripts, and configuration files.
	
	**When to use it:** For questions about GitOps workflows, deployment processes, YAML or JSON configuration options, or when you need information about configuration files and scripts.
	
	**Example questions:** 'How do I configure GitOps deployment?', 'What are the YAML configuration options?', 'Explain the deployment workflow.'
	
	**Note:** This is currently a test agent and may be removed in the future.
	
2. **AICore Agent** - this is different from the others
	This is NOT a document-based agent. It's a general-purpose AI assistant that uses direct LLM access without document retrieval.
	
	**When to use it:** For general AI questions that don't require DCP documentation, or for typo correction - which happens automatically when you use other agents.
	
	**Important:** Do NOT use AICore for document-based Q&A. It won't provide source citations because it doesn't search through documents. For any DCP documentation questions, use one of the RAG agents instead.

---

### [Slide 4: Future Vision] (1 minute)

**First, Workspace functionality.** This will allow you to combine multiple fragments from different answers, integrate different sources, and enhance collaboration. You'll be able to build comprehensive answers by combining information from various responses.

**Second, History Selection.** You'll be able to access your conversation history, reference previous answers, and get context-aware responses. This means the system will remember your previous questions and provide more relevant answers based on your conversation context.

**Third, Enhanced AI Capabilities.** We're working on improved accuracy, better understanding of questions, and smarter responses. The AI will become more intelligent in interpreting your questions and providing comprehensive answers.

The key message is this: We have a tool, and we have a direction. We're using AI wherever possible and combining Wiki and other agents as sources for intelligent Q&A. These enhancements will make the tool even more powerful and user-friendly."

---

## Part 2: Live Demo (~10 minutes) - THE MAIN FOCUS

### [1. Login & Interface Overview] (1 minute)

**Script:**
"Now, let me show you the actual web UI. [Open web browser]

As you can see, this is what end users see. It's very simple. After logging in, there's an input box where you can ask questions, and a dropdown to select agents.

No complex setup or technical knowledge is required. Simply enter your question, select an agent, and receive an answer."
### [2. Agent Selection Demo] (1 minute)

**Script:**
"If you look at the agent selection dropdown, you'll see four agents available. [Show dropdown]

Each agent specializes in different areas. For example, you can use the Wiki MD agent for general DCP questions, or the GitOps agent for GitOps-related questions.

**Recommendation:** For most questions, use the **Wiki MD Agent**. It provides the best results. [Select Wiki MD Agent]"

**Key Message:** "Different agents specialize in different areas"


### [3. Question & Answer Demonstrations] (8 minutes)

#### Question 1: Short, Practical Question (2 minutes)

**Script:**
"The first question is a practical scenario: 'shop is down, what shall I do?' [Enter question]

This is a situation that could actually happen. Someone is asking what to do when the shop is down.

[Wait for answer]

As you can see, the system provided support contacts, troubleshooting steps, and a troubleshooting guide. And below the answer, there are source citations. [Show source citations]

This is the value of this tool. You can get quick, practical answers with source citations."

**Key Message:** "Practical and actionable answers with source citations"

---

#### Question 2: Long Technical Documentation Question (3 minutes)

**Script:**
"Now let's try a more complex technical question: 'How does the DCP checkout process work? Please explain step by step.' [Enter question]

This is a longer question that requires a detailed answer.

[Wait for answer]

As you can see, the system provided a detailed process explanation. It includes step-by-step descriptions, related APIs, and source citations. [Scroll through answer]

This is the strength of this tool. It can explain complex technical documentation in an easy-to-understand way."

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
- Multiple specialized agents are available
- All answers include source citations for reliability
- Conversation history maintains context

That's the entire presentation. If you have any questions, please feel free to ask."

**Key Message:** "Simple, fast, and reliable DCP documentation Q&A tool"
