import React from 'react';
import StopWatch from './StopWatch';
import { ChakraProvider, Text, Center } from '@chakra-ui/react';
import '../src/styles/global.css';

export default function App() {
  return (
    <>
      <ChakraProvider>
        {/* Center component from chakra-ui */}
        <Center h="100vh">
          {/* Stop Watch Component */}
          <StopWatch />
          {/* Footer */}
          <Text fontSize="xs" className="footerCopyRight">
            {`Copyright ${new Date().getFullYear()}`} Rashaun Bennett All Rights
            Reserved
          </Text>
        </Center>
      </ChakraProvider>
    </>
  );
}
