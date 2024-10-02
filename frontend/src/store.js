import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'slices/apiSlice';
import authSliceReducer from 'slices/authSlice';
import cartSliceReducer from 'slices/cartSlice';

const store = configureStore({
	reducer: {
		[apiSlice?.reducerPath]: apiSlice?.reducer,
		cart: cartSliceReducer,
		auth: authSliceReducer,
	},
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare().concat(apiSlice?.middleware),
	devTools: process.env.NODE_ENV !== 'production', // Only enable devTools in development
	// devTools:true, //only true in development
});

export default store;
