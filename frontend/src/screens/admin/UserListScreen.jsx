import Loader from 'components/Loader';
import Message from 'components/Message';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useDeleteUserMutation, useGetUsersQuery } from 'slices/usersApiSlice';

const UserListScreen = () => {
  const {
    data: users,
    isLoading: usersLoading,
    error,
    refetch
  } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm('Sure you wanna delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User Deleted Successfully!');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
    refetch();
  };

  return (
    <>
      <h1>Users</h1>
      {usersLoading || deleteLoading ? (
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td>{user?._id}</td>
                <td>{user?.name}</td>
                <td>
                  <a href={`mailto:${user?.email}`}>{user?.email}</a>
                </td>
                <td>
                  {user?.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user?._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(user?._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
