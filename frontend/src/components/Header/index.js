import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar } from 'react-bootstrap';
import './index.css';

const Header = () => {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" fixed="top">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-auto">
                        <LinkContainer to="/">
                            <Nav.Link className="nav-cal">HOME</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header