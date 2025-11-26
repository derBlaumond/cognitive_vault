# 예상 Q&A 리스트 (최종)
## 발표 스크립트 및 슬라이드 분석 기반

---

## Q1: 어떤 에이전트를 사용해야 하나요?

**한국어:**
**Q:** "대부분의 질문에는 어떤 에이전트를 사용해야 하나요?"

**A:** "대부분의 DCP 문서 질문에는 **Wiki MD Agent**를 사용하세요. 이것이 우리의 주력 에이전트이며 대부분의 사용 사례에 최적화되어 있습니다. GitOps나 배포 관련 질문이면 GitOps Agent를, PDF 문서에 대한 질문이면 PDF Agent를 사용할 수 있습니다. 하지만 일반적으로는 Wiki MD Agent로 시작하는 것을 권장합니다."

**English:**
**Q:** "Which agent should I use for most questions?"

**A:** "For most DCP documentation questions, use the **Wiki MD Agent**. This is our primary agent and is optimized for the majority of use cases. For GitOps or deployment-related questions, use the GitOps Agent. For PDF document questions, use the PDF Agent. However, we generally recommend starting with the Wiki MD Agent."

---

## Q2: Wiki MD와 PDF Agent의 차이점은 무엇인가요?

**한국어:**
**Q:** "Wiki MD Agent와 PDF Agent의 차이점은 무엇인가요? 둘 중 어느 것을 사용해야 하나요?"

**A:** "두 에이전트는 동일한 DCP 문서 내용을 사용하지만 형식이 다릅니다. Wiki MD Agent는 Confluence에서 내보낸 Markdown 파일을 사용하며, PDF Agent는 PDF 문서를 사용합니다. Wiki MD가 더 컴팩트하고 소스 링크가 포함되어 있어 대부분의 경우 권장됩니다. 두 에이전트는 어떤 형식이 더 나은 검색 결과를 제공하는지 테스트하기 위해 모두 활성화되어 있습니다."

**English:**
**Q:** "What's the difference between Wiki MD Agent and PDF Agent? Which one should I use?"

**A:** "Both agents use the same DCP documentation content but in different formats. Wiki MD Agent uses Markdown files exported from Confluence, while PDF Agent uses PDF documents. Wiki MD is more compact and includes source links, so it's recommended for most cases. Both agents are active to test which format provides better retrieval results."

---

## Q3: 답변의 정확성을 어떻게 확인하나요?

**한국어:**
**Q:** "AI가 제공한 답변이 정확한지 어떻게 확인할 수 있나요?"

**A:** "모든 답변 아래에 출처 인용이 포함되어 있습니다. 답변이 어느 문서에서 나왔는지, 어떤 섹션이나 페이지인지 확인할 수 있습니다. 출처 인용의 링크를 클릭하면 원본 문서 페이지로 직접 이동할 수 있어 정보를 검증하거나 더 자세한 내용을 확인할 수 있습니다. 이것이 이 도구의 신뢰성을 보장하는 핵심 기능입니다."

**English:**
**Q:** "How can I verify the accuracy of the AI-generated answers?"

**A:** "All answers include source citations below them. You can see which document the answer came from and which section or page. The links in the source citations are clickable and take you directly to the original documentation pages, allowing you to verify the information or get more details. This is a key feature that ensures the reliability of this tool."

---

## Q4: 접근 권한은 어떻게 얻나요?

**한국어:**
**Q:** "이 도구를 사용하려면 어떤 접근 권한이 필요한가요? 어떻게 접근을 얻을 수 있나요?"

**A:** "이 도구는 인증이 필요하며, Kyma, Grafana와 동일한 종류의 권한을 사용합니다. Cloud Access Manager (CAM) 역할이 필요하며, Developer, Admin 등의 역할이 적합합니다. 접근 권한에 대한 구체적인 정보는 'what CAM role access into kyma?' 같은 질문을 통해 확인할 수 있습니다."

**English:**
**Q:** "What access permissions do I need to use this tool? How can I get access?"

