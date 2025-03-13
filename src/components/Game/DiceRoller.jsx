import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    Text,
    VStack,
    Center,
    Spinner,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Create a D20 SVG component with animated rolling
const D20Component = ({ isRolling, rollResult }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const animationRef = useRef(null);
    
    useEffect(() => {
        if (isRolling) {
            // Start the rolling animation with better timing
            let lastTimestamp = 0;
            
            const animate = (timestamp) => {
                if (!lastTimestamp) lastTimestamp = timestamp;
                const delta = timestamp - lastTimestamp;
                lastTimestamp = timestamp;
                
                // Smoother rotation changes
                setRotation(prev => ({
                    x: prev.x + (Math.random() * 8 - 4),
                    y: prev.y + (Math.random() * 8 - 4)
                }));
                
                // Smoother position changes
                setPosition(prev => ({
                    x: Math.max(-15, Math.min(15, prev.x + (Math.random() * 4 - 2))),
                    y: Math.max(-15, Math.min(15, prev.y + (Math.random() * 4 - 2)))
                }));
                
                animationRef.current = requestAnimationFrame(animate);
            };
            
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Stop the animation
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            
            // Reset to center position with slight tilt
            setPosition({ x: 0, y: 0 });
            setRotation({ x: 15, y: 15 });
        }
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [isRolling]);
    
    // Define the pulse animation for success/failure
    const pulseSuccess = keyframes`
        0% { filter: drop-shadow(0 0 5px rgba(72, 187, 120, 0.5)); }
        50% { filter: drop-shadow(0 0 15px rgba(72, 187, 120, 0.8)); }
        100% { filter: drop-shadow(0 0 5px rgba(72, 187, 120, 0.5)); }
    `;
    
    const pulseFail = keyframes`
        0% { filter: drop-shadow(0 0 5px rgba(245, 101, 101, 0.5)); }
        50% { filter: drop-shadow(0 0 15px rgba(245, 101, 101, 0.8)); }
        100% { filter: drop-shadow(0 0 5px rgba(245, 101, 101, 0.5)); }
    `;
    
    // Determine the color and animation based on roll result
    const diceColor = isRolling 
        ? "#B745FA" 
        : (rollResult === null ? "#B745FA" : (rollResult ? "#48BB78" : "#F56565"));
    
    const pulseAnimation = !isRolling && rollResult !== null
        ? (rollResult ? `${pulseSuccess} 2s infinite` : `${pulseFail} 2s infinite`)
        : "none";
    
    return (
        <Center 
            h="200px" 
            w="200px" 
            position="relative"
        >
            <Box
                position="relative"
                transform={`translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`}
                transition={isRolling ? "none" : "all 0.5s ease-out"}
                animation={pulseAnimation}
                w="120px"
                h="120px"
                style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
                <svg 
                    viewBox="0 0 100 100" 
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    style={{ filter: isRolling ? "blur(0.5px)" : "none" }}
                >
                    <polygon 
                        points="50,5 95,25 95,75 50,95 5,75 5,25" 
                        fill="rgba(0,0,0,0.1)" 
                        stroke={diceColor} 
                        strokeWidth="2.5"
                    />
                    <polygon 
                        points="50,5 95,25 50,45 5,25" 
                        fill="rgba(0,0,0,0.1)" 
                        stroke={diceColor} 
                        strokeWidth="2.5"
                    />
                    <polygon 
                        points="50,45 95,25 95,75 50,95" 
                        fill="rgba(0,0,0,0.1)" 
                        stroke={diceColor} 
                        strokeWidth="2.5"
                    />
                    <polygon 
                        points="50,45 50,95 5,75 5,25" 
                        fill="rgba(0,0,0,0.1)" 
                        stroke={diceColor} 
                        strokeWidth="2.5"
                    />
                    <text 
                        x="50" 
                        y="60" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill={diceColor} 
                        fontSize="24"
                        fontWeight="bold"
                    >
                        {isRolling ? "?" : "20"}
                    </text>
                </svg>
            </Box>
        </Center>
    );
};

const DiceRoller = ({ isOpen, onClose, diceData }) => {
    const [isRolling, setIsRolling] = useState(true);
    const [rollResult, setRollResult] = useState(null);
    
    useEffect(() => {
        if (isOpen && diceData) {
            // Start the rolling animation
            setIsRolling(true);
            setRollResult(null);
            
            // After 3 seconds, show the result but don't close yet
            const timer = setTimeout(() => {
                setIsRolling(false);
                setRollResult(diceData.dice_success);
            }, 3000); // Increased from 2000 to 3000ms
            
            // Auto-close after showing the result for a moment
            const closeTimer = setTimeout(() => {
                if (onClose) onClose();
            }, 6000); // Close 3 seconds after showing the result
            
            return () => {
                clearTimeout(timer);
                clearTimeout(closeTimer);
            };
        }
    }, [isOpen, diceData, onClose]);
    
    useEffect(() => {
        if (!isOpen) {
            setIsRolling(true);
            setRollResult(null);
        }
    }, [isOpen]);

    if (!isOpen || !diceData) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0,0,0,0.7)" />
            <ModalContent
                bg="rgba(26, 26, 26, 0.95)"
                border="1px solid rgba(183,69,250,0.2)"
                boxShadow="0 0 30px rgba(183,69,250,0.3)"
                borderRadius="xl"
                p={6}
                maxW="400px"
                h="400px"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <VStack spacing={6} w="100%" h="100%" justify="center">
                    {/* Dice Roll Title */}
                    <Text 
                        fontSize="2xl" 
                        fontWeight="bold" 
                        color="#B745FA"
                        textAlign="center"
                        textTransform="uppercase"
                        letterSpacing="2px"
                    >
                        {isRolling ? "Rolling Dice..." : (rollResult ? "Success!" : "Failed!")}
                    </Text>
                    
                    {/* SVG D20 Dice */}
                    <D20Component isRolling={isRolling} rollResult={rollResult} />
                    
                    {/* Result Text */}
                    {!isRolling && (
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color={rollResult ? "green.400" : "red.400"}
                            textAlign="center"
                        >
                            {rollResult ? "Your roll succeeded!" : "Your roll failed!"}
                        </Text>
                    )}
                </VStack>
            </ModalContent>
        </Modal>
    );
};

export default DiceRoller;