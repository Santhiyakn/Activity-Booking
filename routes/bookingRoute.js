import { Router } from 'express';
const router = Router();
import bookInfo from '../controllers/bookingController.js';
import authenticate from '../middlewares/authMiddleware.js';

const {bookActivity,getMyBookings} = bookInfo;

router.post('/book', authenticate, bookActivity);
router.get('/mybookings',authenticate,getMyBookings);

export default router;
