// dashboard/src/components/dashboard-components/MiniSummary.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { PackageCheck, TrendingUp, AlertTriangle, BarChart4, UserPlus } from 'lucide-react';

const MiniSummary = () => {
    const { 
        topSellingProducts, 
        lowStockProducts, 
        revenueGrowth, 
        newUsersThisMonth, 
        currentMonthSales, 
        orderStatusCounts 
    } = useSelector((state) => state.admin);

    let totalOrders = 0;
    if (orderStatusCounts) {
        totalOrders = Object.values(orderStatusCounts).reduce((acc, count) => acc + count, 0);
    }

    const summary = [
        {
            text: "Total Sales This Month",
            subText: "This month's sales",
            value: `PKR ${(currentMonthSales * 283).toLocaleString()}`,
            icon: <PackageCheck className="text-green-600" />
        },
        {
            text: "Total Orders Placed",
            subText: "Total orders processed",
            value: totalOrders,
            icon: <PackageCheck className="text-blue-600" />
        },
        {
            text: "Top Selling Product",
            subText: "Best seller",
            value: topSellingProducts?.[0] ? `${topSellingProducts[0].name} (${topSellingProducts[0].total_sold} Sold)` : "N/A",
            icon: <TrendingUp className="text-emerald-600" />
        },
        {
            text: "Low Stock Alerts",
            subText: "Products running low on stock",
            value: lowStockProducts,
            icon: <AlertTriangle className="text-red-600" />
        },
        {
            text: "Revenue Growth Rate",
            subText: `Revenue ${revenueGrowth?.includes('+') ? 'up' : 'down'} by ${revenueGrowth} compared to last month`,
            value: revenueGrowth,
            icon: <BarChart4 className="text-purple-600" />
        },
        {
            text: "New Customers This Month",
            subText: "New users joined",
            value: newUsersThisMonth,
            icon: <UserPlus className="text-yellow-600" />
        }
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <p className="text-sm text-gray-500 mb-4">Summary of key metrics for the current month</p>
            <div className="space-y-4">
                {summary.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        {item.icon}
                        <div>
                            <p className="text-sm">{item.text}</p>
                            <p className="text-sm text-gray-500">{item.subText}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniSummary;