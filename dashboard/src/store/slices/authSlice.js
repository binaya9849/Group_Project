import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};
=======
import { axiosInstance } from "../../lib/axios";
>>>>>>> 072a69ebe75979ab4f7d1cacf3b80406473f30de

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
<<<<<<< HEAD

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
=======
export const login = (data) => async (dispatch) => {
    dispatch(authSlice.actions.loginRequest());
    try {
        await axiosInstance.post("/auth/login", data).then((res) => {
        if (res.data.user.role === 'admin') {
            dispatch(authSlice.actions.loginSuccess(res.data.user));
            toast.success(res.data.message);
        } else {
            dispatch(authSlice.actions.loginFailed());
            toast.error(res.data.message);
        }
      });
    } catch (error) {
      dispatch(authSlice.actions.loginFailed());
      toast.error(error.response.data.message || "Login Failed");
    }
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    await axiosInstance.get("/auth/me").then((res) => {
       dispatch(authSlice.actions.getUserSuccess(res.data.user));
      });
      } catch (error) {
        dispatch(authSlice.actions.getUserFailed());
      }
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    await axiosInstance.get("/auth/logout").then((res) => {
    dispatch(authSlice.actions.resetAuthSuccess());
    toast.success(res.data.message);
    });
  } catch (error) {
    dispatch(authSlice.actions.getUserFailedFailed());
    toast.error(error.response.data.message || "Logout Failed.");
    dispatch(authSlice.actions.resetAuthSlice());
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try{
    await axiosInstance
    .post("/auth/password/forgot?frontendUrl=http://localhost:5174",  email )
     .then((res) => {
        dispatch(authSlice.actions.forgotPasswordSuccess());
        toast.success(res.data.message);
      });
  } catch (error) {
    dispatch(authSlice.actions.forgotPasswordFailed());
    toast.error(
      error.response.data.message || "cannot request for reset password."
   );
 
 }
};
export const resetPassword = (newData, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try{
    await axiosInstance
    .post(`/auth/password/reset/${token}`, newData) 
     .then((res) => {
        dispatch(authSlice.actions.resetPasswordSuccess(res.data.user));
        toast.success(res.data.message);
      });
  } catch (error) {
    dispatch(authSlice.actions.resetPasswordFailed());
    toast.error(error.response.data.message || "failed to reset password.");
  }
};
export const updateAdminProfile = (Data) => async (dispatch) => {
  dispatch(authSlice.actions.updateProfileRequest());
  try{
    await axiosInstance.put(`/auth/profile/update`, Data).then((res) => { 
        dispatch(authSlice.actions.updateProfileSuccess(res.data.user));
        toast.success(res.data.message);
      });
  } catch (error) {
    dispatch(authSlice.actions.updateProfileFailed());
    toast.error(error.response.data.message || "failed to update profile.");
  }
};

export const updateAdminPassword = (Data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try{
    await axiosInstance.put(`/auth/password/update`, Data).then((res) => { 
        dispatch(authSlice.actions.updatePasswordSuccess());
        toast.success(res.data.message);
      });
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailed());
    toast.error(error.response.data.message || "failed to update password.");
  }
};
export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};


>>>>>>> 072a69ebe75979ab4f7d1cacf3b80406473f30de

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