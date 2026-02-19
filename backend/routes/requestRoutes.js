import { Router } from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import { createRequest, getMyRequests } from '../controllers/requestController.js';

const router = Router();

router.post('/', auth, requireRole('ngo'), createRequest);
router.get('/my-requests', auth, requireRole('ngo'), getMyRequests);

export default router;
