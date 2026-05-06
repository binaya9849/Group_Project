// dashboard/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from './components/SideBar';
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
    const { openComponent } = useSelector((state) => state.extra);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const renderDashboardComponent = () => {
        switch (openComponent) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Orders':
                return <Orders />;
            case 'Users':
                return <Users />;
            case 'Profile':
                return <Profile />;
            case 'Products':
                return <Products />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isAuthenticated && user?.role === 'ADMIN' ? (
                            <div className="flex bg-gray-50 min-h-screen">
                                <Sidebar />
                                <div className="flex-1 w-full md:ml-72 transition-all duration-300">
                                    {renderDashboardComponent()}
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;