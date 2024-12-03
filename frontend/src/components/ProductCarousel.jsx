import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import Message from './Message';

export const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const topProducts = products?.slice(0, 3);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <h2>Top Products</h2>
          <Carousel pauseOnHover className="bg-primary mb-4" interval={2000}>
            {topProducts?.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product?.image} alt={product?.name} fluid />
                  <Carousel.Caption className="carousel-caption">
                    <h2>
                      {product?.name} ${product?.price}
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};
