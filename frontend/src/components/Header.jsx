import React from 'react'
import {Navbar, Nav, Container, NavLink} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <img src={logo} alt="Proshop"/>
                        Proshop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <LinkContainer to="/cart">
                            <NavLink><FaShoppingCart/>Cart</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <NavLink><FaUser/>Sign In</NavLink>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
