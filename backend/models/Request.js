import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Request', requestSchema);
