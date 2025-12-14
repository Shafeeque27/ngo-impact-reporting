import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        ngoId: { type: String, required: true },
        month: { type: String, required: true },
        beneficiaries: Number,
        fundsUtilized: Number,
        activities: String,
    },
    { timestamps: true }
);

reportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
