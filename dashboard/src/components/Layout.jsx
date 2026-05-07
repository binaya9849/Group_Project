// dashboard/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

const Layout = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 w-full md:ml-72 transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;