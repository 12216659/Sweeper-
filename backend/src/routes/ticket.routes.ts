import express from 'express';
import { createTicket, getMyTickets } from '../controllers/ticket.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protect);

router.post('/', createTicket);
router.get('/my-tickets', getMyTickets);

export default router;
