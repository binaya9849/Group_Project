// dashboard/src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminProfile, updateAdminPassword } from '../store/slices/authSlice';
import Header from './Header';
import { Loader2, Camera } from 'lucide-react';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const [editData, setEditData] = useState({
        name: '',
        email: ''
    });
    const [avatar, setAvatar] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("email", editData.email);
        if (avatar) {
            formData.append("avatar", avatar);
        }
        dispatch(updateAdminProfile(formData));
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        dispatch(updateAdminPassword(passwordData));
        setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    };

    return (
        <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full min-h-screen bg-gray-50">
            <div className="flex-1 md:p-6">
                <Header />
                <h1 className="text-2xl font-bold">Admin Profile</h1>
                <p className="text-sm text-gray-600 mb-6">Manage your Nepa Admin credentials</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Update Profile</h2>
                        
                        <div className="flex items-center gap-6 mb-8">
                            <div className="relative">
                                <img 
                                    src={avatar ? URL.createObjectURL(avatar) : (user?.avatar?.url || '/avatar-holder.avif')} 
                                    alt="Avatar" 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-sm"
                                />
                                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 shadow-md">
                                    <Camera size={16} />
                                </label>
                                <input 
                                    id="avatar-upload"
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-800">{user?.name || 'Nepa Admin'}</p>
                                <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded w-max mt-1">{user?.role || 'ADMIN'}</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={editData.name}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={editData.email}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                            </button>
                        </form>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Change Password</h2>
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input 
                                    type="password" 
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input 
                                    type="password" 
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    name="confirmNewPassword"
                                    value={passwordData.confirmNewPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full mt-4 bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;