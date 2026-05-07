// dashboard/src/components/dashboard-components/Stats.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Helper function to format large numbers
const formatNumber = (num) => {
    if (num < 1000) return num.toString();
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
};

const Stats = () => {
    const [revenueChange, setRevenueChange] = useState('');
    const { totalUsersCount, todayRevenue, yesterdayRevenue, totalRevenueAllTime } = useSelector((state) => state.admin);

    useEffect(() => {
        let change = 0;
        if (yesterdayRevenue === 0) {
            change = 100;
        } else {
            change = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
        }
        const revenueChangeText = `${change >= 0 ? '+' : '-'}${Math.abs(change).toFixed(2)}% from yesterday`;
        setRevenueChange(revenueChangeText);
    }, [todayRevenue, yesterdayRevenue]);

    const stats = [
        {
            title: "Today's Revenue",
            value: `$${formatNumber(todayRevenue || 0)}`,
            change: revenueChange
        },
        {
            title: "Total Users",
            value: totalUsersCount || 0,
            change: null
        },
        {
            title: "All Time Revenue",
            value: `$${formatNumber(totalRevenueAllTime || 0)}`,
            change: null
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                    {index !== 0 && (
                        <div className="flex gap-2 flex-col">
                            <div className="text-sm text-gray-500">{stat.title}</div>
                            <div className="text-xl font-semibold text-[30px] overflow-y-hidden">{stat.value}</div>
                        </div>
                    )}
                    {index === 0 && (
                        <>
                            <div className="text-sm text-gray-500">{stat.title}</div>
                            <div className="text-xl font-semibold text-[30px] overflow-y-hidden">{stat.value}</div>
                            {stat.change && (
                                <div className="text-sm mt-2">
                                    <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                        {stat.change}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stats;