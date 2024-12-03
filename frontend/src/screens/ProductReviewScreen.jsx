import Loader from 'components/Loader';
import Message from 'components/Message';
import Rating from 'components/Rating';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useCreateProductReviewMutation,
  useGetProductDetailsQuery
} from 'slices/productsApiSlice';

const ProductReviewScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: loadingProductReview }] =
    useCreateProductReviewMutation();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!(rating && comment)) {
      !toast.isActive('productReview') &&
        toast.error('Please select a rating and add a comment', {
          toastId: 'productReview'
        });
      return;
    }
    try {
      await createProductReview({
        rating,
        comment,
        productId: productId
      }).unwrap();
      !toast.isActive('productReview') &&
        toast.success('Review submitted successfully', {
          toastId: 'productReview'
        });
      setRating(0);
      setComment('');
      refetch();
    } catch (err) {
      !toast.isActive('productReview') &&
        toast.error(err?.data?.message || err?.error || err, {
          toastId: 'productReview'
        });
    } finally {
      setRating(0);
      setComment('');
    }
  };

  return (
    <>
      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product?.reviews?.length === 0 && (
            <Message>No reviews for this product</Message>
          )}
          <ListGroup variant="flush">
            {product?.reviews?.map((review) => (
              <ListGroup.Item key={review?._id}>
                <strong>{review?.name}</strong>
                <Rating value={review?.rating} />
                <p>{review?.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']?.map(
                        (x, i) => {
                          return (
                            <option key={x} value={i + 1}>
                              {i + 1} - {x}
                            </option>
                          );
                        }
                      )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loadingProductReview}
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductReviewScreen;
