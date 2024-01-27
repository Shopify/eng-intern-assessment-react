import React from 'react'
import { ButtonType } from './constants'
import { Button } from '@mui/material'




type StopWatchButtonProps = {
    onClick: Function,
    disabled?: boolean
    type: ButtonType
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <Button 
            variant="contained" 
            onClick={() => props.onClick()}
            color={props.type === ButtonType.START ? 'success' : props.type === ButtonType.STOP ? 'error' : 'primary'}
        >
            {props.type}
        </Button>
    )
}