//Importing require modules
import React from 'react'
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