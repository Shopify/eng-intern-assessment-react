import React from 'react'
import {Button, Text} from '@shopify/polaris'
interface Props {
    buttonType: string;
    onClick: Function;
}

const StopWatchButton: React.FC<Props> = ({ buttonType, onClick }) => {
    return(
      <Button variant='primary' onClick={()=>onClick()}>{buttonType}</Button>
    )
}

export default StopWatchButton;