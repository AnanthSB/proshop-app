import { createAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { ORDERS_URL } from 'Constants/constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => {
        return {
          url: ORDERS_URL,
          method: 'POST',
          body: order,
          credentials: 'include'
        }
      }
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      keepUnusedDataFor: 5
    })
  })
});

export const { useCreateOrderMutation, useGetOrderDetailsMutation } = orderApiSlice;
