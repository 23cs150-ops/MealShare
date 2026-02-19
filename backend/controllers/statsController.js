import Food from '../models/Food.js';
import Request from '../models/Request.js';
import { expireFoods } from './foodController.js';

export const restaurantSummary = async (req, res) => {
  try {
    await expireFoods();
    const restaurantId = req.user._id;

    const [totalFoodPosted, totalFoodCollected, totalExpired, totalRequested] = await Promise.all([
      Food.countDocuments({ restaurantId }),
      Food.countDocuments({ restaurantId, status: 'collected' }),
      Food.countDocuments({ restaurantId, status: 'expired' }),
      Request.countDocuments({ foodId: { $in: await Food.find({ restaurantId }).distinct('_id') } })
    ]);

    res.json({ totalFoodPosted, totalFoodCollected, totalExpired, totalRequested });
  } catch (err) {
    console.error('Stats error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
