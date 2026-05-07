// dashboard/src/components/dashboard-components/TopProductsChart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded shadow text-sm">
                <p className="font-semibold">{payload[0].payload.name}</p>
                <p>Total Sold: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x="-32" y="-16" width="32" height="32">
                <img src={payload.value} alt="Product" className="w-8 h-8 rounded-full object-cover" />
            </foreignObject>
        </g>
    );
};

const TopProductsChart = () => {
    const { topSellingProducts } = useSelector((state) => state.admin);
    const chartData = topSellingProducts ? topSellingProducts.slice(0, 3) : [];

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Top Selling Products</h3>
            <div className="relative">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart layout="vertical" data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barSize={50}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="image" type="category" tick={<CustomYAxisTick />} width={50} />
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'auto' }} />
                        <Bar dataKey="total_sold" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => {
                                let fill = "#3b82f6";
                                if (index === 0) fill = "#3b82f6";
                                else if (index === 1) fill = "#10b981";
                                else if (index === 2) fill = "#f59e0b";
                                return <Cell key={`cell-${index}`} fill={fill} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopProductsChart;