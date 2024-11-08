import { createAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { ORDERS_URL } from 'Constants/constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
      })
    })
  })
});

export const { useCreateOrderMutation } = orderApiSlice;
