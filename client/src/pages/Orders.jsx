import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO: Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate API call
        // const response = await dispatch(fetchUserOrders());
        // setOrders(response);
        setOrders([]);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Package className="text-yellow-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-muted-foreground" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-white/10 text-muted-foreground';
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>
          
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-8">
              Start shopping to place your first order!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

        {/* Filter */}
        <div className="mb-8 flex items-center gap-4">
          <Filter size={20} className="text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground
              focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="glass-panel p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Order #{order._id?.slice(-8) || 'N/A'}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                {/* Order Details */}
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    ${order.totalAmount?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.items?.length || 0} item(s)
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-foreground rounded-lg
                    hover:bg-white/20 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No orders found with the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
