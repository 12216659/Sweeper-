import express from 'express';
import { getAllServices, seedServices, getServiceById, updateService } from '../controllers/service.controller';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.post('/seed', seedServices); // In production, this should be protected by Super Admin auth

export default router;
