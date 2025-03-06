const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const gameApi = {
    startGame: async (game_session) => {
        try {
            const response = await fetch(`${API_BASE_URL}/start_new_game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game_session),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Start game error:', error);
            throw error;
        }
    },

    submitAction: async (game_session) => {
        try {
            const response = await fetch(`${API_BASE_URL}/continue_game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game_session),
            });
            
            return await handleResponse(response);
        } catch (error) {
            console.error('Submit action error:', error);
            throw error;
        }
    }
};