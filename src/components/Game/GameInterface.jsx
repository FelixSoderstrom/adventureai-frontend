import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  GridItem,
  Box,
  VStack,
  Button,
  Text,
  useToast,
  Input,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { FaSuitcase } from "react-icons/fa";
import useGameStore from "../../stores/gameStore";
import { useNavigate } from "react-router-dom";
import DiceRoller from "./DiceRoller";
import Inventory from "./Inventory";
import { gameApi } from "../../services/gameApi";

// Slim Header component specifically for the game page
const SlimHeader = () => {
  return (
    <Flex
      bg="#121212"
      p={3}
      boxShadow="0 2px 10px rgba(183,69,250,0.2)"
      align="center"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex alignItems="center" gap={2}>
        <Text fontSize="2xl" fontWeight="bold" color="#B745FA">
          Adventure AI
        </Text>
        <Box
          as="img"
          src="/images/d20-logo.svg"
          alt="D20 Dice"
          h="30px"
          transition="transform 0.3s"
          _hover={{ transform: "rotate(20deg)" }}
          filter="invert(40%) sepia(85%) saturate(7000%) hue-rotate(270deg) brightness(100%) contrast(100%)"
        />
      </Flex>
      <Spacer />
      <HStack spacing={4}>
        <Button size="sm" variant="outline" colorScheme="purple">
          Save Game
        </Button>
        <Button size="sm" variant="outline" colorScheme="purple">
          Profile
        </Button>
      </HStack>
    </Flex>
  );
};

