# Doña Inés

## 1. Summary
Doña Inés is a mobile application that helps people maintain their homes by remembering recurring household tasks, tracking when they were last performed, and identifying what needs attention next. Running a home requires remembering several small tasks: changing bedsheets and towels, descaling coffee machines, replacing filters,  watering and fertilizing plants, cleaning appliances, rotating mattresses, grooming pets, and performing seasonal maintenance. These activities are individually simple but collectively create significant mental overhead. 

Existing calendars and task managers can schedule recurring reminders, but they require users to determine what needs to be done, establish an appropriate schedule, and continually maintain that system. Instead, Doña Inés models household maintenance as care performed over time. The fundamental unit is not a task that disappears when completed, but a persistent care item with a history of occurrences. The application can therefore answer a simple but frequently difficult question: “When did I last do this?”.

The initial product will be a local-first iOS and Android application built with React Native, Expo, TypeScript, and SQLite. Users will create or select household care items, record when activities are performed, view their history, establish desired maintenance intervals, and see which parts of the household need attention. A curated library will help users discover maintenance activities they may not otherwise consider.

The application is personified by Doña Inés, an experienced household matriarch who is quiet, competent, severe, and subtly judgmental. Her personality differentiates the experience from conventional task-management applications without requiring generative AI. The MVP will implement this personality through deterministic application states and curated copy (although future iterations of the app may include character development of digital twins with different personalities that better adapt to the user’s preferences).

The MVP intentionally excludes accounts, cloud synchronization, shared households, generative AI, and external integrations. Its purpose is to validate whether users repeatedly rely on a persistent household memory and whether that memory reduces the cognitive effort required to maintain a home.

## 2. Vision
Doña Inés should become the operational memory of the household. Like the ship’s computer in StarTrek, or this humble creator in his own home. A well-maintained home depends on a large number of tasks performed at irregular intervals. People should not need to remember when the washing-machine filter was last cleaned, when the mattress was rotated, or whether the coffee machine was descaled six weeks or six months ago.

Doña Inés remembers. The long-term product vision is an assistant that understands the household, what it contains, how it is maintained, and how the people living there prefer to care for it and share responsibilities.

The product begins with structured household maintenance rather than artificial intelligence. Its first responsibility is to reliably know:
* What needs to be cared for.
* When it was last cared for.
* How frequently it normally requires attention.
* What currently deserves attention.
* What can safely wait.

Over time, this structured household knowledge can support increasingly sophisticated assistance, including personalized routines, shared household coordination, maintenance recommendations, natural-language queries, and eventually an LLM-powered Doña Inés capable of reasoning about household state. The structured household model remains authoritative. Future AI capabilities consume that information rather than replacing it. 

The desired experience is not one of managing chores. Users should feel that someone competent is quietly keeping track of the details.

| Situation | Doña Inés says |
|---|---|
| When everything is fine, Doña Inés has little to say... | *Everything is in order.* |
| When something needs attention... | *The coffee machine needs descaling.* |
| When something has been ignored... | *The sheets. Twelve days...* |

## 3. Problem
Household maintenance has two related problems: **memory and knowledge**.

### 3.1 Memory
Many household activities are performed frequently enough to matter but infrequently enough to forget. Thus, people routinely ask themselves questions such as: When did I last change the sheets? When did I replace that filter? When did I clean the refrigerator? And the answer is often an approximation.

Existing productivity tools typically represent these activities as recurring tasks, such as “Change bedsheets Every Sunday”, but this assumes household maintenance follows a fixed calendar. Reality is different: If the sheets are changed Saturday, Sunday’s reminder is unnecessary. If the reminder is ignored Sunday, the system provides little context about how long the task has actually been neglected.

To address this issue, Doña Inés records events. For example, bedsheets were changed September 27, 19, 11, 3. From this history, the application can derive events like: last changed - 1 day ago, typical interval - 8 days. The system therefore reflects what actually happened rather than what a calendar predicted would happen.

### 3.2 Knowledge
The second problem is knowing what maintenance exists in the first place. People acquire appliances, furniture, plants, clothing, and other possessions without necessarily knowing how they should be maintained. Someone may know that an espresso machine requires descaling but not know that its water filter also requires periodic attention. Someone may simply never have considered cleaning a washing-machine filter, rotating a mattress, washing pillows, or maintaining seals around the shower door.

Doña Inés should therefore help answer: What am I forgetting? A curated maintenance library allows users to discover relevant household care without requiring them to design a household-maintenance system themselves.

## 4. User Experience
The primary Doña Inés experience is a household status, not a to-do list. Opening the application should immediately answer: How are things?

