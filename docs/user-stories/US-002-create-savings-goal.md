# US-002: Create Savings Goal

**Epic:** [BD-4 - Savings Goal Management](https://geminateai.atlassian.net/browse/BD-4)  
**Priority:** High  
**Status:** Ready for Development  
**Story Points:** 5

## User Story

**As a** Bargain Bank user  
**I want to** create a savings goal with a name and target amount  
**So that** I can start tracking my progress and be motivated to save for specific purposes

## Business Context

This feature enables users to set personalized savings targets, which is core to the app's gamified savings approach. Users can define goals for various purposes (emergency fund, vacation, etc.) without requiring complex categorization in the MVP.

## Acceptance Criteria

### Given/When/Then Scenarios

**Scenario 1: Successfully create a basic savings goal**

- **Given** I am a logged-in Bargain Bank user
- **When** I navigate to create a new savings goal
- **And** I enter a goal name (e.g., "Emergency Fund")
- **And** I enter a target amount (e.g., "5000")
- **Then** the goal is successfully created
- **And** I receive celebratory feedback (visual animation)
- **And** the goal appears on my dashboard
- **And** the goal shows 0% progress initially

**Scenario 2: Create a savings goal with optional deadline**

- **Given** I am creating a savings goal
- **When** I enter a goal name and target amount
- **And** I optionally set a deadline date
- **Then** the goal is created with the deadline
- **And** the deadline is displayed with the goal

**Scenario 3: Create goal with free-form target amount**

- **Given** I am creating a savings goal
- **When** I enter any positive numerical value as target amount
- **Then** the system accepts the amount (no predefined levels/milestones)
- **And** the goal is created successfully

## Technical Requirements

### Functional Requirements

- Goal name: Free text input (max 50 characters)
- Target amount: Numerical input field (positive numbers only)
- Deadline: Optional date picker
- Currency support: User's default currency
- Form validation for required fields
- Save goal to user's profile in database

### Non-Functional Requirements

- Mobile-first responsive design
- Form submission within 2 seconds
- Celebratory feedback animation (< 3 seconds duration)
- Accessible form labels and keyboard navigation
- WCAG 2.1 AA compliance

## User Interface Requirements

### Create Goal Form Fields

1. **Goal Name** (Required)
   - Text input, placeholder: "e.g., Emergency Fund"
   - Max 50 characters
2. **Target Amount** (Required)
   - Numerical input with currency symbol
   - Placeholder: "0.00"
   - Validation: Positive numbers only
3. **Deadline** (Optional)
   - Date picker
   - Future dates only
4. **Create Goal** button
   - Primary action button
   - Disabled until required fields completed

### Success State

- Celebratory animation/sparkles
- Success message: "Goal created successfully!"
- Redirect to dashboard or goal details view

## Dependencies

- User authentication system
- Database schema for goals
- Dashboard view (US-003)
- Celebratory feedback system (US-004)

## Definition of Done

- [ ] User can create a goal with name and target amount
- [ ] Optional deadline functionality works
- [ ] Goal is saved to database and associated with user
- [ ] Celebratory feedback displays on successful creation
- [ ] Goal appears on user dashboard
- [ ] Form validation prevents invalid submissions
- [ ] Mobile responsive design implemented
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Unit tests written and passing
- [ ] Integration tests cover happy path scenarios
- [ ] Code review completed
- [ ] QA testing completed with Playwright automation

## Verification & Testing

### Manual Test Cases

1. Create goal with valid name and amount
2. Create goal with name, amount, and deadline
3. Attempt to create goal with missing required fields
4. Test form validation with edge cases (negative amounts, special characters)
5. Verify responsive behavior on mobile devices

### Failure Modes (Top 5)

1. **Database Connection Failure**
   - **Risk:** Goal creation fails silently
   - **Mitigation:** Error handling with user-friendly message and retry option

2. **Invalid Amount Input**
   - **Risk:** User enters non-numerical or negative values
   - **Mitigation:** Client-side validation with real-time feedback

3. **Form Submission Timeout**
   - **Risk:** Slow network causing submission failures
   - **Mitigation:** Loading states and timeout handling with retry mechanism

4. **Celebratory Animation Performance**
   - **Risk:** Animation causes UI lag or doesn't display
   - **Mitigation:** Lightweight CSS animations with fallback to simple success message

5. **Mobile Responsiveness Issues**
   - **Risk:** Form unusable on small screens
   - **Mitigation:** Mobile-first design with thorough device testing

## Examples

### Example 1: Emergency Fund Goal

- **Name:** "Emergency Fund"
- **Target Amount:** $5,000.00
- **Deadline:** None (optional field left blank)
- **Expected Result:** Goal created, shows on dashboard with 0% progress

### Example 2: Vacation Savings Goal

- **Name:** "Hawaii Trip 2026"
- **Target Amount:** $3,500.00
- **Deadline:** December 31, 2026
- **Expected Result:** Goal created with deadline countdown, celebratory animation displays

## Open Questions

1. Should goal names be unique per user or allow duplicates?
2. What are the min/max limits for target amounts?
3. Should we persist partially completed form data?
4. What currency formats need to be supported beyond user's default?

## Jira Information

**Jira Ticket ID:** [BD-1](https://geminateai.atlassian.net/browse/BD-1)  
**Created:** February 16, 2026  
**Last Updated:** February 16, 2026
