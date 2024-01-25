import React from 'react' 
import 'bootstrap/dist/css/bootstrap.css'
import StopWatch from './StopWatch';

export default function App() {  
    return(
        <> 
            <div className="d-flex flex-column align-items-center min-vw-100">
                <h1>Stopwatch App</h1>
                <StopWatch/> 
            </div>  
        </> 
    )
}