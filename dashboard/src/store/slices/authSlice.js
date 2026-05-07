// dashboard/src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    user: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => { state.loading = true; },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginFailed: (state) => { state.loading = false; },
        
        getUserRequest: (state) => { state.loading = true; },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        getUserFailed: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        
        logoutRequest: (state) => { state.loading = true; },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        logoutFailed: (state) => { state.loading = false; },

        forgotPasswordRequest: (state) => { state.loading = true; },
        forgotPasswordSuccess: (state) => { state.loading = false; },
        forgotPasswordFailed: (state) => { state.loading = false; },

        resetPasswordRequest: (state) => { state.loading = true; },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        resetPasswordFailed: (state) => { state.loading = false; },

        updateProfileRequest: (state) => { state.loading = true; },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        updateProfileFailed: (state) => { state.loading = false; },

        updatePasswordRequest: (state) => { state.loading = true; },
        updatePasswordSuccess: (state) => {
            state.loading = false;
        },
        updatePasswordFailed: (state) => { state.loading = false; },

        resetAuthSlice: (state) => {
            state.loading = false;
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
        }
    }
});

export const {
    loginRequest, loginSuccess, loginFailed,
    getUserRequest, getUserSuccess, getUserFailed,
    logoutRequest, logoutSuccess, logoutFailed,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed,
    updateProfileRequest, updateProfileSuccess, updateProfileFailed,
    updatePasswordRequest, updatePasswordSuccess, updatePasswordFailed,
    resetAuthSlice
} = authSlice.actions;

export default authSlice.reducer;

export const login = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const response = await axiosInstance.post('/auth/login', data);
        if (response.data.user && response.data.user.role === 'ADMIN') {
            dispatch(loginSuccess(response.data.user));
            toast.success(response.data.message || "Logged in successfully to Nepa Admin");
        } else {
            dispatch(loginFailed());
            toast.error(response.data.message || "Access denied. Admins only.");
        }
    } catch (error) {
        dispatch(loginFailed());
        toast.error(error.response?.data?.message || "An error occurred during login.");
    }
};

export const getUser = () => async (dispatch) => {
    try {
        dispatch(getUserRequest());
        const response = await axiosInstance.get('/auth/me');
        if (response.data.user && response.data.user.role === 'ADMIN') {
             dispatch(getUserSuccess(response.data.user));
        } else {
             dispatch(getUserFailed());
        }
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const response = await axiosInstance.get('/auth/logout');
        dispatch(logoutSuccess());
        toast.success(response.data.message || "Logged out successfully");
        dispatch(resetAuthSlice());
    } catch (error) {
        dispatch(logoutFailed());
        toast.error(error.response?.data?.message || "Logout failed");
        dispatch(resetAuthSlice());
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const response = await axiosInstance.post(`/auth/password/forgot?frontendUrl=${import.meta.env.MODE === "development" ? "http://localhost:5174" : window.location.origin}`, { email });
        dispatch(forgotPasswordSuccess());
        toast.success(response.data.message || "Password reset link sent to your email");
    } catch (error) {
        dispatch(forgotPasswordFailed());
        toast.error(error.response?.data?.message || "Cannot request for a reset password");
    }
};

export const resetPassword = (data, token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const response = await axiosInstance.put(`/auth/password/reset/${token}`, data);
        dispatch(resetPasswordSuccess(response.data.user));
        toast.success(response.data.message || "Password reset successfully");
    } catch (error) {
        dispatch(resetPasswordFailed());
        toast.error(error.response?.data?.message || "Failed to reset password");
    }
};

export const updateAdminProfile = (data) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const response = await axiosInstance.put('/auth/profile/update', data);
        dispatch(updateProfileSuccess(response.data.user));
        toast.success(response.data.message || "Profile updated successfully");
    } catch (error) {
        dispatch(updateProfileFailed());
        toast.error(error.response?.data?.message || "Failed to update profile");
    }
};

export const updateAdminPassword = (data) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const response = await axiosInstance.put('/auth/password/update', data);
        dispatch(updatePasswordSuccess());
        toast.success(response.data.message || "Password updated successfully");
    } catch (error) {
        dispatch(updatePasswordFailed());
        toast.error(error.response?.data?.message || "Failed to update password");
    }
};