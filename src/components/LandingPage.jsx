import React from 'react';
import { Box, Button, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (storyType) => {
        // Navigate to story information page with the selected story type
        navigate(`/story-info/${encodeURIComponent(storyType)}`);
    };

    return (
        <Box bg="black" minH="100vh" display="flex" alignItems="center">
            <Container maxW="container.md">
                <VStack spacing={6}>
                    <Heading size="2xl" color="white" mb={4}>
                        Adventure AI
                    </Heading>
                    <Text fontSize="xl" color="white" mb={6} textAlign="center">
                        Embark on an epic journey where your choices shape the story. 
                        Experience a unique adventure powered by artificial intelligence.
                    </Text>
                    <HStack spacing={4}>
                        <Button
                            colorScheme="purple"
                            size="lg"
                            onClick={() => handleButtonClick("The Brave")}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            The Brave
                        </Button>
                        <Button
                            colorScheme="purple"
                            size="lg"
                            onClick={() => handleButtonClick("The Wise")}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            The Wise
                        </Button>
                        <Button
                            colorScheme="purple"
                            size="lg"
                            onClick={() => handleButtonClick("The Cunning")}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            The Cunning
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default LandingPage;