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
            protagonist_name: 'Felix', // Hardcoded for now, could be made dynamic
            inventory: [],
            current_story: initialScene.story,
            scenes: [{
                story: initialScene.story,
                action: initialScene.action
            }]
        }
    }),
    
    addScene: (newScene) => set((state) => ({
        game_session: {
            ...state.game_session,
            current_story: newScene.story,
            scenes: [...state.game_session.scenes, {
                story: newScene.compressed_story
            }]
        }
    })),
    
    addActionToLastScene: (action) => set((state) => {
        const scenes = [...state.game_session.scenes];
        const lastScene = scenes[scenes.length - 1];
        if (lastScene) {
            scenes[scenes.length - 1] = { ...lastScene, action };
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