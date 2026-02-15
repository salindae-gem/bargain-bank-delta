# Project Guidelines

## Overview

This document provides guidelines for the entire team (Product Manager, Business Analyst, Developer, and QA) to collaborate effectively using AI assistance, similar to mob programming principles.

## Table of Contents

- [General Principles](#general-principles)
  - [Team Collaboration](#team-collaboration)
  - [AI Usage Guidelines](#ai-usage-guidelines)
  - [Quality Standards](#quality-standards)
  - [Ethical Considerations](#ethical-considerations)
- [Engineering Standards](#engineering-standards)
  - [Dependency Management](#dependency-management)
  - [CI/CD Best Practices](#cicd-best-practices)
  - [Git & Version Control Conventions](#git--version-control-conventions)
  - [Security Considerations and Error Handling](#security-considerations-and-error-handling)
  - [Security Guardrails](#security-guardrails)
  - [Database & Data Management](#database--data-management)
- [Incident Response & Escalation](#incident-response--escalation)
- [Compliance & Regulatory](#compliance--regulatory)
- [Product Manager (PM) Instructions](#product-manager-pm-instructions)
  - [Responsibilities](#responsibilities)
  - [AI-Assisted Tasks](#ai-assisted-tasks)
  - [Best Practices](#best-practices)
- [Business Analyst (BA) Instructions](#business-analyst-ba-instructions)
  - [Responsibilities](#responsibilities-1)
  - [AI-Assisted Tasks](#ai-assisted-tasks-1)
  - [Best Practices](#best-practices-1)
- [Developer (Dev) Instructions](#developer-dev-instructions)
  - [Responsibilities](#responsibilities-2)
  - [AI-Assisted Tasks](#ai-assisted-tasks-2)
  - [Best Practices](#best-practices-2)
  - [Design Principles](#design-principles)
  - [Development Guardrails](#development-guardrails)
  - [Code Quality Checklist](#code-quality-checklist)
- [Quality Assurance (QA) Instructions](#quality-assurance-qa-instructions)
  - [Responsibilities](#responsibilities-3)
  - [AI-Assisted Tasks](#ai-assisted-tasks-3)
  - [Best Practices](#best-practices-3)
  - [PII Data Sanitization Requirements](#pii-data-sanitization-requirements)
  - [Testing Checklist](#testing-checklist)

---

## General Principles

- Following least privilege principle which mandates that users operate with the minimum set of permissions required to perform that task
- Employ role based access control mechanisms
- Design with concurrency in mind to avoid race conditions
- Split backend and frontend into separate folders

### Team Collaboration

- **Shared Ownership**: All team members are responsible for quality and project success
- **Continuous Communication**: Maintain open channels between PM, BA, Dev, and QA
- **Knowledge Sharing**: Document learnings and share AI-assisted solutions across the team
- **Iterative Feedback**: Review AI outputs collectively to improve prompt strategies

### AI Usage Guidelines

- **Human-in-the-Loop**: AI assists, humans decide—always review and validate AI outputs
- **Context is Key**: Provide detailed, specific context in prompts for better results
- **Version Control**: Track AI-generated content alongside manual changes
- **Confidentiality**: Never share sensitive data, credentials, or proprietary information with AI tools
- **Bias Awareness**: Be mindful of potential biases in AI-generated content

### Quality Standards

- **Accuracy First**: Verify AI outputs against requirements and domain knowledge
- **Consistency**: Use standardized prompts and templates across the team
- **Traceability**: Document which outputs were AI-assisted for audit purposes
- **Continuous Improvement**: Refine prompts based on output quality over time

### Ethical Considerations

- Respect intellectual property and licensing requirements
- Ensure AI-generated content complies with organizational policies
- Maintain transparency about AI usage with stakeholders when appropriate
- Consider accessibility and inclusivity in all deliverables

---

## Engineering Standards

### Dependency Management

- Do not use deprecated libraries and tools. Keep dependencies up to date
- Use Dependabot to keep dependencies up to date
- Preplan runtime and development dependencies. Attempt to achieve a balance in both so that the application is not heavily overloaded
- Conduct proper research before incorporating a new dependency into the project
- Take necessary steps to avoid dependency hell
- Ensure dependency versions are consistent across different environments (prod and dev)
- Use tools in CI/CD pipeline to flag dependency errors
- Ensure the development team is working with the same dependency versions
- Use documentation to record dependency management policies

### CI/CD Best Practices

- Commit code in small, incremental changes to reduce merge conflicts and simplify rollbacks
- Use feature branches. Merge only after full testing and peer review
- Conduct integration testing to verify multiple modules work together
- Use automated security scanning for dependencies and code
- Implement rollback strategies in case deployment introduces issues
- Keep environments consistent across development, staging, and production

### Git & Version Control Conventions

- Use a consistent branching strategy (e.g., GitFlow or trunk-based development) agreed upon by the team
- Write meaningful commit messages following Conventional Commits format (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- Keep commits small and atomic — each commit should represent a single logical change
- Use Pull Requests (PRs) / Merge Requests (MRs) for all changes — no direct pushes to main/production branches
- Require at least one peer review approval before merging
- Define a PR template that includes: description, testing steps, screenshots (if UI), and checklist
- Use squash merging or rebase to keep commit history clean and readable
- Tag releases with semantic versioning (e.g., `v1.2.0`)
- Protect main/production branches with branch protection rules (require reviews, passing CI, no force pushes)
- Set a maximum PR review turnaround time (e.g., 24 hours) to avoid bottlenecks
- Resolve merge conflicts locally before pushing — never resolve directly in the remote UI for complex conflicts
- Use `.gitignore` to exclude build artifacts, IDE configs, and environment files from the repository

### Security Considerations and Error Handling

- Sanitize user inputs
- Have a security specific checklist for security focused code reviews
- Errors should be handled with users receiving generic messages while detailed error logs should appear internally
- Error logs should not contain secure data such as passwords, session tokens
- Differentiate between expected and unexpected Errors
- Implement detailed and structured error logging and trace IDs
- Validate arithmetic inputs and outputs to avoid integer overflows
- Do not expose internal implementation details in URLs
- Validate all path/query parameters

### Security Guardrails

- Store secrets, keys, and configuration variables in .env files and they must not exist in source code only exception is .env.example.
- .env.example should contain only dummy values.
- Authorization must be checked at service level
- File uploads must validate file type, size, and extension

### Database & Data Management

- Use a migration tool (e.g., Flyway, Liquibase, Alembic, Knex migrations) for all schema changes — never modify schemas manually in any environment
- Follow consistent naming conventions for tables, columns, indexes, and constraints (e.g., snake_case, singular table names)
- Define and enforce indexing guidelines — index frequently queried columns; avoid over-indexing write-heavy tables
- Set query performance expectations (e.g., API-serving queries should complete within 100ms) and profile slow queries regularly
- Implement connection pooling to manage database connections efficiently
- Use parameterized queries or ORM-provided methods — never concatenate user input into SQL strings
- Define data retention and archival policies — remove or archive stale data on a schedule
- Implement and regularly test backup and restoration procedures; document Recovery Point Objective (RPO) and Recovery Time Objective (RTO)
- Use read replicas or caching layers for read-heavy workloads to reduce primary database load
- Keep referential integrity enforced at the database level via foreign keys and constraints
- Document the data model (ERD or data dictionary) and keep it updated with every schema change
- Separate transactional (OLTP) and analytical (OLAP) workloads where applicable

---

## Incident Response & Escalation

### Severity Definitions

| Severity      | Description                                               | Response Time        | Examples                                          |
| ------------- | --------------------------------------------------------- | -------------------- | ------------------------------------------------- |
| P0 — Critical | Complete system outage or data breach affecting all users | Immediate (< 15 min) | Production down, security breach, data loss       |
| P1 — High     | Major feature broken, significant user impact             | < 1 hour             | Payment processing failure, authentication broken |
| P2 — Medium   | Feature degraded, workaround available                    | < 4 hours            | Slow performance, non-critical feature broken     |
| P3 — Low      | Minor issue, minimal user impact                          | Next business day    | UI glitch, cosmetic issue, minor bug              |

### Escalation Process

- **Detection**: Automated alerts (monitoring/APM) or user-reported issues trigger the process
- **Triage**: On-call engineer assesses severity and assigns the appropriate level
- **Communication**: Notify the relevant channel (e.g., Slack #incidents) with severity, impact summary, and owner
- **Escalation Path**: If unresolved within the response time, escalate to team lead → engineering manager → VP of Engineering
- **Resolution**: Apply fix or mitigation, verify in production, confirm with affected users/stakeholders
- **Post-mortem**: Conduct a blameless post-mortem within 48 hours for all P0/P1 incidents

### Post-mortem Template

- **Incident Summary**: What happened and when
- **Timeline**: Chronological sequence of events from detection to resolution
- **Root Cause**: The underlying cause (not just symptoms)
- **Impact**: Number of users affected, duration, revenue/data impact
- **What Went Well**: Things that helped in detection or resolution
- **What Went Wrong**: Gaps in process, tooling, or communication
- **Action Items**: Concrete follow-ups with owners and deadlines to prevent recurrence

### On-Call Expectations

- Maintain a documented on-call rotation schedule
- On-call engineers must acknowledge alerts within the defined response time
- Provide runbooks for common failure scenarios to enable faster resolution
- Review and update runbooks after every incident

---

## Compliance & Regulatory

### Data Protection Regulations

- Identify and comply with all applicable data protection laws (e.g., GDPR, CCPA, HIPAA, PDPA) based on user geography and data type
- Maintain a Record of Processing Activities (ROPA) documenting what personal data is collected, why, and how it is processed
- Implement lawful basis for data processing (consent, legitimate interest, contract, legal obligation)
- Provide mechanisms for users to exercise their data subject rights: access, rectification, erasure, portability, and objection
- Define and enforce data retention schedules — do not retain personal data longer than necessary

### Consent & Privacy

- Collect explicit, informed consent before processing personal data where required
- Provide clear, accessible privacy notices that explain data collection and usage
- Implement cookie consent management in compliance with applicable regulations
- Allow users to withdraw consent as easily as they gave it
- Conduct Data Protection Impact Assessments (DPIAs) for high-risk processing activities

### Audit & Accountability

- Maintain audit logs for all data access, modifications, and deletions involving sensitive or personal data
- Ensure audit logs are tamper-proof and retained according to compliance requirements
- Conduct periodic internal audits to verify compliance with policies and regulations
- Designate a Data Protection Officer (DPO) or equivalent role if required by regulation
- Document and regularly review data processing agreements with third-party vendors

### Data Residency & Transfer

- Store data in regions compliant with applicable data residency requirements
- Use approved transfer mechanisms (e.g., Standard Contractual Clauses, adequacy decisions) for cross-border data transfers
- Document and regularly review the geographic locations of all data storage and processing

### Compliance Checklist

- [ ] Applicable regulations identified and documented
- [ ] Privacy notices and consent mechanisms implemented
- [ ] Data subject rights request process established
- [ ] Data retention schedules defined and enforced
- [ ] Audit logging enabled for sensitive data operations
- [ ] Third-party vendor data processing agreements in place
- [ ] Data Protection Impact Assessments completed where required
- [ ] Team trained on compliance requirements relevant to their role

---

## Product Manager (PM) Instructions

### Responsibilities

- Define product vision and requirements
- Prioritize features and backlog
- Stakeholder communication
- Success metrics definition

### AI-Assisted Tasks

1. **Requirements Gathering**

   ```
   Prompt example: "Generate user story template for [feature] targeting [user persona]"
   ```

2. **Product Roadmap Creation**

   ```
   Prompt example: "Create a quarterly roadmap structure for [product type]"
   ```

3. **Competitive Analysis**

   ```
   Prompt example: "What are key features to analyze when comparing [product category]?"
   ```

4. **Metrics Definition**
   ```
   Prompt example: "Suggest KPIs for measuring success of [feature/product]"
   ```

### Best Practices

- Always validate AI-generated user stories with real user feedback
- Use AI for initial drafts, refine with team input
- Document decisions and rationale alongside AI suggestions
- Don't rely solely on AI for prioritization decisions
- Don't share sensitive business data with AI tools

---

## Business Analyst (BA) Instructions

### Responsibilities

- Requirements analysis and documentation
- Process mapping and optimization
- Bridge between business and technical teams
- Acceptance criteria definition

### AI-Assisted Tasks

1. **Requirements Documentation**

   ```
   Prompt example: "Convert this meeting transcript into functional requirements for [system]"
   ```

2. **Use Case Development**

   ```
   Prompt example: "Generate use case scenarios for [user role] interacting with [feature]"
   ```

3. **Process Flow Creation**

   ```
   Prompt example: "Describe the process flow for [business process] in steps"
   ```

4. **Gap Analysis**

   ```
   Prompt example: "Compare current state [X] with desired state [Y] and identify gaps"
   ```

5. **Acceptance Criteria Writing**
   ```
   Prompt example: "Generate acceptance criteria for user story: [story]"
   ```

### Best Practices

- Validate requirements with stakeholders before finalizing
- Use AI to identify edge cases and scenarios
- Create templates for consistency across documentation
- Don't accept AI-generated requirements without domain validation
- Don't skip stakeholder review sessions

### Don't Dos:

#### Structural

- Mix multiple requirements in one user story
- Add new features beyond the provided idea
- Expand scope unless explicitly instructed
- Mix BRD, SOW, and technical design content
- Write paragraphs without structured headings
- Leave requirements unnumbered
- Suggest architecture changes
- Add integration assumptions
- Use casual language, conversational filler or storytelling

#### Content

- Write vague requirements like "fast, secure, efficient, scalable, improve performance"
- Write implementation details in requirements
- Assume everyone understands technical context
- Write technical implementation steps
- Include database terms
- Write subjective words such as, “fast”, “secure”, “user-friendly”, “robust”, “efficient”, “seamless”, “high performance”.
- Use emotional language instead of business impact
- Leave non-functional requirements undefined
- Write BRD/SOW statements without measurable KPIs
- Use “etc.” or “and more”
- Say “system should comply with regulations” without specifying which regulation

#### Banking And Finances

- Assume "Delete" exists as in banking, records are never deleted; they are marked as inactive or reversed via a contra-entry
- Write a time-based requirement without specifying the timezone
- Use a generic number for financial values.
- Assume a sensitive action (fund transfer, limit change) is performed by one person.

### Do:

#### Structural

- Break content into structured sections
- Separate Functional vs Non-Functional Requirements
- Maintain traceability references
- Use business language for stakeholders
- Keep language formal and audit-ready
- Always assign unique IDs to requirements and reference them in related documents.
- Always map requirements with SOW document scope
- MUST maintain Consistent terminology, Same naming conventions, Same ID structure, Same formatting, Same measurement units

#### Content

- Always follow the "As a [role], I want [action], So that [benefit]" format to create user stories.
- Always provide measurable, testable acceptance criteria for each user story.
- Quantify costs and benefits
- One requirement per user story
- Provide context and examples
- Convert subjective words into measurable metrics,for example Instead of “improve performance” → “Reduce transaction processing time from 8 seconds to ≤ 2 seconds for 95% of transactions”
- Highlight assumptions clearly
- Mark out-of-scope items explicitly
- Flag missing critical information instead of inventing it
- If information is missing, state: “Assumption-01: [Description] — Requires stakeholder validation.”
- always include: Failure handling scenario, Invalid input scenario, System downtime scenario, Unauthorized access scenario, Duplicate processing scenario (such as financial transactions)
- Use shall/must for mandatory requirements
- Use may for optional capabilities

#### Banking And Finances

- Specify the Currency Code (ISO 4217) and the Decimal Precision (e.g., 2 decimal places for USD, 0 for JPY).
- Every sensitive action must have a "Maker" (Initiator) and a "Checker" (Approver)
- For any UI-related user story involving PII (Personally Identifiable Information) or PCI (Payment Card Industry) data, specify masking requirements (e.g., "Display only last 4 digits of PAN").
- Always specify the rounding convention (e.g., "Round half-up," "Floor," or "Ceiling") for interest or fee calculations.

---

## Developer (Dev) Instructions

### Responsibilities

- Code implementation
- Technical architecture decisions
- Code reviews
- Technical documentation
- Security risk assessment (Assess for security risks in code and architecture)

### AI-Assisted Tasks

1. **Code Generation**

   ```
   Prompt example: "Implement [function/feature] in [language] following [pattern/standard]"
   ```

2. **Code Review**

   ```
   Prompt example: "Review this code for security vulnerabilities, performance issues, and best practices: [code]"
   ```

3. **Debugging**

   ```
   Prompt example: "Explain this error and suggest fixes: [error message and context]"
   ```

4. **Refactoring**

   ```
   Prompt example: "Refactor this code to improve readability and maintainability: [code]"
   ```

5. **Documentation**

   ```
   Prompt example: "Generate API documentation for this endpoint: [code]"
   ```

6. **Test Case Creation**
   ```
   Prompt example: "Generate unit tests for this function: [code]"
   ```

### Best Practices

- Always review and understand AI-generated code before committing
- Test all AI-generated code thoroughly
- Use AI for boilerplate and repetitive tasks
- Verify security implications of AI suggestions
- Don't blindly copy-paste code without understanding
- Don't commit untested AI-generated code
- Don't share proprietary code or sensitive data with AI tools
- Avoid using obscure naming for functions, variables and data types
- Follow consistent naming conventions across codebase
- Comments should not be too lengthy, must explain only the context of the function
- Use a consistent coding style throughout the project
- Keep interfaces and type definitions simple and purpose-driven
- Structure project in a modular fashion, separating concerns by functionality

### Design Principles

- Follow Single Responsibility Principle. Each service/module should handle only one core responsibility
- Avoid tight coupling. Services communicate through defined interfaces/APIs, not internal implementations
- Group endpoints in a clear hierarchical structure
- Use human-readable paths
- URLs should represent application state where possible (bookmarkable & shareable)
- Implement explicit API versioning
- For multi-server deployments, store sessions in shared storage (DB/cache/token) instead of server memory

### Development Guardrails

- No direct database access outside repository layer
- Controllers must only validate input and call services
- Keep functions and methods small and focused (single responsibility)
- Avoid duplicate code. Create reusable utilities

### Code Quality Checklist

- [ ] Code follows team standards and conventions
- [ ] All edge cases are handled
- [ ] Error handling is implemented
- [ ] Code is properly tested
- [ ] Documentation is complete
- [ ] Security considerations are addressed
- [ ] Code is optimized for best performance

---

## Quality Assurance (QA) Instructions

### Responsibilities

- Test planning and strategy
- Test case design and execution
- Bug reporting and tracking
- Quality metrics and reporting
- Implementing test automation
- Maintaining automation testcases

### AI-Assisted Tasks

1. **Test Case Generation**

   ```
   Prompt example: "Generate test cases for [feature] covering positive, negative, and edge cases"
   ```

2. **Test Data Creation**

   ```
   Prompt example: "Generate test data for [scenario] with [constraints]"
   ```

3. **Bug Report Enhancement**

   ```
   Prompt example: "Improve this bug report with steps to reproduce: [initial report]"
   ```

4. **Test Automation Scripts**

   ```
   Prompt example: "Generate Selenium/Cypress test script for [user flow]"
   ```

5. **API Testing**

   ```
   Prompt example: "Create API test cases for [endpoint] with various payloads"
   ```

6. **Exploratory Testing Guidance**
   ```
   Prompt example: "Suggest exploratory testing scenarios for [feature]"
   ```

### Best Practices

- Validate AI-generated test cases against requirements
- Execute AI-generated tests and verify results
- Use AI to identify missing test scenarios
- Combine AI suggestions with domain expertise
- Don't rely solely on AI-generated test coverage
- Don't skip manual exploratory testing
- Don't assume AI understands all business rules

### PII Data Sanitization Requirements

Before releasing any data to QA environments, ensure all Personally Identifiable Information (PII) is sanitized:

#### Data Types to Sanitize

| PII Type             | Sanitization Method          | Example                               |
| -------------------- | ---------------------------- | ------------------------------------- |
| Full Names           | Replace with synthetic names | John Doe → Test User 001              |
| Email Addresses      | Use fake domain              | john@company.com → user001@test.local |
| Phone Numbers        | Replace with fake numbers    | 555-123-4567 → 000-000-0001           |
| SSN/National IDs     | Mask or replace entirely     | 123-45-6789 → XXX-XX-XXXX             |
| Credit Card Numbers  | Use test card numbers        | 4111-1111-1111-1111                   |
| Physical Addresses   | Use generic addresses        | 123 Test Street, Test City            |
| Date of Birth        | Randomize or offset          | Keep age range, change specific date  |
| IP Addresses         | Anonymize                    | 192.168.x.x or 10.0.0.x ranges        |
| Bank Account Numbers | Replace with test values     | Use fake account patterns             |
| Medical/Health Data  | Remove or replace entirely   | Use synthetic health records          |

#### Sanitization Checklist

- [ ] Database exports are scrubbed before import to QA
- [ ] Log files are reviewed and PII removed
- [ ] Configuration files contain no production credentials
- [ ] API responses use mock/synthetic data
- [ ] Test data generators use faker libraries (not real data)
- [ ] Screenshots/recordings are reviewed for visible PII
- [ ] Third-party integrations point to sandbox environments

#### AI-Assisted Sanitization

```
Prompt example: "Generate synthetic test data for [number] users with realistic but fake names, emails, and addresses"
```

```
Prompt example: "Create a data masking script for [database type] that anonymizes [PII fields]"
```

#### Best Practices for PII Handling

- ✅ Use data masking tools (e.g., Faker, Bogus, Mockaroo)
- ✅ Automate sanitization as part of the release pipeline
- ✅ Maintain referential integrity when anonymizing
- ✅ Document which fields contain PII in data dictionaries
- ❌ Never copy production data directly to QA without sanitization
- ❌ Never use real customer data for testing
- ❌ Never share unsanitized data via email or chat

### Testing Checklist

- [ ] All acceptance criteria are covered
- [ ] Positive and negative scenarios tested
- [ ] Edge cases identified and tested
- [ ] Integration points verified
- [ ] Performance tested (if applicable)
- [ ] Security tested (if applicable)
- [ ] Accessibility checked (if applicable)
- [ ] PII data sanitized and verified before testing
- [ ] No production credentials in test environment

### Security & Compliance Focus

- Always prioritize data security and confidentiality in all generated code.
- Ensure compliance with banking regulations (e.g., KYC, AML, PCI-DSS where applicable).
- Never expose sensitive data such as account numbers, CVV, PIN, or OTP in logs.
- Mask sensitive fields in UI and API responses.
- Enforce strong password validation rules.
- Suggest multi-factor authentication (MFA) where authentication is involved.
- Validate role-based access control (RBAC) for all modules.
- Ensure proper session timeout and auto logout logic.
- Prevent SQL injection, XSS, CSRF, and other OWASP Top 10 vulnerabilities.
- Recommend encryption for data in transit (HTTPS/TLS) and at rest.

### Functional Testing Perspective

- Validate all mandatory fields before submission.
- Ensure correct error messages for invalid inputs.
- Check boundary values for amount fields (min/max transaction limits).
- Validate correct currency formatting and rounding rules.
- Ensure correct transaction status updates (Pending, Success, Failed, Reversed).
- Validate duplicate transaction prevention logic.
- Ensure correct balance calculation after each transaction.
- Validate transaction history accuracy and sorting.
- Ensure proper validation for date formats.
- Validate business rules for interest, charges, and fees.

### API Testing Focus

- Validate correct HTTP status codes.
- Ensure APIs return consistent and structured JSON responses.
- Validate error response structure and error codes.
- Ensure proper authentication tokens are required for secured APIs.
- Validate token expiration handling.
- Check rate limiting and throttling behavior.
- Ensure idempotency for critical APIs (e.g., fund transfer).
- Validate API response time within acceptable SLA.
- Ensure no sensitive information is exposed in API responses.
- Validate backward compatibility of APIs after changes.

### Transaction & Payment Testing

- Ensure atomicity of transactions (no partial updates).
- Validate rollback mechanism on transaction failure.
- Ensure double debit does not occur.
- Validate concurrency handling for simultaneous transactions.
- Test transaction behavior during network interruption.
- Validate daily transfer limits enforcement.
- Validate scheduled/recurring transaction execution.
- Ensure accurate ledger updates.
- Validate notification triggers (SMS/Email) after transactions.
- Validate reversal and refund workflows.

### Data Integrity & Accuracy

- Ensure database consistency after every transaction.
- Validate audit trail logging for critical actions.
- Ensure timestamp consistency (server time vs user time).
- Validate report generation accuracy.
- Ensure reconciliation data matches transaction records.

### Performance & Reliability

- Validate system behavior under high load.
- Ensure graceful error handling during server downtime.
- Validate failover and backup mechanisms.
- Ensure system scalability considerations are followed.
- Validate performance benchmarks for peak banking hours.
