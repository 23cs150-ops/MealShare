import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    quantity: { type: String, required: true },
    expiryTime: { type: Date, required: true },
    pickupStartTime: { type: Date, required: true },
    pickupEndTime: { type: Date, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'requested', 'collected', 'expired'],
      default: 'available'
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Food', foodSchema);
