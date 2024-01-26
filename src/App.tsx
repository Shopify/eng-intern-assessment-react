//Importing require modules
import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch';


//Define the App Component by returning the StopWatch Component
const App = () => {
    
    return(
        <div className = "StopWatch App">

            <StopWatch />
        </div>
    );
}

//Export the component for use
export default App;