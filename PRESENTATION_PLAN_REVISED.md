# DCP AI Expert Service - Revised Presentation Plan
## User-Focused Demo Presentation Strategy

---

## Executive Summary

Based on senior feedback, the presentation strategy has been revised to focus on **demonstrating the tool's practical value** rather than technical architecture. The presentation will be **demo-driven** with minimal PowerPoint slides, emphasizing **what users can do** rather than **how it's built**.

---

## Presentation Strategy: Demo-First Approach

### **Total Duration: ~20 minutes**

#### **Part 1: Brief Introduction (3-4 slides, ~10 minutes)**

**Slide 1: Title & Purpose**
- DCP AI Expert Service
- Purpose: Intelligent Q&A for DCP documentation

**Slide 2: What It Does**
- Web-based interface for asking questions about DCP
- Multiple specialized agents available
- AI-powered answers with source citations

**Slide 3: Available Agents Overview**
- **Wiki MD Agent**: Best for general DCP questions (Markdown-based, Confluence exports)
- **PDF Agent**: For PDF-based documentation (chunked PDFs)
- **GitOps Agent**: For GitOps-related questions (test agent, may be removed)
- **AICore Agent**: General-purpose assistant

**Slide 4: Future Vision**
- Workspace for combining fragments
- History picks
- Enhanced AI capabilities

**Key Message**: "We have a tool, we have a direction - use AI wherever possible. We're combining Wiki and other agents as sources for intelligent Q&A."

---

#### **Part 2: Live Demo (~10 minutes) - THE MAIN FOCUS**

**Demo Flow:**

1. **Login & Interface Overview** (1 min)
   - Show web UI
   - Explain: "This is what end users see - a simple interface to ask questions"

2. **Agent Selection Demo** (1 min)
   - Show agent dropdown
   - Explain: "Different agents specialize in different areas"
   - **Recommendation**: Use Wiki MD agent (best for most questions)

3. **Question & Answer Demonstrations** (8 min)
   
   **Prepare 4-5 pre-tested questions:**
   
   **Question Set 1: Short, Practical Questions**
   - Example: "shop is down, what shall I do?"
   - Expected: Answer with support contacts, troubleshooting steps
   - **Why**: Shows practical, actionable answers
   
   **Question Set 2: Technical Questions**
   - Example: "How does DCP checkout process work?"
   - Expected: Detailed answer with steps and citations
   - **Why**: Demonstrates technical documentation capability
   
   **Question Set 3: Agent-Specific Questions**
   - Show which agent to use for which type of question
   - Demonstrate agent specialization
   
   **Question Set 4: Complex Questions**
   - Multi-part questions
   - Questions requiring context from multiple sources
   
   **Question Set 5: Edge Cases** (if time permits)
   - Show how system handles unclear questions
   - Demonstrate source citations

**Demo Best Practices:**
- ✅ Use questions that **give good answers** (pre-tested)
- ✅ Show **source citations** - "Here's where the answer came from"
- ✅ Demonstrate **different agents** for different question types
- ✅ Keep it **user-focused** - "This is what you can do"
- ❌ **DO NOT** mention: Flask, SocketIO, OAuth, Streamlit, backend architecture
- ❌ **DO NOT** show code or technical implementation details

---

## Key Messages (User Perspective)

### **What Users See:**
- A web interface
- An input box to ask questions
- Answers with source citations
- Multiple agents to choose from

### **What Users Can Do:**
- Ask questions about DCP documentation
- Get intelligent answers with sources
- Choose specialized agents for different topics
- Access conversation history

### **Why It's Valuable:**
- Faster access to documentation
- Self-service Q&A
- Accurate answers with source tracking
- Multiple specialized knowledge domains

---

## What NOT to Present

### **Technical Details to Avoid:**
- ❌ Flask, SocketIO, OAuth implementation
- ❌ Backend architecture details
- ❌ Code structure (app.py, modules, etc.)
- ❌ Streamlit (not used anymore)
- ❌ Technical migration story (Streamlit → Flask)
- ❌ Database structure details
- ❌ API endpoints
- ❌ Configuration files structure

### **Why:**
- **End users don't care** about backend technology
- **High-level users** only see the UI
- **Focus should be on capabilities**, not implementation
- **Time is limited** - focus on value demonstration

---

## Agent Differentiation Guide

### **For Presentation:**

**Wiki MD Agent (wikiv4)** - **RECOMMENDED FOR DEMO**
- **Best for**: General DCP questions
- **Source**: Confluence-exported Markdown pages
- **When to use**: Most common questions about DCP processes, APIs, configuration

**PDF Agent (wiki)**
- **Source**: Chunked PDF documents
- **When to use**: PDF-based documentation queries
- **Note**: Less commonly used

