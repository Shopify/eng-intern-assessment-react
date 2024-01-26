import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Header.css'

export default function Header() {
    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand>
                    <img
                    src="https://www.svgrepo.com/show/303503/shopify-logo.svg"
                    width="30"
                    height="30"
                    className="align-top"
                    />
                    <h4 className="d-inline-block">
                        Taseen's StopWatch
                    </h4>
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}