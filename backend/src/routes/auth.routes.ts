import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../models/User';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Example of a protected route
router.get('/me', protect, (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
});

// Example of an admin-only route
router.get('/admin-only', protect, restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN), (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome Admin!'
    });
});

export default router;