**GitOps Agent (gitops-workload)**
- **Source**: GitOps-related files (yaml, json, config files)
- **When to use**: GitOps, deployment, configuration questions
- **Note**: Test agent, may be removed

**AICore Agent**
- **Type**: General-purpose assistant
- **When to use**: Typo correction, general AI questions
- **Note**: Not for document-based Q&A

---

## Question Preparation Strategy

### **Task: Prepare Pre-Tested Questions**

**Requirements:**
- Questions that **give good answers** (not "I don't have enough information")
- Mix of **short and long questions**
- **Defect and correct questions** (show error handling)
- **Real-world scenarios** (like "shop is down, what shall I do?")

### **Question Categories:**

1. **Practical/Operational Questions**
   - "shop is down, what shall I do?"
   - "How do I configure checkout?"
   - "What are the support contacts?"

2. **Technical Documentation Questions**
   - "How does DCP checkout process work?"
   - "What are the API endpoints for order processing?"
   - "Explain the configuration service architecture"

3. **Process/Workflow Questions**
   - "What is the order fulfillment workflow?"
   - "How do I set up a new payment method?"

4. **Troubleshooting Questions**
   - "Why is my order not processing?"
   - "What causes checkout failures?"

### **Question Selection Criteria:**
- ✅ Answers are **actionable and useful**
- ✅ Answers include **source citations**
- ✅ Answers demonstrate **agent capabilities**
- ✅ Questions are **realistic** (what users would actually ask)
- ❌ Avoid questions that return "I don't have enough information"

---

## Presentation Flow (Revised)

### **Opening (2 minutes)**
- Brief introduction: "We have a new tool for DCP documentation Q&A"
- Show web UI: "This is what you see - simple interface"

### **Agent Overview (2 minutes)**
- Quick explanation of available agents
- **Focus**: "Different agents for different types of questions"
- **Recommendation**: "Wiki MD is best for most questions"

### **Live Demo (12-14 minutes)**
- **This is the main part**
- Ask pre-prepared questions
- Show answers with sources
- Demonstrate different agents
- Show conversation history

### **Future Vision (1-2 minutes)**
- Workspace capabilities
- History picks
- Enhanced features

### **Q&A (2-3 minutes)**
- Address user questions
- Focus on **usage**, not technical details

---

## Preparation Checklist

### **Before Presentation:**

- [ ] **Prepare PowerPoint**: 3-4 slides only (introduction, agents overview, future vision)
- [ ] **Test Questions**: Prepare 4-5 questions that give good answers
  - [ ] Test each question with appropriate agent
  - [ ] Verify answers are useful and have sources
  - [ ] Prepare short and long question examples
- [ ] **Agent Familiarity**: Understand what each agent does from **user perspective**
- [ ] **Demo Environment**: Ensure web UI is running and accessible
- [ ] **Practice Demo**: Practice asking questions and showing results
- [ ] **Remove Technical Content**: Remove all backend/technical slides

### **During Presentation:**

- [ ] **Focus on UI**: Show what users see
- [ ] **Demonstrate Value**: Show practical, useful answers
- [ ] **Avoid Technical Terms**: No Flask, SocketIO, OAuth, etc.
- [ ] **Keep It Simple**: "You ask questions, you get answers with sources"
- [ ] **Time Management**: Keep intro short, focus on demo

---

## Key Success Factors

1. **Demo Quality**: Questions must give good answers
2. **User Focus**: Always think from end-user perspective
3. **Simplicity**: Don't overwhelm with technical details
4. **Practical Value**: Show real-world use cases
5. **Time Efficiency**: Brief intro, maximum demo time

---

## Revised Talking Points

### **Instead of:**
- "We built this with Flask and SocketIO..."
- "The architecture has 7 layers..."
- "We migrated from Streamlit to Flask..."

### **Say:**
- "You can ask questions about DCP documentation"
- "Different agents specialize in different areas"
- "Answers include source citations so you know where information came from"
- "This tool helps you find information faster"

---

## Next Steps

1. **Immediate**: Schedule meeting with senior to understand agent specialties
2. **Question Preparation**: Collect and test good questions from team members
3. **PowerPoint Creation**: Create 3-4 slide introduction
4. **Demo Practice**: Practice demo flow with pre-tested questions
5. **Agent Research**: Understand each agent's capabilities from user perspective

---

## Summary

**Old Approach**: Technical architecture presentation (20+ slides, technical focus)  
**New Approach**: Brief intro + Live demo (3-4 slides, user-focused demo)

**Key Shift:**
- From "How it's built" → To "What you can do"
- From "Technical details" → To "Practical value"
- From "Architecture explanation" → To "Tool demonstration"

**Success Metric**: Can users understand what the tool does and how to use it? (Not: Do they understand the technical architecture?)

---

**Status**: Revised per senior feedback | **Focus**: User demonstration, not technical presentation

