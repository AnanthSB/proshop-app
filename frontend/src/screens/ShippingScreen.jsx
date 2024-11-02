import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from 'components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from 'slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from 'components/CheckoutSteps';

function ShippingScreen() {
	const cart = useSelector((state) => state.cart);
	const shippingAddress = cart?.shippingAddress;

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [country, setCountry] = useState(shippingAddress?.country || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ''
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, country, postalCode }));
		navigate('/payment');
		console.log({ address, city, country, postalCode });
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2/>
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e?.target?.value)}
					/>
				</Form.Group>
				{/* City */}
				<Form.Group>
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						value={city}
						placeholder="City"
						onChange={(e) => setCity(e?.target.value)}
					/>
				</Form.Group>
				{/* Postal Code */}
				<Form.Group>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="number"
						value={postalCode}
						onChange={(e) => setPostalCode(e?.target?.value)}
						placeholder="Postal Code"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e?.target?.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary" className="my-2">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default ShippingScreen;
