import React, { useState } from 'react';
import { submitReport } from '../api/api';

const SubmitReport = () => {
    const initialFormState = {
        ngoId: '',
        month: '',
        beneficiaries: '',
        fundsUtilized: '',
        activities: '',
    };

    const [form, setForm] = useState(initialFormState);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await submitReport({
                ...form,
                beneficiaries: Number(form.beneficiaries),
                fundsUtilized: Number(form.fundsUtilized),
            });

            setMsg('Report submitted successfully');
            setForm(initialFormState);
            console.log('Submitting form:', form);
        } catch (error) {
            setMsg('Submission failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-bold">Submit Monthly Report</h2>

            <input
                required
                placeholder="NGO ID"
                className="w-full border p-2"
                value={form.ngoId}
                onChange={(e) => setForm({ ...form, ngoId: e.target.value })}
            />

            <input
                required
                type="month"
                className="w-full border p-2"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
            />

            <input
                required
                type="number"
                placeholder="Beneficiaries"
                className="w-full border p-2"
                value={form.beneficiaries}
                onChange={(e) => setForm({ ...form, beneficiaries: e.target.value })}
            />

            <input
                required
                type="number"
                placeholder="Funds Utilized"
                className="w-full border p-2"
                value={form.fundsUtilized}
                onChange={(e) => setForm({ ...form, fundsUtilized: e.target.value })}
            />

            <textarea
                placeholder="Activities (events conducted, description)"
                className="w-full border p-2"
                value={form.activities}
                onChange={(e) => setForm({ ...form, activities: e.target.value })}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>

            {msg && <p className="text-sm">{msg}</p>}
        </form>
    );
};

export default SubmitReport;
