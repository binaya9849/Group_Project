// dashboard/src/components/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus, deleteOrder } from '../store/slices/orderSlice';
import Header from './Header';
import { Package, Truck, CheckCircle, XCircle, Loader2, Filter } from 'lucide-react';

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    const confirmDelete = () => {
        dispatch(deleteOrder(deleteConfirm.id));
        setDeleteConfirm({ open: false, id: null });
    };

    const filteredOrders = statusFilter === 'ALL' 
        ? orders 
        : orders?.filter(order => order.order_status === statusFilter);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <Package className="w-5 h-5 text-yellow-500" />;
            case 'Shipped': return <Truck className="w-5 h-5 text-blue-500" />;
            case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-600';
            case 'Shipped': return 'bg-blue-100 text-blue-600';
            case 'Delivered': return 'bg-green-100 text-green-600';
            case 'Cancelled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const statusArray = ['ALL', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <main className="p-[10px] pl-[10px] md:pl-[17rem] w-full min-h-screen bg-gray-50">
            <div className="flex-1 md:p-6">
                <Header />
                <h1 className="text-2xl font-bold">All Orders</h1>
                <p className="text-sm text-gray-600 mb-6">Manage all Nepa user orders</p>
                
                <div className="bg-white p-4 rounded-xl shadow-md mb-8">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Filter className="w-5 h-5 text-gray-500" />
                        <span className="font-medium mr-2">Filter by Status:</span>
                        {statusArray.map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-md font-medium transition-all ${
                                    statusFilter === status 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-10">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    </div>
                ) : filteredOrders?.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md mx-auto mt-6">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Found</h2>
                        <p className="text-gray-500">
                            {statusFilter === 'ALL' 
                                ? "No orders have been placed yet." 
                                : `No orders with status ${statusFilter} found.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders?.map(order => (
                            <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                                    <div>
                                        <p><strong>Order ID:</strong> {order.id}</p>
                                        <p className="mt-2"><strong>Placed on:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                        <p className="mt-2"><strong>Total Amount:</strong> ${order.total_price}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(order.order_status)}
                                            <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.order_status)}`}>
                                                {order.order_status}
                                            </span>
                                        </div>
                                        <select 
                                            value={order.order_status} 
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border p-2 rounded-md"
                                        >
                                            {statusArray.filter(s => s !== 'ALL').map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => setDeleteConfirm({ open: true, id: order.id })}
                                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-lg mb-2">Shipping Info</h4>
                                    <p className="text-gray-600">
                                        <strong>Name:</strong> {order.shipping_info?.full_name} | <strong>Phone:</strong> {order.shipping_info?.phone} <br/>
                                        <strong>Address:</strong> {order.shipping_info?.address}, {order.shipping_info?.city}, {order.shipping_info?.state} - {order.shipping_info?.pin_code}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-semibold text-lg mb-2">Ordered Items</h4>
                                    <div className="space-y-4">
                                        {order.order_items?.map(item => (
                                            <div key={item.product_id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md border" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{item.title}</h4>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">${item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {deleteConfirm.open && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</h3>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={confirmDelete} 
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button 
                                onClick={() => setDeleteConfirm({ open: false, id: null })} 
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Orders;