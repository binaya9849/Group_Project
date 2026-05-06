import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ---------------- LOGIN ----------------
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------- GET USER ----------------
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

    // ---------------- LOGOUT ----------------
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed(state) {
      state.loading = false;
    },

    // ---------------- FORGOT PASSWORD ----------------
    forgotPasswordRequest(state) {
      state.loading = true;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
    },
    forgotPasswordFailed(state) {
      state.loading = false;
    },

    // ---------------- RESET PASSWORD ----------------
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetPasswordFailed(state) {
      state.loading = false;
    },

    // ---------------- UPDATE PROFILE ----------------
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

    // ---------------- UPDATE PASSWORD ----------------
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
    },
    updatePasswordFailed(state) {
      state.loading = false;
    },

    // ---------------- RESET STATE ----------------
    resetAuthSlice() {
      return initialState;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  resetAuthSlice,
} = authSlice.actions;

// ======================= THUNKS =======================

// LOGIN
export const login = (data) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    // Replace with your backend URL
    const response = await axios.post("/api/v1/login", data);

    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(
      loginFailed(
        error.response?.data?.message || "Login failed"
      )
    );
  }
};

// GET USER
export const getUser = () => async (dispatch) => {
  try {
    dispatch(getUserRequest());

    const response = await axios.get("/api/v1/me");

    dispatch(getUserSuccess(response.data.user));
  } catch (error) {
    dispatch(getUserFailed());
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await axios.post("/api/v1/logout");

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed());
  }
};

// FORGOT PASSWORD
export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    await axios.post("/api/v1/password/forgot", data);

    dispatch(forgotPasswordSuccess());
  } catch (error) {
    dispatch(forgotPasswordFailed());
  }
};

// RESET PASSWORD
export const resetPassword = (token, data) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const response = await axios.put(
      `/api/v1/password/reset/${token}`,
      data
    );

    dispatch(resetPasswordSuccess(response.data.user));
  } catch (error) {
    dispatch(resetPasswordFailed());
  }
};

// UPDATE PROFILE
export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const response = await axios.put("/api/v1/me/update", data);

    dispatch(updateProfileSuccess(response.data.user));
  } catch (error) {
    dispatch(updateProfileFailed());
  }
};

// UPDATE PASSWORD
export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());

    await axios.put("/api/v1/password/update", data);

    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFailed());
  }
};

export default authSlice.reducer;