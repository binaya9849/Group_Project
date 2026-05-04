import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },

  reducers: {


    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed(state) {
      state.loading = false;
    },



    getUserRequest(state) {
      state.loading = true;
    },

    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },



    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed(state) {
      state.loading = false;
    },


    forgotPasswordRequest(state) {
      state.loading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
    },
    forgotPasswordFailed(state) {
      state.loading = false;
    },


    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    resetPasswordFailed(state) {
      state.loading = false;
    },


    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    updateProfileFailed(state) {
      state.loading = false;
    },

    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
    },
    updatePasswordFailed(state) {
      state.loading = false;
    },

    resetAuthSlice(state) {
      state.loading = false;
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
    },
  },
});

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  await
};

export const getUser = () => async (dispatch) => {};

export const logout = () => async (dispatch) => {};

export const forgotPassword = (data) => async (dispatch) => {};

export const resetPassword = (token, data) => async (dispatch) => {};

export const updateProfile = (data) => async (dispatch) => {};

export const updatePassword = (data) => async (dispatch) => {};

export default authSlice.reducer;
