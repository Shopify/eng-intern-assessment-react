import React from 'react'

type stopWatchBtnProp = {
    type: string,
    action: () => void
}


export default function StopWatchButton(props : stopWatchBtnProp) {
    let {type, action} = props;
    return(
        <div>
            <button className={type} onClick={() => action()} >
                {type}
            </button>
        </div>
    )
}