import Report from '../models/Report.js';

export const getDashboard = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.json({ message: 'Month is required' });
        }

        const data = await Report.aggregate([
            { $match: { month } },
            {
                $group: {
                    _id: null,
                    ngos: { $addToSet: '$ngoId' },
                    totalBeneficiaries: { $sum: '$beneficiaries' },
                    totalFunds: { $sum: '$fundsUtilized' },
                    totalEvents: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalNGOs: { $size: '$ngos' },
                    totalBeneficiaries: 1,
                    totalFunds: 1,
                    totalEvents: 1,
                },
            },
        ]);

        res.json(
            data[0] || {
                totalNGOs: 0,
                totalBeneficiaries: 0,
                totalFunds: 0,
                totalEvents: 0,
            }
        );
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: error.message });
    }
};
