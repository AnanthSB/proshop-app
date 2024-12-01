import FormContainer from 'components/FormContainer';
import Loader from 'components/Loader';
import Message from 'components/Message';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery
} from 'slices/usersApiSlice';

const UserEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { refetch } = useGetUsersQuery();
  const { data: user, isLoading, error } = useGetUserDetailsQuery(id);
  const [updatUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setIsAdmin(user?.isAdmin || false);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatUser({
        userId: id,
        name,
        email,
        isAdmin
      });
      toast.success('User Updated Successfully!');
      refetch();
      navigate('/admin/userlist');
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.message?.data || error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                controlId="name"
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                controlId="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Submit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
