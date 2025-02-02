import Loader from 'components/Loader';
import Message from 'components/Message';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Link, useParams } from 'react-router-dom';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery
} from 'slices/orderApiSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(
    orderId,
    order
  );
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((store) => store?.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPay && paypal?.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD'
          }
        });
        payPalDispatch({ type: 'setLoadingStatus', value: 'Pending' });
      };
      if (!order?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
    // eslint-disable-next-line
  }, [errorPayPal, order, paypal, payPalDispatch, loadingPayPal]);

  function onApprove(data, actions) {
    return actions?.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).refetch();
        toast.success('Payment Success');
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment Successful.');
  }
  function onError(err) {
    toast.error(err?.data?.message || err?.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice
            }
          }
        ]
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <Loader />
  ) : isError?.message?.data || isError ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {order?.user?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress?.address},{' '}
                {order?.shippingAddress?.city}
                {order?.shippingAddress?.postalCode},{' '}
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message>Paid on {order?.isPaid}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items: </h2>
              {order?.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item?.image} alt={item?.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item?.qty} x ${item?.price} = ${item?.qty * item?.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
