// dashboard/src/store/slices/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    users: [],
    totalUsers: 0,
    totalUsersCount: 0,
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    monthlySales: [],
    orderStatusCounts: {},
    topSellingProducts: [],
    lowStockProducts: 0,
    revenueGrowth: "",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
  },  reducers: {
        getAllUsersRequest: (state) => { state.loading = true; },
        getAllUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            state.totalUsers = action.payload.totalUsers;
        },
        getAllUsersFailed: (state) => { state.loading = false; },

        deleteUserRequest: (state) => { state.loading = true; },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.id !== action.payload);
            state.totalUsers = Math.max(0, state.totalUsers - 1);
            state.totalUsersCount = Math.max(0, state.totalUsersCount - 1);
        },
        deleteUserFailed: (state) => { state.loading = false; },

        getStatsRequest: (state) => { state.loading = true; },
        getStatsSuccess: (state, action) => {
            state.loading = false;
            state.totalRevenueAllTime = action.payload.totalRevenueAllTime;
            state.todayRevenue = action.payload.todayRevenue;
            state.yesterdayRevenue = action.payload.yesterdayRevenue;
            state.totalUsersCount = action.payload.totalUsersCount;
            state.monthlySales = action.payload.monthlySales;
            state.orderStatusCounts = action.payload.orderStatusCounts;
            state.topSellingProducts = action.payload.topSellingProducts;
            state.lowStockProducts = action.payload.lowStockProducts?.length || 0;
            state.revenueGrowth = action.payload.revenueGrowth;
            state.newUsersThisMonth = action.payload.newUsersThisMonth;
            state.currentMonthSales = action.payload.currentMonthSales;
        },
        getStatsFailed: (state) => { state.loading = false; },
    },

export const {
    getAllUsersRequest, getAllUsersSuccess, getAllUsersFailed,
    deleteUserRequest, deleteUserSuccess, deleteUserFailed,
    getStatsRequest, getStatsSuccess, getStatsFailed
} = adminSlice.actions;

export default adminSlice.reducer;

export const fetchAllUsers = (page = 1) => async (dispatch) => {
    try {
        dispatch(getAllUsersRequest());
        const response = await axiosInstance.get(`/admin/get-all-users?page=${page}`);
        dispatch(getAllUsersSuccess(response.data));
    } catch (error) {
        dispatch(getAllUsersFailed());
    }
};

export const deleteUser = (id, page) => async (dispatch, getState) => {
    try {
        dispatch(deleteUserRequest());
        const response = await axiosInstance.delete(`/admin/delete/${id}`);
        dispatch(deleteUserSuccess(id));
        toast.success(response.data.message || "User deleted successfully");

        const state = getState();
        const updatedTotal = state.admin.totalUsers;
        const updatedMaxPage = Math.ceil(updatedTotal / 10) || 1;
        const validPage = Math.min(page, updatedMaxPage);
        dispatch(fetchAllUsers(validPage));
    } catch (error) {
        dispatch(deleteUserFailed());
        toast.error(error.response?.data?.message || "Failed to delete user");
    }
};

export const getDashboardStats = () => async (dispatch) => {
    try {
        dispatch(getStatsRequest());
        const response = await axiosInstance.get('/admin/fetch/dashboard-stats');
        dispatch(getStatsSuccess(response.data));
    } catch (error) {
        dispatch(getStatsFailed());
    }
};
export default adminSlice