**A:** "This tool requires authentication and uses the same type of permissions as Kyma and Grafana. You need a Cloud Access Manager (CAM) role, and roles like Developer or Admin are suitable. You can find specific information about access permissions by asking questions like 'what CAM role access into kyma?'"

---

## Q5: 이 도구는 어떤 종류의 질문에 가장 유용한가요?

**한국어:**
**Q:** "이 도구는 어떤 종류의 질문에 가장 유용한가요?"

**A:** "이 도구는 DCP 프로세스, API, 구성, 문제 해결 등 다양한 질문에 유용합니다. 예를 들어, 'how do I update jenkins certificate?' 같은 운영 질문, 'Explain the difference between upsell and net new ordering' 같은 개념 비교 질문, 'Describe TDD ordering process' 같은 프로세스 설명 질문, 또는 'It seems we do have an issue with the pricing service connecting to CPQ' 같은 트러블슈팅 질문에 모두 좋은 답변을 제공합니다."

**English:**
**Q:** "What types of questions is this tool most useful for?"

**A:** "This tool is useful for various types of questions including DCP processes, APIs, configuration, and troubleshooting. For example, operational questions like 'how do I update jenkins certificate?', concept comparison questions like 'Explain the difference between upsell and net new ordering', process documentation questions like 'Describe TDD ordering process', or troubleshooting questions like 'It seems we do have an issue with the pricing service connecting to CPQ' all receive good answers."

---

## Q6: 답변이 충분하지 않거나 잘못되었을 때는 어떻게 하나요?

**한국어:**
**Q:** "답변이 충분하지 않거나 잘못된 정보를 제공했을 때는 어떻게 하나요?"

**A:** "답변이 충분하지 않다면, 더 구체적인 질문을 하거나 다른 에이전트를 시도해볼 수 있습니다. 또한 답변 아래의 출처 인용을 확인하여 원본 문서를 직접 참조할 수 있습니다. 출처 링크를 클릭하면 원본 문서 페이지로 이동하여 더 자세한 정보를 확인할 수 있습니다. 만약 답변이 잘못되었다고 생각되면, 출처 인용을 통해 원본 문서를 확인하여 정확성을 검증할 수 있습니다."

**English:**
**Q:** "What should I do if the answer is insufficient or provides incorrect information?"

**A:** "If the answer is insufficient, you can ask a more specific question or try a different agent. You can also check the source citations below the answer to refer directly to the original documentation. Clicking on the source links takes you to the original documentation pages where you can find more detailed information. If you think the answer is incorrect, you can verify its accuracy by checking the original documentation through the source citations."

---

## Q7: 대화 히스토리는 어떻게 사용하나요?

**한국어:**
**Q:** "대화 히스토리 기능은 어떻게 작동하나요? 이전 질문을 다시 볼 수 있나요?"

**A:** "모든 질문과 답변이 자동으로 대화 히스토리에 저장됩니다. 이전 질문을 참조하거나 답변을 다시 확인할 수 있으며, 특히 관련 주제로 작업할 때 이전 정보를 참조하는 데 유용합니다. 대화 히스토리는 여러 질문에 걸쳐 컨텍스트를 유지하는 데 도움이 됩니다."

**English:**
**Q:** "How does the conversation history feature work? Can I review previous questions?"

**A:** "All questions and answers are automatically saved in the conversation history. You can refer back to previous questions or review answers again, which is particularly useful when working on related topics and wanting to reference earlier information. The conversation history helps maintain context across multiple questions."

---

## Q8: 향후 어떤 기능이 추가될 예정인가요?

**한국어:**
**Q:** "향후 어떤 기능이나 에이전트가 추가될 예정인가요?"

**A:** "현재는 Wiki Agent를 중심으로 4개의 전문 에이전트가 실행 중입니다. 이것이 시작점입니다. 향후 계획으로는 JIRA Agent, Runtime Agent, Dynatrace Agent, Git Agent 등 더 많은 전문 에이전트를 추가하여 다양한 엔터프라이즈 도구와 서비스를 다루도록 확장할 계획입니다. 또한 TNG (Next Generation) 통합도 계획하고 있습니다. 우리는 포괄적인 multi-agent 시스템으로 발전시킬 계획입니다."

