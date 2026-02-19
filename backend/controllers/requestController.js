import Food from '../models/Food.js';
import Request from '../models/Request.js';
import { expireFoods } from './foodController.js';

export const createRequest = async (req, res) => {
  try {
    const { foodId } = req.body;
    if (!foodId) return res.status(400).json({ message: 'foodId is required' });

    await expireFoods();
    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });

    const now = new Date();
    if (food.status !== 'available') {
      return res.status(400).json({ message: 'Food is not available' });
    }
    if (food.expiryTime < now) {
      return res.status(400).json({ message: 'Food already expired' });
    }
    if (now < food.pickupStartTime || now > food.pickupEndTime) {
      return res.status(400).json({ message: 'Outside pickup window' });
    }

    const existingRequest = await Request.findOne({ foodId: food._id, status: { $in: ['pending', 'approved'] } });
    if (existingRequest) {
      return res.status(400).json({ message: 'Food already requested' });
    }

    const request = await Request.create({ foodId: food._id, ngoId: req.user._id });
    food.status = 'requested';
    await food.save();

    res.status(201).json(request);
  } catch (err) {
    console.error('Create request error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ ngoId: req.user._id })
      .populate('foodId')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Get my requests error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
