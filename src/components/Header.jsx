import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Text, Image } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Box 
        as="header" 
        bg="#121212" 
        boxShadow="0 2px 10px rgba(183,69,250,0.2)" 
        position="sticky" 
        top="0" 
        zIndex="10"
      >
        <Flex 
          maxW="1200px" 
          mx="auto" 
          p={4} 
          alignItems="center" 
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={4}>
            <Link to="/">
              <Text 
                fontSize="3xl" 
                fontWeight="bold" 
                color="#B745FA"
              >
                Adventure AI
              </Text>
            </Link>
            <Image 
              src="/images/d20-logo.svg" 
              alt="D20 Dice" 
              h="50px" 
              ml={1}
              transition="transform 0.3s"
              _hover={{ transform: 'rotate(20deg)' }}
              filter="invert(40%) sepia(85%) saturate(7000%) hue-rotate(270deg) brightness(100%) contrast(100%)"
            />
          </Flex>

          <Flex gap={8} alignItems="center">
            <Link to="/legal">
              <Text 
                fontSize="lg" 
                color="#B745FA" 
                _hover={{ color: '#d67dff' }}
              >
                Legal
              </Text>
            </Link>
            <Link to="/payment">
              <Text 
                fontSize="lg" 
                color="#B745FA" 
                _hover={{ color: '#d67dff' }}
              >
                Payment
              </Text>
            </Link>
            <Link to="/signup?tab=login">
              <Button
                bg="#B745FA"
                color="white"
                _hover={{ bg: '#9A38D6' }}
                size="md"
              >
                Login
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box borderBottom="1px solid rgba(183,69,250,0.3)" />
    </>
  );
};

export default Header;