import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { useGetOrdersQuery } from 'slices/orderApiSlice';

function OrderListScreen() {
  // const { data: orders, isLoading, error } = useGetOrdersQuery();
  const isLoading = false;
  const error = false;
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error?.message?.data || error?.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{order?.user?.name}</td>
                <td>{order?.createdAt?.substring(0, 10)}</td>
                <td>{order?.totalPrice}</td>
                {order?.isPaid ? (
                  order?.paidAt?.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
                {order?.isDelivered ? (
                  order?.deliveredAt?.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
                <td>
                  <LinkContainer to={`/order/${order?._id}`}>
                    <Button variant="light">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderListScreen;

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
    deliveredAt: '',
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
    deliveredAt: Date(1732008168319),
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
    deliveredAt: '',
    createdAt: Date(1732008168319),
    updatedAt: Date(1732008168319)
  }
];
