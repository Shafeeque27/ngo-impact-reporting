import React from 'react';
import { useState } from 'react';
import { getDashboard } from '../api/api';

const Dashboard = () => {
    const [month, setMonth] = useState('');
    const [data, setData] = useState(null);

    const load = async () => {
        try {
            if (!month) return alert('Please select a month');

            const res = await getDashboard(month);
            setData(res.data);
        } catch (error) {
            console.error('Dashboard API error:', err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <input className="cursor-pointer" type="month" onChange={(e) => setMonth(e.target.value)} />
            <button onClick={load} className="bg-indigo-600 text-white px-4 py-2 ml-2 cursor-pointer rounded">
                Load
            </button>
            {data && (
                <div className="mt-4 space-y-2">
                    <p>Total NGOs: {data.totalNGOs}</p>
                    <p>Total People Helped: {data.totalBeneficiaries}</p>
                    <p>Total Events: {data.totalEvents || 0}</p>
                    <p>Total Funds: ₹{data.totalFunds}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
