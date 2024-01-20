import React from 'react';
import Stopwatch from './StopWatch'; // Importing the Stopwatch component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles/App.css';

/**
 * The main App component.
 * 
 * This component is responsible for rendering the entire stopwatch application.
 * It primarily renders the Stopwatch component, which includes all the functionalities
 * and UI elements of the stopwatch.
 */
const App = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
            <Stopwatch />
            </div>
        </div>
        
    );
};

export default App;
