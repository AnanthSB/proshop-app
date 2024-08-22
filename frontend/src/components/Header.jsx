import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavLink, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

export default function Header() {
	const { cartItems } = useSelector((store) => store?.cart);

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} alt="Proshop" />
							Proshop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<NavLink>
									<FaShoppingCart />
									Cart
									{cartItems?.length > 0 && (
										<Badge pill bg="success" style={{ marginLeft: '5px' }}>
											{cartItems?.reduce((a, c) => a + c.qty, 0)}
										</Badge>
									)}
								</NavLink>
							</LinkContainer>
							<LinkContainer to="/login">
								<NavLink>
									<FaUser />
									Sign In
								</NavLink>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
