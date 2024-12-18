import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from 'Constants/constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => {
        return {
          url: ORDERS_URL,
          method: 'POST',
          body: order
        };
      }
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      keepUnusedDataFor: 5
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details }
      })
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL
      }),
      keepUnusedDataFor: 5
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`
      }),
      keepUnusedDataFor: 5
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL
      }),
      keepUnusedDataFor: 5
    })
  })
});

export const {
  useCreateOrderMutation,
  usePayOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery
} = orderApiSlice;
