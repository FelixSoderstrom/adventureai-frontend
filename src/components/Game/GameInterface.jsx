// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import StoryDisplay from './StoryDisplay.jsx';
import ActionInput from './ActionInput.jsx';
import ImageDisplay from './ImageDisplay.jsx';
import LoadingOverlay from './LoadingOverlay.jsx';
import { gameApi } from '../../services/gameApi.js';
import useGameStore from '../../stores/gameStore';

const GameInterface = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { gameSession, initializeGame: initGame, addScene } = useGameStore();  // Rename to avoid shadowing
    const toast = useToast();

    useEffect(() => {
        const startGame = async () => {  // Rename the function
            setIsLoading(true);
            try {
                const initialState = await gameApi.startGame();
                initGame('Player');  // Initialize the game state first
                addScene({
                    story: initialState.story,
                    action: '',
                    mood: 'neutral',
                    starting_point: true,
                    image: initialState.image,
                    music: initialState.music,
                    tts: initialState.tts,
                    compressed_story: initialState.compressed_story
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to start the game. Please try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
            setIsLoading(false);
        };

        startGame();
    }, [toast, addScene, initGame]);  // Add initGame to dependencies

    const handleAction = useCallback(async (action) => {
        if (gameSession.scenes.length === 0) return;
        
        setIsLoading(true);
        try {
            const newState = await gameApi.submitAction(action, gameSession);
            addScene({
                story: newState.story,
                action: action,
                mood: 'neutral',
                image: newState.image,
                music: newState.music,
                tts: newState.tts,
                compressed_story: newState.compressed_story
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to process your action. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    }, [gameSession, addScene, toast]);
    // Remove this floating JSX
    {isLoading && (
        <LoadingOverlay 
            isOpen={isLoading} 
            message="Processing your action..." 
        />
    )}
    return (
        <Box bg="black" minH="100vh" p={4}>
            <Grid
                templateColumns="1fr 1fr"
                gap={4}
                maxW="1800px"
                mx="auto"
                h="100vh"
            >
                {/* Left Side - Story and Controls */}
                <GridItem>
                    <Grid templateRows="1fr auto auto" h="100%" gap={4}>
                        <StoryDisplay 
                            story={gameSession.scenes[gameSession.scenes.length - 1]?.story || ''} 
                        />
                        <ActionInput 
                            onSubmit={handleAction} 
                            disabled={isLoading} 
                        />
                    </Grid>
                </GridItem>
                {/* Right Side - Image and Inventory */}
                <GridItem>
                    <Grid templateRows="2fr 1fr" h="100%" gap={4}>
                        <ImageDisplay 
                            imageUrl={gameSession.scenes[gameSession.scenes.length - 1]?.image || ''} 
                            isLoading={isLoading} 
                        />
                        <Box bg="gray.700" p={4} borderRadius="md">
                            <Box color="white" fontSize="xl" textAlign="center">
                                Inventory Coming Soon
                            </Box>
                        </Box>
                    </Grid>
                </GridItem>
            </Grid>
            {/* Update this LoadingOverlay */}
            {isLoading && (
                <LoadingOverlay 
                    isOpen={isLoading} 
                    message="Processing your action..." 
                />
            )}
        </Box>
    );
};

export default GameInterface;