import React, { useState } from 'react';
import { 
    Box, Button, Container, Heading, Text, VStack, Image,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalFooter, FormControl, FormLabel, Input, useDisclosure,
    useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../stores/gameStore';
import { gameApi } from '../services/gameApi';

const LandingPage = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // Import the addScene action from the game store
    const { initializeGame, addScene } = useGameStore();
    const toast = useToast();
    const [protagonistName, setProtagonistName] = useState('');
    const [firstAction, setFirstAction] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTestGame = async () => {
        if (!protagonistName || !firstAction) {
            toast({
                title: "Required Fields",
                description: "Please fill in both fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            // First, fetch the initial story
            const storyResponse = await gameApi.fetchStory('The Brave');
            console.log("Story response:", storyResponse);
            
            // In the handleTestGame function
            // Create a proper game session object that matches the backend model
            // Update the gameSessionData object to include dice_success
            const gameSessionData = {
                protagonist_name: protagonistName,
                inventory: [], // Empty array as required by the model
                current_story: storyResponse.story,
                scenes: [{
                    story: storyResponse.story,
                    action: firstAction,
                    dice_success: true // Add this line to ensure dice_success is present
                }]
            };
            
            console.log("Sending to backend:", gameSessionData);
            
            // Initialize the game with just the basic info first
            initializeGame({
                protagonist_name: protagonistName,
                story: storyResponse.story,
                action: firstAction
            });
            
            // Navigate to game page first to show something to the user
            onClose();
            navigate('/game');
            
            // Then generate the scene with image (this will happen after navigation)
            const sceneResponse = await gameApi.generateNewScene(gameSessionData);
            
            // Update the game store with the new scene data
            // In the handleTestGame function, after getting the scene response:
            if (sceneResponse) {
                console.log("Scene generated successfully:", sceneResponse);
                // Log the image data to verify it's coming from the backend
                console.log("Image data:", sceneResponse.image);
                
                // Add the new scene to the game state
                addScene({
                    story: sceneResponse.story,
                    compressed_story: sceneResponse.compressed_story,
                    image: sceneResponse.image,
                    music: sceneResponse.music,
                    action: firstAction // Include the action that led to this scene
                });
            }
        } catch (error) {
            console.error("Game initialization error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to start game",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    };

    return (
        <Box bg="#121212" minH="100vh">
            {/* Hero Section */}
            <Container maxW="1200px" pt={20} pb={10}>
                <VStack spacing={6} align="center" textAlign="center">
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "5xl" }}
                        fontWeight="bold"
                        color="white"
                    >
                        Welcome traveler
                    </Heading>

                    <Text
                        color="gray.300"
                        fontSize={{ base: "lg", md: "xl" }}
                        maxW="800px"
                        lineHeight="1.6"
                    >
                        This is every teenagers dream come to life with the help of AI. A
                        choose-your-own-adventure where nothing is off limits. Complete
                        with image generation, D20 dice rolls and amazing storytelling,
                        embark on a journey where you choose the protagonist and you
                        shape the future. D&D, without the rulebook.
                    </Text>

                    <Text
                        color="gray.300"
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                        maxW="600px"
                        mt={4}
                    >
                        Choose your own starting point,
                        play it as you want and may the
                        D20 rolls be in your favor.
                    </Text>
                </VStack>
            </Container>

            {/* Monster Image Section with Buttons */}
            <Box
                position="relative"
                w="100%"
                h={{ base: "300px", md: "400px" }}
                overflow="hidden"
            >
                <Image
                    src="/images/dragon.png"
                    alt="Dragon"
                    objectFit="contain"
                    w="100%"
                    h="100%"
                />
                <VStack
                    position="absolute"
                    bottom="10%"
                    left="50%"
                    transform="translateX(-50%)"
                    spacing={4}
                >
                    <Button
                        onClick={() => navigate('/signup?tab=signup')}
                        bg="#B745FA"
                        color="white"
                        size="lg"
                        px={8}
                        _hover={{ bg: '#9A38D6', transform: 'scale(1.05)' }}
                        fontWeight="bold"
                        fontSize="xl"
                        borderRadius="full"
                        transition="all 0.3s ease"
                        boxShadow="0 0 20px rgba(183,69,250,0.5)"
                    >
                        SIGN UP NOW!
                    </Button>
                </VStack>
            </Box>

            {/* Test Game Button Section */}
            <Box textAlign="center" py={6}>
                <Button
                    onClick={onOpen}
                    bg="transparent"
                    color="#B745FA"
                    border="2px solid #B745FA"
                    size="md"
                    px={6}
                    _hover={{ bg: 'rgba(183,69,250,0.1)' }}
                    fontWeight="bold"
                    borderRadius="full"
                >
                    Test Game Loop
                </Button>
            </Box>

            {/* Test Game Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent bg="rgba(26, 26, 26, 0.95)" border="1px solid rgba(183,69,250,0.2)">
                    <ModalHeader color="white">Test Game Setup</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel color="gray.300">Protagonist Name</FormLabel>
                                <Input
                                    value={protagonistName}
                                    onChange={(e) => setProtagonistName(e.target.value)}
                                    placeholder="Enter your character's name"
                                    bg="rgba(255,255,255,0.1)"
                                    color="white"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="gray.300">First Action</FormLabel>
                                <Input
                                    value={firstAction}
                                    onChange={(e) => setFirstAction(e.target.value)}
                                    placeholder="What would you like to do?"
                                    bg="rgba(255,255,255,0.1)"
                                    color="white"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleTestGame}
                            bg="#B745FA"
                            color="white"
                            isLoading={isLoading}
                            _hover={{ bg: '#9A38D6' }}
                        >
                            Start Adventure
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default LandingPage;