import { create } from 'zustand';

const useGameStore = create((set) => ({
    gameSession: {
        protagonist_name: '',
        inventory: [],
        scenes: []
    },
    
    initializeGame: (protagonistName) => set({
        gameSession: {
            protagonist_name: protagonistName,
            inventory: [],
            scenes: []
        }
    }),
    
    addScene: (newScene) => set((state) => ({
        gameSession: {
            ...state.gameSession,
            scenes: [...state.gameSession.scenes, {
                story: newScene.story,
                action: newScene.action,
                mood: newScene.mood,
                starting_point: false,
                image: newScene.image,
                music: newScene.music,
                tts: newScene.tts,
                compressed_story: newScene.compressed_story
            }]
        }
    })),
    
    updateInventory: (inventory) => set((state) => ({
        gameSession: {
            ...state.gameSession,
            inventory
        }
    }))
}));

export default useGameStore;