A typical home screen might show: GOOD MORNING, Everything is mostly in order.

| NEEDS ATTENTION | LOOKING GOOD |
|---|---|
| *Coffee machine*<br>Descaled 47 days ago. | *Plants*<br>Watered 3 days ago. |
| *Bedsheets*<br>Changed 9 days ago. | *Towels*<br>Changed 4 days ago. |
|  | *Refrigerator*<br>Cleaned 12 days ago. |

*Items are ordered according to the attention they require rather than creation date or arbitrary calendar scheduling.*

## 4.1 Recording care
The most common interaction should require one action.

The user opens an item and selects: Done today. Doña Inés creates an occurrence and recalculates the item’s state. For activities performed previously, the user can select another date. The system never destroys the previous occurrence when a new one is recorded.

## 4.2 Care status
Every care item has a desired interval and derived status. An initial model can use: good, approaching, due, or overdue. For a 4-week target interval, an initial implementation might classify the first 1-3 weeks as good, the fourth week as approaching, the actual due date as due, and overdue any time afterwards. These thresholds are product behavior rather than permanent domain assumptions and should remain configurable and adaptive.

## 4.3 Discovering care
Users should not have to construct their household from an empty screen. Doña Inés provides starter collections such as: Kitchen, Bathroom, Bedroom, Laundry, Appliances, Plants, Pets, Wardrobe, Seasonal, etc. Selecting an appliance or area reveals suggested care. For example, for Espresso machine it shows: Clean drip tray,  Clean brew group, Backflush, Descale, Replace water filter. The user selects the activities relevant to their household, while recommendations remain suggestions rather than automatically assigned obligations.

## 4.4 Personality
Doña Inés is present throughout the application, but she does not dominate it. Her personality is expressed through restrained language.
Good	Approaching	Due	Overdue	Very Overdue
“Everything is in order”	“This will need attention soon”	“It’s time…”	“This should have been done X days ago”	“X days overdue. Interesting…”
The MVP uses curated responses selected according to application state. No language model is required for the first product iteration. Her judgment should provide humor and character without shaming users or making the application unpleasant to use.

# 5. MVP
The MVP exists to test one primary hypothesis: Will people repeatedly use a persistent household memory to help maintain their homes? Every MVP capability should support testing that hypothesis.

## 5.1 Product Capabilities
Capability	Description
Household	The application creates one local household. The user may optionally give it a name. No account is required, as the application runs locally on their mobile device.
Care Items	Users can create, retrieve, update, archive, and delete care items. Each item contains: name, category, action, desired interval, icon. Example: “Coffee machine”, “Kitchen”, “Descale coffee machine”, “Every 45 days”, coffee machine icon.

Occurrences	Users record when care was performed. An occurrence contains: Care item, date/time, optional note. Users can add historical occurrences and correct or delete erroneous entries.

Household Status	The home screen calculates the current state of every active care item and prioritizes items requiring attention. The user can immediately distinguish between care statuses (good, approaching, due, overdue, very overdue). 

History	Each care item provides a chronological history. For example: Descale coffee machine, last done: 28 September, Previous: 12 August, 24 June, 11 May. Typical interval: 46 days. Historical information is calculated from occurrences rather than manually maintained.

Starter Library	The application ships with a curated set of common household care activities and suggested intervals. Users can add recommendations to their household and modify them. The initial library should remain intentionally small and high quality rather than attempting to model every possible household. 

Notifications	Notifications are optional and conservative. Rather than issuing many individual alerts, Doña Inés summarizes upcoming attention. For example: Three things could use attention this weekend. Users control notification behavior.

## 5.1 Explicit MVP Exclusions
The MVP does not include: User accounts, Cloud synchronization, Shared households, Generative AI, Chat, Voice interaction, Smart-home integrations, Automatic appliance recognition, Email or calendar access, Receipt scanning, Household inventory, Subscription infrastructure.

These capabilities should not be introduced until the core household-memory experience demonstrates value.

# 6. Technical Architecture
Doña Inés will use a local-first architecture. The mobile client will use: React Native, Expo, TypeScript, Expo Router. Persistent data will initially use: SQLite. The application must remain fully functional without connectivity.

## 6.1 Architecture Diagram
[Pending diagram]

The domain layer must not depend on React Native, Expo, or SQLite. This allows persistence and synchronization mechanisms to evolve without rewriting household business logic.

## 6.2 Core Domain Model
[Pending diagram]

Recommendations remain separate from user-created care items. Adding a recommendation to the household creates a CareItem that the user owns and can modify independently.

