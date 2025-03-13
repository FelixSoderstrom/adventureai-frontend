import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../stores/gameStore";
import { gameApi } from "../services/gameApi";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { initializeGame, addScene } = useGameStore();
  const toast = useToast();
  const [protagonistName, setProtagonistName] = useState("");
  const [firstAction, setFirstAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarios = [
    {
      id: 1,
      title: "The Medieval Quest",
      description:
        "Embark on an epic journey through a magical medieval realm.",
      image: "/images/medieval.jpg",
    },
    {
      id: 2,
      title: "Space Explorer",
      description: "Navigate the vast cosmos and discover unknown worlds.",
      image: "/images/alien.jpg",
    },
    {
      id: 3,
      title: "Detective Mystery",
      description: "Solve intricate mysteries in a noir-style setting.",
      image: "/images/detective.jpg",
    },
  ];

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
      const storyResponse = await gameApi.fetchStory("The Brave");
      console.log("Story response:", storyResponse);

      // In the handleTestGame function
      // Create a proper game session object that matches the backend model
      // Update the gameSessionData object to include dice_success
      const gameSessionData = {
        protagonist_name: protagonistName,
        inventory: [], // Empty array as required by the model
        current_story: storyResponse.story,
        scenes: [
          {
            story: storyResponse.story,
            action: firstAction,
            dice_success: true, // Add this line to ensure dice_success is present
          },
        ],
      };

      console.log("Sending to backend:", gameSessionData);

      // Initialize the game with just the basic info first
      initializeGame({
        protagonist_name: protagonistName,
        story: storyResponse.story,
        action: firstAction,
      });

      // Navigate to game page first to show something to the user
      onClose();
      navigate("/game");

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
          action: firstAction, // Include the action that led to this scene
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
    <Box
      bg="#121212"
      minH="100vh"
      py={20}
      backgroundImage="radial-gradient(circle at center, rgba(183,69,250,0.1) 0%, rgba(0,0,0,0) 70%)"
    >
      <Button
        position="fixed"
        top="100px"
        right="40px"
        bg="#FF3366"
        color="white"
        size="lg"
        zIndex={1000}
        _hover={{
          bg: "#E62E5C",
          transform: "scale(1.05)",
        }}
        onClick={onOpen}
      >
        Test Game Loop
      </Button>

      <Container maxW="container.xl">
        <VStack spacing={8} alignItems="center">
          <Heading as="h1" size="2xl" color="white" textAlign="center">
            Shape your own destiny
          </Heading>
          <Text color="gray.300" fontSize="xl" textAlign="center" maxW="2xl">
            Embark on an AI-powered journey where your choices shape the story.
            Experience unique adventures crafted just for you.
          </Text>
          <Button
            onClick={() => navigate("/signup?tab=signup")}
            bg="#B745FA"
            color="white"
            size="lg"
            _hover={{
              bg: "#9A38D6",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 20px rgba(183,69,250,0.4)",
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "0 2px 10px rgba(183,69,250,0.4)",
            }}
            transition="all 0.2s"
          >
            SIGN UP NOW!
          </Button>
          <Image
            src="/images/dragon.png"
            alt="Adventure AI Dragon"
            maxW="600px"
            w="100%"
            mt={8}
          />

          <Box w="100%" maxW="800px" mt={12}>
            <Heading
              as="h2"
              size="lg"
              color="white"
              mb={6}
              textAlign="center"
              bgGradient="linear(to-r, #B745FA, #FF3366)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Choose Your Adventure
            </Heading>
            <Splide
              options={{
                perPage: 1,
                arrows: true,
                pagination: true,
                gap: "2rem",
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                type: 'loop',
                padding: { left: 20, right: 20 },
                breakpoints: {
                  640: {
                    padding: { left: 0, right: 0 },
                  },
                },
              }}
            >
              {scenarios.map((scenario) => (
                <SplideSlide key={scenario.id}>
                  <VStack
                    spacing={4}
                    p={8}
                    bg="rgba(26, 26, 26, 0.95)"
                    borderRadius="xl"
                    border="1px solid rgba(183,69,250,0.2)"
                    onClick={() => setSelectedScenario(scenario)}
                    cursor="pointer"
                    transition="all 0.3s"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(183,69,250,0.3)",
                      border: "1px solid rgba(183,69,250,0.4)",
                    }}
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgGradient:
                        "linear(to-b, rgba(183,69,250,0.1), transparent)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    _hover_before={{
                      opacity: 1,
                    }}
                  >
                    <Image
                      src={scenario.image}
                      alt={scenario.title}
                      borderRadius="lg"
                      maxH="300px"
                      w="100%"
                      objectFit="cover"
                      transform="scale(1)"
                      transition="transform 0.3s"
                      _hover={{
                        transform: "scale(1.02)",
                      }}
                    />
                    <Heading
                      as="h3"
                      size="md"
                      color="white"
                      bgGradient="linear(to-r, #B745FA, #FF3366)"
                      bgClip="text"
                    >
                      {scenario.title}
                    </Heading>
                    <Text
                      color="gray.300"
                      textAlign="center"
                      fontSize="lg"
                      lineHeight="tall"
                    >
                      {scenario.description}
                    </Text>
                  </VStack>
                </SplideSlide>
              ))}
            </Splide>

            <Box display="flex" justifyContent="center" mt={8}>
              <Button
                size="md"
                bg="#B745FA"
                color="white"
                isDisabled={!selectedScenario}
                px={12}
                _hover={{
                  bg: "#9A38D6",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 20px rgba(183,69,250,0.4)",
                }}
                _active={{
                  transform: "translateY(0)",
                  boxShadow: "0 2px 10px rgba(183,69,250,0.4)",
                }}
                transition="all 0.2s"
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play This Adventure
              </Button>
            </Box>
          </Box>
        </VStack>
      </Container>

      {/* Test Game Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="rgba(26, 26, 26, 0.95)"
          border="1px solid rgba(183,69,250,0.2)"
        >
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
                  _placeholder={{ color: "gray.400" }}
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
                  _placeholder={{ color: "gray.400" }}
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
              _hover={{ bg: "#9A38D6" }}
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
