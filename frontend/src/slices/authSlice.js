import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentionals: (state, action) => {
			state.userInfo = action?.payload;
			// Store userInfo in localStorage to persist it after page reloads
			localStorage.setItem('userInfo', JSON.stringify(action?.payload));
		},
		logout: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentionals, logout } = authSlice.actions;

export default authSlice.reducer;
