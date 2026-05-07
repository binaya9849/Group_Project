// dashboard/src/components/dashboard-components/OrderChart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const OrderChart = () => {
    const { orderStatusCounts } = useSelector((state) => state.admin);

    const STATUS_COLORS = {
        Processing: '#eab308',
        Shipped: '#3b82f6',
        Delivered: '#22c55e',
        Cancelled: '#ef4444',
    };

    const data = orderStatusCounts ? Object.keys(orderStatusCounts).map(status => ({
        name: status,
        value: parseInt(orderStatusCounts[status], 10)
    })).filter(item => item.value > 0) : [];

    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <h3 className="font-semibold mb-2 w-full text-left">Order Statuses</h3>
            <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#8884d8'} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrderChart;