# Agent Comparison Guide
## Understanding Each Agent's Differences and Use Cases

Based on codebase analysis of `agents.yaml` and agent implementations.

---

## Active Agents Overview

Currently, **4 agents are active**:
1. **📚 DCP Wiki MD (wikiv4)** - **RECOMMENDED FOR MOST QUESTIONS**
2. **📚 DCP Wiki PDF (wiki)** - PDF-based documentation
3. **🛠️ GitOps Workload (gitops-workload)** - GitOps and configuration files
4. **🧠 SAP AICore Service (aicore)** - General-purpose AI assistant

---

## Detailed Agent Comparison

### 1. 📚 DCP Wiki MD (wikiv4) - **RECOMMENDED**

**Status:** ✅ Active  
**Type:** RAG Agent (Document-based Q&A)

#### **Data Source:**
- **File Format:** Markdown (.txt files)
- **Source:** Confluence-exported pages
- **Location:** `docs/wikiv4/`
- **Content:** Page content only (exported from Confluence)

#### **Chunking Strategy:**
- **Method:** Recursive Text Character Splitter (RTCS)
- **Chunk Size:** 1000 characters
- **Overlap:** 150 characters
- **Why:** Larger chunks (1000) preserve more context, overlap ensures continuity

#### **Search Strategy:**
- **Type:** Maximal Marginal Relevance (MMR)
- **Parameters:**
  - `k`: 10 documents returned
  - `fetch_k`: 50 documents fetched for MMR
  - `lambda_mult`: 0.7 (moderate diversity)
- **Why:** MMR balances relevance and diversity, preventing repetitive answers

#### **Specialties:**
- Checkout order processes
- Configuration service manuals
- API reference documentation
- System implementation guides

#### **When to Use:**
✅ **Best for:** General DCP questions, technical documentation queries  
✅ **Best for:** Most common questions about DCP processes, APIs, configuration  
✅ **Recommended for:** First choice for most users

#### **Example Questions:**
- "How does DCP checkout process work?"
- "What are the configuration service APIs?"
- "Explain the order fulfillment workflow"
- "How do I configure checkout?"

---

### 2. 📚 DCP Wiki PDF (wiki)

**Status:** ✅ Active  
**Type:** RAG Agent (Document-based Q&A)

#### **Data Source:**
- **File Format:** PDF (.pdf files)
- **Source:** Multi-page PDF documents
- **Location:** `docs/wiki/`
- **Content:** Chunked PDF content

#### **Chunking Strategy:**
- **Method:** Recursive Text Character Splitter (RTCS)
- **Chunk Size:** 1000 characters
- **Overlap:** 150 characters
- **Why:** Same chunking as wikiv4, but applied to PDF content

#### **Search Strategy:**
- **Type:** Maximal Marginal Relevance (MMR)
- **Parameters:**
  - `k`: 10 documents returned
  - `fetch_k`: 50 documents fetched for MMR
  - `lambda_mult`: 0.7 (moderate diversity)
- **Why:** Same search strategy as wikiv4

#### **Specialties:**
- Checkout order processes
- Configuration service manuals
- API reference documentation
- System implementation guides

#### **When to Use:**
✅ **Best for:** Questions about PDF-based documentation  
✅ **Use when:** You know the information is in PDF format  
⚠️ **Note:** Less commonly used than wikiv4 (Markdown is preferred)

#### **Key Difference from wikiv4:**
- **Source format:** PDF vs. Markdown
- **Same chunking and search strategy**
- **Same specialties** - but different source documents

---

### 3. 🛠️ GitOps Workload (gitops-workload)

**Status:** ✅ Active (Test agent, may be removed)  
**Type:** RAG Agent (Document-based Q&A)

#### **Data Source:**
- **File Formats:** Multiple formats supported
  - `.txt` - Text files
  - `.md` - Markdown files
  - `.json` - JSON configuration files
  - `.py` - Python scripts
  - `.sh` - Shell scripts
  - `.yaml` - YAML configuration files
  - `.config` - Configuration files
