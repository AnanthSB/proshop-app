import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from 'components/Message';
import Loader from 'components/Loader';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery
} from 'slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from 'components/Paginate';

const ProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber
  });

  const [createdProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Sure you wanna delete this product?')) {
      try {
        const res = await deleteProduct(id).unwrap();
        refetch();
        toast.success('Product Deleted Successfully!');
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const createdProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Product?')) {
      try {
        await createdProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createdProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error?.Message?.data || error}
        </Message>
      ) : (
        <>
          <Table stripped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product?._id}>
                  <td>{product?._id}</td>
                  <td>{product?.name}</td>
                  <td>$ {product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product?._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data?.pages} page={pageNumber} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
