import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'

/*
    Header component that displays the header
*/

export default function Header() {
    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand className="m-2 bar">
                    <img
                        src="https://www.svgrepo.com/show/303503/shopify-logo.svg"
                        width="33"
                        height="33"
                    />
                    <h4 className="header-text">
                        Taseen's StopWatch
                    </h4>
                </Navbar.Brand>
            </Navbar>
        </>
    )
}