import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Package, Users, User, MoveLeft, LogOut } from 'lucide-react';
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
        { icon: Users, title: 'Users' },
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
        <aside className={`${isNavbarOpen ? "left-2.5" : "-left-full"} fixed w-64 h-[97.5%] rounded-xl bg-white z-10 mt-2.5 transition-all duration-300 shadow-lg p-4 flex flex-col justify-between md:left-2.5`}>
            <div className="space-y-2">
                <div className="flex flex-col gap-2 pb-2">
                    <div className="flex items-center justify-between text-xl font-bold">
                        <span>Admin Panel</span>
                        <MoveLeft 
                            className="block md:hidden cursor-pointer" 
                            onClick={() => dispatch(toggleNavbar())} 
                        />
                    </div>
                    <hr />
                </div>
                
                {links.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={() => { 
                            setActiveLink(index); 
                            dispatch(toggleComponent(item.title)); 
                        }} 
                        className={`${activeLink === index ? "bg-dark-gradient text-white" : "hover:bg-gray-200 text-gray-700"} w-full transition-all duration-300 rounded-md cursor-pointer px-3 py-2 flex items-center gap-2`}
                    >
                        <item.icon />
                        {item.title}
                    </button>
                ))}
            </div>

            <button 
                onClick={handleLogout} 
                className="text-white rounded-md cursor-pointer px-3 py-2 flex items-center gap-2 bg-red-gradient hover:opacity-90 transition-opacity"
            >
                <LogOut />
                Logout
            </button>
        </aside>
    );
};
export default SideBar;
