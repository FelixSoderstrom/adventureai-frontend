// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Grid, GridItem, useToast } from '@chakra-ui/react';
import StoryDisplay from './StoryDisplay.jsx';
import ActionInput from './ActionInput.jsx';
import ImageDisplay from './ImageDisplay.jsx';
import LoadingOverlay from './LoadingOverlay.jsx';
import DiceRoller from './DiceRoller.jsx';
import { gameApi } from '../../services/gameApi.js';
import useGameStore from '../../stores/gameStore';

const GameInterface = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [showDiceRoller, setShowDiceRoller] = useState(false);
    const [diceRollData, setDiceRollData] = useState(null);
    const { game_session, updateDiceRoll, addScene, addActionToLastScene } = useGameStore();
    const toast = useToast();

    useEffect(() => {
        const initializeGameScene = async () => {
            if (game_session.scenes.length === 0) return;
            
            setIsLoading(true);
            try {
                // First, get the dice roll
                const diceResponse = await gameApi.rollDice(game_session.scenes);
                
                // Save the dice roll data and show the roller
                setDiceRollData(diceResponse);
                setShowDiceRoller(true);
                
                // Update the dice roll result in the store
                updateDiceRoll(diceResponse.dice_success);

                // Now get the new scene
                const sceneResponse = await gameApi.generateNewScene(game_session);
                
                // Update the image
                setCurrentImage(sceneResponse.image);
                
                // Add the new scene to the store
                addScene({
                    story: sceneResponse.story,
                    compressed_story: sceneResponse.compressed_story,
                    music: sceneResponse.music
                });
                
            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to process the scene. Please try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
            setIsLoading(false);
        };

        initializeGameScene();
    }, []); // Empty dependency array - only run once when component mounts

    const handleAction = useCallback(async (action) => {
        setIsLoading(true);
        try {
            // 1. Add the action to the most recent scene
            addActionToLastScene(action);

            // 2. Make the roll_dice API call
            const diceResponse = await gameApi.rollDice(game_session.scenes);
            
            // 3. Update store with dice roll result and show roller
            updateDiceRoll(diceResponse.dice_success);
            setDiceRollData(diceResponse);
            setShowDiceRoller(true);

            // 4. Generate new scene
            const sceneResponse = await gameApi.generateNewScene(game_session);
            
            // 5. Update UI and store with new scene
            setCurrentImage(sceneResponse.image);
            addScene({
                story: sceneResponse.story,
                compressed_story: sceneResponse.compressed_story,
                music: sceneResponse.music
            });

        } catch (error) {
            console.error('Error processing action:', error);
            toast({
                title: 'Error',
                description: 'Failed to process your action. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    }, [game_session, addActionToLastScene, updateDiceRoll, addScene, toast]);

    const handleDiceRollerClose = () => {
        setShowDiceRoller(false);
        setDiceRollData(null);
    };

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
            {diceRollData && (
                <DiceRoller
                    isOpen={showDiceRoller}
                    onClose={handleDiceRollerClose}
                    diceThreshold={diceRollData.dice_threshold}
                    diceRoll={diceRollData.dice_roll}
                />
            )}
        </Box>
    );
};

export default GameInterface;