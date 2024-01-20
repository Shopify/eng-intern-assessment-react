import React from 'react'
import { ChakraProvider,Box } from '@chakra-ui/react'
import StopWatch from './StopWatch'


export default function App() {
    return(
   <ChakraProvider>
    <Box display={"flex"} flexDirection={'column'}><StopWatch/></Box>
    </ChakraProvider>
    )
}