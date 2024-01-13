import React, { ReactNode } from 'react'
import { Button } from 'react-bootstrap';

type stopWatchBtnProp = {
    type: string,
    action: () => void,
    icon: ReactNode,
    disabled?: boolean
}

export default function StopWatchButton(props : stopWatchBtnProp) {
    let {type, action, icon, disabled=false} = props;
    return(
        <div>
            <Button className={type} onClick={() => action()} disabled={disabled} style={{borderRadius: "50%", display: "flex", alignItems: "center"}} >
                {icon}
            </Button>
        </div>
    )
}