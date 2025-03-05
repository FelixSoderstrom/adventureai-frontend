const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const IMAGE_API_URL = process.env.REACT_APP_SD_BASE_URL || 'http://localhost:8001';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const gameApi = {
    startGame: async (protagonistName = 'Felix') => {
        try {
            const storyResponse = await fetch(`${API_BASE_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `Start a new game with a protagonist named ${protagonistName}`,
                    max_tokens: 500
                }),
            });
            const storyData = await handleResponse(storyResponse);

            // Generate image for the initial scene
            const imageResponse = await fetch(`${IMAGE_API_URL}/generate?prompt=${encodeURIComponent(storyData.text)}`, {
                method: 'GET',
            });
            const imageBase64 = await imageResponse.json(); // Get the direct base64 string

            return {
                story: storyData.text,
                image: imageBase64, // Use the base64 string directly
                compressed_story: storyData.text
            };
        } catch (error) {
            console.error('Start game error:', error);
            throw error;
        }
    },

    submitAction: async (action, gameSession) => {
        // Generate story continuation
        const storyResponse = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: `${gameSession.scenes[gameSession.scenes.length - 1]?.compressed_story || ''}\nPlayer action: ${action}`,
                max_tokens: 500
            }),
        });
        
        if (!storyResponse.ok) {
            throw new Error('Failed to process action');
        }
        
        const storyData = await handleResponse(storyResponse);

        // Generate image for the new scene
        const imageResponse = await fetch(`${IMAGE_API_URL}/generate?prompt=${encodeURIComponent(storyData.text)}`, {
            method: 'GET',
        });
        const imageBase64 = await imageResponse.json(); // Get the direct base64 string

        return {
            story: storyData.text,
            image: imageBase64, // Use the base64 string directly
            compressed_story: storyData.text
        };
    }
};