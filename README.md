# Adventure AI

An interactive storytelling experience powered by artificial intelligence where your choices shape the narrative.

## Features

- Dynamic storytelling with AI-generated responses
- Interactive choices that affect the story
- Visual scene representation with AI-generated images
- Carousel-based adventure selection
- Responsive design with Chakra UI
- State management with scene history

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Dependencies

- React 18
- Chakra UI for styling
- Zustand for state management
- React Router for navigation
- Splide for carousel functionality
- React Icons for UI elements

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install --legacy-peer-deps
```

## Environment Setup

Create a .env file in the root directory with:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_SD_BASE_URL=http://localhost:8001
```

## Running the App

To start the development server:

```bash
npm start
```

## API Integration

The application requires a backend server running at the URL specified in .env with the following endpoints:

- POST /fetch_story : Initialize a new story based on selected theme
- POST /generate_new_scene : Generate new scene based on player actions
- POST /roll_dice : Handle dice roll events for action outcomes

## Project Structure

- /src/components - React components including game interface and UI elements
- /src/services - API integration and game services
- /src/stores - State management using Zustand
- /public/images - Static images and assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## License

MIT

## Contact

For any questions or suggestions, please reach out to Bjorn or Felix.
