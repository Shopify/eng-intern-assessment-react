import React from 'react'
import { Button } from "@chakra-ui/react"

// button props to change styles between buttons as inputs in the render
interface PrimaryButtonProps{
    label: string,
    back: string,
    disableCondition: boolean,
    onClick: ()=>void
}


export default function StopWatchButton({label, back, disableCondition, onClick}:PrimaryButtonProps) {
    return(
        <>
            <Button
                mx="5%"
                w="90%"
                bg={back} 
                color="black" 
                minH="3.5rem"
                onClick={onClick}
                _hover={{ bg: "#E3FCEF", border: "none" }}
                isDisabled={(disableCondition)} 
                _disabled={{ opacity: '0.4', cursor: 'not-allowed'}}
            >
                {label}
            </Button>
        </>
    );
}
