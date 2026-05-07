// dashboard/src/lib/helper.js
export const getLastNMonthsAsMonthAndYear = (n) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const lastNMonths = [];
    const now = new Date();

    for (let i = 0; i < n; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        lastNMonths.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
    }

    return lastNMonths.reverse();
};

export const formatNumber = (num) => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    if (num < 1000000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
};