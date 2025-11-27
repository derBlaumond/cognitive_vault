# DCP AI Expert Service - Presentation Script (English)
## Total Duration: ~20 minutes

---

## Part 1: PowerPoint Introduction (~10 minutes)

### [Slide 1: Agenda] (1 minute)

**Script:**
"Good morning/afternoon. Today, I'm presenting the DCP AI Expert Service.

Let me start with the agenda. Today's presentation consists of three parts:

**First, Introduction** - I'll explain what DCP AI Expert Service is and provide an overview of available agents.

**Second, Live Demonstration** - I'll show you real Q&A examples using the actual web interface.

**Third, Discussion** - We'll have a Q&A session where you can ask any questions.

Let's begin with the introduction."

**Key Message:** "Three-part presentation: Introduction, Live Demo, Discussion"

---

### [Slide 2: What It Does] (2 minutes)

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

### [3. Question & Answer Demonstrations] (8-9 minutes)

#### Question 1: Operational/Configuration Question (1-2 minutes)

**Script:**
"For this demonstration, I'll be using the **Wiki MD Agent** - our primary agent for most questions. [Show Wiki MD Agent is selected]

The first question is about operational tasks: 'how do I update jenkins certificate?' [Enter question]

This is a practical question that operations or DevOps teams might ask when they need to update certificates.

[Wait for answer]

Excellent! Look at how the Wiki MD Agent structured this answer. [Point to answer structure]

First, it provides a **Summary** at the top - a quick overview of what needs to be done. Then it breaks down into **Steps/Rules** with specific commands like 'openssl req -new' and 'kubectl edit secret'. Notice how it includes exact commands that can be copied and used directly.

It also includes **Exceptions/Cautions** - important warnings like backing up the existing certificate before making changes. This shows the system doesn't just give steps, but also helps prevent mistakes.

And look at the bottom - multiple **source citations**. [Scroll to citations] These are clickable links to the original documentation pages. For example, 'Create/Update Jenkins certificate', 'Setup Vault server', and others. You can click any of these to see the full documentation.

This demonstrates that our Wiki MD Agent provides not just information, but actionable, structured guidance with safety warnings and reliable sources."

**Key Message:** "Structured answers with Summary, Steps, Cautions, and multiple source citations"

---

#### Question 2: Access Permission Question (1 minute)

**Script:**
"Again, I'm using the **Wiki MD Agent** - our primary agent. [Show Wiki MD Agent is still selected]

Now let's ask about access permissions: 'what CAM role access into kyma?' [Enter question]

This is an important question about who can access Kyma and what roles are required.

[Wait for answer]

Perfect! The Wiki MD Agent provided a clear answer. [Point to answer]

Notice the **Summary** explains that access is managed through Cloud Access Manager roles. Then in **Steps/Rules**, it lists the specific roles: DCP XF Admin for Lead DevOps and Architects, DCP XF Developer for Developers and QA, and DCP XF View for Product Owners.

It also mentions important details like SSO login and that Admin and Developer groups can set feature toggles in Unleash.

Look at the source citations - [Scroll to citations] 'Get access to Kyma Runtime', 'Authorization Concept', and others. These links take you directly to the access documentation. [Click on one citation to demonstrate]

This is exactly the type of information users need when setting up access - specific roles, who they're for, and where to find more details."

**Key Message:** "Clear role definitions with specific use cases and direct links to access documentation"

---

#### Question 3: Problem-Solving/Troubleshooting Question (2-3 minutes)

**Script:**
"Let me show you how the Wiki MD Agent handles troubleshooting questions. [Show Wiki MD Agent is still selected]

This is a real-world scenario: 'It seems we do have an issue with the pricing service connecting to CPQ. Please suggest what to do and whom to contact?' [Enter question]

This is exactly the type of question that support teams or developers face when troubleshooting integration issues.

[Wait for answer]

This is a perfect example of how Wiki MD Agent handles complex troubleshooting! [Point to answer structure]

Look at the **Summary** - it immediately tells you that specific error codes should be followed and mentions contacting Christian Bruder for certain errors.

Then in **Steps/Rules**, it breaks down by error code: DCPP_004, DCPP_005, DCPP_006 - each with specific actions. For example, for DCPP_004, it tells you to check if the response contains 'Object reference not set' and provides exact next steps. For DCPP_006, it even gives you an email contact: marta.czarnecka@sap.com for material replication issues.

Notice the **Exceptions/Cautions** section - it mentions additional error codes like DCPP_007 and DCPP_008, and emphasizes providing all necessary details when contacting support.

And look at the source citations - [Scroll to citations] 10 different documentation sources! 'DCP Pricing Service' appears multiple times with different page numbers, showing it pulled information from various sections. There's also 'Guide - Troubleshooting Pricing issues', 'Overview - error and validation codes', and more.

[Click on one citation] These links take you directly to the troubleshooting documentation. This is incredibly valuable when you have an urgent production issue - you get both the immediate guidance AND the contacts, all in one place."

