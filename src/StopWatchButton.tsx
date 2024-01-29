import React from 'react'
import { Button } from "@chakra-ui/react"

interface PrimaryButtonProps{
    label: string,
    back: string,
    disableCondition: boolean,
    onClick: ()=>void,
    testId: string
}

export default function StopWatchButton({label, back, disableCondition, onClick, testId}:PrimaryButtonProps) {
    return(
        <>
            <Button
                w="full" 
                variant="solid"
                bg={back} 
                color="white" 
                minH="3.5rem"
                onClick={onClick}
                _hover={{ bg: "yellow", border: "none" }}
                isDisabled={(disableCondition)} 
                _disabled={{ opacity: '0.4', cursor: 'not-allowed', bgColor: 'red', color: 'black'}}
            >
                {label}
            </Button>
        </>
    );
}