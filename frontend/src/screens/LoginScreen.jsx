import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from 'components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from 'slices/usersApiSlice';
import Loader from 'components/Loader';
import { setCredentionals } from 'slices/authSlice';
import { toast } from 'react-toastify';

function LoginScreen() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [login, { isLoading }] = useLoginMutation();
	const auth = useSelector((store) => store?.auth);
	const userInfo = auth?.userInfo;
	const { search } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchParam = new URLSearchParams(search);
	const redirect = searchParam.get('redirect') || '/';

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentionals(res));
			navigate(redirect);
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);
	return (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={submitHandler}>
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
				<Button
					type="submit"
					varient="primary"
					className="mt-2"
					disabled={isLoading}
				>
					Sign In
				</Button>
				{isLoading && <Loader />}
			</Form>

			<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginScreen;
