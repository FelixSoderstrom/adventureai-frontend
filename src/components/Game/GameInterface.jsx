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
    const [currentImage, setCurrentImage] = useState('');
    const { game_session, initializeGame, addScene, addActionToLastScene } = useGameStore();
    const toast = useToast();

    useEffect(() => {
        const startGame = async () => {
            setIsLoading(true);
            try {
                // Initialize with a default first scene
                const initialScene = {
                    story: "You are a cat named Felix, ready for adventure.",
                    action: "Starting your journey"
                };
                
                // Initialize the store
                initializeGame(initialScene);

                // Get the updated game_session after initialization
                const updatedGameSession = useGameStore.getState().game_session;
                
                // Get the first response from the API
                const response = await gameApi.startGame(updatedGameSession);
                setCurrentImage(response.image);
                
                // Add the response as a new scene
                addScene({
                    story: response.story,
                    compressed_story: response.compressed_story
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
    }, []);

    const handleAction = useCallback(async (action) => {
        if (game_session.scenes.length === 0) return;
        
        setIsLoading(true);
        try {
            // First add the action to the last scene
            addActionToLastScene(action);
            
            // Get the updated game_session after adding the action
            const updatedGameSession = useGameStore.getState().game_session;
            
            // Then make the API call with the updated game_session
            const response = await gameApi.submitAction(updatedGameSession);
            setCurrentImage(response.image);
            
            // Add the new scene
            addScene({
                story: response.story,
                compressed_story: response.compressed_story
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
    }, [game_session, addScene, addActionToLastScene, toast]);

    return (
        <Box bg="black" minH="100vh" p={4}>
            <Grid templateColumns="1fr 1fr" gap={4} maxW="1800px" mx="auto" h="100vh">
                <GridItem>
                    <Grid templateRows="1fr auto auto" h="100%" gap={4}>
                        <StoryDisplay story={game_session.current_story || ''} />
                        <ActionInput onSubmit={handleAction} disabled={isLoading} />
                    </Grid>
                </GridItem>
                <GridItem>
                    <Grid templateRows="2fr 1fr" h="100%" gap={4}>
                        <ImageDisplay imageUrl={currentImage} isLoading={isLoading} />
                        <Box bg="gray.700" p={4} borderRadius="md">
                            <Box color="white" fontSize="xl" textAlign="center">
                                Inventory Coming Soon
                            </Box>
                        </Box>
                    </Grid>
                </GridItem>
            </Grid>
            {isLoading && (
                <LoadingOverlay isOpen={isLoading} message="Processing your action..." />
            )}
        </Box>
    );
};

export default GameInterface;