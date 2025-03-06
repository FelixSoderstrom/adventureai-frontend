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
            current_story: '',
            scenes: [{
                story: initialScene.story,
                action: initialScene.action
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
                music: newScene.music
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