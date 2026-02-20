# Resume Refinement Notes

Proposed changes to `src/content/resume/index.yaml` based on a Q&A session.

---

## Summary

**Target role**: Sr. Backend Engineer (or higher)
**Target industry**: Healthcare SaaS
**Work preference**: Remote

---

## Proposed Changes

### Summary section
Add: 10+ years of experience, healthcare SaaS domain, regulated environments.

---

### Dentall achievements (full rewrite, 4 → 7 bullets)

1. **Performance improvement** *(rewrite — add numbers and root cause)*
   > Achieved 10x performance improvement (response time 5s → 0.5s) by redesigning ORM entity relationships to eliminate unwanted table joins and resolving N+1 query problems, across a system handling 40–60 RPS with peaks to 100 RPS.

2. **Client onboarding** *(rewrite — add client count)*
   > Expanded platform reach by onboarding 7 new clients (20% usage increase) through dataset migration and integration with multiple vendors, supporting diverse customization requirements.

3. **NHI rule engine** *(NEW)*
   > Designed and built an extensible rule engine for Taiwan National Health Insurance (NHI) compliance, handling 100+ data formats and 200+ rule combinations with annual maintenance cycles, validated by 10,000+ Gherkin scenarios.

4. **Async report generation** *(NEW)*
   > Implemented async report generation using Java ForkJoinPool with WebSocket-based progress updates and GCP-backed secure storage, improving request throughput by fully decoupling heavy processing from the request lifecycle.

5. **CI/CD & dev tooling** *(NEW)*
   > Established CI/CD pipelines using GitHub Actions, Cloud Run, and Slack; grew test coverage from ~50% to ~80%; and built a Node.js local dev tool for Docker-managed environment provisioning and dataset switching.

6. **ISO compliance** *(rewrite — significantly shortened)*
   > Established ISO 27001 and 27701 compliance frameworks including risk assessment, access control policies, data privacy impact assessments, and incident response protocols, with continuous monitoring and cross-functional training.

7. **Engineering practices** *(rewrite — add specifics)*
   > Strengthened team engineering practices by introducing DDD, BDD, event-driven patterns, and AOP; contributed to architecture decisions for WebSocket and cache subsystems across a backend team of 6.

---

### HiTrust achievement (rewrite — add protocols and countries)
> Led feature development for a banking loan system and extended the notification platform via Apache Camel with multi-protocol support (Email, XML, JSON) across 3 countries, with end-to-end delivery including documentation, monitoring, and deployment.

---

### Synnex achievement
No changes.

---

## Context Notes
- Gap between Synnex and HiTrust (2017/02–2018/01): intentionally left blank.
- User is a highly influential senior engineer, not a formal team lead.
- NHI = Taiwan National Health Insurance — spell out for international readers.
- System scale at Dentall: 40–60 RPS, peaks to 100 RPS, team of 6.
