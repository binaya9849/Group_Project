// dashboard/src/components/Header.jsx
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-1/3 md:w-1/2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input 
                    type="text" 
                    placeholder="Search here..." 
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-3 border-l pl-4">
                    <img 
                        src={user?.avatar?.url || '/avatar-holder.avif'} 
                        alt="Nepa Admin" 
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-gray-700">{user?.name || 'Nepa Admin'}</p>
                        <p className="text-xs text-gray-500">{user?.role || 'ADMIN'}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;