const GameInterface = () => {
  const { game_session, addScene, addActionToLastScene, updateDiceRoll } =
    useGameStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const [diceRollData, setDiceRollData] = useState(null);
  const [customAction, setCustomAction] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // For inventory drawer
  const [lastAction, setLastAction] = useState("");

  useEffect(() => {
    if (!game_session.protagonist_name) {
      navigate("/");
    }

    // Fix for double generation - add a flag to prevent multiple initializations
    const hasInitialized = sessionStorage.getItem("gameInitialized");
    if (
      !hasInitialized &&
      game_session.scenes &&
      game_session.scenes.length > 0
    ) {
      sessionStorage.setItem("gameInitialized", "true");
    }
  }, [game_session.protagonist_name, game_session.scenes, navigate]);

  // Handle custom action input
  const handleCustomAction = async (e) => {
    e.preventDefault();
    if (!customAction.trim()) return;

    await handleAction(customAction);
    setCustomAction("");
  };

  // No changes needed to the imports or the top part of the file
  // Modify the handleAction function to properly handle the dice roll animation
  // Remove these JSX elements from the component body
  const handleAction = useCallback(
    async (action) => {
      setIsLoading(true);
      setLastAction(action); // Store the last action for display
  
      try {
        // 1. Add the action to the most recent scene
        addActionToLastScene(action);
  
        // 2. Extract the last scene's story and the new action
        const lastScene = game_session.scenes[game_session.scenes.length - 1];
        const story = lastScene.story;
  
        // 3. Make the roll_dice API call with explicit story and action
        const diceResponse = await gameApi.rollDice(story, action);
        
        // 4. Show the dice roller animation
        setDiceRollData(diceResponse);
        setShowDiceRoller(true);
        
        // 5. Generate new scene with current state
        const sceneResponse = await gameApi.generateNewScene(
          useGameStore.getState().game_session
        );
        
        // 6. Update UI and store with new scene
        addScene({
          story: sceneResponse.story,
          compressed_story: sceneResponse.compressed_story,
          image: sceneResponse.image,
          music: sceneResponse.music,
          action: action, // Include the action that led to this scene
        });
        
        // 7. Wait a bit to ensure the image has time to render
        // This simulates waiting for the image to load
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 8. Now update the dice roll result in the store
        // This happens after everything else is complete
        updateDiceRoll(diceResponse.dice_success);
        
      } catch (error) {
        console.error("Error processing action:", error);
        toast({
          title: "Error",
          description: "Failed to process your action. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // Close the dice roller if there was an error
        setShowDiceRoller(false);
      }
      setIsLoading(false);
    },
    [game_session, addActionToLastScene, updateDiceRoll, addScene, toast]
  );

  // Remove these JSX elements from here
  // Update the Submit button to not show loading state
  // Find the Button component in the return statement and modify it:
  // <Button>...</Button>
  
  // Also, modify the Last Action Display to hide the dice roll result until animation completes
  // <GridItem>...</GridItem>

  const handleDiceRollerClose = () => {
    setShowDiceRoller(false);
    setDiceRollData(null);
  };

  return (
    <Box
      bg="#121212"
      minH="100vh"
      maxH="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      backgroundImage="radial-gradient(circle at center, rgba(183,69,250,0.1) 0%, rgba(0,0,0,0) 70%)"
      position="relative"
    >
      {/* Slim Header - This replaces the original header */}
      <SlimHeader />

      {/* Main Game Area */}
      <Grid
        templateColumns="65fr 35fr"
        gap={6}
        p={5}
        flex="1"
        overflow="hidden"
        pb="80px"
      >
        <GridItem overflowY="auto">
          <Box
            bg="rgba(26, 26, 26, 0.95)"
            p={5}
            borderRadius="xl"
            border="1px solid rgba(0, 157, 255, 0.2)"
            boxShadow="0 4px 30px rgba(0, 157, 255, 0.1)"
            backdropFilter="blur(10px)"
            h="100%"
            overflowY="auto"
            position="relative"
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(183, 69, 250, 0.3)',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                background: 'linear-gradient(to top, rgba(26, 26, 26, 0.95), transparent)',
                pointerEvents: 'none',
              }
            }}
          >
            {/* Only display the most recent scene's story */}
            {game_session.scenes && game_session.scenes.length > 0 && (
              <Text 
                color="gray.300" 
                mb={5} 
                fontFamily="'Jaro', sans-serif"
                fontSize="lg"
                lineHeight="1.7"
                letterSpacing="0.01em"
                textShadow="0 0 10px rgba(183, 69, 250, 0.2)"
              >
                {game_session.scenes[game_session.scenes.length - 1].story}
              </Text>
            )}

            {/* Predefined Actions */}
            {game_session.current_actions && (
              <VStack spacing={3} mt={5}>
                <Text 
                  color="#B745FA" 
                  fontSize="md" 
                  alignSelf="flex-start"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Suggested actions:
                </Text>
                {game_session.current_actions.map((action, index) => (
                  <Button
                    key={index}
                    w="100%"
                    bg="rgba(183, 69, 250, 0.2)"
                    color="white"
                    size="md"
                    isLoading={isLoading}
                    onClick={() => handleAction(action)}
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
                    borderRadius="md"
                    border="1px solid rgba(183, 69, 250, 0.3)"
                  >
                    {action}
                  </Button>
                ))}
              </VStack>
            )}
          </Box>
        </GridItem>

        <GridItem>
          <Box
            position="relative"
            h="100%"
            bg="transparent"
            borderRadius="xl"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {/* Image Display - centered with natural look */}
            {game_session.scenes && game_session.scenes.length > 0 && (
              <Box
                as="img"
                src={`data:image/jpeg;base64,${
                  game_session.scenes[game_session.scenes.length - 1].image
                }`}
                alt="Scene"
                maxW="100%"
                maxH="90%"
                objectFit="contain"
                borderRadius="lg"
                mb={4}
                sx={{
                  filter: "drop-shadow(0 0 20px rgba(183,69,250,0.3))"
                }}
              />
            )}

            {/* Game Controls Bar - Now positioned below the image */}
            <HStack
              spacing={4}
              bg="rgba(18, 18, 18, 0.7)"
              backdropFilter="blur(8px)"
              p={3}
              borderRadius="lg"
              boxShadow="0 4px 20px rgba(0,0,0,0.4)"
              border="1px solid rgba(183,69,250,0.2)"
              width="90%"
              justifyContent="center"
              mt={2}
            >
              {/* Inventory */}
              <Flex 
                align="center" 
                onClick={onOpen} 
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "rgba(183,69,250,0.2)" }}
              >
                <FaSuitcase color="#B745FA" />
                <Text ml={2} color="white">Inventory</Text>
              </Flex>
              
              {/* Map */}
              <Flex 
                align="center" 
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "rgba(183,69,250,0.2)" }}
              >
                <Box as="span" fontSize="1.2em">🗺️</Box>
                <Text ml={2} color="white">Map</Text>
              </Flex>
              
              {/* Character */}
              <Flex 
                align="center" 
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "rgba(183,69,250,0.2)" }}
              >
                <Box as="span" fontSize="1.2em">👤</Box>
                <Text ml={2} color="white">Character</Text>
              </Flex>
              
              {/* Journal */}
              <Flex 
                align="center" 
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "rgba(183,69,250,0.2)" }}
              >
                <Box as="span" fontSize="1.2em">📖</Box>
                <Text ml={2} color="white">Journal</Text>
              </Flex>
            </HStack>
          </Box>
        </GridItem>
      </Grid>

      {/* Fixed Input Field at the bottom with Last Action Display */}
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(18, 18, 18, 0.98)"
        borderTop="1px solid rgba(183,69,250,0.3)"
        p={4}
        zIndex="5"
        backdropFilter="blur(10px)"
        boxShadow="0 -4px 20px rgba(0,0,0,0.5)"
      >
        {/* Restructured layout to match the grid above */}
        <Grid
          templateColumns="50fr 35fr 15fr"
          gap={4}
          maxW="1200px"
          mx="auto"
          px={5}
        >
          {/* Input Form - Aligned with story column */}
          <GridItem>
            <Box as="form" onSubmit={handleCustomAction} w="100%">
              <Flex>
                <Input
                  value={customAction}
                  onChange={(e) => setCustomAction(e.target.value)}
                  placeholder="What will you do next?"
                  bg="rgba(0, 0, 0, 0.4)"
                  color="white"
                  borderColor="rgba(183,69,250,0.3)"
                  _hover={{ borderColor: "rgba(183,69,250,0.5)" }}
                  _focus={{
                    borderColor: "#B745FA",
                    boxShadow: "0 0 0 1px #B745FA",
                  }}
                  mr={3}
                  disabled={isLoading}
                  size="lg"
                  fontSize="md"
                  borderRadius="md"
                  pl={4}
                  h="50px"
                />
                <Button
                  type="submit"
                  bg="#B745FA"
                  color="white"
                  disabled={isLoading}
                  _hover={{ 
                    bg: "#9A38D6",
                    boxShadow: "0 4px 15px rgba(183,69,250,0.5)"
                  }}
                  _active={{
                    boxShadow: "0 2px 10px rgba(183,69,250,0.4)"
                  }}
                  size="lg"
                  h="50px"
                  minW="100px"
                  borderRadius="md"
                  fontWeight="bold"
                  transition="all 0.2s"
                >
                  Submit
                </Button>
              </Flex>
            </Box>
          </GridItem>

          {/* Last Action Display - Aligned with image column */}
          <GridItem>
            {lastAction ? (
              <Box
                p={3}
                borderRadius="md"
                bg="rgba(183,69,250,0.1)"
                border="1px solid rgba(183,69,250,0.2)"
                h="50px"
                display="flex"
                alignItems="center"
              >
                <Text color="#B745FA" fontWeight="bold" fontSize="md">
                  Action:{" "}
                  <Text as="span" color="gray.300">
                    {lastAction}
                  </Text>
                </Text>
              </Box>
            ) : (
              // Empty placeholder to maintain layout
              <Box h="50px" />
            )}
          </GridItem>

          {/* Dice Roll Result - Separated into its own column */}
          <GridItem>
            {!showDiceRoller && game_session.scenes &&
              game_session.scenes.length > 0 &&
              game_session.scenes[game_session.scenes.length - 1]
                .dice_success !== undefined ? (
              <Box
                p={3}
                borderRadius="md"
                bg={
                  game_session.scenes[game_session.scenes.length - 1].dice_success
                    ? "rgba(72, 187, 120, 0.1)"
                    : "rgba(245, 101, 101, 0.1)"
                }
                border={
                  game_session.scenes[game_session.scenes.length - 1].dice_success
                    ? "1px solid rgba(72, 187, 120, 0.3)"
                    : "1px solid rgba(245, 101, 101, 0.3)"
                }
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color={
                    game_session.scenes[game_session.scenes.length - 1].dice_success
                      ? "green.400"
                      : "red.400"
                  }
                  fontWeight="bold"
                  fontSize="md"
                >
                  Dice Roll:{" "}
                  {game_session.scenes[game_session.scenes.length - 1].dice_success
                    ? "Success!"
                    : "Failed!"}
                </Text>
              </Box>
            ) : (
              // Empty placeholder to maintain layout
              <Box h="50px" />
            )}
          </GridItem>
        </Grid>
      </Box>

      {/* Inventory Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(8px)" bg="rgba(0,0,0,0.5)" />
        <DrawerContent
          bg="rgba(26, 26, 26, 0.98)"
          borderLeft="1px solid rgba(183,69,250,0.3)"
          boxShadow="-5px 0 20px rgba(183,69,250,0.2)"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader
            color="#B745FA"
            borderBottomWidth="1px"
            borderColor="rgba(183,69,250,0.2)"
            fontWeight="bold"
            fontSize="xl"
            textTransform="uppercase"
            letterSpacing="1px"
          >
            Inventory
          </DrawerHeader>
          <DrawerBody>
            <Inventory />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Dice Roller Modal */}
      {showDiceRoller && diceRollData && (
        <DiceRoller
          isOpen={showDiceRoller}
          onClose={handleDiceRollerClose}
          diceData={diceRollData}
        />
      )}
    </Box>
  );
};

export default GameInterface;
