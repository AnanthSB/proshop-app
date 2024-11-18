import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'Constants/constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Products', 'Order', 'User'],
  endpoints: (builder) => ({})
});

export const { useGetProductsQuery } = apiSlice; // Export the auto-generated hook
