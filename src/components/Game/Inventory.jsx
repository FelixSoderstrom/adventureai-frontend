import React from 'react';
import { Grid, GridItem, Box, Tooltip, Text } from '@chakra-ui/react';
import useGameStore from '../../stores/gameStore';

const Inventory = () => {
    const { game_session } = useGameStore();

    return (
        <Box>
            <Text 
                color="gray.300" 
                fontSize="xl" 
                mb={4} 
                fontFamily="'Jaro', sans-serif"
            >
                Inventory
            </Text>
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap={4}
            >
                {game_session.inventory && game_session.inventory.map((item, index) => (
                    <Tooltip 
                        key={index} 
                        label={item.description} 
                        placement="top"
                        bg="rgba(26, 26, 26, 0.95)"
                        color="white"
                        p={2}
                        borderRadius="md"
                    >
                        <GridItem
                            bg="rgba(255,255,255,0.05)"
                            border="1px solid rgba(183,69,250,0.2)"
                            borderRadius="lg"
                            p={2}
                            cursor="pointer"
                            _hover={{
                                border: "1px solid rgba(183,69,250,0.4)",
                                boxShadow: "0 0 10px rgba(183,69,250,0.2)"
                            }}
                        >
                            <Box
                                as="img"
                                src={item.image_url}
                                alt={item.name}
                                w="100%"
                                h="100%"
                                objectFit="contain"
                            />
                        </GridItem>
                    </Tooltip>
                ))}
            </Grid>
        </Box>
    );
};

export default Inventory;