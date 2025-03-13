import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, SimpleGrid, Text, Image } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="#121212">
      <Box maxW="1200px" mx="auto" px={4}>
        {/* Main Footer Content */}
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 4 }} 
          spacing={8} 
          py={8}
          alignItems="start"
        >
          {/* Brand Section */}
          <Box>
            <Flex alignItems="center" gap={2} mb={2}>
              <Link to="/">
                <Text fontSize="xl" fontWeight="bold" color="#B745FA">
                  Adventure AI
                </Text>
              </Link>
              <Image 
                src="/images/d20-logo.svg" 
                alt="D20 Dice" 
                h="24px"
                transition="transform 0.3s"
                _hover={{ transform: 'rotate(20deg)' }}
                filter="invert(40%) sepia(85%) saturate(7000%) hue-rotate(270deg) brightness(100%) contrast(100%)"
              />
            </Flex>
            <Text color="gray.500" fontSize="sm">
              Where AI meets adventure in endless possibilities
            </Text>
          </Box>

          {/* Game Links */}
          <Box>
            <Text color="#B745FA" fontWeight="bold" fontSize="sm" mb={3}>Game</Text>
            <Flex direction="column" gap={2}>
              <Link to="/how-to-play">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>How to Play</Text>
              </Link>
              <Link to="/game-rules">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Game Rules</Text>
              </Link>
              <Link to="/leaderboard">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Leaderboard</Text>
              </Link>
            </Flex>
          </Box>

          {/* Support Links */}
          <Box>
            <Text color="#B745FA" fontWeight="bold" fontSize="sm" mb={3}>Support</Text>
            <Flex direction="column" gap={2}>
              <Link to="/faq">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>FAQ</Text>
              </Link>
              <Link to="/contact">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Contact Us</Text>
              </Link>
              <Link to="/bug-report">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Report a Bug</Text>
              </Link>
            </Flex>
          </Box>

          {/* Legal Links */}
          <Box>
            <Text color="#B745FA" fontWeight="bold" fontSize="sm" mb={3}>Legal</Text>
            <Flex direction="column" gap={2}>
              <Link to="/privacy">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Privacy Policy</Text>
              </Link>
              <Link to="/terms">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Terms of Service</Text>
              </Link>
              <Link to="/cookies">
                <Text color="gray.500" fontSize="sm" _hover={{ color: '#d67dff' }}>Cookie Policy</Text>
              </Link>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Copyright Section */}
        <Flex 
          borderTop="1px solid rgba(183,69,250,0.1)"
          py={4}
          justifyContent="center"
        >
          <Text color="gray.600" fontSize="xs">
            © {new Date().getFullYear()} Adventure AI. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;