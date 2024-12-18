import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import products from 'data/products'
import {
  Form,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row
} from 'react-bootstrap';
import Rating from 'components/Rating';
import { useGetProductDetailsQuery } from 'slices/productsApiSlice';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from 'slices/cartSlice';
import ProductReviewScreen from './ProductReviewScreen';
import Meta from 'components/Meta';
function ProductScreen() {
  // const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const {
    data: product,
    error,
    isLoading
  } = useGetProductDetailsQuery(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  // const product = products?.find((p)=> p._id === productId);

  // const fetchProduct = async ()=>{
  //     const {data} = await axios.get(`/api/products/${productId}`)
  //     setProduct(data);
  // }
  // useEffect(()=>{
  //     fetchProduct();
  //     // eslint-disable-next-line
  // },[])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        // <h2>Loading...</h2>
        <Loader />
      ) : error ? (
        // <div>{error?.data?.message || error?.error}</div>
        <Message varient="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta
            image={product?.image}
            title={product?.name}
            description={product?.description}
          />
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>{product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product?.countInStock).keys()]?.map(
                              (x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={!product?.countInStock}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
      <ProductReviewScreen />
    </>
  );
}

export default ProductScreen;