**English:**
**Q:** "What features or agents are planned for the future?"

**A:** "Currently, we have 4 specialized agents running, centered around the Wiki Agent. This is our starting point. Future plans include adding more specialized agents like JIRA Agent, Runtime Agent, Dynatrace Agent, and Git Agent to extend coverage to various enterprise tools and services. We're also planning TNG (Next Generation) integration. We plan to evolve into a comprehensive multi-agent system."

---

## Q9: 이 도구의 비즈니스 가치는 무엇인가요?

**한국어:**
**Q:** "이 도구를 사용하면 어떤 비즈니스 가치를 얻을 수 있나요?"

**A:** "이 도구는 문서 검색 시간을 크게 단축시켜 생산성을 향상시킵니다. 셀프 서비스 질의응답을 제공하여 지원 티켓을 감소시키고, 정확한 답변과 출처 인용을 통해 신뢰성을 보장합니다. 또한 복잡한 DCP 문서를 빠르게 검색하고 이해할 수 있어, 온보딩 시간을 단축하고 업무 효율성을 높일 수 있습니다."

**English:**
**Q:** "What business value does this tool provide?"

**A:** "This tool significantly reduces document search time, improving productivity. It provides self-service Q&A, reducing support tickets, and ensures reliability through accurate answers with source citations. It also allows quick search and understanding of complex DCP documentation, reducing onboarding time and improving work efficiency."

---

## Q10: 기술적 세부사항이나 아키텍처에 대해 더 알고 싶습니다.

**한국어:**
**Q:** "이 도구의 기술적 아키텍처나 구현 세부사항에 대해 더 자세히 알고 싶습니다."

**A:** "이 도구는 웹 기반 인터페이스를 통해 작동하며, 여러 전문 AI 에이전트를 사용합니다. 고수준 아키텍처는 System Architecture 슬라이드에서 보여드렸듯이, Web UI → Agent Router → Specialized Agents → Vector Retrieval → SAP HANA Cloud Vector Engine → SAP Generative AI Hub의 흐름으로 구성되어 있습니다. 중요한 것은 사용자가 기술적 세부사항을 알 필요 없이 웹 인터페이스를 통해 질문하고 답변을 받을 수 있다는 것입니다. 초점은 기능과 사용성에 있습니다."

**English:**
**Q:** "I'd like to know more about the technical architecture or implementation details of this tool."

**A:** "This tool operates through a web-based interface using multiple specialized AI agents. As shown in the System Architecture slide, the high-level architecture consists of Web UI → Agent Router → Specialized Agents → Vector Retrieval → SAP HANA Cloud Vector Engine → SAP Generative AI Hub. The important point is that users can ask questions and receive answers through the web interface without needing to know technical details. The focus is on functionality and usability."

---

## 답변 전략 요약

### 핵심 메시지 (모든 답변에서 강조)

1. **Wiki MD Agent가 주력** - 대부분의 질문에 첫 번째 선택
2. **출처 인용의 중요성** - 모든 답변에 포함되어 신뢰성 보장
3. **사용자 중심** - 기술적 세부사항보다 기능과 사용성에 집중
4. **실용적 가치** - 실제 업무에서 유용한 정보 제공
5. **확장 가능성** - 미래 계획과 비전 제시

### 기술적 질문에 대한 답변 원칙

- ✅ 사용자 관점에서 답변
- ✅ 기능과 사용성에 초점
- ✅ 구현 세부사항은 피하기
- ✅ 고수준 아키텍처만 언급 (필요한 경우)

---

**생성일:** 2024년  
**기반 파일:**
- PRESENTATION_SCRIPT_EN.md
- PRESENTATION_SCRIPT_KR.md
- POWERPOINT_SLIDE_CONTENT.md
- 슬라이드 내용 분석

