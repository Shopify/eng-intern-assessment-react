import React from 'react' 
import 'bootstrap/dist/css/bootstrap.css'
import StopWatch from './StopWatch';

//Main App. 
export default function App() {  
    return(
        <> 
            <div id="page-container">
                <h1>Stopwatch App</h1>
                <StopWatch/> 
            </div>  
        </> 
    )
}