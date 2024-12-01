import { USERS_URL } from 'Constants/constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data?.userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    })
  })
});
// use__Mutation mandatery in RTK Query of react js
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = usersApiSlice;
