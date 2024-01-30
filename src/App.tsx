import React from 'react'
import './App.css'
import StopWatch from './StopWatch'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);


export default function App() {
    return(
        <div className='app'>
            <span className='heading-wrapper'>
                <span className='icon-wrapper'>
                    <FontAwesomeIcon icon={['fas', 'stopwatch']} size='xl'/>
                </span>
                <h1>Shopify Stopwatch</h1>
            </span>
            <StopWatch />
        </div>
    )
}