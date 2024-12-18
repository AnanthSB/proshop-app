import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { useGetProductsQuery } from 'slices/productsApiSlice.js';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from 'components/Paginate';
import SearchBox from 'components/SearchBox';
import { ProductCarousel } from 'components/ProductCarousel';

function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const params = useParams();
  const keyword = params.keyword || '';
  const pageNumber = params.pageNumber || 1;
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber
  });
  // const fetchProducts = async () => {
  //   const { data } = await axios.get("/api/products");
  //   setProducts(data);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-3">
          Go Back
        </Link>
      )}
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
          <Row className="g-4 mb-3" style={{ minHeight: '480px' }}>
            {data?.products?.map((product) => (
              <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data?.pages} page={data?.page} isAdmin={false} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
