import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from 'components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from 'slices/usersApiSlice';
import Loader from 'components/Loader';
import { setCredentionals } from 'slices/authSlice';
import { toast } from 'react-toastify';

function RegisterScreen() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState('');
	const [register, { isLoading }] = useRegisterMutation();
	const auth = useSelector((store) => store?.auth);
	const userInfo = auth?.userInfo;
	const { search } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchParam = new URLSearchParams(search);
	const redirect = searchParam.get('redirect') || '/';

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Password does not match!');
			return;
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentionals(...res));
				navigate(redirect);
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);
	return (
		<FormContainer>
			<h1>Sign Up</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name" className="my-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e?.target?.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email" className="my-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e?.target?.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password" className="my-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e?.target?.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="confirmPassword" className="my-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="ConfirmPassword"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e?.target?.value)}
					></Form.Control>
				</Form.Group>
				<Button
					type="submit"
					varient="primary"
					className="mt-2"
					disabled={isLoading}
				>
					Register
				</Button>
				{isLoading && <Loader />}
			</Form>

			<Row className="py-3">
				<Col>
					Already have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default RegisterScreen;
