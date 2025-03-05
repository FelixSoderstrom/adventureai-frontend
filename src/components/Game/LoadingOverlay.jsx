import React from 'react';
import PropTypes from 'prop-types';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingOverlay = ({ isOpen, message }) => {
    if (!isOpen) return null;

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.7)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
        >
            <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" />
                <Text color="white">{message || 'Loading...'}</Text>
            </VStack>
        </Box>
    );
};

LoadingOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string
};

export default LoadingOverlay;