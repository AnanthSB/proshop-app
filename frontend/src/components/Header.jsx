import React, { useEffect } from 'react';
import {
	Navbar,
	Nav,
	Container,
	NavLink,
	Badge,
	NavDropdown,
} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useLogoutMutation } from 'slices/usersApiSlice';
import { setCredentionals } from 'slices/authSlice';
import { useNavigate } from 'react-router-dom';
import logout from 'slices/authSlice';

export default function Header() {
	const { cartItems } = useSelector((store) => store?.cart);
	const userAuth = useSelector((store) => store?.auth);
	const userInfo = userAuth?.userInfo;
	const [logoutAPICall] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await logoutAPICall().unwrap();
			navigate('/login');
			dispatch(logout());
		} catch (error) {
			console.log(error);
		}
	};

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
							{userInfo ? (
								<NavDropdown title={userInfo?.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<NavLink>
										<FaUser />
										Sign In
									</NavLink>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
