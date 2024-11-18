import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { useGetProductsQuery } from 'slices/productsApiSlice.js';
import Loader from 'components/Loader';
import Message from 'components/Message';

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const { data: products, isLoading, error } = useGetProductsQuery();

  // const fetchProducts = async () => {
  //   const { data } = await axios.get("/api/products");
  //   setProducts(data);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <>
      {isLoading ? (
        <>
          {/* <h2>...Loading</h2> */}
          <Loader />
        </>
      ) : error ? (
        // <div>{error?.data?.message || error?.error}</div>
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row className="g-4">
            {products?.map((product) => (
              <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
