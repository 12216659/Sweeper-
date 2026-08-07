import express from 'express';
import { getProfile, addAddress } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.post('/address', addAddress);

export default router;
