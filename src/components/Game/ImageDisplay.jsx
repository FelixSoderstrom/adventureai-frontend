import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Spinner, Center } from '@chakra-ui/react';

const ImageDisplay = ({ imageUrl, isLoading = false }) => {
    // Add console log to debug the image URL
    console.log("Image URL received:", imageUrl);
    
    return (
        <Box
            bg="gray.800"
            borderRadius="md"
            overflow="hidden"
            position="relative"
            height="100%"
        >
            {isLoading ? (
                <Center h="100%">
                    <Spinner size="xl" color="white" />
                </Center>
            ) : imageUrl ? (
                <Image
                    src={`data:image/jpeg;base64,${imageUrl}`}
                    alt="Game Scene"
                    objectFit="contain"
                    w="100%"
                    h="100%"
                />
            ) : (
                <Center h="100%">
                    <Text color="gray.400">No image available</Text>
                </Center>
            )}
        </Box>
    );
};

ImageDisplay.propTypes = {
    imageUrl: PropTypes.string,
    isLoading: PropTypes.bool
};

export default ImageDisplay;