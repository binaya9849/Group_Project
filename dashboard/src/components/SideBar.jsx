// dashboard/src/components/SideBar.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Package, Users as UsersIcon, User, MoveLeft, LogOut } from 'lucide-react';
import { toggleComponent, toggleNavbar } from '../store/slices/extraSlice';
import { logout } from '../store/slices/authSlice';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        { icon: LayoutDashboard, title: 'Dashboard' },
        { icon: ListOrdered, title: 'Orders' },
        { icon: Package, title: 'Products' },
        { icon: UsersIcon, title: 'Users' },
        { icon: User, title: 'Profile' }
    ];

    const { isNavbarOpen } = useSelector((state) => state.extra);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated) {
        return navigate('/login');
    }

    return (
        <aside className={`${isNavbarOpen ? "left-2.5" : "-left-full"} fixed w-64 h-[97.5%] rounded-xl bg-white z-20 mt-2.5 transition-all duration-300 shadow-xl p-5 flex flex-col justify-between md:left-2.5`}>
            <div className="space-y-4">
                <div className="flex flex-col gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between text-2xl font-black text-blue-600 tracking-tight">
                        <span>Nepa Admin</span>
                        <MoveLeft 
                            className="block md:hidden cursor-pointer text-gray-500 hover:text-gray-800 transition" 
                            onClick={() => dispatch(toggleNavbar())} 
                        />
                    </div>
                </div>
                
                <div className="space-y-2 mt-4">
                    {links.map((item, index) => (
                        <button 
                            key={index} 
                            onClick={() => { 
                                setActiveLink(index); 
                                dispatch(toggleComponent(item.title)); 
                                if(window.innerWidth < 768) dispatch(toggleNavbar());
                            }} 
                            className={`w-full transition-all duration-200 rounded-lg cursor-pointer px-4 py-3 flex items-center gap-3 font-medium ${
                                activeLink === index 
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <item.icon size={20} className={activeLink === index ? "text-white" : "text-gray-500"} />
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleLogout} 
                className="w-full text-red-600 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer px-4 py-3 flex items-center justify-center gap-2 font-bold transition-colors"
            >
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;