**Key Message:** "Error-code-based troubleshooting with specific contacts and comprehensive source documentation"

---

#### Question 4: Concept Comparison Question (2 minutes)

**Script:**
"Now let's try a conceptual question that requires comparing two different concepts. [Show Wiki MD Agent is still selected]

The question is: 'Explain the difference between upsell and net new ordering on DCP' [Enter question]

This is a business concept question that helps users understand the distinction between two important ordering types in DCP.

[Wait for answer]

Excellent! This answer perfectly demonstrates how Wiki MD Agent handles concept comparisons. [Point to answer structure]

The **Summary** immediately clarifies: Upsell is for additional licenses of products you already have a contract for, while net new ordering creates a new contract for products not previously purchased.

Then it breaks down each process separately. For **Upsell Process**, it explains the login requirement, the 'Get More' option, and that it's based on existing contract terms. For **Net New Ordering Process**, it explains it's for customers without prior contracts and creates 'New Business'.

Notice the **Exceptions/Cautions** - it mentions that if a product isn't enabled for upsell, it defaults to new business, and there are date restrictions for upsell start dates.

The source citations are comprehensive - [Scroll to citations] 'Business Scenarios', 'Scenario Upsell', 'CORE SCENARIOS', 'CLOUD UPSELL', 'CLOUD NET NEW', and more. These cover different aspects of both concepts.

This structured comparison makes it easy to understand when to use each process, which is crucial for business users making ordering decisions."

**Key Message:** "Clear side-by-side concept comparison with process details and business context"

---

#### Question 5: Process Documentation Question (2 minutes)

**Script:**
"Finally, let me show you how Wiki MD Agent handles process documentation questions. [Show Wiki MD Agent is still selected]

This question asks about a specific process: 'Describe TDD ordering process' [Enter question]

Process questions require step-by-step explanations, which is exactly what Wiki MD Agent is designed to handle.

[Wait for answer]

Perfect! This answer shows how Wiki MD Agent handles complex multi-step processes. [Point to answer structure]

The **Summary** gives context - it's for authorized partners purchasing test and demo materials, transitioning from 'Manage My Services'.

Then it breaks down into clear sections: **Eligibility** - who can place orders, **Order Placement** - how orders work, **Approval Workflow** - the approval process with DCP and PRM integration, **Deal Description** - the required 'TDD' prefix, and **User Interface** - the SAP for Me partnership area.

Notice the **Exceptions/Cautions** - it explains that users without 'TDD_BUY' authorization can still place orders but they'll require approval, and mentions configurable properties like reminder and cancellation days.

The source citations are extensive - [Scroll to citations] 10 different sources covering various aspects: 'TDD ordering Onboarding', 'TDD Approval Workflow', 'SAP for Me TDD card', 'Troubleshooting - Order export', and more. Each citation includes page numbers, showing it pulled information from specific sections.

This comprehensive process explanation is exactly what users need when learning a new workflow - eligibility, steps, exceptions, and where to find more details."

**Key Message:** "Comprehensive process documentation with workflow details, exceptions, and multiple source references"

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

**Remember:** For most questions, start with the **Wiki MD Agent**. It's optimized for DCP documentation and provides the best results.

That's the entire presentation. If you have any questions, please feel free to ask."

**Key Message:** "Simple, fast, and reliable DCP documentation Q&A tool - Wiki MD Agent is primary"

---

## Time Management Guide

- **Part 1 (PowerPoint):** 10 minutes
  - Slide 1 (Agenda): 1 minute
  - Slide 2 (What It Does): 2 minutes
  - Slide 3 (Available Agents): 3 minutes
  - Slide 4 (System Architecture): 2 minutes (may be explained by Boris or other team member)
  - Slide 5 (Future Vision): 2 minutes

- **Part 2 (Live Demo):** 10 minutes
  - Interface Overview: 1 minute
  - Agent Selection: 1 minute
  - Question 1 (Jenkins certificate): 1-2 minutes
  - Question 2 (CAM role/Kyma access): 1 minute
  - Question 3 (Pricing service/CPQ issue): 2-3 minutes
  - Question 4 (Upsell vs net new): 2 minutes
  - Question 5 (TDD ordering process): 2 minutes
  - Conversation History: 30 seconds (optional)

- **Closing:** 1 minute

**Total Time: ~21 minutes** (With Q&A: ~23-25 minutes)

---

## Important Notes

- ❌ DO NOT mention: Flask, SocketIO, OAuth, or other technical stacks (except in System Architecture slide if necessary)
- ❌ DO NOT explain backend architecture in detail (System Architecture slide shows high-level flow only)
- ❌ DO NOT mention Streamlit
- ✅ Focus only on what users see
- ✅ Focus only on "what you can do"
- ✅ Emphasize source citations
- ✅ System Architecture slide: Keep it high-level, focus on flow and components, not implementation details
- ✅ Live Demo: All questions use Wiki MD Agent to demonstrate it as the primary agent