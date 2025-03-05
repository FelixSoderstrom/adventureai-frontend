import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';

const StoryDisplay = React.memo(({ story }) => {
    return (
        <Box
            bg="gray.700"
            p={4}
            borderRadius="md"
            overflowY="auto"
            height="100%"
        >
            <Text color="white" fontSize="lg" whiteSpace="pre-wrap">
                {story}
            </Text>
        </Box>
    );
});

StoryDisplay.displayName = 'StoryDisplay';
StoryDisplay.propTypes = {
    story: PropTypes.string.isRequired
};

export default StoryDisplay;