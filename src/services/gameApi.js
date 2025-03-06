const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const gameApi = {
    rollDice: async (scenes) => {
        try {
            // Get the last scene since that's what we want to send
            const currentScene = scenes[scenes.length - 1];
            
            const response = await fetch(`${API_BASE_URL}/roll_dice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    story: currentScene.story,
                    action: currentScene.action
                }),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Dice roll error:', error);
            throw error;
        }
    },

    generateNewScene: async (game_session) => {
        try {
            const response = await fetch(`${API_BASE_URL}/generate_new_scene`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    protagonist_name: game_session.protagonist_name,
                    inventory: game_session.inventory,
                    current_story: game_session.current_story,
                    scenes: game_session.scenes
                }),
            });
            
            return await handleResponse(response);
        } catch (error) {
            console.error('Generate new scene error:', error);
            throw error;
        }
    },

    fetchStory: async (starting_story) => {
        try {
            const requestBody = { starting_story };
            
            const response = await fetch(`${API_BASE_URL}/fetch_story`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            return await handleResponse(response);
        } catch (error) {
            console.error('Fetch story error:', error);
            throw error;
        }
    }
};

export { gameApi };