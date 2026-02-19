import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { restaurantSummary } from '../controllers/statsController.js';

const router = Router();

router.get('/restaurant-summary', auth, requireRole('restaurant'), restaurantSummary);

export default router;