## 6.3 Application Services
Business operations should be expressed through explicit application services such as: CreateCareItem, UpdateCareItem, AddAction, RecordOccurrence, DeleteOccurrence, GetHouseholdStatus, GetCareItemHistory, AddRecommendation, CalculateCareStatus
This prevents UI components from becoming responsible for domain logic.

## 6.4 Repository Boundary
Persistence is accessed through interfaces such as: CareItemRepository, OccurrenceRepository, HouseholdRepository, RecommendationRepository

The MVP implementations use SQLite. A future synchronization layer can therefore be introduced without changing consumers of these interfaces.

## 6.5 Future Backend Compatibility
Although no backend is required for the MVP, the architecture should avoid decisions that make synchronization unnecessarily difficult. Identifiers should therefore use globally unique IDs rather than SQLite auto-incrementing integers. Records should contain creation and modification timestamps where appropriate. Deletion semantics should anticipate eventual synchronization.

The eventual service architecture can introduce: NestJS, PostgreSQL, Prisma
Redis / BullMQ, Object Storage without changing the fundamental domain model.
The mobile application remains authoritative for immediate interaction and offline behavior, while the server becomes responsible for synchronization, backup, shared households, and computational services.

# 7. Tenets
**The home is not a project.**
Doña Inés will not turn domestic life into project management. We avoid backlogs, productivity scores, streaks, points, completion percentages, and unnecessary gamification that adds to the cognitive load and pressures for users to complete tasks.

**Record reality, not schedules.**
What actually happened is more valuable than what was supposed to happen. Occurrence history is therefore a foundational product concept. While target dates are recorded, the more valuable data is occurrence date. 

**Inés remembers so the user doesn’t have to.**
The product exists to reduce cognitive load. Any feature that requires substantial ongoing administration must justify the burden it creates. If the user has to remember something, the app has failed. 

**Attention is more useful than urgency.**
Most household maintenance is not urgent. Doña Inés prioritizes what deserves attention without manufacturing emergencies.

**Silence is a feature.**
A well-run household should result in fewer interruptions, not more. When everything is fine, Doña Inés should largely stay out of the way.

**Suggestions are not obligations.**
Recommended maintenance intervals provide guidance. Users control their own homes, schedules, standards, and routines.

**History is never an implementation detail.**
Historical occurrences enable answers, personalization, corrections, trends, and future intelligence. We preserve events rather than overwriting state.
Structured data owns the truth.

**Household state must remain deterministic and inspectable.** 
Future AI can interpret and communicate that state but does not become the authoritative source for it.

**Personality should not compromise utility.**
Doña Inés can be severe, quiet, and judgmental because that makes the product memorable. The joke stops where frustration, shame, or ambiguity begins.

**Earn complexity.**
The MVP uses the smallest architecture capable of delivering the product correctly while preserving clear evolution paths. Cloud infrastructure, accounts, integrations, and AI are introduced when customer needs justify them, not because they are technically interesting.

# 8. User Stories
## 8.1 Epic: MVP
This epic consists of the minimum viable product of the Doña Inés app. It covers all functionality described in the 6-pager and allows users to track the maintenance of items in their home.
### 8.1.1 Feature: First-time use and setup
This feature consists of all functionality needed for users to set up their household for the first time. It includes stories related to identifying categories (e.g., kitchen, bathroom, appliances, electrical, backyard, etc.), and defining care items within the category. From here users should be able to start setting occurrences for actions needed to maintain the care items.

#### User Stories
As a user, I want Doña Inés to greet me when I open the app first, so that I can tell her my name and start configuring my household. **[Done]**

As a user, I want Doña Inés to create a household so that I can track maintenance items.

As a user, I want to create categories of items, such as kitchen, bathroom, appliances, electrical, backyard, etc., so that I can later define the groups of items to track in my household.

As a user, I want to select common items so that Doña Inés can track them within the categories of my household.

As a user, I want to add actions to the items in the categories of my household so that Doña Inés can remind me when to execute them to keep up with the maintenance in my household.

As a user, I want a step-by-step section where I can easily select a category, add an item, add an action, and define the occurrences of the actions.

As a user, I want Doña Inés to remind me in advance when an action is due, so that I can prepare for the action.

As a user, I want to snooze notifications for specified periods of time such as hours or days, so that Doña Inés can notify me later to take action.
Feature: Settings and preferences

As a user, I want to pre-define snooze times in minutes, hours, or days, so that I can snooze reminders according to my preferences.

As a user, I want to define the number of days in advance to receive a notification of an action due date, both by action, or globally for all actions, so that I can receive notifications in advance.
