import React, { ReactNode } from 'react'
import { Button } from 'react-bootstrap';

type stopWatchBtnProp = {
    type: string,
    action: () => void,
    icon: ReactNode,
    disabled?: boolean,
    dataTestid: string
}


/**
 * StopWatchButton is a component that renders a button with specific properties.
 *
 * @param {stopWatchBtnProp} props - The properties object that contains all the values needed for the component.
 * @param {string} props.type - The type of the button, which will be used as the className for styling.
 * @param {Function} props.action - The function to be executed when the button is clicked.
 * @param {JSX.Element} props.icon - The icon to be displayed on the button.
 * @param {boolean} [props.disabled=false] - A flag indicating whether the button should be disabled.
 * @param {string} [props.dataTestid=null] - The 'data-testid' attribute for the button, useful for testing.
 * @returns {JSX.Element} A div element containing a Button component with the specified properties.
 */
export default function StopWatchButton(props : stopWatchBtnProp) {
    let {type, action, icon, disabled=false, dataTestid=null} = props;
    return(
        <div>
            <Button className={type} onClick={() => action()} disabled={disabled} style={{borderRadius: "50%", display: "flex", alignItems: "center"}} data-testid={dataTestid} >
                {icon}
            </Button>
        </div>
    )
}