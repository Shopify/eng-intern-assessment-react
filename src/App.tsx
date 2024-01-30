import React from 'react'
import { ChakraProvider, Container } from "@chakra-ui/react"
import StopWatch from './StopWatch';

export default function App() {
       return(
        <div>
            <ChakraProvider>
                <Container
                maxW={['container.sm', 'container.md', 'container.lg']}
                p="0"
                m="0"
                minW={"100vw"}
                minHeight={"100vh"}
                fontFamily="Verdana"
                bg="black">
                    <StopWatch />
                </Container>
            </ChakraProvider>
        </div>
    )
}