// dashboard/src/components/Users.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../store/slices/adminSlice';
import Header from './Header';
import { Loader2, Trash2 } from 'lucide-react';

const Users = () => {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const dispatch = useDispatch();
    
    const { loading, users, totalUsers } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAllUsers(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (totalUsers !== undefined) {
            const newMax = Math.ceil(totalUsers / 10) || 1;
            setMaxPage(newMax);
        }
    }, [totalUsers]);

    useEffect(() => {
        if (page > maxPage && maxPage > 0) {
            setPage(maxPage);
        }
    }, [maxPage, page]);

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id, page));
        }
    };

    return (
        <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full bg-gray-50 min-h-screen">
            <div className="flex-1 md:p-6">
                <Header />
                <h1 className="text-2xl font-bold">All Users</h1>
                <p className="text-sm text-gray-600 mb-6">Manage registered Nepa users</p>
                
                <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md min-h-[60vh]">
                    <div className="overflow-x-auto rounded-lg">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                            </div>
                        ) : users?.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-100">
                                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-semibold">Avatar</th>
                                        <th className="py-4 px-6 text-left font-semibold">Name</th>
                                        <th className="py-4 px-6 text-left font-semibold">Email</th>
                                        <th className="py-4 px-6 text-left font-semibold">Registered On</th>
                                        <th className="py-4 px-6 text-left font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-6">
                                                <img 
                                                    src={u.avatar?.url || '/avatar-holder.avif'} 
                                                    alt={u.name} 
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                                                />
                                            </td>
                                            <td className="py-3 px-6 font-medium text-gray-800">{u.name}</td>
                                            <td className="py-3 px-6 text-gray-500">{u.email}</td>
                                            <td className="py-3 px-6 text-sm text-gray-500">
                                                {new Date(u.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-3 px-6">
                                                <button 
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <UsersIcon size={48} className="mb-4 text-gray-300" />
                                <h3 className="text-xl font-bold text-gray-600">No Users Found</h3>
                                <p className="text-sm mt-1">There are currently no registered users.</p>
                            </div>
                        )}
                    </div>
                    
                    {!loading && users?.length > 0 && (
                        <div className="flex justify-center items-center mt-8 gap-4 border-t pt-6">
                            <button 
                                disabled={page === 1}
                                onClick={() => setPage(Math.max(page - 1, 1))}
                                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-600 font-medium text-sm bg-gray-50 rounded-lg">
                                Page {page} of {maxPage}
                            </span>
                            <button 
                                disabled={page === maxPage}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Users;