- **Source:** GitOps-related files and configurations
- **Location:** `docs/gitops-workload/`
- **Content:** GitOps deployment files, configuration files, scripts

#### **Chunking Strategy:**
- **Method:** Recursive Text Character Splitter (RTCS)
- **Chunk Size:** 1000 characters
- **Overlap:** 150 characters
- **Why:** Same chunking as wikiv4, suitable for code and config files

#### **Search Strategy:**
- **Type:** Maximal Marginal Relevance (MMR)
- **Parameters:**
  - `k`: 10 documents returned
  - `fetch_k`: 50 documents fetched for MMR
  - `lambda_mult`: 0.7 (moderate diversity)
- **Why:** Same search strategy as other RAG agents

#### **Specialties:**
- Checkout order processes (same as wiki agents)
- Configuration service manuals
- API reference documentation
- System implementation guides

#### **When to Use:**
✅ **Best for:** GitOps-related questions  
✅ **Best for:** Deployment and configuration questions  
✅ **Best for:** Questions about YAML, JSON, or script files  
⚠️ **Note:** This is a test agent and may be removed in the future

#### **Example Questions:**
- "How do I configure GitOps deployment?"
- "What are the YAML configuration options?"
- "Explain the deployment workflow"

---

### 4. 🧠 SAP AICore Service (aicore)

**Status:** ✅ Active  
**Type:** Integration Agent (NOT RAG-based)

#### **Data Source:**
- **No document storage** - This is NOT a RAG agent
- **Direct LLM access** via SAP Generative AI Hub
- **No vector database** - Uses LLM directly

#### **Functionality:**
- **General-purpose AI assistant**
- **Typo correction** (used by other agents)
- **Direct LLM queries** without document retrieval
- **Session history support**

#### **When to Use:**
✅ **Best for:** General AI questions (not document-specific)  
✅ **Best for:** Typo correction (automatic, used by other agents)  
✅ **Best for:** Questions that don't require document context  
❌ **NOT for:** Document-based Q&A (use RAG agents instead)

#### **Key Differences from RAG Agents:**
- **No document retrieval** - Direct LLM access
- **No source citations** - Answers from LLM knowledge
- **Faster responses** - No vector search overhead
- **General knowledge** - Not limited to DCP documentation

---

## Inactive Agents (For Reference)

### 5. 🏢 DCP Business Expert (business)

**Status:** ❌ Inactive  
**Type:** RAG Agent

#### **Key Characteristics:**
- **File Format:** PDF (.pdf files)
- **Chunking:** Smaller chunks (500/50) - more granular
- **Search:** MMR with higher diversity (lambda_mult: 0.3)
- **Specialties:** Business scenarios, customer workflows, NGCS, promotional discounts

#### **Why Inactive:**
- Currently not in use
- May be reactivated for business-specific questions

---

## Agent Selection Guide

### **Decision Tree:**

```
Is your question about DCP documentation?
│
├─ YES → Is it about GitOps/deployment/config files?
│        │
│        ├─ YES → Use GitOps Workload Agent
│        │
│        └─ NO → Is the source PDF or Markdown?
│                │
│                ├─ PDF → Use Wiki PDF Agent
│                │
│                └─ Markdown (or unknown) → Use Wiki MD Agent (wikiv4) ⭐ RECOMMENDED
│
└─ NO → Is it a general AI question (not document-specific)?
        │
        └─ YES → Use AICore Agent
```

### **Quick Reference Table:**

| Agent | Best For | Data Source | Chunking | Search Type |
|-------|----------|-------------|----------|-------------|
| **wikiv4** ⭐ | **Most DCP questions** | Markdown (Confluence) | 1000/150 | MMR (k=10) |
| **wiki** | PDF documentation | PDF files | 1000/150 | MMR (k=10) |
| **gitops-workload** | GitOps, configs | Multiple formats | 1000/150 | MMR (k=10) |
| **aicore** | General AI, typo correction | None (direct LLM) | N/A | N/A |

