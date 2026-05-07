import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Users from './components/Users';
import Profile from './components/Profile';
import Products from './components/Products';

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { getUser } from './store/slices/authSlice';

const App = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isAuthenticated && user?.role === 'ADMIN' ? (
                            <Layout />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                >
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="products" element={<Products />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;