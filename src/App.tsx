import React from 'react'
import { ChakraProvider,Box } from '@chakra-ui/react'
import StopWatch from './StopWatch'
import "../styles/StopWatchButton.css";
import "../styles/StopWatch.css";



export default function App() {
    return(
   <ChakraProvider>
    <Box display={"flex"} height={"100vh"} backgroundColor="#f0e7eb" flexDirection={'column'}><StopWatch/></Box>
    </ChakraProvider>
    )
}