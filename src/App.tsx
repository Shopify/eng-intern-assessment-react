import React from 'react'
import { ChakraProvider, Container } from "@chakra-ui/react"
import StopWatch from './StopWatch';

export default function App() {
       return(
        <ChakraProvider>
            <Container
            maxW={['container.sm', 'container.md', 'container.lg']}
            p="0"
            mx="auto"
            minHeight={"100vh"}>
                <StopWatch />
            </Container>
        </ChakraProvider>
    )
}