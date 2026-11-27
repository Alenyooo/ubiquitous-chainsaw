# Applying AI in the Enterprise (aaieP) – course notes

Brno University of Technology (VUT), 2026/2027 winter term. Course code aaieP (Moodle course id 308619).
Lecturers: doc. Ing. Radek Doskočil, Ph.D., MSc (guarantor; managerial decision-making, risk & project management) and Ing. Matej Havlas (cyber security, AI, solution architecture). Student: Alen Abrahamyan.

Passing: mandatory exercises (every other Monday 19:00) + semester project + exam. Lectures (Mondays 17:00) optional. Format may change ("first time teaching it").

Course motto: the goal is not to use AI for its own sake but to decide whether automation is economically justified. "Start with a problem, not a product."

---

## Semester project ("Semester work" in Moodle)

Analyse a real process → As-Is → problems → decide per activity → To-Be → business case → risks → management recommendation.

Required deliverables (9): 1 process description · 2 As-Is diagram · 3 current-process analysis · 4 automation opportunity analysis · 5 To-Be diagram · 6 technology explanation · 7 economic analysis · 8 risk analysis · 9 final recommendation.

To-Be labels (mandatory): HUMAN · AUTOMATION · AI-ASSISTED · AI-PERFORMED · HUMAN APPROVAL · REMOVED.

Formulas: Net benefit = annual benefit − annual operating cost · ROI = net benefit ÷ initial investment × 100% · Payback = initial investment ÷ net benefit. Time saved ≠ cash saved (say what happens to freed hours). Separate one-time and recurring costs. Sensitivity check (e.g. benefit halved). Risks as risk → consequence → mitigation. Recommendation options: implement · pilot · redesign · reject (a negative conclusion can be a good project).

**Alen's project:** "Restaurant Phone Reservations & Table Seating – AI Redesign" (fictional Restaurace U Lípy, Brno). Files in `Restaurant_AI_Assignment/` (report v2 .docx/.pdf, slides PDF, figures). Slides deck artifact: https://claude.ai/artifact/Y65XXJ6rUVu9khsgprDP64. Key numbers: phone agent + SMS initial €3,300, operating €6,305/yr, benefit €13,107/yr, net €6,802, ROI 206%, payback 5.8 months; camera €3,300 / €1,400 / €5,272 / €3,872 / 117% / 10 months; combined pessimistic phone case ROI 57%, payback 21 months. Design rules the user asked for: no customer database (bookings deleted 7 days after visit), no call recordings (text summaries 14 days), camera blurs faces on device and stores nothing; recognition features excluded. Decision: implement phone agent (1-month trial), pilot camera after DPIA, reject face recognition.

