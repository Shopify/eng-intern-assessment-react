import React from 'react'
import { ButtonType } from './constants'
import { Button } from '@mui/material'




type StopWatchButtonProps = {
    onClick: Function,
    disabled?: boolean
    type: ButtonType
    "data-testid": String,
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
        <Button 
            data-testid={props['data-testid']}
            variant="contained" 
            onClick={() => props.onClick()}
            disabled={props.disabled}
            color={props.type === ButtonType.START ? 'success' : props.type === ButtonType.STOP ? 'error' : 'primary'}
        >
            {props.type}
        </Button>
    )
}