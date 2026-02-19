import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { createFood, getAvailableFood, getMyFood, updateFoodStatus } from '../controllers/foodController.js';

const router = Router();

router.post('/', auth, requireRole('restaurant'), createFood);
router.get('/', auth, getAvailableFood);
router.get('/my-food', auth, requireRole('restaurant'), getMyFood);
router.put('/:id/status', auth, requireRole('restaurant'), updateFoodStatus);

export default router;
