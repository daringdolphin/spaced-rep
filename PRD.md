**Title:** Spaced Repetition Webapp MVP

**Overview:**  
Minimal version of a spaced repetition flashcard system. Users can create decks, add flashcards, and review them. Authentication is planned for a future iteration.

**Features (MVP):**  
- **Deck Management:**  
  - Create, edit, and delete decks.  
  - Associate flashcards with decks.

- **Flashcard Management:**  
  - Create flashcards with a question (front) and an answer (back).  
  - Edit and delete flashcards.

- **Review Mode:**  
  - Display a list of flashcards in a selected deck.  
  - Flip each card to reveal the answer.

**User Flows (MVP):**  
1. **Deck & Card Creation Flow:**  
   - User lands on the site (no auth yet).  
   - Creates flashcards that are added to the default deck.
   - Creates a deck.  

2. **Review Flow:**  
   - User selects a deck.  
   - Sees flashcards (front side).  
   - Flips cards to view answers.

**Technical Requirements (MVP):**  
- **Frontend:**  
  - Built with Next.js.  
  - Minimal UI with basic client-side navigation.

- **Backend & Data Persistence:**  
  - CRUD endpoints for decks and flashcards.  
  - Simple data storage (local JSON, in-memory, or a basic database).  
  - No user-specific data yet.

- **Authentication:**  
  - Not implemented in MVP.  
  - Future integration with Clerk planned.

**Architecture (MVP):**  
- **Framework:** Next.js for both server-side and client-side rendering.  
- **API:** Minimal REST endpoints for CRUD operations.  
- **Database:** Basic storage solution (e.g., in-memory, file-based, or simple cloud database).  
- **Deployment:** Simple hosting (e.g., Vercel).

**Data Schema:**

- **Deck:**  
  - `id` (UUID or auto-increment integer)  
  - `name` (string)  
  - `description` (optional string)  
  - `createdAt` (timestamp)  
  - `updatedAt` (timestamp)

- **Flashcard:**  
  - `id` (UUID or auto-increment integer)  
  - `deckId` (foreign key linking to Deck.id)  
  - `question` (text)  
  - `answer` (text)  
  - `lastReview` (timestamp; null if not reviewed)  
  - `createdAt` (timestamp)  
  - `updatedAt` (timestamp)

**Assumptions:**  
- Spaced repetition algorithm details to be defined in later iterations.  
- Basic UI and UX suffice for core creation and review functionalities.  
- Single-user mode in MVP; multi-user support with auth to follow.

**Metrics (MVP):**  
- Number of decks created.  
- Number of flashcards created.  
- Frequency of review sessions initiated.