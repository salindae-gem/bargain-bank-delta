# US-003: View Savings Goals on Dashboard

**Epic:** [BD-4 - Savings Goal Management](https://geminateai.atlassian.net/browse/BD-4)  
**Priority:** High  
**Status:** Ready for Development  
**Story Points:** 3

## User Story

**As a** Bargain Bank user  
**I want to** view my savings goals on the dashboard  
**So that** I can quickly see my progress and stay motivated to save

## Business Context

The dashboard serves as the central hub where users can monitor their savings goals at a glance. This visibility is crucial for maintaining user engagement and motivation in their savings journey.

## Acceptance Criteria

### Given/When/Then Scenarios

**Scenario 1: View dashboard with existing goals**

- **Given** I am a logged-in user with saved goals
- **When** I navigate to the dashboard
- **Then** I see all my savings goals displayed
- **And** each goal shows name, target amount, and current progress
- **And** goals are sorted by creation date (newest first)

**Scenario 2: View dashboard with no goals**

- **Given** I am a logged-in user with no saved goals
- **When** I navigate to the dashboard
- **Then** I see an empty state message
- **And** I see a call-to-action to "Create Your First Goal"

**Scenario 3: View goal with deadline**

- **Given** I have a goal with a deadline
- **When** I view the dashboard
- **Then** I see the deadline date displayed with the goal
- **And** I can see days remaining until deadline

## Technical Requirements

### Functional Requirements

- Fetch user's goals from database
- Display goal cards in responsive grid layout
- Show progress percentage (0-100%)
- Handle empty states gracefully
- Sort goals by creation date

### Non-Functional Requirements

- Page load time under 3 seconds
- Mobile-first responsive design
- Smooth scrolling for multiple goals
- Accessibility compliance (WCAG 2.1 AA)
- Progressive loading for large goal lists

## User Interface Requirements

### Goal Card Components

Each goal card displays:

1. **Goal Name** (Truncated if too long)
2. **Progress Bar** (Visual percentage indicator)
3. **Current Amount** / **Target Amount**
4. **Progress Percentage** (e.g., "25% complete")
5. **Deadline** (if set) - "X days remaining"

### Dashboard Layout

- Grid layout: 2 columns on mobile, 3+ on larger screens
- Card-based design with consistent spacing
- Header: "Your Savings Goals" with goal count
- Empty state: Motivational message with create goal button

### Visual Design

- Progress bars with gradient colors
- Consistent card shadows and borders
- Goal completion celebration indicators
- Responsive typography for different screen sizes

## Dependencies

- User authentication system
- Goal creation functionality (US-002)
- Database with goals schema
- Progress calculation system

## Definition of Done

- [ ] Dashboard displays all user goals in card format
- [ ] Each goal shows name, target, current amount, and progress
- [ ] Goals with deadlines show remaining days
- [ ] Empty state handled with appropriate messaging
- [ ] Responsive design works on all screen sizes
- [ ] Loading states implemented for data fetching
- [ ] Error handling for failed goal retrieval
- [ ] Accessibility requirements met
- [ ] Unit tests for dashboard components
- [ ] Integration tests for goal data display
- [ ] Performance tested with multiple goals
- [ ] QA testing completed

## Verification & Testing

### Manual Test Cases

1. View dashboard with 1-5 goals
2. View dashboard with no goals (empty state)
3. Test responsive behavior across devices
4. Verify goal data accuracy (amounts, percentages)
5. Test loading states and error scenarios

### Failure Modes (Top 5)

1. **Goal Data Load Failure**
   - **Risk:** Dashboard shows forever loading or blank screen
   - **Mitigation:** Error boundaries with retry functionality

2. **Performance Issues with Many Goals**
   - **Risk:** Slow rendering with large goal lists
   - **Mitigation:** Virtual scrolling or pagination for 10+ goals

3. **Progress Calculation Errors**
   - **Risk:** Incorrect percentages displayed
   - **Mitigation:** Server-side calculation validation and testing

4. **Mobile Layout Breaking**
   - **Risk:** Goals not displaying properly on small screens
   - **Mitigation:** Thorough responsive design testing

5. **Stale Data Display**
   - **Risk:** Dashboard shows outdated goal information
   - **Mitigation:** Proper cache invalidation and data refresh strategies

## Examples

### Example 1: Dashboard with Active Goals

- **Goal 1:** "Emergency Fund" - $1,250 / $5,000 (25% complete)
- **Goal 2:** "Hawaii Trip 2026" - $500 / $3,500 (14% complete, 318 days remaining)
- **Display:** Two goal cards in responsive grid, progress bars showing completion

### Example 2: Empty Dashboard

- **Message:** "Start your savings journey!"
- **Subtext:** "Create your first savings goal and watch your progress grow."
- **Button:** "Create Your First Goal"

## Open Questions

1. Should goals be sortable by different criteria (progress, deadline, amount)?
2. How many goals should we show before implementing pagination?
3. Should completed goals remain visible on dashboard?
4. Do we need filters for active vs completed goals?

## Jira Information

**Jira Ticket ID:** [BD-2](https://geminateai.atlassian.net/browse/BD-2)  
**Created:** February 16, 2026  
**Last Updated:** February 16, 2026
