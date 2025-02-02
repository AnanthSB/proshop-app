import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { useProfileMutation } from 'slices/usersApiSlice';
import { setCredentionals } from 'slices/authSlice';
import { toast } from 'react-toastify';
import { useGetMyOrdersQuery } from 'slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passowrd, setPassowrd] = useState('');
  const [confirmPassowrd, setConfirmPassowrd] = useState('');

  const { userInfo } = useSelector((store) => store?.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name || '');
      setEmail(userInfo?.email || '');
    }
  }, [userInfo, userInfo?.name, userInfo?.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (passowrd !== confirmPassowrd) {
      toast.error('Password dones not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          passowrd
        }).unwrap();
        dispatch(setCredentionals(res));
        toast.success('Updated profile successfully.');
      } catch (error) {
        toast.error(error?.data?.message || error?.message || error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e?.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e?.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={passowrd}
              onChange={(e) => setPassowrd(e?.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassowrd}
              onChange={(e) => setConfirmPassowrd(e?.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
          {updateProfileLoading && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <></>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders?.map((order) => (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.createdAt?.substring(0, 10)}</td>
                  <td>{order?.totalPrice}</td>
                  <td>
                    {order?.isPaid ? (
                      order?.paidAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order?.isDelivered ? (
                      order?.deliveredAt?.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`order/${order?._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
// will remove this dummy data once the paypal payment issue is resolved.
const dummyOrders = [
  {
    _id: '673c58e83098e9cde024ec78',
    user: '66be2acfa2d35eee93a85293',
    orderItems: [
      {
        name: 'Cannon EOS 80D DSLR Camera',
        qty: 1,
        image: '/images/camera.jpg',
        price: 929.99,
        product: '66be2acfa2d35eee93a85299',
        _id: '673c58e83098e9cde024ec79'
      }
    ],
    shippingAddress: {
      address: 'Hitech City',
      city: 'Hyderabad',
      postalCode: 500081,
      country: 'India'
    },
    paymentMethod: 'PayPal',
    itemsPrice: 929.99,
    taxPrice: 139.5,
    shippingPrice: 0,
    totalPrice: 1069.49,
    isPaid: false,
    isDelivered: false,
    createdAt: Date(1732008168319),
    updatedAt: Date(1732008168319)
  },
  {
    _id: '673c58e83098e9cde024ec78',
    user: '66be2acfa2d35eee93a85293',
    orderItems: [
      {
        name: 'Cannon EOS 80D DSLR Camera',
        qty: 1,
        image: '/images/camera.jpg',
        price: 929.99,
        product: '66be2acfa2d35eee93a85299',
        _id: '673c58e83098e9cde024ec79'
      }
    ],
    shippingAddress: {
      address: 'Hitech City',
      city: 'Hyderabad',
      postalCode: 500081,
      country: 'India'
    },
    paymentMethod: 'PayPal',
    itemsPrice: 929.99,
    taxPrice: 139.5,
    shippingPrice: 0,
    totalPrice: 1069.49,
    isPaid: true,
    isDelivered: true,
    createdAt: Date(1732008168319),
    updatedAt: Date(1732008168319)
  },
  {
    _id: '673c58e83098e9cde024ec78',
    user: '66be2acfa2d35eee93a85293',
    orderItems: [
      {
        name: 'Cannon EOS 80D DSLR Camera',
        qty: 1,
        image: '/images/camera.jpg',
        price: 929.99,
        product: '66be2acfa2d35eee93a85299',
        _id: '673c58e83098e9cde024ec79'
      }
    ],
    shippingAddress: {
      address: 'Hitech City',
      city: 'Hyderabad',
      postalCode: 500081,
      country: 'India'
    },
    paymentMethod: 'PayPal',
    itemsPrice: 929.99,
    taxPrice: 139.5,
    shippingPrice: 0,
    totalPrice: 1069.49,
    isPaid: false,
    isDelivered: false,
    createdAt: Date(1732008168319),
    updatedAt: Date(1732008168319)
  }
];
