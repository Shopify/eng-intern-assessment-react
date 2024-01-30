import React from 'react'
import { Button } from "@chakra-ui/react"

interface PrimaryButtonProps{
    label: string,
    w: string,
    mx: string,
    back: string,
    disableCondition: boolean,
    onClick: ()=>void
}

export default function StopWatchButton({label, back, w, mx, disableCondition, onClick}:PrimaryButtonProps) {
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