import Report from '../models/Report.js';

export const submitReport = async (req, res) => {
    try {
        const { ngoId, month, beneficiaries, fundsUtilized, activities } = req.body;

        if (!ngoId || !month) {
            return res.status(400).json({
                message: 'ngoId and month are required',
            });
        }

        const report = await Report.findOneAndUpdate(
            { ngoId, month },
            {
                ngoId,
                month,
                beneficiaries: Number(beneficiaries) || 0,
                fundsUtilized: Number(fundsUtilized) || 0,
                activities,
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json(report);
    } catch (error) {
        console.error(error);

        // Handle duplicate key error from unique index
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Report already exists for this NGO and month',
            });
        }

        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
