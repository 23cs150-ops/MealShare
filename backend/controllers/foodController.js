import Food from '../models/Food.js';
import Request from '../models/Request.js';

export const expireFoods = async () => {
  const now = new Date();
  await Food.updateMany(
    { expiryTime: { $lt: now }, status: { $ne: 'collected' } },
    { status: 'expired' }
  );
};

export const createFood = async (req, res) => {
  try {
    const { title, quantity, expiryTime, pickupStartTime, pickupEndTime, location } = req.body;
    if (!title || !quantity || !expiryTime || !pickupStartTime || !pickupEndTime || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const now = new Date();
    const expiry = new Date(expiryTime);
    const pickupStart = new Date(pickupStartTime);
    const pickupEnd = new Date(pickupEndTime);

    if (pickupEnd <= now) {
      return res.status(400).json({ message: 'Pickup end time must be in the future' });
    }
    if (expiry <= pickupEnd) {
      return res.status(400).json({ message: 'Expiry must be after pickup end time' });
    }

    const food = await Food.create({
      title,
      quantity,
      expiryTime: expiry,
      pickupStartTime: pickupStart,
      pickupEndTime: pickupEnd,
      location,
      restaurantId: req.user._id
    });

    res.status(201).json(food);
  } catch (err) {
    console.error('Create food error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableFood = async (_req, res) => {
  try {
    await expireFoods();
    const foods = await Food.find({ status: 'available' }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    console.error('Get available food error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyFood = async (req, res) => {
  try {
    await expireFoods();
    const foods = await Food.find({ restaurantId: req.user._id }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    console.error('Get my food error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateFoodStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['available', 'collected', 'expired'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await expireFoods();
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    if (food.restaurantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to update this item' });
    }
    if (food.status === 'expired' && status === 'available') {
      return res.status(400).json({ message: 'Expired items cannot be reactivated' });
    }

    food.status = status;
    await food.save();

    if (status === 'collected') {
      await Request.updateMany({ foodId: food._id, status: 'pending' }, { status: 'approved' });
    }

    res.json(food);
  } catch (err) {
    console.error('Update food status error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
