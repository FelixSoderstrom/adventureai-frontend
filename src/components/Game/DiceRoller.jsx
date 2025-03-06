import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    VStack,
    Text,
    Button,
    Box,
    Center
} from '@chakra-ui/react';

const DiceRoller = ({ isOpen, onClose, diceThreshold, diceRoll }) => {
    const [showRoll, setShowRoll] = useState(false);

    const handleRollClick = () => {
        setShowRoll(true);
        // Wait a bit before closing the modal
        setTimeout(() => {
            onClose();
            setShowRoll(false);
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <ModalOverlay backdropFilter='blur(10px)' />
            <ModalContent bg="gray.800" color="white" p={6}>
                <ModalBody>
                    <VStack spacing={8} align="center">
                        <Text fontSize="xl" textAlign="center">
                            To do that you must roll a {diceThreshold}!
                        </Text>

                        <Box 
                            w="150px" 
                            h="150px" 
                            bg="gray.700" 
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {showRoll && (
                                <Text fontSize="6xl" fontWeight="bold">
                                    {diceRoll}
                                </Text>
                            )}
                        </Box>

                        <Button
                            colorScheme="purple"
                            size="lg"
                            onClick={handleRollClick}
                            isDisabled={showRoll}
                        >
                            Roll the Dice!
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

DiceRoller.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    diceThreshold: PropTypes.number.isRequired,
    diceRoll: PropTypes.number.isRequired
};

export default DiceRoller; 