(An earlier draft of the project used the stream-clipping process; the Docs artifact https://claude.ai/artifact/AhWwZvDkD5crsYLunWToLb and deck https://claude.ai/artifact/8eXdVYYiUwm6bMMegnpEX5 belong to that version.)

---

## Lecture 1 – Introduction
Why AI projects fail (Gartner 2025: many GenAI projects cancelled by end of 2026): unclear value proposition, poor data quality, underestimated costs, no risk analysis, herd mentality, naive ROI (benefit/cost ratio not adjusted for maturity, complexity, data quality). In scope: generative AI, business use, critical and ethical evaluation. Out of scope: AI engineering, advanced maths, specialist legal detail.

## Lecture 2 – Key principles and technologies
- AI = umbrella; ML learns from data; generative AI creates content. Rule-based vs learning systems: fixed rules → traditional automation is often better.
- Predictive AI ("what will happen?") vs generative AI ("what content?").
- Training changes parameters; inference uses the model. Parameters vs hyperparameters. Generalisation, overfitting.
- Neural networks: neurons, weights, bias, activation functions (hardlim, purelin, logsig, tansig), forward pass, loss, backpropagation (computes gradients) + optimiser (gradient descent).
- Transformers: context, attention/self-attention, positional info, parallel training; generation is autoregressive (token by token, sequential).
- Probabilistic vs stochastic vs non-deterministic. Plausibility ≠ truth; fluent ≠ correct ≠ verified.
- Tokens (not words/characters), context window, embeddings (vectors in semantic space), relational DB (exact) vs vector DB (similarity) vs LLM (interpret + generate). An LLM is not a database. RAG preview.
- AI model vs AI system (model + data + software + rules + permissions + tools + monitoring + human oversight). Hallucination/confabulation vs sycophancy; calibrated uncertainty, abstention.

## Lecture 3 – AI safety
Three layers: **system safety** (can it be manipulated/compromised?), **human safety** (can people be harmed?), **decision safety** (is this output reliable enough for this decision?). Weakest link defines the chain.
- Training risks: data poisoning, backdoors, model theft/extraction, training-data privacy. Frameworks: NIST AI 100-2e2025, NIST AI 600-1, OWASP GenAI Top 10 (LLM01 prompt injection, LLM02 sensitive info disclosure, LLM06 excessive agency).
- Inference: prompt injection (direct / indirect via documents, web, email) vs jailbreak (bypass safety rules). External content = data, not authority.
- Attack surface: model → prompt → data → software/API → tools → company systems. Capability changes risk. **Least privilege** (excessive functionality / permissions / autonomy). Data + access + ability to act = impact.
- Data leakage, confidentiality vs privacy, "free" ≠ costless, Shadow AI, logging & monitoring.
- EU AI Act: risk-based, not a ban; prohibited / high-risk / transparency obligations / minimal. Provider vs deployer vs affected person. AI literacy (Art. 4). Compliance ≠ safety.
- Timeline (as of Oct 2026): enforcement + transparency obligations from 2 Aug 2026; Annex III high-risk from 2 Dec 2027; product-embedded high-risk from 2 Aug 2028.
- Social engineering, phishing, deepfakes, manipulation, over-reliance, automation bias, rubber-stamping, discrimination via historical data/proxies.
- Reliability depends on consequence. Human-in-the-loop vs human-on-the-loop. Meaningful oversight needs authority, competence, time, information, ability to stop. Risk ≈ probability × impact. Safe failure: escalate, don't guess.

## Lectures 4–5 – LLMs and chatbots
- LLM = model; chatbot/assistant = system (LLM + system instructions + UI + history + memory + data + tools + permissions + controls).
- Pre-training → base model → post-training (SFT, RLHF) → chat model. Fine-tuning changes parameters; prompting changes instructions; RAG changes context. Don't fine-tune to add current facts.
- Context window (desk) vs memory (filing cabinet). Conversational continuity is a system feature.
- Chatbot evolution: rule-based → FAQ/retrieval → LLM chatbot → grounded assistant → tool-using assistant. Not every chatbot needs an LLM; use the simplest reliable technology.
- Model evaluation vs system evaluation; benchmarks ≠ business performance; build realistic test sets. Failure modes: hallucination, ambiguity, stale context, poor instructions, over-trust, wrong tool result. Capability does not transfer responsibility.

## Lecture 6 – Prompting
Prompting = requirement specification. Framework **Goal · Context · Sources · Expectations**. Define what "good" looks like. Different tasks (summarise, extract, classify, analyse, compare, recommend) need different instructions. Structure (TASK/CONTEXT/DATA/REQUIREMENTS/OUTPUT). Zero-shot vs few-shot. Iterative prompting with diagnostic feedback. Ground in evidence ("say if the source doesn't support it"). Use AI as a challenger (sycophancy). Myths: no perfect prompt, longer ≠ better, "think step by step" not universal, good prompt ≠ correct answer. Jailbreak attacks guardrails; prompt injection attacks instructions; worse when AI has tools → least privilege + human approval.

## Lecture 7 – Agents, Skills, Projects
Model → chatbot → assistant → agent (generates / converses / helps / acts). Agent = repeatedly decide → act → observe → decide (agent loop). Anatomy: goal + model + instructions + context/state + tools + skills + guardrails + trigger. **Project** = context/workspace; **Skill** = procedure/playbook (how); **Tool** = capability (what it can do); **Agent** = coordinates toward the goal. Autonomy ladder 0–5 (model, chatbot, assistant, agent, triggered agent, multi-agent). Blast radius. Agent security table: prompt injection, excessive permissions, wrong reasoning, tool error, autonomous loop, sensitive data. Approval by impact: low = automatic, medium = act + log, high = recommend → human approves. Does the task need an agent? Fixed rules → automation; one AI transformation → AI-assisted workflow; human control → assistant; multi-step choices → consider an agent.

## Lecture 8 – RAG and augmented generation
Model knowledge vs external knowledge; context is the bridge. Augment knowledge, context, memory, capabilities. RAG = retrieve → augment → generate (automated context construction). Indexing (chunk → embed → store) and runtime retrieval. Failure modes: retrieval miss, irrelevant chunks, stale data, context overload, unsupported answers, poor sources ("retrieval quality is the ceiling"). Hybrid RAG (keyword + vector + metadata + reranking), GraphRAG (relationships), Multimodal RAG, CRAG (evaluate retrieval), Self-RAG (decide whether to retrieve), Adaptive RAG (route by complexity), RAPTOR (hierarchical summaries), Agentic RAG. CAG (preload stable knowledge; RAG for freshness, CAG for speed/stable), KAG (structured knowledge, rules), tool-augmented ("tools turn language into action"), memory-augmented. Security: unauthorised retrieval, excessive tool permissions, poisoned documents, memory poisoning, injection via retrieved content. "Design the system, not just the prompt."

## Lectures 9–10 – AI in business processes and evaluating AI investments ("AI can do it. Should we invest?")
- Adoption ≠ value (77% deployed, ~25% measurable ROI). Start with the problem; quantify the pain; ask if simpler rules would fix it.
- Running case: customer inquiries (As-Is 6 manual steps, 2–3 days). Find the real bottleneck (classification, repeated data gathering, inconsistency, rework, approval delays, handoff losses).
- Human judgment vs rules-based automation vs AI (AI where inputs vary, patterns matter, outcomes probabilistic). To-Be with human approval before anything reaches the customer.
- Value levers: cost & capacity, quality & revenue. "No outcome, no value."
- Costs to build (licences, integration, data prep, training, pilot) vs costs to run (API, maintenance, oversight) vs quantified benefits.
- Worked example: 1,000 inquiries/month, 15 → 4 min, €15/h, €2,750 saving, €800 AI cost, €1,950 net/month, €24,000 implementation, payback ~12 months, 3-year ROI ≈ 190%.
- "What if our assumption is wrong?": volume, savings per case, accuracy/rework, adoption speed, cost overrun (pessimistic vs optimistic).
- AI ROI is structurally uncertain; readiness is a cost driver. Framework: **value + readiness + risk & control** must align; positive ROI is necessary but not sufficient (Project A vs B, same 35% ROI).
- AI funnel (process formalisation → analysis → tool analysis → data → rules → solution); conceptual model (org maturity, solution complexity, data & process health); **AI radar** (strategic alignment, organisational capabilities, solution complexity, data and process health, cybersecurity readiness, data governance, data quality, technical feasibility, risk and regulatory fit, process reliability); investment = gap between use case and org maturity.
- Risks need owners and controls (privacy & data, security, accuracy & bias, human oversight). Final question: sound decision under uncertainty, or just a technology purchase?

## Lectures 11–12 – Risk management, ethics, governance
- AI creates value and risk; more autonomy/access = bigger blast radius. Risk landscape: technical, cybersecurity, business, legal/compliance, ethical/societal.
- Risk = effect of uncertainty on objectives (ISO 31000); likelihood × impact (1–5); inherent vs residual; rare events can still need strong controls. Example: recruitment ranking 3×4=12 → 2×4=8 with controls, owner Head of Talent Acquisition.
- Treatment: avoid, mitigate, share, accept ("you can transfer the financial consequences, not the accountability").
- Human-in-the-loop / on-the-loop / out-of-the-loop. Lifecycle: design → evaluate → deploy → monitor → respond → improve.
- Legal vs ethical vs safe (example: AI productivity monitoring of employees). Who deserves protection: direct users, affected people, data subjects, society. Bias: historical data, proxies, accuracy ≠ fairness, test across groups. Transparency, explainability, accountability, right to challenge.
- Data lifecycle (collection, training, prompts, retrieval, outputs, storage, deletion): lawful basis, purpose limitation, minimisation, retention, confidentiality, memorisation, third-party transfers.
- Governance: who approves, owns risks, accesses data, monitors compliance, responds to incidents. Frameworks: EU AI Act (fines up to €35m / 7%), GDPR (€20m / 4%; Art. 22 automated decisions; DPIA; privacy by design), NIS2 (€10m / 2%; incident report 24 h early warning, 72 h notification; management accountable). Standards: ISO/IEC 42001 (AI management system, certifiable), 23894 (AI risk), 27090 (AI security), 27091 (AI privacy, FDIS). Standards support compliance, they don't equal it.
- Organisational controls: AI inventory, risk classification, usage policy, AI literacy, human accountability, monitoring, audit evidence. Risk table format: risk | consequence | mitigation | owner | framework.
- Goal: informed, responsible, defensible decisions, not zero risk.

## Lecture 13 – Trends in AI (not yet provided)
