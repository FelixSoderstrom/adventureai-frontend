import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, HStack } from '@chakra-ui/react';

const ActionInput = ({ onSubmit, disabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <HStack spacing={4} bg="rgb(214, 209, 195)" p={4} borderRadius="md">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What do you want to do?"
                    bg="white"
                    color="black"
                    disabled={disabled}
                />
                <Button 
                    type="submit" 
                    colorScheme="blue"
                    disabled={disabled}
                >
                    Submit
                </Button>
            </HStack>
        </form>
    );
};

ActionInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default ActionInput;