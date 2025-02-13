# Spaced Repetition Webapp MVP

## Overview

This project is a minimal version of a spaced repetition flashcard system. Users can create decks, add flashcards, and review them. Authentication is planned for a future iteration.

## Features (MVP)

-   Flashcard Management:
    -   A flashcard is a learning tool consisting of a question or prompt on one side (the "front") and the corresponding answer or explanation on the other side (the "back").
    -   Create flashcards with a question (front) and an answer (back).
    -   Edit and delete flashcards.
    -   When creating a flashcard, a dropdown allows users to assign it to a specific deck.
-   Deck Management:
    -   A deck is a collection of flashcards.
    -   Create, edit, and delete decks.
    -   Associate flashcards with decks.
    -   All flashcards are assigned to an "All Flashcards" deck by default upon creation.
-   Review Mode:
    -   Display a list of flashcards in a given deck.
    -   Flip each card to see the answer.
-   Homepage:
    -   Displays all created flashcards in a grid.
    -   Displays decks in a sidebar.
    -   Includes a "New Card" component in the grid with a dotted border. Clicking this initiates flashcard creation.

## Technical Stack

-   Frontend: Next.js
-   Backend: Next.js API Routes
-   Database: NeonDB

## High-Level Todos

1.  **Project Setup:**
    -   [x] Initialize Next.js project.
    -   [x] Boilerplate UI from v0.dev
    -   [ ] Configure database (NeonDB).
    -   [ ] Set up basic API routes.

2.  **Database Implementation:**
    -   [ ] Implement CRUD operations for decks.
    -   [ ] Implement CRUD operations for flashcards.
    -   [ ] Ensure "All Flashcards" deck is automatically created.

3.  **Frontend Implementation (Components First):**
    -   [ ] Implement flashcard component with flip animation.
    -   [ ] Implement deck component for the sidebar.
    -   [ ] Implement dropdown component for deck assignment.

4.  **Frontend Implementation (Pages):**
    -   [ ] Create homepage with flashcard grid, deck sidebar, and "New Card" component.
    -   [ ] Implement deck management page.
    -   [ ] Implement review mode page.

5.  **State Management:**
    -   [ ] Set up React Context API for global state.
    -   [ ] Connect components to global state.

6.  **Routing and Navigation:**
    -   [ ] Set up routing for pages.
    -   [ ] Implement navigation between pages.

7.  **Additional Features:**
    -   [ ] Implement flashcard assignment to decks.
    -   [ ] Implement deck sidebar on homepage.
    -   [ ] Implement grid layout for flashcards on homepage.
    -   [ ] Implement "New Card" button/component.
    -   [ ] Implement flashcard creation form.

8.  **Testing:**
    -   [ ] Add basic tests for backend API.
    -   [ ] Add basic tests for UI components.

## Getting Started

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.

## License

[MIT](LICENSE)
