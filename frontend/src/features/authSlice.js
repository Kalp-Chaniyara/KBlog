import { createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    }
})

export const { setLoading, setLogin } = authSlice.actions

export const signup = (data) => async (dispatch) => {          //thunk function
    dispatch(setLoading(true));
    try {
        const res = await axiosInstance.post('/auth/signup', data)
        toast.success('User Sign Up Successfully');
        dispatch(setLogin(true));
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");

    } finally {
        dispatch(setLoading(false));
    }
}

export const login = (data) => async (dispatch) => {          //thunk function
    dispatch(setLoading(true));
    try {
        const res = await axiosInstance.post('/auth/login', data)
        toast.success('User Login Successfully');
        dispatch(setLogin(true));
    } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");

    } finally {
        dispatch(setLoading(false));
    }
}

export const checkAuth = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axiosInstance.get('/auth/check')
        console.log("RESSS in checkAuth Slice", res);
        dispatch(setLogin(true));
    } catch (error) {
        console.log("Not login", error);
        dispatch(setLogin(false));
    } finally {
        dispatch(setLoading(false));
    }
}

export const logout = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axiosInstance.post('/auth/logout');
        dispatch(setLogin(false));
    } catch (error) {
        console.log("Error in logout in Slice", error);
        dispatch(setLogin(true));
    } finally {
        dispatch(setLoading(false));
    }
}

export default authSlice.reducer;


//! https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
//! https://redux.js.org/usage/writing-logic-thunks