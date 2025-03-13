import { create } from 'zustand';

const useGameStore = create((set) => ({
    game_session: {
        protagonist_name: '',
        inventory: [],
        current_story: '',
        scenes: []
    },
    
    initializeGame: (initialScene) => set({
        game_session: {
            protagonist_name: initialScene.protagonist_name || '',
            inventory: [],
            current_story: initialScene.story || '',
            scenes: [{
                story: initialScene.story,
                action: initialScene.action,
                dice_success: true // Add default dice_success value
            }]
        }
    }),
    
    updateDiceRoll: (dice_success) => set((state) => {
        const scenes = [...state.game_session.scenes];
        const lastScene = scenes[scenes.length - 1];
        if (lastScene) {
            scenes[scenes.length - 1] = { ...lastScene, dice_success };
        }
        return {
            game_session: {
                ...state.game_session,
                scenes
            }
        };
    }),
    
    addScene: (newScene) => set((state) => ({
        game_session: {
            ...state.game_session,
            current_story: newScene.story,
            scenes: [...state.game_session.scenes, {
                story: newScene.compressed_story || newScene.story,
                music: newScene.music,
                action: newScene.action, // Make sure action is included
                dice_success: newScene.dice_success !== undefined ? newScene.dice_success : true,
                image: newScene.image // Make sure to include the image data
            }]
        }
    })),
    
    addActionToLastScene: (action) => set((state) => {
        const scenes = [...state.game_session.scenes];
        const lastScene = scenes[scenes.length - 1];
        if (lastScene) {
            scenes[scenes.length - 1] = { 
                ...lastScene, 
                action,
                dice_success: lastScene.dice_success !== undefined ? lastScene.dice_success : true // Ensure dice_success exists
            };
        }
        return {
            game_session: {
                ...state.game_session,
                scenes
            }
        };
    }),
    
    updateInventory: (inventory) => set((state) => ({
        game_session: {
            ...state.game_session,
            inventory
        }
    }))
}));

export default useGameStore;