---

## Technical Differences Summary

### **Chunking Strategies:**

| Agent | Chunk Size | Overlap | Method | Why |
|-------|------------|---------|--------|-----|
| wikiv4 | 1000 | 150 | RTCS | Preserves context, good for Markdown |
| wiki | 1000 | 150 | RTCS | Same as wikiv4, for PDF |
| gitops-workload | 1000 | 150 | RTCS | Same as wikiv4, for code/config |
| business (inactive) | 500 | 50 | RTCS | Smaller chunks, more granular |

### **Search Strategies:**

| Agent | Search Type | k | fetch_k | lambda_mult | Diversity |
|-------|-------------|---|---------|-------------|-----------|
| wikiv4 | MMR | 10 | 50 | 0.7 | Moderate |
| wiki | MMR | 10 | 50 | 0.7 | Moderate |
| gitops-workload | MMR | 10 | 50 | 0.7 | Moderate |
| business (inactive) | MMR | 8 | 50 | 0.3 | High |

**MMR Explanation:**
- **k**: Number of documents returned to user
- **fetch_k**: Number of documents fetched for MMR algorithm
- **lambda_mult**: Diversity parameter (0=max diversity, 1=min diversity)
  - Lower value (0.3) = More diverse results
  - Higher value (0.7) = More relevant results

---

## Presentation Talking Points

### **For End Users:**

1. **"Which agent should I use?"**
   - **Answer:** "For most questions, use **Wiki MD Agent (wikiv4)**. It's the best choice for general DCP documentation questions."

2. **"What's the difference between Wiki MD and Wiki PDF?"**
   - **Answer:** "They have the same capabilities, but Wiki MD uses Markdown files (from Confluence), while Wiki PDF uses PDF documents. Wiki MD is recommended for most questions."

3. **"When should I use GitOps Agent?"**
   - **Answer:** "Use it for questions about deployment, configuration files, YAML, or GitOps workflows. Note: This is currently a test agent."

4. **"What about AICore Agent?"**
   - **Answer:** "AICore is a general-purpose AI assistant. It's not for document-based questions. It's used automatically for typo correction."

### **Key Messages:**

- **"Wiki MD (wikiv4) is the recommended agent for most questions"**
- **"Different agents specialize in different document types"**
- **"All RAG agents provide answers with source citations"**
- **"AICore is for general AI, not document Q&A"**

---

## Example Questions by Agent

### **Wiki MD (wikiv4) - Recommended:**
- ✅ "How does DCP checkout process work?"
- ✅ "What are the configuration service APIs?"
- ✅ "Explain the order fulfillment workflow"
- ✅ "How do I configure checkout?"
- ✅ "What are the API endpoints for order processing?"

### **Wiki PDF:**
- ✅ "What does the PDF documentation say about checkout?"
- ✅ "Explain the process from the PDF manual"

### **GitOps Workload:**
- ✅ "How do I configure GitOps deployment?"
- ✅ "What are the YAML configuration options?"
- ✅ "Explain the deployment workflow"
- ✅ "How do I set up the configuration files?"

### **AICore:**
- ✅ General questions not requiring documentation
- ✅ Typo correction (automatic)

---

## Summary

**For Presentation:**

1. **Wiki MD (wikiv4)** is the **recommended agent** for most questions
2. **Wiki PDF** is for PDF-based documentation (less commonly used)
3. **GitOps Workload** is for GitOps/deployment questions (test agent)
4. **AICore** is NOT for document Q&A - it's a general AI assistant

**Key Takeaway:** "For most DCP documentation questions, use **Wiki MD Agent (wikiv4)**. It's optimized for Markdown content from Confluence and provides the best results."

---

**Last Updated:** Based on codebase analysis of `agents.yaml` and agent implementations  
**Status:** Active agents as of current configuration

