import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

const SignupLogin = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 0 : 1;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);

  const handleSocialLogin = (provider) => {
    // Add social login logic here
  };

  return (
    <Box
      bg="#121212"
      minH="100vh"
      py={20}
      backgroundImage="radial-gradient(circle at center, rgba(183,69,250,0.1) 0%, rgba(0,0,0,0) 70%)"
    >
      <Container maxW="md">
        <VStack
          spacing={8}
          bg="rgba(26, 26, 26, 0.95)"
          p={8}
          borderRadius="xl"
          boxShadow="0 4px 30px rgba(183,69,250,0.2)"
          border="1px solid rgba(183,69,250,0.1)"
          backdropFilter="blur(10px)"
        >
          <Tabs isFitted variant="soft-rounded" width="100%" defaultIndex={defaultTab}>
            <TabList mb="1.5em">
              <Tab
                color="gray.400"
                _selected={{
                  color: "white",
                  bg: "#B745FA",
                  boxShadow: "0 0 20px rgba(183,69,250,0.3)",
                }}
                _hover={{
                  color: "white",
                }}
              >
                Sign Up
              </Tab>
              <Tab
                color="gray.400"
                _selected={{
                  color: "white",
                  bg: "#B745FA",
                  boxShadow: "0 0 20px rgba(183,69,250,0.3)",
                }}
                _hover={{
                  color: "white",
                }}
              >
                Login
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel color="gray.300">Email</FormLabel>
                    <Input
                      type="email"
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(183,69,250,0.2)"
                      color="white"
                      _hover={{
                        border: "1px solid rgba(183,69,250,0.4)",
                      }}
                      _focus={{
                        border: "1px solid #B745FA",
                        boxShadow: "0 0 0 1px #B745FA",
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.300">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid rgba(183,69,250,0.2)"
                        color="white"
                        _hover={{
                          border: "1px solid rgba(183,69,250,0.4)",
                        }}
                        _focus={{
                          border: "1px solid #B745FA",
                          boxShadow: "0 0 0 1px #B745FA",
                        }}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "white" }}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    w="100%"
                    bg="#B745FA"
                    color="white"
                    _hover={{
                      bg: "#9A38D6",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 20px rgba(183,69,250,0.4)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      boxShadow: "0 2px 10px rgba(183,69,250,0.4)",
                    }}
                    transition="all 0.2s"
                    isLoading={isLoading}
                  >
                    Sign Up
                  </Button>

                  <VStack w="100%" spacing={4} pt={4}>
                    <Divider borderColor="rgba(183,69,250,0.2)" />
                    <Text color="gray.400">Continue with</Text>
                    <HStack spacing={4} w="100%">
                      <Button
                        w="100%"
                        variant="outline"
                        borderColor="rgba(183,69,250,0.2)"
                        color="gray.300"
                        leftIcon={<FaGoogle style={{ color: "#DB4437" }} />}
                        _hover={{
                          bg: "rgba(183,69,250,0.1)",
                          borderColor: "#B745FA",
                        }}
                        onClick={() => handleSocialLogin("google")}
                      >
                        Google
                      </Button>
                      <Button
                        w="100%"
                        variant="outline"
                        borderColor="rgba(183,69,250,0.2)"
                        color="gray.300"
                        leftIcon={<FaFacebookF style={{ color: "#4267B2" }} />}
                        _hover={{
                          bg: "rgba(183,69,250,0.1)",
                          borderColor: "#B745FA",
                        }}
                        onClick={() => handleSocialLogin("facebook")}
                      >
                        Facebook
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>
              </TabPanel>

              {/* Login Panel - Similar structure to Sign Up panel */}
              <TabPanel>
                <VStack spacing={6}>
                  <FormControl>
                    <FormLabel color="gray.300">Email</FormLabel>
                    <Input
                      type="email"
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(183,69,250,0.2)"
                      color="white"
                      _hover={{
                        border: "1px solid rgba(183,69,250,0.4)",
                      }}
                      _focus={{
                        border: "1px solid #B745FA",
                        boxShadow: "0 0 0 1px #B745FA",
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color="gray.300">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid rgba(183,69,250,0.2)"
                        color="white"
                        _hover={{
                          border: "1px solid rgba(183,69,250,0.4)",
                        }}
                        _focus={{
                          border: "1px solid #B745FA",
                          boxShadow: "0 0 0 1px #B745FA",
                        }}
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "white" }}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    w="100%"
                    bg="#B745FA"
                    color="white"
                    _hover={{
                      bg: "#9A38D6",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 20px rgba(183,69,250,0.4)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      boxShadow: "0 2px 10px rgba(183,69,250,0.4)",
                    }}
                    transition="all 0.2s"
                    isLoading={isLoading}
                  >
                    Login
                  </Button>

                  <Text
                    color="#B745FA"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    fontSize="sm"
                  >
                    Forgot Password?
                  </Text>

                  <VStack w="100%" spacing={4}>
                    <Divider borderColor="rgba(183,69,250,0.2)" />
                    <Text color="gray.400">Continue with</Text>
                    <HStack spacing={4} w="100%">
                      <Button
                        w="100%"
                        variant="outline"
                        borderColor="rgba(183,69,250,0.2)"
                        color="gray.300"
                        leftIcon={<FaGoogle style={{ color: "#DB4437" }} />}
                        _hover={{
                          bg: "rgba(183,69,250,0.1)",
                          borderColor: "#B745FA",
                        }}
                        onClick={() => handleSocialLogin("google")}
                      >
                        Google
                      </Button>
                      <Button
                        w="100%"
                        variant="outline"
                        borderColor="rgba(183,69,250,0.2)"
                        color="gray.300"
                        leftIcon={<FaFacebookF style={{ color: "#4267B2" }} />}
                        _hover={{
                          bg: "rgba(183,69,250,0.1)",
                          borderColor: "#B745FA",
                        }}
                        onClick={() => handleSocialLogin("facebook")}
                      >
                        Facebook
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignupLogin;
