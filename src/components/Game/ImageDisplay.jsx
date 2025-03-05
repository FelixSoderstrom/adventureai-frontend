import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Spinner, Center } from '@chakra-ui/react';

const ImageDisplay = ({ imageUrl, isLoading = false }) => {
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
            ) : (
                <Image
                    src={imageUrl ? `data:image/jpeg;base64,${imageUrl}` : ''}
                    alt="Game Scene"
                    objectFit="contain"
                    w="100%"
                    h="100%"
                />
            )}
        </Box>
    );
};

ImageDisplay.propTypes = {
    imageUrl: PropTypes.string,
    isLoading: PropTypes.bool
};

export default ImageDisplay;