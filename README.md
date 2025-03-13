# Adventure AI

An interactive storytelling experience powered by artificial intelligence where your choices shape the narrative.

## Dependencies

- React 18
- Chakra UI for styling
- Zustand for state management
- React Router for navigation
- Framer Motion for animations

## Features

- Dynamic storytelling with AI-generated responses
- Interactive choices that affect the story
- Visual scene representation
- Audio feedback
- State management with scene history
- Responsive design with Chakra UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Environment Variables

Create a .env file in the root directory with:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_SD_BASE_URL=http://localhost:8001
```

## API Integration

The application expects a backend server running at the URL specified in .env with the following endpoints:

- POST /start-game : Initialize a new game session
- POST /player-action : Process player actions and return new game state
- POST /roll-dice/{requiredRoll} : Handle dice roll events (future implementation)

## CREDITS

Dice animation used on page:

"D20 Dice (W20 Würfel) 3D model [FREE]" (https://skfb.ly/onUnH) by VertexDon is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```
