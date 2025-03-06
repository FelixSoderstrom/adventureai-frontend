import React, { useState } from 'react';
import {
    Box,
    VStack,
    Text,
    Input,
    Button,
    Container,
    Heading,
    HStack,
    useToast
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameApi } from '../services/gameApi';
import useGameStore from '../stores/gameStore';

const StoryInformation = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const decodedType = decodeURIComponent(type);
    const [isLoading, setIsLoading] = useState(false);
    const [protagonistName, setProtagonistName] = useState('');
    const [firstAction, setFirstAction] = useState('');
    const { initializeGame } = useGameStore();

    const storyDescriptions = {
        'The Brave': 'A tale of courage where you must face your fears and overcome dangerous obstacles to save your kingdom from an ancient curse.',
        'The Wise': 'In this mystical journey, you use your wit and wisdom to solve riddles and unite the divided clans of the Enchanted Forest.',
        'The Cunning': 'You embark on a stealth mission through the urban jungle, using your clever tricks to outsmart your adversaries.'
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleStartGame = async () => {
        if (!protagonistName.trim() || !firstAction.trim()) {
            toast({
                title: 'Missing Information',
                description: 'Please enter both a name and your first action.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            // Fetch the story based on the selected type
            const response = await gameApi.fetchStory(decodedType);
            
            // Initialize the game state with the user's input and the story
            initializeGame({
                story: response.story,
                action: firstAction,
                protagonist_name: protagonistName
            });

            // Navigate to the game interface
            navigate('/game');
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

    return (
        <Box bg="black" minH="100vh" display="flex" alignItems="center">
            <Container maxW="container.md">
                <VStack spacing={6} align="stretch">
                    <Heading size="xl" color="white" textAlign="center">
                        {decodedType}
                    </Heading>
                    
                    <Box bg="gray.700" p={6} borderRadius="md">
                        <Text color="white" fontSize="lg" mb={4}>
                            {storyDescriptions[decodedType]}
                        </Text>
                        
                        <VStack spacing={4}>
                            <Input
                                placeholder="Enter protagonist's name"
                                bg="white"
                                color="black"
                                value={protagonistName}
                                onChange={(e) => setProtagonistName(e.target.value)}
                            />
                            
                            <Input
                                placeholder="What's your first action?"
                                bg="white"
                                color="black"
                                value={firstAction}
                                onChange={(e) => setFirstAction(e.target.value)}
                            />
                            
                            <HStack spacing={4} width="100%">
                                <Button
                                    colorScheme="gray"
                                    width="50%"
                                    onClick={handleBack}
                                    isDisabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    colorScheme="purple"
                                    width="50%"
                                    onClick={handleStartGame}
                                    isLoading={isLoading}
                                >
                                    Start Game
                                </Button>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default StoryInformation; 